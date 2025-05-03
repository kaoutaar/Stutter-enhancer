import React from 'react';
import EnhancedWindow from './EnhancedWindow';

interface EnhancedViewProps {
  vanillaAudioUrl: string; 
  enhancedAudioUrl: string; 
  onReset: () => void; 
  vanillaAudioBlob?: Blob; 
  enhancedAudioBlob?: Blob; 
}

const EnhancedView: React.FC<EnhancedViewProps> = ({
  vanillaAudioUrl,
  enhancedAudioUrl,
  onReset,
  vanillaAudioBlob,
  enhancedAudioBlob,
}) => {
  return (
    <EnhancedWindow
      vanillaAudioUrl={vanillaAudioUrl}
      enhancedAudioUrl={enhancedAudioUrl}
      onReset={onReset}
      vanillaAudioBlob={vanillaAudioBlob}
      enhancedAudioBlob={enhancedAudioBlob}
    />
  );
};

export default EnhancedView;