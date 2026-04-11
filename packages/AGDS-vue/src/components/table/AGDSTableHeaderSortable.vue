<script setup lang="ts">
import { computed } from 'vue'
import AGDSIcon from '../icon/AGDSIcon.vue'

/**
 * Active sort direction for a sortable table column.
 *
 * - `'ASC'` — Ascending order (A → Z, oldest → newest, lowest → highest).
 * - `'DESC'` — Descending order (Z → A, newest → oldest, highest → lowest).
 */
export type TableSortDirection = 'ASC' | 'DESC'

export interface AGDSTableHeaderSortableProps {
  /** The active sort direction for this column. Omit when unsorted. */
  sort?: TableSortDirection
  /** Horizontal alignment of the header content. */
  textAlign?: 'left' | 'center' | 'right'
  /** Sets a fixed width on the column. */
  width?: string
  /** Number of columns this header spans. */
  colSpan?: number
}

const props = withDefaults(defineProps<AGDSTableHeaderSortableProps>(), {
  textAlign: 'left',
})

const emit = defineEmits<{
  /** Emitted when the sort button is clicked. Toggle between `'ASC'` → `'DESC'` → unsorted in the handler. */
  click: [event: MouseEvent]
}>()

const ariaSort = computed(() => {
  if (props.sort === 'ASC') return 'ascending'
  if (props.sort === 'DESC') return 'descending'
  return undefined
})

const sortIcon = computed(() => {
  if (props.sort === 'ASC') return 'heroicons:arrow-up'
  if (props.sort === 'DESC') return 'heroicons:arrow-down'
  return 'heroicons:arrows-up-down'
})

const isSorted = computed(() => Boolean(props.sort))
</script>

<template>
  <th
    class="agds-table-header-sortable"
    :class="isSorted && 'agds-table-header-sortable--active'"
    scope="col"
    :aria-sort="ariaSort"
    :colspan="props.colSpan"
    :style="props.width ? { width: props.width } : undefined"
  >
    <button
      type="button"
      class="agds-table-header-sortable__button"
      :class="`agds-table-header-sortable__button--${props.textAlign}`"
      @click="emit('click', $event)"
    >
      <span
        class="agds-table-header-sortable__label"
        :style="
          props.textAlign === 'right'
            ? { marginLeft: 'auto' }
            : props.textAlign === 'center'
            ? { marginInline: 'auto' }
            : undefined
        "
      >
        <slot />
      </span>
      <AGDSIcon
        :name="sortIcon"
        size="sm"
        class="agds-table-header-sortable__icon"
        aria-hidden="true"
      />
    </button>
  </th>
</template>

<style scoped>
/* ── <th> wrapper ─────────────────────────────────────────── */

.agds-table-header-sortable {
  padding: 0;
  border-bottom: var(--agds-table-header-border-bottom) solid var(--agds-table-border-color);
}

.agds-table-header-sortable--active {
  border-bottom: var(--agds-table-sort-active-border);
}

/* ── Sort button ──────────────────────────────────────────── */

.agds-table-header-sortable__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-2);
  width: 100%;
  padding: var(--agds-table-cell-padding);

  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-table-header-sortable__button:hover {
  background-color: var(--agds-table-stripe-bg);
  text-decoration: none;
}

.agds-table-header-sortable__button:hover .agds-table-header-sortable__icon {
  color: var(--agds-color-text);
}

.agds-table-header-sortable__button:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* ── Icon ─────────────────────────────────────────────────── */

.agds-table-header-sortable__icon {
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
  transition: transform var(--agds-transition-fast);
}

.agds-table-header-sortable__button:hover .agds-table-header-sortable__icon {
  transform: scale(1.2);
}

/* ── Label text alignment ─────────────────────────────────── */

.agds-table-header-sortable__label {
  display: inline-block;
  text-align: left;
}

.agds-table-header-sortable__button--center .agds-table-header-sortable__label {
  text-align: center;
}

.agds-table-header-sortable__button--right .agds-table-header-sortable__label {
  text-align: right;
}
</style>
