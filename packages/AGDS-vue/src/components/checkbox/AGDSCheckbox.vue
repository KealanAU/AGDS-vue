<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue'
import { CHECKBOX_GROUP_KEY } from './checkboxGroupContext'

export type CheckboxSize = 'sm' | 'md'

export interface AGDSCheckboxProps {
  /** The id of the input — auto-generated if not provided */
  id?: string
  /** The name of the input — can be provided by a parent CheckboxGroup */
  name?: string
  /** Bound value for v-model */
  modelValue?: boolean
  /** The value attribute submitted with a form */
  value?: string | number | boolean
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Indeterminate "mixed" state — overrides checked visually and sets aria-checked="mixed" */
  indeterminate?: boolean
  /** Marks the input as invalid — can be provided by a parent CheckboxGroup */
  invalid?: boolean
  /** Marks the input as required — can be provided by a parent CheckboxGroup */
  required?: boolean
  /** Size of the control */
  size?: CheckboxSize
}

const props = withDefaults(defineProps<AGDSCheckboxProps>(), {
  size: 'md',
  disabled: false,
  indeterminate: false,
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

// ── Auto-generate a stable id when none is provided ─────────────────────────

let _idCounter = 0
const autoId = `agds-checkbox-${++_idCounter}`
const inputId = computed(() => props.id ?? autoId)

// ── Group context (provided by AGDSCheckboxGroup) ──────────────────────────

const group = inject(CHECKBOX_GROUP_KEY, null)

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

// ── Refs ────────────────────────────────────────────────────────────────────

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputRef.value?.focus() })

// ── Indeterminate — must be set via JS property, not HTML attribute ───────────

function applyIndeterminate() {
  if (inputRef.value) {
    inputRef.value.indeterminate = Boolean(props.indeterminate)
  }
}

onMounted(applyIndeterminate)
watch(() => props.indeterminate, applyIndeterminate)

// ── Checked — indeterminate overrides to false so input is not checked ────────

const checkedValue = computed(() => (props.indeterminate ? false : props.modelValue))

// ── Handlers ─────────────────────────────────────────────────────────────────

function handleChange(event: Event) {
  if (resolvedDisabled.value) return
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}
</script>

<template>
  <label
    :for="inputId"
    class="agds-checkbox"
    :class="[
      `agds-checkbox--${props.size}`,
      { 'agds-checkbox--disabled': resolvedDisabled },
    ]"
  >
    <span class="agds-checkbox__control">
      <!-- Visually hidden native input carries all semantics and keyboard behaviour -->
      <input
        :id="inputId"
        ref="inputRef"
        type="checkbox"
        class="agds-checkbox__input"
        :name="resolvedName"
        :checked="checkedValue"
        :disabled="resolvedDisabled"
        :required="resolvedRequired || undefined"
        :aria-checked="props.indeterminate ? 'mixed' : undefined"
        :aria-invalid="resolvedInvalid || undefined"
        :aria-required="resolvedRequired || undefined"
        :aria-describedby="describedBy"
        v-bind="$attrs"
        @change="handleChange"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />

      <!-- Custom visual indicator -->
      <span
        class="agds-checkbox__indicator"
        :class="{
          'agds-checkbox__indicator--invalid': resolvedInvalid,
          'agds-checkbox__indicator--disabled': resolvedDisabled,
        }"
        aria-hidden="true"
      >
        <!-- Check mark -->
        <svg
          v-if="!props.indeterminate"
          class="agds-checkbox__icon agds-checkbox__icon--check"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- Minus / indeterminate mark -->
        <svg
          v-else
          class="agds-checkbox__icon agds-checkbox__icon--minus"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
        >
          <path
            d="M1 1H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </span>

    <!-- Label text -->
    <span
      v-if="$slots.default"
      class="agds-checkbox__label"
      :class="{ 'agds-checkbox__label--disabled': resolvedDisabled }"
    >
      <slot />
    </span>
  </label>
</template>

<style scoped>
/* ── Size tokens ─────────────────────────────────────────── */

.agds-checkbox--sm {
  --_cb-size:         1.25rem;  /* 20px */
  --_cb-border-width: var(--agds-border-width-md);
  --_cb-font-size:    var(--agds-font-size-sm);
  --_cb-icon-size:    0.6rem;
}

.agds-checkbox--md {
  --_cb-size:         1.5rem;   /* 24px */
  --_cb-border-width: var(--agds-border-width-md);
  --_cb-font-size:    var(--agds-font-size-md);
  --_cb-icon-size:    0.75rem;
}

/* ── Container ───────────────────────────────────────────── */

.agds-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--agds-space-2, 0.5rem);
  cursor: pointer;
  color: var(--agds-color-text);
}

.agds-checkbox--disabled {
  cursor: not-allowed;
}

/* ── Control wrapper — positions input over indicator ────── */

.agds-checkbox__control {
  position: relative;
  display: inline-block;
  width: var(--_cb-size);
  height: var(--_cb-size);
  flex-shrink: 0;
  /* Small top nudge so the box aligns with the cap height of the label text */
  margin-top: 0.125rem;
}

/* ── Native input — invisible but covers the full control ── */

.agds-checkbox__input {
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
.agds-checkbox__input:focus-visible ~ .agds-checkbox__indicator {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* Checked / indeterminate: show the SVG icon */
.agds-checkbox__input:checked ~ .agds-checkbox__indicator .agds-checkbox__icon,
.agds-checkbox__input:indeterminate ~ .agds-checkbox__indicator .agds-checkbox__icon {
  opacity: 1;
}

/* ── Visual indicator box ────────────────────────────────── */

.agds-checkbox__indicator {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--agds-color-bg, #ffffff);
  border: var(--_cb-border-width) solid var(--agds-color-border);
  border-radius: 3px;
  color: var(--agds-color-bg, #ffffff); /* icon colour — opaque bg masks it when unchecked */
  transition:
    background-color var(--agds-transition-fast, 100ms ease),
    border-color var(--agds-transition-fast, 100ms ease);
}

/* Checked / indeterminate — fill the box */
.agds-checkbox__input:checked ~ .agds-checkbox__indicator,
.agds-checkbox__input:indeterminate ~ .agds-checkbox__indicator {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg, #ffffff);
}

/* Hover — not disabled */
.agds-checkbox:not(.agds-checkbox--disabled) .agds-checkbox__input:hover ~ .agds-checkbox__indicator,
.agds-checkbox:not(.agds-checkbox--disabled):hover .agds-checkbox__indicator {
  border-color: var(--agds-color-action-primary);
}

/* Invalid */
.agds-checkbox__indicator--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-checkbox__input:checked ~ .agds-checkbox__indicator--invalid,
.agds-checkbox__input:indeterminate ~ .agds-checkbox__indicator--invalid {
  background-color: var(--agds-color-error);
  border-color: var(--agds-color-error);
}

/* Disabled */
.agds-checkbox__indicator--disabled {
  background-color: var(--agds-color-bg-subtle, #f5f5f5);
  border-color: var(--agds-color-border);
  opacity: 0.5;
}

/* Forced colours (Windows High Contrast) */
@media (forced-colors: active) {
  .agds-checkbox__indicator {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-checkbox__input:checked ~ .agds-checkbox__indicator,
  .agds-checkbox__input:indeterminate ~ .agds-checkbox__indicator {
    background-color: Highlight;
    border-color: Highlight;
    color: HighlightText;
  }

  .agds-checkbox__indicator--disabled {
    border-color: GrayText;
  }
}

/* ── Icon (check / minus) ────────────────────────────────── */

.agds-checkbox__icon {
  width: var(--_cb-icon-size);
  height: var(--_cb-icon-size);
  opacity: 0;
  transition: opacity var(--agds-transition-fast, 100ms ease);
  flex-shrink: 0;
}

/* ── Label text ──────────────────────────────────────────── */

.agds-checkbox__label {
  font-family: var(--agds-font-family-body);
  font-size: var(--_cb-font-size);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  /* Nudge to vertically align with the indicator box cap-height */
  padding-top: 0.1rem;
  flex-grow: 1;
}

.agds-checkbox__label--disabled {
  color: var(--agds-color-text-muted);
}
</style>
