<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'hint' | 'invalid' | 'disabled' | 'max-widths' | 'block' | 'clear' */
  variant?: string
}>()

const query = ref('')
const clearQuery = ref('climate change')
</script>

<template>
  <!-- default -->
  <AGDSSearchInput v-if="!variant || variant === 'default'" v-model="query" label="Search" required />

  <!-- hint -->
  <AGDSSearchInput
    v-else-if="variant === 'hint'"
    v-model="query"
    label="Search legislation"
    hint="Enter an act name, number, or keyword"
    required
  />

  <!-- invalid -->
  <AGDSSearchInput
    v-else-if="variant === 'invalid'"
    v-model="query"
    label="Search"
    :invalid="true"
    message="Enter a search term to continue"
    required
  />

  <!-- disabled -->
  <AGDSSearchInput v-else-if="variant === 'disabled'" v-model="query" label="Search" disabled required />

  <!-- max-widths -->
  <div v-else-if="variant === 'max-widths'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSSearchInput v-model="query" label="Medium (default)" max-width="md" required />
    <AGDSSearchInput v-model="query" label="Large" max-width="lg" required />
    <AGDSSearchInput v-model="query" label="Extra large" max-width="xl" required />
  </div>

  <!-- block -->
  <AGDSSearchInput v-else-if="variant === 'block'" v-model="query" label="Search" block required />

  <!-- clear -->
  <AGDSSearchInput v-else-if="variant === 'clear'" v-model="clearQuery" label="Search" required />
</template>
