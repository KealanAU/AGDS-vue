<script setup lang="ts">
defineProps<{
  /** 'default' | 'accept' | 'validation' */
  variant?: string
}>()
</script>

<template>
  <!-- default: basic usage -->
  <AGDSFileInput
    v-if="!variant || variant === 'default'"
    label="Upload your CV"
  />

  <!-- accept: with MIME type restrictions -->
  <AGDSFileInput
    v-else-if="variant === 'accept'"
    label="Upload identity document"
    :accept="['image/jpeg', 'image/png', 'application/pdf']"
  />

  <!-- validation: hint + error state -->
  <AGDSFileInput
    v-else-if="variant === 'validation'"
    label="Proof of address"
    hint="Must be dated within the last 3 months."
    :invalid="true"
    message="You must upload a proof of address document"
  />
</template>
