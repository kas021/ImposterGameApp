import React, { useEffect, useState } from 'react';

const ConfettiPiece: React.FC<{ id: number }> = ({ id }) => {
  const colorVar = `var(--confetti-color-${id % 5})`;
  const size = Math.random() * 8 + 6;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    animation: `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
    transform: `rotate(${Math.random() * 360}deg)`,
    backgroundColor: colorVar,
  };

  return <div className="absolute top-[-20px]" style={style} />;
};

const Confetti: React.FC = () => {
    const [pieces, setPieces] = useState<number[]>([]);

    useEffect(() => {
        setPieces(Array.from({ length: 100 }, (_, i) => i));

        // Inject keyframes dynamically to avoid having a global stylesheet for a single component.
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);

        // Cleanup the stylesheet when the component unmounts.
        return () => {
            document.head.removeChild(styleSheet);
        }
    }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map(id => <ConfettiPiece key={id} id={id} />)}
    </div>
  );
};

export default Confetti;
