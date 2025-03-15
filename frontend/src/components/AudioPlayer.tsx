import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { AudioVisualizer } from 'react-audio-visualize';
import '../App.css';

interface AudioPlayerProps {
  audioUrl: string; // URL of the audio file
  title: string; // Title for the audio player
  align: 'left' | 'right'; // Alignment for positioning
  audioBlob?: Blob; // Audio blob for the waveform
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, align, audioBlob }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null); // Use null to indicate unloaded duration
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => {
        if (!isNaN(audio.duration) && isFinite(audio.duration)) {
          setDuration(audio.duration); // Only set duration if it's a valid number
        }
      };

      // Handle audio end
      const handleEnded = () => {
        setIsPlaying(false); // Set isPlaying to false when the audio ends
      };

      // Wait for the audio metadata to load
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);

      // Clean up event listeners
      return () => {
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${title.toLowerCase().replace(' ', '_')}.mp3`; // Dynamic file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`audio-player ${align}`}>
      {/* Title */}
      <h3>{title}</h3>

      {/* Timer */}
      <div className="timer">
        <span>{formatTime(currentTime)}</span>
        {duration !== null && (
          <>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </>
        )}
      </div>

      {/* Waveform */}
      <div className="waveform-container">
        {audioBlob && (
          <AudioVisualizer
            blob={audioBlob} // Pass the actual audio blob
            currentTime={currentTime}
            width={400}
            height={48}
            barWidth={3}
            gap={1}
            barColor="#7c3aed"
          />
        )}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={audioUrl} />

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
          url={audioUrl}
          title={`Check out this ${title.toLowerCase()}!`}
          separator=" "
          className="share-button"
        >
          <WhatsappIcon size={36} round /> {/* Resized to 20px */}
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default AudioPlayer;