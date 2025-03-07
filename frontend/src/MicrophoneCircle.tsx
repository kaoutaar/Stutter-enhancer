import React, { useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import MicrophoneButton from './MicrophoneButton';
import AudioControlBar from './AudioControlBar';
import LoadingOverlay from './LoadingOverlay';
import TextboxWithSubmit from './TextboxWithSubmit';
import './App.css';

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

  // Simulate upload process
  const handleUpload = () => {
    setIsUploading(true); // Show loading spinner and "Processing" text
    setTimeout(() => {
      setIsUploading(false); // Hide loading spinner and "Processing" text
      setIsProcessingComplete(true); // Mark processing as complete
      populateTextbox(); // Populate the textbox with random text
    }, 2000); // 2-second delay
  };

  // Handle submit button click
  const handleSubmit = () => {
    alert('Text submitted!'); // Replace with your desired functionality
  };

  // Handle small microphone circle click
  const handleSmallMicrophoneClick = () => {
    setIsProcessingComplete(false); // Hide the textbox and submit button
    setShowAudioController(true); // Show the audio controller
    startRecording(); // Start recording when the small microphone is clicked
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
      {!isRecording && !isUploading && !isProcessingComplete && !showAudioController && (
        <MicrophoneButton onClick={startRecording} size="large" />
      )}

      {/* Audio Control Bar */}
      {(isRecording || showAudioController) && !isUploading && !isProcessingComplete && (
        <AudioControlBar
          mediaRecorder={mediaRecorder}
          recordingTime={recordingTime}
          isPaused={isPaused}
          onUpload={handleUpload}
          onPauseResume={togglePauseResume}
          onStop={stopRecording}
        />
      )}

      {/* Loading Spinner and Processing Text */}
      {isUploading && <LoadingOverlay />}

      {/* Textbox and Submit Button after Processing is Complete */}
      {isProcessingComplete && !showAudioController && (
        <TextboxWithSubmit
          textboxValue={textboxValue}
          onTextboxChange={(e) => setTextboxValue(e.target.value)} // Allow editing
          onSubmit={handleSubmit}
          onMicrophoneClick={handleSmallMicrophoneClick}
        />
      )}
    </div>
  );
};

export default MicrophoneCircle;