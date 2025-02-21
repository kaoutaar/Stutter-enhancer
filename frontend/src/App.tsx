import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import StutterEnhancerTitle from './StutterEnhancerTitle';
import './App.css'; // Import the CSS file

export default function App() {
  const [recordings, setRecordings] = useState<{ id: number; blob: Blob; title: string; isSubmitted?: boolean }[]>([]); // State to track all recordings
  const [newRecordingTitle, setNewRecordingTitle] = useState(''); // State to track the title input
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const addAudioElement = (blob: Blob) => {
    const newRecording = {
      id: Date.now(), // Unique ID for each recording
      blob,
      title: newRecordingTitle || `Recording ${recordings.length + 1}`, // Use custom title or default
      isSubmitted: false, // Track if the recording has been submitted
    };
    setRecordings((prevRecordings) => [...prevRecordings, newRecording]);
    setNewRecordingTitle(''); // Reset the title input
  };

  const handleSubmit = (id: number) => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
      setRecordings((prevRecordings) =>
        prevRecordings.map((recording) =>
          recording.id === id ? { ...recording, isSubmitted: true } : recording
        )
      ); // Mark the recording as submitted
    }, 3000); // 3-second delay
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
              {recording.isSubmitted && ( // Show success message if submitted
                <p style={{ color: 'green', margin: '10px 0' }}>
                  Voice Note sent to Koki's api ❤️
                </p>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                {isLoading ? (
                  <div className="spinner"></div> // Show spinning wheel
                ) : (
                  <button
                    className="submit-button"
                    onClick={() => handleSubmit(recording.id)} // Start loading and mark as submitted after 3 seconds
                  >
                    Submit?
                  </button>
                )}
                <button
                  style={{
                    backgroundColor: 'red', // Red background
                    color: 'white', // White text
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                  onClick={() => {
                    setRecordings((prevRecordings) =>
                      prevRecordings.filter((r) => r.id !== recording.id)
                    ); // Remove the recording
                  }}
                >
                  Delete
                </button>
              </div>
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