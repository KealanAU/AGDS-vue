<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' */
  variant?: string
}>()

const time = ref(null)
</script>

<template>
  <AGDSTimePicker v-if="!variant || variant === 'default'" v-model="time" label="Appointment time" />
</template>
