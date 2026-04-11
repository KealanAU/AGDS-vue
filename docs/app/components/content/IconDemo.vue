<script setup lang="ts">
defineProps<{
  /** 'default' | 'sizes' | 'color' | 'meaningful' */
  variant?: string
}>()
</script>

<template>
  <!-- default: basic decorative icon -->
  <AGDSIcon v-if="!variant || variant === 'default'" name="heroicons:home" />

  <!-- sizes: named token sizes side by side -->
  <div
    v-else-if="variant === 'sizes'"
    style="display: flex; align-items: center; gap: 1rem"
  >
    <AGDSIcon name="heroicons:star" size="sm" />
    <AGDSIcon name="heroicons:star" size="md" />
    <AGDSIcon name="heroicons:star" size="lg" />
    <AGDSIcon name="heroicons:star" size="xl" />
  </div>

  <!-- color: icons with explicit color values -->
  <div
    v-else-if="variant === 'color'"
    style="display: flex; align-items: center; gap: 1rem"
  >
    <AGDSIcon name="heroicons:check-circle" color="#00698f" size="lg" />
    <AGDSIcon name="heroicons:exclamation-circle" color="#d60000" size="lg" />
  </div>

  <!-- meaningful: aria-label makes the icon accessible -->
  <AGDSIcon
    v-else-if="variant === 'meaningful'"
    name="heroicons:magnifying-glass"
    aria-label="Search"
  />
</template>
