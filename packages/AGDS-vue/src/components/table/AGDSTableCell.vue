<script setup lang="ts">
export interface AGDSTableCellProps {
  /** The HTML element to render. Use 'th' with scope='row' for a row header cell. */
  as?: 'td' | 'th'
  /** Number of columns this cell spans. */
  colSpan?: number
  /** Number of rows this cell spans. */
  rowSpan?: number
  /** For row-header cells (as="th"): defines the cells the header relates to. */
  scope?: 'row' | 'rowgroup'
  /** Unique id, useful for aria-labelledby associations. */
  id?: string
  /** Font weight of the cell content. */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  /** Horizontal alignment. */
  textAlign?: 'left' | 'center' | 'right'
  /** Vertical alignment. */
  verticalAlign?: 'top' | 'middle' | 'bottom'
}

const props = withDefaults(defineProps<AGDSTableCellProps>(), {
  as: 'td',
  fontWeight: 'normal',
  textAlign: 'left',
  verticalAlign: 'top',
})
</script>

<template>
  <component
    :is="props.as"
    class="agds-table-cell"
    :class="[
      `agds-table-cell--align-${props.textAlign}`,
      `agds-table-cell--weight-${props.fontWeight}`,
    ]"
    :colSpan="props.colSpan"
    :rowSpan="props.rowSpan"
    :scope="props.scope"
    :id="props.id"
    :style="{ verticalAlign: props.verticalAlign }"
  >
    <slot />
  </component>
</template>

<style scoped>
.agds-table-cell {
  padding: var(--agds-table-cell-padding);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-table-border-color);
  color: var(--agds-color-text);
}

.agds-table-cell:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-table-cell--align-left   { text-align: left; }
.agds-table-cell--align-center { text-align: center; }
.agds-table-cell--align-right  { text-align: right; }

.agds-table-cell--weight-normal   { font-weight: var(--agds-font-weight-normal); }
.agds-table-cell--weight-medium   { font-weight: var(--agds-font-weight-medium); }
.agds-table-cell--weight-semibold { font-weight: var(--agds-font-weight-semibold); }
.agds-table-cell--weight-bold     { font-weight: var(--agds-font-weight-bold); }
</style>
