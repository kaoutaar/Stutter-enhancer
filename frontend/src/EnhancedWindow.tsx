import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

interface EnhancedWindowProps {
  audioBlob: Blob; // Audio blob from the previous screen (non-null)
}

const EnhancedWindow: React.FC<EnhancedWindowProps> = ({ audioBlob }) => {
  // Handle download button click
  const handleDownload = () => {
    const url = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'enhanced-audio.mp3'; // Set the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="enhanced-window">
      <h2>Enhanced Audio</h2>
      <div className="audio-players">
        {/* First AudioPlayer */}
        <AudioPlayer audioBlob={audioBlob} />
        {/* Second AudioPlayer */}
        <AudioPlayer audioBlob={audioBlob} />
      </div>
      {/* Download Button */}
      <button className="download-button" onClick={handleDownload}>
        Download MP3
      </button>
    </div>
  );
};

export default EnhancedWindow;