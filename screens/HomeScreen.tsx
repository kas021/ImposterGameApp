import React from 'react';
import { Screen } from '../types';
import Button from '../components/Button';
import { BookOpenIcon, SettingsIcon } from '../components/icons';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onVibrate: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onVibrate }) => {
  const handleNavigate = (screen: Screen) => {
    onVibrate();
    onNavigate(screen);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto text-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-8xl font-extrabold text-white animate-bounce-slow tracking-tighter" style={{ textShadow: '0 0 25px var(--color-accent-glow)' }}>
          Imposter
        </h1>
        <p className="text-xl text-[var(--color-accent-subtle)] mt-2">The offline party game.</p>
      </div>

      <div className="w-full space-y-4 pb-8">
        <Button onClick={() => handleNavigate(Screen.Setup)} variant="primary" className="text-2xl py-4">
          Play
        </Button>
        <div className="flex space-x-4">
          <Button onClick={() => handleNavigate(Screen.WordPool)} variant="secondary">
            <BookOpenIcon /> Word Pool
          </Button>
          <Button onClick={() => handleNavigate(Screen.Settings)} variant="secondary">
            <SettingsIcon /> Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
