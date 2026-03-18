<script setup lang="ts">
defineProps<{
  /** 'default' | 'sizes' | 'tones' */
  variant?: string
}>()
</script>

<template>
  <!-- default: single avatar, default size and tone -->
  <AgDSAvatar v-if="!variant || variant === 'default'" name="Jordan Lee" />

  <!-- sizes: all six sizes in a row -->
  <div v-else-if="variant === 'sizes'" style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
    <AgDSAvatar name="Alex Smith" size="sm" />
    <AgDSAvatar name="Alex Smith" size="md" />
    <AgDSAvatar name="Alex Smith" size="lg" />
    <AgDSAvatar name="Alex Smith" size="xl" />
    <AgDSAvatar name="Alex Smith" size="xxl" />
    <AgDSAvatar name="Alex Smith" size="xxxl" />
  </div>

  <!-- tones: neutral and action side by side -->
  <div v-else-if="variant === 'tones'" style="display: flex; align-items: center; gap: 1rem;">
    <AgDSAvatar name="Sam Taylor" tone="neutral" />
    <AgDSAvatar name="Sam Taylor" tone="action" />
  </div>
</template>
