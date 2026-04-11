<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { LIST_DEPTH_KEY } from './listContext'

/**
 * Renders a numbered ordered list (`<ol>`).
 * Use `AGDSListItem` for each item. Nest another `AGDSOrderedList` inside an `AGDSListItem` for sub-lists.
 */
export interface AGDSOrderedListProps {}

const currentDepth = inject(LIST_DEPTH_KEY, 0)
const depth = currentDepth + 1
provide(LIST_DEPTH_KEY, depth)

const nested = computed(() => depth > 1)
</script>

<template>
  <ol class="agds-ordered-list" :class="{ 'agds-list--nested': nested }">
    <slot />
  </ol>
</template>

<style scoped>
.agds-ordered-list {
  list-style: decimal;
  margin-bottom: 0;
  padding-left: var(--agds-space-6);
}

.agds-list--nested {
  margin-top: var(--agds-space-2);
}
</style>
