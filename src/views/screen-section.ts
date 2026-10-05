/**
 * Creates the `<section>` element that wraps one screen.
 * @param screenClass The screen's own class names, added after the shared `screen` class.
 * @param html The screen's markup.
 * @returns The section with the markup inside.
 */
export function createScreenSection(screenClass: string, html: string): HTMLElement {
  const section = document.createElement('section');
  section.className = `screen ${screenClass}`;
  section.innerHTML = html;
  return section;
}
