import type { ThemeId } from '../app/types';

export const THEMES: Record<ThemeId, { label: string; previewImage: string }> = {
  'code-vibes': { label: 'Code vibes theme', previewImage: '/assets/settings-page/frame-629.svg' },
  games: { label: 'Gaming theme', previewImage: '/assets/settings-page/theme-visual-1.svg' },
  'da-projects': { label: 'DA Projects theme', previewImage: '/assets/settings-page/theme-visual.svg' },
  food: { label: 'Foods theme', previewImage: '/assets/settings-page/theme-visual-2.svg' },
};
