<script setup lang="ts">
defineProps<{
  /** 'default' | 'with-divider' | 'body-alt' */
  variant?: string
}>()
</script>

<template>
  <!-- default: basic footer -->
  <AGDSFooter v-if="!variant || variant === 'default'">
    <p>
      <a href="#">Privacy</a> ·
      <a href="#">Accessibility</a> ·
      <a href="#">Contact</a>
    </p>
    <p>© Commonwealth of Australia</p>
  </AGDSFooter>

  <!-- with-divider: accent divider separating sections -->
  <AGDSFooter v-else-if="variant === 'with-divider'">
    <nav aria-label="Footer">
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; gap: 1rem; flex-wrap: wrap;">
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Accessibility</a></li>
        <li><a href="#">Copyright</a></li>
      </ul>
    </nav>
    <AGDSFooterDivider />
    <p style="margin: 0; font-size: var(--agds-font-size-sm); color: var(--agds-color-text-muted);">
      © Commonwealth of Australia, Department of Agriculture, Fisheries and Forestry
    </p>
  </AGDSFooter>

  <!-- body-alt: footer on off-white surface -->
  <AGDSFooter v-else-if="variant === 'body-alt'" background="bodyAlt">
    <p>
      <a href="#">Privacy</a> ·
      <a href="#">Accessibility</a> ·
      <a href="#">Contact</a>
    </p>
    <p>© Commonwealth of Australia</p>
  </AGDSFooter>
</template>
