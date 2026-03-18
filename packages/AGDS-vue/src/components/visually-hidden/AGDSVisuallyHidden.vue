<script setup lang="ts">
export interface AGDSVisuallyHiddenProps {
  /** HTML element to render. Defaults to 'span' for inline use. */
  as?: string
}

withDefaults(defineProps<AGDSVisuallyHiddenProps>(), {
  as: 'span',
})
</script>

<template>
  <component :is="as" class="agds-visually-hidden">
    <slot />
  </component>
</template>

<style scoped>
.agds-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
