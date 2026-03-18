<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'tones' | 'dismissible' */
  variant?: string
}>()

const show = ref(true)
</script>

<template>
  <!-- default: single info alert -->
  <AGDSPageAlert v-if="!variant || variant === 'default'" tone="info" title="Application received">
    <p>Your application has been submitted. We will be in touch within 5 business days.</p>
  </AGDSPageAlert>

  <!-- tones: all four tones stacked -->
  <AGDSStack v-else-if="variant === 'tones'" :gap="1">
    <AGDSPageAlert tone="info" title="Information" />
    <AGDSPageAlert tone="success" title="Success" />
    <AGDSPageAlert tone="warning" title="Warning" />
    <AGDSPageAlert tone="error" title="Error" />
  </AGDSStack>

  <!-- dismissible: alert that can be closed -->
  <div v-else-if="variant === 'dismissible'">
    <AGDSPageAlert
      v-if="show"
      tone="info"
      title="Session expiring"
      :on-close="() => (show = false)"
    >
      <p>Your session will expire in 5 minutes. Save your work to avoid losing progress.</p>
    </AGDSPageAlert>
    <p v-else>
      Alert dismissed.
      <button type="button" @click="show = true">Reset</button>
    </p>
  </div>
</template>
