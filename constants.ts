import { Settings, Theme } from './types';

export const MAX_HISTORY_SIZE = 20;

export const LOCAL_STORAGE_KEYS = {
  WORDS: 'imposter_words',
  SETTINGS: 'imposter_settings',
  GAME_HISTORY: 'imposter_game_history',
};

export const INITIAL_WORDS: string[] = [
  'Apple',
  'Banana',
  'Carrot',
  'Dog',
  'Elephant',
  'Forest',
  'Guitar',
  'House',
  'Internet',
  'Jungle',
  'Kangaroo',
  'Lion',
  'Mountain',
  'Ninja',
  'Ocean',
  'Penguin',
  'Queen',
  'Rainbow',
  'Sun',
  'Tiger',
];

export const DEFAULT_SETTINGS: Settings = {
  theme: Theme.Classic,
  backgroundAnimation: true,
  soundEffects: true,
  hapticFeedback: true,
};
