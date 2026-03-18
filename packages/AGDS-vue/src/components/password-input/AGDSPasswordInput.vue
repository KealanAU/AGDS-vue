<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'
import AGDSCheckbox from '../checkbox/AGDSCheckbox.vue'
import AGDSStack from '../stack/AGDSStack.vue'

export interface AGDSPasswordInputProps {
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
  /** Constrains the max-width of the input */
  maxWidth?: Extract<FieldMaxWidth, 'md' | 'lg' | 'xl'>
  // Native input props
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  /** HTML id for the input — auto-generated if not provided */
  id?: string
  maxLength?: number
  name?: string
  /** Bound value for v-model */
  modelValue?: string
}

const props = withDefaults(defineProps<AGDSPasswordInputProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  block: false,
  disabled: false,
  autoFocus: false,
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
const inputId = computed(() => props.id ?? `password-input-${uid}`)

// ── Show/hide toggle ──────────────────────────────────────────────────────────

const showPassword = ref(false)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

// ── Refs ──────────────────────────────────────────────────────────────────────

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <AGDSStack :gap="1">
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
          :type="inputType"
          class="agds-password-input__input"
          :class="{
            'agds-password-input__input--invalid': props.invalid,
            'agds-password-input__input--block': props.block,
          }"
          :name="props.name"
          :disabled="props.disabled"
          :autocomplete="props.autoComplete"
          :autofocus="props.autoFocus || undefined"
          :maxlength="props.maxLength"
          :value="props.modelValue"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          @change="emit('change', $event)"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        />
      </template>
    </AGDSField>

    <AGDSCheckbox
      v-model="showPassword"
      :aria-controls="inputId"
      :disabled="props.disabled"
      size="sm"
    >
      Show password
    </AGDSCheckbox>
  </AGDSStack>
</template>

<style scoped>
/* ── Input ──────────────────────────────────────────────── */

.agds-password-input__input {
  display: block;
  width: 30ch;
  box-sizing: border-box;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal, 1.5);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);
  padding: var(--agds-space-1) var(--agds-space-2);
  transition: border-color var(--agds-transition-fast, 100ms ease);
}

.agds-password-input__input:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-password-input__input:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-password-input__input--invalid {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-password-input__input--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-password-input__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.agds-password-input__input--block {
  width: 100%;
}

/* Forced colours (Windows High Contrast) */
@media (forced-colors: active) {
  .agds-password-input__input {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-password-input__input:focus-visible {
    outline-color: Highlight;
  }

  .agds-password-input__input:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
