export enum Screen {
  Home,
  Setup,
  WordPool,
  Settings,
  Reveal,
  End,
}

export enum Theme {
  Codex,
  Classic,
  Forest,
  Daylight,
}

export interface Settings {
  theme: Theme;
  backgroundAnimation: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
}

export interface GameState {
  playerCount: number;
  imposterCount: number;
  secretWord: string;
  roles: ('Imposter' | 'Civilian')[];
}

export interface GameHistoryEntry {
  timestamp: number;
  playerCount: number;
  imposterCount: number;
  imposterIndices: number[];
  secretWord: string;
}
