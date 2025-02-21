import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import './App.css'; // Import the CSS file

export default function App() {
  const [recordings, setRecordings] = useState<{ id: number; blob: Blob; title: string }[]>([]); // State to track all recordings
  const [newRecordingTitle, setNewRecordingTitle] = useState(''); // State to track the title input

  const addAudioElement = (blob: Blob) => {
    const newRecording = {
      id: Date.now(), // Unique ID for each recording
      blob,
      title: newRecordingTitle || `Recording ${recordings.length + 1}`, // Use custom title or default
    };
    setRecordings((prevRecordings) => [...prevRecordings, newRecording]);
    setNewRecordingTitle(''); // Reset the title input
  };

  const removeRecording = (id: number) => {
    setRecordings((prevRecordings) => prevRecordings.filter((recording) => recording.id !== id));
  };

  const handleSubmit = () => {
    alert("Voice Note sent to Koki's api ❤️"); // Display the alert
  };

  const handleDiamondClick = () => {
    alert("Here is the Diamond Julliet 💎"); // Display the alert
  };

  return (
    <>
      <StutterEnhancerTitle />
      <div className="audio-recorder-container">
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          onNotAllowedOrFound={(err) => console.table(err)}
          downloadFileExtension="mp3"
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
          showVisualizer={true}
        />
        {/* Input for custom recording title */}
        <input
          type="text"
          placeholder="Enter a title for your recording"
          value={newRecordingTitle}
          onChange={(e) => setNewRecordingTitle(e.target.value)}
          className="title-input"
        />
        {/* Container for the dynamically added audio elements and buttons */}
        <div id="audio-container">
          {recordings.map((recording) => (
            <div key={recording.id} className="audio-item-container">
              <h3 className="recording-title">{recording.title}</h3>
              <audio src={URL.createObjectURL(recording.blob)} controls />
              <button
                className="submit-button"
                onClick={() => {
                  removeRecording(recording.id); // Remove the recording
                  handleSubmit(); // Display the alert
                }}
              >
                Submit?
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Diamond emoji at the bottom of the page */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          cursor: 'pointer',
        }}
        onClick={handleDiamondClick}
      >
        💎
      </div>
    </>
  );
}