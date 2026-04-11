<script setup lang="ts">
import { ref } from 'vue'
import AGDSIcon from '../icon/AGDSIcon.vue'

export interface AGDSCallToActionButtonProps {
  /** Disables the button, preventing interaction */
  disabled?: boolean
  /** Shows a loading indicator and prevents interaction */
  loading?: boolean
  /** Text announced to screen readers when loading. Make this contextual, e.g. "Submitting form" */
  loadingLabel?: string
  /** HTML type attribute */
  type?: 'button' | 'submit' | 'reset'
  /**
   * When to show the focus ring.
   * 'keyboard' — only for keyboard/sequential navigation (default).
   * 'all' — always show, including programmatic focus.
   */
  focusRingFor?: 'keyboard' | 'all'
}

const props = withDefaults(defineProps<AGDSCallToActionButtonProps>(), {
  disabled: false,
  loading: false,
  loadingLabel: 'Loading',
  type: 'button',
  focusRingFor: 'keyboard',
})

const emit = defineEmits<{
  /** Emitted when the button is clicked. Not emitted when disabled or loading. */
  click: [event: MouseEvent]
  /** Emitted when the button receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the button loses focus. */
  blur: [event: FocusEvent]
  /** Emitted on every keydown event while the button has focus. */
  keydown: [event: KeyboardEvent]
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

defineExpose({
  /** Moves keyboard focus to the button. */
  focus: () => buttonRef.value?.focus(),
})

function handleClick(event: MouseEvent) {
  // Safari does not focus <button> elements on click — do it manually so
  // focus-visible styles and screen reader virtual cursor stay correct.
  buttonRef.value?.focus()
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading ? true : undefined"
    :aria-disabled="(props.disabled || props.loading) ? true : undefined"
    :class="[
      'agds-cta',
      {
        'agds-cta--focus-all': props.focusRingFor === 'all',
        'agds-cta--disabled': props.disabled,
        'agds-cta--loading': props.loading,
      },
    ]"
    @click="handleClick"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @keydown="emit('keydown', $event)"
  >
    <span
      class="agds-cta__label"
      :class="{ 'agds-cta__label--hidden': props.loading }"
    >
      <slot />
    </span>

    <AGDSIcon
      name="mdi:chevron-right"
      size="sm"
      class="agds-cta__icon"
      :class="{ 'agds-cta__icon--hidden': props.loading }"
      aria-hidden="true"
    />

    <!--
      aria-live region MUST be present in the DOM before loading content is
      injected — if added dynamically, screen readers will not announce it.
      WCAG 4.1.3 Status Messages (AA).
    -->
    <span aria-live="assertive" class="agds-cta__live-region">
      <span v-if="props.loading" class="agds-cta__loading-indicator">
        <span class="agds-cta__spinner" aria-hidden="true" />
        <span class="sr-only">{{ props.loadingLabel }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.agds-cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: var(--agds-space-1);
  position: relative;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: auto;

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  transition: color var(--agds-transition-fast);
}

.agds-cta:hover:not(:disabled) {
  color: var(--agds-color-action-primary-hover);
}

.agds-cta:active:not(:disabled) {
  color: var(--agds-color-action-primary-active);
}

.agds-cta:focus-visible,
.agds-cta--focus-all:focus {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.agds-cta--disabled,
.agds-cta--loading,
.agds-cta:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.agds-cta__icon {
  flex-shrink: 0;
  transition:
    transform var(--agds-transition-fast),
    opacity var(--agds-transition-fast);
}

.agds-cta:hover:not(:disabled) .agds-cta__icon {
  transform: scale(1.2);
}

.agds-cta__icon--hidden {
  opacity: 0;
}

.agds-cta__label {
  transition: opacity var(--agds-transition-fast);
}

.agds-cta__label--hidden {
  opacity: 0;
}

/* Loading overlay */
.agds-cta__live-region {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.agds-cta__loading-indicator {
  display: inline-flex;
  align-items: center;
}

.agds-cta__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-cta-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes agds-cta-spin {
  to { transform: rotate(360deg); }
}

/* ── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .agds-cta__spinner {
    animation: none;
  }
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
