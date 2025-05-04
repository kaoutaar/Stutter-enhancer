import React from 'react';
import AudioPlayer from './AudioPlayer';
import '../App.css';
import './styles/EnhancedWindow.css';
import MicrophoneButton from './MicrophoneButton';

interface EnhancedWindowProps {
  vanillaAudioUrl: string; 
  enhancedAudioUrl: string; 
  onReset: () => void; 
  vanillaAudioBlob?: Blob;
  enhancedAudioBlob?:Blob; 
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({
  vanillaAudioUrl,
  enhancedAudioUrl,
  onReset,
  vanillaAudioBlob,
  enhancedAudioBlob,
}) => {
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
        <AudioPlayer
          audioUrl={vanillaAudioUrl} // Pass the Vanilla audio URL
          title="Vanilla Audio"
          align="right"
          audioBlob={vanillaAudioBlob} // Pass the Vanilla audio blob for the waveform
        />

        {/* Enhanced Audio Player (Lower, like a received message) */}
        <AudioPlayer
          audioUrl={enhancedAudioUrl} // Pass the Enhanced audio URL
          title="Enhanced Audio"
          align="left"
          audioBlob={enhancedAudioBlob}
        />
      </div>

      {/* Centered Microphone Button at the Bottom */}
      <div className="centered-microphone-button">
        <MicrophoneButton onClick={handleMicrophoneClick} size="small" />
      </div>
    </div>
  );
};

export default EnhancedWindow;