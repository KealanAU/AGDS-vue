<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- default: basic password input -->
  <AGDSPasswordInput
    v-if="!variant || variant === 'default'"
    label="Password"
    required
  />

  <!-- with-hint: password input with hint text -->
  <AGDSPasswordInput
    v-else-if="variant === 'with-hint'"
    label="New password"
    hint="Must be at least 8 characters and include a number"
    required
  />

  <!-- invalid: password input in error state -->
  <AGDSPasswordInput
    v-else-if="variant === 'invalid'"
    label="Password"
    :invalid="true"
    message="Password must be at least 8 characters"
    required
  />

  <!-- disabled: disabled password input -->
  <AGDSPasswordInput
    v-else-if="variant === 'disabled'"
    label="Password"
    disabled
    required
  />

  <!-- max-widths: multiple password inputs with different widths -->
  <div
    v-else-if="variant === 'max-widths'"
    style="display:flex;flex-direction:column;gap:var(--agds-space-2)"
  >
    <AGDSPasswordInput label="Medium (default)" max-width="md" required />
    <AGDSPasswordInput label="Large" max-width="lg" required />
    <AGDSPasswordInput label="Extra large" max-width="xl" required />
  </div>

  <!-- block: full-width password input -->
  <AGDSPasswordInput
    v-else-if="variant === 'block'"
    label="Password"
    block
    required
  />
</template>
