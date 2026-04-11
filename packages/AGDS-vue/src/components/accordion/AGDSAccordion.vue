<script setup lang="ts">
import { provide } from 'vue'
import { AccordionRoot } from 'reka-ui'
import type { BackgroundVariant } from '../../core'

/**
 * Controls how many accordion items can be open at the same time.
 *
 * - `'single'` — Only one item can be open at a time; opening another closes the current one.
 * - `'multiple'` — Any number of items can be open simultaneously (default).
 */
export type AccordionType = 'single' | 'multiple'
export type { BackgroundVariant as AccordionBackground }

export interface AGDSAccordionProps {
  /**
   * 'single' — only one item can be open at a time.
   * 'multiple' — any number of items can be open simultaneously (default).
   */
  type?: AccordionType
  /**
   * For type='single', allows the open item to be closed again by clicking it.
   * Has no effect when type='multiple'.
   */
  collapsible?: boolean
  /**
   * Controlled open value(s). Use v-model for two-way binding.
   * String for type='single', string[] for type='multiple'.
   */
  modelValue?: string | string[]
  /** Default open value(s) for uncontrolled use. */
  defaultValue?: string | string[]
  /**
   * When true, triggers and panel content are indented.
   * Passed to all child AccordionItems via provide/inject.
   */
  indent?: boolean
  /**
   * Default hover background for all child AccordionItems.
   * Can be overridden per-item.
   */
  background?: BackgroundVariant
}

const props = withDefaults(defineProps<AGDSAccordionProps>(), {
  type: 'multiple',
  collapsible: true,
  indent: false,
  background: 'body',
})

const emit = defineEmits<{
  /** Emitted when the open item(s) change — use with v-model for two-way binding. String for type='single', string[] for type='multiple'. */
  'update:modelValue': [value: string | string[]]
}>()

provide('accordionIndent', props.indent)
provide('accordionBackground', props.background)
</script>

<template>
  <AccordionRoot
    :type="props.type"
    :collapsible="props.type === 'single' ? props.collapsible : undefined"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    class="agds-accordion"
    @update:modelValue="(v) => v !== undefined && emit('update:modelValue', v)"
  >
    <slot />
  </AccordionRoot>
</template>

<style scoped>
.agds-accordion {
  width: 100%;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
}
</style>
