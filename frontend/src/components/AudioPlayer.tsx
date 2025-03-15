import React, { useRef, useState } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
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

  // Handle play/pause button click
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

  // Handle download button click
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'audio.mp3'; // Default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`audio-player ${align}`}>
      {/* Title */}
      <h3>{title}</h3>

      {/* Audio element */}
      <audio ref={audioRef} src={audioUrl} />

      {/* Waveform */}
      {audioRef.current && (
        <div className="waveform-container">
          <AudioVisualizer
            blob={new Blob()} // Placeholder for visualization
            currentTime={audioRef.current.currentTime || 0}
            width={400}
            height={48}
            barWidth={3}
            gap={1}
            barColor="#7c3aed"
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
          url={audioUrl}
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