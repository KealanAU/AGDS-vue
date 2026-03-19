<script setup lang="ts">
defineProps<{
  /** 'default' | 'column' | 'centered' | 'inline' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSFlex v-if="!variant || variant === 'default'" gap="3" class="demo-flex">
    <span class="demo-item">Item one</span>
    <span class="demo-item">Item two</span>
    <span class="demo-item">Item three</span>
  </AGDSFlex>

  <!-- column -->
  <AGDSFlex v-else-if="variant === 'column'" flex-direction="column" gap="2" class="demo-flex">
    <span class="demo-item">First</span>
    <span class="demo-item">Second</span>
    <span class="demo-item">Third</span>
  </AGDSFlex>

  <!-- centered -->
  <AGDSFlex
    v-else-if="variant === 'centered'"
    align-items="center"
    justify-content="center"
    gap="4"
    class="demo-flex demo-flex--fixed-height"
  >
    <span class="demo-item">Centred</span>
  </AGDSFlex>

  <!-- inline -->
  <p v-else-if="variant === 'inline'" class="demo-inline-wrap">
    Text before
    <AGDSFlex inline gap="1" align-items="center">
      <span class="demo-item">inline</span>
      <span class="demo-item">flex</span>
    </AGDSFlex>
    text after.
  </p>
</template>

<style scoped>
.demo-flex {
  border: 2px dashed var(--agds-color-border);
  border-radius: 4px;
  padding: 0.75rem;
}

.demo-flex--fixed-height {
  height: 6rem;
}

.demo-item {
  border: 1px solid var(--agds-color-border);
  border-radius: 4px;
  background: var(--agds-color-bg-shade);
  padding: 0.5rem 0.75rem;
}

.demo-inline-wrap {
  margin: 0;
}
</style>
