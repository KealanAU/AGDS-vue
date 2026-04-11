<script setup lang="ts">
/**
 * A single item (`<li>`) inside `AGDSUnorderedList` or `AGDSOrderedList`.
 * Applies body typography tokens and consistent vertical spacing between siblings.
 */
export interface AGDSListItemProps {}
</script>

<template>
  <li class="agds-list-item">
    <slot />
  </li>
</template>

<style scoped>
.agds-list-item {
  list-style: unset;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  color: var(--agds-color-text);
}

.agds-list-item + .agds-list-item {
  margin-top: var(--agds-space-2);
}
</style>
