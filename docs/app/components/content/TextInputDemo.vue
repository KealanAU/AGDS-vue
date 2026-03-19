<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'hint' | 'optional' | 'invalid' | 'disabled' | 'max-widths' | 'block' | 'types' */
  variant?: string
}>()

const value = ref('')
</script>

<template>
  <!-- default -->
  <AGDSTextInput v-if="!variant || variant === 'default'" v-model="value" label="Full name" required />

  <!-- hint -->
  <AGDSTextInput
    v-else-if="variant === 'hint'"
    v-model="value"
    label="Email address"
    type="email"
    hint="We'll only use this to send your confirmation"
    required
  />

  <!-- optional -->
  <AGDSTextInput v-else-if="variant === 'optional'" v-model="value" label="Middle name" />

  <!-- invalid -->
  <AGDSTextInput
    v-else-if="variant === 'invalid'"
    v-model="value"
    label="Email address"
    type="email"
    :invalid="true"
    message="Enter a valid email address"
    required
  />

  <!-- disabled -->
  <AGDSTextInput v-else-if="variant === 'disabled'" label="Full name" model-value="Jane Smith" disabled required />

  <!-- max-widths -->
  <div v-else-if="variant === 'max-widths'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSTextInput v-model="value" label="Extra small" max-width="xs" required />
    <AGDSTextInput v-model="value" label="Small" max-width="sm" required />
    <AGDSTextInput v-model="value" label="Medium (default)" max-width="md" required />
    <AGDSTextInput v-model="value" label="Large" max-width="lg" required />
    <AGDSTextInput v-model="value" label="Extra large" max-width="xl" required />
  </div>

  <!-- block -->
  <AGDSTextInput v-else-if="variant === 'block'" v-model="value" label="Full name" block required />

  <!-- types -->
  <div v-else-if="variant === 'types'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSTextInput v-model="value" label="Email" type="email" required />
    <AGDSTextInput v-model="value" label="Phone number" type="tel" required />
    <AGDSTextInput v-model="value" label="Website" type="url" required />
    <AGDSTextInput v-model="value" label="Age" type="number" required />
  </div>
</template>
