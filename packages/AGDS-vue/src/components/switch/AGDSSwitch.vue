<script setup lang="ts">
import { computed, ref } from 'vue'

export type SwitchSize = 'sm' | 'md'

export interface AgDSSwitchProps {
  /** The id of the input — auto-generated if not provided */
  id?: string
  /** The name of the input */
  name?: string
  /** Bound value for v-model */
  modelValue?: boolean
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Marks the input as invalid */
  invalid?: boolean
  /** Marks the input as required */
  required?: boolean
  /** Size of the control */
  size?: SwitchSize
}

const props = withDefaults(defineProps<AgDSSwitchProps>(), {
  size: 'md',
  disabled: false,
  invalid: false,
  required: false,
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

let _idCounter = 0
const autoId = `agds-switch-${++_idCounter}`
const inputId = computed(() => props.id ?? autoId)

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputRef.value?.focus() })

function handleChange(event: Event) {
  if (props.disabled) return
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}
</script>

<template>
  <label
    :for="inputId"
    class="agds-switch"
    :class="[
      `agds-switch--${props.size}`,
      { 'agds-switch--disabled': props.disabled },
    ]"
  >
    <!--
      role="switch" overrides the default "checkbox" role with "switch"
      semantics. The native checkbox still handles all keyboard/focus
      behaviour — Enter and Space toggle the state, Tab reaches it.
      aria-checked is implied by the :checked state.
    -->
    <input
      :id="inputId"
      ref="inputRef"
      type="checkbox"
      role="switch"
      class="agds-switch__input"
      :name="props.name"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :required="props.required || undefined"
      :aria-invalid="props.invalid || undefined"
      :aria-required="props.required || undefined"
      v-bind="$attrs"
      @change="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <!-- Visual track + thumb — hidden from AT via aria-hidden -->
    <span
      class="agds-switch__track"
      :class="{
        'agds-switch__track--invalid': props.invalid,
        'agds-switch__track--disabled': props.disabled,
      }"
      aria-hidden="true"
    >
      <span class="agds-switch__thumb" />
    </span>

    <!-- Label text -->
    <span
      v-if="$slots.default"
      class="agds-switch__label"
      :class="{ 'agds-switch__label--disabled': props.disabled }"
    >
      <slot />
    </span>
  </label>
</template>

<style scoped>
/* ── Size tokens ─────────────────────────────────────────── */

.agds-switch--sm {
  --_sw-track-width:      2.75rem;  /* 44px */
  --_sw-track-height:     1.25rem;  /* 20px */
  --_sw-border-width:     var(--agds-border-width-md);
  --_sw-thumb-checked-x:  1.25rem;  /* translateX when checked */
  --_sw-font-size:        var(--agds-font-size-sm);
}

.agds-switch--md {
  --_sw-track-width:      3.5rem;   /* 56px */
  --_sw-track-height:     1.5rem;   /* 24px */
  --_sw-border-width:     var(--agds-border-width-md);
  --_sw-thumb-checked-x:  1.5rem;   /* translateX when checked */
  --_sw-font-size:        var(--agds-font-size-md);
}

/* ── Container ───────────────────────────────────────────── */

.agds-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  cursor: pointer;
  color: var(--agds-color-text);
  /* Prevents the label from shrinking the flex layout on narrow containers */
  width: fit-content;
}

.agds-switch--disabled {
  cursor: not-allowed;
}

/* ── Native input — invisible, covers the track exactly ──── */

.agds-switch__input {
  position: absolute;
  width: var(--_sw-track-width);
  height: var(--_sw-track-height);
  margin: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  /* Compensate for the track's flex position within the label */
  /* We rely on the label's for/id association instead */
}

/* Focus ring: outline the visual track when the hidden input is focused */
.agds-switch__input:focus-visible + .agds-switch__track {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Visual track ─────────────────────────────────────────── */

.agds-switch__track {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: var(--_sw-track-width);
  height: var(--_sw-track-height);
  flex-shrink: 0;

  background-color: var(--agds-color-bg-muted);
  border: var(--_sw-border-width) solid var(--agds-color-border-strong);
  border-radius: 9999px;

  transition:
    background-color var(--agds-transition-fast, 100ms ease),
    border-color var(--agds-transition-fast, 100ms ease);
}

/* Checked — fill track with action colour */
.agds-switch__input:checked + .agds-switch__track {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
}

/* Hover — not disabled */
.agds-switch:not(.agds-switch--disabled):hover .agds-switch__track {
  border-color: var(--agds-color-action-primary);
}

.agds-switch:not(.agds-switch--disabled):hover .agds-switch__input:checked + .agds-switch__track {
  background-color: var(--agds-color-action-primary-hover);
  border-color: var(--agds-color-action-primary-hover);
}

/* Invalid */
.agds-switch__track--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-switch__input:checked + .agds-switch__track--invalid {
  background-color: var(--agds-color-error);
  border-color: var(--agds-color-error);
}

/* Disabled */
.agds-switch__track--disabled {
  opacity: 0.5;
}

/* ── Thumb ────────────────────────────────────────────────── */

.agds-switch__thumb {
  position: absolute;
  /* Inset from border so thumb sits flush inside the track */
  top: 50%;
  left: var(--_sw-border-width);
  transform: translateY(-50%);
  /* Diameter = track height - 2 * border width */
  width: calc(var(--_sw-track-height) - 2 * var(--_sw-border-width));
  height: calc(var(--_sw-track-height) - 2 * var(--_sw-border-width));

  background-color: var(--agds-color-bg);
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);

  transition: transform var(--agds-transition-fast, 100ms ease);
  /* translateY(-50%) is the baseline; checked adds the horizontal shift */
  will-change: transform;
}

/* Move thumb to the right when checked */
.agds-switch__input:checked + .agds-switch__track .agds-switch__thumb {
  transform: translateY(-50%) translateX(var(--_sw-thumb-checked-x));
}

/* ── Label text ──────────────────────────────────────────── */

.agds-switch__label {
  font-family: var(--agds-font-family-body);
  font-size: var(--_sw-font-size);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
}

.agds-switch__label--disabled {
  color: var(--agds-color-text-muted);
}

/* Forced colours (Windows High Contrast) */
@media (forced-colors: active) {
  .agds-switch__track {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-switch__input:checked + .agds-switch__track {
    background-color: Highlight;
    border-color: Highlight;
  }

  .agds-switch__thumb {
    background-color: ButtonText;
  }

  .agds-switch__input:checked + .agds-switch__track .agds-switch__thumb {
    background-color: HighlightText;
  }

  .agds-switch__track--disabled {
    border-color: GrayText;
  }
}
</style>
