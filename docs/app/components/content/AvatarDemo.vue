<script setup lang="ts">
defineProps<{
  /** 'default' | 'sizes' | 'tones' */
  variant?: string
}>()
</script>

<template>
  <!-- default: single avatar, default size and tone -->
  <AGDSAvatar v-if="!variant || variant === 'default'" name="Jordan Lee" />

  <!-- sizes: all six sizes in a row -->
  <div
    v-else-if="variant === 'sizes'"
    style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap"
  >
    <AGDSAvatar name="Alex Smith" size="sm" />
    <AGDSAvatar name="Alex Smith" size="md" />
    <AGDSAvatar name="Alex Smith" size="lg" />
    <AGDSAvatar name="Alex Smith" size="xl" />
    <AGDSAvatar name="Alex Smith" size="xxl" />
    <AGDSAvatar name="Alex Smith" size="xxxl" />
  </div>

  <!-- tones: neutral and action side by side -->
  <div v-else-if="variant === 'tones'" style="display: flex; align-items: center; gap: 1rem">
    <AGDSAvatar name="Sam Taylor" tone="neutral" />
    <AGDSAvatar name="Sam Taylor" tone="action" />
  </div>
</template>
