<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <AGDSFormStack>
    <AGDSTextInput label="First name" />
    <AGDSTextInput label="Last name" />
    <AGDSTextInput label="Email address" type="email" />
  </AGDSFormStack>
</template>
