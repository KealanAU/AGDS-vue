<script setup lang="ts">
defineProps<{
  /** 'default' | 'icon-before' | 'multiple' */
  variant?: string
}>()
</script>

<template>
  <!-- default: basic usage -->
  <AGDSDetails v-if="!variant || variant === 'default'" label="What documents do I need?">
    <p>You will need to provide two forms of identification, including one government-issued photo ID such as a passport or driver's licence.</p>
  </AGDSDetails>

  <!-- icon-before: with info icon -->
  <AGDSDetails
    v-else-if="variant === 'icon-before'"
    label="Privacy information"
    icon-before
  >
    <p>We collect your personal information to process your application in accordance with the Privacy Act 1988.</p>
  </AGDSDetails>

  <!-- multiple: three independent disclosures -->
  <div
    v-else-if="variant === 'multiple'"
    style="display: flex; flex-direction: column; gap: 1rem;"
  >
    <AGDSDetails label="Eligibility criteria">
      <p>You must be an Australian citizen, permanent resident, or eligible visa holder.</p>
    </AGDSDetails>
    <AGDSDetails label="How to apply">
      <p>Complete the online form and attach supporting documents before the closing date.</p>
    </AGDSDetails>
    <AGDSDetails label="After you apply">
      <p>You will receive a confirmation email within 2 business days of submitting your application.</p>
    </AGDSDetails>
  </div>
</template>
