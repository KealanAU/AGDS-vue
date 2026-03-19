<script setup lang="ts">
defineProps<{
  /** 'default' | 'page' | 'section' | 'background' | 'bleed' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSContent v-if="!variant || variant === 'default'" class="demo-band">
    <p>Page content goes here.</p>
  </AGDSContent>

  <!-- page -->
  <AGDSPageContent v-else-if="variant === 'page'" class="demo-band">
    <h1>Page heading</h1>
    <p>This content has top and bottom page padding applied.</p>
  </AGDSPageContent>

  <!-- section -->
  <AGDSSectionContent v-else-if="variant === 'section'" class="demo-band">
    <h2>Section heading</h2>
    <p>This content has section vertical padding applied.</p>
  </AGDSSectionContent>

  <!-- background -->
  <div v-else-if="variant === 'background'">
    <AGDSSectionContent background="body" class="demo-band">
      <p>Body background</p>
    </AGDSSectionContent>
    <AGDSSectionContent background="bodyAlt" class="demo-band">
      <p>Body alt background</p>
    </AGDSSectionContent>
  </div>

  <!-- bleed -->
  <AGDSSectionContent v-else-if="variant === 'bleed'" class="demo-band">
    <AGDSContentBleed>
      <div style="background: var(--agds-color-bg-subtle); padding: 1rem; border: 1px dashed var(--agds-color-border);">
        This element bleeds to the edges of the section band.
      </div>
    </AGDSContentBleed>
  </AGDSSectionContent>
</template>

<style scoped>
.demo-band {
  border: 2px dashed var(--agds-color-border);
}
</style>
