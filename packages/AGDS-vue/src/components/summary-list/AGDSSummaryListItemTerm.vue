<script setup lang="ts">
/**
 * The label / key in a summary row.
 * Must be the first child of SummaryListItem.
 * Renders a `<dt>` (description term).
 */
export interface AgDSSummaryListItemTermProps {}
</script>

<template>
  <!--
    <dt> carries implicit term semantics — paired with <dd> by the browser's
    accessibility tree without needing an ARIA role. WCAG 1.3.1.
  -->
  <dt class="agds-summary-list-item__term">
    <slot />
  </dt>
</template>

<style scoped>
.agds-summary-list-item__term {
  display: flex;
  flex-shrink: 0;
  margin: 0;
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  /* Full width on mobile (column layout). */
  width: 100%;
}

/* Fixed proportion on sm+ (row layout). */
@media (min-width: 48rem) {
  .agds-summary-list-item__term {
    width: 30%;
    min-width: 12.5rem; /* 200px */
  }
}
</style>
