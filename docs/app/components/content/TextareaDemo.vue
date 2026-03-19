<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'hint' | 'optional' | 'invalid' | 'disabled' | 'rows' | 'max-widths' | 'block' */
  variant?: string
}>()

const value = ref('')
</script>

<template>
  <!-- default -->
  <AGDSTextarea v-if="!variant || variant === 'default'" v-model="value" label="Biography" required />

  <!-- hint -->
  <AGDSTextarea v-else-if="variant === 'hint'" v-model="value" label="Biography" hint="Max 500 characters" required />

  <!-- optional -->
  <AGDSTextarea v-else-if="variant === 'optional'" v-model="value" label="Additional comments" />

  <!-- invalid -->
  <AGDSTextarea
    v-else-if="variant === 'invalid'"
    v-model="value"
    label="Notes"
    :invalid="true"
    message="Notes cannot be empty"
    required
  />

  <!-- disabled -->
  <AGDSTextarea
    v-else-if="variant === 'disabled'"
    label="Biography"
    model-value="Some existing content"
    disabled
    required
  />

  <!-- rows -->
  <AGDSTextarea v-else-if="variant === 'rows'" v-model="value" label="Description" :rows="8" required />

  <!-- max-widths -->
  <div v-else-if="variant === 'max-widths'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSTextarea v-model="value" label="Medium (default)" max-width="md" required />
    <AGDSTextarea v-model="value" label="Large" max-width="lg" required />
    <AGDSTextarea v-model="value" label="Extra large" max-width="xl" required />
  </div>

  <!-- block -->
  <AGDSTextarea v-else-if="variant === 'block'" v-model="value" label="Notes" block required />
</template>
