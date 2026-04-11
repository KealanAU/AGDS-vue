<script setup lang="ts">
defineProps<{
  /** 'default' | 'required' | 'invalid' | 'max-widths' */
  variant?: string
}>()
</script>

<template>
  <!-- default: email address with hint -->
  <AGDSField
    v-if="!variant || variant === 'default'"
    label="Email address"
    hint="We will only use this to contact you about your application."
  >
    <template #default="slotProps">
      <input
        type="email"
        v-bind="slotProps"
        style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;max-width:30ch;"
      />
    </template>
  </AGDSField>

  <!-- required: full name -->
  <AGDSField
    v-else-if="variant === 'required'"
    label="Full name"
    required
  >
    <template #default="slotProps">
      <input
        type="text"
        v-bind="slotProps"
        style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;max-width:30ch;"
      />
    </template>
  </AGDSField>

  <!-- invalid: date of birth with error -->
  <AGDSField
    v-else-if="variant === 'invalid'"
    label="Date of birth"
    :invalid="true"
    message="Enter a valid date of birth"
  >
    <template #default="slotProps">
      <input
        type="text"
        v-bind="slotProps"
        style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-error-muted);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-error);border-radius:4px;max-width:30ch;"
      />
    </template>
  </AGDSField>

  <!-- max-widths: postcode with xs constraint -->
  <AGDSField
    v-else-if="variant === 'max-widths'"
    label="Postcode"
    max-width="xs"
    hint="xs — 10ch"
  >
    <template #default="slotProps">
      <input
        type="text"
        inputmode="numeric"
        v-bind="slotProps"
        style="display:block;box-sizing:border-box;appearance:none;width:100%;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;"
      />
    </template>
  </AGDSField>
</template>
