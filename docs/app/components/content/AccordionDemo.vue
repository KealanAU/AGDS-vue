<script setup lang="ts">
defineProps<{
  /** 'default' | 'single' | 'default-open' | 'disabled' | 'indent' */
  variant?: string
}>()
</script>

<template>
  <!-- default: multiple open, basic usage -->
  <AGDSAccordion v-if="!variant || variant === 'default'">
    <AGDSAccordionItem value="eligibility" title="Eligibility requirements">
      <p>You must be an Australian citizen or permanent resident to be eligible.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="documents" title="Required documents">
      <p>Bring two forms of photo identification and proof of address.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="timeline" title="Processing timeline">
      <p>Applications are processed within 10 business days of receipt.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>

  <!-- single: only one item open at a time -->
  <AGDSAccordion v-else-if="variant === 'single'" type="single" :collapsible="true">
    <AGDSAccordionItem value="a" title="Step 1 — Create account">
      <p>Create your myGov account using your email address.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="b" title="Step 2 — Verify identity">
      <p>Verify your identity using a driver's licence or passport.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="c" title="Step 3 — Link services">
      <p>Link government services to your myGov account.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>

  <!-- default-open: first item open on render -->
  <AGDSAccordion v-else-if="variant === 'default-open'" default-value="eligibility">
    <AGDSAccordionItem value="eligibility" title="Eligibility">
      <p>Open by default on first render.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="documents" title="Documents">
      <p>Closed by default.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>

  <!-- disabled: one item disabled -->
  <AGDSAccordion v-else-if="variant === 'disabled'">
    <AGDSAccordionItem value="active" title="Active section">
      <p>This section can be opened and closed.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="locked" title="Temporarily unavailable" disabled>
      <p>This section is disabled.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>

  <!-- indent -->
  <AGDSAccordion v-else-if="variant === 'indent'" indent>
    <AGDSAccordionItem value="info" title="Additional information">
      <p>Panel content is indented along with the trigger.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>
</template>
