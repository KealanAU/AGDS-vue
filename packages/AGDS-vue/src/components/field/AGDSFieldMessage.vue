<script setup lang="ts">
import AGDSIcon from '../icon/AGDSIcon.vue'

export interface AGDSFieldMessageProps {
  /** Unique id so inputs can reference this via aria-describedby */
  id: string
}

defineProps<AGDSFieldMessageProps>()
</script>

<template>
  <span :id="id" class="agds-field-message" role="alert">
    <AGDSIcon
      name="mdi:alert-circle"
      size="md"
      aria-label="Error"
      class="agds-field-message__icon"
    />
    <span class="agds-field-message__text">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.agds-field-message {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-1);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-error);
}

.agds-field-message__icon {
  flex-shrink: 0;
  color: var(--agds-color-error);
}

.agds-field-message__text {
  font-weight: var(--agds-font-weight-bold);
}
</style>
