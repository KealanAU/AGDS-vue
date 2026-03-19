<script setup lang="ts">
defineProps<{
  /** 'default' | 'variants' | 'sizes' | 'disabled' | 'loading' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSButton v-if="!variant || variant === 'default'">Submit application</AGDSButton>

  <!-- variants -->
  <div v-else-if="variant === 'variants'" style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <AGDSButton variant="primary">Primary</AGDSButton>
    <AGDSButton variant="secondary">Secondary</AGDSButton>
    <AGDSButton variant="tertiary">Tertiary</AGDSButton>
  </div>

  <!-- sizes -->
  <div v-else-if="variant === 'sizes'" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <AGDSButton size="sm">Small</AGDSButton>
    <AGDSButton size="md">Medium</AGDSButton>
    <AGDSButton size="lg">Large</AGDSButton>
  </div>

  <!-- disabled -->
  <div v-else-if="variant === 'disabled'" style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <AGDSButton disabled>Can't click me</AGDSButton>
    <AGDSButton variant="secondary" disabled>Secondary</AGDSButton>
  </div>

  <!-- loading -->
  <div v-else-if="variant === 'loading'" style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <AGDSButton loading>Submitting…</AGDSButton>
    <AGDSButton variant="secondary" loading>Saving…</AGDSButton>
  </div>
</template>
