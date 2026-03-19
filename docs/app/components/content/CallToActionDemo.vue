<script setup lang="ts">
defineProps<{
  /** 'default' | 'button' | 'external' | 'disabled' | 'loading' */
  variant?: string
}>()
</script>

<template>
  <!-- default (link) -->
  <AGDSCallToActionLink v-if="!variant || variant === 'default'" href="#">Get started</AGDSCallToActionLink>

  <!-- button -->
  <AGDSCallToActionButton v-else-if="variant === 'button'">Apply now</AGDSCallToActionButton>

  <!-- external -->
  <AGDSCallToActionLink v-else-if="variant === 'external'" href="https://www.australia.gov.au" external>australia.gov.au</AGDSCallToActionLink>

  <!-- disabled -->
  <AGDSCallToActionButton v-else-if="variant === 'disabled'" disabled>Apply now</AGDSCallToActionButton>

  <!-- loading -->
  <AGDSCallToActionButton v-else-if="variant === 'loading'" loading>Submitting…</AGDSCallToActionButton>
</template>
