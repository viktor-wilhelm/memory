import { fillTemplate, type TemplateValues } from '../app/template';
import type { GameState, PlayerColor } from '../app/types';
import { CHESS_PAWN_ICON, CODE_VIBES_LABEL_ICON, EXIT_ICON, EXIT_TEXT_ICON } from '../config/icons';
import { PLAYERS } from '../config/players';
import type { ThemeConfig } from '../config/themes';
import exitButtonTemplate from '../templates/pages/exit-button.html?raw';
import exitButtonVectorTemplate from '../templates/pages/exit-button-vector.html?raw';
import scoreItemTemplate from '../templates/pages/score-item.html?raw';

/**
 * Returns the small marker that stands for a player in the header: Code vibes uses its
 * flag/label icon, the other themes the chess-pawn icon.
 * @param theme The active theme.
 * @param color The player.
 * @returns The icon markup.
 */
export function buildPlayerMarker(theme: ThemeConfig, color: PlayerColor): string {
  return theme.boardScoreIcon === 'flag' ? CODE_VIBES_LABEL_ICON[color] : CHESS_PAWN_ICON;
}

/**
 * Builds one player's entry of the score display.
 * @param color The player.
 * @param score The player's current score.
 * @param theme The active theme.
 * @returns The entry markup.
 */
function buildScoreItem(color: PlayerColor, score: number, theme: ThemeConfig): string {
  return fillTemplate(scoreItemTemplate, {
    color,
    icon: buildPlayerMarker(theme, color),
    label: theme.boardScoreShowLabel ? `${PLAYERS[color].label} ` : '',
    score,
  });
}

/**
 * Builds the score display in the theme's player order.
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The markup of both entries.
 */
export function buildScoreItems(state: GameState, theme: ThemeConfig): string {
  return theme.boardScoreOrder
    .map((color: PlayerColor): string => buildScoreItem(color, state.scores[color], theme))
    .join('');
}

/**
 * Builds the Exit button. Food draws its label as a vector graphic, the other themes use text.
 * @param theme The active theme.
 * @returns The button markup.
 */
export function buildExitButton(theme: ThemeConfig): string {
  if (theme.boardExitButton === 'vector-text') {
    return fillTemplate(exitButtonVectorTemplate, { icon: EXIT_ICON, label: EXIT_TEXT_ICON });
  }
  return fillTemplate(exitButtonTemplate, { icon: EXIT_ICON });
}

/**
 * Collects the template values of the board header: score, current player and Exit button.
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The header values for the board template.
 */
export function buildHeaderValues(state: GameState, theme: ThemeConfig): TemplateValues {
  return {
    scoreItems: buildScoreItems(state, theme),
    currentPlayer: state.currentPlayer,
    badgeModifier: theme.boardCurrentPlayerFilled ? ' board__current-player-badge--filled' : '',
    playerIcon: buildPlayerMarker(theme, state.currentPlayer),
    exitButton: buildExitButton(theme),
  };
}
