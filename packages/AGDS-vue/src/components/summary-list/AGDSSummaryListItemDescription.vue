<script setup lang="ts">
/**
 * The value / description in a summary row.
 * Must follow SummaryListItemTerm inside SummaryListItem.
 * Renders a `<dd>` (description details).
 */
export interface AGDSSummaryListItemDescriptionProps {}
</script>

<template>
  <!--
    <dd> carries implicit description semantics paired with the preceding
    <dt> by the browser's accessibility tree. WCAG 1.3.1.
  -->
  <dd class="agds-summary-list-item__description">
    <slot />
  </dd>
</template>

<style scoped>
.agds-summary-list-item__description {
  display: flex;
  flex-grow: 1;
  margin: 0;
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
}
</style>
