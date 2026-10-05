import { fillTemplate } from '../app/template';
import { getState } from '../app/state';
import type { GameState, PlayerColor } from '../app/types';
import { CHESS_PAWN_ICON, CODE_VIBES_LABEL_ICON } from '../config/icons';
import { PLAYERS } from '../config/players';
import { DEFAULT_THEME, THEMES, type ThemeConfig } from '../config/themes';
import layoutTemplate from '../templates/pages/game-over-layout.html?raw';
import playerNameTemplate from '../templates/pages/player-name.html?raw';
import playerTemplate from '../templates/pages/player.html?raw';
import titleImageTemplate from '../templates/pages/title-image.html?raw';
import titleTextTemplate from '../templates/pages/title-text.html?raw';
import { createScreenSection } from './screen-section';

/**
 * Builds the "Game over" heading: a pre-composited image (Code vibes) or text styled in CSS.
 * @param theme The active theme.
 * @returns The heading markup.
 */
function buildTitle(theme: ThemeConfig): string {
  const title = theme.gameOverTitle;
  return title.type === 'image'
    ? fillTemplate(titleImageTemplate, { src: title.src })
    : titleTextTemplate;
}

/**
 * Builds one player's entry of the score panel. The Code vibes style shows the player name
 * with a label icon; the other themes show a pawn icon without a name.
 * @param color The player.
 * @param score The player's final score.
 * @param theme The active theme.
 * @returns The entry markup.
 */
function buildPlayer(color: PlayerColor, score: number, theme: ThemeConfig): string {
  const showsLabel = theme.gameOverScoreStyle === 'label';
  return fillTemplate(playerTemplate, {
    color,
    icon: showsLabel ? CODE_VIBES_LABEL_ICON[color] : CHESS_PAWN_ICON,
    label: showsLabel ? fillTemplate(playerNameTemplate, { name: PLAYERS[color].label }) : '',
    score,
  });
}

/**
 * Builds the score panel entries in the theme's player order.
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The markup of both entries.
 */
function buildPlayers(state: GameState, theme: ThemeConfig): string {
  return theme.gameOverScoreOrder
    .map((color: PlayerColor): string => buildPlayer(color, state.scores[color], theme))
    .join('');
}

/**
 * Builds the Game Over screen with the final scores, which always come from the state.
 * @returns The screen element.
 */
export function renderGameOver(): HTMLElement {
  const state = getState();
  const theme = THEMES[state.theme ?? DEFAULT_THEME];
  const html = fillTemplate(layoutTemplate, {
    title: buildTitle(theme),
    players: buildPlayers(state, theme),
  });
  return createScreenSection('screen--game-over', html);
}
