<script setup lang="ts">
import AGDSIcon from '../icon/AGDSIcon.vue'

export interface AGDSCallToActionLinkProps {
  /** URL the link navigates to */
  href: string
  /** Opens link in a new tab. Automatically appends accessible offscreen text. */
  external?: boolean
  /**
   * When to show the focus ring.
   * 'keyboard' — only for keyboard/sequential navigation (default).
   * 'all' — always show, including programmatic focus.
   */
  focusRingFor?: 'keyboard' | 'all'
}

withDefaults(defineProps<AGDSCallToActionLinkProps>(), {
  external: false,
  focusRingFor: 'keyboard',
})

defineEmits<{
  /** Emitted when the call-to-action link is clicked. */
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
      'agds-cta',
      { 'agds-cta--focus-all': focusRingFor === 'all' },
    ]"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />

    <AGDSIcon
      name="mdi:chevron-right"
      size="sm"
      class="agds-cta__icon"
      aria-hidden="true"
    />

    <span v-if="external" class="sr-only">, opens in a new tab</span>
  </a>
</template>

<style scoped>
.agds-cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: var(--agds-space-1);

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: auto;

  cursor: pointer;
  transition: color var(--agds-transition-fast);
}

.agds-cta:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-cta:active {
  color: var(--agds-color-action-primary-active);
}

.agds-cta:focus-visible,
.agds-cta--focus-all:focus {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.agds-cta__icon {
  flex-shrink: 0;
  transition: transform var(--agds-transition-fast);
}

.agds-cta:hover .agds-cta__icon {
  transform: scale(1.2);
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
