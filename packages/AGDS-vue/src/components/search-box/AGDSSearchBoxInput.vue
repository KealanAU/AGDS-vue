<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import AgDSFlex from '../flex/AGDSFlex.vue'

export interface AgDSSearchBoxInputProps {
  /** Controlled value. When provided the component operates in controlled mode. */
  modelValue?: string
  /** Initial value for uncontrolled mode. Ignored when modelValue is provided. */
  defaultValue?: string
  /** Text shown (or announced via sr-only) as the input label. */
  label?: string
  /** When true the label is visible above the input; when false it is sr-only. */
  labelVisible?: boolean
  /** HTML id for the input. Auto-generated when omitted. */
  id?: string
  /** Native name attribute */
  name?: string
  /** Native placeholder attribute */
  placeholder?: string
}

const props = withDefaults(defineProps<AgDSSearchBoxInputProps>(), {
  label: 'Search',
  labelVisible: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// ── ID ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const inputId = computed(() => props.id ?? `search-${uid}`)

// ── Value — supports both controlled (v-model) and uncontrolled modes ─────────

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.defaultValue ?? '')

const value = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalValue.value,
)

const showClearButton = computed(() => Boolean(value.value))

function handleInput(event: Event) {
  const val = (event.target as HTMLInputElement).value
  internalValue.value = val
  emit('update:modelValue', val)
}

function clearInput() {
  internalValue.value = ''
  emit('update:modelValue', '')
  inputRef.value?.focus()
}

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <AgDSFlex flex-direction="column" style="width: 100%">
    <!-- Label — visible or sr-only -->
    <label
      :for="inputId"
      class="agds-search-box__label"
      :class="{ 'sr-only': !props.labelVisible }"
    >
      {{ props.label }}
    </label>

    <!-- Input wrapper — positions the clear button absolutely -->
    <div class="agds-search-box__input-wrapper">
      <input
        ref="inputRef"
        :id="inputId"
        type="search"
        autocomplete="off"
        class="agds-search-box__input"
        :class="{ 'agds-search-box__input--has-clear': showClearButton }"
        :name="props.name"
        :placeholder="props.placeholder"
        :value="value"
        @input="handleInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- Clear button — only rendered when there is a value -->
      <button
        v-if="showClearButton"
        type="button"
        class="agds-search-box__clear"
        @click="clearInput"
      >
        <!-- × icon via inline SVG so there is no external dependency -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        <span class="sr-only">Clear search</span>
      </button>
    </div>
  </AgDSFlex>
</template>

<style scoped>
/* ── Label ───────────────────────────────────────────────────────────── */

.agds-search-box__label {
  display: block;
  margin-bottom: var(--agds-space-1);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
}

/* ── Input wrapper ───────────────────────────────────────────────────── */

.agds-search-box__input-wrapper {
  position: relative;
}

/* ── Input ───────────────────────────────────────────────────────────── */

.agds-search-box__input {
  display: block;
  width: 100%;
  height: var(--agds-text-input-height, 3rem);
  padding-inline: var(--agds-space-3);
  padding-block: 0;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-foreground-text, var(--agds-color-text));
  background-color: var(--agds-color-background-body, #fff);

  border: var(--agds-border-width, 3px) solid var(--agds-color-border, #6e6e6e);
  border-right-width: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--agds-border-radius, 0.25rem);
  border-bottom-left-radius: var(--agds-border-radius, 0.25rem);

  appearance: none;
  -webkit-appearance: none;

  /* Hide the browser's built-in search cancel button — we provide our own */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}

.agds-search-box__input--has-clear {
  padding-right: 3rem;
}

.agds-search-box__input:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Clear button ────────────────────────────────────────────────────── */

.agds-search-box__clear {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 100%;

  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--agds-color-action-primary);

  padding: 0;
  appearance: none;
  -webkit-appearance: none;
}

.agds-search-box__clear:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-search-box__clear:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Screen-reader utility ───────────────────────────────────────────── */

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
