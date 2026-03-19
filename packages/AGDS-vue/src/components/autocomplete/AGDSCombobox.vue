<script setup lang="ts" generic="TOption extends DefaultComboboxOption">
import { computed, getCurrentInstance, ref } from 'vue'
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
import { filterOptions } from './comboboxUtils'
import type { DefaultComboboxOption } from './comboboxUtils'
import type { AGDSComboboxProps } from './comboboxTypes'

const props = withDefaults(defineProps<AGDSComboboxProps<TOption>>(), {
  invalid: false,
  required: false,
  disabled: false,
  block: false,
  clearable: false,
  emptyResultsMessage: 'No options found',
})

const emit = defineEmits<{
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// Public model: Option | null
const model = defineModel<TOption | null>({ default: null })

// Reka UI model: the option.value string, or undefined when nothing is selected.
// When Reka UI emits update:modelValue the computed setter maps the string back to an Option.
const selectedValue = computed<string | undefined>({
  get: () => model.value?.value,
  set: (val) => {
    model.value = val != null ? (props.options.find((o) => o.value === val) ?? null) : null
  },
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `agds-combobox-${uid}`)

// Search term drives our own filtering (ignoreFilter=true on ComboboxRoot bypasses Reka UI's
// built-in string matching so we can match on both label and value fields).
const searchTerm = ref('')
const filteredOptions = computed(() => filterOptions(props.options, searchTerm.value))

const containerRef = ref<HTMLElement | null>(null)
defineExpose({ focus: () => containerRef.value?.querySelector('input')?.focus() })
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
        class="agds-combobox"
        :class="{ 'agds-combobox--block': block }"
      >
        <ComboboxAnchor
          ref="containerRef"
          class="agds-combobox__control"
          :class="{ 'agds-combobox__control--invalid': invalid }"
        >
          <!-- Search / display input -->
          <ComboboxInput
            :id="fieldId"
            v-model="searchTerm"
            :display-value="(val) => options.find((o) => o.value === val)?.label ?? ''"
            class="agds-combobox__input"
            :placeholder="placeholder"
            :aria-required="ariaRequired"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby || undefined"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          />

          <!-- Clear button — shown when clearable and a selection exists -->
          <button
            v-if="clearable && model != null"
            type="button"
            class="agds-combobox__clear"
            aria-label="Clear selection"
            tabindex="-1"
            @mousedown.prevent="model = null"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Dropdown trigger -->
          <ComboboxTrigger class="agds-combobox__trigger" :disabled="disabled">
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
          <ComboboxContent class="agds-combobox__content" :avoid-collisions="false">
            <ComboboxViewport class="agds-combobox__listbox">
              <ComboboxEmpty class="agds-combobox__empty">
                {{ emptyResultsMessage }}
              </ComboboxEmpty>

              <ComboboxItem
                v-for="option in filteredOptions"
                :key="option.value"
                :value="option.value"
                class="agds-combobox__option"
              >
                <!-- Default render: plain label. Override with #item slot for rich content. -->
                <slot name="item" :option="option">{{ option.label }}</slot>

                <ComboboxItemIndicator class="agds-combobox__option-check">
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
            </ComboboxViewport>
          </ComboboxContent>
        </ComboboxPortal>
      </ComboboxRoot>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */

.agds-combobox {
  position: relative;
  font-family: var(--agds-font-family-body);
}

.agds-combobox--block {
  display: block;
  width: 100%;
}

/* ── Control row (anchor) ────────────────────────────────── */

.agds-combobox__control {
  display: flex;
  align-items: center;
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  background-color: var(--agds-color-bg);
  transition: border-color var(--agds-transition-fast);
}

.agds-combobox__control:focus-within {
  border-color: var(--agds-color-focus);
  outline: var(--agds-color-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-combobox__control--invalid {
  border-color: var(--agds-color-error);
}

/* ── Input ───────────────────────────────────────────────── */

.agds-combobox__input {
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

.agds-combobox__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-combobox__input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Icon buttons (clear + trigger) ─────────────────────── */

.agds-combobox__clear,
.agds-combobox__trigger {
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

.agds-combobox__clear:hover,
.agds-combobox__trigger:hover:not(:disabled) {
  color: var(--agds-color-text);
}

.agds-combobox__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Listbox ─────────────────────────────────────────────── */

.agds-combobox__content {
  z-index: 100;
  width: var(--reka-combobox-trigger-width);
}

.agds-combobox__listbox {
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

.agds-combobox__option {
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

.agds-combobox__option[data-highlighted] {
  background-color: var(--agds-color-brand-muted);
  outline: none;
}

.agds-combobox__option[data-state='checked'] {
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-action-primary);
}

.agds-combobox__option-check {
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
}

/* ── Empty message ───────────────────────────────────────── */

.agds-combobox__empty {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  color: var(--agds-color-text-muted);
  font-style: italic;
  font-size: var(--agds-font-size-base);
}
</style>
