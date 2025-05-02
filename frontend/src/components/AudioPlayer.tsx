import React, { useRef, useEffect, useState } from 'react';
import { FaPlay, FaPause, FaDownload, FaLink } from 'react-icons/fa'; // Use FaLink
import { AudioVisualizer } from 'react-audio-visualize';
import { saveAs } from 'file-saver'; // Import file-saver
import '../App.css';
import './styles/AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string; // URL of the audio file
  title: string; // Title for the audio player
  align: 'left' | 'right'; // Alignment for positioning
  audioBlob?: Blob; // Audio blob for the waveform
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, align, audioBlob }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null); // Ref for the waveform container
  const [waveformWidth, setWaveformWidth] = useState(400); // Default width

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => {
        if (!isNaN(audio.duration) && isFinite(audio.duration)) {
          setDuration(audio.duration);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
      };

      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Update waveform width based on container width
  useEffect(() => {
    const updateWaveformWidth = () => {
      if (waveformContainerRef.current) {
        const containerWidth = waveformContainerRef.current.offsetWidth;
        // Scale the waveform width proportionally (e.g., 90% of container width)
        setWaveformWidth(containerWidth * 0.9);
      }
    };

    // Initial width calculation
    updateWaveformWidth();

    // Update width on window resize
    window.addEventListener('resize', updateWaveformWidth);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateWaveformWidth);
    };
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
    if (audioBlob) {
      saveAs(audioBlob, `${title.toLowerCase().replace(' ', '_')}.mp3`); // Save the blob
    } else {
      alert('No audio file available to download.');
    }
  };

  // Handle waveform click to seek
  const handleWaveformClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && waveformContainerRef.current) {
      const waveformRect = waveformContainerRef.current.getBoundingClientRect();
      const clickX = event.clientX - waveformRect.left; // Calculate click position relative to the waveform container
      const waveformWidth = waveformRect.width; // Total width of the waveform container
      const seekTime = (clickX / waveformWidth) * (duration || 0); // Calculate the seek time
      audioRef.current.currentTime = seekTime; // Set the audio's current time
    }
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
      <div
        className="waveform-container"
        ref={waveformContainerRef}
        onClick={handleWaveformClick} // Add click handler for seeking
      >
        {audioBlob && (
          <AudioVisualizer
            blob={audioBlob} // Pass the actual audio blob
            currentTime={currentTime}
            width={waveformWidth} // Use dynamic width
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
      </div>
    </div>
  );
};

export default AudioPlayer;