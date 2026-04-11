<script setup lang="ts">
defineProps<{ variant?: string }>()
</script>

<template>
  <AGDSFieldset v-if="!variant || variant === 'default'" legend="Delivery address">
    <AGDSTextInput label="Street address" />
    <AGDSTextInput label="City" />
    <AGDSSelect
      label="State"
      :options="[{ label: 'NSW', value: 'nsw' }, { label: 'VIC', value: 'vic' }, { label: 'QLD', value: 'qld' }]"
    />
  </AGDSFieldset>
  <AGDSFieldset
    v-else-if="variant === 'with-hint'"
    legend="Contact details"
    hint="We will use these details to send your confirmation."
  >
    <AGDSTextInput label="Email address" type="email" />
    <AGDSTextInput label="Phone number" type="tel" />
  </AGDSFieldset>
</template>
