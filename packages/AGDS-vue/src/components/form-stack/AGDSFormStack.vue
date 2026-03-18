<script setup lang="ts">
import type { Component } from 'vue'
import AGDSFlex from '../flex/AGDSFlex.vue'

export interface AGDSFormStackProps {
  /** Element or component to render as. Defaults to 'div'. */
  as?: string | Component
}

withDefaults(defineProps<AGDSFormStackProps>(), {
  as: 'div',
})
</script>

<template>
  <!--
    Mirrors the React FormStack: a vertical flex column with a consistent gap
    between form controls. gap=2 → var(--agds-space-2) = 8px.
  -->
  <AGDSFlex :as="as" flex-direction="column" :gap="2">
    <slot />
  </AGDSFlex>
</template>
