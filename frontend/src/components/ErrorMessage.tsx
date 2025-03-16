import React from 'react';
import '../App.css';

interface ErrorMessageProps {
  message: string; // The error message to display
  onReset: () => void; // Callback to reset the app
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