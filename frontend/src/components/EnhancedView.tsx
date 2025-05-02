import React from 'react';
import EnhancedWindow from './EnhancedWindow';

interface EnhancedViewProps {
  vanillaAudioUrl: string; // URL of the original recorded audio
  enhancedAudioUrl: string; // URL of the enhanced audio
  onReset: () => void; // Callback to reset the app
  vanillaAudioBlob?: Blob; // Audio blob for the Vanilla waveform
  enhancedAudioBlob?: Blob; // Audio blob for the Enhanced waveform
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