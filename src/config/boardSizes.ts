import type { BoardSizeId } from '../app/types';

export const BOARD_SIZES: Record<BoardSizeId, { label: string; cols: number; rows: number; pairCount: number }> = {
  '4x4': { label: '16 cards', cols: 4, rows: 4, pairCount: 8 },
  '4x6': { label: '24 cards', cols: 4, rows: 6, pairCount: 12 },
  '6x6': { label: '36 cards', cols: 6, rows: 6, pairCount: 18 },
};
