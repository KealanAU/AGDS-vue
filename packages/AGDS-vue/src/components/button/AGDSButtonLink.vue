<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from './AGDSButton.vue'

export interface AGDSButtonLinkProps {
  /** URL the link navigates to */
  href: string
  /** Visual prominence — matches Button variants */
  variant?: ButtonVariant
  /** Size — matches Button sizes */
  size?: ButtonSize
  /** Stretches the link to fill its container */
  block?: boolean
  /** Opens link in a new tab. Automatically appends accessible offscreen text. */
  external?: boolean
}

withDefaults(defineProps<AGDSButtonLinkProps>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  external: false,
})

defineEmits<{
  /** Emitted when the link is clicked. */
  click: [event: MouseEvent]
  /** Emitted when the link receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the link loses focus. */
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'agds-button',
      `agds-button--${variant}`,
      `agds-button--${size}`,
      { 'agds-button--block': block },
    ]"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <span v-if="$slots.iconBefore" class="agds-button__icon" aria-hidden="true">
      <slot name="iconBefore" />
    </span>

    <span class="agds-button__label">
      <slot />
    </span>

    <span v-if="$slots.iconAfter" class="agds-button__icon" aria-hidden="true">
      <slot name="iconAfter" />
    </span>

    <!-- Screen reader text for external links (WCAG 2.4.4) -->
    <span v-if="external" class="sr-only">, opens in a new tab</span>
  </a>
</template>

<style scoped>
/*
  Visual styles are shared with AGDSButton via the same CSS class names.
  Import AGDS-vue/styles globally — this file only adds link-specific overrides.
*/

.agds-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--agds-space-2);

  border-width: var(--agds-button-border-width);
  border-style: solid;
  border-radius: var(--agds-button-border-radius);
  padding-inline: var(--agds-button-padding-x-md);
  height: var(--agds-button-height-md);

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-button-font-size-md);
  font-weight: var(--agds-button-font-weight);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;

  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--agds-transition-fast),
    border-color var(--agds-transition-fast),
    color var(--agds-transition-fast);

  appearance: none;
}

.agds-button--block {
  width: 100%;
}

.agds-button--sm {
  height: var(--agds-button-height-sm);
  padding-inline: var(--agds-button-padding-x-sm);
  font-size: var(--agds-button-font-size-sm);
}

.agds-button--lg {
  height: var(--agds-button-height-lg);
  padding-inline: var(--agds-button-padding-x-lg);
  font-size: var(--agds-button-font-size-lg);
}

.agds-button--primary {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg);
}

.agds-button--primary:hover {
  background-color: var(--agds-color-action-primary-hover);
  border-color: var(--agds-color-action-primary-hover);
}

.agds-button--secondary {
  background-color: transparent;
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary);
}

.agds-button--secondary:hover {
  background-color: var(--agds-color-brand-muted);
  border-color: var(--agds-color-action-primary-hover);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--tertiary {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-button--tertiary:hover {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  padding-inline: 0;
  height: auto;
}

.agds-button--text:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-button:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-button__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.agds-button__label {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
