<script setup lang="ts">
import { computed } from 'vue'

/**
 * Semantic text colour, resolved to a `--agds-color-*` token.
 *
 * - `'text'` — Default body text colour.
 * - `'muted'` — Subdued/secondary text (hints, captions, metadata).
 * - `'inverse'` — Light text for use on dark/coloured backgrounds.
 * - `'disabled'` — Greyed-out text for inactive elements.
 */
export type TextColor = 'text' | 'muted' | 'inverse' | 'disabled'

/**
 * Font family token.
 *
 * - `'body'` — Default sans-serif body font.
 * - `'heading'` — Display/heading font (may differ from body).
 * - `'mono'` — Monospace; for code, IDs, or tabular data.
 */
export type TextFamily = 'body' | 'heading' | 'mono'

/**
 * Font size from the type scale, resolving to `--agds-font-size-*` tokens.
 * Sizes run from `'xs'` (smallest) to `'4xl'` (largest).
 */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

/**
 * Font weight, resolving to `--agds-font-weight-*` tokens.
 *
 * - `'normal'` — Regular weight for body text.
 * - `'medium'` — Slightly emphasised; use for labels or subheadings.
 * - `'semibold'` — Strong emphasis without full bold.
 * - `'bold'` — Maximum emphasis; headings and key callouts.
 */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

/**
 * Line height (leading), resolving to `--agds-line-height-*` tokens.
 *
 * - `'tight'` — For headings and short display text.
 * - `'snug'` — Slightly condensed; for UI labels and secondary text.
 * - `'normal'` — Default for body copy.
 * - `'relaxed'` — Open/airy; for introductory paragraphs or long-form prose.
 */
export type TextLeading = 'tight' | 'snug' | 'normal' | 'relaxed'

export interface AGDSTextProps {
  /** HTML element to render as. */
  as?: string
  /** Text colour. */
  color?: TextColor
  /** Font family. */
  fontFamily?: TextFamily
  /** Font size from the type scale. */
  fontSize?: TextSize
  /** Font weight. */
  fontWeight?: TextWeight
  /** Line height. */
  lineHeight?: TextLeading
}

const props = withDefaults(defineProps<AGDSTextProps>(), {
  as: 'span',
  color: 'text',
  fontFamily: 'body',
  fontSize: 'sm',
  fontWeight: 'normal',
  lineHeight: 'normal',
})

const colorMap: Record<TextColor, string> = {
  text:     'var(--agds-color-text)',
  muted:    'var(--agds-color-text-muted)',
  inverse:  'var(--agds-color-text-inverse)',
  disabled: 'var(--agds-color-text-disabled)',
}

const familyMap: Record<TextFamily, string> = {
  body:    'var(--agds-font-family-body)',
  heading: 'var(--agds-font-family-heading)',
  mono:    'var(--agds-font-family-mono)',
}

const sizeMap: Record<TextSize, string> = {
  'xs':  'var(--agds-font-size-xs)',
  'sm':  'var(--agds-font-size-sm)',
  'md':  'var(--agds-font-size-md)',
  'lg':  'var(--agds-font-size-lg)',
  'xl':  'var(--agds-font-size-xl)',
  '2xl': 'var(--agds-font-size-2xl)',
  '3xl': 'var(--agds-font-size-3xl)',
  '4xl': 'var(--agds-font-size-4xl)',
}

const weightMap: Record<TextWeight, string> = {
  normal:   'var(--agds-font-weight-normal)',
  medium:   'var(--agds-font-weight-medium)',
  semibold: 'var(--agds-font-weight-semibold)',
  bold:     'var(--agds-font-weight-bold)',
}

const leadingMap: Record<TextLeading, string> = {
  tight:   'var(--agds-line-height-tight)',
  snug:    'var(--agds-line-height-snug)',
  normal:  'var(--agds-line-height-normal)',
  relaxed: 'var(--agds-line-height-relaxed)',
}

const style = computed(() => ({
  color:      colorMap[props.color],
  fontFamily: familyMap[props.fontFamily],
  fontSize:   sizeMap[props.fontSize],
  fontWeight: weightMap[props.fontWeight],
  lineHeight: leadingMap[props.lineHeight],
}))
</script>

<template>
  <component :is="props.as" class="agds-text" :style="style">
    <slot />
  </component>
</template>

<style scoped>
.agds-text {
  margin: 0;
}
</style>
