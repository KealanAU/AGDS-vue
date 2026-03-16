<script setup lang="ts">
export interface AgDSFieldHintProps {
  /** Unique id so inputs can reference this via aria-describedby */
  id: string
}

defineProps<AgDSFieldHintProps>()
</script>

<template>
  <span :id="id" class="agds-field-hint">
    <slot />
  </span>
</template>

<style scoped>
.agds-field-hint {
  display: block;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}
</style>
