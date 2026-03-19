<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'checked' | 'disabled' | 'invalid' | 'size' */
  variant?: string
}>()

const enabled = ref(false)
</script>

<template>
  <!-- default -->
  <AGDSSwitch v-if="!variant || variant === 'default'" v-model="enabled">Enable notifications</AGDSSwitch>

  <!-- checked -->
  <AGDSSwitch v-else-if="variant === 'checked'" :model-value="true">Dark mode</AGDSSwitch>

  <!-- disabled -->
  <div v-else-if="variant === 'disabled'" style="display: flex; flex-direction: column; gap: 1rem">
    <AGDSSwitch disabled>Disabled off</AGDSSwitch>
    <AGDSSwitch :model-value="true" disabled>Disabled on</AGDSSwitch>
  </div>

  <!-- invalid -->
  <AGDSSwitch v-else-if="variant === 'invalid'" :invalid="true">I accept the terms and conditions</AGDSSwitch>

  <!-- size -->
  <div v-else-if="variant === 'size'" style="display: flex; flex-direction: column; gap: 1rem">
    <AGDSSwitch size="sm">Small</AGDSSwitch>
    <AGDSSwitch size="md">Medium (default)</AGDSSwitch>
  </div>
</template>
