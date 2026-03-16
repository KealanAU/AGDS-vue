<script setup lang="ts">
/**
 * SummaryList displays a list of terms and descriptions as key-value pairs.
 * Renders a `<dl>` (HTML Description List). Compose with SummaryListItem,
 * SummaryListItemTerm, SummaryListItemDescription, and SummaryListItemAction.
 */
export interface AgDSSummaryListProps {}
</script>

<template>
  <!--
    <dl> carries implicit list semantics so screen readers announce the
    number of term/description pairs. WCAG 1.3.1: native element preferred
    over ARIA list role.
  -->
  <dl class="agds-summary-list">
    <slot />
  </dl>
</template>

<style scoped>
.agds-summary-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
}
</style>
