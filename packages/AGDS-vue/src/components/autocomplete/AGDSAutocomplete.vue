<script setup lang="ts" generic="TOption extends DefaultComboboxOption">
import { ref } from 'vue'
import AGDSComboboxAsync from './AGDSComboboxAsync.vue'
import type { DefaultComboboxOption, ComboboxMaxWidth } from './comboboxUtils'

export type { DefaultComboboxOption, ComboboxMaxWidth }

export interface AGDSAutocompleteProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Async function called on each debounced keystroke to load matching options */
  fetchOptions: (query: string) => Promise<O[]>
  /** Visible label text for the input */
  label: string
  /** HTML id for the input — auto-generated when omitted */
  id?: string
  /** Id placed on the <label> element, for use with aria-labelledby */
  labelId?: string
  /** Hint text shown below the label */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Validation message — only shown when invalid is true */
  message?: string
  /** If false, "(optional)" is appended to the label */
  required?: boolean
  /** Suppresses "(optional)" even when required is false */
  hideOptionalLabel?: boolean
  /** Text prepended to the secondary label */
  secondaryLabel?: string
  /** Placeholder text */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** Disables the input */
  disabled?: boolean
  /** External loading state */
  loading?: boolean
  /** Screen reader text while loading. Default 'Loading' */
  loadingLabel?: string
  /** Message displayed when the fetch returns no results. Default 'No results found' */
  emptyResultsMessage?: string
  /** Debounce delay in ms before fetchOptions is called. Default 300 */
  debounce?: number
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** The maximum width of the field */
  maxWidth?: ComboboxMaxWidth
}

const props = withDefaults(defineProps<AGDSAutocompleteProps<TOption>>(), {
  emptyResultsMessage: 'No results found',
  loadingLabel: 'Loading',
  debounce: 300,
})

const emit = defineEmits<{
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const model = defineModel<TOption | null>()

const comboboxRef = ref<{ focus: () => void } | null>(null)

defineExpose({ focus: () => comboboxRef.value?.focus() })
</script>

<template>
  <AGDSComboboxAsync
    ref="comboboxRef"
    v-bind="props"
    v-model="model"
    :clearable="true"
    :show-dropdown-trigger="false"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <template v-if="$slots.option" #option="slotProps">
      <slot name="option" v-bind="slotProps" />
    </template>
  </AGDSComboboxAsync>
</template>
