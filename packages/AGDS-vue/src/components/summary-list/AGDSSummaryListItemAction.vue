<script setup lang="ts">
/**
 * An optional action (typically a link) at the trailing end of a summary row.
 * Must be the last child of SummaryListItem.
 * Renders a `<dd>` (description details) — valid per the HTML spec when a
 * single term has multiple associated descriptions.
 */
export interface AgDSSummaryListItemActionProps {}
</script>

<template>
  <dd class="agds-summary-list-item__action">
    <slot />
  </dd>
</template>

<style scoped>
.agds-summary-list-item__action {
  display: flex;
  flex-shrink: 0;
  margin: 0;
}
</style>
