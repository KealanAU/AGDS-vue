<script setup lang="ts">
import { ref } from 'vue'

/**
 * Visual prominence level of the button.
 *
 * - `'primary'` — Filled, high-contrast. Use once per view for the single most important action.
 * - `'secondary'` — Outlined. Pair with a primary button for secondary actions.
 * - `'tertiary'` — No border, underlined text. Lower-priority actions with enough surrounding space.
 * - `'text'` — Like tertiary but with zero padding; for constrained spaces such as table cells or inline prose.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text'

/**
 * Physical size of the button — controls height, horizontal padding, and font size.
 *
 * - `'sm'` — Compact; for dense UIs or secondary actions in tight layouts.
 * - `'md'` — Default; suitable for most use cases.
 * - `'lg'` — Prominent; for hero sections or major calls to action.
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface AGDSButtonProps {
  /** Visual prominence of the button */
  variant?: ButtonVariant
  /** Size of the button */
  size?: ButtonSize
  /** Stretches the button to fill its container */
  block?: boolean
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
   * 'keyboard' — only for keyboard/sequential navigation (default, matches :focus-visible).
   * 'all' — always show, including programmatic focus (e.g. when navigating to a button via a link).
   */
  focusRingFor?: 'keyboard' | 'all'
}

const props = withDefaults(defineProps<AGDSButtonProps>(), {
  variant: 'primary',
  size: 'md',
  block: false,
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

// Allow parents to programmatically focus the button (e.g. after routing)
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
      'agds-button',
      `agds-button--${props.variant}`,
      `agds-button--${props.size}`,
      {
        'agds-button--block': props.block,
        'agds-button--loading': props.loading,
        'agds-button--disabled': props.disabled,
        'agds-button--focus-all': props.focusRingFor === 'all',
      },
    ]"
    @click="handleClick"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @keydown="emit('keydown', $event)"
  >
    <!-- Leading icon — fades out during loading so button width stays stable -->
    <span
      v-if="$slots.iconBefore"
      class="agds-button__icon"
      aria-hidden="true"
      :class="{ 'agds-button__icon--hidden': props.loading }"
    >
      <slot name="iconBefore" />
    </span>

    <!-- Label — fades out during loading so button width stays stable -->
    <span
      class="agds-button__label"
      :class="{ 'agds-button__label--hidden': props.loading }"
    >
      <slot />
    </span>

    <!-- Trailing icon — fades out during loading so button width stays stable -->
    <span
      v-if="$slots.iconAfter"
      class="agds-button__icon"
      aria-hidden="true"
      :class="{ 'agds-button__icon--hidden': props.loading }"
    >
      <slot name="iconAfter" />
    </span>

    <!--
      aria-live region MUST be present in the DOM before loading content is
      injected — if added dynamically, screen readers will not announce it.
      WCAG 4.1.3 Status Messages (AA).
    -->
    <span aria-live="assertive" class="agds-button__live-region">
      <span v-if="props.loading" class="agds-button__loading-indicator">
        <span class="agds-button__spinner" aria-hidden="true" />
        <span class="sr-only">{{ props.loadingLabel }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
/* ── Size tokens ─────────────────────────────────────────── */

.agds-button--sm {
  --_btn-height:    var(--agds-button-height-sm);
  --_btn-padding-x: var(--agds-button-padding-x-sm);
  --_btn-font-size: var(--agds-button-font-size-sm);
}

.agds-button--md {
  --_btn-height:    var(--agds-button-height-md);
  --_btn-padding-x: var(--agds-button-padding-x-md);
  --_btn-font-size: var(--agds-button-font-size-md);
}

.agds-button--lg {
  --_btn-height:    var(--agds-button-height-lg);
  --_btn-padding-x: var(--agds-button-padding-x-lg);
  --_btn-font-size: var(--agds-button-font-size-lg);
}

/* ── Base ────────────────────────────────────────────────── */

.agds-button {
  position: relative; /* anchor for absolute loading overlay */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--agds-space-2);

  border-width: var(--agds-button-border-width);
  border-style: solid;
  border-radius: var(--agds-button-border-radius);
  padding-inline: var(--_btn-padding-x);
  height: var(--_btn-height);

  font-family: var(--agds-font-family-body);
  font-size: var(--_btn-font-size);
  font-weight: var(--agds-button-font-weight);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;

  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--agds-transition-fast),
    border-color var(--agds-transition-fast),
    color var(--agds-transition-fast),
    box-shadow var(--agds-transition-fast);

  appearance: none;
  -webkit-appearance: none;
}

/* ── Block ───────────────────────────────────────────────── */

.agds-button--block {
  width: 100%;
}

/* ── Variants ────────────────────────────────────────────── */

.agds-button--primary {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg);
}

.agds-button--primary:hover:not(:disabled) {
  background-color: var(--agds-color-action-primary-hover);
  border-color: var(--agds-color-action-primary-hover);
}

.agds-button--primary:active:not(:disabled) {
  background-color: var(--agds-color-action-primary-active);
  border-color: var(--agds-color-action-primary-active);
}

.agds-button--secondary {
  background-color: transparent;
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary);
}

.agds-button--secondary:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  border-color: var(--agds-color-action-primary-hover);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--secondary:active:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  border-color: var(--agds-color-action-primary-active);
  color: var(--agds-color-action-primary-active);
}

.agds-button--tertiary {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-button--tertiary:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--tertiary:active:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-active);
}

/* Text variant — like tertiary but no padding, for use in constrained spaces (e.g. table cells) */
.agds-button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  padding-inline: 0;
  height: auto;
}

.agds-button--text:hover:not(:disabled) {
  color: var(--agds-color-action-primary-hover);
}

.agds-button--text:active:not(:disabled) {
  color: var(--agds-color-action-primary-active);
}

/* ── Focus ───────────────────────────────────────────────── */

.agds-button:focus-visible,
.agds-button--focus-all:focus {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Disabled & Loading ──────────────────────────────────── */

.agds-button:disabled,
.agds-button--disabled,
.agds-button--loading {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Icon slots ──────────────────────────────────────────── */

.agds-button__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  transition: opacity var(--agds-transition-fast);
}

.agds-button__icon--hidden {
  opacity: 0;
}

/* ── Label ───────────────────────────────────────────────── */

.agds-button__label {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  transition: opacity var(--agds-transition-fast);
}

.agds-button__label--hidden {
  opacity: 0;
}

/* ── Loading overlay ─────────────────────────────────────── */

/*
  The live region is always in the DOM (required for aria-live to work).
  When empty it is invisible and does not affect layout.
*/
.agds-button__live-region {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.agds-button__loading-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.agds-button__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes agds-spin {
  to { transform: rotate(360deg); }
}

/* ── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .agds-button__spinner {
    animation: none;
  }
}

/* ── Utilities ───────────────────────────────────────────── */

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

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  .agds-button {
    border: 2px solid ButtonBorder;
    forced-color-adjust: none;
    background: ButtonFace;
    color: ButtonText;
  }

  .agds-button:focus-visible,
  .agds-button--focus-all:focus {
    outline: 3px solid Highlight;
    outline-offset: 3px;
  }

  .agds-button:disabled,
  .agds-button--disabled,
  .agds-button--loading {
    color: GrayText;
    border-color: GrayText;
  }
}
</style>
