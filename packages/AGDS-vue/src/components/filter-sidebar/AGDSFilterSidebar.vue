<script setup lang="ts">
import { computed, useSlots } from 'vue'
import AGDSCollapsingSideBar from '../collapsing-side-bar/AGDSCollapsingSideBar.vue'
import type { CollapsingSideBarBackground } from '../collapsing-side-bar/AGDSCollapsingSideBar.vue'

export interface AGDSFilterSidebarProps {
  /** Number of currently active filters. When > 0, appended to the title and aria-label. */
  activeFiltersCount?: number
  /**
   * Set to 'bodyAlt' when the sidebar sits on a bodyAlt background.
   * Passed through to the inner CollapsingSideBar.
   */
  background?: CollapsingSideBarBackground
}

const props = withDefaults(defineProps<AGDSFilterSidebarProps>(), {
  activeFiltersCount: 0,
  background: 'body',
})

const slots = useSlots()

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
  <AGDSCollapsingSideBar
    :title="title"
    :aria-label="ariaLabel"
    :background="props.background"
    as="section"
  >
    <div class="agds-filter-sidebar__body">
      <!-- Filter controls provided by the consumer -->
      <slot />

      <!--
        Optional actions region (e.g. a "Clear filters" button).
        A divider is rendered automatically when the slot has content.
      -->
      <template v-if="slots.actions">
        <hr class="agds-filter-sidebar__divider" aria-hidden="true" />
        <slot name="actions" />
      </template>
    </div>
  </AGDSCollapsingSideBar>
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

</style>
