<script setup lang="ts">
/**
 * A single row in a SummaryList. Must be a direct child of SummaryList.
 * Wraps a SummaryListItemTerm, SummaryListItemDescription, and optionally
 * a SummaryListItemAction.
 *
 * Renders as a <div> — wrapping dt/dd pairs in a <div> inside a <dl> is
 * valid HTML and the recommended pattern for grouped description list rows.
 */
export interface AGDSSummaryListItemProps {}
</script>

<template>
  <!--
    Stacks vertically on narrow viewports, switches to a row on sm+.
    WCAG 1.3.1: the div wrapper is allowed inside <dl> per the HTML spec and
    preserves the dt/dd semantics for assistive technologies.
  -->
  <div class="agds-summary-list-item">
    <slot />
  </div>
</template>

<style scoped>
.agds-summary-list-item {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
  padding-block: var(--agds-space-3);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* Switch to a row layout on sm+ (≥ 48rem / 768px). */
@media (min-width: 48rem) {
  .agds-summary-list-item {
    flex-direction: row;
  }
}
</style>
