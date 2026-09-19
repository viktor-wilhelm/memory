import { BOARD_SIZES } from '../config/boardSizes';
import { createDeck } from './deck';
import { getState, setState } from './state';

export function startGame(): void {
  const { boardSize, playerColor } = getState();
  setState({
    screen: 'board',
    boardExitConfirmOpen: false,
    deck: createDeck(BOARD_SIZES[boardSize].pairCount),
    scores: { blue: 0, orange: 0 },
    currentPlayer: playerColor,
    firstPickId: null,
    secondPickId: null,
    isBoardLocked: false,
    result: null,
  });
}
