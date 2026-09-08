import { getState, setState } from '../app/state';
import { BOARD_SIZES } from '../config/boardSizes';
import { THEMES } from '../config/themes';

const PERSON_ICON = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="currentColor" />
    <path d="M8 9.5C5.23858 9.5 3 11.5147 3 14H13C13 11.5147 10.7614 9.5 8 9.5Z" fill="currentColor" />
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
  const cardBackImage = THEMES[state.theme ?? 'code-vibes'].cardBackImage;
  const cardCount = boardSize.pairCount * 2;
  const placeholderCards = Array.from({ length: cardCount })
    .map(() => `<div class="board-card"><img class="board-card__back" src="${cardBackImage}" alt="" /></div>`)
    .join('');

  const section = document.createElement('section');
  section.className = 'screen screen--board';
  section.innerHTML = `
    <div class="board__header">
      <div class="board__score">
        <span class="board__score-item board__score-item--orange">${PERSON_ICON}<span>0</span></span>
        <span class="board__score-item board__score-item--blue">${PERSON_ICON}<span>0</span></span>
      </div>
      <div class="board__current-player">
        Current player:
        <span class="board__current-player-badge board__current-player-badge--${state.playerColor}">${PERSON_ICON}</span>
      </div>
      <button type="button" class="board__exit">${EXIT_ICON}Exit game</button>
    </div>

    <div class="board__grid-wrap">
      <div class="board__grid" style="--board-cols: ${boardSize.cols}; --board-rows: ${boardSize.rows};">
        ${placeholderCards}
      </div>
    </div>
  `;

  section.querySelector('.board__exit')?.addEventListener('click', () => {
    setState({ screen: 'gameOver' });
  });

  return section;
}
