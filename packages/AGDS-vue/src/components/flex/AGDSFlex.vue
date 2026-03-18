<script setup lang="ts">
import { computed } from 'vue'
import AGDSBox from '../box/AGDSBox.vue'
import type {
  AGDSBoxProps,
  BoxAlignItems,
  BoxFlexDirection,
  BoxJustifyContent,
} from '../box/AGDSBox.vue'

export interface AGDSFlexProps extends AGDSBoxProps {
  /** Render as `inline-flex` instead of `flex` */
  inline?: boolean
}

const props = withDefaults(defineProps<AGDSFlexProps>(), {
  flexDirection: 'row' as BoxFlexDirection,
  justifyContent: 'flex-start' as BoxJustifyContent,
  alignItems: 'stretch' as BoxAlignItems,
  inline: false,
})

/**
 * Forward all props to Box, but swap `inline` for the correct `display` value
 * and omit `inline` itself (Box doesn't know about it).
 */
const boxProps = computed<AGDSBoxProps>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inline, display, ...rest } = props
  return {
    ...rest,
    display: display ?? (inline ? 'inline-flex' : 'flex'),
  }
})
</script>

<template>
  <AGDSBox v-bind="boxProps">
    <slot />
  </AGDSBox>
</template>
