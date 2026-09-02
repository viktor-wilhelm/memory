import { setState } from '../app/state';

export function renderHome(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--home';
  section.innerHTML = `
    <h1>Ready to play?</h1>
    <button type="button" class="button">Play</button>
  `;

  section.querySelector('.button')?.addEventListener('click', () => {
    setState({ screen: 'settings' });
  });

  return section;
}
