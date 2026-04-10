<script setup lang="ts">
defineProps<{
  /** 'default' | 'tones' | 'variants' | 'on-body-alt' */
  variant?: string
}>()
</script>

<template>
  <!-- default: single neutral callout -->
  <AGDSCallout v-if="!variant || variant === 'default'" title="Important notice">
    <p style="margin: 0">Your application must be submitted before 5pm AEST on the closing date.</p>
  </AGDSCallout>

  <!-- tones: neutral and info stacked -->
  <div v-else-if="variant === 'tones'" style="display: flex; flex-direction: column; gap: 1rem">
    <AGDSCallout tone="neutral" title="Neutral">
      <p style="margin: 0">This is a neutral callout for general supplementary information.</p>
    </AGDSCallout>
    <AGDSCallout tone="info" title="Information">
      <p style="margin: 0">This is an informational callout. An info icon is shown automatically.</p>
    </AGDSCallout>
  </div>

  <!-- variants: compact, regular, feature stacked -->
  <div v-else-if="variant === 'variants'" style="display: flex; flex-direction: column; gap: 1rem">
    <AGDSCallout variant="compact" title="Compact">
      <p style="margin: 0">Compact variant for inline or dense contexts.</p>
    </AGDSCallout>
    <AGDSCallout variant="regular" title="Regular">
      <p style="margin: 0">Regular variant — the standard choice for page content.</p>
    </AGDSCallout>
    <AGDSCallout variant="feature" title="Feature">
      <p style="margin: 0">Feature variant for high-visibility callouts.</p>
    </AGDSCallout>
  </div>

  <!-- on-body-alt: callout on an off-white background -->
  <div
    v-else-if="variant === 'on-body-alt'"
    style="background-color: var(--agds-color-bg-subtle); padding: 1.5rem; border-radius: 0.25rem"
  >
    <AGDSCallout on-body-alt title="Note">
      <p style="margin: 0">This callout is on a bodyAlt (off-white) surface.</p>
    </AGDSCallout>
  </div>
</template>
