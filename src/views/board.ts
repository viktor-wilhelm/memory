import { setState } from '../app/state';

export function renderBoard(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--board';
  section.innerHTML = `
    <p>Spielfeld folgt in einem späteren Schritt.</p>
    <button type="button" class="button">Exit game</button>
  `;

  section.querySelector('.button')?.addEventListener('click', () => {
    setState({ screen: 'gameOver' });
  });

  return section;
}
