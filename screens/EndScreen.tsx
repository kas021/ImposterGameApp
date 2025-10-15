
import React from 'react';
import Button from '../components/Button';
import Confetti from '../components/Confetti';

interface EndScreenProps {
  onPlayAgain: () => void;
  onGoHome: () => void;
  onVibrate: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onPlayAgain, onGoHome, onVibrate }) => {
  const handlePlayAgain = () => {
    onVibrate();
    onPlayAgain();
  };

  const handleGoHome = () => {
    onVibrate();
    onGoHome();
  };

  return (
    <>
      <Confetti />
      <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto text-center">
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl text-white/80">Everyone has seen their word.</p>
          <p className="text-xl text-white/80 mt-2">Time to find the imposter!</p>
        </div>

        <div className="w-full space-y-4 pb-8">
          <Button onClick={handlePlayAgain} variant="primary" className="text-2xl py-4">
            Play Again
          </Button>
          <Button onClick={handleGoHome} variant="secondary">
            Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default EndScreen;
