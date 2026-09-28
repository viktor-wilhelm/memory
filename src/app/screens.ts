import { DEFAULT_THEME } from '../config/themes';
import { getState, subscribe } from './state';
import { renderHome } from '../views/home';
import { renderSettings } from '../views/settings';
import { renderBoard } from '../views/board';
import { renderGameOver } from '../views/gameOver';
import { renderResult } from '../views/result';
import type { Screen } from './types';

const screenRenderers: Record<Screen, () => HTMLElement> = {
  home: renderHome,
  settings: renderSettings,
  board: renderBoard,
  gameOver: renderGameOver,
  result: renderResult,
};

export function mountApp(root: HTMLElement): void {
  const render = () => {
    const state = getState();
    // Home always uses the default theme; the chosen theme stays in state for the other screens.
    document.documentElement.dataset.theme =
      state.screen === 'home' ? DEFAULT_THEME : (state.theme ?? DEFAULT_THEME);

    // Every render replaces the whole subtree, which drops DOM focus — most
    // noticeably when an arrow key moves the selection within a native radio
    // group (that change re-renders synchronously mid-keypress). If a radio
    // input has focus, re-focus its equivalent (now-checked) input by name
    // in the new DOM so keyboard navigation isn't interrupted; this covers
    // every radio group (theme/player/boardSize/...) the same way.
    const focused = document.activeElement;
    const radioGroupName =
      focused instanceof HTMLInputElement && focused.type === 'radio' && root.contains(focused)
        ? focused.name
        : null;

    root.replaceChildren(screenRenderers[state.screen]());

    if (radioGroupName) {
      root
        .querySelector<HTMLInputElement>(`input[type="radio"][name="${radioGroupName}"]:checked`)
        ?.focus({ preventScroll: true });
    }
  };

  subscribe(render);
  render();
}
