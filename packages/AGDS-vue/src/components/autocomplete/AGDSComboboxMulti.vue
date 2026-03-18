<script setup lang="ts" generic="TOption extends DefaultComboboxOption">
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
import { filterOptions } from './comboboxUtils'
import type { DefaultComboboxOption, ComboboxMaxWidth } from './comboboxUtils'

export type { DefaultComboboxOption, ComboboxMaxWidth }

export interface AGDSComboboxMultiProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Describes the purpose of the field. */
  label: string
  /** Defines an identifier (ID) which must be unique. Auto-generated when omitted. */
  id?: string
  /** An id placed on the <label> element itself, for use with aria-labelledby. */
  labelId?: string
  /** Provides extra information about the field. */
  hint?: string
  /** If true, the invalid state will be rendered. */
  invalid?: boolean
  /** Message to show when the field is invalid. */
  message?: string
  /** If false, "(optional)" will be appended to the label. */
  required?: boolean
  /** If true, "(optional)" will never be appended to the label. */
  hideOptionalLabel?: boolean
  /** Text to prepend to the default secondary label. */
  secondaryLabel?: string
  /** The list of options to show in the dropdown. */
  options: O[]
  /** Placeholder text shown when no items are selected. */
  placeholder?: string
  /** Name attribute for form serialisation. */
  name?: string
  /** If true, the field will not be interactive. */
  disabled?: boolean
  /** If true, the field stretches to fill its container. */
  block?: boolean
  /** The maximum width of the field. */
  maxWidth?: ComboboxMaxWidth
  /** Message shown when no options match the search term. */
  emptyResultsMessage?: string
}

const props = withDefaults(defineProps<AGDSComboboxMultiProps<TOption>>(), {
  invalid: false,
  required: false,
  disabled: false,
  block: true,
  emptyResultsMessage: 'No options found',
})

const emit = defineEmits<{
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// Public model: Option[]
const model = defineModel<TOption[]>({ default: () => [] })

// Reka UI model: string[] (option.value for each selected option).
// The computed setter maps string values back to Option objects.
const selectedValues = computed<string[]>({
  get: () => model.value.map((o) => o.value),
  set: (vals) => {
    model.value = vals
      .map((v) => props.options.find((o) => o.value === v))
      .filter((o): o is TOption => o != null)
  },
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `agds-combobox-multi-${uid}`)

// Search term drives our own filtering. Also used to exclude already-selected items.
const searchTerm = ref('')
const filteredOptions = computed(() =>
  filterOptions(props.options, searchTerm.value, model.value),
)

// Polite aria-live announcement for selection changes (WCAG 4.1.3).
const statusMessage = ref('')
let prevLen = 0
watch(
  model,
  (newVal, oldVal) => {
    const prev = oldVal ?? []
    if (newVal.length > prev.length) {
      const added = newVal.find((n) => !prev.some((o) => o.value === n.value))
      statusMessage.value = `${added?.label ?? 'An item'} has been added.`
    } else if (newVal.length === 0 && prevLen > 0) {
      statusMessage.value = 'All items have been removed.'
    } else if (newVal.length < prev.length) {
      const removed = prev.find((o) => !newVal.some((n) => n.value === o.value))
      statusMessage.value = `${removed?.label ?? 'An item'} has been removed.`
    }
    prevLen = newVal.length
  },
  { deep: true },
)

function removeItem(item: TOption) {
  model.value = model.value.filter((o) => o.value !== item.value)
}

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
        v-model="selectedValues"
        multiple
        :disabled="disabled"
        :name="name"
        :required="required"
        :ignore-filter="true"
        :reset-search-term-on-select="true"
        :reset-search-term-on-blur="false"
        class="agds-combobox-multi"
        :class="{ 'agds-combobox-multi--block': block }"
      >
        <ComboboxAnchor
          ref="containerRef"
          class="agds-combobox-multi__control"
          :class="{ 'agds-combobox-multi__control--invalid': invalid }"
        >
          <!-- Selected items as removable tags -->
          <ul v-if="model.length" class="agds-combobox-multi__tags" aria-label="Selected items">
            <li
              v-for="item in model"
              :key="item.value"
              class="agds-combobox-multi__tag"
            >
              <span class="agds-combobox-multi__tag-label">{{ item.label }}</span>
              <button
                type="button"
                class="agds-combobox-multi__tag-remove"
                :aria-label="`Remove ${item.label}`"
                tabindex="-1"
                :disabled="disabled"
                @mousedown.prevent="removeItem(item)"
              >
                <svg
                  aria-hidden="true"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          </ul>

          <!-- Search input — displayValue returns '' so input clears after each selection -->
          <ComboboxInput
            :id="fieldId"
            v-model="searchTerm"
            :display-value="() => ''"
            class="agds-combobox-multi__input"
            :placeholder="model.length === 0 ? placeholder : undefined"
            :aria-required="ariaRequired"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby || undefined"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          />

          <ComboboxTrigger class="agds-combobox-multi__trigger" :disabled="disabled">
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
          <ComboboxContent class="agds-combobox-multi__content" :avoid-collisions="false">
            <ComboboxViewport class="agds-combobox-multi__listbox">
              <ComboboxEmpty class="agds-combobox-multi__empty">
                {{ emptyResultsMessage }}
              </ComboboxEmpty>

              <ComboboxItem
                v-for="option in filteredOptions"
                :key="option.value"
                :value="option.value"
                class="agds-combobox-multi__option"
              >
                <slot name="item" :option="option">{{ option.label }}</slot>

                <ComboboxItemIndicator class="agds-combobox-multi__option-check">
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

      <!--
        aria-live region — always present in the DOM before content is injected.
        Announces add/remove status changes to screen readers without moving focus.
        WCAG 4.1.3 Status Messages.
      -->
      <div aria-live="polite" aria-atomic="true" class="sr-only">
        {{ statusMessage }}
      </div>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */

.agds-combobox-multi {
  position: relative;
  font-family: var(--agds-font-family-body);
}

.agds-combobox-multi--block {
  display: block;
  width: 100%;
}

/* ── Control (anchor) ────────────────────────────────────── */

.agds-combobox-multi__control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--agds-space-1);
  min-height: 2.75rem;
  padding: var(--agds-space-1) var(--agds-space-1) var(--agds-space-1) var(--agds-space-2);
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  background-color: var(--agds-color-bg);
  transition: border-color var(--agds-transition-fast);
  cursor: text;
}

.agds-combobox-multi__control:focus-within {
  border-color: var(--agds-color-focus);
  outline: var(--agds-color-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-combobox-multi__control--invalid {
  border-color: var(--agds-color-error);
}

/* ── Tags list ───────────────────────────────────────────── */

.agds-combobox-multi__tags {
  display: contents;
  list-style: none;
  margin: 0;
  padding: 0;
}

.agds-combobox-multi__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-1);
  padding-block: 0.25rem;
  padding-inline: var(--agds-space-2) var(--agds-space-1);
  background-color: var(--agds-color-brand-muted);
  border-radius: var(--agds-border-radius, 0.25rem);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
  white-space: nowrap;
}

.agds-combobox-multi__tag-label {
  font-weight: var(--agds-font-weight-bold, 700);
}

.agds-combobox-multi__tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--agds-color-text-muted);
  transition: color var(--agds-transition-fast), background-color var(--agds-transition-fast);
}

.agds-combobox-multi__tag-remove:hover:not(:disabled) {
  color: var(--agds-color-text);
  background-color: var(--agds-color-border);
}

.agds-combobox-multi__tag-remove:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Input ───────────────────────────────────────────────── */

.agds-combobox-multi__input {
  flex: 1;
  min-width: 8ch;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: var(--agds-font-size-base);
  color: var(--agds-color-text);
}

.agds-combobox-multi__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-combobox-multi__input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Trigger ─────────────────────────────────────────────── */

.agds-combobox-multi__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--agds-color-text-muted);
  flex-shrink: 0;
  margin-inline-start: auto;
  transition: color var(--agds-transition-fast);
}

.agds-combobox-multi__trigger:hover:not(:disabled) {
  color: var(--agds-color-text);
}

.agds-combobox-multi__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Listbox ─────────────────────────────────────────────── */

.agds-combobox-multi__content {
  z-index: 100;
  width: var(--reka-combobox-trigger-width);
}

.agds-combobox-multi__listbox {
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

.agds-combobox-multi__option {
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

.agds-combobox-multi__option[data-highlighted] {
  background-color: var(--agds-color-brand-muted);
  outline: none;
}

.agds-combobox-multi__option[data-state='checked'] {
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-action-primary);
}

.agds-combobox-multi__option-check {
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
}

/* ── Empty message ───────────────────────────────────────── */

.agds-combobox-multi__empty {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  color: var(--agds-color-text-muted);
  font-style: italic;
  font-size: var(--agds-font-size-base);
}

/* ── sr-only utility ─────────────────────────────────────── */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
