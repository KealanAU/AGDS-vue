<script setup lang="ts">
import { useSlots, computed } from 'vue'

export interface AgDSDividerProps {
  /**
   * Hides the <hr> element(s) from assistive technologies.
   * Default true — dividers are decorative separators.
   * Set false when the divider carries structural meaning (e.g. section boundary in a landmark).
   */
  ariaHidden?: boolean
  /**
   * Horizontal alignment of the label when text is provided via the default slot.
   * Has no effect when no slot content is present.
   */
  textAlign?: 'left' | 'center'
}

const props = withDefaults(defineProps<AgDSDividerProps>(), {
  ariaHidden: true,
  textAlign: 'center',
})

const slots = useSlots()

// Use the slot to toggle between plain <hr> and grid-with-text layouts.
const hasText = computed(() => !!slots.default)
</script>

<template>
  <!--
    With text: three-column CSS grid.
    Left column shrinks to minimum (1.5rem) when textAlign='left' so the
    text appears flush-left. In centre mode both side columns grow equally.
    Text wrapper is NOT aria-hidden so screen readers announce the label.
  -->
  <div
    v-if="hasText"
    class="agds-divider agds-divider--with-text"
    :class="`agds-divider--align-${props.textAlign}`"
    role="separator"
    :aria-hidden="props.ariaHidden ? 'true' : undefined"
  >
    <!-- Left line — decorative, always hidden from AT -->
    <hr class="agds-divider__line" aria-hidden="true" />

    <!--
      Text label — visible and accessible.
      The role="separator" on the wrapper is removed from AT when
      ariaHidden=true, so the text is only read when ariaHidden=false.
      Text colour is set to --agds-color-text-muted (foregroundMuted).
    -->
    <div class="agds-divider__text">
      <slot />
    </div>

    <!-- Right line — decorative, always hidden from AT -->
    <hr class="agds-divider__line" aria-hidden="true" />
  </div>

  <!--
    Plain divider: a single <hr>.
    WCAG 1.3.1: decorative separators should be hidden from AT (aria-hidden=true by default).
  -->
  <hr
    v-else
    class="agds-divider"
    :aria-hidden="props.ariaHidden ? 'true' : undefined"
  />
</template>

<style scoped>
/* ── Plain <hr> ──────────────────────────────────────────── */

.agds-divider {
  box-sizing: content-box;
  height: 0;
  margin: 0;
  overflow: visible;
  border: none;
  border-top: var(--agds-divider-border-width) solid var(--agds-divider-color);
  width: 100%;
}

/* ── With-text wrapper ───────────────────────────────────── */

.agds-divider--with-text {
  display: grid;
  align-items: center;
  gap: var(--agds-divider-gap);
  /* Default (center): both side columns grow equally. */
  grid-template-columns:
    minmax(var(--agds-divider-min-line-width), 1fr)
    fit-content(var(--agds-divider-max-text-width))
    minmax(var(--agds-divider-min-line-width), 1fr);
}

/* Left-aligned: pin the left line to its minimum width. */
.agds-divider--align-left {
  grid-template-columns:
    var(--agds-divider-min-line-width)
    fit-content(var(--agds-divider-max-text-width))
    minmax(var(--agds-divider-min-line-width), 1fr);
}

/* ── Inline line (inside grid) ───────────────────────────── */

.agds-divider__line {
  box-sizing: content-box;
  height: 0;
  margin: 0;
  overflow: visible;
  border: none;
  border-top: var(--agds-divider-border-width) solid var(--agds-divider-color);
  width: 100%;
}

/* ── Text label ──────────────────────────────────────────── */

.agds-divider__text {
  /* Force all direct children to use muted text and block display. */
}

/* Double specificity to override consumer styles (matches React's && > * pattern). */
.agds-divider__text.agds-divider__text > * {
  color: var(--agds-color-text-muted);
  display: block;
}

.agds-divider--align-center .agds-divider__text.agds-divider__text > * {
  text-align: center;
}

.agds-divider--align-left .agds-divider__text.agds-divider__text > * {
  text-align: left;
}
</style>
