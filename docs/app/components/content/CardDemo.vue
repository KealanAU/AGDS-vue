<script setup lang="ts">
defineProps<{
  /** 'default' | 'clickable' | 'footer' | 'footer-outside' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSCard v-if="!variant || variant === 'default'">
    <AGDSCardHeader title="Apply for a grant" subtitle="Closes 30 June 2026" />
    <AGDSCardInner>
      <p style="margin: 0;">Funding is available for eligible small businesses in regional areas.</p>
    </AGDSCardInner>
  </AGDSCard>

  <!-- clickable -->
  <AGDSCard v-else-if="variant === 'clickable'" clickable>
    <AGDSCardHeader title="Regional business grants">
      <template #link>
        <AGDSCardLink href="#">Learn more</AGDSCardLink>
      </template>
    </AGDSCardHeader>
    <AGDSCardInner>
      <p style="margin: 0;">Up to $50,000 available for eligible businesses in qualifying regions.</p>
    </AGDSCardInner>
  </AGDSCard>

  <!-- footer -->
  <AGDSCard v-else-if="variant === 'footer'">
    <AGDSCardHeader title="Environmental grants" />
    <AGDSCardInner>
      <p style="margin: 0;">Grants for sustainability projects in the ACT region.</p>
    </AGDSCardInner>
    <template #footer>
      <AGDSCardFooter>
        <AGDSButton size="sm">Apply now</AGDSButton>
      </AGDSCardFooter>
    </template>
  </AGDSCard>

  <!-- footer-outside -->
  <AGDSCard v-else-if="variant === 'footer-outside'" footer-outside>
    <AGDSCardHeader title="Service update" />
    <AGDSCardInner>
      <p style="margin: 0;">Scheduled maintenance on 15 March.</p>
    </AGDSCardInner>
    <template #footer>
      <AGDSCardFooter>
        <span>Last updated: 1 March 2026</span>
      </AGDSCardFooter>
    </template>
  </AGDSCard>
</template>
