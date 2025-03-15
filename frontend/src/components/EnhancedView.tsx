import React from 'react';
import AudioPlayer from './AudioPlayer';
import '../App.css';
import MicrophoneButton from './MicrophoneButton';

interface EnhancedViewProps {
  audioUrl: string; // URL of the enhanced audio file
  onReset: () => void; // Callback to reset the app
}

const EnhancedWindow: React.FC<EnhancedViewProps> = ({ audioUrl, onReset }) => {
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
      {/* Audio Player */}
      <AudioPlayer audioUrl={audioUrl} title="Enhanced Audio" align="left" />

      {/* Centered Microphone Button at the Bottom */}
      <div className="centered-microphone-button">
        <MicrophoneButton onClick={handleMicrophoneClick} size="small" />
      </div>
    </div>
  );
};

export default EnhancedWindow;