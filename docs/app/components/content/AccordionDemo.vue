<script setup lang="ts">
defineProps<{
  /** 'default' | 'single' | 'default-open' | 'disabled' | 'indent' */
  variant?: string
}>()
</script>

<template>
  <!-- default: multiple open, basic usage -->
  <AgDSAccordion v-if="!variant || variant === 'default'">
    <AgDSAccordionItem value="eligibility" title="Eligibility requirements">
      <p>You must be an Australian citizen or permanent resident to be eligible.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Required documents">
      <p>Bring two forms of photo identification and proof of address.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="timeline" title="Processing timeline">
      <p>Applications are processed within 10 business days of receipt.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>

  <!-- single: only one item open at a time -->
  <AgDSAccordion v-else-if="variant === 'single'" type="single" :collapsible="true">
    <AgDSAccordionItem value="a" title="Step 1 — Create account">
      <p>Create your myGov account using your email address.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="b" title="Step 2 — Verify identity">
      <p>Verify your identity using a driver's licence or passport.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="c" title="Step 3 — Link services">
      <p>Link government services to your myGov account.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>

  <!-- default-open: first item open on render -->
  <AgDSAccordion v-else-if="variant === 'default-open'" default-value="eligibility">
    <AgDSAccordionItem value="eligibility" title="Eligibility">
      <p>Open by default on first render.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Documents">
      <p>Closed by default.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>

  <!-- disabled: one item disabled -->
  <AgDSAccordion v-else-if="variant === 'disabled'">
    <AgDSAccordionItem value="active" title="Active section">
      <p>This section can be opened and closed.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="locked" title="Temporarily unavailable" disabled>
      <p>This section is disabled.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>

  <!-- indent -->
  <AgDSAccordion v-else-if="variant === 'indent'" indent>
    <AgDSAccordionItem value="info" title="Additional information">
      <p>Panel content is indented along with the trigger.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>
</template>
