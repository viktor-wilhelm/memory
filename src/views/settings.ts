import { CARDS_PER_PAIR } from '../app/deck';
import { startGame } from '../app/game';
import { getState, setState } from '../app/state';
import { fillTemplate } from '../app/template';
import type { BoardSizeId, GameState, PlayerColor, ThemeId } from '../app/types';
import { BOARD_SIZES } from '../config/board-sizes';
import { PLAYERS } from '../config/players';
import { DEFAULT_THEME, THEMES } from '../config/themes';
import groupTemplate from '../templates/pages/group.html?raw';
import layoutTemplate from '../templates/pages/settings-layout.html?raw';
import radioRowTemplate from '../templates/pages/radio-row.html?raw';
import separatorTemplate from '../templates/pages/separator.html?raw';
import { createScreenSection } from './screen-section';

/** One selectable entry of a radio group. */
interface RadioOption {
  value: string;
  label: string;
}

/** Heading and markup hooks of one radio group. */
interface GroupConfig {
  inputName: string;
  listName: string;
  title: string;
  iconSrc: string;
}

const THEME_GROUP: GroupConfig = {
  inputName: 'theme',
  listName: 'theme',
  title: 'Game themes',
  iconSrc: '/assets/settings-page/palette.svg',
};

const PLAYER_GROUP: GroupConfig = {
  inputName: 'player',
  listName: 'player',
  title: 'Choose player',
  iconSrc: '/assets/settings-page/chess_pawn.svg',
};

const BOARD_SIZE_GROUP: GroupConfig = {
  inputName: 'boardSize',
  listName: 'board',
  title: 'Board size',
  iconSrc: '/assets/settings-page/style.svg',
};

/**
 * Builds one radio row.
 * @param inputName The name shared by the radio inputs of the group.
 * @param option The entry the row stands for.
 * @param isChecked Whether the entry is the current selection.
 * @returns The row markup.
 */
function buildRadioRow(inputName: string, option: RadioOption, isChecked: boolean): string {
  return fillTemplate(radioRowTemplate, {
    name: inputName,
    value: option.value,
    label: option.label,
    checkedClass: isChecked ? ' is-checked' : '',
    checkedAttribute: isChecked ? 'checked' : '',
  });
}

/**
 * Builds the radio rows of a group.
 * @param inputName The name shared by the radio inputs of the group.
 * @param options The entries of the group.
 * @param checkedValue The selected entry's value, or null while nothing is selected.
 * @returns The markup of all rows.
 */
function buildRows(inputName: string, options: RadioOption[], checkedValue: string | null): string {
  return options
    .map((option: RadioOption): string =>
      buildRadioRow(inputName, option, option.value === checkedValue),
    )
    .join('');
}

/**
 * Builds a radio group with its heading.
 * @param group The group's heading and markup hooks.
 * @param options The entries of the group.
 * @param checkedValue The selected entry's value, or null while nothing is selected.
 * @returns The group markup.
 */
function buildGroup(
  group: GroupConfig,
  options: RadioOption[],
  checkedValue: string | null,
): string {
  const rows = buildRows(group.inputName, options, checkedValue);
  const { iconSrc, title, listName } = group;
  return fillTemplate(groupTemplate, { iconSrc, title, listName, rows });
}

/**
 * Lists the entries of a configuration record as radio options.
 * @param labels The labels by id.
 * @returns One option per id.
 */
function toOptions(labels: Record<string, { label: string }>): RadioOption[] {
  return Object.keys(labels).map((id: string): RadioOption => ({
    value: id,
    label: labels[id].label,
  }));
}

/**
 * Builds the three radio groups: theme, player and board size.
 * @param state The current game state.
 * @returns The markup of all groups.
 */
function buildGroups(state: GameState): string {
  const player = state.playerSelected ? state.playerColor : null;
  const boardSize = state.boardSizeSelected ? state.boardSize : null;
  return [
    buildGroup(THEME_GROUP, toOptions(THEMES), state.theme),
    buildGroup(PLAYER_GROUP, toOptions(PLAYERS), player),
    buildGroup(BOARD_SIZE_GROUP, toOptions(BOARD_SIZES), boardSize),
  ].join('\n');
}

/**
 * Describes the three selections for the breadcrumb; unselected steps show a placeholder.
 * @param state The current game state.
 * @returns The breadcrumb texts for theme, player and board size.
 */
function describeSelection(state: GameState): Record<string, string> {
  const { theme, playerSelected, playerColor, boardSizeSelected, boardSize } = state;
  const cardCount = BOARD_SIZES[boardSize].pairCount * CARDS_PER_PAIR;
  return {
    themeText: theme ? THEMES[theme].label : 'Theme',
    playerText: playerSelected ? `${PLAYERS[playerColor].label} Player` : 'Player',
    boardSizeText: boardSizeSelected ? `Board-${cardCount} Cards` : 'Board size',
  };
}

/**
 * Builds the arrow between two breadcrumb steps; it is highlighted once the step before it is chosen.
 * @param isActive Whether the step before the separator has been chosen.
 * @returns The separator markup.
 */
function buildSeparator(isActive: boolean): string {
  return fillTemplate(separatorTemplate, { activeClass: isActive ? ' settings__sep--active' : '' });
}

/**
 * Tells whether every setting has been chosen, which enables the Start button.
 * @param state The current game state.
 * @returns True when theme, player and board size are all selected.
 */
function isReadyToStart(state: GameState): boolean {
  return Boolean(state.theme) && state.playerSelected && state.boardSizeSelected;
}

/**
 * Builds the Settings markup: the selection groups, the theme preview and the breadcrumb.
 * @param state The current game state.
 * @returns The screen markup.
 */
function buildSettingsMarkup(state: GameState): string {
  const previewTheme = THEMES[state.theme ?? DEFAULT_THEME];
  return fillTemplate(layoutTemplate, {
    groups: buildGroups(state),
    previewImage: previewTheme.previewImage,
    previewAlt: previewTheme.label,
    ...describeSelection(state),
    themeSeparator: buildSeparator(Boolean(state.theme)),
    playerSeparator: buildSeparator(state.playerSelected),
    startDisabledAttribute: isReadyToStart(state) ? '' : 'disabled',
  });
}

/**
 * Calls a handler with the value of a radio input whenever its selection changes.
 * @param section The screen element.
 * @param inputName The name shared by the radio inputs of the group.
 * @param onSelect Receives the newly selected value.
 */
function bindRadioGroup(
  section: HTMLElement,
  inputName: string,
  onSelect: (value: string) => void,
): void {
  section.querySelectorAll(`input[name="${inputName}"]`).forEach((input: Element): void => {
    input.addEventListener('change', (event: Event): void =>
      onSelect((event.target as HTMLInputElement).value),
    );
  });
}

/**
 * Stores the three selections in the state when the user changes them.
 * @param section The screen element.
 */
function bindSelections(section: HTMLElement): void {
  bindRadioGroup(section, 'theme', (value: string): void => setState({ theme: value as ThemeId }));
  bindRadioGroup(section, 'player', (value: string): void => {
    setState({ playerColor: value as PlayerColor, playerSelected: true });
  });
  bindRadioGroup(section, 'boardSize', (value: string): void => {
    setState({ boardSize: value as BoardSizeId, boardSizeSelected: true });
  });
}

/**
 * Shows a theme's preview image.
 * @param image The preview image element, if the screen has one.
 * @param themeId The theme whose preview is shown.
 */
function showPreview(image: HTMLImageElement | null, themeId: ThemeId): void {
  if (image) image.src = THEMES[themeId].previewImage;
}

/**
 * Previews a theme while the pointer is over its row and restores the chosen theme afterwards.
 * @param section The screen element.
 */
function bindThemePreview(section: HTMLElement): void {
  const image = section.querySelector<HTMLImageElement>('.settings__preview-image');
  section
    .querySelectorAll<HTMLElement>('.radio-list--theme .radio-row')
    .forEach((row: HTMLElement): void => {
      const themeId = row.querySelector('input')?.value as ThemeId;
      row.addEventListener('mouseenter', (): void => showPreview(image, themeId));
      row.addEventListener('mouseleave', (): void =>
        showPreview(image, getState().theme ?? DEFAULT_THEME),
      );
    });
}

/**
 * Builds the Settings screen where the player picks theme, player color and board size.
 * @returns The screen element.
 */
export function renderSettings(): HTMLElement {
  const section = createScreenSection('screen--settings', buildSettingsMarkup(getState()));
  bindSelections(section);
  bindThemePreview(section);
  section.querySelector('.settings__start')?.addEventListener('click', startGame);
  return section;
}
