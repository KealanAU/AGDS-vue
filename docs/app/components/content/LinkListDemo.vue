<script setup lang="ts">
defineProps<{
  /** 'default' | 'horizontal' | 'new-tab' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSLinkList v-if="!variant || variant === 'default'">
    <AGDSLinkListItem href="/" label="Home" />
    <AGDSLinkListItem href="/about" label="About us" />
    <AGDSLinkListItem href="/contact" label="Contact" />
  </AGDSLinkList>

  <!-- horizontal -->
  <AGDSLinkList v-else-if="variant === 'horizontal'" horizontal>
    <AGDSLinkListItem href="/privacy" label="Privacy" />
    <AGDSLinkListItem href="/accessibility" label="Accessibility" />
    <AGDSLinkListItem href="/sitemap" label="Sitemap" />
  </AGDSLinkList>

  <!-- new-tab -->
  <AGDSLinkList v-else-if="variant === 'new-tab'">
    <AGDSLinkListItem href="https://www.apsjobs.gov.au" label="APS Jobs" target="_blank" />
    <AGDSLinkListItem href="https://my.gov.au" label="My Gov" target="_blank" />
  </AGDSLinkList>
</template>
