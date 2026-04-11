<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <AGDSStack :gap="3">
    <AGDSHeading type="h1">Page title</AGDSHeading>
    <AGDSHeading type="h2">Section heading</AGDSHeading>
    <AGDSHeading type="h3">Subsection heading</AGDSHeading>
    <AGDSHeading type="h4">Sub-subsection</AGDSHeading>
    <AGDSHeading type="h5">Minor heading</AGDSHeading>
    <AGDSHeading type="h6">Caption-level heading</AGDSHeading>
  </AGDSStack>
</template>
