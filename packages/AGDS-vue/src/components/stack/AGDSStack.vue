<script setup lang="ts">
import type { Component } from 'vue'
import AgDSFlex from '../flex/AGDSFlex.vue'
import type { AgDSFlexProps } from '../flex/AGDSFlex.vue'

export interface AgDSStackProps extends Omit<AgDSFlexProps, 'flexDirection' | 'inline'> {
  /** Element or component to render as. Defaults to 'div'. */
  as?: string | Component
}

const props = withDefaults(defineProps<AgDSStackProps>(), {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
})
</script>

<template>
  <!--
    Mirrors the React Stack: a vertical flex column.
    Equivalent to <AgDSFlex flex-direction="column" />.
  -->
  <AgDSFlex v-bind="props" flex-direction="column">
    <slot />
  </AgDSFlex>
</template>
