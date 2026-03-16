<script setup lang="ts">
export interface AgDSAppLayoutFooterDividerProps {}
</script>

<template>
  <hr aria-hidden="true" class="agds-app-layout-footer-divider" />
</template>

<style scoped>
.agds-app-layout-footer-divider {
  box-sizing: content-box;
  height: 0;
  margin: 0;
  overflow: visible;
  border: none;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  width: 100%;
}
</style>
