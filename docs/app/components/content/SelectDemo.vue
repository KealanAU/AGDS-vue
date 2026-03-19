<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'hint' | 'grouped' | 'invalid' | 'disabled' | 'max-widths' | 'block' */
  variant?: string
}>()

const value = ref('')

const countryOptions = [
  { label: 'Australia', value: 'au' },
  { label: 'New Zealand', value: 'nz' },
  { label: 'United Kingdom', value: 'uk' },
]

const stateOptions = [
  { label: 'Australian Capital Territory', value: 'act' },
  { label: 'New South Wales', value: 'nsw' },
  { label: 'Victoria', value: 'vic' },
]

const groupedOptions = [
  {
    label: 'Fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
    ],
  },
]

const singleOption = [{ label: 'Option 1', value: '1' }]
</script>

<template>
  <!-- default -->
  <AGDSSelect
    v-if="!variant || variant === 'default'"
    v-model="value"
    label="Country"
    :options="countryOptions"
    placeholder="Select a country"
    required
  />

  <!-- hint -->
  <AGDSSelect
    v-else-if="variant === 'hint'"
    v-model="value"
    label="State or territory"
    hint="Select the state where you currently reside"
    :options="stateOptions"
    placeholder="Select a state"
    required
  />

  <!-- grouped -->
  <AGDSSelect
    v-else-if="variant === 'grouped'"
    v-model="value"
    label="Produce"
    :options="groupedOptions"
    placeholder="Select an item"
    required
  />

  <!-- invalid -->
  <AGDSSelect
    v-else-if="variant === 'invalid'"
    v-model="value"
    label="Country"
    :options="countryOptions"
    placeholder="Select a country"
    :invalid="true"
    message="Select a country to continue"
    required
  />

  <!-- disabled -->
  <AGDSSelect
    v-else-if="variant === 'disabled'"
    label="Country"
    :options="countryOptions"
    model-value="au"
    disabled
    required
  />

  <!-- max-widths -->
  <div v-else-if="variant === 'max-widths'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSSelect v-model="value" label="Small" max-width="sm" :options="singleOption" required />
    <AGDSSelect v-model="value" label="Medium (default)" max-width="md" :options="singleOption" required />
    <AGDSSelect v-model="value" label="Large" max-width="lg" :options="singleOption" required />
    <AGDSSelect v-model="value" label="Extra large" max-width="xl" :options="singleOption" required />
  </div>

  <!-- block -->
  <AGDSSelect
    v-else-if="variant === 'block'"
    v-model="value"
    label="Country"
    :options="countryOptions"
    block
    required
  />
</template>
