import React from 'react';
import '../App.css';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
};

export default LoadingOverlay;