import { BOARD_SIZES } from '../config/boardSizes';
import { createDeck } from './deck';
import { getState, setState } from './state';
import type { GameResult, GameState, PlayerColor, Screen } from './types';

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

export function determineResult(scores: Record<PlayerColor, number>): Exclude<GameResult, null> {
  if (scores.orange > scores.blue) return 'orange';
  if (scores.blue > scores.orange) return 'blue';
  return 'draw';
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

function leaveGame(screen: Screen): void {
  cancelPendingMismatch();
  setState({ screen, boardExitConfirmOpen: false, ...emptySession() });
}

export function exitGame(): void {
  leaveGame('settings');
}

export function returnToStart(): void {
  leaveGame('home');
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
    const matchedDeck = deck.map((c) => (c.pairId === card.pairId ? { ...c, isMatched: true } : c));
    const scores = { ...state.scores, [state.currentPlayer]: state.scores[state.currentPlayer] + 1 };
    const isGameFinished = matchedDeck.every((c) => c.isMatched);
    setState({
      deck: matchedDeck,
      scores,
      firstPickId: null,
      secondPickId: null,
      isBoardLocked: false,
      ...(isGameFinished ? { result: determineResult(scores), screen: 'gameOver' as const } : {}),
    });
    return;
  }

  setState({ deck, secondPickId: cardId, isBoardLocked: true });
  mismatchTimer = setTimeout(() => resolveMismatch(firstId, cardId), MISMATCH_DELAY_MS);
}
