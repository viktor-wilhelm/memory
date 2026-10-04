import { returnToStart } from '../app/game';
import { getState } from '../app/state';
import { fillTemplate } from '../app/template';
import type { GameState, PlayerColor, ThemeId } from '../app/types';
import { RESULT_PAWN_ICON, RESULT_PAWN_OUTLINE_ICON, SCALE_ICON } from '../config/icons';
import { PLAYERS } from '../config/players';
import { DEFAULT_THEME, THEMES, type ThemeConfig } from '../config/themes';
import confettiTemplate from '../templates/result/confetti.html?raw';
import drawTemplate from '../templates/result/draw.html?raw';
import drawWordBevelTemplate from '../templates/result/draw-word-bevel.html?raw';
import drawWordTemplate from '../templates/result/draw-word.html?raw';
import layoutTemplate from '../templates/result/layout.html?raw';
import pawnBackingTemplate from '../templates/result/pawn-backing.html?raw';
import pawnTemplate from '../templates/result/pawn.html?raw';
import trophyTemplate from '../templates/result/trophy.html?raw';
import winnerTemplate from '../templates/result/winner.html?raw';
import { createScreenSection } from './screen-section';

/** The only theme with confetti and the beveled DRAW word, which are structural, not just styling. */
const CONFETTI_THEME: ThemeId = 'code-vibes';

const WIDESCREEN_CONFETTI_SRC = '/assets/code-vibes-theme/result/confetti-widescreen.png';

/**
 * Builds the pawn graphic in the winner's color.
 * @param color The winning player.
 * @param icon The pawn artwork.
 * @returns The pawn markup.
 */
function buildPawn(color: PlayerColor, icon: string): string {
  return fillTemplate(pawnTemplate, { color, icon });
}

/**
 * Builds the big winner graphic: the Games trophy or the shared pawn, solid or outlined, and
 * on a cream backing for Food.
 * @param theme The active theme.
 * @param color The winning player.
 * @returns The graphic markup.
 */
function buildWinnerGraphic(theme: ThemeConfig, color: PlayerColor): string {
  switch (theme.resultWinnerGraphic) {
    case 'trophy':
      return trophyTemplate;
    case 'pawn-outline':
      return buildPawn(color, RESULT_PAWN_OUTLINE_ICON);
    case 'pawn-backed':
      return fillTemplate(pawnBackingTemplate, { graphic: buildPawn(color, RESULT_PAWN_ICON) });
    default:
      return buildPawn(color, RESULT_PAWN_ICON);
  }
}

/**
 * Builds the Winner screen body.
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The body markup.
 */
function buildWinnerBody(state: GameState, theme: ThemeConfig): string {
  const color: PlayerColor = state.result === 'blue' ? 'blue' : 'orange';
  return fillTemplate(winnerTemplate, {
    color,
    playerLabel: PLAYERS[color].label,
    graphic: buildWinnerGraphic(theme, color),
  });
}

/**
 * Builds the Draw screen body. Every theme shows the same scale icon, recolored in CSS.
 * @param hasBevel Whether the DRAW word gets the Code vibes bevel backing.
 * @returns The body markup.
 */
function buildDrawBody(hasBevel: boolean): string {
  const drawWord = hasBevel ? drawWordBevelTemplate : drawWordTemplate;
  return fillTemplate(drawTemplate, { drawWord, scaleIcon: SCALE_ICON });
}

/**
 * Warms the widescreen confetti strip into the browser's image cache as soon as the screen
 * mounts, so resizing past the widescreen breakpoint swaps to an already decoded image.
 */
function preloadWidescreenConfetti(): void {
  new Image().src = WIDESCREEN_CONFETTI_SRC;
}

/**
 * Builds the markup of the Winner or Draw screen.
 * @param state The current game state.
 * @param theme The active theme.
 * @param hasConfetti Whether the confetti strip is shown.
 * @returns The screen markup.
 */
function buildResultMarkup(state: GameState, theme: ThemeConfig, hasConfetti: boolean): string {
  const body = isDraw(state)
    ? buildDrawBody(state.theme === CONFETTI_THEME)
    : buildWinnerBody(state, theme);
  return fillTemplate(layoutTemplate, {
    confetti: hasConfetti ? confettiTemplate : '',
    body,
    buttonLabel: theme.resultButtonLabel,
  });
}

/**
 * Tells whether the round ended without a winner.
 * @param state The current game state.
 * @returns True for a draw.
 */
function isDraw(state: GameState): boolean {
  return state.result === 'draw';
}

/**
 * Builds the themed Winner or Draw screen shown after Game Over.
 * @returns The screen element.
 */
export function renderResult(): HTMLElement {
  const state = getState();
  const theme = THEMES[state.theme ?? DEFAULT_THEME];
  const hasConfetti = state.theme === CONFETTI_THEME && !isDraw(state);
  const classes = `screen--result screen--result--${theme.resultRevealAnimation}`;
  const section = createScreenSection(classes, buildResultMarkup(state, theme, hasConfetti));
  section.dataset.outcome = isDraw(state) ? 'draw' : 'winner';
  section.querySelector('.result__button')?.addEventListener('click', returnToStart);
  if (hasConfetti) preloadWidescreenConfetti();
  return section;
}
