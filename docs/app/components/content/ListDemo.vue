<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- default: unordered list -->
  <AGDSUnorderedList v-if="!variant || variant === 'default'">
    <AGDSListItem>Australian citizen or permanent resident</AGDSListItem>
    <AGDSListItem>Aged 18 or over</AGDSListItem>
    <AGDSListItem>Not currently receiving another benefit</AGDSListItem>
  </AGDSUnorderedList>

  <!-- ordered: ordered list -->
  <AGDSOrderedList v-else-if="variant === 'ordered'">
    <AGDSListItem>Create a myGov account</AGDSListItem>
    <AGDSListItem>Verify your identity online</AGDSListItem>
    <AGDSListItem>Link your government services</AGDSListItem>
  </AGDSOrderedList>

  <!-- nested: unordered list with nested list -->
  <AGDSUnorderedList v-else-if="variant === 'nested'">
    <AGDSListItem>
      Required documents
      <AGDSUnorderedList>
        <AGDSListItem>Passport or birth certificate</AGDSListItem>
        <AGDSListItem>Proof of address</AGDSListItem>
      </AGDSUnorderedList>
    </AGDSListItem>
    <AGDSListItem>Application form</AGDSListItem>
  </AGDSUnorderedList>
</template>
