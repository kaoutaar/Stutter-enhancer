import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';
import MicrophoneButton from './MicrophoneButton';

interface EnhancedWindowProps {
  audioBlob: Blob; // Audio blob from the previous screen (non-null)
  onReset: () => void; // Callback to reset the app
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({ audioBlob, onReset }) => {
  return (
    <div className="enhanced-window">
      {/* Vanilla Audio Player */}
      <AudioPlayer audioBlob={audioBlob} title="Vanilla Audio" align="right" />

      {/* Enhanced Audio Player */}
      <AudioPlayer audioBlob={audioBlob} title="Enhanced Audio" align="left" />

      {/* Centered Microphone Button */}
      <div className="centered-microphone-button">
        <MicrophoneButton onClick={onReset} size="small" />
      </div>
    </div>
  );
};

export default EnhancedWindow;