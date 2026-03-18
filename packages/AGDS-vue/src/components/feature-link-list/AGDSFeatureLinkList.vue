<script setup lang="ts">
import AGDSFeatureLinkListItem from './AGDSFeatureLinkListItem.vue'
import type { AGDSFeatureLinkListItemProps, FeatureLinkListBackground } from './AGDSFeatureLinkListItem.vue'

// Each entry in `links` supplies all item props except `background`,
// which is set at the list level and forwarded to every item.
export type FeatureLinkListLink = Omit<AGDSFeatureLinkListItemProps, 'background'>

export interface AGDSFeatureLinkListProps {
  /** Array of link entries to render */
  links: FeatureLinkListLink[]
  /** Background context of the containing surface — controls item hover shade */
  background?: FeatureLinkListBackground
}

withDefaults(defineProps<AGDSFeatureLinkListProps>(), {
  background: 'body',
})
</script>

<template>
  <ul class="agds-feature-link-list">
    <AGDSFeatureLinkListItem
      v-for="(link, index) in links"
      :key="index"
      v-bind="link"
      :background="background"
    />
  </ul>
</template>

<style scoped>
.agds-feature-link-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: var(--agds-feature-link-list-border-width) solid
    var(--agds-feature-link-list-border-color);
}
</style>
