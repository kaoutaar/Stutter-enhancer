import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { AudioVisualizer } from 'react-audio-visualize';
import './App.css';

interface AudioPlayerProps {
  audioBlob: Blob; // Audio blob to play (non-null)
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBlob }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Track playback state
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause playback
      } else {
        audioRef.current.play(); // Start playback
      }
      setIsPlaying(!isPlaying); // Toggle playback state
    }
  };

  // Update current time during playback
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', updateTime);
      return () => audio.removeEventListener('timeupdate', updateTime);
    }
  }, []);

  // Reset playback state when audioBlob changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioBlob]);

  return (
    <div className="audio-player">
      {/* Audio element */}
      <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} />

      {/* Play/Pause Button */}
      <button className="play-pause-button" onClick={handlePlayPause}>
        {isPlaying ? <FaPause size={24} color="#4F46E5" /> : <FaPlay size={24} color="#4F46E5" />}
      </button>

      {/* Waveform */}
      <div className="waveform-container">
        <AudioVisualizer
          blob={audioBlob}
          currentTime={currentTime}
          width={400} // Width of the waveform
          height={64} // Height of the waveform
          barWidth={3} // Width of each bar in the waveform
          gap={1} // Gap between bars
          barColor="#4F46E5" // Color of the waveform bars
        />
      </div>
    </div>
  );
};

export default AudioPlayer;