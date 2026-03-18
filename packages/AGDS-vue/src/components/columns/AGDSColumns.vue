<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

export type ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type ColumnsAlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

export interface AGDSColumnsProps {
  /** Element or component to render as */
  as?: string | Component
  /**
   * Number of equal columns to create. Defaults to 12.
   * Each `AGDSColumn` child can span any number of these columns via its `span` prop.
   */
  cols?: ColumnRange
  /**
   * Gap between columns and rows — number maps to `var(--agds-space-{n})`, string used verbatim.
   * e.g. :gap="2" → var(--agds-space-2)
   */
  gap?: number | string
  /** Column gap only */
  columnGap?: number | string
  /** Row gap only */
  rowGap?: number | string
  /** Align all grid items on the block axis */
  alignItems?: ColumnsAlignItems
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AGDSColumnsProps>(), {
  cols: 12,
})

const attrs = useAttrs()

function spaceVar(val: number | string | undefined): string | undefined {
  if (val === undefined) return undefined
  return typeof val === 'number' ? `var(--agds-space-${val})` : val
}

const style = computed(() => {
  const raw: Record<string, string | undefined> = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
    gap: spaceVar(props.gap),
    columnGap: spaceVar(props.columnGap),
    rowGap: spaceVar(props.rowGap),
    alignItems: props.alignItems,
  }
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined))
})
</script>

<template>
  <component :is="props.as ?? 'div'" v-bind="attrs" :style="style">
    <slot />
  </component>
</template>
