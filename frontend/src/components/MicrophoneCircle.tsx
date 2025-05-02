import React, { useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import RecordingView from './RecordingView';
import ProcessingView from './ProcessingView';
import TextboxView from './TextboxView';
import EnhancedView from './EnhancedView';
import ErrorMessage from './ErrorMessage';
import '../App.css';

const API_BASE_URL = "/api" //TODO:vite proxy CORS should be handled in backend

// Audio conversion utilities
const encodeWAV = (samples: Float32Array, numChannels: number, sampleRate: number): ArrayBuffer => {
  const bitsPerSample = 16;
  const format = 1; // PCM
  const blockAlign = numChannels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * (bitsPerSample / 8);

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // WAV conversion, but should be done in backend
  const writeString = (view: DataView, offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM samples
  const offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset + i * 2, sample < 0 ? sample * 32768 : sample * 32767, true);
  }

  return buffer;
};

const convertToWav = async (blob: Blob): Promise<Blob> => {
  // If already WAV, return as-is
  if (blob.type === 'audio/wav') return blob;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Convert each channel to WAV format
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const interleaved = new Float32Array(audioBuffer.length * numChannels);
  
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      interleaved[i * numChannels + channel] = channelData[i];
    }
  }

  const wavBuffer = encodeWAV(interleaved, numChannels, sampleRate);
  return new Blob([wavBuffer], { type: 'audio/wav' });
};

const MicrophoneCircle: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const [taskId, setTaskId] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [vanillaAudioUrl, setVanillaAudioUrl] = useState<string | null>(null);
  const [enhancedAudioUrl, setEnhancedAudioUrl] = useState<string | null>(null);
  const [enhancedAudioBlob, setEnhancedAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [showAudioController, setShowAudioController] = useState(false);
  const [showEnhancedWindow, setShowEnhancedWindow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetApp = () => {
    stopRecording();
    setIsUploading(false);
    setIsProcessingComplete(false);
    setShowAudioController(false);
    setTranscribedText('');
    setShowEnhancedWindow(false);
    setTaskId(null);
    setFileId(null);
    setVanillaAudioUrl(null);
    setEnhancedAudioUrl(null);
    setEnhancedAudioBlob(null);
    setError(null);
  };

  const submitAudio = async (audioBlob: Blob): Promise<{taskId: string, fileId: string}> => {
    const formData = new FormData();
    const dateTimeString = new Date().toISOString();
    let wavBlob: Blob;
    
    try {
      wavBlob = await convertToWav(audioBlob);
      formData.append('audiofile', wavBlob, `recording_${dateTimeString}.wav`);
      
      const metadata = {
        length: recordingTime,
        format: 'wav',
        size: wavBlob.size / (1024 * 1024),
        created_time: dateTimeString
      };
      
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch(`${API_BASE_URL}/enhance_audio/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload audio');
      }

      const data = await response.json();
      return { taskId: data.task_id, fileId: data.file_id };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error processing audio:', error.message);
        throw error; 
      }    
      else {
        console.error('Unknown error processing audio', error);
        throw new Error('Failed to process audio file');
      }
    }
  };

  const pollTranscription = async (taskId: string, fileId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maxAttempts = 600; // 20 minutes (600 attempts × 2 seconds)
      let attempts = 0;
      
      const checkStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/enhance_audio/text/${fileId}?task_id=${taskId}`);
          
          const data = await response.json();
          
          if (data.status === "Success") {
            if (data.transcript) {
              resolve(data.transcript);
            } else {
              reject(new Error('Transcription completed but no text returned'));
            }
          } else if (data.status === "Failed") {
            reject(new Error(data.message || 'Transcription failed'));
          } else if (attempts >= maxAttempts) {
            reject(new Error('Transcription timeout'));
          } else {
            attempts++;
            setTimeout(checkStatus, 2000);
          }
        } catch (err) {
          reject(err);
        }
      };

      checkStatus();
    });
  };

  const submitCorrectedText = async (taskId: string, fileId: string, text: string): Promise<string> => {
    try {
      const baseUrl = API_BASE_URL.replace(/\/$/, '');
      const params = new URLSearchParams();
      params.append('txt', text);
      params.append('task_id', taskId);
  
      const url = `${baseUrl}/enhance_audio/text/${fileId}?${params.toString()}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Request failed: ${response.status}`);
      }
  
      const data = await response.json();
      return data.task_id;
    } catch (error) {
      throw new Error('Failed to submit corrected text');
    }
  };
  
  const pollEnhancedAudio = async (taskId: string, fileId: string): Promise<{url: string, blob: Blob}> => {
    const maxAttempts = 600; 
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const baseUrl = API_BASE_URL.replace(/\/$/, '');
        const url = `${baseUrl}/enhance_audio/audio/${fileId}?task_id=${taskId}`;
        
        const response = await fetch(url);
        
        // Check if response is JSON (status update) or audio (success)
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          // Handle 400 errors silently during polling
          if (response.status === 400) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts++;
            continue;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        if (contentType?.includes('application/json')) {
          const result = await response.json();
          if (result.status === 'Processing' || result.status === 'STARTED') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts++;
            continue;
          } else if (result.status === 'Failed') {
            throw new Error(result.message || 'Audio enhancement failed');
          }
        } else if (contentType?.includes('audio/')) {
          const audioBlob = await response.blob();
          return {
            url: URL.createObjectURL(audioBlob),
            blob: audioBlob
          };
        } else {
          throw new Error(`Unexpected content type: ${contentType}`);
        }
      } catch (error) {
        if (!(error instanceof Error && error.message.includes('400'))) {
          console.error('Polling error:', error);
        }
        
        if (attempts >= maxAttempts - 1) {
          throw new Error('Audio processing timeout');
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }
    
    throw new Error('Audio processing took too long');
  };

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    setError(null);

    try {
      const vanillaUrl = URL.createObjectURL(blob);
      setVanillaAudioUrl(vanillaUrl);

      const { taskId, fileId } = await submitAudio(blob);
      setTaskId(taskId);
      setFileId(fileId);

      const text = await pollTranscription(taskId, fileId);
      setTranscribedText(String(text).trim());
      setIsProcessingComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Processing error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitText = async (text: string) => {
    if (!taskId || !fileId) {
      setError('Missing required IDs');
      return;
    }
  
    const trimmedText = String(text).trim();
    if (!trimmedText) {
      setError('Please enter valid text');
      return;
    }
  
    setIsUploading(true);
    setError(null);

    try {
      // Submit the corrected text
      const enhancedTaskId = await submitCorrectedText(taskId, fileId, trimmedText);
      
      // Poll for enhanced audio
      const { url, blob } = await pollEnhancedAudio(enhancedTaskId, fileId);
      
      // Success
      setEnhancedAudioUrl(url);
      setEnhancedAudioBlob(blob);
      setShowEnhancedWindow(true);
    } catch (err) {
      setError(
        err instanceof Error ? 
          err.message.includes('timeout') ?
            'Audio processing is taking longer than expected. Please try again later.' :
            err.message :
          'Audio enhancement failed'
      );
      console.error('Enhancement error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartNewRecording = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
  };

  const handleSmallMicrophoneClick = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
  };

  return (
    <div className="container">
      <StutterEnhancerTitle />

      {!isUploading && !isProcessingComplete && !showEnhancedWindow && !error && (
        <RecordingView
          isRecording={isRecording}
          showAudioController={showAudioController}
          mediaRecorder={mediaRecorder}
          recordingTime={recordingTime}
          isPaused={isPaused}
          onStartRecording={handleStartNewRecording}
          onUpload={handleUpload}
          onPauseResume={togglePauseResume}
          onStop={resetApp}
        />
      )}

      <ProcessingView isProcessing={isUploading} />

      {isProcessingComplete && !showEnhancedWindow && !error && (
        <TextboxView
          textboxValue={transcribedText}
          onTextboxChange={(e) => setTranscribedText(e.target.value)}
          onSubmit={() => handleSubmitText(transcribedText)}
          onMicrophoneClick={handleSmallMicrophoneClick}
        />
      )}

      {showEnhancedWindow && vanillaAudioUrl && enhancedAudioUrl && enhancedAudioBlob &&  (
        <EnhancedView
          vanillaAudioUrl={vanillaAudioUrl}
          enhancedAudioUrl={enhancedAudioUrl}
          onReset={resetApp}
          vanillaAudioBlob={recordingBlob}
          enhancedAudioBlob={enhancedAudioBlob}
        />
      )}

      {error && <ErrorMessage message={error} onReset={resetApp} />}
    </div>
  );
};

export default MicrophoneCircle;