<script setup lang="ts">
import { inject, computed } from 'vue'
import { CONTENT_SPACING_KEY } from './contentContext'

export type ContentBleedVisible = boolean | { xs?: boolean; md?: boolean }

export interface AgDSContentBleedProps {
  /**
   * Controls whether this element bleeds to the edges of its parent content band.
   * Pass `false` to disable bleed, or a `{ xs, md }` object for responsive control.
   * Defaults to `true` (always bleeds).
   */
  visible?: ContentBleedVisible
}

const props = withDefaults(defineProps<AgDSContentBleedProps>(), {})

const spacing = inject(CONTENT_SPACING_KEY, 'none')

const classes = computed(() => {
  const cls: string[] = ['agds-content-bleed']

  if (spacing !== 'none') {
    cls.push(`agds-content-bleed--${spacing}`)
  }

  const v = props.visible
  if (v === false) {
    cls.push('agds-content-bleed--no-bleed')
  } else if (v !== null && v !== undefined && typeof v === 'object') {
    if (v.xs === false) cls.push('agds-content-bleed--no-bleed-xs')
    if (v.md === false) cls.push('agds-content-bleed--no-bleed-md')
  }

  return cls
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style scoped>
/* ── Base: no bleed by default ──────────────────────────── */

.agds-content-bleed {
  /* Intentionally empty — bleed classes add negative margins */
}

/* ── Section bleed ──────────────────────────────────────── */

.agds-content-bleed--section {
  margin-top: calc(-1 * var(--agds-section-content-padding-y));
  margin-left: calc(-1 * var(--agds-content-padding-x));
  margin-right: calc(-1 * var(--agds-content-padding-x));
}

@media (min-width: 768px) {
  .agds-content-bleed--section {
    margin-top: calc(-1 * var(--agds-section-content-padding-y-md));
    margin-left: calc(-1 * var(--agds-content-padding-x-md));
    margin-right: calc(-1 * var(--agds-content-padding-x-md));
  }
}

/* ── Page bleed ─────────────────────────────────────────── */

.agds-content-bleed--page {
  margin-top: calc(-1 * var(--agds-page-content-padding-top));
  margin-left: calc(-1 * var(--agds-content-padding-x));
  margin-right: calc(-1 * var(--agds-content-padding-x));
}

@media (min-width: 768px) {
  .agds-content-bleed--page {
    margin-top: calc(-1 * var(--agds-page-content-padding-top-md));
    margin-left: calc(-1 * var(--agds-content-padding-x-md));
    margin-right: calc(-1 * var(--agds-content-padding-x-md));
  }
}

/* ── visible=false: disable all bleed ───────────────────── */

.agds-content-bleed--no-bleed {
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* ── visible.xs=false: disable bleed on mobile only ─────── */

@media (max-width: 767px) {
  .agds-content-bleed--no-bleed-xs {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }
}

/* ── visible.md=false: disable bleed on desktop only ─────── */

@media (min-width: 768px) {
  .agds-content-bleed--no-bleed-md {
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
