<script setup lang="ts">
export interface AGDSTableHeadProps {}
</script>

<template>
  <thead class="agds-table-head">
    <slot />
  </thead>
</template>

<style scoped>
.agds-table-head {
  border-bottom: var(--agds-table-header-border-bottom) solid var(--agds-table-border-color);
}
</style>
