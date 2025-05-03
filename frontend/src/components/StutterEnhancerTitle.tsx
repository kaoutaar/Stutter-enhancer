import { useState } from 'react';
import { FaGem } from 'react-icons/fa'; // Import the diamond icon

const StutterEnhancerTitle = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDiamondClick = () => {
    // Display the message in a default browser popup
    alert(
      `From the stuttering community with love`
    );
  };

  return (
    <h1
      style={{
        color: '#800080',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        backgroundColor: 'white',
        padding: '10px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        margin: '0',
      }}
      onMouseEnter={() => setIsHovered(true)} // Show diamond on hover
      onMouseLeave={() => setIsHovered(false)} // Hide diamond on hover out
    >
      Stutter Enhancer
      {isHovered && ( // Only show the diamond when hovered
        <FaGem
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            width: '24px', // Original size (24x24 pixels)
            height: '24px', // Original size (24x24 pixels)
            cursor: 'pointer',
            color: '#00CED1', // Diamond-like color (light cyan)
          }}
          onClick={handleDiamondClick}
        />
      )}
    </h1>
  );
};

export default StutterEnhancerTitle;