<script setup lang="ts">
export interface AGDSCardHeaderProps {
  /** Card title — required. */
  title?: string
  /** Optional subtitle rendered below the title. */
  subtitle?: string
  /** Override the header's background. Inherits from Card when omitted. */
  background?: 'body' | 'bodyAlt'
}

const props = defineProps<AGDSCardHeaderProps>()
</script>

<template>
  <div
    :class="[
      'agds-card-header',
      props.background && (props.background === 'bodyAlt' ? 'agds-card-header--body-alt' : 'agds-card-header--body'),
    ]"
  >
    <slot>
      <div v-if="props.title || props.subtitle" class="agds-card-header__content">
        <span v-if="props.title" class="agds-card-header__title">{{ props.title }}</span>
        <span v-if="props.subtitle" class="agds-card-header__subtitle">{{ props.subtitle }}</span>
      </div>
    </slot>
    <slot name="link" />
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

.agds-card-header__content {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-card-header__title {
  font-weight: var(--agds-font-weight-bold);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
}

.agds-card-header__subtitle {
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}
</style>
