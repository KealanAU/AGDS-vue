<script setup lang="ts">
import { ref } from 'vue'
import AGDSIcon from '../icon/AGDSIcon.vue'
import type { Direction } from './AGDSDirectionLink.vue'

export interface AGDSDirectionButtonProps {
  /** Arrow direction displayed alongside the button text */
  direction: Direction
  /** Disables the button, preventing interaction */
  disabled?: boolean
  /** Shows a loading indicator and prevents interaction */
  loading?: boolean
  /** Text announced to screen readers when loading */
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

const props = withDefaults(defineProps<AGDSDirectionButtonProps>(), {
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
  buttonRef.value?.focus()
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const ICON_MAP: Record<Direction, string> = {
  up: 'mdi:arrow-up',
  right: 'mdi:arrow-right',
  down: 'mdi:arrow-down',
  left: 'mdi:arrow-left',
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
      'agds-direction-link',
      {
        'agds-direction-link--focus-all': props.focusRingFor === 'all',
        'agds-direction-link--disabled': props.disabled,
        'agds-direction-link--loading': props.loading,
      },
    ]"
    @click="handleClick"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @keydown="emit('keydown', $event)"
  >
    <AGDSIcon
      v-if="props.direction === 'left'"
      :name="ICON_MAP[props.direction]"
      size="sm"
      class="agds-direction-link__icon"
      aria-hidden="true"
    />

    <span
      class="agds-direction-link__label"
      :class="{ 'agds-direction-link__label--hidden': props.loading }"
    >
      <slot />
    </span>

    <AGDSIcon
      v-if="props.direction !== 'left'"
      :name="ICON_MAP[props.direction]"
      size="sm"
      class="agds-direction-link__icon"
      :class="{ 'agds-direction-link__icon--hidden': props.loading }"
      aria-hidden="true"
    />

    <!--
      aria-live region must be in the DOM before content is injected.
      WCAG 4.1.3 Status Messages (AA).
    -->
    <span aria-live="assertive" class="agds-direction-link__live-region">
      <span v-if="props.loading" class="agds-direction-link__loading-indicator">
        <span class="agds-direction-link__spinner" aria-hidden="true" />
        <span class="sr-only">{{ props.loadingLabel }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.agds-direction-link {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);

  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-normal);
  font-size: inherit;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: auto;

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;

  transition: color var(--agds-transition-fast);
}

.agds-direction-link:hover:not(:disabled) {
  color: var(--agds-color-action-primary-hover);
}

.agds-direction-link:active:not(:disabled) {
  color: var(--agds-color-action-primary-active);
}

.agds-direction-link:focus-visible,
.agds-direction-link--focus-all:focus {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.agds-direction-link--disabled,
.agds-direction-link--loading,
.agds-direction-link:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.agds-direction-link__icon {
  flex-shrink: 0;
  transition:
    transform var(--agds-transition-fast),
    opacity var(--agds-transition-fast);
}

.agds-direction-link:hover:not(:disabled) .agds-direction-link__icon {
  transform: scale(1.2);
}

.agds-direction-link__icon--hidden {
  opacity: 0;
}

.agds-direction-link__label {
  transition: opacity var(--agds-transition-fast);
}

.agds-direction-link__label--hidden {
  opacity: 0;
}

/* Loading overlay */
.agds-direction-link__live-region {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.agds-direction-link__loading-indicator {
  display: inline-flex;
  align-items: center;
}

.agds-direction-link__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-direction-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes agds-direction-spin {
  to { transform: rotate(360deg); }
}

/* ── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .agds-direction-link__spinner {
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
