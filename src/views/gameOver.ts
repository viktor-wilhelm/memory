import { getState } from '../app/state';
import { DEFAULT_THEME, THEMES } from '../config/themes';
import { PLAYERS } from '../config/players';
import { CHESS_PAWN_ICON, CODE_VIBES_LABEL_ICON } from '../config/icons';

// Shared Game Over screen for all four themes: the title is either a
// pre-composited image (Code vibes) or literal text styled per theme in CSS
// (theme.gameOverTitle), and the score row's icon/label style and player
// order come from the theme too (theme.gameOverScoreStyle/Order). Scores
// always come from state — never hardcoded.
export function renderGameOver(): HTMLElement {
  const state = getState();
  const theme = THEMES[state.theme ?? DEFAULT_THEME];

  const title =
    theme.gameOverTitle.type === 'image'
      ? `<h1 class="game-over__title"><img src="${theme.gameOverTitle.src}" alt="Game over" /></h1>`
      : `<h1 class="game-over__title">GAME OVER</h1>`;

  const showLabel = theme.gameOverScoreStyle === 'label';
  const players = theme.gameOverScoreOrder
    .map((color) => {
      const icon = showLabel ? CODE_VIBES_LABEL_ICON[color] : CHESS_PAWN_ICON;
      const label = showLabel ? `<span class="game-over__player-name">${PLAYERS[color].label}</span>` : '';
      return `<span class="game-over__player game-over__player--${color}">${icon}${label}<span class="game-over__player-score">${state.scores[color]}</span></span>`;
    })
    .join('');

  const section = document.createElement('section');
  section.className = 'screen screen--game-over';
  section.innerHTML = `
    <div class="game-over__content">
      ${title}
      <div class="game-over__score">
        <p class="game-over__score-title">Final score</p>
        <div class="game-over__score-panel">${players}</div>
      </div>
    </div>
  `;

  return section;
}
