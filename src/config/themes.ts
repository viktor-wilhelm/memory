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
  // Game Over — the intermediate result screen shown right after the final
  // matched pair (before the not-yet-implemented Winner/Draw screen). The
  // title is either a pre-composited SVG image (Code vibes) or literal text
  // styled per theme in CSS; everything else (layout, typography, colors) is
  // theme tokens/CSS, not per-theme markup.
  gameOverTitle: { type: 'image'; src: string } | { type: 'text' };
  // 'label': player name + a per-color label icon, no pawn (Code vibes).
  // 'pawn': the shared chess-pawn icon + score, no player name (the rest).
  gameOverScoreStyle: 'label' | 'pawn';
  gameOverScoreOrder: [PlayerColor, PlayerColor];
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
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-top',
    gameOverTitle: { type: 'image', src: '/assets/code-vibes-theme/game-over/game-over.svg' },
    gameOverScoreStyle: 'label',
    gameOverScoreOrder: ['blue', 'orange'],
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
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
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
    exitConfirmCancelLabel: 'Back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: false,
    exitConfirmStyle: 'filled',
    exitConfirmAnimation: 'none',
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
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
    exitConfirmCancelLabel: 'No, back to game',
    exitConfirmConfirmLabel: 'Exit game',
    exitConfirmUppercase: true,
    exitConfirmStyle: 'outline',
    exitConfirmAnimation: 'from-bottom',
    gameOverTitle: { type: 'text' },
    gameOverScoreStyle: 'pawn',
    gameOverScoreOrder: ['orange', 'blue'],
  },
};
