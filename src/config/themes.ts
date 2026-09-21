import type { PlayerColor, ThemeId } from '../app/types';

interface ThemeConfig {
  label: string;
  previewImage: string;
  cardBackImage: string;
  // Face images picked by pairId (faces[pairId]); an empty list means the
  // theme has no faces yet and its cards stay visually unchanged.
  cardFaces: string[];
  // Board header presentation — confirmed to differ per theme by comparing
  // all 4 Figma board references (docs/figma-reference/board/), not just
  // code-vibes. See Issue #11 for the per-theme comparison table.
  boardScoreIcon: 'flag' | 'pawn';
  boardScoreOrder: [PlayerColor, PlayerColor];
  boardScoreShowLabel: boolean;
  boardCurrentPlayerFilled: boolean;
  // Exit-confirm popup copy/style — also confirmed to differ per theme
  // from the *-pop-up.png Figma references, not just colors.
  exitConfirmCancelLabel: string;
  exitConfirmConfirmLabel: string;
  exitConfirmUppercase: boolean;
  exitConfirmStyle: 'outline' | 'filled';
  exitConfirmAnimation: 'from-top' | 'from-bottom' | 'none';
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'code-vibes': {
    label: 'Code vibes theme',
    previewImage: '/assets/settings-page/frame-629.svg',
    cardBackImage: '/assets/code-vibes-theme/code-vibes-frond.png',
    cardFaces: [
      '/assets/code-vibes-theme/faces/git.svg',
      '/assets/code-vibes-theme/faces/typescript.svg',
      '/assets/code-vibes-theme/faces/javascript.svg',
      '/assets/code-vibes-theme/faces/html.svg',
      '/assets/code-vibes-theme/faces/vscode.svg',
      '/assets/code-vibes-theme/faces/css.svg',
      '/assets/code-vibes-theme/faces/django.svg',
      '/assets/code-vibes-theme/faces/angular.svg',
      '/assets/code-vibes-theme/faces/terminal.svg',
      '/assets/code-vibes-theme/faces/python.svg',
      '/assets/code-vibes-theme/faces/github.svg',
      '/assets/code-vibes-theme/faces/nodejs.svg',
      '/assets/code-vibes-theme/faces/bootstrap.svg',
      '/assets/code-vibes-theme/faces/vue.svg',
      '/assets/code-vibes-theme/faces/react.svg',
      '/assets/code-vibes-theme/faces/sass.svg',
      '/assets/code-vibes-theme/faces/database.svg',
      '/assets/code-vibes-theme/faces/firebase.svg',
    ],
    boardScoreIcon: 'flag',
    boardScoreOrder: ['blue', 'orange'],
    boardScoreShowLabel: true,
    boardCurrentPlayerFilled: false,
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-top',
  },
  games: {
    label: 'Gaming theme',
    previewImage: '/assets/settings-page/theme-visual-1.svg',
    cardBackImage: '/assets/gaming-theme/gaming-theme-frond.png',
    cardFaces: [
      '/assets/gaming-theme/faces/guard-circle.png',
      '/assets/gaming-theme/faces/guard-square.png',
      '/assets/gaming-theme/faces/guard-triangle.png',
      '/assets/gaming-theme/faces/maze.png',
      '/assets/gaming-theme/faces/creeper.png',
      '/assets/gaming-theme/faces/mushroom.png',
      '/assets/gaming-theme/faces/dice.png',
      '/assets/gaming-theme/faces/banana.png',
      '/assets/gaming-theme/faces/game-controller.png',
      '/assets/gaming-theme/faces/pacman-and-ghost.png',
      '/assets/gaming-theme/faces/pacman.png',
      '/assets/gaming-theme/faces/star-coin.png',
      '/assets/gaming-theme/faces/handheld-console.png',
      '/assets/gaming-theme/faces/snake-game.png',
      '/assets/gaming-theme/faces/puzzle.png',
      '/assets/gaming-theme/faces/level-up.png',
      '/assets/gaming-theme/faces/ace-of-diamonds.png',
      '/assets/gaming-theme/faces/play-button.png',
    ],
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
    exitConfirmCancelLabel: 'No, back to game',
    exitConfirmConfirmLabel: 'Yes, quit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-bottom',
  },
  'da-projects': {
    label: 'DA Projects theme',
    previewImage: '/assets/settings-page/theme-visual.svg',
    cardBackImage: '/assets/da-projects-theme/da-projects-frond.png',
    cardFaces: [],
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'filled',
    exitConfirmAnimation: 'none',
  },
  food: {
    label: 'Foods theme',
    previewImage: '/assets/settings-page/theme-visual-2.svg',
    cardBackImage: '/assets/foods-theme/foods-frond.png',
    cardFaces: [],
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
    exitConfirmCancelLabel: 'No, back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: true,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-bottom',
  },
};
