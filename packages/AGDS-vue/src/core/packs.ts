import { boxPalette } from './boxPalette'
import { mapSpacing, tokens } from './tokens'
import type { FontSize, LineHeight } from './tokens'

/**
 * Returns font-size and line-height CSS properties for a given size/leading pair.
 * Uses the xs (mobile-first) font size scale.
 */
export function fontGrid(
  size: FontSize,
  leading: LineHeight
): { fontSize: string; lineHeight: number } {
  return {
    fontSize: `${tokens.fontSize.xs[size]}rem`,
    lineHeight: tokens.lineHeight[leading],
  }
}

const control = {
  sm: {
    width: mapSpacing(1.5),
    height: mapSpacing(1.5),
    borderWidth: `${tokens.borderWidth.lg}px`,
  },
  md: {
    width: mapSpacing(2),
    height: mapSpacing(2),
    borderWidth: `${tokens.borderWidth.lg}px`,
  },
}

const input = {
  sm: {
    ...fontGrid('sm', 'default'),
    height: '2rem', // 32 px
  },
  md: {
    ...fontGrid('sm', 'default'),
    height: '3rem', // 48 px
  },
}

const outline = {
  outlineWidth: '3px',
  outlineStyle: 'solid',
  outlineColor: boxPalette.foregroundFocus,
  outlineOffset: `${0.5 * tokens.unit}px`,
}

const underline = {
  textDecoration: 'underline',
  textDecorationSkipInk: 'auto',
} as const

const truncate = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
} as const

/** Print-specific CSS declarations for use in component `<style>` blocks. */
export const print = {
  /** Hides element in print. */
  hidden: { display: 'none !important' } as const,
  /** Shows element in print. */
  visible: { display: 'block !important', height: 'auto !important' } as const,
  /** Forces background colours to render in print (e.g. white text on dark bg). */
  exactColor: {
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
  } as const,
}

export const packs = {
  control,
  input,
  outline,
  underline,
  truncate,
  print,
}
