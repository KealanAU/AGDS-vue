<script setup lang="ts">
import AgDSLinkListItem from './AGDSLinkListItem.vue'
import type { AgDSLinkListItemProps } from './AGDSLinkListItem.vue'

export type LinkListLink = Omit<AgDSLinkListItemProps, 'label'> & { label: string }

export interface AgDSLinkListProps {
  /** Array of link entries to render */
  links: LinkListLink[]
  /** Lay links out in a horizontal row instead of a vertical column */
  horizontal?: boolean
}

withDefaults(defineProps<AgDSLinkListProps>(), {
  horizontal: false,
})
</script>

<template>
  <ul
    class="agds-link-list"
    :class="horizontal ? 'agds-link-list--horizontal' : 'agds-link-list--vertical'"
  >
    <AgDSLinkListItem
      v-for="(link, index) in links"
      :key="index"
      v-bind="link"
    />
  </ul>
</template>

<style scoped>
.agds-link-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.agds-link-list--vertical {
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-link-list--horizontal {
  flex-direction: row;
  gap: var(--agds-space-2);
}
</style>
