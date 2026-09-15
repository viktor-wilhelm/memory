import type { PlayerColor } from '../app/types';
import { getState, setState } from '../app/state';
import { BOARD_SIZES } from '../config/boardSizes';
import { THEMES } from '../config/themes';
import { PLAYERS } from '../config/players';

// DA Projects / Food use this small pawn-shaped icon (confirmed against
// their Figma board references); Code vibes uses the CODE_VIBES_LABEL_ICON
// PNGs and Games uses the chess-pawn outline icon below.
const PAWN_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="currentColor" />
    <path d="M8 9.5C5.23858 9.5 3 11.5147 3 14H13C13 11.5147 10.7614 9.5 8 9.5Z" fill="currentColor" />
  </svg>
`;

// Code vibes-only flag/label icons, exported straight from Figma (one PNG
// per player color, since the source art isn't a single-color glyph that
// currentColor could recolor).
const CODE_VIBES_LABEL_ICON: Record<PlayerColor, string> = {
  blue: '<img src="/assets/code-vibes-theme/label-blue.png" alt="" />',
  orange: '<img src="/assets/code-vibes-theme/label-orange.png" alt="" />',
};

// Games-only chess-pawn icon. The Figma export has one identical SVG per
// player color (chess_pawn-blue.svg / chess_pawn-orange.svg in
// public/assets/gaming-theme/) that differ only by a hardcoded fill; since
// the geometry is byte-identical, this recolors a single shared path via
// currentColor instead of shipping two near-duplicate assets.
const GAMES_PAWN_ICON = `
  <svg width="22" height="28" viewBox="0 0 22 28" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.75 28C1.99375 28 1.34635 27.7258 0.807813 27.1775C0.269271 26.6292 0 25.97 0 25.2V22.435C0 21.9683 0.103125 21.5367 0.309375 21.14C0.515625 20.7433 0.790625 20.405 1.13437 20.125C2.71563 18.8183 3.90156 17.5 4.69219 16.17C5.48281 14.84 6.03854 13.65 6.35938 12.6H4.125C3.73542 12.6 3.40885 12.4658 3.14531 12.1975C2.88177 11.9292 2.75 11.5967 2.75 11.2C2.75 10.8033 2.88177 10.4708 3.14531 10.2025C3.40885 9.93417 3.73542 9.8 4.125 9.8H5.84375C5.52292 9.28667 5.27083 8.73833 5.0875 8.155C4.90417 7.57167 4.8125 6.95333 4.8125 6.3C4.8125 4.55 5.41406 3.0625 6.61719 1.8375C7.82031 0.6125 9.28125 0 11 0C12.7188 0 14.1797 0.6125 15.3828 1.8375C16.5859 3.0625 17.1875 4.55 17.1875 6.3C17.1875 6.95333 17.0958 7.57167 16.9125 8.155C16.7292 8.73833 16.4771 9.28667 16.1562 9.8H17.875C18.2646 9.8 18.5911 9.93417 18.8547 10.2025C19.1182 10.4708 19.25 10.8033 19.25 11.2C19.25 11.5967 19.1182 11.9292 18.8547 12.1975C18.5911 12.4658 18.2646 12.6 17.875 12.6H15.6406C15.9615 13.65 16.5172 14.84 17.3078 16.17C18.0984 17.5 19.2844 18.8183 20.8656 20.125C21.2094 20.405 21.4844 20.7433 21.6906 21.14C21.8969 21.5367 22 21.9683 22 22.435V25.2C22 25.97 21.7307 26.6292 21.1922 27.1775C20.6536 27.7258 20.0063 28 19.25 28H2.75ZM2.75 25.2H19.25V22.4C17.1417 20.72 15.6177 18.9875 14.6781 17.2025C13.7385 15.4175 13.1083 13.8833 12.7875 12.6H9.2125C8.89167 13.8833 8.26146 15.4175 7.32188 17.2025C6.38229 18.9875 4.85833 20.72 2.75 22.4V25.2ZM11 9.8C11.9625 9.8 12.776 9.46167 13.4406 8.785C14.1052 8.10833 14.4375 7.28 14.4375 6.3C14.4375 5.32 14.1052 4.49167 13.4406 3.815C12.776 3.13833 11.9625 2.8 11 2.8C10.0375 2.8 9.22396 3.13833 8.55937 3.815C7.89479 4.49167 7.5625 5.32 7.5625 6.3C7.5625 7.28 7.89479 8.10833 8.55937 8.785C9.22396 9.46167 10.0375 9.8 11 9.8Z" fill="currentColor" />
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

  const isCodeVibes = theme.boardScoreIcon === 'flag';
  const isGames = state.theme === 'games';
  const currentPlayerIcon = isCodeVibes
    ? CODE_VIBES_LABEL_ICON[state.playerColor]
    : isGames
      ? GAMES_PAWN_ICON
      : PAWN_ICON;
  const exitIcon = isCodeVibes || isGames ? CODE_VIBES_EXIT_ICON : EXIT_ICON;
  const scoreItems = theme.boardScoreOrder
    .map((color) => {
      const label = theme.boardScoreShowLabel ? `${PLAYERS[color].label} ` : '';
      const icon = isCodeVibes ? CODE_VIBES_LABEL_ICON[color] : isGames ? GAMES_PAWN_ICON : PAWN_ICON;
      return `<span class="board__score-item board__score-item--${color}">${icon}<span>${label}0</span></span>`;
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
        <span class="board__current-player-badge board__current-player-badge--${state.playerColor}${currentPlayerModifier}">${currentPlayerIcon}</span>
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
