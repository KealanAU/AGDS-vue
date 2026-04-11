<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import AGDSField from '../field/AGDSField.vue'
import type { DefaultComboboxOption, ComboboxMaxWidth } from '../autocomplete/comboboxUtils'
import { filterOptions, generateOptions } from './timePickerUtils'
import type { TimeFormat } from '../time-input/timeInputUtils'

export interface AGDSTimePickerProps {
  /** Describes the purpose of the field */
  label: string
  /** Defines an identifier (ID) which must be unique. Auto-generated when omitted. */
  id?: string
  /** An id placed on the <label> element itself, for use with aria-labelledby. */
  labelId?: string
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
  /** Text to prepend to the default secondary label */
  secondaryLabel?: string
  /** Placeholder text for the input */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** If true, the field will not be interactive */
  disabled?: boolean
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** The maximum width of the field */
  maxWidth?: ComboboxMaxWidth
  /** Minutes between each generated option (1–180) */
  interval?: number
  /** Show a loading state in the dropdown */
  loading?: boolean
  /** The maximum time for options to end (HH:mm) */
  max?: string
  /** The minimum time for options to start (HH:mm) */
  min?: string
  /** The format used to display each option label */
  timeFormat?: TimeFormat
  /** Message shown when no options match the search term */
  emptyResultsMessage?: string
}

const props = withDefaults(defineProps<AGDSTimePickerProps>(), {
  invalid: false,
  required: false,
  disabled: false,
  block: false,
  loading: false,
  interval: 15,
  max: '24:00',
  min: '00:00',
  timeFormat: 'h:mm aaa',
  emptyResultsMessage: 'No options found',
})

const emit = defineEmits<{
  /** Emitted when the time picker input receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the time picker input loses focus. */
  blur: [event: FocusEvent]
}>()

// ── Model ─────────────────────────────────────────────────────────────────────

// Public v-model: DefaultComboboxOption | null
const model = defineModel<DefaultComboboxOption | null>({ default: null })

// Reka UI model: the option.value string, or undefined when nothing is selected
const selectedValue = computed<string | undefined>({
  get: () => model.value?.value,
  set: (val) => {
    model.value = val != null ? (options.value.find((o) => o.value === val) ?? null) : null
  },
})

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `agds-time-picker-${uid}`)

// ── Options ───────────────────────────────────────────────────────────────────

const options = computed(() =>
  generateOptions({
    interval: props.interval,
    max: props.max,
    min: props.min,
    timeFormat: props.timeFormat,
  }),
)

// Reset the search term whenever the option set is regenerated (e.g. timeFormat changes)
const searchTerm = ref('')
watch(options, () => {
  searchTerm.value = ''
})

const filteredOptions = computed(() => filterOptions(options.value, searchTerm.value))

// ── Expose ────────────────────────────────────────────────────────────────────

const containerRef = ref<HTMLElement | null>(null)
defineExpose({
  /** Moves keyboard focus to the time picker input. */
  focus: () => containerRef.value?.querySelector('input')?.focus(),
})
</script>

<template>
  <AGDSField
    :label="label"
    :id="inputId"
    :label-id="labelId"
    :hint="hint"
    :invalid="invalid"
    :message="message"
    :required="required"
    :hide-optional-label="hideOptionalLabel"
    :secondary-label="secondaryLabel"
    :max-width="maxWidth"
  >
    <template
      #default="{
        id: fieldId,
        'aria-required': ariaRequired,
        'aria-invalid': ariaInvalid,
        'aria-describedby': ariaDescribedby,
      }"
    >
      <ComboboxRoot
        v-model="selectedValue"
        :disabled="disabled"
        :name="name"
        :required="required"
        :ignore-filter="true"
        class="agds-time-picker"
        :class="{ 'agds-time-picker--block': block }"
      >
        <ComboboxAnchor
          ref="containerRef"
          class="agds-time-picker__control"
          :class="{ 'agds-time-picker__control--invalid': invalid }"
        >
          <!-- Search / display input -->
          <ComboboxInput
            :id="fieldId"
            v-model="searchTerm"
            :display-value="(val) => options.find((o) => o.value === val)?.label ?? ''"
            class="agds-time-picker__input"
            :placeholder="placeholder"
            :aria-required="ariaRequired"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby || undefined"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          />

          <!-- Dropdown trigger (chevron) -->
          <ComboboxTrigger class="agds-time-picker__trigger" :disabled="disabled">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </ComboboxTrigger>
        </ComboboxAnchor>

        <!-- Dropdown content — teleported to <body> to escape overflow clipping -->
        <ComboboxPortal>
          <ComboboxContent class="agds-time-picker__content" :avoid-collisions="false">
            <ComboboxViewport class="agds-time-picker__listbox">
              <!-- Loading state -->
              <div v-if="loading" class="agds-time-picker__loading" aria-live="polite">
                Loading…
              </div>

              <template v-else>
                <ComboboxEmpty class="agds-time-picker__empty">
                  {{ emptyResultsMessage }}
                </ComboboxEmpty>

                <ComboboxItem
                  v-for="option in filteredOptions"
                  :key="option.value"
                  :value="option.value"
                  class="agds-time-picker__option"
                >
                  {{ option.label }}

                  <ComboboxItemIndicator class="agds-time-picker__option-check">
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </template>
            </ComboboxViewport>
          </ComboboxContent>
        </ComboboxPortal>
      </ComboboxRoot>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */

.agds-time-picker {
  position: relative;
  font-family: var(--agds-font-family-body);
}

.agds-time-picker--block {
  display: block;
  width: 100%;
}

/* ── Control row (anchor) ────────────────────────────────── */

.agds-time-picker__control {
  display: flex;
  align-items: center;
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  background-color: var(--agds-color-bg);
  transition: border-color var(--agds-transition-fast);
}

.agds-time-picker__control:focus-within {
  border-color: var(--agds-color-focus);
  outline: var(--agds-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-time-picker__control--invalid {
  border-color: var(--agds-color-error);
}

/* ── Input ───────────────────────────────────────────────── */

.agds-time-picker__input {
  flex: 1;
  min-width: 0;
  height: 2.75rem;
  padding-inline: var(--agds-space-3);
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: var(--agds-font-size-base);
  color: var(--agds-color-text);
}

.agds-time-picker__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-time-picker__input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Trigger button (chevron) ────────────────────────────── */

.agds-time-picker__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--agds-color-text-muted);
  flex-shrink: 0;
  transition: color var(--agds-transition-fast);
}

.agds-time-picker__trigger:hover:not(:disabled) {
  color: var(--agds-color-text);
}

.agds-time-picker__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Listbox ─────────────────────────────────────────────── */

.agds-time-picker__content {
  z-index: 100;
  width: var(--reka-combobox-trigger-width);
}

.agds-time-picker__listbox {
  max-height: 16rem;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: var(--agds-space-1) 0;
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-md) solid var(--agds-color-focus);
  border-radius: var(--agds-border-radius, 0.25rem);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}

/* ── Options ─────────────────────────────────────────────── */

.agds-time-picker__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  cursor: pointer;
  font-size: var(--agds-font-size-base);
  color: var(--agds-color-text);
  transition: background-color var(--agds-transition-fast);
}

.agds-time-picker__option[data-highlighted] {
  background-color: var(--agds-color-brand-muted);
  outline: none;
}

.agds-time-picker__option[data-state='checked'] {
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-action-primary);
}

.agds-time-picker__option-check {
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
}

/* ── Empty / loading ─────────────────────────────────────── */

.agds-time-picker__empty,
.agds-time-picker__loading {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  color: var(--agds-color-text-muted);
  font-style: italic;
  font-size: var(--agds-font-size-base);
}

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  .agds-time-picker__listbox {
    box-shadow: none;
    border-color: ButtonText;
  }

  /* Background highlight is stripped; use Highlight system colour instead. */
  .agds-time-picker__option[data-highlighted] {
    background-color: Highlight;
    color: HighlightText;
    outline: none;
  }
}
</style>
