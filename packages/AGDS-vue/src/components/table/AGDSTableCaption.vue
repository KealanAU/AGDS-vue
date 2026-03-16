<script setup lang="ts">
export interface AgDSTableCaptionProps {}
</script>

<template>
  <caption class="agds-table-caption">
    <slot />
  </caption>
</template>

<style scoped>
.agds-table-caption {
  caption-side: top;
  text-align: left;
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  padding-bottom: var(--agds-space-2);
  color: var(--agds-color-text);
}
</style>
