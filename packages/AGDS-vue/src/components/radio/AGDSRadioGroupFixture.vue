<script setup lang="ts">
import { ref, watch } from 'vue'
import AGDSRadio from './AGDSRadio.vue'
import AGDSRadioGroup from './AGDSRadioGroup.vue'
import type { AGDSRadioGroupProps } from './AGDSRadioGroup.vue'

export interface AGDSRadioGroupFixtureProps extends AGDSRadioGroupProps {
  /** The currently selected radio value */
  selectedValue?: string
}

const props = withDefaults(defineProps<AGDSRadioGroupFixtureProps>(), {
  legend: 'Payment method',
  name: 'payment',
  invalid: false,
  required: false,
  disabled: false,
  selectedValue: '',
})

const modelValue = ref(props.selectedValue)
watch(() => props.selectedValue, (v) => { modelValue.value = v })
</script>

<template>
  <AGDSRadioGroup
    :legend="props.legend"
    :name="props.name"
    :invalid="props.invalid"
    :required="props.required"
    :disabled="props.disabled"
    :message-id="props.messageId"
    :message="props.message"
    :hint="props.hint"
  >
    <AGDSRadio id="opt-card" value="card" :model-value="modelValue">Credit card</AGDSRadio>
    <AGDSRadio id="opt-bank" value="bank" :model-value="modelValue">Bank transfer</AGDSRadio>
    <AGDSRadio id="opt-cash" value="cash" :model-value="modelValue">Cash</AGDSRadio>
  </AGDSRadioGroup>
</template>
