const StutterEnhancerTitle = () => {
  return (
    <h1
      style={{
        color: '#800080',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        position: 'fixed', // Keeps the title fixed at the top
        top: '0',          // Positions it at the top
        left: '50%',       // Centers it horizontally
        transform: 'translateX(-50%)', // Adjusts for perfect centering
        width: '100%',     // Ensures it spans the full width
        backgroundColor: 'white', // Optional: Add a background to make it stand out
        padding: '10px 0', // Adds some padding for better spacing
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Optional: Adds a subtle shadow
        zIndex: 1000,      // Ensures it stays on top of other content
        margin: '0',       // Removes default margin
      }}
    >
      Stutter Enhancer
    </h1>
  );
};

export default StutterEnhancerTitle;