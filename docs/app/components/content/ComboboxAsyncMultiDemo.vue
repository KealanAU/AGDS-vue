<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'validation' | 'disabled' */
  variant?: string
}>()

const SERVICES = [
  { label: 'Age Pension', value: 'age-pension' },
  { label: 'Child Care Subsidy', value: 'child-care-subsidy' },
  { label: 'Disability Support Pension', value: 'disability-support-pension' },
  { label: 'Family Tax Benefit', value: 'family-tax-benefit' },
  { label: 'JobSeeker Payment', value: 'jobseeker' },
  { label: 'Medicare', value: 'medicare' },
  { label: 'Parental Leave Pay', value: 'parental-leave-pay' },
  { label: 'Youth Allowance', value: 'youth-allowance' },
]

function mockFetch(query: string) {
  return new Promise<typeof SERVICES>((resolve) => {
    setTimeout(() => {
      const q = query.toLowerCase()
      resolve(SERVICES.filter((s) => s.label.toLowerCase().includes(q)))
    }, 200)
  })
}

const selected = ref([])
const selectedValidation = ref([])
const submitted = ref(false)
</script>

<template>
  <!-- default: basic async multi-select -->
  <div v-if="!variant || variant === 'default'" style="min-height: 320px">
    <AGDSComboboxAsyncMulti
      v-model="selected"
      label="Services"
      :fetch-options="mockFetch"
      placeholder="Search services…"
      hint="Start typing to see results"
    />
  </div>

  <!-- validation -->
  <div v-else-if="variant === 'validation'" style="min-height: 320px">
    <AGDSComboboxAsyncMulti
      v-model="selectedValidation"
      label="Services"
      :fetch-options="mockFetch"
      :required="true"
      :invalid="selectedValidation.length === 0 && submitted"
      message="Select at least one service"
      hint="You can select multiple services"
      placeholder="Search services…"
    />
    <button
      type="button"
      style="margin-top: 0.75rem"
      @click="submitted = true"
    >
      Submit
    </button>
  </div>

  <!-- disabled -->
  <AGDSComboboxAsyncMulti
    v-else-if="variant === 'disabled'"
    v-model="selected"
    label="Services"
    disabled
    :fetch-options="mockFetch"
    placeholder="Search services…"
  />
</template>
