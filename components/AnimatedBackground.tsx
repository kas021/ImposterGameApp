import React from 'react';

interface AnimatedBackgroundProps {
  animate: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ animate }) => {
  const animationClass = animate ? 'animate-gradient' : '';
  
  return (
    <div 
      className={`fixed inset-0 -z-10 ${animationClass}`}
      style={{
        background: `linear-gradient(135deg, var(--color-background-start), var(--color-background-via), var(--color-background-end))`,
        backgroundSize: '200% 200%',
        animation: animate ? 'gradient 15s ease infinite' : 'none',
      }}
    >
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
