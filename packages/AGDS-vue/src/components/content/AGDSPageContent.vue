<script setup lang="ts">
import AGDSBaseContent from './AGDSBaseContent.vue'

export interface AGDSPageContentProps {
  /** HTML element to render as. Defaults to `'div'`. */
  as?: string
  /** Background colour of the page content band. */
  background?: 'body' | 'bodyAlt'
  /** Maximum width of the inner container. */
  maxWidth?: 'container' | 'containerLg'
  /** HTML id placed on the outer wrapper. */
  id?: string
}

const props = withDefaults(defineProps<AGDSPageContentProps>(), {
  as: 'div',
  maxWidth: 'container',
})
</script>

<template>
  <AGDSBaseContent
    :as="props.as"
    :background="props.background"
    :max-width="props.maxWidth"
    :id="props.id"
    padding-y="page"
  >
    <slot />
  </AGDSBaseContent>
</template>
