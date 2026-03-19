<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'label-visible' | 'icon-only' | 'clear' */
  variant?: string
}>()

const query = ref('')
const clearQuery = ref('climate change')
</script>

<template>
  <!-- default -->
  <AGDSSearchBox v-if="!variant || variant === 'default'">
    <AGDSSearchBoxInput v-model="query" />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>

  <!-- label-visible -->
  <AGDSSearchBox v-else-if="variant === 'label-visible'">
    <AGDSSearchBoxInput v-model="query" label="Search the site" label-visible />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>

  <!-- icon-only -->
  <AGDSSearchBox v-else-if="variant === 'icon-only'">
    <AGDSSearchBoxInput v-model="query" />
    <AGDSSearchBoxButton label="Search" icon-only />
  </AGDSSearchBox>

  <!-- clear -->
  <AGDSSearchBox v-else-if="variant === 'clear'">
    <AGDSSearchBoxInput v-model="clearQuery" />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>
</template>
