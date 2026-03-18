<script setup lang="ts">
import { computed } from 'vue'

export type BadgeTone = 'neutral' | 'action'

export interface AGDSNotificationBadgeProps {
  /** The number to display inside the badge. */
  value: number
  /** When value exceeds this, display "{max}+" instead. */
  max?: number
  /** Colour tone: neutral (muted) or action (brand). */
  tone: BadgeTone
}

const props = defineProps<AGDSNotificationBadgeProps>()

const label = computed(() =>
  props.max === undefined || props.value <= props.max
    ? String(props.value)
    : `${props.max}+`,
)
</script>

<template>
  <!--
    WCAG 4.1.2: <span> with text conveys the count to AT.
    When used decoratively (e.g. alongside a visible nav label),
    callers should pass aria-hidden="true" via attr passthrough.
    WCAG 1.3.3: count is not conveyed by colour alone — the number is readable.
  -->
  <span class="agds-badge" :class="`agds-badge--${tone}`">{{ label }}</span>
</template>

<style scoped>
.agds-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--agds-badge-min-width);
  height: var(--agds-badge-height);
  padding-inline: var(--agds-badge-padding-x);
  border-radius: var(--agds-radius-full);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-badge-font-size);
  font-weight: var(--agds-font-weight-semibold);
  line-height: 1;
  color: var(--agds-color-text-inverse);

  /* Prevent the badge from shrinking inside flex nav items. */
  flex-shrink: 0;
}

/* ── Tone variants ─────────────────────────────────────────── */

/* WCAG 1.4.3: neutral — white (#fff) on #6e6e6e → 5.9:1 ✓ */
.agds-badge--neutral {
  background-color: var(--agds-color-text-muted);
}

/* WCAG 1.4.3: action — white (#fff) on #00698f → 4.6:1 ✓ */
.agds-badge--action {
  background-color: var(--agds-color-action-primary);
}

/* Windows High Contrast Mode: keep colours legible. */
@media (forced-colors: active) {
  .agds-badge {
    forced-color-adjust: none;
    border: 1px solid ButtonText;
  }
}
</style>
