import { BOARD_SIZES } from '../config/board-sizes';
import { createDeck } from './deck';
import { getState, setState } from './state';
import type { CardState, GameResult, GameState, PlayerColor, Screen } from './types';

/** How long a mismatched pair stays face up before it flips back. */
export const MISMATCH_DELAY_MS = 1000;

/** Lets the flip finish and keeps the final pair visible as matched before the Game Over screen. */
export const GAME_OVER_DELAY_MS = 700;

/** Lets the Game Over score panel register before the themed Winner/Draw screen is revealed. */
export const RESULT_REVEAL_DELAY_MS = 1200;

/** Fields of the state that belong to one round and are reset between rounds. */
type GameSession = Pick<
  GameState,
  'deck' | 'scores' | 'currentPlayer' | 'firstPickId' | 'secondPickId' | 'isBoardLocked' | 'result'
>;

type TimerHandle = ReturnType<typeof setTimeout>;

let mismatchTimer: TimerHandle | null = null;
let gameOverTimer: TimerHandle | null = null;
let resultTimer: TimerHandle | null = null;

/**
 * Stops a pending timer.
 * @param timer The timer to stop, if any.
 * @returns Always null, so the caller can reset its timer variable.
 */
function clearTimer(timer: TimerHandle | null): null {
  if (timer !== null) clearTimeout(timer);
  return null;
}

/** Stops every timer that would still change the state after the round was left. */
function cancelPendingTimers(): void {
  mismatchTimer = clearTimer(mismatchTimer);
  gameOverTimer = clearTimer(gameOverTimer);
  resultTimer = clearTimer(resultTimer);
}

/**
 * Returns the opponent of a player.
 * @param player The player whose opponent is wanted.
 * @returns The other player.
 */
function otherPlayer(player: PlayerColor): PlayerColor {
  return player === 'blue' ? 'orange' : 'blue';
}

/**
 * Decides who won a finished round.
 * @param scores The final scores.
 * @returns The player with the most points, or "draw" on a tie.
 */
export function determineResult(scores: Record<PlayerColor, number>): Exclude<GameResult, null> {
  if (scores.orange > scores.blue) return 'orange';
  if (scores.blue > scores.orange) return 'blue';
  return 'draw';
}

/**
 * Creates the state of a round that has not started yet.
 * @returns An empty round that begins with the selected player.
 */
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

/** Starts a new round on a freshly shuffled deck of the selected board size. */
export function startGame(): void {
  cancelPendingTimers();
  const { boardSize } = getState();
  setState({
    screen: 'board',
    boardExitConfirmOpen: false,
    ...emptySession(),
    deck: createDeck(BOARD_SIZES[boardSize].pairCount),
  });
}

/**
 * Leaves the current round and resets it.
 * @param screen The screen to show next.
 */
function leaveGame(screen: Screen): void {
  cancelPendingTimers();
  setState({ screen, boardExitConfirmOpen: false, ...emptySession() });
}

/** Leaves the board and returns to the Settings screen. */
export function exitGame(): void {
  leaveGame('settings');
}

/** Leaves the result screen and returns to the start screen. */
export function returnToStart(): void {
  leaveGame('home');
}

/** Switches from the Game Over screen to the themed Winner/Draw screen. */
function showResult(): void {
  resultTimer = null;
  const { screen, result } = getState();
  if (screen !== 'gameOver' || result === null) return;
  setState({ screen: 'result' });
}

/** Switches from the finished board to the Game Over screen. */
function showGameOver(): void {
  gameOverTimer = null;
  const { screen, result } = getState();
  if (screen !== 'board' || result === null) return;
  setState({ screen: 'gameOver', boardExitConfirmOpen: false });
  resultTimer = setTimeout(showResult, RESULT_REVEAL_DELAY_MS);
}

/**
 * Returns copies of the listed cards with the given changes applied.
 * @param deck The current deck.
 * @param ids The ids of the cards to change.
 * @param changes The card fields to overwrite.
 * @returns The updated deck.
 */
function updateCards(deck: CardState[], ids: number[], changes: Partial<CardState>): CardState[] {
  return deck.map((card: CardState): CardState =>
    ids.includes(card.id) ? { ...card, ...changes } : card,
  );
}

/**
 * Flips a mismatched pair back down and passes the turn to the opponent.
 * @param firstId The id of the first picked card.
 * @param secondId The id of the second picked card.
 */
function resolveMismatch(firstId: number, secondId: number): void {
  mismatchTimer = null;
  const state = getState();
  if (state.firstPickId !== firstId || state.secondPickId !== secondId) return;
  setState({
    deck: updateCards(state.deck, [firstId, secondId], { isFlipped: false }),
    firstPickId: null,
    secondPickId: null,
    isBoardLocked: false,
    currentPlayer: otherPlayer(state.currentPlayer),
  });
}

/**
 * Tells whether the board currently accepts card clicks.
 * @param state The current game state.
 * @returns True while the board is shown, unlocked and not covered by the exit dialog.
 */
function isBoardInteractive(state: GameState): boolean {
  return state.screen === 'board' && !state.boardExitConfirmOpen && !state.isBoardLocked;
}

/**
 * Tells whether a card can still be picked.
 * @param card The card to check.
 * @returns True while the card is face down and not matched.
 */
function isCardPickable(card: CardState): boolean {
  return !card.isFlipped && !card.isMatched;
}

/** The state fields that describe the cards picked in the current turn, when no card is picked. */
const NO_PICKS: Pick<GameState, 'firstPickId' | 'secondPickId'> = {
  firstPickId: null,
  secondPickId: null,
};

/**
 * Marks both cards of a pair as matched.
 * @param deck The deck with the second card already flipped.
 * @param pairId The id of the matched pair.
 * @returns The updated deck.
 */
function markPairMatched(deck: CardState[], pairId: number): CardState[] {
  return deck.map((card: CardState): CardState =>
    card.pairId === pairId ? { ...card, isMatched: true } : card,
  );
}

/**
 * Adds one point to a player's score.
 * @param scores The current scores.
 * @param player The player who scored.
 * @returns The new scores.
 */
function awardPoint(
  scores: Record<PlayerColor, number>,
  player: PlayerColor,
): Record<PlayerColor, number> {
  return { ...scores, [player]: scores[player] + 1 };
}

/**
 * Ends the round after the last pair: locks the board, stores the result and schedules the
 * Game Over screen.
 * @param deck The fully matched deck.
 * @param scores The final scores.
 */
function finishRound(deck: CardState[], scores: Record<PlayerColor, number>): void {
  setState({ deck, scores, ...NO_PICKS, isBoardLocked: true, result: determineResult(scores) });
  gameOverTimer = setTimeout(showGameOver, GAME_OVER_DELAY_MS);
}

/**
 * Scores a matched pair for the current player and finishes the round after the last pair.
 * @param state The state before the match.
 * @param deck The deck with the second card already flipped.
 * @param pairId The id of the matched pair.
 */
function registerMatch(state: GameState, deck: CardState[], pairId: number): void {
  const matchedDeck = markPairMatched(deck, pairId);
  const scores = awardPoint(state.scores, state.currentPlayer);
  if (matchedDeck.every((card: CardState): boolean => card.isMatched)) {
    finishRound(matchedDeck, scores);
    return;
  }
  setState({ deck: matchedDeck, scores, ...NO_PICKS, isBoardLocked: false });
}

/**
 * Compares the second picked card with the first one and applies the outcome.
 * @param state The state before the second pick.
 * @param deck The deck with the second card already flipped.
 * @param firstId The id of the first picked card.
 * @param second The second picked card.
 */
function resolvePair(
  state: GameState,
  deck: CardState[],
  firstId: number,
  second: CardState,
): void {
  const first = state.deck.find((card: CardState): boolean => card.id === firstId);
  if (first?.pairId === second.pairId) {
    registerMatch(state, deck, second.pairId);
    return;
  }
  setState({ deck, secondPickId: second.id, isBoardLocked: true });
  mismatchTimer = setTimeout((): void => resolveMismatch(firstId, second.id), MISMATCH_DELAY_MS);
}

/**
 * Handles a click on a card: flips it and, as the second pick, resolves the pair.
 * @param cardId The id of the clicked card.
 */
export function selectCard(cardId: number): void {
  const state = getState();
  const card = state.deck.find((candidate: CardState): boolean => candidate.id === cardId);
  if (!isBoardInteractive(state) || !card || !isCardPickable(card)) return;
  const deck = updateCards(state.deck, [cardId], { isFlipped: true });
  if (state.firstPickId === null) {
    setState({ deck, firstPickId: cardId });
    return;
  }
  resolvePair(state, deck, state.firstPickId, card);
}
