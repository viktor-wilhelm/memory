import { fillTemplate } from '../app/template';
import type { PlayerColor } from '../app/types';
import labelIconTemplate from '../templates/pages/label-icon.html?raw';
import chessPawnSvg from '/assets/icons/chess-pawn.svg?raw';
import exitSvg from '/assets/icons/exit.svg?raw';
import exitGameTextSvg from '/assets/icons/exit-game-text.svg?raw';
import resultPawnOutlineSvg from '/assets/icons/result-pawn-outline.svg?raw';
import resultPawnSvg from '/assets/icons/result-pawn.svg?raw';
import scaleSvg from '/assets/icons/scale.svg?raw';

/**
 * Builds the Code vibes flag/label icon of a player. It is exported from Figma as one PNG per
 * color, because the source art is not a single-color glyph that `currentColor` could recolor.
 * @param color The player the icon belongs to.
 * @returns The icon markup.
 */
function buildLabelIcon(color: PlayerColor): string {
  return fillTemplate(labelIconTemplate, { color });
}

/** Code vibes label icon per player color. */
export const CODE_VIBES_LABEL_ICON: Record<PlayerColor, string> = {
  blue: buildLabelIcon('blue'),
  orange: buildLabelIcon('orange'),
};

/**
 * Chess-pawn outline icon used by Games, DA Projects and Food wherever a player needs a small
 * colored marker (Board's current-player badge and score, Game Over's score panel). One shared
 * path is recolored via `currentColor` instead of shipping one near-duplicate asset per color.
 */
export const CHESS_PAWN_ICON: string = chessPawnSvg;

/** Exit arrow icon of the Board header's Exit button. */
export const EXIT_ICON: string = exitSvg;

/** "EXIT GAME" as vector text, used by Food's Exit button at its native scale. */
export const EXIT_TEXT_ICON: string = exitGameTextSvg;

/**
 * Scales-of-justice icon shared by every theme's Draw screen, recolored via `currentColor`.
 * Extracted from public/assets/Memory/Draw_02.svg, the only source with the icon as plain paths.
 */
export const SCALE_ICON: string = scaleSvg;

/** Big winner-screen pawn, solid fill (Code vibes; Food reuses it on a cream backing). */
export const RESULT_PAWN_ICON: string = resultPawnSvg;

/** Big winner-screen pawn with a 6px white outline (DA Projects), 212x262 including the stroke. */
export const RESULT_PAWN_OUTLINE_ICON: string = resultPawnOutlineSvg;
