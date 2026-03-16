<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'
import {
  acceptedTimeFormats,
  formatTime,
  transformValuePropToInputValue,
  type TimeFormat,
} from './timeInputUtils'

export type TimeValue =
  | {
      /** The time in the format displayed to the user */
      formatted?: string
      /** The time in a consistent 24-hour format (HH:mm) */
      value: string
    }
  | undefined

export interface AgDSTimeInputProps {
  /** Describes the purpose of the field */
  label: string
  /** Defines an identifier (ID) which must be unique. Auto-generated when omitted. */
  id?: string
  /** Provides extra information about the field */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Message to show when the field is invalid */
  message?: string
  /** If false, "(optional)" will be appended to the label */
  required?: boolean
  /** If true, "(optional)" will never be appended to the label */
  hideOptionalLabel?: boolean
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** Constrains the max-width of the input. Ignored when block=true. */
  maxWidth?: FieldMaxWidth
  /** The format to render the value and the secondary label hint */
  timeFormat?: TimeFormat
  /** If true, the field will not be interactive */
  disabled?: boolean
  /** Name for form serialisation */
  name?: string
  /** Placeholder text */
  placeholder?: string
  /** The current value */
  modelValue?: TimeValue
}

const props = withDefaults(defineProps<AgDSTimeInputProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  block: false,
  disabled: false,
  maxWidth: 'md',
  timeFormat: 'h:mm aaa',
})

const emit = defineEmits<{
  'update:modelValue': [value: TimeValue]
  change: [value: TimeValue]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `time-input-${uid}`)

// ── Input value ───────────────────────────────────────────────────────────────

const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref(
  transformValuePropToInputValue(props.modelValue?.value, props.timeFormat),
)

// Sync when modelValue or timeFormat prop changes externally
watch(
  () => [props.modelValue, props.timeFormat] as const,
  ([newValue, newFormat]) => {
    inputValue.value = transformValuePropToInputValue(newValue?.value, newFormat)
  },
)

function handleInput(event: Event) {
  // Update the raw input immediately so the user can type freely
  inputValue.value = (event.target as HTMLInputElement).value
}

function handleBlur(event: FocusEvent) {
  const raw = (event.target as HTMLInputElement).value
  const normalizedTime = formatTime(raw, 'HH:mm')
  const timeValue: TimeValue = normalizedTime
    ? { formatted: formatTime(raw, props.timeFormat), value: normalizedTime }
    : undefined
  emit('update:modelValue', timeValue)
  emit('change', timeValue)
  emit('blur', event)
}

// ── Secondary label (e.g. "(e.g. 9:30 pm)") ──────────────────────────────────

const secondaryLabel = computed(() => {
  const fmt = acceptedTimeFormats.includes(props.timeFormat) ? props.timeFormat : 'h:mm aaa'
  return '(e.g. ' + formatTime('21:30', fmt) + ')'
})

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

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <AGDSField
    :label="label"
    :id="inputId"
    :hint="hint"
    :invalid="invalid"
    :message="message"
    :required="required"
    :hide-optional-label="hideOptionalLabel"
    :secondary-label="secondaryLabel"
    :max-width="maxWidth"
  >
    <template #default="slotProps">
      <input
        ref="inputRef"
        v-bind="slotProps"
        class="agds-time-input"
        :class="{
          'agds-time-input--invalid': invalid,
          'agds-time-input--block': block,
        }"
        :style="containerStyle"
        type="text"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="inputValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="emit('focus', $event)"
      />
    </template>
  </AGDSField>
</template>

<style scoped>
.agds-time-input {
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

.agds-time-input--block {
  width: 100%;
  max-width: none;
}

.agds-time-input:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-time-input:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-time-input--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-time-input--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-time-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .agds-time-input {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-time-input:focus-visible {
    outline-color: Highlight;
  }

  .agds-time-input:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
