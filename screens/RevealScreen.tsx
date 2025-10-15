import React, { useState } from 'react';
import { GameState } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

interface RevealScreenProps {
  gameState: GameState;
  onGameEnd: () => void;
  onVibrate: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ gameState, onGameEnd, onVibrate }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    onVibrate();
    setIsRevealed(true);
  };

  const handleNext = () => {
    onVibrate();
    if (currentPlayer < gameState.playerCount - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setIsRevealed(false);
    } else {
      onGameEnd();
    }
  };
  
  const role = gameState.roles[currentPlayer];
  const isLastPlayer = currentPlayer === gameState.playerCount - 1;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto text-center">
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        {!isRevealed ? (
          <Card className="w-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-100" onClick={handleReveal}>
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-2xl text-[var(--color-text-muted)]">Player {currentPlayer + 1}</p>
              <h3 className="text-4xl font-bold mt-4">Tap to Reveal</h3>
            </div>
          </Card>
        ) : (
          <Card className="w-full">
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-2xl text-[var(--color-text-muted)]">{role === 'Imposter' ? 'Your role is...' : 'The word is...'}</p>
              {role === 'Imposter' ? (
                <h3 className="text-6xl font-extrabold mt-4 text-red-500" style={{textShadow: '0 0 15px rgba(239, 68, 68, 0.7)'}}>
                  IMPOSTER
                </h3>
              ) : (
                <h3 className="text-5xl font-bold mt-4 text-[var(--color-accent)]">
                  {gameState.secretWord}
                </h3>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="w-full pb-8">
        {isRevealed && (
          <Button onClick={handleNext} className="text-2xl py-4">
            {isLastPlayer ? 'Finish' : 'Next Player'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RevealScreen;
