import type { CardState } from './types';

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createDeck(pairCount: number, random: () => number = Math.random): CardState[] {
  const cards: CardState[] = [];
  for (let pairId = 0; pairId < pairCount; pairId += 1) {
    for (let copy = 0; copy < 2; copy += 1) {
      cards.push({ id: pairId * 2 + copy, pairId, isFlipped: false, isMatched: false });
    }
  }
  return shuffle(cards, random);
}
