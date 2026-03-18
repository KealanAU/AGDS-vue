<script setup lang="ts">
import { computed, inject } from 'vue'
import { TABLE_CONTEXT_KEY } from './tableContext'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as TableRowBackground }

export interface AGDSTableRowProps {
  /** The row index in the full dataset (for virtualised/paginated tables). */
  'aria-rowindex'?: number
  /** Explicit background colour. Overridden by invalid or selected. */
  background?: BackgroundVariant
  /** Highlights the row as containing an error. */
  invalid?: boolean
  /**
   * Makes the row appear interactive (cursor, hover outline).
   * Set this when attaching a @click listener to the row.
   */
  clickable?: boolean
  /** Marks the row as currently selected (aria-selected + visual indicator). */
  selected?: boolean
}

const props = withDefaults(defineProps<AGDSTableRowProps>(), {
  clickable: false,
  invalid: false,
  selected: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tableContext = inject(TABLE_CONTEXT_KEY)

const isFixedTable = computed(() => tableContext?.tableLayout === 'fixed')

const hasBackground = computed(() => Boolean(props.background || props.invalid))

function handleClick(event: MouseEvent) {
  if (!props.clickable) return

  // Don't fire row click when the user interacted with an interactive element inside a cell.
  const target = event.target as HTMLElement
  if (target.closest('a, button, input, label, select, textarea')) return

  if (target.closest('tr')) {
    event.stopPropagation()
    emit('click', event)
  }
}
</script>

<template>
  <tr
    class="agds-table-row"
    :class="[
      props.selected && 'agds-table-row--selected',
      props.invalid && 'agds-table-row--invalid',
      props.clickable && 'agds-table-row--clickable',
      props.background && `agds-table-row--bg-${props.background}`,
      isFixedTable && 'agds-table-row--fixed',
    ]"
    :aria-rowindex="props['aria-rowindex']"
    :aria-selected="props.selected ? true : undefined"
    :data-has-background="hasBackground ? true : undefined"
    @click="handleClick"
  >
    <slot />
  </tr>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────────── */

.agds-table-row--bg-body    { background-color: var(--agds-color-bg); }
.agds-table-row--bg-bodyAlt { background-color: var(--agds-color-bg-subtle); }

.agds-table-row--invalid {
  background-color: var(--agds-table-invalid-bg);
}

/* ── Clickable (hover) ────────────────────────────────────── */

.agds-table-row--clickable {
  cursor: pointer;
}

/*
  Hover outline via ::after. position:relative on <tr> is not supported in
  Safari, so we provide an @supports fallback using outline below.
*/
.agds-table-row--clickable:not(.agds-table-row--fixed):hover {
  position: relative;
}

.agds-table-row--clickable:not(.agds-table-row--fixed):hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border: var(--agds-border-width-md) solid var(--agds-table-selected-border);
  pointer-events: none;
}

/* Ensure hover border sits above the selected border on the next row */
.agds-table-row--clickable:not(.agds-table-row--fixed):hover:has(+ .agds-table-row--selected)::after {
  border-bottom-width: var(--agds-border-width-md);
}

/* ── Selected ─────────────────────────────────────────────── */

.agds-table-row--selected:not(.agds-table-row--fixed) {
  position: relative;
  background-color: var(--agds-table-selected-bg);
}

.agds-table-row--selected:not(.agds-table-row--fixed)::after {
  content: '';
  position: absolute;
  inset: 0;
  border: var(--agds-border-width-sm) solid var(--agds-table-selected-border);
  pointer-events: none;
}

/* Remove bottom border when the next row is also selected */
.agds-table-row--selected:not(.agds-table-row--fixed):has(+ .agds-table-row--selected)::after {
  border-bottom-width: 0;
}

/* Remove top border from the second consecutive selected row */
.agds-table-row--selected:not(.agds-table-row--fixed) + .agds-table-row--selected:not(.agds-table-row--fixed)::after {
  border-top-width: 0;
}

/* ── Fixed table layout fallback (Chrome/Firefox)  ─────────
   Chrome and Firefox don't render ::after on <tr> in fixed tables.
   Use outline instead.
──────────────────────────────────────────────────────────── */

.agds-table-row--selected.agds-table-row--fixed {
  background-color: var(--agds-table-selected-bg);
  outline: 1px solid var(--agds-table-selected-border);
  outline-offset: -1px;
}

.agds-table-row--clickable.agds-table-row--fixed:hover {
  outline: 2px solid var(--agds-table-selected-border);
  outline-offset: -2px;
}

/* ── Safari fallback ──────────────────────────────────────
   Safari doesn't support position:relative on <tr>.
   Detect Safari and fall back to outline.
──────────────────────────────────────────────────────────── */

@supports (-webkit-appearance: -apple-pay-button) {
  .agds-table-row--selected:not(.agds-table-row--fixed) {
    outline: 1px solid var(--agds-table-selected-border);
    outline-offset: -1px;
  }

  .agds-table-row--selected:not(.agds-table-row--fixed)::after {
    display: none;
  }

  .agds-table-row--clickable:not(.agds-table-row--fixed):hover {
    outline: 2px solid var(--agds-table-selected-border);
    outline-offset: -2px;
  }

  .agds-table-row--clickable:not(.agds-table-row--fixed):hover::after {
    display: none;
  }
}
</style>
