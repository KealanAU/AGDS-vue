<script lang="ts">
/**
 * Named size preset for the icon, mapping to `--agds-icon-size-*` design tokens.
 * A raw CSS length string or pixel number can also be passed to `size` for one-off sizes.
 *
 * - `'sm'` — Small inline icon (e.g. 16 px); use alongside caption-size text.
 * - `'md'` — Default (e.g. 20 px); suits body-text line height.
 * - `'lg'` — Large icon (e.g. 24 px); use in list items or headings.
 * - `'xl'` — Extra-large (e.g. 32 px); use for illustrative or standalone icons.
 */
export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AGDSIconProps {
  /** Iconify icon name (e.g. "mdi:home", "i-heroicons-solid:home") or a Vue component */
  name: string | object
  /** Named size or any CSS length (e.g. 'md', 32, '2rem', '24px') */
  size?: IconSize | string | number
  /** CSS color value; defaults to currentColor so it inherits from parent */
  color?: string
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AGDSIconProps>(), {
  size: 'md',
})

const attrs = useAttrs()

const SIZE_MAP: Record<IconSize, string> = {
  sm: 'var(--agds-icon-size-sm)',
  md: 'var(--agds-icon-size-md)',
  lg: 'var(--agds-icon-size-lg)',
  xl: 'var(--agds-icon-size-xl)',
}

// Strip the UnoCSS/Tailwind "i-" prefix so both "i-mdi:home" and "mdi:home" work
const iconName = computed(() =>
  typeof props.name === 'string' ? props.name.replace(/^i-/, '') : '',
)

const resolvedSize = computed(() => {
  const s = props.size
  if (typeof s === 'number') return `${s}px`
  if (s && s in SIZE_MAP) return SIZE_MAP[s as IconSize]
  return s ?? SIZE_MAP.md
})

const iconStyle = computed(() => ({
  fontSize: resolvedSize.value,
  ...(props.color ? { color: props.color } : {}),
}))

/**
 * A11y defaults — works with @iconify/vue's internal SVG attribute handling:
 * - aria-hidden="true"  → @iconify/vue keeps aria-hidden on the SVG (decorative)
 * - aria-hidden="false" → @iconify/vue REMOVES aria-hidden from the SVG (meaningful)
 * - no aria-hidden prop → @iconify/vue defaults to aria-hidden="true"
 * - role="img" is always set by @iconify/vue's svgDefaults
 */
const a11yAttrs = computed(() => {
  const ariaLabel = attrs['aria-label'] as string | undefined
  if (ariaLabel) {
    // Meaningful icon: tell @iconify/vue to remove aria-hidden so role="img" + aria-label are exposed
    return { 'aria-hidden': 'false' }
  }
  // Decorative default; respect explicit aria-hidden override from consumer
  if (attrs['aria-hidden'] === undefined) {
    return { 'aria-hidden': 'true' }
  }
  return {}
})
</script>

<template>
  <Icon
    v-if="typeof name === 'string'"
    :icon="iconName"
    focusable="false"
    class="agds-icon"
    v-bind="{ ...$attrs, ...a11yAttrs }"
    :style="iconStyle"
  />
  <component
    :is="name"
    v-else
    class="agds-icon"
    v-bind="{ ...$attrs, ...a11yAttrs }"
    :style="iconStyle"
  />
</template>

<style scoped>
.agds-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
