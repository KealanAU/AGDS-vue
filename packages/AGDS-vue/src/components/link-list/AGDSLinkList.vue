<script setup lang="ts">
import AGDSLinkListItem from './AGDSLinkListItem.vue'
import type { AGDSLinkListItemProps } from './AGDSLinkListItem.vue'

export type LinkListLink = Omit<AGDSLinkListItemProps, 'label'> & { label: string }

export interface AGDSLinkListProps {
  /** Array of link entries to render. If omitted, use the default slot with AGDSLinkListItem. */
  links?: LinkListLink[]
  /** Lay links out in a horizontal row instead of a vertical column */
  horizontal?: boolean
}

withDefaults(defineProps<AGDSLinkListProps>(), {
  horizontal: false,
})
</script>

<template>
  <ul
    class="agds-link-list"
    :class="horizontal ? 'agds-link-list--horizontal' : 'agds-link-list--vertical'"
  >
    <slot />
    <AGDSLinkListItem
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
