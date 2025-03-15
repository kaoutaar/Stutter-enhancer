import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import { AudioVisualizer } from 'react-audio-visualize';
import '../App.css';

interface AudioPlayerProps {
  audioUrl: string; // URL of the audio file
  title: string; // Title for the audio player
  align: 'left' | 'right'; // Alignment for positioning
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, align }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`audio-player ${align}`}>
      <h3>{title}</h3>
      <audio ref={audioRef} onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)} />
      <button className="play-pause-button" onClick={handlePlayPause}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
};

export default AudioPlayer;