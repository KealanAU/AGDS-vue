<script setup lang="ts">
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as FeatureLinkListBackground }

export interface AgDSFeatureLinkListItemProps {
  /** URL the item navigates to */
  href: string
  /** Visible label text (bold) */
  label: string
  /** Optional secondary / description text shown below the label */
  secondaryText?: string
  /** Opens in a new tab. Appends accessible offscreen text. */
  external?: boolean
  /** Background context — controls the hover shade */
  background?: BackgroundVariant
}

withDefaults(defineProps<AgDSFeatureLinkListItemProps>(), {
  external: false,
  background: 'body',
})
</script>

<template>
  <li
    class="agds-feature-link-list-item"
    :class="`agds-feature-link-list-item--bg-${background}`"
  >
    <a
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener noreferrer' : undefined"
      class="agds-feature-link-list-item__link"
    >
      <span class="agds-feature-link-list-item__text">
        <span class="agds-feature-link-list-item__label">{{ label }}</span>
        <span
          v-if="secondaryText"
          class="agds-feature-link-list-item__secondary"
        >{{ secondaryText }}</span>
      </span>

      <!-- Chevron right icon (decorative — label provides the name) -->
      <svg
        class="agds-feature-link-list-item__chevron"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>

      <span v-if="external" class="sr-only">, opens in a new tab</span>
    </a>
  </li>
</template>

<style scoped>
/* ── Item wrapper ─────────────────────────────────────────── */

.agds-feature-link-list-item {
  list-style: none;
  border-bottom: var(--agds-feature-link-list-border-width) solid
    var(--agds-feature-link-list-border-color);
}

/* ── Link ─────────────────────────────────────────────────── */

.agds-feature-link-list-item__link {
  display: flex;
  align-items: center;
  gap: var(--agds-space-4);
  padding-block: var(--agds-feature-link-list-padding-y);
  color: var(--agds-color-text);
  text-decoration: none;
  transition: background-color var(--agds-transition-fast);
}

/* Hover: shade varies by background context */
.agds-feature-link-list-item--bg-body .agds-feature-link-list-item__link:hover {
  background-color: var(--agds-feature-link-list-hover-body);
}

.agds-feature-link-list-item--bg-bodyAlt .agds-feature-link-list-item__link:hover {
  background-color: var(--agds-feature-link-list-hover-body-alt);
}

/* ── Focus ────────────────────────────────────────────────── */

.agds-feature-link-list-item__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Text stack ──────────────────────────────────────────── */

.agds-feature-link-list-item__text {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
  flex: 1 1 auto;
  min-width: 0; /* allow text to shrink/truncate inside flex */
}

.agds-feature-link-list-item__label {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-feature-link-list-label-size);
  font-weight: var(--agds-feature-link-list-label-weight);
  line-height: var(--agds-line-height-snug);
  color: var(--agds-color-action-primary);
}

.agds-feature-link-list-item__secondary {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-normal);
  line-height: var(--agds-line-height-normal);
  color: var(--agds-color-text-muted);
}

/* ── Chevron ─────────────────────────────────────────────── */

.agds-feature-link-list-item__chevron {
  flex-shrink: 0;
  width: var(--agds-feature-link-list-chevron-size);
  height: var(--agds-feature-link-list-chevron-size);
  color: var(--agds-color-action-primary);
}

/* ── Utilities ───────────────────────────────────────────── */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
