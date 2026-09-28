import { returnToStart } from '../app/game';
import { getState } from '../app/state';
import { DEFAULT_THEME, THEMES } from '../config/themes';
import { PLAYERS } from '../config/players';
import { RESULT_PAWN_ICON, RESULT_PAWN_OUTLINE_ICON, SCALE_ICON } from '../config/icons';

// Shared Winner/Draw result screen for all four themes, reached from Game
// Over after RESULT_REVEAL_DELAY_MS. Draw always shows the same scale icon
// (SCALE_ICON, recolored per theme in CSS); Winner shows either the shared
// pawn icon (solid for Code vibes/Food, white-outlined for DA Projects) or
// the Games trophy image, per theme.resultWinnerGraphic. Code vibes-only
// confetti and the DRAW bevel backing are structural (not just styling), so
// they're branched here rather than expressed purely in CSS.
export function renderResult(): HTMLElement {
  const state = getState();
  const theme = THEMES[state.theme ?? DEFAULT_THEME];
  const isCodeVibes = state.theme === 'code-vibes';
  const isDraw = state.result === 'draw';

  let body: string;
  if (isDraw) {
    const drawWord = isCodeVibes
      ? `<span class="result__draw-backing" aria-hidden="true">DRAW</span><span class="result__draw-word">DRAW</span>`
      : `<span class="result__draw-word">DRAW</span>`;
    body = `
      <p class="result__eyebrow">It’s a</p>
      <h1 class="result__draw-title">${drawWord}</h1>
      <div class="result__scale">${SCALE_ICON}</div>
    `;
  } else {
    const color = state.result === 'blue' ? 'blue' : 'orange';
    const graphic =
      theme.resultWinnerGraphic === 'trophy'
        ? `<img class="result__trophy" src="/assets/gaming-theme/result/trophy.png" alt="" />`
        : theme.resultWinnerGraphic === 'pawn-outline'
          ? `<div class="result__pawn result__pawn--${color}">${RESULT_PAWN_OUTLINE_ICON}</div>`
          : `<div class="result__pawn result__pawn--${color}">${RESULT_PAWN_ICON}</div>`;
    const graphicWrapped = theme.resultWinnerGraphic === 'pawn-backed' ? `<div class="result__pawn-backing">${graphic}</div>` : graphic;

    body = `
      <p class="result__eyebrow">The winner is</p>
      <h1 class="result__title result__title--${color}">${PLAYERS[color].label} Player</h1>
      <div class="result__graphic">${graphicWrapped}</div>
    `;
  }

  const section = document.createElement('section');
  section.className = `screen screen--result screen--result--${theme.resultRevealAnimation}`;
  section.dataset.outcome = isDraw ? 'draw' : 'winner';
  section.innerHTML = `
    ${isCodeVibes && !isDraw ? '<div class="result__confetti" aria-hidden="true"></div>' : ''}
    <div class="result__content">
      <div class="result__reveal">
        ${body}
        <button type="button" class="result__button">${theme.resultButtonLabel}</button>
      </div>
    </div>
  `;

  section.querySelector('.result__button')?.addEventListener('click', returnToStart);

  return section;
}
