<script setup lang="ts">
import { provide, ref, onMounted, onUnmounted } from 'vue'
import { TabsRoot } from 'reka-ui'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as TabsBackground }

export interface AGDSTabsProps {
  /** Controlled active tab value. Use v-model for two-way binding. */
  modelValue?: string
  /** Default active tab value for uncontrolled use. */
  defaultValue?: string
  /**
   * When false, horizontal padding and side borders are removed from panels,
   * giving edge-to-edge content. Default true.
   */
  contained?: boolean
  /**
   * Background the component is placed on.
   * 'body' (white, default) or 'bodyAlt' (off-white).
   * Sets local CSS palette variables for correct contrast and hover colours.
   */
  background?: BackgroundVariant
}

const props = withDefaults(defineProps<AGDSTabsProps>(), {
  contained: true,
  background: 'body',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Responsive orientation: vertical on mobile (<768px), horizontal on desktop
const orientation = ref<'horizontal' | 'vertical'>('horizontal')

let mq: MediaQueryList | null = null

function onMqChange(e: MediaQueryListEvent) {
  orientation.value = e.matches ? 'horizontal' : 'vertical'
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    mq = window.matchMedia('(min-width: 768px)')
    orientation.value = mq.matches ? 'horizontal' : 'vertical'
    mq.addEventListener('change', onMqChange)
  }
})

onUnmounted(() => {
  mq?.removeEventListener('change', onMqChange)
})

provide('tabsBackground', props.background)
provide('tabsContained', props.contained)
</script>

<template>
  <TabsRoot
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="orientation"
    :class="[
      'agds-tabs',
      props.background === 'bodyAlt' && 'agds-tabs--body-alt',
    ]"
    @update:model-value="(v) => emit('update:modelValue', v)"
  >
    <slot />
  </TabsRoot>
</template>

<style scoped>
/* ── Root — local palette variables ──────────────────── */

.agds-tabs {
  /* body (white) background */
  --agds-tabs-panel-bg:        var(--agds-color-bg);
  --agds-tabs-button-bg:       var(--agds-color-bg);
  --agds-tabs-button-fg:       var(--agds-color-action-primary);
  --agds-tabs-button-bg-hover: var(--agds-color-bg-subtle);
  --agds-tabs-button-fg-hover: var(--agds-color-text);
}

/* bodyAlt (off-white) background */
.agds-tabs--body-alt {
  --agds-tabs-panel-bg:        var(--agds-color-bg-subtle);
  --agds-tabs-button-bg:       var(--agds-color-bg-subtle);
  --agds-tabs-button-bg-hover: var(--agds-color-bg-muted);
}
</style>
