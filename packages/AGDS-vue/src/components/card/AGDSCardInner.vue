<script setup lang="ts">
// CardInner provides the standard padded content area inside a card.
// It intentionally has no props — padding and layout come from CSS tokens.
</script>

<template>
  <div class="agds-card-inner">
    <slot />
  </div>
</template>

<style scoped>
.agds-card-inner {
  padding: var(--agds-card-padding);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
