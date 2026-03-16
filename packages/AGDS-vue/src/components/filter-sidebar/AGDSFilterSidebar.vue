<script setup lang="ts">
import { computed } from 'vue'
import AgDSCollapsingSideBar from '../collapsing-side-bar/AGDSCollapsingSideBar.vue'
import type { CollapsingSideBarBackground } from '../collapsing-side-bar/AGDSCollapsingSideBar.vue'

export interface AgDSFilterSidebarProps {
  /** Number of currently active filters. When > 0, appended to the title and aria-label. */
  activeFiltersCount?: number
  /**
   * Set to 'bodyAlt' when the sidebar sits on a bodyAlt background.
   * Passed through to the inner CollapsingSideBar.
   */
  background?: CollapsingSideBarBackground
  /** When true, renders a "Clear filters" button at the bottom of the body. */
  showClearFilters?: boolean
}

const props = withDefaults(defineProps<AgDSFilterSidebarProps>(), {
  activeFiltersCount: 0,
  background: 'body',
  showClearFilters: false,
})

const emit = defineEmits<{
  /** Emitted when the user clicks the "Clear filters" button. */
  clearFilters: []
}>()

/** Visible title: "Filters" or "Filters (3)" */
const title = computed(() =>
  props.activeFiltersCount ? `Filters (${props.activeFiltersCount})` : 'Filters',
)

/**
 * Screen reader label: "Filters" or "Filters (3 active)".
 * More descriptive than the visible label so AT users understand the count is a filter count.
 */
const ariaLabel = computed(() =>
  props.activeFiltersCount
    ? `Filters (${props.activeFiltersCount} active)`
    : 'Filters',
)
</script>

<template>
  <AgDSCollapsingSideBar
    :title="title"
    :aria-label="ariaLabel"
    :background="props.background"
    as="section"
  >
    <div class="agds-filter-sidebar__body">
      <!-- Filter controls provided by the consumer -->
      <slot />

      <!--
        Clear filters button.
        Rendered only when showClearFilters is true.
        Uses a plain <button> styled as a text link (no external dependency).
        WCAG 2.1.1 – keyboard operable via Enter/Space.
        WCAG 4.1.2 – button role + accessible name from text content.
      -->
      <template v-if="props.showClearFilters">
        <hr class="agds-filter-sidebar__divider" aria-hidden="true" />
        <button
          type="button"
          class="agds-filter-sidebar__clear-btn"
          @click="emit('clearFilters')"
        >
          Clear filters
        </button>
      </template>
    </div>
  </AgDSCollapsingSideBar>
</template>

<style scoped>
/* ── Filter body ─────────────────────────────────────────── */

.agds-filter-sidebar__body {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-4);
  /* Mobile: shaded background + horizontal padding */
  padding: var(--agds-space-3) var(--agds-space-4) var(--agds-space-4);
  background-color: var(--agds-color-bg-subtle);
}

@media (min-width: 768px) {
  .agds-filter-sidebar__body {
    /* Desktop: transparent background, no horizontal padding */
    padding: var(--agds-space-4) 0;
    background-color: transparent;
    border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  }
}

/* ── Divider above clear button ──────────────────────────── */

.agds-filter-sidebar__divider {
  border: none;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  margin: 0;
}

/* ── Clear filters button ────────────────────────────────── */

.agds-filter-sidebar__clear-btn {
  align-self: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-align: left;
}

.agds-filter-sidebar__clear-btn:hover {
  color: var(--agds-color-action-primary-hover);
}

/* WCAG 2.4.7 – keyboard-only focus ring */
.agds-filter-sidebar__clear-btn:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
  text-decoration: none;
}

@media (min-width: 768px) {
  .agds-filter-sidebar__clear-btn {
    align-self: flex-start;
  }
}
</style>
