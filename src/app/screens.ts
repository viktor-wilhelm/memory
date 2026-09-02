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
    document.documentElement.dataset.theme = state.theme;
    root.replaceChildren(screenRenderers[state.screen]());
  };

  subscribe(render);
  render();
}
