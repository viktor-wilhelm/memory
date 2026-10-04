import { setState } from '../app/state';
import homeTemplate from '../templates/home.html?raw';
import { createScreenSection } from './screen-section';

/** Opens the Settings screen. */
function openSettings(): void {
  setState({ screen: 'settings' });
}

/**
 * Builds the start screen with the Play button.
 * @returns The screen element.
 */
export function renderHome(): HTMLElement {
  const section = createScreenSection('screen--home', homeTemplate);
  section.querySelector('.play-button')?.addEventListener('click', openSettings);
  return section;
}
