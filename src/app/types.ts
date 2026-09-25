export type ThemeId = 'code-vibes' | 'games' | 'da-projects' | 'food';
export type BoardSizeId = '4x4' | '4x6' | '6x6';
export type PlayerColor = 'blue' | 'orange';
export type Screen = 'home' | 'settings' | 'board' | 'gameOver' | 'result';
export type GameResult = PlayerColor | 'draw' | null;

export interface CardState {
  id: number;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  theme: ThemeId | null;
  playerColor: PlayerColor;
  playerSelected: boolean;
  boardSize: BoardSizeId;
  boardSizeSelected: boolean;
  screen: Screen;
  boardExitConfirmOpen: boolean;
  deck: CardState[];
  scores: Record<PlayerColor, number>;
  currentPlayer: PlayerColor;
  firstPickId: number | null;
  secondPickId: number | null;
  isBoardLocked: boolean;
  result: GameResult;
}
