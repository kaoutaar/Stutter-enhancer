import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

interface EnhancedWindowProps {
  audioBlob: Blob; // Audio blob from the previous screen (non-null)
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({ audioBlob }) => {
  return (
    <div className="enhanced-window">
      {/* Vanilla Audio Player */}
      <AudioPlayer audioBlob={audioBlob} title="Vanilla Audio" align="right" />

      {/* Enhanced Audio Player */}
      <AudioPlayer audioBlob={audioBlob} title="Enhanced Audio" align="left" />
    </div>
  );
};

export default EnhancedWindow;