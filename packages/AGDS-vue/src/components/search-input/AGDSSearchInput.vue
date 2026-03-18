<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'

export type SearchInputMaxWidth = Extract<FieldMaxWidth, 'md' | 'lg' | 'xl'>

export interface AGDSSearchInputProps {
  /** Describes the purpose of the field */
  label: string
  /** If true, "(optional)" will never be appended to the label */
  hideOptionalLabel?: boolean
  /** If false, "(optional)" will be appended to the label */
  required?: boolean
  /** Provides extra information about the field */
  hint?: string
  /** Message to show when the field is invalid */
  message?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** If true, the field will stretch to fill the width of its container */
  block?: boolean
  /** Constrains the max-width of the input. Ignored when block=true. */
  maxWidth?: SearchInputMaxWidth
  // Native input props
  autoFocus?: boolean
  disabled?: boolean
  /** HTML id for the input — auto-generated if not provided */
  id?: string
  name?: string
  placeholder?: string
  /** Bound value for v-model */
  modelValue?: string
}

const props = withDefaults(defineProps<AGDSSearchInputProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  block: false,
  disabled: false,
  autoFocus: false,
  maxWidth: 'md',
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /** Fired when the input is explicitly cleared (Escape or clear button click) */
  clear: []
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `search-input-${uid}`)

// ── Value — supports both controlled (v-model) and uncontrolled modes ─────────

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue ?? '')

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
)

const showClearButton = computed(() => Boolean(value.value))

function handleInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  internalValue.value = val
  emit('update:modelValue', val)
}

function clearInput() {
  if (!value.value) return
  internalValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    clearInput()
  }
}

// ── Max-width ─────────────────────────────────────────────────────────────────

const MAX_WIDTH_MAP: Record<SearchInputMaxWidth, string> = {
  md: '30ch',
  lg: '40ch',
  xl: '60ch',
}

const containerStyle = computed(() =>
  props.block ? {} : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] },
)

// ── Expose ────────────────────────────────────────────────────────────────────

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <AGDSField
    :label="props.label"
    :id="inputId"
    :hint="props.hint"
    :invalid="props.invalid"
    :message="props.message"
    :required="props.required"
    :hide-optional-label="props.hideOptionalLabel"
    :max-width="props.maxWidth"
  >
    <template #default="slotProps">
      <!-- Container: positions icon and clear button absolutely -->
      <div
        class="agds-search-input__container"
        :style="containerStyle"
      >
        <!-- Search icon — decorative, pointer-events: none -->
        <span
          class="agds-search-input__icon"
          :class="{ 'agds-search-input__icon--disabled': props.disabled }"
          aria-hidden="true"
        >
          <!--
            Material Design search icon inline SVG.
            Decorative: aria-hidden on the wrapper means AT ignores it entirely.
          -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            focusable="false"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </span>

        <!-- Input -->
        <input
          ref="inputRef"
          v-bind="slotProps"
          type="search"
          autocomplete="off"
          class="agds-search-input__input"
          :class="{
            'agds-search-input__input--invalid': props.invalid,
            'agds-search-input__input--block': props.block,
            'agds-search-input__input--has-clear': showClearButton,
          }"
          :name="props.name"
          :disabled="props.disabled"
          :autofocus="props.autoFocus || undefined"
          :placeholder="props.placeholder"
          :value="value"
          @input="handleInput"
          @keydown="handleKeyDown"
          @change="emit('change', $event)"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        />

        <!--
          Clear button — intentionally a div with role="button", NOT a <button>.
          Keyboard users clear via the Escape key; the div avoids adding an extra
          Tab stop that would interrupt the search flow.
          See: https://react-spectrum.adobe.com/react-spectrum/SearchField.html
        -->
        <div
          v-if="showClearButton"
          role="button"
          aria-label="Clear search"
          class="agds-search-input__clear"
          :class="{ 'agds-search-input__clear--disabled': props.disabled }"
          @click="clearInput"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
      </div>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Container ───────────────────────────────────────────── */

.agds-search-input__container {
  position: relative;
}

/* ── Search icon ─────────────────────────────────────────── */

.agds-search-input__icon {
  position: absolute;
  top: 50%;
  left: calc(var(--agds-space-2) + var(--agds-border-width-lg, 3px));
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--agds-color-text-muted);
  display: inline-flex;
  align-items: center;
}

.agds-search-input__icon--disabled {
  opacity: 0.3;
}

/* ── Input ───────────────────────────────────────────────── */

.agds-search-input__input {
  display: block;
  width: 30ch; /* default width; overridden by --block / container style */
  box-sizing: border-box;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);

  /* Left padding makes room for the search icon */
  padding-block: var(--agds-space-1);
  padding-inline-start: 3rem;
  padding-inline-end: var(--agds-space-2);

  border: var(--agds-border-width-lg, 3px) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);

  transition: border-color var(--agds-transition-fast, 100ms ease);

  appearance: none;
  -webkit-appearance: none;

  /* Hide the browser's built-in search cancel button — we provide our own */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}

.agds-search-input__input--block {
  width: 100%;
}

/* Right padding when clear button is visible */
.agds-search-input__input--has-clear {
  padding-inline-end: 3rem;
}

.agds-search-input__input:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-search-input__input:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-search-input__input--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-search-input__input--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-search-input__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Clear button ────────────────────────────────────────── */

.agds-search-input__clear {
  position: absolute;
  top: 50%;
  right: calc(var(--agds-space-1) + var(--agds-border-width-lg, 3px));
  transform: translateY(-50%);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;

  cursor: pointer;
  color: var(--agds-color-action-primary);
  border-radius: var(--agds-border-radius, 4px);
}

.agds-search-input__clear:hover {
  color: var(--agds-color-text);
}

.agds-search-input__clear--disabled {
  opacity: 0.3;
  pointer-events: none;
}

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  .agds-search-input__input {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-search-input__input:focus-visible {
    outline-color: Highlight;
  }

  .agds-search-input__input:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
