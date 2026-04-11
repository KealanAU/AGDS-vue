<script setup lang="ts">
export interface AGDSTableHeaderProps {
  /** The HTML element to render — swap to 'td' for a row-group header cell. */
  as?: 'th' | 'td'
  /** Number of columns this header spans. */
  colSpan?: number
  /** Number of rows this header spans. */
  rowSpan?: number
  /**
   * Defines the cells the header relates to.
   * Use 'col' for column headers (default), 'row' for row headers,
   * 'colgroup' or 'rowgroup' for spanning headers.
   */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
  /** Horizontal alignment of the header content. */
  textAlign?: 'left' | 'center' | 'right'
  /** Sets a fixed width on the column (e.g. '10rem', '120px'). */
  width?: string
}

const props = withDefaults(defineProps<AGDSTableHeaderProps>(), {
  as: 'th',
  scope: 'col',
  textAlign: 'left',
})
</script>

<template>
  <component
    :is="props.as"
    class="agds-table-header"
    :class="`agds-table-header--${props.textAlign}`"
    :colspan="props.colSpan"
    :rowspan="props.rowSpan"
    :scope="props.scope"
    :style="props.width ? { width: props.width } : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.agds-table-header {
  padding: var(--agds-table-cell-padding);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  vertical-align: bottom;
  border-bottom: var(--agds-table-header-border-bottom) solid var(--agds-table-border-color);
}

.agds-table-header:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-table-header--left   { text-align: left; }
.agds-table-header--center { text-align: center; }
.agds-table-header--right  { text-align: right; }
</style>
