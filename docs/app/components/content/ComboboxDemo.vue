<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'single' | 'multi' | 'clearable' | 'invalid' | 'disabled' */
  variant?: string
}>()

const STATE_OPTIONS = [
  { label: 'Australian Capital Territory', value: 'act' },
  { label: 'New South Wales', value: 'nsw' },
  { label: 'Northern Territory', value: 'nt' },
  { label: 'Queensland', value: 'qld' },
  { label: 'South Australia', value: 'sa' },
  { label: 'Tasmania', value: 'tas' },
  { label: 'Victoria', value: 'vic' },
  { label: 'Western Australia', value: 'wa' },
]

const TOPIC_OPTIONS = [
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Arts and culture', value: 'arts' },
  { label: 'Education', value: 'education' },
  { label: 'Employment', value: 'employment' },
  { label: 'Environment', value: 'environment' },
  { label: 'Health', value: 'health' },
  { label: 'Housing', value: 'housing' },
  { label: 'Immigration', value: 'immigration' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Transport', value: 'transport' },
]

const state = ref(null)
const stateWithClear = ref(null)
const topics = ref([])
const invalidState = ref(null)
const disabledState = ref(null)
</script>

<template>
  <!-- single: basic single-selection combobox -->
  <AGDSCombobox
    v-if="!variant || variant === 'single'"
    v-model="state"
    label="State or territory"
    :options="STATE_OPTIONS"
    placeholder="Select a state or territory"
    :required="true"
  />

  <!-- multi: multi-selection combobox -->
  <AGDSComboboxMulti
    v-else-if="variant === 'multi'"
    v-model="topics"
    label="Topics"
    :options="TOPIC_OPTIONS"
    placeholder="Search topics…"
    hint="Select all that apply"
  />

  <!-- clearable -->
  <AGDSCombobox
    v-else-if="variant === 'clearable'"
    v-model="stateWithClear"
    label="State or territory"
    :options="STATE_OPTIONS"
    placeholder="Select a state or territory"
    clearable
    :required="true"
  />

  <!-- invalid -->
  <AGDSCombobox
    v-else-if="variant === 'invalid'"
    v-model="invalidState"
    label="State or territory"
    :options="STATE_OPTIONS"
    :invalid="true"
    message="Select a state or territory to continue"
    :required="true"
  />

  <!-- disabled -->
  <AGDSCombobox
    v-else-if="variant === 'disabled'"
    v-model="disabledState"
    label="State or territory"
    :options="STATE_OPTIONS"
    placeholder="Select a state or territory"
    disabled
  />
</template>
