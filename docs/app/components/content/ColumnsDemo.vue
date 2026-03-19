<script setup lang="ts">
defineProps<{
  /** 'default' | 'col-count' | 'offset' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSColumns v-if="!variant || variant === 'default'" :gap="4">
    <AGDSColumn :span="6" class="demo-col">Left half</AGDSColumn>
    <AGDSColumn :span="6" class="demo-col">Right half</AGDSColumn>
  </AGDSColumns>

  <!-- col-count -->
  <AGDSColumns v-else-if="variant === 'col-count'" :cols="4" :gap="3">
    <AGDSColumn class="demo-col">1</AGDSColumn>
    <AGDSColumn class="demo-col">2</AGDSColumn>
    <AGDSColumn class="demo-col">3</AGDSColumn>
    <AGDSColumn class="demo-col">4</AGDSColumn>
  </AGDSColumns>

  <!-- offset -->
  <AGDSColumns v-else-if="variant === 'offset'" :gap="3" class="demo-grid">
    <AGDSColumn :start="3" :span="8" class="demo-col">Centred content</AGDSColumn>
  </AGDSColumns>
</template>

<style scoped>
.demo-grid {
  border: 2px dashed var(--agds-color-border);
  border-radius: 4px;
  padding: 0.5rem;
}

.demo-col {
  border: 1px solid var(--agds-color-border);
  border-radius: 4px;
  background: var(--agds-color-bg-shade);
  padding: 0.75rem;
}
</style>
