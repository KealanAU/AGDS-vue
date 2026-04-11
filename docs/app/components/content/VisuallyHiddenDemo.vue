<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- icon-button -->
  <AGDSButton v-if="variant === 'icon-button'">
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="2"/></svg>
    <AGDSVisuallyHidden>Add item</AGDSVisuallyHidden>
  </AGDSButton>

  <!-- external-link -->
  <a v-else-if="variant === 'external-link'" href="https://example.com" target="_blank" rel="noopener noreferrer">
    Agriculture Design System
    <AGDSExternalLinkCallout />
  </a>
</template>
