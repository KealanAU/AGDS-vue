<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  /** 'default' | 'disabled' | 'indeterminate' | 'size' | 'group' | 'validation' */
  variant?: string
}>()

const agreed = ref(false)
const items = ref([false, true, false])

const allChecked = computed(() => items.value.every(Boolean))
const someChecked = computed(() => items.value.some(Boolean))
const isIndeterminate = computed(() => someChecked.value && !allChecked.value)

function toggleAll() {
  const next = !allChecked.value
  items.value = items.value.map(() => next)
}

const selected = ref({ finance: false, health: false, education: false })
</script>

<template>
  <!-- default: basic checkbox with v-model -->
  <AGDSCheckbox v-if="!variant || variant === 'default'" v-model="agreed">
    I agree to the terms and conditions
  </AGDSCheckbox>

  <!-- disabled -->
  <div v-else-if="variant === 'disabled'" style="display: flex; flex-direction: column; gap: 0.5rem">
    <AGDSCheckbox :model-value="false" disabled>Unchecked disabled</AGDSCheckbox>
    <AGDSCheckbox :model-value="true" disabled>Checked disabled</AGDSCheckbox>
  </div>

  <!-- indeterminate -->
  <div v-else-if="variant === 'indeterminate'" style="display: flex; flex-direction: column; gap: 0.5rem">
    <AGDSCheckbox
      :model-value="allChecked"
      :indeterminate="isIndeterminate"
      @update:model-value="toggleAll"
    >
      Select all
    </AGDSCheckbox>
    <div style="padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem">
      <AGDSCheckbox v-model="items[0]">Option A</AGDSCheckbox>
      <AGDSCheckbox v-model="items[1]">Option B</AGDSCheckbox>
      <AGDSCheckbox v-model="items[2]">Option C</AGDSCheckbox>
    </div>
  </div>

  <!-- size -->
  <div v-else-if="variant === 'size'" style="display: flex; flex-direction: column; gap: 0.5rem">
    <AGDSCheckbox size="sm">Small checkbox</AGDSCheckbox>
    <AGDSCheckbox size="md">Medium checkbox (default)</AGDSCheckbox>
  </div>

  <!-- group -->
  <AGDSCheckboxGroup v-else-if="variant === 'group'" legend="Select topics" name="topics">
    <AGDSCheckbox v-model="selected.finance">Finance</AGDSCheckbox>
    <AGDSCheckbox v-model="selected.health">Health</AGDSCheckbox>
    <AGDSCheckbox v-model="selected.education">Education</AGDSCheckbox>
  </AGDSCheckboxGroup>

  <!-- validation -->
  <AGDSCheckboxGroup
    v-else-if="variant === 'validation'"
    legend="Select at least one topic"
    name="topics-invalid"
    :invalid="true"
    message-id="topics-error"
  >
    <template #hint>Choose all that apply.</template>
    <template #message>
      <span id="topics-error">Please select at least one topic.</span>
    </template>
    <AGDSCheckbox>Finance</AGDSCheckbox>
    <AGDSCheckbox>Health</AGDSCheckbox>
  </AGDSCheckboxGroup>
</template>
