<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { FieldMaxWidth } from '../field/AGDSField.vue'

export type Option = {
  label: string
  value: string
  disabled?: boolean
}

export type OptionGroup = {
  label: string
  disabled?: boolean
  options: Option[]
}

export type Options = (Option | OptionGroup)[]

export type SelectMaxWidth = Extract<FieldMaxWidth, 'sm' | 'md' | 'lg' | 'xl'>

export interface AgDSSelectProps {
  /** Describes the purpose of the field */
  label: string
  /** If true, "(optional)" will never be appended to the label */
  hideOptionalLabel?: boolean
  /** The list of options to display in the drop-down list */
  options: Options
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
  /** Constrains the max-width of the field */
  maxWidth?: SelectMaxWidth
  // Native select props
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  /** HTML id for the select — auto-generated if not provided */
  id?: string
  name?: string
  placeholder?: string
  /** Bound value for v-model */
  modelValue?: string | number
}

const props = withDefaults(defineProps<AgDSSelectProps>(), {
  invalid: false,
  required: false,
  hideOptionalLabel: false,
  block: false,
  disabled: false,
  autoFocus: false,
  maxWidth: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const selectId = computed(() => props.id ?? `select-${uid}`)

// ── Ref & expose ──────────────────────────────────────────────────────────────

const selectRef = ref<HTMLSelectElement | null>(null)

defineExpose({ focus: () => selectRef.value?.focus() })

// ── Container max-width ───────────────────────────────────────────────────────

const MAX_WIDTH_MAP: Record<SelectMaxWidth, string> = {
  sm: '20ch',
  md: '30ch',
  lg: '40ch',
  xl: '60ch',
}

const containerStyle = computed(() =>
  props.block ? {} : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] },
)

// ── Handlers ──────────────────────────────────────────────────────────────────

function handleChange(event: Event) {
  if (props.disabled) return
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
  emit('change', event)
}
</script>

<template>
  <AGDSField
    :label="props.label"
    :id="selectId"
    :hint="props.hint"
    :invalid="props.invalid"
    :message="props.message"
    :required="props.required"
    :hide-optional-label="props.hideOptionalLabel"
    :max-width="props.maxWidth"
  >
    <template #default="slotProps">
      <!-- Wrapper: contains select + absolute-positioned chevron -->
      <div
        class="agds-select__container"
        :class="{ 'agds-select__container--block': props.block }"
        :style="containerStyle"
      >
        <select
          ref="selectRef"
          v-bind="slotProps"
          class="agds-select"
          :class="{
            'agds-select--invalid': props.invalid,
            'agds-select--block': props.block,
            'agds-select--disabled': props.disabled,
          }"
          :name="props.name"
          :disabled="props.disabled"
          :autocomplete="props.autoComplete"
          :autofocus="props.autoFocus || undefined"
          :value="props.modelValue"
          @change="handleChange"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        >
          <option v-if="props.placeholder" value="">{{ props.placeholder }}</option>
          <template v-for="opt in props.options" :key="'options' in opt ? opt.label : opt.value">
            <!-- Option group -->
            <optgroup
              v-if="'options' in opt"
              :label="opt.label"
              :disabled="opt.disabled"
            >
              <option
                v-for="child in opt.options"
                :key="child.value"
                :value="child.value"
                :disabled="child.disabled"
              >
                {{ child.label }}
              </option>
            </optgroup>
            <!-- Flat option -->
            <option
              v-else
              :value="opt.value"
              :disabled="opt.disabled"
            >
              {{ opt.label }}
            </option>
          </template>
        </select>

        <!-- Chevron icon — decorative, pointer-events: none -->
        <span
          class="agds-select__icon"
          :class="{ 'agds-select__icon--disabled': props.disabled }"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            focusable="false"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Container ───────────────────────────────────────────── */

.agds-select__container {
  position: relative;
  display: inline-block;
}

.agds-select__container--block {
  display: block;
  width: 100%;
}

/* ── Select ──────────────────────────────────────────────── */

.agds-select {
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  box-sizing: border-box;

  padding-inline-start: var(--agds-space-1, 1rem);
  /* border-width + icon width + desired right padding */
  padding-inline-end: calc(var(--agds-border-width-lg, 3px) + 2.5rem);
  padding-block: var(--agds-space-1, 0.75rem);
  margin: 0;

  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-lg, 3px) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 4px);
  color: var(--agds-color-text);

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal, 1.5);

  /* Truncate long option text */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: pointer;
  transition: border-color var(--agds-transition-fast, 100ms ease);
}

/* ── States ──────────────────────────────────────────────── */

.agds-select:hover:not(:disabled) {
  border-color: var(--agds-color-action-primary);
}

.agds-select:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-select--invalid {
  background-color: var(--agds-color-error-muted);
  border-color: var(--agds-color-error);
}

.agds-select--invalid:focus-visible {
  outline-color: var(--agds-color-error);
}

.agds-select:disabled,
.agds-select--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: var(--agds-color-border-muted, var(--agds-color-border));
  background-color: var(--agds-color-bg-subtle, #f5f5f5);
  color: var(--agds-color-text-muted);
}

/* ── Chevron icon ────────────────────────────────────────── */

.agds-select__icon {
  position: absolute;
  top: 50%;
  right: calc(var(--agds-border-width-lg, 3px) + 0.75rem);
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--agds-color-action-primary);
  display: inline-flex;
  align-items: center;
}

.agds-select__icon--disabled {
  opacity: 0.3;
}

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  .agds-select {
    border-color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-select:focus-visible {
    outline-color: Highlight;
  }

  .agds-select:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
