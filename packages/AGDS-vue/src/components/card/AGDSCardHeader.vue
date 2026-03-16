<script setup lang="ts">
export interface AgDSCardHeaderProps {
  /** Override the header's background. Inherits from Card when omitted. */
  background?: 'body' | 'bodyAlt'
}

const props = defineProps<AgDSCardHeaderProps>()
</script>

<template>
  <div
    :class="[
      'agds-card-header',
      props.background && `agds-card-header--${props.background}`,
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.agds-card-header {
  border-bottom: var(--agds-card-border-width) solid var(--agds-card-border-color);
  padding: var(--agds-card-padding);
  display: flex;
  flex-direction: column;
}

.agds-card-header--body {
  background-color: var(--agds-color-bg);
}

.agds-card-header--body-alt {
  background-color: var(--agds-color-bg-subtle);
}
</style>
