import React from 'react';
import { FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import './App.css';

interface AudioControlBarProps {
  mediaRecorder: MediaRecorder | undefined; // MediaRecorder instance
  recordingTime: number; // Current recording time
  isPaused: boolean; // Whether recording is paused
  onUpload: (blob: Blob) => void; // Callback for upload
  onPauseResume: () => void; // Callback for pause/resume
  onStop: () => void; // Callback for stop
}

const AudioControlBar: React.FC<AudioControlBarProps> = ({
  mediaRecorder,
  recordingTime,
  isPaused,
  onUpload,
  onPauseResume,
  onStop,
}) => {
  // Handle upload button click
  const handleUpload = () => {
    if (!mediaRecorder) {
      alert('No recording available. Please record audio first.'); // Warn the user
      return;
    }

    // Stop recording and get the blob
    mediaRecorder.stop();
    mediaRecorder.ondataavailable = (event) => {
      const blob = event.data;
      if (blob.size > 0) {
        onUpload(blob); // Pass the blob to the parent component
      } else {
        alert('Recording is empty. Please record audio first.'); // Warn the user
      }
    };
  };

  return (
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
        <div className="icon-button" onClick={onPauseResume}>
          {isPaused ? <FaPlay size={24} color="#4F46E5" /> : <FaPause size={24} color="#4F46E5" />}
        </div>
        <div className="icon-button" onClick={onStop}>
          <FaTrash size={24} color="#EF4444" />
        </div>
      </div>
    </div>
  );
};

// Helper function to format time (mm:ss)
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default AudioControlBar;