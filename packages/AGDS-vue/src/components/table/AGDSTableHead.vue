<script setup lang="ts">
/** Wraps the header row(s) of an `AGDSTable` in a `<thead>` element. */
export interface AGDSTableHeadProps {}
</script>

<template>
  <thead class="agds-table-head">
    <slot />
  </thead>
</template>

<style scoped></style>
