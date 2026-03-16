<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'

export type TextareaMaxWidth = Extract<FieldMaxWidth, 'md' | 'lg' | 'xl'>

export interface AgDSTextareaProps {
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
  /** Constrains the max-width of the textarea. Ignored when block=true. */
  maxWidth?: TextareaMaxWidth
  // Native textarea props
  autoFocus?: boolean
  disabled?: boolean
  /** HTML id for the textarea — auto-generated if not provided */
  id?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  name?: string
  placeholder?: string
  rows?: number
  /** Bound value for v-model */
  modelValue?: string
}

const props = withDefaults(defineProps<AgDSTextareaProps>(), {
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
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `textarea-${uid}`)

// ── Value ─────────────────────────────────────────────────────────────────────

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const internalValue = ref(props.modelValue ?? '')

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
)

function handleInput(event: Event) {
  const val = (event.target as HTMLTextAreaElement).value
  internalValue.value = val
  emit('update:modelValue', val)
}

// ── Max-width ─────────────────────────────────────────────────────────────────

const MAX_WIDTH_MAP: Record<TextareaMaxWidth, string> = {
  md: '30ch',
  lg: '40ch',
  xl: '60ch',
}

const containerStyle = computed(() =>
  props.block ? { width: '100%' } : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] },
)

// ── Expose ────────────────────────────────────────────────────────────────────

defineExpose({ focus: () => textareaRef.value?.focus() })
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
      <textarea
        ref="textareaRef"
        v-bind="slotProps"
        class="agds-textarea"
        :class="{
          'agds-textarea--invalid': props.invalid,
          'agds-textarea--block': props.block,
        }"
        :style="containerStyle"
        :name="props.name"
        :disabled="props.disabled"
        :autofocus="props.autoFocus || undefined"
        :inputmode="props.inputMode"
        :placeholder="props.placeholder"
        :rows="props.rows"
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
.agds-textarea {
  display: block;
  box-sizing: border-box;
  appearance: none;
  margin: 0;
  resize: vertical;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);

  padding-block: var(--agds-space-1);
  padding-inline: var(--agds-space-2);

  min-height: 6rem;
  height: auto;

  border: var(--agds-border-width-lg, 3px) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);

  transition: border-color var(--agds-transition-fast, 100ms ease);
}

.agds-textarea--block {
  width: 100%;
  max-width: none;
}

.agds-textarea:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-textarea:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-textarea--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-textarea--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  resize: none;
}

@media (forced-colors: active) {
  .agds-textarea {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-textarea:focus-visible {
    outline-color: Highlight;
  }

  .agds-textarea:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
