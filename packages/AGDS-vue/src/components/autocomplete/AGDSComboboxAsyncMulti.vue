<script setup lang="ts" generic="TOption extends DefaultComboboxOption">
import { ref, shallowRef, computed, watch, onUnmounted, getCurrentInstance } from 'vue'
import AGDSField from '../field/AGDSField.vue'
import type { DefaultComboboxOption } from './comboboxUtils'
import { filterOptions } from './comboboxUtils'
import type { AGDSComboboxAsyncMultiProps } from './comboboxTypes'

const props = withDefaults(defineProps<AGDSComboboxAsyncMultiProps<TOption>>(), {
  invalid: false,
  required: false,
  disabled: false,
  block: true,
  loadingLabel: 'Loading',
  emptyResultsMessage: 'No results found',
  debounce: 300,
})

const emit = defineEmits<{
  /** Emitted when the input receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the input loses focus (after a 150 ms delay to allow option clicks to register). */
  blur: [event: FocusEvent]
}>()

const model = defineModel<TOption[]>({ default: () => [] })

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `agds-combobox-async-multi-${uid}`)
const listboxId = computed(() => `${inputId.value}-listbox`)

const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const options = shallowRef<TOption[]>([])
const isOpen = ref(false)
const isFetching = ref(false)
const highlightedIndex = ref(-1)
const hasQueried = ref(false)
const statusMessage = ref('')
const srAnnouncement = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const isLoading = computed(() => isFetching.value || !!props.loading)

const activeOptionId = computed(() =>
  highlightedIndex.value >= 0
    ? `${listboxId.value}-option-${highlightedIndex.value}`
    : undefined,
)

// Screen reader announcements for selection changes (WCAG 4.1.3)
let prevLen = 0
watch(
  model,
  (newVal, oldVal) => {
    const prev = oldVal ?? []
    if (newVal.length > prev.length) {
      const added = newVal.find((n) => !prev.some((o) => o.value === n.value))
      srAnnouncement.value = `${added?.label ?? 'An item'} has been added.`
    } else if (newVal.length === 0 && prevLen > 0) {
      srAnnouncement.value = 'All items have been removed.'
    } else if (newVal.length < prev.length) {
      const removed = prev.find((o) => !newVal.some((n) => n.value === o.value))
      srAnnouncement.value = `${removed?.label ?? 'An item'} has been removed.`
    }
    prevLen = newVal.length
  },
  { deep: true },
)

async function doFetch(query: string) {
  isFetching.value = true
  hasQueried.value = true
  try {
    const results = await props.fetchOptions(query)
    const filtered = filterOptions(results, query, model.value)
    options.value = filtered
    isOpen.value = true
    highlightedIndex.value = -1
    statusMessage.value =
      filtered.length === 0
        ? props.emptyResultsMessage
        : `${filtered.length} result${filtered.length === 1 ? '' : 's'} available`
  } catch {
    options.value = []
    statusMessage.value = ''
  } finally {
    isFetching.value = false
  }
}

function handleInput() {
  const query = inputValue.value
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!query.trim()) {
    options.value = []
    isOpen.value = false
    hasQueried.value = false
    statusMessage.value = ''
    return
  }
  debounceTimer = setTimeout(() => doFetch(query), props.debounce)
}

function selectOption(option: TOption) {
  if (!model.value.some((o) => o.value === option.value)) {
    model.value = [...model.value, option]
  }
  inputValue.value = ''
  options.value = options.value.filter((o) => o.value !== option.value)
  isOpen.value = options.value.length > 0
  highlightedIndex.value = -1
  inputRef.value?.focus()
}

function removeItem(item: TOption) {
  model.value = model.value.filter((o) => o.value !== item.value)
}

function removeLastItem() {
  if (model.value.length > 0 && inputValue.value === '') {
    model.value = model.value.slice(0, -1)
  }
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value && options.value.length > 0) isOpen.value = true
      if (options.value.length > 0) {
        highlightedIndex.value = (highlightedIndex.value + 1) % options.value.length
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value && options.value.length > 0) isOpen.value = true
      if (options.value.length > 0) {
        highlightedIndex.value =
          highlightedIndex.value <= 0
            ? options.value.length - 1
            : highlightedIndex.value - 1
      }
      break
    case 'Enter':
      event.preventDefault()
      if (isOpen.value && highlightedIndex.value >= 0) {
        selectOption(options.value[highlightedIndex.value])
      } else if (isOpen.value && options.value.length > 0) {
        selectOption(options.value[0])
      }
      break
    case 'Escape':
      if (isOpen.value) {
        isOpen.value = false
        highlightedIndex.value = -1
      }
      break
    case 'Tab':
      isOpen.value = false
      break
    case 'Backspace':
      removeLastItem()
      break
  }
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  // Delay so mousedown on options fires before we close the dropdown
  setTimeout(() => {
    isOpen.value = false
    inputValue.value = ''
    emit('blur', event)
  }, 150)
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

defineExpose({
  /** Moves keyboard focus to the search input. */
  focus: () => inputRef.value?.focus(),
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
      <div
        class="agds-combobox-async-multi"
        :class="{ 'agds-combobox-async-multi--block': block }"
      >
        <!-- Control: tags + input row -->
        <div
          class="agds-combobox-async-multi__control"
          :class="{
            'agds-combobox-async-multi__control--invalid': invalid,
            'agds-combobox-async-multi__control--disabled': disabled,
            'agds-combobox-async-multi__control--open': isOpen,
          }"
        >
          <!-- Selected items as removable tags -->
          <ul
            v-if="model.length"
            class="agds-combobox-async-multi__tags"
            aria-label="Selected items"
          >
            <li
              v-for="item in model"
              :key="item.value"
              class="agds-combobox-async-multi__tag"
            >
              <span class="agds-combobox-async-multi__tag-label">{{ item.label }}</span>
              <button
                type="button"
                class="agds-combobox-async-multi__tag-remove"
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

          <!-- Search input -->
          <input
            :id="fieldId"
            ref="inputRef"
            v-model="inputValue"
            role="combobox"
            type="text"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            :aria-expanded="isOpen"
            aria-autocomplete="list"
            :aria-controls="listboxId"
            :aria-activedescendant="activeOptionId"
            :aria-required="ariaRequired"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby || undefined"
            :placeholder="model.length === 0 ? placeholder : undefined"
            :disabled="disabled || isLoading"
            :aria-busy="isLoading || undefined"
            :aria-disabled="disabled || undefined"
            class="agds-combobox-async-multi__input"
            @input="handleInput"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <!-- Spinner while fetching -->
          <span
            v-if="isLoading"
            class="agds-combobox-async-multi__spinner"
            aria-hidden="true"
          />
        </div>

        <!-- Listbox -->
        <ul
          v-show="isOpen"
          :id="listboxId"
          role="listbox"
          :aria-label="label"
          :aria-multiselectable="true"
          class="agds-combobox-async-multi__listbox"
        >
          <!-- Loading state -->
          <li
            v-if="isFetching"
            class="agds-combobox-async-multi__loading"
            role="status"
          >
            {{ loadingLabel }}
          </li>

          <!-- Empty results -->
          <li
            v-else-if="hasQueried && options.length === 0"
            class="agds-combobox-async-multi__empty"
            role="status"
          >
            {{ emptyResultsMessage }}
          </li>

          <!-- Options -->
          <li
            v-else
            v-for="(option, index) in options"
            :id="`${listboxId}-option-${index}`"
            :key="option.value"
            role="option"
            :aria-selected="model.some((o) => o.value === option.value)"
            :class="[
              'agds-combobox-async-multi__option',
              { 'agds-combobox-async-multi__option--highlighted': highlightedIndex === index },
            ]"
            @mousedown.prevent="selectOption(option)"
            @mousemove="highlightedIndex = index"
          >
            <slot name="option" :option="option">{{ option.label }}</slot>
          </li>
        </ul>

        <!--
          Status region — always present before content is injected.
          Announces result count to screen readers. WCAG 4.1.3.
        -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          {{ statusMessage }}
        </div>

        <!--
          Selection change announcements (add/remove).
          Separate region so add/remove messages don't clobber result counts.
        -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          {{ srAnnouncement }}
        </div>
      </div>
    </template>
  </AGDSField>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */

.agds-combobox-async-multi {
  position: relative;
  font-family: var(--agds-font-family-body);
}

.agds-combobox-async-multi--block {
  display: block;
  width: 100%;
}

/* ── Control row ─────────────────────────────────────────── */

.agds-combobox-async-multi__control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--agds-space-1);
  min-height: 2.75rem;
  padding: var(--agds-space-1) var(--agds-space-2);
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  background-color: var(--agds-color-bg);
  cursor: text;
  transition: border-color var(--agds-transition-fast);
}

.agds-combobox-async-multi__control:focus-within {
  border-color: var(--agds-color-focus);
  outline: var(--agds-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-combobox-async-multi__control--invalid {
  border-color: var(--agds-color-error);
}

.agds-combobox-async-multi__control--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.agds-combobox-async-multi__control--open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* ── Tags ────────────────────────────────────────────────── */

.agds-combobox-async-multi__tags {
  display: contents;
  list-style: none;
  margin: 0;
  padding: 0;
}

.agds-combobox-async-multi__tag {
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

.agds-combobox-async-multi__tag-label {
  font-weight: var(--agds-font-weight-bold, 700);
}

.agds-combobox-async-multi__tag-remove {
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

.agds-combobox-async-multi__tag-remove:hover:not(:disabled) {
  color: var(--agds-color-text);
  background-color: var(--agds-color-border);
}

.agds-combobox-async-multi__tag-remove:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ── Input ───────────────────────────────────────────────── */

.agds-combobox-async-multi__input {
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

.agds-combobox-async-multi__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-combobox-async-multi__input:disabled {
  cursor: not-allowed;
}

/* ── Spinner ─────────────────────────────────────────────── */

.agds-combobox-async-multi__spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-inline-start: auto;
  border: 2px solid var(--agds-color-action-primary);
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-combobox-async-multi-spin 0.6s linear infinite;
  flex-shrink: 0;
}

@keyframes agds-combobox-async-multi-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .agds-combobox-async-multi__spinner {
    animation: none;
  }
}

/* ── Listbox ─────────────────────────────────────────────── */

.agds-combobox-async-multi__listbox {
  position: absolute;
  inset-block-start: 100%;
  inset-inline: -2px; /* align flush with control border */
  z-index: 100;
  max-height: 16rem;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: var(--agds-space-1) 0;
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-md) solid var(--agds-color-focus);
  border-top: none;
  border-bottom-left-radius: var(--agds-border-radius, 0.25rem);
  border-bottom-right-radius: var(--agds-border-radius, 0.25rem);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}

/* ── Options ─────────────────────────────────────────────── */

.agds-combobox-async-multi__option {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  cursor: pointer;
  font-size: var(--agds-font-size-base);
  color: var(--agds-color-text);
  transition: background-color var(--agds-transition-fast);
}

.agds-combobox-async-multi__option--highlighted {
  background-color: var(--agds-color-brand-muted);
}

/* ── Loading / empty messages ────────────────────────────── */

.agds-combobox-async-multi__loading,
.agds-combobox-async-multi__empty {
  padding-block: var(--agds-space-2);
  padding-inline: var(--agds-space-3);
  color: var(--agds-color-text-muted);
  font-style: italic;
  font-size: var(--agds-font-size-base);
}

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  .agds-combobox-async-multi__listbox {
    box-shadow: none;
    border-color: ButtonText;
  }

  /* Background highlight is stripped; use Highlight system colour instead. */
  .agds-combobox-async-multi__option--highlighted {
    background-color: Highlight;
    color: HighlightText;
  }
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
