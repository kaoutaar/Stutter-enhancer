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
  const [vanillaAudioUrl, setVanillaAudioUrl] = useState<string | null>(null);
  const [enhancedAudioUrl, setEnhancedAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [showAudioController, setShowAudioController] = useState(false);
  const [showEnhancedWindow, setShowEnhancedWindow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset the app to its initial state
  const resetApp = () => {
    stopRecording(); // Stop any ongoing recording
    setIsUploading(false);
    setIsProcessingComplete(false);
    setShowAudioController(false);
    setTranscribedText('');
    setShowEnhancedWindow(false);
    setTaskId(null);
    setVanillaAudioUrl(null);
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
      // Step 1: Submit audio to the backend (stubbed)
      const taskId = await submitAudio(blob);
      setTaskId(taskId);

      // Step 2: Poll for transcribed text (stubbed)
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
      // Step 3: Submit corrected text to the backend (stubbed)
      await submitCorrectedText(taskId, text);

      // Step 4: Poll for enhanced audio (stubbed)
      const enhancedAudioUrl = await getEnhancedAudio(taskId);

      // Step 5: Set both Vanilla and Enhanced audio URLs
      setVanillaAudioUrl(URL.createObjectURL(recordingBlob!)); // Vanilla audio (original recording)
      setEnhancedAudioUrl(enhancedAudioUrl); // Enhanced audio (processed)
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
          onStop={resetApp} // Pass resetApp to handle trashcan icon click
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
      {showEnhancedWindow && vanillaAudioUrl && enhancedAudioUrl && (
        <EnhancedView
          vanillaAudioUrl={vanillaAudioUrl}
          enhancedAudioUrl={enhancedAudioUrl}
          onReset={resetApp}
          vanillaAudioBlob={recordingBlob} // Pass the Vanilla audio blob
        />
      )}

      {/* Error Message */}
      {error && <ErrorMessage message={error} onReset={resetApp} />}
    </div>
  );
};

// Stubbed API calls
const submitAudio = async (audioBlob: Blob): Promise<string> => {
  // Simulate a delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return a mock task_id
  return 'mock-task-id-12345';
};

const getTranscribedText = async (taskId: string): Promise<string> => {
  // Simulate a delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return mock transcribed text
  return 'This is a mock transcription of the audio.';
};

const submitCorrectedText = async (taskId: string, text: string): Promise<void> => {
  // Simulate a delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate a successful response
  console.log('Corrected text submitted:', text);
};

const getEnhancedAudio = async (taskId: string): Promise<string> => {
  // Simulate a delay (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return a mock URL for the enhanced audio file
  return 'https://example.com/enhanced-audio.mp3';
};

export default MicrophoneCircle;