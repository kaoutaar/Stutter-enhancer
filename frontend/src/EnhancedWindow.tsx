import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

interface EnhancedWindowProps {
  audioBlob: Blob; // Audio blob from the previous screen (non-null)
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({ audioBlob }) => {
  return (
    <div className="enhanced-window">
      <h2>Enhanced Audio</h2>
      <div className="audio-players">
        {/* Render the AudioPlayer component */}
        <AudioPlayer audioBlob={audioBlob} />
      </div>
    </div>
  );
};

export default EnhancedWindow;