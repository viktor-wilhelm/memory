import { DEFAULT_THEME } from '../config/themes';
import { getState, subscribe } from './state';
import { renderHome } from '../views/home';
import { renderSettings } from '../views/settings';
import { renderBoard } from '../views/board';
import { renderGameOver } from '../views/gameOver';
import type { Screen } from './types';

const screenRenderers: Record<Screen, () => HTMLElement> = {
  home: renderHome,
  settings: renderSettings,
  board: renderBoard,
  gameOver: renderGameOver,
};

export function mountApp(root: HTMLElement): void {
  const render = () => {
    const state = getState();
    // Home always uses the default theme; the chosen theme stays in state for the other screens.
    document.documentElement.dataset.theme =
      state.screen === 'home' ? DEFAULT_THEME : (state.theme ?? DEFAULT_THEME);
    root.replaceChildren(screenRenderers[state.screen]());
  };

  subscribe(render);
  render();
}
