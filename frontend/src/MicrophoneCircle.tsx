import React from 'react';
import { FaMicrophone, FaUpload, FaPause, FaTrash, FaPlay } from 'react-icons/fa'; // Import FaPlay
import { useAudioRecorder } from 'react-audio-voice-recorder'; // useAudioRecorder hook
import { LiveAudioVisualizer } from 'react-audio-visualize'; // Live audio visualizer
import './App.css'; // Import the CSS file
import StutterEnhancerTitle from './StutterEnhancerTitle';

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

  return (
    <div className="container">
      <StutterEnhancerTitle />
      {/* Microphone Circle */}
      {!isRecording && (
        <div className="microphone-circle" onClick={startRecording}>
          <div className="microphone-icon">
            <FaMicrophone />
          </div>
        </div>
      )}

      {/* Audio Control Bar */}
      {isRecording && (
        <div className="audio-control-bar">
          {/* Left Section (Upload Icon and Seconds) */}
          <div className="left-section">
            <div className="icon-button">
              <FaUpload size={24} color="#4F46E5" />
            </div>
            <span>{formatTime(recordingTime)}</span>
          </div>

          {/* Audio Visualizer in the Middle */}
          <div className="waveform">
            {mediaRecorder && (
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                width={400} // Width of the visualizer
                height={64} // Height of the visualizer
                barWidth={2} // Width of each bar
                gap={1} // Gap between bars
                barColor="#4F46E5" // Purple color for the bars
              />
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