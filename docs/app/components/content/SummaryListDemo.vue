<script setup lang="ts">
defineProps<{
  /** 'default' | 'without-actions' */
  variant?: string
}>()
</script>

<template>
  <!-- default: key-value pairs with an optional change action -->
  <AGDSSummaryList v-if="!variant || variant === 'default'">
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Full name</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>Jane Smith</AGDSSummaryListItemDescription>
      <AGDSSummaryListItemAction><a href="#">Change</a></AGDSSummaryListItemAction>
    </AGDSSummaryListItem>
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Date of birth</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>1 January 1990</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
  </AGDSSummaryList>

  <!-- without-actions: read-only display rows -->
  <AGDSSummaryList v-else-if="variant === 'without-actions'">
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Reference number</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>REF-2024-001234</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Submitted</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>12 March 2024</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
  </AGDSSummaryList>
</template>
