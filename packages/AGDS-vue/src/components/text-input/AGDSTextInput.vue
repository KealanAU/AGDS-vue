<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'

export interface AGDSTextInputProps {
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
  maxWidth?: FieldMaxWidth
  // Native input props
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  /** HTML id for the input — auto-generated if not provided */
  id?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  maxLength?: number
  name?: string
  pattern?: string
  placeholder?: string
  /** Input type — defaults to "text" */
  type?: string
  /** Bound value for v-model */
  modelValue?: string
}

const props = withDefaults(defineProps<AGDSTextInputProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  block: false,
  disabled: false,
  autoFocus: false,
  maxWidth: 'md',
  type: 'text',
  modelValue: '',
})

const emit = defineEmits<{
  /** Emitted on every keystroke — use with v-model for two-way binding. */
  'update:modelValue': [value: string]
  /** Emitted when the native change event fires (typically on blur or Enter). */
  change: [event: Event]
  /** Emitted when the input receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the input loses focus. */
  blur: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `text-input-${uid}`)

// ── Value ─────────────────────────────────────────────────────────────────────

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue ?? '')

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
)

function handleInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  internalValue.value = val
  emit('update:modelValue', val)
}

// ── Max-width ─────────────────────────────────────────────────────────────────

const MAX_WIDTH_MAP: Record<FieldMaxWidth, string> = {
  xs: '10ch',
  sm: '20ch',
  md: '30ch',
  lg: '40ch',
  xl: '60ch',
}

const containerStyle = computed(() =>
  props.block ? { width: '100%' } : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] },
)

// ── Expose ────────────────────────────────────────────────────────────────────

defineExpose({
  /** Moves keyboard focus to the text input. */
  focus: () => inputRef.value?.focus(),
})
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
      <input
        ref="inputRef"
        v-bind="slotProps"
        class="agds-text-input"
        :class="{
          'agds-text-input--invalid': props.invalid,
          'agds-text-input--block': props.block,
        }"
        :style="containerStyle"
        :type="props.type"
        :name="props.name"
        :disabled="props.disabled"
        :autofocus="props.autoFocus || undefined"
        :autocomplete="props.autoComplete"
        :inputmode="props.inputMode"
        :maxlength="props.maxLength"
        :pattern="props.pattern"
        :placeholder="props.placeholder"
        :value="value"
        @input="handleInput"
        @change="emit('change', $event)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </template>
  </AGDSField>
</template>

<style scoped>
.agds-text-input {
  display: block;
  box-sizing: border-box;
  appearance: none;
  margin: 0;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);

  padding-block: var(--agds-space-1);
  padding-inline: var(--agds-space-2);

  border: var(--agds-border-width-lg, 3px) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);

  transition: border-color var(--agds-transition-fast, 100ms ease);
}

.agds-text-input--block {
  width: 100%;
  max-width: none;
}

.agds-text-input:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-text-input:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-text-input--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-text-input--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-text-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .agds-text-input {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-text-input:focus-visible {
    outline-color: Highlight;
  }

  .agds-text-input:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
