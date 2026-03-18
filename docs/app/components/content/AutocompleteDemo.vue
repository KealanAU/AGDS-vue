<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'placeholder' | 'clearable' | 'invalid' | 'disabled' */
  variant?: string
}>()

const COUNTRIES = [
  { label: 'Australia', value: 'AU' },
  { label: 'Canada', value: 'CA' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' },
  { label: 'India', value: 'IN' },
  { label: 'Japan', value: 'JP' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Spain', value: 'ES' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'United States', value: 'US' },
]

function mockFetch(query: string) {
  return new Promise<typeof COUNTRIES>((resolve) => {
    setTimeout(() => {
      const q = query.toLowerCase()
      resolve(COUNTRIES.filter((c) => c.label.toLowerCase().includes(q)))
    }, 200)
  })
}

const selected = ref(null)
const selectedClearable = ref(null)
const selectedDisabled = ref(null)
</script>

<template>
  <!-- default: basic async autocomplete -->
  <div v-if="!variant || variant === 'default'" style="min-height: 320px">
    <AGDSComboboxAsync
      v-model="selected"
      label="Search countries"
      placeholder="e.g. Australia"
      hint="Start typing to see results"
      :fetch-options="mockFetch"
    />
  </div>

  <!-- placeholder -->
  <AGDSComboboxAsync
    v-else-if="variant === 'placeholder'"
    v-model="selected"
    label="Search locations"
    placeholder="Start typing…"
    :fetch-options="mockFetch"
  />

  <!-- clearable -->
  <AGDSComboboxAsync
    v-else-if="variant === 'clearable'"
    v-model="selectedClearable"
    label="Search countries"
    clearable
    :fetch-options="mockFetch"
  />

  <!-- invalid -->
  <AGDSComboboxAsync
    v-else-if="variant === 'invalid'"
    v-model="selected"
    label="Search countries"
    :invalid="true"
    message="Please select a country to continue"
    :required="true"
    :fetch-options="mockFetch"
  />

  <!-- disabled -->
  <AGDSComboboxAsync
    v-else-if="variant === 'disabled'"
    v-model="selectedDisabled"
    label="Search countries"
    disabled
    :fetch-options="mockFetch"
  />
</template>
