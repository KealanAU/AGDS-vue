<script setup lang="ts">
import type { Component } from 'vue'
import AGDSFlex from '../flex/AGDSFlex.vue'
import type { AGDSFlexProps } from '../flex/AGDSFlex.vue'

export interface AGDSStackProps extends Omit<AGDSFlexProps, 'flexDirection' | 'inline'> {
  /** Element or component to render as. Defaults to 'div'. */
  as?: string | Component
}

const props = withDefaults(defineProps<AGDSStackProps>(), {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
})
</script>

<template>
  <!--
    Mirrors the React Stack: a vertical flex column.
    Equivalent to <AGDSFlex flex-direction="column" />.
  -->
  <AGDSFlex v-bind="props" flex-direction="column">
    <slot />
  </AGDSFlex>
</template>
