<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

export type BoxDisplay =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none'

export type BoxFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type BoxFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type BoxAlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type BoxAlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type BoxJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
export type BoxJustifySelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch'

export interface AGDSBoxProps {
  /** Element or component to render as */
  as?: string | Component
  /** CSS display */
  display?: BoxDisplay
  /** flex-direction */
  flexDirection?: BoxFlexDirection
  /** flex-wrap */
  flexWrap?: BoxFlexWrap
  /** flex-grow: 0 | 1 */
  flexGrow?: 0 | 1
  /** flex-shrink: 0 | 1 */
  flexShrink?: 0 | 1
  /** align-items */
  alignItems?: BoxAlignItems
  /** align-self */
  alignSelf?: BoxAlignSelf
  /** justify-content */
  justifyContent?: BoxJustifyContent
  /** justify-self */
  justifySelf?: BoxJustifySelf
  /**
   * gap — number maps to `var(--agds-space-{n})`, string used verbatim
   * e.g. :gap="2" → var(--agds-space-2)
   */
  gap?: number | string
  /** column-gap */
  columnGap?: number | string
  /** row-gap */
  rowGap?: number | string
  /** Shorthand padding — number maps to `var(--agds-space-{n})` */
  padding?: number | string
  paddingTop?: number | string
  paddingRight?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  /** Horizontal padding (left + right) */
  paddingX?: number | string
  /** Vertical padding (top + bottom) */
  paddingY?: number | string
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
}

defineOptions({ inheritAttrs: false })

const props = defineProps<AGDSBoxProps>()
const attrs = useAttrs()

/** Maps a numeric space value to a CSS token, or returns the string as-is. */
function spaceVar(val: number | string | undefined): string | undefined {
  if (val === undefined) return undefined
  return typeof val === 'number' ? `var(--agds-space-${val})` : val
}

const style = computed(() => {
  // Start with shorthand padding so individual sides can override below
  const paddingTop =
    spaceVar(props.paddingTop) ?? spaceVar(props.paddingY)
  const paddingBottom =
    spaceVar(props.paddingBottom) ?? spaceVar(props.paddingY)
  const paddingLeft =
    spaceVar(props.paddingLeft) ?? spaceVar(props.paddingX)
  const paddingRight =
    spaceVar(props.paddingRight) ?? spaceVar(props.paddingX)

  const raw: Record<string, string | number | undefined> = {
    display: props.display,
    flexDirection: props.flexDirection,
    flexWrap: props.flexWrap,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    alignItems: props.alignItems,
    alignSelf: props.alignSelf,
    justifyContent: props.justifyContent,
    justifySelf: props.justifySelf,
    gap: spaceVar(props.gap),
    columnGap: spaceVar(props.columnGap),
    rowGap: spaceVar(props.rowGap),
    // If the shorthand `padding` prop is set it wins over all individual sides
    padding: spaceVar(props.padding),
    paddingTop: props.padding !== undefined ? undefined : paddingTop,
    paddingRight: props.padding !== undefined ? undefined : paddingRight,
    paddingBottom: props.padding !== undefined ? undefined : paddingBottom,
    paddingLeft: props.padding !== undefined ? undefined : paddingLeft,
    width: props.width,
    height: props.height,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
  }

  // Strip undefined so Vue doesn't emit empty style attributes
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined))
})
</script>

<template>
  <!--
    inheritAttrs is false so we can manually spread $attrs alongside our
    computed :style. Vue merges the :style array entries, so any style passed
    by the parent is combined with the prop-derived styles.
  -->
  <component :is="props.as ?? 'div'" v-bind="attrs" :style="style">
    <slot />
  </component>
</template>
