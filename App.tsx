import React, { useState, useCallback, useEffect } from 'react';
import { Screen, Settings, GameState, GameHistoryEntry } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS, INITIAL_WORDS, DEFAULT_SETTINGS, MAX_HISTORY_SIZE } from './constants';
import { themes } from './themes';
import AnimatedBackground from './components/AnimatedBackground';
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import WordPoolScreen from './screens/WordPoolScreen';
import SettingsScreen from './screens/SettingsScreen';
import RevealScreen from './screens/RevealScreen';
import EndScreen from './screens/EndScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Home);
  const [wordPool, setWordPool] = useLocalStorage<string[]>(LOCAL_STORAGE_KEYS.WORDS, INITIAL_WORDS);
  const [settings, setSettings] = useLocalStorage<Settings>(LOCAL_STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const [gameHistory, setGameHistory] = useLocalStorage<GameHistoryEntry[]>(LOCAL_STORAGE_KEYS.GAME_HISTORY, []);
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Apply theme colors as CSS variables to the root element
  useEffect(() => {
    const theme = themes[settings.theme];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
  }, [settings.theme]);

  const navigate = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  // Centralized vibration handler to respect user settings
  const handleVibrate = useCallback(() => {
    if (settings.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50); // A short, subtle vibration
    }
  }, [settings.hapticFeedback]);

  /**
   * Starts a new game with an adaptive algorithm to select imposters fairly.
   * This function analyzes the last 20 games to determine which player positions
   * have been imposter most frequently and reduces their probability of being
   * chosen again, promoting a more balanced distribution over time.
   */
  const startGame = (playerCount: number, imposterCount: number) => {
    if (wordPool.length === 0) {
        alert("Please add words to the Word Pool before starting a game.");
        return;
    }
    const secretWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    
    // --- Adaptive Imposter Selection Algorithm ---

    // 1. Analyze past games to find imposter frequencies for the current player count.
    const imposterFrequency = Array(playerCount).fill(0);
    const relevantHistory = gameHistory.filter(game => game.playerCount === playerCount);
    
    relevantHistory.forEach(game => {
        game.imposterIndices.forEach(index => {
            if (index < playerCount) {
                imposterFrequency[index]++;
            }
        });
    });

    // 2. Assign a higher weight to players who have been imposter less often.
    // The '+1' ensures every player has a chance, even if they were an imposter recently.
    const maxFrequency = Math.max(0, ...imposterFrequency);
    const weights = imposterFrequency.map(freq => (maxFrequency - freq + 1));

    // 3. Perform a weighted random selection to choose the imposters.
    // This avoids simple randomness which can lead to streaks for certain players.
    const imposterIndices: number[] = [];
    const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
    
    for (let i = 0; i < imposterCount; i++) {
        const totalWeight = availableIndices.reduce((sum, index) => sum + weights[index], 0);
        let random = Math.random() * totalWeight;

        let selectedIndex = -1;
        for (const index of availableIndices) {
            if (random < weights[index]) {
                selectedIndex = index;
                break;
            }
            random -= weights[index];
        }
        
        // Fallback in case of floating point inaccuracies
        if (selectedIndex === -1) { 
            selectedIndex = availableIndices[availableIndices.length - 1];
        }

        imposterIndices.push(selectedIndex);
        // Remove the selected player from the pool for the next iteration
        availableIndices.splice(availableIndices.indexOf(selectedIndex), 1);
    }

    // 4. Create the final roles array from the selected indices.
    const roles: ('Imposter' | 'Civilian')[] = Array(playerCount).fill('Civilian');
    imposterIndices.forEach(index => {
        roles[index] = 'Imposter';
    });
    
    // 5. Record this game's result to inform future selections.
    // The history is capped at a max size to keep the algorithm relevant.
    const newHistoryEntry: GameHistoryEntry = {
        timestamp: Date.now(),
        playerCount,
        imposterCount,
        imposterIndices: imposterIndices.sort((a, b) => a - b),
        secretWord,
    };
    const updatedHistory = [...gameHistory, newHistoryEntry].slice(-MAX_HISTORY_SIZE);
    setGameHistory(updatedHistory);

    setGameState({
        playerCount,
        imposterCount,
        secretWord,
        roles,
    });
    navigate(Screen.Reveal);
  };

  const renderScreen = () => {
    switch (screen) {
      case Screen.Home:
        return <HomeScreen onNavigate={navigate} onVibrate={handleVibrate} />;
      case Screen.Setup:
        return <SetupScreen onStartGame={startGame} onNavigate={navigate} wordCount={wordPool.length} onVibrate={handleVibrate} />;
      case Screen.WordPool:
        return <WordPoolScreen wordPool={wordPool} setWordPool={setWordPool} onNavigate={navigate} onVibrate={handleVibrate} />;
      case Screen.Settings:
        return <SettingsScreen settings={settings} setSettings={setSettings} onNavigate={navigate} onVibrate={handleVibrate} onClearWords={() => setWordPool([])} />;
      case Screen.Reveal:
        // If gameState is null for some reason, safely fallback to the home screen.
        return gameState ? <RevealScreen gameState={gameState} onGameEnd={() => navigate(Screen.End)} onVibrate={handleVibrate} /> : <HomeScreen onNavigate={navigate} onVibrate={handleVibrate} />;
      case Screen.End:
        return <EndScreen onPlayAgain={() => navigate(Screen.Setup)} onGoHome={() => navigate(Screen.Home)} onVibrate={handleVibrate} />;
      default:
        return <HomeScreen onNavigate={navigate} onVibrate={handleVibrate} />;
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden font-sans text-[var(--color-text-main)] bg-[var(--color-background-main)]`}>
      <AnimatedBackground animate={settings.backgroundAnimation} />
      <main className="relative z-10 h-full w-full p-4 flex flex-col items-center justify-center">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
