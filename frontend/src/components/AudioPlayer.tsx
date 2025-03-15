import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import { AudioVisualizer } from 'react-audio-visualize';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import '../App.css';

interface AudioPlayerProps {
  audioBlob: Blob; // Audio blob to play (non-null)
  title: string; // Title for the audio player
  align: 'left' | 'right'; // Alignment for positioning
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBlob, title, align }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Track playback state
  const audioRef = useRef<HTMLAudioElement>(null); // Reference to the audio element
  const [audioUrl, setAudioUrl] = useState<string>(''); // Store the stable audio URL
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const [error, setError] = useState<string | null>(null); // Track errors

  // Create a stable URL for the audio blob
  useEffect(() => {
    if (!audioBlob || audioBlob.size === 0) {
      setError('Invalid audio blob. Please record audio again.');
      return;
    }

    const url = URL.createObjectURL(audioBlob); // Create a URL for the blob
    setAudioUrl(url); // Set the URL in state

    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(url); // Release the object URL to free up memory
    };
  }, [audioBlob]);

  // Update current time during playback
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const handleEnded = () => setIsPlaying(false); // Reset play/pause button when audio ends

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause playback
      } else {
        audioRef.current.play().catch((error) => {
          setError('Error playing audio. Please try Google Chrome or another browser.');
          console.error('Error playing audio:', error);
        }); // Start playback
      }
      setIsPlaying(!isPlaying); // Toggle playback state
    }
  };

  // Handle download button click
  const handleDownload = async () => {
    try {
      // Convert the WebM blob to MP3
      const mp3Blob = await convertWebmToMp3(audioBlob);
      const url = URL.createObjectURL(mp3Blob); // Create a URL for the MP3 blob
      const link = document.createElement('a'); // Create a temporary <a> element
      link.href = url; // Use the stable audio URL
      link.download = 'recording.mp3'; // Set the default file name
      document.body.appendChild(link); // Append the link to the DOM
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Remove the link from the DOM
      URL.revokeObjectURL(url); // Release the object URL to free up memory
    } catch (error) {
      setError('Failed to convert the audio to MP3. Please try again.');
      console.error('Error converting audio:', error);
    }
  };

  // Convert WebM to MP3 (dummy implementation)
  const convertWebmToMp3 = async (webmBlob: Blob): Promise<Blob> => {
    // In a real implementation, you would use a library like ffmpeg.js
    // For now, we'll just return the original blob as a placeholder
    return new Blob([webmBlob], { type: 'audio/mp3' });
  };

  return (
    <div className={`audio-player ${align}`}>
      {/* Title */}
      <h3>{title}</h3>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Audio element */}
      <audio ref={audioRef} src={audioUrl} /> {/* Hidden audio element */}

      {/* Waveform */}
      {audioRef.current && (
        <div className="waveform-container">
          <AudioVisualizer
            blob={audioBlob}
            currentTime={currentTime}
            width={400} // Width of the waveform
            height={48} // Reduced height of the waveform
            barWidth={3} // Width of each bar in the waveform
            gap={1} // Gap between bars
            barColor="#7c3aed" // Color of the waveform bars
          />
        </div>
      )}

      {/* Buttons Container */}
      <div className="buttons-container">
        {/* Play/Pause Button */}
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        {/* Download Button */}
        <button className="download-button" onClick={handleDownload}>
          <FaDownload size={20} />
        </button>

        {/* Share on WhatsApp Button */}
        <WhatsappShareButton
          url={audioUrl} // URL of the audio file
          title="Check out this enhanced audio!"
          separator=" "
          className="share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default AudioPlayer;