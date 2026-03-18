<script setup lang="ts">
import AGDSBaseContent from './AGDSBaseContent.vue'

export interface AGDSSectionContentProps {
  /** HTML element to render as. Defaults to `'section'`. */
  as?: string
  /** Background colour of the section band. */
  background?: 'body' | 'bodyAlt'
  /** Maximum width of the inner container. */
  maxWidth?: 'container' | 'containerLg'
  /** HTML id placed on the outer wrapper. */
  id?: string
}

const props = withDefaults(defineProps<AGDSSectionContentProps>(), {
  as: 'section',
  maxWidth: 'container',
})
</script>

<template>
  <AGDSBaseContent
    :as="props.as"
    :background="props.background"
    :max-width="props.maxWidth"
    :id="props.id"
    padding-y="section"
  >
    <slot />
  </AGDSBaseContent>
</template>
