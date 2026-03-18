<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'range' | 'hint-validation' | 'min-max' | 'year-range' */
  variant?: string
}>()

const date = ref(null)
const range = ref({ from: null, to: null })
const hintDate = ref(null)
const minMaxDate = ref(null)
const yearRangeDate = ref(null)

const minDate = new Date(2020, 0, 1)
const maxDate = new Date()
</script>

<template>
  <!-- default: basic single date picker -->
  <AGDSDatePicker
    v-if="!variant || variant === 'default'"
    v-model="date"
    label="Date of birth"
    :required="true"
  />

  <!-- range: date range picker -->
  <AGDSDatePicker
    v-else-if="variant === 'range'"
    v-model="range"
    range
    label="Employment period"
    from-label="Start date"
    to-label="End date"
  />

  <!-- hint-validation: hint text and error state -->
  <AGDSDatePicker
    v-else-if="variant === 'hint-validation'"
    v-model="hintDate"
    label="Application date"
    hint="Enter the date you submitted your application"
    :invalid="true"
    message="Enter a valid date"
  />

  <!-- min-max: restricted date range -->
  <AGDSDatePicker
    v-else-if="variant === 'min-max'"
    v-model="minMaxDate"
    label="Date issued"
    :min-date="minDate"
    :max-date="maxDate"
    hint="Must be between 1 January 2020 and today"
  />

  <!-- year-range: year dropdown in calendar header -->
  <AGDSDatePicker
    v-else-if="variant === 'year-range'"
    v-model="yearRangeDate"
    label="Date of birth"
    :year-range="{ from: 1920, to: new Date().getFullYear() - 18 }"
    hint="You must be 18 or older"
  />
</template>
