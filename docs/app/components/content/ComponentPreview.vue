<script setup lang="ts">
defineProps<{
  /** Title for the preview section */
  title?: string
}>()
</script>

<template>
  <div class="component-preview">
    <p v-if="title" class="component-preview__title">{{ title }}</p>
    <div class="component-preview__canvas" role="region" :aria-label="title ? `${title} preview` : 'Component preview'">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.component-preview {
  margin-block: var(--agds-space-6);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-lg);
  overflow: hidden;
}

.component-preview__title {
  margin: 0;
  padding: var(--agds-space-2) var(--agds-space-4);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--agds-color-text-muted);
  background-color: var(--agds-color-bg-subtle);
  border-bottom: 1px solid var(--agds-color-border);
}

.component-preview__canvas {
  padding: var(--agds-space-8) var(--agds-space-6);
  background-color: var(--agds-color-bg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--agds-space-4);
}
</style>
