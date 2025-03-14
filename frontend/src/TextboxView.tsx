import React from 'react';
import MicrophoneButton from './MicrophoneButton';

interface TextboxViewProps {
  textboxValue: string;
  onTextboxChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onMicrophoneClick: () => void;
}

const TextboxView: React.FC<TextboxViewProps> = ({
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
        value={textboxValue}
        onChange={onTextboxChange}
      />
      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
      <MicrophoneButton onClick={onMicrophoneClick} size="small" />
    </div>
  );
};

export default TextboxView;