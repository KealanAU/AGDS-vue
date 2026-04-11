<script setup lang="ts">
defineProps<{
  /** 'default' | 'sizes' | 'colors' */
  variant?: string
}>()
</script>

<template>
  <!-- default: basic text span -->
  <AGDSText v-if="!variant || variant === 'default'">Default text</AGDSText>

  <!-- sizes: all named font sizes -->
  <div v-else-if="variant === 'sizes'">
    <AGDSText as="p" font-size="xs">xs — Extra small</AGDSText>
    <AGDSText as="p" font-size="sm">sm — Small (default)</AGDSText>
    <AGDSText as="p" font-size="md">md — Medium</AGDSText>
    <AGDSText as="p" font-size="lg">lg — Large</AGDSText>
    <AGDSText as="p" font-size="xl">xl — Extra large</AGDSText>
  </div>

  <!-- colors: semantic color tokens -->
  <div v-else-if="variant === 'colors'">
    <AGDSText as="p" color="text">text — Primary text</AGDSText>
    <AGDSText as="p" color="muted">muted — Secondary / helper text</AGDSText>
    <AGDSText as="p" color="disabled">disabled — Disabled state</AGDSText>
  </div>
</template>
