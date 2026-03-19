<script setup lang="ts" generic="TOption extends DefaultComboboxOption">
import { ref } from 'vue'
import AGDSComboboxAsync from './AGDSComboboxAsync.vue'
import type { DefaultComboboxOption } from './comboboxUtils'
import type { AGDSAutocompleteProps } from './comboboxTypes'

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
