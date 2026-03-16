<script setup lang="ts">
import { TabsTrigger } from 'reka-ui'

export interface AgDSTabProps {
  /** Value identifying this tab — must match the corresponding AgDSTabPanel value. */
  value: string
  /** Prevents the tab from being selected. */
  disabled?: boolean
}

const props = withDefaults(defineProps<AgDSTabProps>(), {
  disabled: false,
})
</script>

<template>
  <TabsTrigger
    :value="props.value"
    :disabled="props.disabled"
    class="agds-tab"
  >
    <span class="agds-tab__label">
      <slot />
    </span>
    <slot name="end-element" />
  </TabsTrigger>
</template>

<style scoped>
/* ── Tab button ───────────────────────────────────────── */

.agds-tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-2);
  padding: var(--agds-space-3) var(--agds-space-6);

  background: var(--agds-tabs-button-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-bottom-width: 0;
  cursor: pointer;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
  text-align: left;
  white-space: nowrap;

  transition: background-color var(--agds-transition-fast);
}

/* Label — underlined link style when not selected */
.agds-tab:not([data-state='active']) .agds-tab__label {
  text-decoration: underline;
  color: var(--agds-tabs-button-fg);
}

/* Hover — inactive, not disabled */
.agds-tab:not([data-state='active']):not([data-disabled]):hover {
  background-color: var(--agds-tabs-button-bg-hover);
}

.agds-tab:not([data-state='active']):not([data-disabled]):hover .agds-tab__label {
  text-decoration: none;
  color: var(--agds-tabs-button-fg-hover);
}

/* Selected state */
.agds-tab[data-state='active'] {
  background: var(--agds-tabs-panel-bg);
}

.agds-tab[data-state='active'] .agds-tab__label {
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
}

/* Disabled */
.agds-tab[data-disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus ring — keyboard only (WCAG 2.4.7) */
.agds-tab:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
  z-index: 1;
}

/* ── Mobile: vertical stack ───────────────────────────── */

@media (max-width: 767px) {
  .agds-tab {
    border-width: var(--agds-border-width-sm);
    border-bottom-width: 0;
  }

  .agds-tab:first-of-type {
    overflow: hidden;
    border-radius: var(--agds-radius-md) var(--agds-radius-md) 0 0;
  }

  .agds-tab:last-of-type {
    border-bottom-width: var(--agds-border-width-sm);
  }

  /* Left-side colour bar */
  .agds-tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background: var(--agds-color-border);
  }

  /* Active: wider, brand-coloured bar */
  .agds-tab[data-state='active']::before {
    width: 4px;
    background: var(--agds-color-brand);
  }
}

/* ── Desktop: horizontal row ──────────────────────────── */

@media (min-width: 768px) {
  .agds-tab {
    border-radius: var(--agds-radius-md) var(--agds-radius-md) 0 0;
  }

  /* Active: top colour bar */
  .agds-tab[data-state='active']::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--agds-color-brand);
  }

  /* Active: cover the bottom border to visually merge with panel */
  .agds-tab[data-state='active']::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--agds-tabs-panel-bg);
  }
}
</style>
