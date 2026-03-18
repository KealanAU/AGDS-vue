<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'invalid' */
  variant?: string
}>()

const files = ref([])
const invalidFiles = ref([])
</script>

<template>
  <!-- default: basic file upload -->
  <AGDSFileUpload
    v-if="!variant || variant === 'default'"
    label="Attach supporting documents"
    v-model="files"
  />

  <!-- invalid: error state -->
  <AGDSFileUpload
    v-else-if="variant === 'invalid'"
    label="Upload document"
    v-model="invalidFiles"
    :invalid="true"
    message="You must upload at least one document"
  />
</template>
