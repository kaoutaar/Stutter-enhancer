import React from 'react';
import '../App.css';

interface ErrorMessageProps {
  message: string; 
  onReset: () => void; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onReset }) => {
  return (
    <div className="error-message-container">
      <p className="error-message">{message}</p>
      <button className="reset-button" onClick={onReset}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;