<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSGroupedFields v-if="!variant || variant === 'default'" legend="Date range">
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" label="From" placeholder="DD/MM/YYYY" />
      <AGDSTextInput v-bind="field2Props" label="To" placeholder="DD/MM/YYYY" />
    </template>
  </AGDSGroupedFields>

  <!-- with-hint -->
  <AGDSGroupedFields
    v-else-if="variant === 'with-hint'"
    legend="Date range"
    hint="Enter dates in DD/MM/YYYY format"
  >
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" label="From" placeholder="DD/MM/YYYY" />
      <AGDSTextInput v-bind="field2Props" label="To" placeholder="DD/MM/YYYY" />
    </template>
  </AGDSGroupedFields>

  <!-- field-1-invalid -->
  <AGDSGroupedFields
    v-else-if="variant === 'field-1-invalid'"
    legend="Date range"
    :field1-invalid="true"
    message="Enter a valid date range"
    hint="Enter dates in DD/MM/YYYY format"
  >
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" label="From" :invalid="true" placeholder="DD/MM/YYYY" />
      <AGDSTextInput v-bind="field2Props" label="To" placeholder="DD/MM/YYYY" />
    </template>
  </AGDSGroupedFields>

  <!-- hidden-legend -->
  <AGDSGroupedFields
    v-else-if="variant === 'hidden-legend'"
    legend="Date range"
    :visually-hide-legend="true"
  >
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" label="From" placeholder="DD/MM/YYYY" />
      <AGDSTextInput v-bind="field2Props" label="To" placeholder="DD/MM/YYYY" />
    </template>
  </AGDSGroupedFields>
</template>
