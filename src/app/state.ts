import type { GameState } from './types';

const state: GameState = {
  theme: 'code-vibes',
  playerColor: 'blue',
  playerSelected: false,
  boardSize: '4x4',
  boardSizeSelected: false,
  screen: 'home',
};

type Listener = (state: GameState) => void;
const listeners = new Set<Listener>();

export function getState(): GameState {
  return state;
}

export function setState(partial: Partial<GameState>): void {
  Object.assign(state, partial);
  listeners.forEach((listener) => listener(state));
}

export function subscribe(listener: Listener): void {
  listeners.add(listener);
}
