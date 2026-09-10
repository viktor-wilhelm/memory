import type { PlayerColor, ThemeId } from '../app/types';

interface ThemeConfig {
  label: string;
  previewImage: string;
  cardBackImage: string;
  // Board header presentation — confirmed to differ per theme by comparing
  // all 4 Figma board references (docs/figma-reference/board/), not just
  // code-vibes. See Issue #11 for the per-theme comparison table.
  boardScoreIcon: 'flag' | 'pawn';
  boardScoreOrder: [PlayerColor, PlayerColor];
  boardScoreShowLabel: boolean;
  boardCurrentPlayerFilled: boolean;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'code-vibes': {
    label: 'Code vibes theme',
    previewImage: '/assets/settings-page/frame-629.svg',
    cardBackImage: '/assets/code-vibes-theme/code-vibes-frond.png',
    boardScoreIcon: 'flag',
    boardScoreOrder: ['blue', 'orange'],
    boardScoreShowLabel: true,
    boardCurrentPlayerFilled: false,
  },
  games: {
    label: 'Gaming theme',
    previewImage: '/assets/settings-page/theme-visual-1.svg',
    cardBackImage: '/assets/gaming-theme/gaming-theme-frond.png',
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
  },
  'da-projects': {
    label: 'DA Projects theme',
    previewImage: '/assets/settings-page/theme-visual.svg',
    cardBackImage: '/assets/da-projects-theme/da-projects-frond.png',
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
  },
  food: {
    label: 'Foods theme',
    previewImage: '/assets/settings-page/theme-visual-2.svg',
    cardBackImage: '/assets/foods-theme/foods-frond.png',
    boardScoreIcon: 'pawn',
    boardScoreOrder: ['orange', 'blue'],
    boardScoreShowLabel: false,
    boardCurrentPlayerFilled: true,
  },
};
