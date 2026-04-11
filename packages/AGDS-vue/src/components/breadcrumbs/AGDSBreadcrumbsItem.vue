<script setup lang="ts">
import { ref } from 'vue'
import AGDSBreadcrumbsDivider from './AGDSBreadcrumbsDivider.vue'

export interface AGDSBreadcrumbsItemProps {
  /** URL the breadcrumb navigates to. Omit for the current page when no link is needed. */
  href?: string
  /** Visible text label */
  label: string
  /** Marks this as the current page item — sets aria-current="page" */
  current?: boolean
}

withDefaults(defineProps<AGDSBreadcrumbsItemProps>(), {
  current: false,
})

const linkRef = ref<HTMLAnchorElement | null>(null)

defineExpose({
  /** Moves keyboard focus to the breadcrumb link. Called by the parent after expanding on mobile. */
  focus: () => linkRef.value?.focus(),
})
</script>

<template>
  <li class="agds-breadcrumbs__item">
    <AGDSBreadcrumbsDivider />
    <a
      v-if="href"
      ref="linkRef"
      :href="href"
      :aria-current="current ? 'page' : undefined"
      class="agds-breadcrumbs__link"
    >{{ label }}<span v-if="current" class="sr-only"> (current page)</span></a>
    <span
      v-else
      :aria-current="current ? 'page' : undefined"
      class="agds-breadcrumbs__text"
    >{{ label }}<span v-if="current" class="sr-only"> (current page)</span></span>
  </li>
</template>

<style scoped>
.agds-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--agds-space-1);
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-sm);
}

/* Hide the divider for the very first item in the list */
.agds-breadcrumbs__item:first-child :deep(.agds-breadcrumbs__divider) {
  display: none;
}

.agds-breadcrumbs__link {
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-breadcrumbs__link:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-breadcrumbs__link:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.agds-breadcrumbs__text {
  color: var(--agds-color-text);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
