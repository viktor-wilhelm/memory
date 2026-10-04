import { DEFAULT_THEME } from '../config/themes';
import { renderBoard } from '../views/board';
import { renderGameOver } from '../views/game-over';
import { renderHome } from '../views/home';
import { renderResult } from '../views/result';
import { renderSettings } from '../views/settings';
import { getState, subscribe } from './state';
import type { GameState, Screen, ThemeId } from './types';

const SCREEN_RENDERERS: Record<Screen, () => HTMLElement> = {
  home: renderHome,
  settings: renderSettings,
  board: renderBoard,
  gameOver: renderGameOver,
  result: renderResult,
};

/**
 * Picks the theme that styles the page. The start screen always uses the default theme; the
 * chosen theme stays in the state for the other screens.
 * @param state The current game state.
 * @returns The id written to the `data-theme` attribute.
 */
function resolveDocumentTheme(state: GameState): ThemeId {
  return state.screen === 'home' ? DEFAULT_THEME : (state.theme ?? DEFAULT_THEME);
}

/**
 * Finds the radio group that currently has keyboard focus inside the app.
 * @param root The app root element.
 * @returns The group's input name, or null when no radio input is focused.
 */
function findFocusedRadioGroup(root: HTMLElement): string | null {
  const focused = document.activeElement;
  const isRadioInRoot =
    focused instanceof HTMLInputElement && focused.type === 'radio' && root.contains(focused);
  return isRadioInRoot ? focused.name : null;
}

/**
 * Re-focuses the checked input of a radio group in the freshly rendered DOM, so arrow-key
 * navigation within a native radio group is not interrupted by the re-render.
 * @param root The app root element.
 * @param groupName The input name shared by the radio group.
 */
function restoreRadioFocus(root: HTMLElement, groupName: string): void {
  const checkedInput = root.querySelector<HTMLInputElement>(
    `input[type="radio"][name="${groupName}"]:checked`,
  );
  checkedInput?.focus({ preventScroll: true });
}

/**
 * Replaces the whole screen with a fresh render of the current state. The replacement drops DOM
 * focus, so a focused radio input is focused again afterwards.
 * @param root The app root element.
 */
function renderCurrentScreen(root: HTMLElement): void {
  const state = getState();
  document.documentElement.dataset.theme = resolveDocumentTheme(state);
  const focusedRadioGroup = findFocusedRadioGroup(root);
  root.replaceChildren(SCREEN_RENDERERS[state.screen]());
  if (focusedRadioGroup) restoreRadioFocus(root, focusedRadioGroup);
}

/**
 * Mounts the app and re-renders the current screen on every state change.
 * @param root The element that hosts the screens.
 */
export function mountApp(root: HTMLElement): void {
  subscribe((): void => renderCurrentScreen(root));
  renderCurrentScreen(root);
}
