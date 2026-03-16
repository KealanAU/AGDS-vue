<script setup lang="ts" generic="Option extends DefaultComboboxOption">
import { ref, shallowRef, computed, onUnmounted, getCurrentInstance } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui'
import AgDSField from '../field/AGDSField.vue'
import type { DefaultComboboxOption, ComboboxMaxWidth } from './comboboxUtils'

export type { DefaultComboboxOption, ComboboxMaxWidth }

export interface AgDSComboboxAsyncProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Async function called on each debounced keystroke to load matching options */
  fetchOptions: (query: string) => Promise<O[]>
  /** Visible label text for the input */
  label: string
  /** HTML id for the input — auto-generated when omitted */
  id?: string
  /** Id placed on the <label> element, for use with aria-labelledby */
  labelId?: string
  /** Hint text shown below the label */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Validation message — only shown when invalid is true */
  message?: string
  /** If false, "(optional)" is appended to the label */
  required?: boolean
  /** Suppresses "(optional)" even when required is false */
  hideOptionalLabel?: boolean
  /** Text prepended to the secondary label */
  secondaryLabel?: string
  /** Placeholder text */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** Disables the input */
  disabled?: boolean
  /** External loading state — adds aria-busy and spinner */
  loading?: boolean
  /** Screen reader text while loading. Default 'Loading' */
  loadingLabel?: string
  /** Message displayed when the fetch returns no results */
  emptyResultsMessage?: string
  /** Show a chevron button that opens/closes the dropdown. Default true */
  showDropdownTrigger?: boolean
  /** Show a × button to clear the current selection. Default false */
  clearable?: boolean
  /** Debounce delay in ms before fetchOptions is called. Default 300 */
  debounce?: number
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** The maximum width of the field */
  maxWidth?: ComboboxMaxWidth
}

const props = withDefaults(defineProps<AgDSComboboxAsyncProps<Option>>(), {
  invalid: false,
  required: false,
  disabled: false,
  block: false,
  loadingLabel: 'Loading',
  emptyResultsMessage: 'No results found',
  showDropdownTrigger: true,
  clearable: false,
  debounce: 300,
})

const emit = defineEmits<{
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// Public model: Option | null
const model = defineModel<Option | null>()

// Reka UI model: the selected option's value string, or undefined.
// The computed setter maps the string back to an Option object.
const selectedValue = computed<string | undefined>({
  get: () => model.value?.value,
  set: (val) => {
    if (val == null) {
      model.value = null
      return
    }
    const opt = options.value.find((o) => o.value === val)
    if (opt) model.value = opt
  },
})

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `agds-combobox-async-${uid}`)

const containerRef = ref<HTMLElement | null>(null)
const options = shallowRef<Option[]>([])
const isOpen = ref(false)
const isFetching = ref(false)
const networkError = ref(false)
const hasQueried = ref(false)
const statusMessage = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null
const cache: Record<string, Option[]> = {}

const isLoading = computed(() => isFetching.value || !!props.loading)
const inputText = ref('')
const showClear = computed(() => props.clearable && (model.value != null || inputText.value.length > 0))

// Only follow Reka UI's close signals (Escape, click outside, selection).
// We control opening ourselves from fetch results so the dropdown never opens empty.
function handleOpenChange(open: boolean) {
  if (!open) isOpen.value = false
}

// displayValue maps the Reka UI selected value string back to a display label.
// Checks current options first, falls back to the public model for cached selections.
function getDisplayValue(val: unknown): string {
  const v = val as string | undefined
  if (!v) return ''
  const opt = options.value.find((o) => o.value === v)
  if (opt) return opt.label
  return model.value?.value === v ? (model.value.label ?? '') : ''
}

async function doFetch(query: string) {
  const key = query.toLowerCase()
  if (cache[key]) {
    options.value = cache[key]
    networkError.value = false
    isFetching.value = false
    isOpen.value = true
    statusMessage.value =
      cache[key].length === 0
        ? props.emptyResultsMessage
        : `${cache[key].length} result${cache[key].length === 1 ? '' : 's'} available`
    return
  }
  try {
    const results = await props.fetchOptions(query)
    cache[key] = results
    options.value = results
    networkError.value = false
    statusMessage.value =
      results.length === 0
        ? props.emptyResultsMessage
        : `${results.length} result${results.length === 1 ? '' : 's'} available`
  } catch {
    options.value = []
    networkError.value = true
    statusMessage.value = ''
  } finally {
    isFetching.value = false
  }
}

function handleInput(event: Event) {
  const query = (event.target as HTMLInputElement).value
  inputText.value = query
  // Clear the selection when the user edits away from the selected label
  if (model.value != null && query !== model.value.label) {
    model.value = null
  }
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!query.trim()) {
    options.value = []
    isFetching.value = false
    isOpen.value = false
    hasQueried.value = false
    networkError.value = false
    statusMessage.value = ''
    return
  }
  // Show loading state immediately while debouncing so the dropdown opens right away
  hasQueried.value = true
  isFetching.value = true
  isOpen.value = true
  debounceTimer = setTimeout(() => doFetch(query), props.debounce)
}

function handleClear() {
  model.value = null
  options.value = []
  isOpen.value = false
  hasQueried.value = false
  isFetching.value = false
  networkError.value = false
  statusMessage.value = 'Selection cleared'
  inputText.value = ''
  getAnchorEl()?.querySelector('input')?.focus()
}

function getAnchorEl(): HTMLElement | null {
  const ref = containerRef.value as unknown as { $el?: HTMLElement } | null
  return ref?.$el ?? (ref as HTMLElement | null)
}

function toggleDropdown() {
  if (isOpen.value) {
    isOpen.value = false
  } else if (options.value.length > 0 || isFetching.value || networkError.value) {
    isOpen.value = true
  } else {
    const inputEl = getAnchorEl()?.querySelector('input') as HTMLInputElement | null
    if (inputEl?.value) doFetch(inputEl.value)
  }
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

defineExpose({ focus: () => getAnchorEl()?.querySelector('input')?.focus() })
</script>

<template>
  <AgDSField
    :label="label"
    :id="inputId"
    :label-id="labelId"
    :hint="hint"
    :invalid="invalid"
    :message="message"
    :required="required"
    :hide-optional-label="hideOptionalLabel"
    :secondary-label="secondaryLabel"
    :max-width="block ? undefined : maxWidth"
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
        :open="isOpen"
        :disabled="disabled"
        :name="name"
        :required="required"
        :ignore-filter="true"
        :open-on-focus="false"
        :open-on-click="false"
        class="agds-combobox-async"
        :class="{ 'agds-combobox-async--block': block }"
        @update:open="handleOpenChange"
      >
        <ComboboxAnchor
          ref="containerRef"
          class="agds-combobox-async__control"
          :class="{ 'agds-combobox-async__control--invalid': invalid }"
        >
          <ComboboxInput
            :id="fieldId"
            :display-value="getDisplayValue"
            class="agds-combobox-async__input"
            :placeholder="placeholder"
            :aria-required="ariaRequired"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby || undefined"
            :aria-busy="isLoading || undefined"
            :disabled="!!props.loading"
            @input="handleInput"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          />

          <!-- Spinner while fetching -->
          <span
            v-if="isLoading"
            class="agds-combobox-async__spinner"
            aria-hidden="true"
          />

          <!-- Clear button -->
          <button
            v-if="showClear && !isLoading"
            type="button"
            class="agds-combobox-async__btn agds-combobox-async__clear"
            aria-label="Clear selection"
            tabindex="-1"
            @mousedown.prevent="handleClear"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
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

          <!-- Divider between clear and trigger -->
          <span
            v-if="showClear && showDropdownTrigger && !isLoading"
            class="agds-combobox-async__divider"
            aria-hidden="true"
          />

          <!-- Dropdown trigger -->
          <button
            v-if="showDropdownTrigger"
            type="button"
            class="agds-combobox-async__btn"
            :class="{ 'agds-combobox-async__btn--open': isOpen }"
            :aria-label="isOpen ? 'Close options' : 'Open options'"
            tabindex="-1"
            :disabled="disabled"
            @mousedown.prevent="toggleDropdown"
          >
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
          </button>
        </ComboboxAnchor>

        <!-- Dropdown content — teleported to <body> to escape overflow clipping -->
        <ComboboxPortal>
          <ComboboxContent class="agds-combobox-async__content" :avoid-collisions="false">
            <ComboboxViewport class="agds-combobox-async__listbox">
              <!-- Loading state -->
              <li
                v-if="isFetching"
                class="agds-combobox-async__status"
                role="status"
              >
                {{ loadingLabel }}
              </li>

              <!-- Network error -->
              <li
                v-else-if="networkError"
                class="agds-combobox-async__status agds-combobox-async__status--error"
                role="alert"
              >
                Something went wrong.
              </li>

              <!-- Options or empty message -->
              <template v-else>
                <li
                  v-if="hasQueried && options.length === 0"
                  class="agds-combobox-async__status"
                  role="status"
                >
                  {{ emptyResultsMessage }}
                </li>

                <ComboboxItem
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                  class="agds-combobox-async__option"
                >
                  <slot name="option" :option="option">{{ option.label }}</slot>

                  <ComboboxItemIndicator class="agds-combobox-async__option-check">
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

      <!--
        aria-live region — always present in the DOM before content is injected.
        Announces result counts and selection changes. WCAG 4.1.3 Status Messages.
      -->
      <div aria-live="polite" aria-atomic="true" class="sr-only">
        {{ statusMessage }}
      </div>
    </template>
  </AgDSField>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */

.agds-combobox-async {
  position: relative;
  font-family: var(--agds-font-family-body);
}

.agds-combobox-async--block {
  display: block;
  width: 100%;
}

/* ── Control (anchor) ────────────────────────────────────── */

.agds-combobox-async__control {
  display: flex;
  align-items: center;
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  background-color: var(--agds-color-bg);
  transition: border-color var(--agds-transition-fast);
}

.agds-combobox-async__control:focus-within {
  border-color: var(--agds-color-focus);
  outline: var(--agds-color-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-combobox-async__control--invalid {
  border-color: var(--agds-color-error);
}

/* ── Input ───────────────────────────────────────────────── */

.agds-combobox-async__input {
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

.agds-combobox-async__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-combobox-async__input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Spinner ─────────────────────────────────────────────── */

.agds-combobox-async__spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-inline-end: var(--agds-space-2);
  border: 2px solid var(--agds-color-action-primary);
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-combobox-async-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes agds-combobox-async-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Icon buttons (clear + trigger) ─────────────────────── */

.agds-combobox-async__btn {
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

.agds-combobox-async__btn:hover:not(:disabled) {
  color: var(--agds-color-text);
}

.agds-combobox-async__btn--open svg {
  transform: rotate(180deg);
}

.agds-combobox-async__btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Divider between clear and trigger ──────────────────── */

.agds-combobox-async__divider {
  display: inline-block;
  width: 1px;
  height: 1.5rem;
  background-color: var(--agds-color-border);
  flex-shrink: 0;
}

/* ── Dropdown content ────────────────────────────────────── */

.agds-combobox-async__content {
  z-index: 100;
  width: var(--reka-combobox-trigger-width);
}

.agds-combobox-async__listbox {
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

.agds-combobox-async__option {
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

.agds-combobox-async__option[data-highlighted] {
  background-color: var(--agds-color-brand-muted);
  outline: none;
}

.agds-combobox-async__option[data-state='checked'] {
  font-weight: var(--agds-font-weight-bold, 700);
  color: var(--agds-color-action-primary);
}

.agds-combobox-async__option-check {
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
}

/* ── Status messages (loading / error / empty) ───────────── */

.agds-combobox-async__status {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  color: var(--agds-color-text-muted);
  font-style: italic;
  font-size: var(--agds-font-size-base);
}

.agds-combobox-async__status--error {
  color: var(--agds-color-error);
  font-style: normal;
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
