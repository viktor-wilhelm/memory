import { exitGame, selectCard } from '../app/game';
import { getState, setState } from '../app/state';
import { fillTemplate, type TemplateValues } from '../app/template';
import type { GameState } from '../app/types';
import { BOARD_SIZES, ROOMY_BOARD_SIZE, ROOMY_CARD_GAP_PX } from '../config/board-sizes';
import { DEFAULT_THEME, THEMES, type ThemeConfig } from '../config/themes';
import exitConfirmTemplate from '../templates/board/exit-confirm.html?raw';
import layoutTemplate from '../templates/board/layout.html?raw';
import { buildHeaderValues } from './board-header';
import { buildCards, playPendingFlips } from './board-cards';
import { createScreenSection } from './screen-section';

/**
 * Picks the gap between cards. The small board is roomy; on the bigger boards the gap shrinks
 * so more cards fit without shrinking the cards themselves too much (per theme, as in Figma).
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The gap in px.
 */
function pickCardGap(state: GameState, theme: ThemeConfig): number {
  return state.boardSize === ROOMY_BOARD_SIZE ? ROOMY_CARD_GAP_PX : theme.boardDenseCardGapPx;
}

/**
 * Upper-cases a dialog label when the theme styles its dialog in capitals.
 * @param label The label text.
 * @param theme The active theme.
 * @returns The label to display.
 */
function formatDialogLabel(label: string, theme: ThemeConfig): string {
  return theme.exitConfirmUppercase ? label.toUpperCase() : label;
}

/**
 * Builds the "quit the game?" dialog, or nothing while it is closed.
 * @param state The current game state.
 * @param theme The active theme.
 * @returns The dialog markup, or an empty string.
 */
function buildExitConfirm(state: GameState, theme: ThemeConfig): string {
  if (!state.boardExitConfirmOpen) return '';
  return fillTemplate(exitConfirmTemplate, {
    animation: theme.exitConfirmAnimation,
    confirmStyle: theme.exitConfirmStyle,
    cancelLabel: formatDialogLabel(theme.exitConfirmCancelLabel, theme),
    confirmLabel: formatDialogLabel(theme.exitConfirmConfirmLabel, theme),
  });
}

/**
 * Collects the template values of the card grid.
 * @param state The current game state.
 * @param theme The active theme.
 * @param cardsHtml The markup of the cards.
 * @returns The grid values for the board template.
 */
function buildGridValues(state: GameState, theme: ThemeConfig, cardsHtml: string): TemplateValues {
  const { cols, rows } = BOARD_SIZES[state.boardSize];
  return { columns: cols, rows, gap: pickCardGap(state, theme), cards: cardsHtml };
}

/**
 * Collects the values of the board template.
 * @param state The current game state.
 * @param theme The active theme.
 * @param cardsHtml The markup of the cards.
 * @returns The template values.
 */
function buildBoardValues(state: GameState, theme: ThemeConfig, cardsHtml: string): TemplateValues {
  return {
    ...buildHeaderValues(state, theme),
    ...buildGridValues(state, theme, cardsHtml),
    exitConfirm: buildExitConfirm(state, theme),
  };
}

/**
 * Opens or closes the "quit the game?" dialog.
 * @param isOpen Whether the dialog should be shown.
 */
function setExitDialogOpen(isOpen: boolean): void {
  setState({ boardExitConfirmOpen: isOpen });
}

/**
 * Opens or closes the exit dialog and leaves the game when the player confirms.
 * @param section The board element.
 */
function bindExitControls(section: HTMLElement): void {
  section
    .querySelector('.board__exit')
    ?.addEventListener('click', (): void => setExitDialogOpen(true));
  section
    .querySelector('.board__exit-confirm-cancel')
    ?.addEventListener('click', (): void => setExitDialogOpen(false));
  section.querySelector('.board__exit-confirm-confirm')?.addEventListener('click', exitGame);
}

/**
 * Selects a card when the player clicks it (one listener for the whole grid).
 * @param section The board element.
 */
function bindCardClicks(section: HTMLElement): void {
  section.querySelector('.board__grid')?.addEventListener('click', (event: Event): void => {
    const cardElement = (event.target as Element).closest<HTMLElement>('.board-card');
    if (cardElement) selectCard(Number(cardElement.dataset.cardId));
  });
}

/**
 * Builds the game board with its header, the card grid and, while open, the exit dialog.
 * @returns The screen element.
 */
export function renderBoard(): HTMLElement {
  const state = getState();
  const theme = THEMES[state.theme ?? DEFAULT_THEME];
  const cards = buildCards(state.deck, theme);
  const section = createScreenSection(
    'screen--board',
    fillTemplate(layoutTemplate, buildBoardValues(state, theme, cards.html)),
  );
  section.dataset.boardSize = state.boardSize;
  bindExitControls(section);
  bindCardClicks(section);
  playPendingFlips(section, cards.pendingFlips);
  return section;
}
