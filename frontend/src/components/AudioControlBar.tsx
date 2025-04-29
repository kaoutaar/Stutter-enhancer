import React from 'react';
import { FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import '../App.css';

interface AudioControlBarProps {
  mediaRecorder: MediaRecorder | undefined;
  recordingTime: number;
  isPaused: boolean;
  onUpload: (blob: Blob) => void;
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
  const handleUpload = async () => {
    if (!mediaRecorder) {
      alert('No recording available. Please record audio first.');
      return;
    }
  
    mediaRecorder.stop();
    mediaRecorder.ondataavailable = async (event) => {
      const blob = event.data;
      if (blob.size > 0) {
        onUpload(blob);
      } else {
        alert('Recording is empty. Please record audio first.');
      }
    };
  };

  return (
    <div className="audio-control-bar">
      <div className="left-section">
        <div
          className="icon-button"
          onClick={handleUpload}
          style={{ opacity: mediaRecorder ? 1 : 0.5, cursor: mediaRecorder ? 'pointer' : 'not-allowed' }}
        >
          <FaUpload size={24} color="#4F46E5" />
        </div>
        <span>{formatTime(recordingTime)}</span>
      </div>

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

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default AudioControlBar;