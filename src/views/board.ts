import { getState, setState } from '../app/state';
import { BOARD_SIZES } from '../config/boardSizes';
import { THEMES } from '../config/themes';
import { PLAYERS } from '../config/players';

// Games / DA Projects / Food all use this pawn-shaped icon (confirmed
// against their Figma board references); only Code vibes uses FLAG_ICON.
const PAWN_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="currentColor" />
    <path d="M8 9.5C5.23858 9.5 3 11.5147 3 14H13C13 11.5147 10.7614 9.5 8 9.5Z" fill="currentColor" />
  </svg>
`;

const FLAG_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2.75C2 2.33579 2.33579 2 2.75 2H9.5L14 8L9.5 14H2.75C2.33579 14 2 13.6642 2 13.25V2.75Z" fill="currentColor" />
  </svg>
`;

const EXIT_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M10 11L13 8L10 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
`;

// Code vibes-only exit icon, matching its Figma reference (docs/figma-reference
// board icon export); other themes keep EXIT_ICON above.
const CODE_VIBES_EXIT_ICON = `
  <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.4375 12.5H7.5C7.14583 12.5 6.84896 12.3802 6.60938 12.1406C6.36979 11.901 6.25 11.6042 6.25 11.25C6.25 10.8958 6.36979 10.599 6.60938 10.3594C6.84896 10.1198 7.14583 10 7.5 10H21.4375L20.375 8.9375C20.125 8.6875 20.0052 8.39583 20.0156 8.0625C20.026 7.72917 20.1458 7.4375 20.375 7.1875C20.625 6.9375 20.9219 6.80729 21.2656 6.79688C21.6094 6.78646 21.9062 6.90625 22.1562 7.15625L25.375 10.375C25.625 10.625 25.75 10.9167 25.75 11.25C25.75 11.5833 25.625 11.875 25.375 12.125L22.1562 15.3438C21.9062 15.5938 21.6094 15.7135 21.2656 15.7031C20.9219 15.6927 20.625 15.5625 20.375 15.3125C20.1458 15.0625 20.026 14.7708 20.0156 14.4375C20.0052 14.1042 20.125 13.8125 20.375 13.5625L21.4375 12.5ZM15 6.25V2.5H2.5V20H15V16.25C15 15.8958 15.1198 15.599 15.3594 15.3594C15.599 15.1198 15.8958 15 16.25 15C16.6042 15 16.901 15.1198 17.1406 15.3594C17.3802 15.599 17.5 15.8958 17.5 16.25V20C17.5 20.6875 17.2552 21.276 16.7656 21.7656C16.276 22.2552 15.6875 22.5 15 22.5H2.5C1.8125 22.5 1.22396 22.2552 0.734375 21.7656C0.244792 21.276 0 20.6875 0 20V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H15C15.6875 0 16.276 0.244792 16.7656 0.734375C17.2552 1.22396 17.5 1.8125 17.5 2.5V6.25C17.5 6.60417 17.3802 6.90104 17.1406 7.14062C16.901 7.38021 16.6042 7.5 16.25 7.5C15.8958 7.5 15.599 7.38021 15.3594 7.14062C15.1198 6.90104 15 6.60417 15 6.25Z" fill="currentColor" />
  </svg>
`;

export function renderBoard(): HTMLElement {
  const state = getState();
  const boardSize = BOARD_SIZES[state.boardSize];
  const theme = THEMES[state.theme ?? 'code-vibes'];
  const cardBackImage = theme.cardBackImage;
  const cardCount = boardSize.pairCount * 2;
  const placeholderCards = Array.from({ length: cardCount })
    .map(() => `<div class="board-card"><img class="board-card__back" src="${cardBackImage}" alt="" /></div>`)
    .join('');

  const scoreIcon = theme.boardScoreIcon === 'flag' ? FLAG_ICON : PAWN_ICON;
  const exitIcon = state.theme === 'code-vibes' ? CODE_VIBES_EXIT_ICON : EXIT_ICON;
  const scoreItems = theme.boardScoreOrder
    .map((color) => {
      const label = theme.boardScoreShowLabel ? `${PLAYERS[color].label} ` : '';
      return `<span class="board__score-item board__score-item--${color}">${scoreIcon}<span>${label}0</span></span>`;
    })
    .join('');
  const currentPlayerModifier = theme.boardCurrentPlayerFilled ? ' board__current-player-badge--filled' : '';

  // Card gap shrinks on the bigger boards (24/36 cards) so more cards fit
  // without shrinking the cards themselves too much; DA Projects keeps a
  // slightly wider gap than the other 3 themes there. Confirmed per-theme
  // against the Figma references (Issue #11).
  const isSixteenCards = state.boardSize === '4x4';
  const cardGap = isSixteenCards ? 16 : state.theme === 'da-projects' ? 8 : 6;

  const confirmCancelLabel = theme.exitConfirmUppercase
    ? theme.exitConfirmCancelLabel.toUpperCase()
    : theme.exitConfirmCancelLabel;
  const confirmConfirmLabel = theme.exitConfirmUppercase
    ? theme.exitConfirmConfirmLabel.toUpperCase()
    : theme.exitConfirmConfirmLabel;

  const section = document.createElement('section');
  section.className = 'screen screen--board';
  section.innerHTML = `
    <div class="board__header">
      <div class="board__score">
        ${scoreItems}
      </div>
      <div class="board__current-player">
        Current player:
        <span class="board__current-player-badge board__current-player-badge--${state.playerColor}${currentPlayerModifier}">${scoreIcon}</span>
      </div>
      <button type="button" class="board__exit">${exitIcon}Exit game</button>
    </div>

    <div class="board__grid-wrap">
      <div class="board__grid" style="--board-cols: ${boardSize.cols}; --board-rows: ${boardSize.rows}; --board-gap: ${cardGap}px;">
        ${placeholderCards}
      </div>
    </div>

    ${
      state.boardExitConfirmOpen
        ? `
      <div class="board__exit-confirm-overlay">
        <div class="board__exit-confirm-card board__exit-confirm-card--${theme.exitConfirmAnimation}">
          <p class="board__exit-confirm-title">Are you sure you want to quit the game?</p>
          <div class="board__exit-confirm-actions">
            <button type="button" class="board__exit-confirm-cancel">${confirmCancelLabel}</button>
            <button type="button" class="board__exit-confirm-confirm board__exit-confirm-confirm--${theme.exitConfirmStyle}">${confirmConfirmLabel}</button>
          </div>
        </div>
      </div>
    `
        : ''
    }
  `;

  section.querySelector('.board__exit')?.addEventListener('click', () => {
    setState({ boardExitConfirmOpen: true });
  });

  section.querySelector('.board__exit-confirm-cancel')?.addEventListener('click', () => {
    setState({ boardExitConfirmOpen: false });
  });

  section.querySelector('.board__exit-confirm-confirm')?.addEventListener('click', () => {
    setState({ screen: 'settings', boardExitConfirmOpen: false });
  });

  return section;
}
