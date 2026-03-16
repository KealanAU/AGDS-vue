<script setup lang="ts">
import type { Component } from 'vue'
import AgDSFlex from '../flex/AGDSFlex.vue'

export interface AgDSFormStackProps {
  /** Element or component to render as. Defaults to 'div'. */
  as?: string | Component
}

withDefaults(defineProps<AgDSFormStackProps>(), {
  as: 'div',
})
</script>

<template>
  <!--
    Mirrors the React FormStack: a vertical flex column with a consistent gap
    between form controls. gap=2 → var(--agds-space-2) = 8px.
  -->
  <AgDSFlex :as="as" flex-direction="column" :gap="2">
    <slot />
  </AgDSFlex>
</template>
