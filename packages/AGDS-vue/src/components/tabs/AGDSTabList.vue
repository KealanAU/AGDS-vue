<script setup lang="ts">
import { TabsList } from 'reka-ui'

export interface AgDSTabListProps {
  /**
   * Accessible label for the tab list.
   * Required when there is no visible heading that labels the tab group.
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<AgDSTabListProps>(), {
  ariaLabel: undefined,
})
</script>

<template>
  <TabsList
    :aria-label="props.ariaLabel"
    class="agds-tab-list"
  >
    <slot />
  </TabsList>
</template>

<style scoped>
/* ── Tab list container ───────────────────────────────── */

.agds-tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

/* Mobile: stack vertically */
@media (max-width: 767px) {
  .agds-tab-list {
    flex-direction: column;
  }
}

/* Desktop: horizontal row with gap between tabs */
@media (min-width: 768px) {
  .agds-tab-list {
    flex-direction: row;
    align-items: flex-end;
    gap: var(--agds-space-2);
  }
}
</style>
