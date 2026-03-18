<script setup lang="ts">
import { computed } from 'vue'
import type { StatusBadgeTone, StatusBadgeAppearance } from './statusBadgeUtils'
import { statusBadgeToneMap, getTone } from './statusBadgeUtils'

export type { StatusBadgeTone, StatusBadgeTones, StatusBadgeAppearance, StatusBadgeLegacyTone } from './statusBadgeUtils'

// ── Props ─────────────────────────────────────────────────────────────────────

export interface AGDSStatusBadgeProps {
  /** The text label displayed in the badge. */
  label: string
  /**
   * Determines the colour, icon, and screen-reader announcement.
   * @default 'infoHigh'
   */
  tone?: StatusBadgeTone
  /**
   * The visual appearance of the badge.
   * - `regular` — pill with background, border, height, and padding.
   * - `subtle`  — icon + label only, no border or background.
   */
  appearance?: StatusBadgeAppearance
  /**
   * @deprecated Use `appearance` instead.
   */
  weight?: StatusBadgeAppearance
}

const props = withDefaults(defineProps<AGDSStatusBadgeProps>(), {
  tone: 'infoHigh',
  weight: 'regular',
})

// ── Derived state ─────────────────────────────────────────────────────────────

const resolvedTone   = computed(() => getTone(props.tone))
const toneConfig     = computed(() => statusBadgeToneMap[resolvedTone.value])

// `appearance` takes precedence over the deprecated `weight`.
const resolvedAppearance = computed<StatusBadgeAppearance>(
  () => props.appearance ?? props.weight ?? 'regular',
)

const badgeStyle = computed(() => ({
  '--sb-border-color': toneConfig.value.borderColor,
  '--sb-icon-color':   toneConfig.value.iconColor,
}))
</script>

<template>
  <!--
    Rendered as a <span> so it can sit inline within text or a <td> without
    introducing a block-level element. WCAG 1.3.1: native semantics preserved.

    The icon carries its own accessible label via aria-label ("Status: {label}.")
    so sighted and screen-reader users both get the same information.
    WCAG 1.1.1: icon is meaningful — aria-hidden="false" + aria-label convey tone.
    WCAG 1.3.3: tone is never colour-only — the icon shape + label text also differ.
  -->
  <span
    :class="[
      'agds-status-badge',
      `agds-status-badge--${resolvedAppearance}`,
    ]"
    :style="badgeStyle"
  >
    <!--
      Filled icon: fill="currentColor" + fill-rule/clip-rule on the path.
      Used for High-emphasis tones (errorHigh, infoHigh, successHigh, warningHigh).
    -->
    <svg
      v-if="toneConfig.iconVariant === 'filled'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
      aria-hidden="false"
      :aria-label="`Status: ${toneConfig.iconLabel}.`"
      class="agds-status-badge__icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        :d="toneConfig.iconPath!"
      />
    </svg>

    <!--
      Outline icon: stroke="currentColor", no fill.
      Used for Low/Medium-emphasis tones.
    -->
    <svg
      v-else-if="toneConfig.iconVariant === 'outline'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      aria-hidden="false"
      :aria-label="`Status: ${toneConfig.iconLabel}.`"
      class="agds-status-badge__icon"
    >
      <path :d="toneConfig.iconPath!" />
    </svg>

    <!--
      Dot icon: small filled circle, used only for the deprecated 'neutral' legacy tone.
      Replicates the React AGDS neutral StatusBadge dot visual.
    -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
      aria-hidden="false"
      :aria-label="`Status: ${toneConfig.iconLabel}.`"
      class="agds-status-badge__icon"
    >
      <circle cx="12" cy="12" r="4" />
    </svg>

    <span class="agds-status-badge__label">{{ label }}</span>
  </span>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────────────────── */

.agds-status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  border-radius: var(--agds-radius-full);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
  white-space: nowrap;
  /*
    Prevents descender whitespace when used inline alongside text.
    Mirrors the React implementation's verticalAlign: 'bottom'.
  */
  vertical-align: bottom;
  /*
    Transparent border present on both variants so the layout does not
    shift when toggling between regular and subtle.
  */
  border: 1px solid transparent;
}

/* ── Appearances ─────────────────────────────────────────────────────── */

/*
  Regular: pill with background, coloured border, fixed height, and padding.
  Mirrors React's regularAppearanceStyleProps.
*/
.agds-status-badge--regular {
  background-color: var(--agds-color-bg);
  border-color: var(--sb-border-color);
  height: var(--agds-space-8);        /* 2rem / 32px */
  padding-inline: var(--agds-space-3); /* 0.75rem / 12px */
}

/* Subtle: no border, no background — just icon + label. */
.agds-status-badge--subtle {
  border-color: transparent;
  background-color: transparent;
}

/* ── Icon ────────────────────────────────────────────────────────────── */

.agds-status-badge__icon {
  flex-shrink: 0;
  width: 1.375rem;  /* 22px — matches AGDS React iconSize */
  height: 1.375rem;
  color: var(--sb-icon-color);
}

/* ── Label ───────────────────────────────────────────────────────────── */

.agds-status-badge__label {
  color: var(--agds-color-text);
}

/* ── Windows High Contrast Mode ──────────────────────────────────────── */

@media (forced-colors: active) {
  .agds-status-badge--regular {
    border-color: ButtonText;
  }

  .agds-status-badge__icon {
    forced-color-adjust: none;
    color: ButtonText;
  }
}
</style>
