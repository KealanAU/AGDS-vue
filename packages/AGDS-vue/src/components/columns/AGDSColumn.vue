<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'
import type { ColumnRange } from './AGDSColumns.vue'

export type ColumnAlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type ColumnJustifySelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch'

export interface AgDSColumnProps {
  /** Element or component to render as */
  as?: string | Component
  /**
   * How many grid columns this item spans.
   * e.g. :span="6" on a 12-column grid → half width.
   */
  span?: ColumnRange
  /**
   * Grid column start line (1-based).
   * e.g. :start="3" → starts at the 3rd column line.
   */
  start?: ColumnRange
  /**
   * Grid column end line (1-based, exclusive).
   * e.g. :end="7" → ends before the 7th column line.
   */
  end?: ColumnRange
  /** Align this item on the block axis within its grid area */
  alignSelf?: ColumnAlignSelf
  /** Align this item on the inline axis within its grid area */
  justifySelf?: ColumnJustifySelf
}

defineOptions({ inheritAttrs: false })

const props = defineProps<AgDSColumnProps>()
const attrs = useAttrs()

const style = computed(() => {
  const raw: Record<string, string | undefined> = {
    gridColumn: props.span !== undefined ? `span ${props.span} / span ${props.span}` : undefined,
    gridColumnStart: props.start !== undefined ? String(props.start) : undefined,
    gridColumnEnd: props.end !== undefined ? String(props.end) : undefined,
    alignSelf: props.alignSelf,
    justifySelf: props.justifySelf,
  }
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined))
})
</script>

<template>
  <component :is="props.as ?? 'div'" v-bind="attrs" :style="style">
    <slot />
  </component>
</template>
