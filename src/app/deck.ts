import type { CardState } from './types';

/** Every pair consists of two identical cards. */
export const CARDS_PER_PAIR = 2;

/**
 * Returns a shuffled copy of the items (Fisher-Yates).
 * @param items The items to shuffle; the array is not modified.
 * @param random A random number source in [0, 1), replaceable for tests.
 * @returns The shuffled copy.
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates the face-down cards of one pair.
 * @param pairId The id shared by both cards of the pair.
 * @returns The cards of the pair.
 */
function createPair(pairId: number): CardState[] {
  return Array.from({ length: CARDS_PER_PAIR }, (_unused: unknown, copy: number): CardState => ({
    id: pairId * CARDS_PER_PAIR + copy,
    pairId,
    isFlipped: false,
    isMatched: false,
  }));
}

/**
 * Creates a shuffled deck with the given number of pairs.
 * @param pairCount How many pairs the deck contains.
 * @param random A random number source in [0, 1), replaceable for tests.
 * @returns The shuffled deck.
 */
export function createDeck(pairCount: number, random: () => number = Math.random): CardState[] {
  const cards = Array.from({ length: pairCount }, (_unused: unknown, pairId: number): CardState[] =>
    createPair(pairId),
  );
  return shuffle(cards.flat(), random);
}
