<script setup lang="ts">
import { provide, reactive } from 'vue'
import { TABLE_CONTEXT_KEY } from './tableContext'

export type TableLayout = 'auto' | 'fixed'

export interface AGDSTableProps {
  /** Alternating rows get a subtle background. */
  striped?: boolean
  /** Setting this to -1 makes the table programmatically focusable. */
  tabIndex?: number
  /** CSS table-layout algorithm. */
  tableLayout?: TableLayout
  id?: string
  // aria-labelledby, aria-describedby, aria-rowcount and other HTML attributes
  // pass through automatically via inheritAttrs to the <table> element.
}

const props = withDefaults(defineProps<AGDSTableProps>(), {
  tableLayout: 'auto',
})

provide(
  TABLE_CONTEXT_KEY,
  reactive({
    get tableLayout() {
      return props.tableLayout ?? 'auto'
    },
  }),
)
</script>

<template>
  <table
    class="agds-table"
    :class="[
      props.striped && 'agds-table--striped',
      props.tableLayout === 'fixed' && 'agds-table--layout-fixed',
    ]"
    :tabindex="props.tabIndex"
    :id="props.id"
  >
    <slot />
  </table>
</template>

<style scoped>
.agds-table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
  width: 100%;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}

.agds-table--layout-fixed {
  table-layout: fixed;
}

/*
  Striped: odd tbody rows (counted from the end so the top row is always
  unstriped regardless of row count). Skip rows that have their own
  background (selected, invalid, explicit background prop).
*/
.agds-table--striped :deep(tbody tr:nth-last-of-type(odd):not([aria-selected='true'], [data-has-background])) {
  background-color: var(--agds-table-stripe-bg);
}

.agds-table:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}
</style>
