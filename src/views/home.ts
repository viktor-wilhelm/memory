import { setState } from '../app/state';

export function renderHome(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'screen screen--home';
  section.innerHTML = `
    <span class="home__decor" aria-hidden="true"></span>
    <div class="home__content">
      <p class="home__eyebrow">It's play time.</p>
      <h1 class="home__title">Ready to play?</h1>
      <button type="button" class="play-button" aria-label="Play">
        <span class="play-button__controller"></span>
        <span class="play-button__label"></span>
        <span class="play-button__arrow"></span>
      </button>
    </div>
  `;

  section.querySelector('.play-button')?.addEventListener('click', () => {
    setState({ screen: 'settings' });
  });

  return section;
}
  