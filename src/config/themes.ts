import type { PlayerColor, ThemeId } from '../app/types';

/** Everything that differs between the selectable themes. */
export interface ThemeConfig {
  label: string;
  previewImage: string;
  cardBackImage: string;
  cardFaces: string[];
  boardScoreIcon: 'flag' | 'pawn';
  boardScoreOrder: [PlayerColor, PlayerColor];
  boardScoreShowLabel: boolean;
  boardCurrentPlayerFilled: boolean;
  boardExitButton: 'text' | 'vector-text';
  boardDenseCardGapPx: number;
  exitConfirmCancelLabel: string;
  exitConfirmConfirmLabel: string;
  exitConfirmUppercase: boolean;
  exitConfirmStyle: 'outline' | 'filled';
  exitConfirmAnimation: 'from-top' | 'from-bottom' | 'none';
  gameOverTitle: { type: 'image'; src: string } | { type: 'text' };
  gameOverScoreStyle: 'label' | 'pawn';
  gameOverScoreOrder: [PlayerColor, PlayerColor];
  resultWinnerGraphic: 'pawn' | 'pawn-backed' | 'pawn-outline' | 'trophy';
  resultButtonLabel: string;
  resultRevealAnimation: 'from-top' | 'from-bottom' | 'none';
}

export const DEFAULT_THEME: ThemeId = 'code-vibes';

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
    boardExitButton: 'text',
    boardDenseCardGapPx: 6,
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-top',
    gameOverTitle: { type: 'image', src: '/assets/code-vibes-theme/game-over/game-over.svg' },
    gameOverScoreStyle: 'label',
    gameOverScoreOrder: ['blue', 'orange'],
    resultWinnerGraphic: 'pawn',
    resultButtonLabel: 'Back to start',
    resultRevealAnimation: 'from-top',
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
    boardExitButton: 'text',
    boardDenseCardGapPx: 6,
    exitConfirmCancelLabel: 'No, back to game',
    exitConfirmConfirmLabel: 'Yes, quit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-bottom',
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
    resultWinnerGraphic: 'trophy',
    resultButtonLabel: 'Home',
    resultRevealAnimation: 'from-bottom',
  },
  'da-projects': {
    label: 'DA Projects theme',
    previewImage: '/assets/settings-page/theme-visual.svg',
    cardBackImage: '/assets/da-projects-theme/da-projects-frond.png',
    cardFaces: [
      '/assets/da-projects-theme/faces/ramen-bowl.svg',
      '/assets/da-projects-theme/faces/steaming-bowl.svg',
      '/assets/da-projects-theme/faces/boiled-egg.svg',
      '/assets/da-projects-theme/faces/cherry-blossom.svg',
      '/assets/da-projects-theme/faces/join-logo.svg',
      '/assets/da-projects-theme/faces/chef-hat.svg',
      '/assets/da-projects-theme/faces/green-shapes-logo.svg',
      '/assets/da-projects-theme/faces/shopping-basket.svg',
      '/assets/da-projects-theme/faces/poke-ball.svg',
      '/assets/da-projects-theme/faces/tic-tac-toe.svg',
      '/assets/da-projects-theme/faces/smiley-face.svg',
      '/assets/da-projects-theme/faces/purple-chevron-logo.svg',
      '/assets/da-projects-theme/faces/chat-bubbles.svg',
      '/assets/da-projects-theme/faces/sombrero.svg',
      '/assets/da-projects-theme/faces/broccoli.svg',
      '/assets/da-projects-theme/faces/user-network.svg',
      '/assets/da-projects-theme/faces/shark-fin.svg',
      '/assets/da-projects-theme/faces/currency-exchange.svg',
    ],
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
    boardExitButton: 'text',
    boardDenseCardGapPx: 8,
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'filled',
    exitConfirmAnimation: 'none',
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
    resultWinnerGraphic: 'pawn-outline',
    resultButtonLabel: 'Home',
    resultRevealAnimation: 'none',
  },
  food: {
    label: 'Foods theme',
    previewImage: '/assets/settings-page/theme-visual-2.svg',
    cardBackImage: '/assets/foods-theme/foods-frond.png',
    cardFaces: [
      '/assets/foods-theme/faces/french-fries.png',
      '/assets/foods-theme/faces/burger.png',
      '/assets/foods-theme/faces/donut.png',
      '/assets/foods-theme/faces/wrap.png',
      '/assets/foods-theme/faces/chocolate-cake.png',
      '/assets/foods-theme/faces/pizza-slice.png',
      '/assets/foods-theme/faces/pretzel.png',
      '/assets/foods-theme/faces/sushi-roll.png',
      '/assets/foods-theme/faces/taco.png',
      '/assets/foods-theme/faces/shrimp-salad.png',
      '/assets/foods-theme/faces/flan.png',
      '/assets/foods-theme/faces/sandwich.png',
      '/assets/foods-theme/faces/fried-chicken.png',
      '/assets/foods-theme/faces/cupcake.png',
      '/assets/foods-theme/faces/corn-dog.png',
      '/assets/foods-theme/faces/ice-cream-cone.png',
      '/assets/foods-theme/faces/macarons.png',
      '/assets/foods-theme/faces/chocolate-bar.png',
    ],
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
    boardExitButton: 'vector-text',
    boardDenseCardGapPx: 6,
    exitConfirmCancelLabel: 'No, back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: true,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-bottom',
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
    resultWinnerGraphic: 'pawn-backed',
    resultButtonLabel: 'home',
    resultRevealAnimation: 'from-bottom',
  },
};
