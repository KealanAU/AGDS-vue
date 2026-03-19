<script setup lang="ts">
defineProps<{
  /** 'default' | 'spacing' | 'flex' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSBox v-if="!variant || variant === 'default'" padding="4" display="flex" gap="2" class="demo-box">
    <AGDSBox padding="2" class="demo-box__item">Item A</AGDSBox>
    <AGDSBox padding="2" class="demo-box__item">Item B</AGDSBox>
  </AGDSBox>

  <!-- spacing -->
  <AGDSBox v-else-if="variant === 'spacing'" display="flex" gap="4" padding="4" class="demo-box">
    <AGDSBox padding-x="3" padding-y="2" class="demo-box__item">Horizontal + vertical</AGDSBox>
    <AGDSBox padding="2" class="demo-box__item">Shorthand</AGDSBox>
  </AGDSBox>

  <!-- flex -->
  <AGDSBox v-else-if="variant === 'flex'" display="flex" flex-direction="row" align-items="center" gap="3" class="demo-box">
    <AGDSBox class="demo-box__item demo-box__item--pad">Left</AGDSBox>
    <AGDSBox class="demo-box__item demo-box__item--pad">Centre</AGDSBox>
    <AGDSBox class="demo-box__item demo-box__item--pad">Right</AGDSBox>
  </AGDSBox>
</template>

<style scoped>
.demo-box {
  border: 2px dashed var(--agds-color-border);
  border-radius: 4px;
}

.demo-box__item {
  border: 1px solid var(--agds-color-border);
  border-radius: 4px;
  background: var(--agds-color-bg-shade);
}

.demo-box__item--pad {
  padding: 0.5rem 0.75rem;
}
</style>
