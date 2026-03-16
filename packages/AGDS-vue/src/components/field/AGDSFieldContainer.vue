<script setup lang="ts">
export interface AgDSFieldContainerProps {
  /** When true, renders the invalid (error) visual treatment */
  invalid?: boolean
}

withDefaults(defineProps<AgDSFieldContainerProps>(), {
  invalid: false,
})
</script>

<template>
  <div
    class="agds-field-container"
    :class="{ 'agds-field-container--invalid': invalid }"
  >
    <slot />
  </div>
</template>

<style scoped>
.agds-field-container {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-field-container--invalid {
  padding-inline-start: var(--agds-space-3);
  border-inline-start: var(--agds-space-1) solid var(--agds-color-error);
}
</style>
