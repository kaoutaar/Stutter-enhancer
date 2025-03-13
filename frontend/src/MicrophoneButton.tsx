import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import './App.css';

interface MicrophoneButtonProps {
  onClick: () => void;
  size?: 'large' | 'small';
  isRecording?: boolean; // Add isRecording prop for visual feedback
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ onClick, size = 'large', isRecording = false }) => {
  const circleClass = size === 'large' ? 'microphone-circle' : 'small-microphone-circle';
  const iconClass = size === 'large' ? 'microphone-icon' : 'small-microphone-icon';

  return (
    <div className={`${circleClass} ${isRecording ? 'recording' : ''}`} onClick={onClick}>
      <div className={iconClass}>
        <FaMicrophone />
      </div>
    </div>
  );
};

export default MicrophoneButton;