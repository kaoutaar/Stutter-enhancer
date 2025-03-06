import React, { useState } from 'react';
import { FaMicrophone, FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import StutterEnhancerTitle from './StutterEnhancerTitle';
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

  // Simulate upload process
  const handleUpload = () => {
    setIsUploading(true); // Show loading spinner and "Processing" text
    setTimeout(() => {
      setIsUploading(false); // Hide loading spinner and "Processing" text
      setIsProcessingComplete(true); // Mark processing as complete
    }, 10000); // 10-second delay
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

  return (
    <div className="container">
      {/* Stutter Enhancer Title */}
      <StutterEnhancerTitle />

      {/* Microphone Circle */}
      {!isRecording && !isUploading && !isProcessingComplete && !showAudioController && (
        <div className="microphone-circle" onClick={startRecording}>
          <div className="microphone-icon">
            <FaMicrophone />
          </div>
        </div>
      )}

      {/* Audio Control Bar */}
      {(isRecording || showAudioController) && !isUploading && !isProcessingComplete && (
        <div className="audio-control-bar">
          {/* Left Section (Upload Icon and Seconds) */}
          <div className="left-section">
            <div className="icon-button" onClick={handleUpload}>
              <FaUpload size={24} color="#4F46E5" />
            </div>
            <span>{formatTime(recordingTime)}</span>
          </div>

          {/* Audio Visualizer in the Middle */}
          <div className="waveform">
            {mediaRecorder && (
              <div className="visualizer-container">
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={400} // Default width
                  height={64}
                  barWidth={3}
                  gap={1}
                  barColor="#4F46E5"
                />
              </div>
            )}
          </div>

          {/* Right Section (Play/Pause and Trash Icons) */}
          <div className="icon-buttons">
            <div className="icon-button" onClick={togglePauseResume}>
              {isPaused ? <FaPlay size={24} color="#4F46E5" /> : <FaPause size={24} color="#4F46E5" />}
            </div>
            <div className="icon-button" onClick={stopRecording}>
              <FaTrash size={24} color="#EF4444" />
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner and Processing Text */}
      {isUploading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {/* Textbox and Submit Button after Processing is Complete */}
      {isProcessingComplete && !showAudioController && (
        <div className="textbox-container">
          <textarea
            className="textbox"
            placeholder="Enter your text here..."
            rows={10}
            cols={50}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          {/* Small Microphone Circle */}
          <div className="small-microphone-circle" onClick={handleSmallMicrophoneClick}>
            <div className="small-microphone-icon">
              <FaMicrophone />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format time (mm:ss)
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default MicrophoneCircle;