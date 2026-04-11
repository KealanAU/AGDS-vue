<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { LIST_DEPTH_KEY } from './listContext'

/**
 * Renders a disc-bulleted unordered list (`<ul>`).
 * Use `AGDSListItem` for each item. Nest another `AGDSUnorderedList` inside an `AGDSListItem` for sub-lists.
 */
export interface AGDSUnorderedListProps {}

const currentDepth = inject(LIST_DEPTH_KEY, 0)
const depth = currentDepth + 1
provide(LIST_DEPTH_KEY, depth)

const nested = computed(() => depth > 1)
</script>

<template>
  <ul class="agds-unordered-list" :class="{ 'agds-list--nested': nested }">
    <slot />
  </ul>
</template>

<style scoped>
.agds-unordered-list {
  list-style: disc;
  margin-bottom: 0;
  padding-left: var(--agds-space-6);
}

.agds-list--nested {
  margin-top: var(--agds-space-2);
}
</style>
