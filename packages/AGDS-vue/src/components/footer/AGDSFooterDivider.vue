<script setup lang="ts">
export interface AgDSFooterDividerProps {
  /** Border colour token for the divider line. */
  color?: 'accent' | 'muted'
}

withDefaults(defineProps<AgDSFooterDividerProps>(), {
  color: 'accent',
})
</script>

<template>
  <hr
    aria-hidden="true"
    class="agds-footer-divider"
    :class="[`agds-footer-divider--${color}`]"
  />
</template>

<style scoped>
.agds-footer-divider {
  border: none;
  border-top: var(--agds-footer-divider-width) solid;
  margin: 0;
  overflow: visible;
  width: 100%;
}

.agds-footer-divider--accent {
  border-color: var(--agds-footer-divider-color-accent);
}

.agds-footer-divider--muted {
  border-color: var(--agds-footer-divider-color-muted);
}
</style>
