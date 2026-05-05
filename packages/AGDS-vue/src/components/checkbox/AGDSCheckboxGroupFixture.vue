<script setup lang="ts">
import AGDSCheckbox from './AGDSCheckbox.vue'
import AGDSCheckboxGroup from './AGDSCheckboxGroup.vue'
import type { AGDSCheckboxGroupProps } from './AGDSCheckboxGroup.vue'

const props = withDefaults(defineProps<AGDSCheckboxGroupProps>(), {
  legend: 'Colours',
  invalid: false,
  required: false,
  disabled: false,
})
</script>

<template>
  <AGDSCheckboxGroup v-bind="props">
    <AGDSCheckbox id="opt-red" name="colours" value="red">Red</AGDSCheckbox>
    <AGDSCheckbox id="opt-blue" name="colours" value="blue">Blue</AGDSCheckbox>
  </AGDSCheckboxGroup>
</template>
