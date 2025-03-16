import React from 'react';
import MicrophoneButton from './MicrophoneButton';
import AudioControlBar from './AudioControlBar';

interface RecordingViewProps {
  isRecording: boolean;
  showAudioController: boolean;
  mediaRecorder: MediaRecorder | undefined;
  recordingTime: number;
  isPaused: boolean;
  onStartRecording: () => void;
  onUpload: (blob: Blob, url: string) => void; // Updated to accept two arguments
  onPauseResume: () => void;
  onStop: () => void;
}

const RecordingView: React.FC<RecordingViewProps> = ({
  isRecording,
  showAudioController,
  mediaRecorder,
  recordingTime,
  isPaused,
  onStartRecording,
  onUpload,
  onPauseResume,
  onStop,
}) => {
  return (
    <>
      {!isRecording && !showAudioController && (
        <MicrophoneButton onClick={onStartRecording} size="large" />
      )}
      {(isRecording || showAudioController) && (
        <AudioControlBar
          mediaRecorder={mediaRecorder}
          recordingTime={recordingTime}
          isPaused={isPaused}
          onUpload={onUpload} // Pass the updated onUpload function
          onPauseResume={onPauseResume}
          onStop={onStop}
        />
      )}
    </>
  );
};

export default RecordingView;