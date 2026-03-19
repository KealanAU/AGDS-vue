<script setup lang="ts">
defineProps<{
  /** 'default' | 'directions' | 'external' | 'button' | 'disabled' | 'loading' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSDirectionLink v-if="!variant || variant === 'default'" href="#" direction="right">Next step</AGDSDirectionLink>

  <!-- directions -->
  <div v-else-if="variant === 'directions'" style="display: flex; flex-direction: column; gap: 0.75rem;">
    <AGDSDirectionLink href="#" direction="left">Back</AGDSDirectionLink>
    <AGDSDirectionLink href="#" direction="right">Forward</AGDSDirectionLink>
    <AGDSDirectionLink href="#" direction="up">Top of page</AGDSDirectionLink>
    <AGDSDirectionLink href="#" direction="down">See more</AGDSDirectionLink>
  </div>

  <!-- external -->
  <AGDSDirectionLink v-else-if="variant === 'external'" href="https://www.australia.gov.au" direction="right" external>australia.gov.au</AGDSDirectionLink>

  <!-- button -->
  <div v-else-if="variant === 'button'" style="display: flex; flex-direction: column; gap: 0.75rem;">
    <AGDSDirectionButton direction="right">Next step</AGDSDirectionButton>
    <AGDSDirectionButton direction="left">Previous</AGDSDirectionButton>
  </div>

  <!-- disabled -->
  <AGDSDirectionButton v-else-if="variant === 'disabled'" direction="right" disabled>Next step</AGDSDirectionButton>

  <!-- loading -->
  <AGDSDirectionButton v-else-if="variant === 'loading'" direction="right" loading>Saving…</AGDSDirectionButton>
</template>
