import React, { useState } from 'react';
import { Screen } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import Slider from '../components/Slider';
import { ArrowLeftIcon } from '../components/icons';

interface SetupScreenProps {
  onStartGame: (playerCount: number, imposterCount: number) => void;
  onNavigate: (screen: Screen) => void;
  wordCount: number;
  onVibrate: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onNavigate, wordCount, onVibrate }) => {
  const [players, setPlayers] = useState(4);
  const [imposters, setImposters] = useState(1);
  
  const handlePlayerChange = (value: number) => {
    setPlayers(value);
    if (imposters >= value) {
      setImposters(value - 1);
    }
  };

  const handleStart = () => {
    onVibrate();
    onStartGame(players, imposters);
  }
  
  const handleBack = () => {
    onVibrate();
    onNavigate(Screen.Home);
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm mx-auto">
      <div className="flex-shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
          <ArrowLeftIcon className="w-8 h-8"/>
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl font-bold mb-8">Game Setup</h2>
        <Card className="w-full space-y-8">
          <Slider 
            label="Players"
            value={players}
            min={2}
            max={10}
            onChange={handlePlayerChange}
          />
          <Slider 
            label="Imposters"
            value={imposters}
            min={1}
            max={Math.max(1, players - 1)}
            onChange={setImposters}
          />
          <div className="text-center text-[var(--color-text-muted)] pt-4">
            <p><span className="font-bold text-[var(--color-accent)]">{wordCount}</span> words in pool</p>
          </div>
        </Card>
      </div>

      <div className="flex-shrink-0 pb-8">
        <Button onClick={handleStart} className="text-2xl py-4" disabled={wordCount === 0}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
