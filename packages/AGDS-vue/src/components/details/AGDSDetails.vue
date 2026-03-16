<script setup lang="ts">
export interface AgDSDetailsProps {
  /** The label shown in the summary trigger. */
  label: string
  /** Shows an info icon before the label. */
  iconBefore?: boolean
  /** Set true when the component sits on a bodyAlt background. */
  onBodyAlt?: boolean
}

withDefaults(defineProps<AgDSDetailsProps>(), {
  iconBefore: false,
  onBodyAlt: false,
})
</script>

<template>
  <details class="agds-details">
    <!--
      `summary` uses `width: fit-content` to simulate an inline element.
      iOS VoiceOver does not correctly announce the expanded state of `summary`
      elements when they are displayed as block/inline-block — `fit-content`
      preserves the correct announcement while keeping the visual appearance.
      WCAG 2.1.1 Keyboard: native `<summary>` handles Enter/Space for free.
    -->
    <summary class="agds-details__summary">
      <!--
        InfoIcon: aria-hidden="false" + aria-label on the wrapping span so that
        the icon meaning is conveyed to AT but the SVG itself stays decorative.
        WCAG 1.1.1 Non-text Content (A).
      -->
      <span
        v-if="iconBefore"
        role="img"
        aria-label="Information."
        class="agds-details__icon-before"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class="agds-details__icon-svg"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>

      <span class="agds-details__label">{{ label }}</span>

      <!-- Chevron rotates 180° when the details element is open via CSS. -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
        class="agds-details__chevron"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </summary>

    <div
      class="agds-details__content"
      :class="{ 'agds-details__content--body-alt': onBodyAlt }"
    >
      <slot />
    </div>
  </details>
</template>

<style scoped>
/* ── Details element ─────────────────────────────────────── */

.agds-details {
  display: block;
}

/* ── Summary trigger ─────────────────────────────────────── */

.agds-details__summary {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-details-summary-gap);
  width: fit-content;

  padding-block: var(--agds-details-summary-padding-y);
  border-radius: var(--agds-radius-full);

  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-bold);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;

  cursor: pointer;
  list-style: none;
}

/* Remove the default disclosure triangle in all browsers. */
.agds-details__summary::marker,
.agds-details__summary::-webkit-details-marker {
  display: none;
}

/* Hover: darken text colour. */
.agds-details__summary:hover {
  color: var(--agds-color-action-primary-hover);
}

/* Active: darkest text colour. */
.agds-details__summary:active {
  color: var(--agds-color-action-primary-active);
}

/* Focus ring — keyboard navigation only (WCAG 2.4.7). */
.agds-details__summary:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  text-decoration: none;
}

/* ── Info icon ───────────────────────────────────────────── */

.agds-details__icon-before {
  display: inline-flex;
  flex-shrink: 0;
}

.agds-details__icon-svg {
  width: var(--agds-details-icon-size);
  height: var(--agds-details-icon-size);
}

/* ── Chevron ─────────────────────────────────────────────── */

.agds-details__chevron {
  width: var(--agds-details-chevron-size);
  height: var(--agds-details-chevron-size);
  flex-shrink: 0;
  transition: transform var(--agds-transition-normal);
  margin-left: var(--agds-details-chevron-gap);
}

/* Scale up on hover (matches scaleIconOnHover in the React original). */
.agds-details__summary:hover .agds-details__chevron {
  transform: scale(1.2);
}

/* Rotate when open. */
details[open] .agds-details__chevron {
  transform: rotate(180deg);
}

/* Combine rotate + scale when open + hover. */
details[open] .agds-details__summary:hover .agds-details__chevron {
  transform: rotate(180deg) scale(1.2);
}

/* ── Content body ────────────────────────────────────────── */

.agds-details__content {
  background-color: var(--agds-color-bg-subtle);
  border-left: var(--agds-details-border-left-width) solid var(--agds-color-border-brand);
  padding: var(--agds-details-content-padding);
  margin-top: var(--agds-details-content-margin-top);
}

.agds-details__content--body-alt {
  background-color: var(--agds-color-bg-muted);
}

/* Windows High Contrast: ensure the left border remains visible. */
@media (forced-colors: active) {
  .agds-details__content {
    outline: 2px solid ButtonText;
    outline-offset: -2px;
  }
}
</style>
