import type { GameState } from './types';

/** Called with the new state after every change. */
type StateListener = (state: GameState) => void;

const GAME_STATE: GameState = {
  theme: null,
  playerColor: 'blue',
  playerSelected: false,
  boardSize: '4x4',
  boardSizeSelected: false,
  screen: 'home',
  boardExitConfirmOpen: false,
  deck: [],
  scores: { blue: 0, orange: 0 },
  currentPlayer: 'blue',
  firstPickId: null,
  secondPickId: null,
  isBoardLocked: false,
  result: null,
};

const STATE_LISTENERS = new Set<StateListener>();

/**
 * Returns the single shared game state.
 * @returns The current game state.
 */
export function getState(): GameState {
  return GAME_STATE;
}

/**
 * Merges a partial update into the state and notifies every listener.
 * @param partial The state fields to change.
 */
export function setState(partial: Partial<GameState>): void {
  Object.assign(GAME_STATE, partial);
  STATE_LISTENERS.forEach((listener: StateListener): void => listener(GAME_STATE));
}

/**
 * Registers a listener that runs after every state change.
 * @param listener The function to call with the new state.
 */
export function subscribe(listener: StateListener): void {
  STATE_LISTENERS.add(listener);
}
