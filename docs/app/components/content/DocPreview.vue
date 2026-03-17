<script setup lang="ts">
defineProps<{
  /** Optional label shown above the preview */
  label?: string
}>()
</script>

<template>
  <div class="doc-preview">
    <p v-if="label" class="doc-preview__label">{{ label }}</p>
    <div class="doc-preview__canvas">
      <ClientOnly>
        <slot />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.doc-preview {
  margin-block: var(--agds-space-4);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-lg);
  overflow: hidden;
}

.doc-preview__label {
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

.doc-preview__canvas {
  padding: var(--agds-space-8) var(--agds-space-6);
  background-color: var(--agds-color-bg);
  background-image: repeating-linear-gradient(
    -45deg,
    var(--agds-color-bg-subtle) 0px,
    var(--agds-color-bg-subtle) 2px,
    transparent 2px,
    transparent 12px
  );
}
</style>
