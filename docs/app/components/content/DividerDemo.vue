<script setup lang="ts">
defineProps<{
  /** 'default' | 'with-text' | 'left-aligned' | 'login-form' */
  variant?: string
}>()
</script>

<template>
  <!-- default: plain divider -->
  <AGDSDivider v-if="!variant || variant === 'default'" />

  <!-- with-text: divider with an "or" label -->
  <AGDSDivider v-else-if="variant === 'with-text'">
    <span>or</span>
  </AGDSDivider>

  <!-- left-aligned: text pinned to the left -->
  <AGDSDivider v-else-if="variant === 'left-aligned'" text-align="left">
    <span>Section A</span>
  </AGDSDivider>

  <!-- login-form: common sign-in pattern -->
  <div
    v-else-if="variant === 'login-form'"
    style="display: flex; flex-direction: column; gap: 1rem; max-width: 24rem"
  >
    <AGDSButton>Sign in with myGov</AGDSButton>
    <AGDSDivider><span>or</span></AGDSDivider>
    <AGDSButton variant="secondary">Continue as guest</AGDSButton>
  </div>
</template>
