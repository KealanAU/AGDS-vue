<script setup lang="ts">
import { computed } from 'vue'
import AgDSBox from '../box/AGDSBox.vue'
import type {
  AgDSBoxProps,
  BoxAlignItems,
  BoxFlexDirection,
  BoxJustifyContent,
} from '../box/AGDSBox.vue'

export interface AgDSFlexProps extends AgDSBoxProps {
  /** Render as `inline-flex` instead of `flex` */
  inline?: boolean
}

const props = withDefaults(defineProps<AgDSFlexProps>(), {
  flexDirection: 'row' as BoxFlexDirection,
  justifyContent: 'flex-start' as BoxJustifyContent,
  alignItems: 'stretch' as BoxAlignItems,
  inline: false,
})

/**
 * Forward all props to Box, but swap `inline` for the correct `display` value
 * and omit `inline` itself (Box doesn't know about it).
 */
const boxProps = computed<AgDSBoxProps>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inline, display, ...rest } = props
  return {
    ...rest,
    display: display ?? (inline ? 'inline-flex' : 'flex'),
  }
})
</script>

<template>
  <AgDSBox v-bind="boxProps">
    <slot />
  </AgDSBox>
</template>
