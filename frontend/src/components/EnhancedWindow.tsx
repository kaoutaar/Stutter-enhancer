import React from 'react';
import AudioPlayer from './AudioPlayer';
import '../App.css';
import MicrophoneButton from './MicrophoneButton';

interface EnhancedWindowProps {
  vanillaAudioUrl: string; // URL of the original recorded audio
  enhancedAudioUrl: string; // URL of the enhanced audio
  onReset: () => void; // Callback to reset the app
  vanillaAudioBlob?: Blob; // Audio blob for the Vanilla waveform
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({
  vanillaAudioUrl,
  enhancedAudioUrl,
  onReset,
  vanillaAudioBlob,
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
          // Do not pass audioBlob for Enhanced Audio (waveform will not be displayed)
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