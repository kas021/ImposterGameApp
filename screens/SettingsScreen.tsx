import React from 'react';
import { Screen, Settings, Theme } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import Toggle from '../components/Toggle';
import { ArrowLeftIcon } from '../components/icons';

interface SettingsScreenProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  onNavigate: (screen: Screen) => void;
  onVibrate: () => void;
  onClearWords: () => void;
}

const themes = [
  { id: Theme.Codex, name: "Terminal", gradient: "from-black via-indigo-900 to-fuchsia-900" },
  { id: Theme.Classic, name: "Classic", gradient: "from-indigo-900 via-purple-700 to-cyan-500" },
  { id: Theme.Forest, name: "Forest", gradient: "from-slate-900 via-green-900 to-sky-900" },
  { id: Theme.Daylight, name: "Daylight", gradient: "from-sky-100 via-blue-100 to-indigo-100" },
];

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, setSettings, onNavigate, onVibrate, onClearWords }) => {
  
  const handleSettingChange = (key: keyof Settings, value: any) => {
    onVibrate();
    setSettings({ ...settings, [key]: value });
  };
  
  const handleClearWords = () => {
    onVibrate();
    if(window.confirm("Are you sure you want to delete all words from your word pool? This cannot be undone.")) {
      onClearWords();
    }
  };

  const handleBack = () => {
    onVibrate();
    onNavigate(Screen.Home);
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between flex-shrink-0 mb-8">
        <button onClick={handleBack} className="p-2 -ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
          <ArrowLeftIcon className="w-8 h-8"/>
        </button>
        <h2 className="text-3xl font-bold">Settings</h2>
        <div className="w-8"></div>
      </div>
      
      <div className="flex-grow flex flex-col justify-center">
        <Card className="w-full">
          <div className="mb-4">
            <h3 className="text-lg text-[var(--color-text-main)]/90 mb-3">Color Theme</h3>
            <div className="grid grid-cols-2 gap-4">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleSettingChange('theme', theme.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${settings.theme === theme.id ? 'border-[var(--color-accent)] scale-105' : 'border-transparent'}`}
                >
                  <div className={`w-full h-16 rounded-md bg-gradient-to-br ${theme.gradient}`}></div>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
          <hr className="border-white/10 my-4" />
          <Toggle 
            label="Background Animation"
            enabled={settings.backgroundAnimation}
            onChange={(val) => handleSettingChange('backgroundAnimation', val)}
          />
          <Toggle 
            label="Haptic Feedback"
            enabled={settings.hapticFeedback}
            onChange={(val) => handleSettingChange('hapticFeedback', val)}
          />
        </Card>
        
        <div className="mt-8">
          <Button onClick={handleClearWords} variant="danger">
            Clear Word Pool
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;