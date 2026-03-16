<script setup lang="ts">
import AgDSBreadcrumbsDivider from './AGDSBreadcrumbsDivider.vue'

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <li class="agds-breadcrumbs__item">
    <AgDSBreadcrumbsDivider />
    <button
      type="button"
      class="agds-breadcrumbs__toggle"
      aria-expanded="false"
      aria-label="Show all breadcrumbs"
      @click="handleClick"
    >
      &hellip;
    </button>
  </li>
</template>

<style scoped>
.agds-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--agds-space-1);
  font-size: var(--agds-font-size-sm);
}

.agds-breadcrumbs__toggle {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--agds-color-action-primary);
  font-size: var(--agds-font-size-sm);
  font-family: var(--agds-font-family-body);
  text-decoration: underline;
  text-underline-offset: 2px;
  line-height: inherit;
}

.agds-breadcrumbs__toggle:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-breadcrumbs__toggle:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
