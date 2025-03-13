import React, { lazy, Suspense, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import MicrophoneButton from './MicrophoneButton';
import AudioControlBar from './AudioControlBar';
import TextboxWithSubmit from './TextboxWithSubmit';
import './App.css';

const EnhancedWindow = lazy(() => import('./EnhancedWindow'));
const LoadingOverlay = lazy(() => import('./LoadingOverlay'));

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

  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [isProcessingComplete, setIsProcessingComplete] = useState(false); // Track processing completion
  const [showAudioController, setShowAudioController] = useState(false); // Track audio controller visibility
  const [textboxValue, setTextboxValue] = useState(''); // Store textbox value
  const [showEnhancedWindow, setShowEnhancedWindow] = useState(false); // Track EnhancedWindow visibility

  // Reset the app to its initial state
  const resetApp = () => {
    stopRecording(); // Stop any ongoing recording
    setIsUploading(false);
    setIsProcessingComplete(false);
    setShowAudioController(false);
    setTextboxValue('');
    setShowEnhancedWindow(false);
  };

  // Handle upload from AudioControlBar
  const handleUpload = (blob: Blob) => {
    setIsUploading(true); // Show processing screen
    setTimeout(() => {
      setIsUploading(false); // Hide processing screen
      setIsProcessingComplete(true); // Mark processing as complete
      populateTextbox(); // Populate the textbox with random text
      console.log('Audio Blob:', blob); // Log the audio blob
      console.log('Audio URL:', URL.createObjectURL(blob)); // Log the audio URL
    }, 2000); // Simulate processing delay
  };

  // Handle submit button click
  const handleSubmit = () => {
    setShowEnhancedWindow(true); // Show the EnhancedWindow
  };

  // Handle small microphone circle click
  const handleSmallMicrophoneClick = () => {
    resetApp(); // Reset the app to its initial state
    startRecording(); // Start a new recording
  };

  // Handle large microphone circle click
  const handleLargeMicrophoneClick = () => {
    resetApp(); // Reset the app to its initial state
    startRecording(); // Start a new recording
  };

  // Populate the textbox with random text
  const populateTextbox = () => {
    const romeoAndJulietText = `
      Two households, both alike in dignity,
      In fair Verona, where we lay our scene,
      From ancient grudge break to new mutiny,
      Where civil blood makes civil hands unclean.
      From forth the fatal loins of these two foes
      A pair of star-cross'd lovers take their life;
      Whose misadventured piteous overthrows
      Do with their death bury their parents' strife.
      The fearful passage of their death-mark'd love,
      And the continuance of their parents' rage,
      Which, but their children's end, nought could remove,
      Is now the two hours' traffic of our stage;
      The which if you with patient ears attend,
      What here shall miss, our toil shall strive to mend.
    `;
    // Remove tabs and extra spaces
    const cleanedText = romeoAndJulietText
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim(); // Remove leading and trailing spaces
    setTextboxValue(cleanedText); // Set the cleaned text to the textbox
  };

  return (
    <div className="container">
      {/* Stutter Enhancer Title */}
      <StutterEnhancerTitle />

      {/* Microphone Circle */}
      {!isRecording && !isUploading && !isProcessingComplete && !showAudioController && !showEnhancedWindow && (
        <MicrophoneButton onClick={handleLargeMicrophoneClick} size="large" />
      )}

      {/* Audio Control Bar */}
      {(isRecording || showAudioController) && !isUploading && !isProcessingComplete && !showEnhancedWindow && (
        <AudioControlBar
          mediaRecorder={mediaRecorder || undefined} // Convert `null` to `undefined`
          recordingTime={recordingTime}
          isPaused={isPaused}
          onUpload={handleUpload}
          onPauseResume={togglePauseResume}
          onStop={stopRecording}
        />
      )}

      {/* Loading Spinner and Processing Text */}
      {isUploading && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingOverlay />
        </Suspense>
      )}

      {/* Textbox and Submit Button after Processing is Complete */}
      {isProcessingComplete && !isUploading && !showAudioController && !showEnhancedWindow && (
        <TextboxWithSubmit
          textboxValue={textboxValue}
          onTextboxChange={(e) => setTextboxValue(e.target.value)} // Allow editing
          onSubmit={handleSubmit}
          onMicrophoneClick={handleSmallMicrophoneClick}
        />
      )}

      {/* Enhanced Window */}
      {showEnhancedWindow && recordingBlob && (
        <Suspense fallback={<div>Loading...</div>}>
          <EnhancedWindow audioBlob={recordingBlob} onReset={resetApp} />
        </Suspense>
      )}
    </div>
  );
};

export default MicrophoneCircle;