<script setup lang="ts">
defineProps<{
  /** 'default' | 'alignment' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSStack v-if="!variant || variant === 'default'" gap="3" class="demo-stack">
    <span class="demo-item">First</span>
    <span class="demo-item">Second</span>
    <span class="demo-item">Third</span>
  </AGDSStack>

  <!-- alignment -->
  <AGDSStack v-else-if="variant === 'alignment'" gap="2" align-items="center" class="demo-stack">
    <span class="demo-item">Short</span>
    <span class="demo-item">A longer item</span>
  </AGDSStack>
</template>

<style scoped>
.demo-stack {
  border: 2px dashed var(--agds-color-border);
  border-radius: 4px;
  padding: 0.75rem;
}

.demo-item {
  border: 1px solid var(--agds-color-border);
  border-radius: 4px;
  background: var(--agds-color-bg-shade);
  padding: 0.5rem 0.75rem;
}
</style>
