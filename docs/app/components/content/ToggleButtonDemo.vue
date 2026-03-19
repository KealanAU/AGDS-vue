<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'pressed' | 'star' | 'icon-only' | 'variants' | 'disabled' */
  variant?: string
}>()

const flagged = ref(false)
</script>

<template>
  <!-- default -->
  <AGDSToggleButton
    v-if="!variant || variant === 'default'"
    v-model:pressed="flagged"
    label="Flag"
    pressed-label="Flagged"
  />

  <!-- pressed -->
  <AGDSToggleButton
    v-else-if="variant === 'pressed'"
    :pressed="true"
    label="Flag"
    pressed-label="Flagged"
  />

  <!-- star -->
  <div v-else-if="variant === 'star'" style="display: flex; gap: 1rem">
    <AGDSToggleButton :pressed="false" label="Save" pressed-label="Saved" icon-type="star" />
    <AGDSToggleButton :pressed="true" label="Save" pressed-label="Saved" icon-type="star" />
  </div>

  <!-- icon-only -->
  <div v-else-if="variant === 'icon-only'" style="display: flex; gap: 1rem">
    <AGDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" hidden-label />
    <AGDSToggleButton :pressed="true" label="Flag" pressed-label="Flagged" hidden-label />
    <AGDSToggleButton :pressed="false" label="Save" pressed-label="Saved" icon-type="star" hidden-label />
    <AGDSToggleButton :pressed="true" label="Save" pressed-label="Saved" icon-type="star" hidden-label />
  </div>

  <!-- variants -->
  <div v-else-if="variant === 'variants'" style="display: flex; gap: 1rem">
    <AGDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="text" />
    <AGDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="tertiary" />
    <AGDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="secondary" />
  </div>

  <!-- disabled -->
  <div v-else-if="variant === 'disabled'" style="display: flex; gap: 1rem">
    <AGDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" disabled />
    <AGDSToggleButton :pressed="true" label="Flag" pressed-label="Flagged" disabled />
  </div>
</template>
