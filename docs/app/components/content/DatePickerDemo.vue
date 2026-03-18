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
  <div v-if="!variant || variant === 'default'" style="min-height: 380px">
    <AGDSDatePicker
      v-model="date"
      label="Date of birth"
      :required="true"
    />
  </div>

  <!-- range: date range picker -->
  <div v-else-if="variant === 'range'" style="min-height: 380px">
    <AGDSDatePicker
      v-model="range"
      range
      label="Employment period"
      from-label="Start date"
      to-label="End date"
    />
  </div>

  <!-- hint-validation: hint text and error state -->
  <div v-else-if="variant === 'hint-validation'" style="min-height: 380px">
    <AGDSDatePicker
      v-model="hintDate"
      label="Application date"
      hint="Enter the date you submitted your application"
      :invalid="true"
      message="Enter a valid date"
    />
  </div>

  <!-- min-max: restricted date range -->
  <div v-else-if="variant === 'min-max'" style="min-height: 380px">
    <AGDSDatePicker
      v-model="minMaxDate"
      label="Date issued"
      :min-date="minDate"
      :max-date="maxDate"
      hint="Must be between 1 January 2020 and today"
    />
  </div>

  <!-- year-range: year dropdown in calendar header -->
  <div v-else-if="variant === 'year-range'" style="min-height: 380px">
    <AGDSDatePicker
      v-model="yearRangeDate"
      label="Date of birth"
      :year-range="{ from: 1920, to: new Date().getFullYear() - 18 }"
      hint="You must be 18 or older"
    />
  </div>
</template>
