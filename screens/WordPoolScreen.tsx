import React, { useState, useRef } from 'react';
import { Screen } from '../types';
import Button from '../components/Button';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '../components/icons';

interface WordPoolScreenProps {
  wordPool: string[];
  setWordPool: (words: string[]) => void;
  onNavigate: (screen: Screen) => void;
  onVibrate: () => void;
}

const WordPoolScreen: React.FC<WordPoolScreenProps> = ({ wordPool, setWordPool, onNavigate, onVibrate }) => {
  const [newWord, setNewWord] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddWord = () => {
    onVibrate();
    const trimmedWord = newWord.trim();
    if (trimmedWord && !wordPool.includes(trimmedWord)) {
      setWordPool([...wordPool, trimmedWord]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    onVibrate();
    setWordPool(wordPool.filter(word => word !== wordToRemove));
  };
  
  const handleBack = () => {
    onVibrate();
    onNavigate(Screen.Home);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between flex-shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
          <ArrowLeftIcon className="w-8 h-8"/>
        </button>
        <h2 className="text-3xl font-bold">Word Pool</h2>
        <div className="w-8"></div>
      </div>
      
      <div className="my-4 bg-black/20 backdrop-blur-sm rounded-xl flex items-center p-1 border border-white/20">
        <input
          ref={inputRef}
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new word..."
          className="flex-grow bg-transparent p-3 outline-none text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]"
        />
        <button onClick={handleAddWord} className="bg-[var(--color-primary)] rounded-lg p-3 m-1 transition-colors hover:bg-[var(--color-primary-hover)] active:scale-95">
          <PlusIcon className="w-6 h-6 text-[var(--color-text-on-primary)]" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-2">
        {wordPool.map((word, index) => (
          <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
            <span className="text-lg">{word}</span>
            <button onClick={() => handleRemoveWord(word)} className="p-1 text-red-400 hover:text-red-300 transition-colors">
              <TrashIcon className="w-5 h-5"/>
            </button>
          </div>
        ))}
        {wordPool.length === 0 && (
          <div className="text-center text-[var(--color-text-muted)] pt-16">
            <p>Your word pool is empty.</p>
            <p>Add some words to play!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPoolScreen;
