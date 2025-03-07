import React from 'react';
import { FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import './App.css';

interface AudioControlBarProps {
  mediaRecorder: MediaRecorder | undefined; // Change to `undefined`
  recordingTime: number;
  isPaused: boolean;
  onUpload: () => void;
  onPauseResume: () => void;
  onStop: () => void;
}

const AudioControlBar: React.FC<AudioControlBarProps> = ({
  mediaRecorder,
  recordingTime,
  isPaused,
  onUpload,
  onPauseResume,
  onStop,
}) => {
  return (
    <div className="audio-control-bar">
      {/* Left Section (Upload Icon and Seconds) */}
      <div className="left-section">
        <div className="icon-button" onClick={onUpload}>
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
              width={400}
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