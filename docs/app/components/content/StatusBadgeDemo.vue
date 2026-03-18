<script setup lang="ts">
defineProps<{
  /** 'default' | 'tones' | 'appearances' */
  variant?: string
}>()
</script>

<template>
  <!-- default: single successHigh badge -->
  <AGDSStatusBadge v-if="!variant || variant === 'default'" tone="successHigh" label="Approved" />

  <!-- tones: a selection of tones across emphasis levels -->
  <div
    v-else-if="variant === 'tones'"
    style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center"
  >
    <AGDSStatusBadge tone="successHigh" label="Completed" />
    <AGDSStatusBadge tone="errorHigh" label="Failed" />
    <AGDSStatusBadge tone="warningMedium" label="Needs review" />
    <AGDSStatusBadge tone="inProgressLow" label="In progress" />
    <AGDSStatusBadge tone="notStartedLow" label="Not started" />
  </div>

  <!-- appearances: regular vs subtle -->
  <div
    v-else-if="variant === 'appearances'"
    style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center"
  >
    <AGDSStatusBadge tone="infoHigh" label="Regular" appearance="regular" />
    <AGDSStatusBadge tone="infoHigh" label="Subtle" appearance="subtle" />
  </div>
</template>
