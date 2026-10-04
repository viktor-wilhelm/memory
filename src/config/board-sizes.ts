import type { BoardSizeId } from '../app/types';

/** Layout and deck size of one selectable board. */
export interface BoardSizeConfig {
  label: string;
  cols: number;
  rows: number;
  pairCount: number;
}

/** Selectable boards, keyed by their id (columns x rows). */
export const BOARD_SIZES: Record<BoardSizeId, BoardSizeConfig> = {
  '4x4': { label: '16 cards', cols: 4, rows: 4, pairCount: 8 },
  '4x6': { label: '24 cards', cols: 6, rows: 4, pairCount: 12 },
  '6x6': { label: '36 cards', cols: 6, rows: 6, pairCount: 18 },
};

/** The only board that is small enough to keep the roomy gap between its cards. */
export const ROOMY_BOARD_SIZE: BoardSizeId = '4x4';

/** Gap between the cards of the roomy board, in px (smaller boards use the theme's gap). */
export const ROOMY_CARD_GAP_PX = 16;
