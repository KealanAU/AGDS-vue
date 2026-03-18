<script setup lang="ts">
import { computed, inject } from 'vue'
import { RADIO_GROUP_KEY } from './radioGroupContext'

export type RadioSize = 'sm' | 'md'

export interface AGDSRadioProps {
  /** The id of the input — auto-generated if not provided */
  id?: string
  /** The name of the input — can be provided by a parent RadioGroup */
  name?: string
  /** The currently selected value (v-model on the group or individual radio) */
  modelValue?: string | number | boolean
  /** The value this radio represents */
  value?: string | number | boolean
  /** Whether the radio is disabled */
  disabled?: boolean
  /** Marks the input as invalid — can be provided by a parent RadioGroup */
  invalid?: boolean
  /** Marks the input as required — can be provided by a parent RadioGroup */
  required?: boolean
  /** Size of the control */
  size?: RadioSize
}

const props = withDefaults(defineProps<AGDSRadioProps>(), {
  size: 'md',
  disabled: false,
  invalid: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── Auto-generate a stable id when none is provided ─────────────────────────

let _idCounter = 0
const autoId = `agds-radio-${++_idCounter}`
const inputId = computed(() => props.id ?? autoId)

// ── Group context (provided by AGDSRadioGroup) ─────────────────────────────

const group = inject(RADIO_GROUP_KEY, null)

const resolvedName = computed(() => props.name ?? group?.name ?? undefined)
const resolvedInvalid = computed(() =>
  typeof props.invalid === 'boolean' && props.invalid
    ? true
    : group?.invalid ?? false
)
const resolvedRequired = computed(() =>
  typeof props.required === 'boolean' && props.required
    ? true
    : group?.required ?? false
)
const resolvedDisabled = computed(() => props.disabled || (group?.disabled ?? false))
const describedBy = computed(() =>
  resolvedInvalid.value && group?.messageId ? group.messageId : undefined
)

const isChecked = computed(() => props.modelValue === props.value)

// ── Handlers ─────────────────────────────────────────────────────────────────

function handleChange(event: Event) {
  if (resolvedDisabled.value) return
  emit('update:modelValue', props.value as string | number | boolean)
  emit('change', event)
}

// ── Expose ───────────────────────────────────────────────────────────────────

import { ref } from 'vue'
const inputRef = ref<HTMLInputElement | null>(null)
defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <label
    :for="inputId"
    class="agds-radio"
    :class="[
      `agds-radio--${props.size}`,
      { 'agds-radio--disabled': resolvedDisabled },
    ]"
  >
    <span class="agds-radio__control">
      <!-- Visually hidden native input carries all semantics and keyboard behaviour -->
      <input
        :id="inputId"
        ref="inputRef"
        type="radio"
        class="agds-radio__input"
        :name="resolvedName"
        :value="props.value"
        :checked="isChecked"
        :disabled="resolvedDisabled"
        :required="resolvedRequired || undefined"
        :aria-invalid="resolvedInvalid || undefined"
        :aria-required="resolvedRequired || undefined"
        :aria-describedby="describedBy"
        v-bind="$attrs"
        @change="handleChange"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />

      <!-- Custom visual indicator (circle + inner dot) -->
      <span
        class="agds-radio__indicator"
        :class="{
          'agds-radio__indicator--invalid': resolvedInvalid,
          'agds-radio__indicator--disabled': resolvedDisabled,
        }"
        aria-hidden="true"
      >
        <span class="agds-radio__dot" />
      </span>
    </span>

    <!-- Label text -->
    <span
      v-if="$slots.default"
      class="agds-radio__label"
      :class="{ 'agds-radio__label--disabled': resolvedDisabled }"
    >
      <slot />
    </span>
  </label>
</template>

<style scoped>
/* ── Size tokens ─────────────────────────────────────────── */

.agds-radio--sm {
  --_r-size:         1.25rem;  /* 20px */
  --_r-border-width: var(--agds-border-width-md);
  --_r-font-size:    var(--agds-font-size-sm);
  --_r-dot-size:     0.5rem;
}

.agds-radio--md {
  --_r-size:         1.5rem;   /* 24px */
  --_r-border-width: var(--agds-border-width-md);
  --_r-font-size:    var(--agds-font-size-md);
  --_r-dot-size:     0.625rem;
}

/* ── Container ───────────────────────────────────────────── */

.agds-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--agds-space-2, 0.5rem);
  cursor: pointer;
  color: var(--agds-color-text);
}

.agds-radio--disabled {
  cursor: not-allowed;
}

/* ── Control wrapper — positions input over indicator ────── */

.agds-radio__control {
  position: relative;
  display: inline-block;
  width: var(--_r-size);
  height: var(--_r-size);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ── Native input — invisible but covers the full control ── */

.agds-radio__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
}

/* Focus ring: when the hidden input is focused, outline the indicator */
.agds-radio__input:focus-visible ~ .agds-radio__indicator {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Visual indicator (circle) ───────────────────────────── */

.agds-radio__indicator {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--agds-color-bg, #ffffff);
  border: var(--_r-border-width) solid var(--agds-color-border);
  border-radius: 100%;
  transition:
    background-color var(--agds-transition-fast, 100ms ease),
    border-color var(--agds-transition-fast, 100ms ease);
}

/* Hover — not disabled */
.agds-radio:not(.agds-radio--disabled) .agds-radio__input:hover ~ .agds-radio__indicator,
.agds-radio:not(.agds-radio--disabled):hover .agds-radio__indicator {
  border-color: var(--agds-color-action-primary);
}

/* Checked — highlight the ring */
.agds-radio__input:checked ~ .agds-radio__indicator {
  border-color: var(--agds-color-action-primary);
}

/* Invalid */
.agds-radio__indicator--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

/* Disabled */
.agds-radio__indicator--disabled {
  background-color: var(--agds-color-bg-subtle, #f5f5f5);
  border-color: var(--agds-color-border);
  opacity: 0.5;
}

/* Forced colours (Windows High Contrast) */
@media (forced-colors: active) {
  .agds-radio__indicator {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-radio__indicator--disabled {
    border-color: GrayText;
  }
}

/* ── Inner dot — visible only when checked ───────────────── */

.agds-radio__dot {
  display: block;
  width: var(--_r-dot-size);
  height: var(--_r-dot-size);
  border-radius: 100%;
  background-color: var(--agds-color-action-primary);
  opacity: 0;
  transition: opacity var(--agds-transition-fast, 100ms ease);
}

.agds-radio__input:checked ~ .agds-radio__indicator .agds-radio__dot {
  opacity: 1;
}

/* Disabled checked dot */
.agds-radio__indicator--disabled .agds-radio__dot {
  background-color: var(--agds-color-border-muted, #b0b0b0);
}

/* High contrast dot */
@media (forced-colors: active) {
  .agds-radio__dot {
    background-color: ButtonText;
  }

  .agds-radio__indicator--disabled .agds-radio__dot {
    background-color: GrayText;
  }
}

/* ── Label text ──────────────────────────────────────────── */

.agds-radio__label {
  font-family: var(--agds-font-family-body);
  font-size: var(--_r-font-size);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  padding-top: 0.1rem;
  flex-grow: 1;
}

.agds-radio__label--disabled {
  color: var(--agds-color-text-muted);
}
</style>
