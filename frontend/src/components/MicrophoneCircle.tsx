import React, { useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import RecordingView from './RecordingView';
import ProcessingView from './ProcessingView';
import TextboxView from './TextboxView';
import EnhancedView from './EnhancedView';
import ErrorMessage from './ErrorMessage';
import '../App.css';

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
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [enhancedAudioUrl, setEnhancedAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [showAudioController, setShowAudioController] = useState(false);
  const [showEnhancedWindow, setShowEnhancedWindow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset the app to its initial state
  const resetApp = () => {
    stopRecording();
    setIsUploading(false);
    setIsProcessingComplete(false);
    setShowAudioController(false);
    setTranscribedText('');
    setShowEnhancedWindow(false);
    setTaskId(null);
    setEnhancedAudioUrl(null);
    setError(null);
  };

  // Handle starting a new recording
  const handleStartNewRecording = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
  };

  // Handle upload from AudioControlBar
  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    setError(null);

    try {
      // Step 1: Submit audio to the backend
      const taskId = await submitAudio(blob);
      setTaskId(taskId);

      // Step 2: Poll for transcribed text
      const text = await getTranscribedText(taskId);
      setTranscribedText(text);
      setIsProcessingComplete(true);
    } catch (err) {
      setError('Failed to process audio. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle submit button click in TextboxView
  const handleSubmitText = async (text: string) => {
    if (!taskId) return;

    setIsUploading(true);
    setError(null);

    try {
      // Step 3: Submit corrected text to the backend
      await submitCorrectedText(taskId, text);

      // Step 4: Poll for enhanced audio
      const audioUrl = await getEnhancedAudio(taskId);
      setEnhancedAudioUrl(audioUrl);
      setShowEnhancedWindow(true);
    } catch (err) {
      setError('Failed to enhance audio. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle small microphone circle click
  const handleSmallMicrophoneClick = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
  };

  return (
    <div className="container">
      {/* Stutter Enhancer Title */}
      <StutterEnhancerTitle />

      {/* Recording View */}
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
          onStop={stopRecording}
        />
      )}

      {/* Processing View */}
      <ProcessingView isProcessing={isUploading} />

      {/* Textbox View */}
      {isProcessingComplete && !showEnhancedWindow && !error && (
        <TextboxView
          textboxValue={transcribedText}
          onTextboxChange={(e) => setTranscribedText(e.target.value)}
          onSubmit={() => handleSubmitText(transcribedText)}
          onMicrophoneClick={handleSmallMicrophoneClick}
        />
      )}

      {/* Enhanced View */}
      {showEnhancedWindow && enhancedAudioUrl && !error && (
        <EnhancedView audioUrl={enhancedAudioUrl} onReset={resetApp} />
      )}

      {/* Error Message */}
      {error && <ErrorMessage message={error} onReset={resetApp} />}
    </div>
  );
};

// Helper function to submit audio
const submitAudio = async (audioBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');

  const response = await fetch('/enhance-audio/', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to submit audio');
  }

  const data = await response.json();
  return data.task_id; // Return the task ID
};

// Helper function to get transcribed text
const getTranscribedText = async (taskId: string): Promise<string> => {
  const response = await fetch(`/enhance-audio/text/${taskId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch transcribed text');
  }

  const data = await response.json();
  return data.text; // Return the transcribed text
};

// Helper function to submit corrected text
const submitCorrectedText = async (taskId: string, text: string): Promise<void> => {
  const response = await fetch(`/enhance-audio/text/${taskId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit corrected text');
  }
};

// Helper function to get enhanced audio
const getEnhancedAudio = async (taskId: string): Promise<string> => {
  const response = await fetch(`/enhance-audio/audio/${taskId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch enhanced audio');
  }

  const data = await response.json();
  return data.file_url; // Return the URL to download the enhanced audio
};

export default MicrophoneCircle;