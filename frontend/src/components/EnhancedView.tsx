import React from 'react';
import EnhancedWindow from './EnhancedWindow';

interface EnhancedViewProps {
  audioUrl: string; // URL of the enhanced audio file
  onReset: () => void; // Callback to reset the app
}

const EnhancedView: React.FC<EnhancedViewProps> = ({ audioUrl, onReset }) => {
  return (
    <EnhancedWindow audioUrl={audioUrl} onReset={onReset} />
  );
};

export default EnhancedView;