<script setup lang="ts">
export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface AGDSHeadingProps {
  /** The heading level — controls both the rendered element and default font size. */
  type?: HeadingType
  /**
   * Override the rendered HTML element while keeping the font size of `type`.
   * Useful for visual-only level changes (e.g. render an h2 visually but keep DOM h3).
   */
  as?: HeadingType
}

const props = withDefaults(defineProps<AGDSHeadingProps>(), {
  type: 'h2',
})

// Maps heading level → CSS custom-property that controls font size.
// Mirrors the scale from the React headingFontSizeMap.
const fontSizeMap: Record<HeadingType, string> = {
  h1: 'var(--agds-font-size-4xl)',
  h2: 'var(--agds-font-size-3xl)',
  h3: 'var(--agds-font-size-2xl)',
  h4: 'var(--agds-font-size-xl)',
  h5: 'var(--agds-font-size-lg)',
  h6: 'var(--agds-font-size-md)',
}

// `as` overrides the rendered tag; `type` is the fallback and drives font size.
const tag = props.as ?? props.type
const fontSize = fontSizeMap[props.type]
</script>

<template>
  <component
    :is="tag"
    class="agds-heading"
    :class="`agds-heading--${props.type}`"
    :style="{ fontSize }"
  >
    <slot />
  </component>
</template>

<style scoped>
.agds-heading {
  font-family: var(--agds-font-family-heading);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
  margin: 0;
}
</style>
