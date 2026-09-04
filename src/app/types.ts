export type ThemeId = 'code-vibes' | 'games' | 'da-projects' | 'food';
export type BoardSizeId = '4x4' | '4x6' | '6x6';
export type PlayerColor = 'blue' | 'orange';
export type Screen = 'home' | 'settings' | 'board' | 'gameOver';

export interface GameState {
  theme: ThemeId;
  playerColor: PlayerColor;
  playerSelected: boolean;
  boardSize: BoardSizeId;
  boardSizeSelected: boolean;
  screen: Screen;
}
