import { getState, setState } from '../app/state';
import { THEMES } from '../config/themes';
import { BOARD_SIZES } from '../config/boardSizes';
import { PLAYERS } from '../config/players';
import type { ThemeId, PlayerColor, BoardSizeId } from '../app/types';

function radioRow(name: string, value: string, label: string, checked: boolean): string {
  return `
    <label class="radio-row${checked ? ' is-checked' : ''}">
      <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''} />
      <span class="radio-row__dot"></span>
      <span class="radio-row__label">${label}</span>
      <span class="radio-row__arrow"></span>
    </label>
  `;
}

export function renderSettings(): HTMLElement {
  const state = getState();
  const section = document.createElement('section');
  section.className = 'screen screen--settings';

  const themeRows = (Object.keys(THEMES) as ThemeId[])
    .map((id) => radioRow('theme', id, THEMES[id].label, state.theme === id))
    .join('');

  const playerRows = (Object.keys(PLAYERS) as PlayerColor[])
    .map((id) => radioRow('player', id, PLAYERS[id].label, state.playerSelected && state.playerColor === id))
    .join('');

  const sizeRows = (Object.keys(BOARD_SIZES) as BoardSizeId[])
    .map((id) => radioRow('boardSize', id, BOARD_SIZES[id].label, state.boardSizeSelected && state.boardSize === id))
    .join('');

  section.innerHTML = `
    <div class="settings__panel">
      <h1 class="settings__title">Settings</h1>

      <div class="settings__group">
        <h2 class="settings__group-title"><img class="settings__group-icon" src="/assets/settings-page/palette.svg" alt="" />Game themes</h2>
        <div class="radio-list radio-list--theme">${themeRows}</div>
      </div>

      <div class="settings__group">
        <h2 class="settings__group-title"><img class="settings__group-icon" src="/assets/settings-page/chess_pawn.svg" alt="" />Choose player</h2>
        <div class="radio-list radio-list--player">${playerRows}</div>
      </div>

      <div class="settings__group">
        <h2 class="settings__group-title"><img class="settings__group-icon" src="/assets/settings-page/style.svg" alt="" />Board size</h2>
        <div class="radio-list radio-list--board">${sizeRows}</div>
      </div>
    </div>

    <div class="settings__preview">
      <div class="settings__preview-board">
        <div class="settings__preview-header">
          <span class="settings__score settings__score--blue">Blue&nbsp;0</span>
          <span class="settings__score settings__score--orange">Orange&nbsp;0</span>
          <span class="settings__preview-current">Current player</span>
          <span class="settings__preview-exit">Exit game</span>
        </div>
        <div class="settings__preview-cards">
          <img class="settings__preview-image" src="${THEMES[state.theme].previewImage}" alt="${THEMES[state.theme].label}" />
        </div>
      </div>

      <div class="settings__breadcrumb">
        <span>Game theme</span>
        <img class="settings__sep" src="/assets/settings-page/line-6.png" alt="" />
        <span>Player</span>
        <img class="settings__sep" src="/assets/settings-page/line-6.png" alt="" />
        <span>Board size</span>
        <button type="button" class="settings__start" ${state.boardSizeSelected ? '' : 'disabled'}>
          <span class="settings__start-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="22" height="22" rx="5" stroke="currentColor" stroke-width="2" />
              <path d="M9 7L17 12L9 17V7Z" fill="currentColor" />
            </svg>
          </span>
          Start
        </button>
      </div>
    </div>
  `;

  section.querySelectorAll('input[name="theme"]').forEach((el) => {
    el.addEventListener('change', (e) => {
      setState({ theme: (e.target as HTMLInputElement).value as ThemeId });
    });
  });

  const previewImage = section.querySelector('.settings__preview-image') as HTMLImageElement | null;
  section.querySelectorAll('.radio-list--theme .radio-row').forEach((row) => {
    const input = row.querySelector('input') as HTMLInputElement;
    row.addEventListener('mouseenter', () => {
      if (previewImage) previewImage.src = THEMES[input.value as ThemeId].previewImage;
    });
    row.addEventListener('mouseleave', () => {
      if (previewImage) previewImage.src = THEMES[getState().theme].previewImage;
    });
  });

  section.querySelectorAll('input[name="player"]').forEach((el) => {
    el.addEventListener('change', (e) => {
      setState({ playerColor: (e.target as HTMLInputElement).value as PlayerColor, playerSelected: true });
    });
  });

  section.querySelectorAll('input[name="boardSize"]').forEach((el) => {
    el.addEventListener('change', (e) => {
      setState({ boardSize: (e.target as HTMLInputElement).value as BoardSizeId, boardSizeSelected: true });
    });
  });

  section.querySelector('.settings__start')?.addEventListener('click', () => {
    setState({ screen: 'board' });
  });

  return section;
}
