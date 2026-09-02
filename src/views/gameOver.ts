import { setState } from '../app/state';

export function renderGameOver(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--game-over';
  section.innerHTML = `
    <h1>Game over</h1>
    <p>Winner-/Draw-Anzeige folgt in einem späteren Schritt.</p>
    <button type="button" class="button">Back to start</button>
  `;

  section.querySelector('.button')?.addEventListener('click', () => {
    setState({ screen: 'home' });
  });

  return section;
}
