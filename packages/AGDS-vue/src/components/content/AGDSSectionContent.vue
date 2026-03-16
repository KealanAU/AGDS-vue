<script setup lang="ts">
import AgDSBaseContent from './AGDSBaseContent.vue'

export interface AgDSSectionContentProps {
  /** HTML element to render as. Defaults to `'section'`. */
  as?: string
  /** Background colour of the section band. */
  background?: 'body' | 'bodyAlt'
  /** Maximum width of the inner container. */
  maxWidth?: 'container' | 'containerLg'
  /** HTML id placed on the outer wrapper. */
  id?: string
}

const props = withDefaults(defineProps<AgDSSectionContentProps>(), {
  as: 'section',
  maxWidth: 'container',
})
</script>

<template>
  <AgDSBaseContent
    :as="props.as"
    :background="props.background"
    :max-width="props.maxWidth"
    :id="props.id"
    padding-y="section"
  >
    <slot />
  </AgDSBaseContent>
</template>
