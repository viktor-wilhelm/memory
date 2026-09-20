import { returnToStart } from '../app/game';

export function renderGameOver(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--game-over';
  section.innerHTML = `
    <h1>Game over</h1>
    <p>Winner and draw display will be added in a later step.</p>
    <button type="button" class="button">Back to start</button>
  `;

  section.querySelector('.button')?.addEventListener('click', returnToStart);

  return section;
}
