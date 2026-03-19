<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'standalone' | 'group' | 'hint' | 'invalid' | 'disabled' | 'size' */
  variant?: string
}>()

const plan = ref('standard')
const contact = ref('email')
const frequency = ref('daily')
</script>

<template>
  <!-- standalone -->
  <AGDSRadio v-if="variant === 'standalone'" :model-value="'yes'" value="yes">Yes, I agree</AGDSRadio>

  <!-- group -->
  <AGDSRadioGroup v-else-if="!variant || variant === 'group'" legend="Preferred contact method" name="contact">
    <AGDSRadio v-model="contact" value="email">Email</AGDSRadio>
    <AGDSRadio v-model="contact" value="phone">Phone</AGDSRadio>
    <AGDSRadio v-model="contact" value="post">Post</AGDSRadio>
  </AGDSRadioGroup>

  <!-- hint -->
  <AGDSRadioGroup v-else-if="variant === 'hint'" legend="Notification frequency" name="frequency">
    <template #hint>How often would you like to receive updates?</template>
    <AGDSRadio v-model="frequency" value="daily">Daily</AGDSRadio>
    <AGDSRadio v-model="frequency" value="weekly">Weekly</AGDSRadio>
    <AGDSRadio v-model="frequency" value="never">Never</AGDSRadio>
  </AGDSRadioGroup>

  <!-- invalid -->
  <AGDSRadioGroup
    v-else-if="variant === 'invalid'"
    legend="Select an option"
    name="option"
    :invalid="true"
    message-id="option-error"
  >
    <template #message><span id="option-error">Please select an option to continue.</span></template>
    <AGDSRadio :model-value="''" value="a">Option A</AGDSRadio>
    <AGDSRadio :model-value="''" value="b">Option B</AGDSRadio>
  </AGDSRadioGroup>

  <!-- disabled -->
  <AGDSRadioGroup v-else-if="variant === 'disabled'" legend="Status" name="status" disabled>
    <AGDSRadio v-model="plan" value="active">Active</AGDSRadio>
    <AGDSRadio v-model="plan" value="inactive">Inactive</AGDSRadio>
  </AGDSRadioGroup>

  <!-- size -->
  <div v-else-if="variant === 'size'" style="display: flex; flex-direction: column; gap: 1.5rem">
    <AGDSRadioGroup legend="Small" name="size-sm">
      <AGDSRadio size="sm" :model-value="'a'" value="a">Option A</AGDSRadio>
      <AGDSRadio size="sm" :model-value="'a'" value="b">Option B</AGDSRadio>
    </AGDSRadioGroup>
    <AGDSRadioGroup legend="Medium (default)" name="size-md">
      <AGDSRadio size="md" :model-value="'a'" value="a">Option A</AGDSRadio>
      <AGDSRadio size="md" :model-value="'a'" value="b">Option B</AGDSRadio>
    </AGDSRadioGroup>
  </div>
</template>
