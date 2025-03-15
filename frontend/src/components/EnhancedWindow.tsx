import React from 'react';
import AudioPlayer from './AudioPlayer';
import '../App.css';
import MicrophoneButton from './MicrophoneButton';

interface EnhancedWindowProps {
  audioUrl: string; // URL of the enhanced audio file
  onReset: () => void; // Callback to reset the app
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({ audioUrl, onReset }) => {
  // Handle small microphone button click
  const handleMicrophoneClick = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset? Your current progress will be lost.'
    );
    if (confirmReset) {
      onReset(); // Reset the app
    }
  };

  return (
    <div className="enhanced-window">
      {/* Audio Players Container */}
      <div className="audio-players-container">
        {/* Vanilla Audio Player (Higher, like a sent message) */}
        <AudioPlayer audioUrl={audioUrl} title="Vanilla Audio" align="right" />

        {/* Enhanced Audio Player (Lower, like a received message) */}
        <AudioPlayer audioUrl={audioUrl} title="Enhanced Audio" align="left" />
      </div>

      {/* Centered Microphone Button at the Bottom */}
      <div className="centered-microphone-button">
        <MicrophoneButton onClick={handleMicrophoneClick} size="small" />
      </div>
    </div>
  );
};

export default EnhancedWindow;