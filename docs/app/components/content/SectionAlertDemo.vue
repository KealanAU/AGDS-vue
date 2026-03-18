<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'tones' | 'dismissible' */
  variant?: string
}>()

const show = ref(true)
</script>

<template>
  <!-- default: single errorHigh alert with body content -->
  <AGDSSectionAlert
    v-if="!variant || variant === 'default'"
    tone="errorHigh"
    title="Unable to save changes"
  >
    <p>Check the highlighted fields and try again.</p>
  </AGDSSectionAlert>

  <!-- tones: selected tones stacked -->
  <AGDSStack v-else-if="variant === 'tones'" :gap="2">
    <AGDSSectionAlert tone="errorHigh" title="Error — High" />
    <AGDSSectionAlert tone="successMedium" title="Success — Medium" />
    <AGDSSectionAlert tone="infoLow" title="Info — Low" />
    <AGDSSectionAlert tone="inProgressLow" title="In progress" />
  </AGDSStack>

  <!-- dismissible: alert with close button -->
  <div v-else-if="variant === 'dismissible'">
    <AGDSSectionAlert
      v-if="show"
      tone="infoMedium"
      title="Your draft has been saved"
      :on-close="() => (show = false)"
    />
    <p v-else>
      Alert dismissed.
      <button type="button" @click="show = true">Reset</button>
    </p>
  </div>
</template>
