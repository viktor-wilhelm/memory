import { fillTemplate, type TemplateValues } from '../app/template';
import type { CardState } from '../app/types';
import type { ThemeConfig } from '../config/themes';
import facedCardTemplate from '../templates/board/card-faced.html?raw';
import plainCardTemplate from '../templates/board/card.html?raw';

/** A card whose flip has to be started after the new markup is in the DOM. */
export interface PendingFlip {
  id: number;
  isFlipped: boolean;
}

/** The card markup of the whole board and the flips that still have to be animated. */
export interface CardsMarkup {
  html: string;
  pendingFlips: PendingFlip[];
}

/**
 * Reads which cards the previous render showed face up. The board is rebuilt on every state
 * change, so a flip can only animate if the new card starts in the state the old DOM showed.
 * @returns The flipped state by card id.
 */
function readPreviousFlipStates(): Map<number, boolean> {
  const states = new Map<number, boolean>();
  document.querySelectorAll<HTMLElement>('.board-card').forEach((element: HTMLElement): void => {
    states.set(Number(element.dataset.cardId), element.classList.contains('is-flipped'));
  });
  return states;
}

/**
 * Derives a short description of a card motif from its file name ("pacman-and-ghost.png" becomes
 * "pacman and ghost").
 * @param faceSrc The path of the face image.
 * @returns The description used as the image's alt text.
 */
export function describeCardFace(faceSrc: string): string {
  const fileName = faceSrc.slice(faceSrc.lastIndexOf('/') + 1);
  return fileName.replace(/\.\w+$/, '').replace(/-/g, ' ');
}

/**
 * Collects the template values every card has in common.
 * @param card The card.
 * @param theme The active theme.
 * @returns The id, the back image and the matched class.
 */
function buildCardValues(card: CardState, theme: ThemeConfig): TemplateValues {
  return {
    id: card.id,
    backImage: theme.cardBackImage,
    matchedClass: card.isMatched ? ' is-matched' : '',
  };
}

/**
 * Builds a card without a face image; it only shows its back.
 * @param card The card.
 * @param theme The active theme.
 * @returns The card markup.
 */
function buildPlainCard(card: CardState, theme: ThemeConfig): string {
  const flippedClass = card.isFlipped ? ' is-flipped' : '';
  return fillTemplate(plainCardTemplate, { ...buildCardValues(card, theme), flippedClass });
}

/**
 * Builds a card with a face image. The face is hidden from assistive technology while the card
 * is face down, so it does not reveal where the pairs are.
 * @param card The card.
 * @param face The path of the face image.
 * @param theme The active theme.
 * @param startsFlipped Whether the card is rendered face up before its flip animation.
 * @returns The card markup.
 */
function buildFacedCard(
  card: CardState,
  face: string,
  theme: ThemeConfig,
  startsFlipped: boolean,
): string {
  return fillTemplate(facedCardTemplate, {
    ...buildCardValues(card, theme),
    flippedClass: startsFlipped ? ' is-flipped' : '',
    faceImage: face,
    faceDescription: describeCardFace(face),
    faceHidden: String(!card.isFlipped),
  });
}

/**
 * Builds one card. A card with a face starts in the flip state of the previous render and is
 * queued for the flip animation when its state changed.
 * @param card The card.
 * @param theme The active theme.
 * @param previousFlips The flipped states of the previous render.
 * @param pendingFlips Collects the flips to animate.
 * @returns The card markup.
 */
function buildCard(
  card: CardState,
  theme: ThemeConfig,
  previousFlips: Map<number, boolean>,
  pendingFlips: PendingFlip[],
): string {
  const face = theme.cardFaces[card.pairId];
  if (!face) return buildPlainCard(card, theme);
  const startsFlipped = previousFlips.get(card.id) ?? card.isFlipped;
  if (startsFlipped !== card.isFlipped)
    pendingFlips.push({ id: card.id, isFlipped: card.isFlipped });
  return buildFacedCard(card, face, theme, startsFlipped);
}

/**
 * Builds the markup of every card of the deck.
 * @param deck The cards in board order.
 * @param theme The active theme.
 * @returns The markup and the flips to animate.
 */
export function buildCards(deck: CardState[], theme: ThemeConfig): CardsMarkup {
  const previousFlips = readPreviousFlipStates();
  const pendingFlips: PendingFlip[] = [];
  const html = deck
    .map((card: CardState): string => buildCard(card, theme, previousFlips, pendingFlips))
    .join('');
  return { html, pendingFlips };
}

/**
 * Starts the queued flip animations on the next frame, after the cards were laid out in their
 * previous state.
 * @param section The board element.
 * @param pendingFlips The flips to animate.
 */
export function playPendingFlips(section: HTMLElement, pendingFlips: PendingFlip[]): void {
  if (pendingFlips.length === 0) return;
  requestAnimationFrame((): void => {
    void section.offsetWidth;
    pendingFlips.forEach(({ id, isFlipped }: PendingFlip): void => {
      section
        .querySelector(`.board-card[data-card-id="${id}"]`)
        ?.classList.toggle('is-flipped', isFlipped);
    });
  });
}
