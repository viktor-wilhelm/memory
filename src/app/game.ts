import { BOARD_SIZES } from '../config/boardSizes';
import { createDeck } from './deck';
import { getState, setState } from './state';
import type { GameState, PlayerColor } from './types';

export const MISMATCH_DELAY_MS = 1000;

let mismatchTimer: ReturnType<typeof setTimeout> | null = null;

function cancelPendingMismatch(): void {
  if (mismatchTimer !== null) {
    clearTimeout(mismatchTimer);
    mismatchTimer = null;
  }
}

function otherPlayer(player: PlayerColor): PlayerColor {
  return player === 'blue' ? 'orange' : 'blue';
}

type GameSession = Pick<
  GameState,
  'deck' | 'scores' | 'currentPlayer' | 'firstPickId' | 'secondPickId' | 'isBoardLocked' | 'result'
>;

function emptySession(): GameSession {
  return {
    deck: [],
    scores: { blue: 0, orange: 0 },
    currentPlayer: getState().playerColor,
    firstPickId: null,
    secondPickId: null,
    isBoardLocked: false,
    result: null,
  };
}

export function startGame(): void {
  cancelPendingMismatch();
  const { boardSize } = getState();
  setState({
    screen: 'board',
    boardExitConfirmOpen: false,
    ...emptySession(),
    deck: createDeck(BOARD_SIZES[boardSize].pairCount),
  });
}

export function exitGame(): void {
  cancelPendingMismatch();
  setState({ screen: 'settings', boardExitConfirmOpen: false, ...emptySession() });
}

function resolveMismatch(firstId: number, secondId: number): void {
  mismatchTimer = null;
  const state = getState();
  if (state.firstPickId !== firstId || state.secondPickId !== secondId) return;
  setState({
    deck: state.deck.map((card) =>
      card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card,
    ),
    firstPickId: null,
    secondPickId: null,
    isBoardLocked: false,
    currentPlayer: otherPlayer(state.currentPlayer),
  });
}

export function selectCard(cardId: number): void {
  const state = getState();
  if (state.screen !== 'board' || state.boardExitConfirmOpen || state.isBoardLocked) return;

  const card = state.deck.find((c) => c.id === cardId);
  if (!card || card.isFlipped || card.isMatched) return;

  const deck = state.deck.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c));

  if (state.firstPickId === null) {
    setState({ deck, firstPickId: cardId });
    return;
  }

  const firstId = state.firstPickId;
  const first = state.deck.find((c) => c.id === firstId);

  if (first?.pairId === card.pairId) {
    setState({
      deck: deck.map((c) => (c.pairId === card.pairId ? { ...c, isMatched: true } : c)),
      scores: { ...state.scores, [state.currentPlayer]: state.scores[state.currentPlayer] + 1 },
      firstPickId: null,
      secondPickId: null,
    });
    return;
  }

  setState({ deck, secondPickId: cardId, isBoardLocked: true });
  mismatchTimer = setTimeout(() => resolveMismatch(firstId, cardId), MISMATCH_DELAY_MS);
}
