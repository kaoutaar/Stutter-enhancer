import React, { useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import RecordingView from './RecordingView';
import ProcessingView from './ProcessingView';
import TextboxView from './TextboxView';
import EnhancedView from './EnhancedView';
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

  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [showAudioController, setShowAudioController] = useState(false);
  const [textboxValue, setTextboxValue] = useState('');
  const [showEnhancedWindow, setShowEnhancedWindow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset the app to its initial state
  const resetApp = () => {
    stopRecording();
    setIsUploading(false);
    setIsProcessingComplete(false);
    setShowAudioController(false);
    setTextboxValue('');
    setShowEnhancedWindow(false);
    setIsProcessing(false);
  };

  // Handle starting a new recording
  const handleStartNewRecording = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
  };

  // Handle upload from AudioControlBar
  const handleUpload = (blob: Blob) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessingComplete(true);
      populateTextbox();
      console.log('Audio Blob:', blob);
      console.log('Audio URL:', URL.createObjectURL(blob));
    }, 2000);
  };

  // Handle submit button click
  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowEnhancedWindow(true);
    }, 2000);
  };

  // Handle small microphone circle click
  const handleSmallMicrophoneClick = () => {
    resetApp();
    startRecording();
    setShowAudioController(true);
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
    const cleanedText = romeoAndJulietText.replace(/\s+/g, ' ').trim();
    setTextboxValue(cleanedText);
  };

  return (
    <div className="container">
      {/* Stutter Enhancer Title */}
      <StutterEnhancerTitle />

      {/* Recording View */}
      {!isUploading && !isProcessingComplete && !showEnhancedWindow && (
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
      <ProcessingView isProcessing={isUploading || isProcessing} />

      {/* Textbox View */}
      {isProcessingComplete && !showEnhancedWindow && (
        <TextboxView
          textboxValue={textboxValue}
          onTextboxChange={(e) => setTextboxValue(e.target.value)}
          onSubmit={handleSubmit}
          onMicrophoneClick={handleSmallMicrophoneClick}
        />
      )}

      {/* Enhanced View */}
      {showEnhancedWindow && recordingBlob && (
        <EnhancedView audioBlob={recordingBlob} onReset={resetApp} />
      )}
    </div>
  );
};

export default MicrophoneCircle;