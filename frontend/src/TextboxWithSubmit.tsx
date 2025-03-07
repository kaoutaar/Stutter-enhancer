import React from 'react';
import MicrophoneButton from './MicrophoneButton';
import './App.css';

interface TextboxWithSubmitProps {
  textboxValue: string;
  onTextboxChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onMicrophoneClick: () => void;
}

const TextboxWithSubmit: React.FC<TextboxWithSubmitProps> = ({
  textboxValue,
  onTextboxChange,
  onSubmit,
  onMicrophoneClick,
}) => {
  return (
    <div className="textbox-container">
      <textarea
        className="textbox"
        placeholder="Enter your text here..."
        rows={10}
        cols={50}
        value={textboxValue} // Bind the value to the textbox
        onChange={onTextboxChange} // Allow editing
      />
      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
      {/* Small Microphone Circle */}
      <MicrophoneButton onClick={onMicrophoneClick} size="small" />
    </div>
  );
};

export default TextboxWithSubmit;