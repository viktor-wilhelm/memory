import { setState } from '../app/state';

export function renderSettings(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--settings';
  section.innerHTML = `
    <h1>Settings</h1>
    <p>Theme, Spielerfarbe und Feldgröße folgen in einem späteren Schritt.</p>
    <button type="button" class="button">Start</button>
  `;

  section.querySelector('.button')?.addEventListener('click', () => {
    setState({ screen: 'board' });
  });

  return section;
}
