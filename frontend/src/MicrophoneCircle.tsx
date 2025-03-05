import React, { useState } from 'react';
import { FaMicrophone, FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa'; // Import FaPlay
import { useAudioRecorder } from 'react-audio-voice-recorder'; // useAudioRecorder hook
import { LiveAudioVisualizer } from 'react-audio-visualize'; // Live audio visualizer
import StutterEnhancerTitle from './StutterEnhancerTitle'; // Import the title component
import './App.css'; // Import the CSS file

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

  // Simulate upload process
  const handleUpload = () => {
    setIsUploading(true); // Show loading spinner and "Processing" text
    setTimeout(() => {
      setIsUploading(false); // Hide loading spinner and "Processing" text after 10 seconds
    }, 10000); // 10-second delay
  };

  return (
    <div className="container">
      {/* Stutter Enhancer Title */}
      <StutterEnhancerTitle />

      {/* Microphone Circle */}
      {!isRecording && !isUploading && (
        <div className="microphone-circle" onClick={startRecording}>
          <div className="microphone-icon">
            <FaMicrophone />
          </div>
        </div>
      )}

      {/* Audio Control Bar */}
      {isRecording && !isUploading && (
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