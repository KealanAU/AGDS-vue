<script setup lang="ts">
import AgDSIcon from '../icon/AGDSIcon.vue'
</script>

<template>
  <AgDSIcon
    name="mdi:chevron-right"
    size="sm"
    aria-hidden="true"
    class="agds-breadcrumbs__divider"
  />
</template>

<style scoped>
.agds-breadcrumbs__divider {
  flex-shrink: 0;
  color: var(--agds-color-border);
  position: relative;
  top: 1px;
}
</style>
