<script setup lang="ts">
defineProps<{
  /** 'default' | 'external' | 'in-context' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <p v-if="!variant || variant === 'default'">
    Read the <AGDSTextLink href="/guides/getting-started">getting started guide</AGDSTextLink> before continuing.
  </p>

  <!-- external -->
  <p v-else-if="variant === 'external'">
    Visit the <AGDSTextLinkExternal href="https://www.australia.gov.au">australia.gov.au</AGDSTextLinkExternal> website for more information.
  </p>

  <!-- in-context -->
  <AGDSText v-else-if="variant === 'in-context'" as="p" font-size="md">
    You must
    <AGDSTextLink href="/eligibility">check your eligibility</AGDSTextLink>
    before submitting. For help, contact
    <AGDSTextLinkExternal href="https://www.servicesaustralia.gov.au">Services Australia</AGDSTextLinkExternal>.
  </AGDSText>
</template>
