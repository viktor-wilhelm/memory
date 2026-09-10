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
      <button type="button" class="board__exit">${EXIT_ICON}Exit game</button>
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
        <div class="board__exit-confirm-card">
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
    setState({ screen: 'gameOver', boardExitConfirmOpen: false });
  });

  return section;
}
