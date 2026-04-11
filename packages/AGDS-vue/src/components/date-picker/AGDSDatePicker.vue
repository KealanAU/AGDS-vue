<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  useId,
} from 'vue'
import { PopoverRoot, PopoverPortal, PopoverContent, PopoverAnchor } from 'reka-ui'
import AGDSDatePickerCalendar from './AGDSDatePickerCalendar.vue'
import type { DatePickerSingleValue, DatePickerRangeValue, AGDSDatePickerProps } from './datePickerTypes'

// ── Date utilities ───────────────────────────────────────────────────────────

function padStart2(n: number) {
  return String(n).padStart(2, '0')
}

/**
 * Format a Date to `dd/MM/yyyy` (or supported variant).
 * Only `dd/MM/yyyy` and `MM/dd/yyyy` are supported as dateFormat values.
 */
function formatDate(date: Date, fmt: string): string {
  const d = padStart2(date.getDate())
  const m = padStart2(date.getMonth() + 1)
  const y = String(date.getFullYear())
  return fmt.replace('dd', d).replace('MM', m).replace('yyyy', y)
}

/**
 * Parse a user-entered string as a date.
 * Tries the supplied format first, then ISO 8601.
 * Returns `null` when the input cannot be parsed to a valid date.
 */
function parseDate(input: string, fmt: string): Date | null {
  if (!input.trim()) return null

  // Try fmt pattern (dd/MM/yyyy or MM/dd/yyyy)
  const sep = fmt.includes('/') ? '/' : fmt.includes('-') ? '-' : '/'
  const parts = input.split(sep)
  if (parts.length === 3) {
    const fmtParts = fmt.split(sep)
    const map: Record<string, number> = {}
    fmtParts.forEach((token, i) => {
      map[token] = parseInt(parts[i] ?? '', 10)
    })
    const d = map['dd'] ?? map['d']
    const m = map['MM'] ?? map['M']
    const y = map['yyyy']
    if (y && String(y).length === 4 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      const date = new Date(y, m - 1, d)
      if (date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d) {
        return date
      }
    }
  }

  // Try ISO 8601 (yyyy-MM-dd or full ISO string)
  if (/^\d{4}-\d{2}-\d{2}/.test(input)) {
    const date = new Date(input)
    if (!isNaN(date.getTime())) return date
  }

  return null
}

/** Return a placeholder date string in the given format, e.g. "DD/MM/YYYY" */
function getPlaceholder(fmt: string): string {
  return fmt.replace('dd', 'DD').replace('MM', 'MM').replace('yyyy', 'YYYY')
}

/** Example date string for the secondary label, e.g. "e.g. 25/03/2026" */
function getExample(date: Date, fmt: string): string {
  return `(e.g. ${formatDate(date, fmt)})`
}

/** Subtract n calendar months from a date (no date-fns required) */
function subMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() - n, date.getDate())
}

/**
 * Calculate which month the calendar should open to in range mode.
 * Handles mismatched ranges (from > to) and dual-month offset correctly.
 */
function getCalendarDefaultMonth(
  inputMode: 'from' | 'to' | undefined,
  from: Date | null,
  to: Date | null,
  yearRange: { from: number; to: number } | undefined,
  numberOfMonths: 1 | 2,
): Date | undefined {
  if (inputMode === 'from') {
    // Mismatched range: from is after to — open to's month, shifted for dual view
    if (from && to && from > to) return subMonths(to, numberOfMonths === 2 ? 1 : 0)
    if (from) return from
    if (to) return subMonths(to, numberOfMonths === 2 ? 1 : 0)
    return undefined
  }

  if (inputMode === 'to') {
    // Mismatched: to is before from — open from's month
    if (from && to && to < from) return from
    if (to) return subMonths(to, numberOfMonths === 2 ? 1 : 0)
    if (from) return from
    return undefined
  }

  // No input mode: use closest boundary to today when yearRange is set
  if (yearRange) {
    const earliest = new Date(yearRange.from, 0, 1)
    const latest = new Date(yearRange.to, 11, 31)
    const now = Date.now()
    return Math.abs(now - earliest.getTime()) <= Math.abs(now - latest.getTime())
      ? earliest
      : latest
  }

  return undefined
}

// ── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<AGDSDatePickerProps>(), {
  range: false,
  modelValue: null,
  label: undefined,
  fromLabel: 'Start date',
  toLabel: 'End date',
  id: undefined,
  hint: undefined,
  message: undefined,
  invalid: false,
  fromInvalid: false,
  toInvalid: false,
  disabled: false,
  required: false,
  hideOptionalLabel: false,
  minDate: undefined,
  maxDate: undefined,
  yearRange: undefined,
  dateFormat: 'dd/MM/yyyy',
})

const emit = defineEmits<{
  /** Emits `Date | null` in single mode or `{ from, to }` in range mode. */
  'update:modelValue': [value: DatePickerSingleValue | DatePickerRangeValue]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// ── Unique IDs ────────────────────────────────────────────────────────────────
// useId() (Vue 3.5+) generates stable, SSR-safe IDs that match between server
// and client, preventing hydration attribute mismatches in Nuxt.

const uid = useId()
const inputId = computed(() => props.id ?? `agds-datepicker-${uid}`)
const fromInputId = computed(() => `agds-datepicker-${uid}-from`)
const toInputId = computed(() => `agds-datepicker-${uid}-to`)
const hintId = computed(() => `agds-datepicker-${uid}-hint`)
const messageId = computed(() => `agds-datepicker-${uid}-message`)

// ── Optional label ────────────────────────────────────────────────────────────

const optionalSuffix = computed(() =>
  !props.required && !props.hideOptionalLabel ? ' (optional)' : '',
)

// ── Derived value helpers ─────────────────────────────────────────────────────

const singleValue = computed<Date | null>(() => {
  if (props.range) return null
  return (props.modelValue as DatePickerSingleValue) ?? null
})

const rangeValue = computed<DatePickerRangeValue>(() => {
  if (!props.range) return { from: null, to: null }
  return (props.modelValue as DatePickerRangeValue) ?? { from: null, to: null }
})

// ── Input text state ──────────────────────────────────────────────────────────

function dateToText(date: Date | null | undefined): string {
  if (!date) return ''
  return formatDate(date, props.dateFormat)
}

// Single mode
const singleInputText = ref(dateToText(singleValue.value))

// Range mode
const fromInputText = ref(dateToText(rangeValue.value.from))
const toInputText = ref(dateToText(rangeValue.value.to))

// Sync input text when model value changes externally
watch(singleValue, (val) => {
  singleInputText.value = dateToText(val)
})

watch(
  () => rangeValue.value.from,
  (val) => {
    fromInputText.value = dateToText(val)
  },
)

watch(
  () => rangeValue.value.to,
  (val) => {
    toInputText.value = dateToText(val)
  },
)

// ── Popover state ─────────────────────────────────────────────────────────────

const isOpen = ref(false)
/** Which range input opened the calendar ('from' | 'to' | undefined in single mode) */
const inputMode = ref<'from' | 'to' | undefined>(undefined)

const singleTriggerRef = ref<HTMLButtonElement | null>(null)
const fromTriggerRef = ref<HTMLButtonElement | null>(null)
const toTriggerRef = ref<HTMLButtonElement | null>(null)
const calendarRef = ref<InstanceType<typeof AGDSDatePickerCalendar> | null>(null)

function openCalendar(mode?: 'from' | 'to') {
  inputMode.value = mode
  isOpen.value = true
}

function closeCalendar() {
  isOpen.value = false
}

function closeAndReturnFocus() {
  closeCalendar()
  nextTick(() => {
    if (inputMode.value === 'to') toTriggerRef.value?.focus()
    else if (inputMode.value === 'from') fromTriggerRef.value?.focus()
    else singleTriggerRef.value?.focus()
  })
}

// Single mode trigger click
function onSingleTriggerClick() {
  if (isOpen.value) {
    closeAndReturnFocus()
  } else {
    openCalendar(undefined)
  }
}

// Range mode trigger clicks
function onFromTriggerClick() {
  if (isOpen.value && inputMode.value === 'from') {
    closeAndReturnFocus()
  } else {
    openCalendar('from')
  }
}

function onToTriggerClick() {
  if (isOpen.value && inputMode.value === 'to') {
    closeAndReturnFocus()
  } else {
    openCalendar('to')
  }
}

// Focus the right day after the calendar opens
watch(isOpen, (open) => {
  if (open) {
    nextTick(() => calendarRef.value?.focusInitialDay())
  }
})

// ── Responsive: number of months for range mode ───────────────────────────────

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const numberOfMonths = computed<1 | 2>(() => {
  if (!props.range) return 1
  return windowWidth.value >= 768 ? 2 : 1
})

// ── Calendar default month ────────────────────────────────────────────────────

const calendarDefaultMonth = computed<Date | undefined>(() => {
  if (!props.range) {
    return singleValue.value ?? undefined
  }
  return getCalendarDefaultMonth(
    inputMode.value,
    rangeValue.value.from,
    rangeValue.value.to,
    props.yearRange,
    numberOfMonths.value,
  )
})

// ── Calendar selection handler ────────────────────────────────────────────────

function onCalendarSelect(date: Date) {
  if (!props.range) {
    // Single mode: close after selection
    emit('update:modelValue', date)
    closeAndReturnFocus()
    return
  }

  // Range mode
  const current = rangeValue.value
  let from = current.from
  let to = current.to

  if (inputMode.value === 'from') {
    from = date
    // If new from is after existing to, clear to
    if (to && from > to) to = null
  } else if (inputMode.value === 'to') {
    to = date
    // If new to is before existing from, swap
    if (from && to < from) {
      ;[from, to] = [to, from]
    }
  }

  emit('update:modelValue', { from, to })

  // Auto-advance: after setting 'from', switch to 'to' if not yet set
  if (inputMode.value === 'from' && !to) {
    inputMode.value = 'to'
    nextTick(() => calendarRef.value?.focusInitialDay())
    return
  }

  // After setting 'to', advance to 'from' if it's missing
  if (inputMode.value === 'to' && !from) {
    inputMode.value = 'from'
    nextTick(() => calendarRef.value?.focusInitialDay())
    return
  }

  // Both ends are set — close calendar
  if (from && to) {
    closeAndReturnFocus()
  }
}

// ── Input text handlers ───────────────────────────────────────────────────────

// Single mode
function onSingleInputChange(e: Event) {
  singleInputText.value = (e.target as HTMLInputElement).value
}

function onSingleInputBlur(e: FocusEvent) {
  const parsed = parseDate(singleInputText.value, props.dateFormat)
  emit('update:modelValue', parsed)
  emit('blur', e)
}

// Range mode — from input
function onFromInputChange(e: Event) {
  fromInputText.value = (e.target as HTMLInputElement).value
}

function onFromInputBlur(e: FocusEvent) {
  const parsed = parseDate(fromInputText.value, props.dateFormat)
  let from: Date | null = parsed
  let to = rangeValue.value.to
  // Ensure valid order
  if (from && to && from > to) to = null
  emit('update:modelValue', { from, to })
  emit('blur', e)
}

// Range mode — to input
function onToInputChange(e: Event) {
  toInputText.value = (e.target as HTMLInputElement).value
}

function onToInputBlur(e: FocusEvent) {
  const parsed = parseDate(toInputText.value, props.dateFormat)
  let from = rangeValue.value.from
  let to: Date | null = parsed
  // Ensure valid order
  if (from && to && to < from) {
    ;[from, to] = [to, from]
  }
  emit('update:modelValue', { from, to })
  emit('blur', e)
}

// ── Aria helpers ──────────────────────────────────────────────────────────────

function describedBy(invalid: boolean) {
  const ids: string[] = []
  if (invalid && props.message) ids.push(messageId.value)
  if (props.hint) ids.push(hintId.value)
  return ids.join(' ') || undefined
}

function buttonLabel(rangeName?: 'start' | 'end', inputText?: string): string {
  const prefix = rangeName ? `${rangeName} date` : 'date'
  if (!inputText) return `Choose ${prefix}`
  const parsed = parseDate(inputText, props.dateFormat)
  if (!parsed) return `Choose ${prefix}`
  const human = parsed.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return `Change ${prefix}, ${human}`
}

// ── Expose ────────────────────────────────────────────────────────────────────

defineExpose({
  focus: () => {
    if (props.range) fromTriggerRef.value?.focus()
    else singleTriggerRef.value?.focus()
  },
})
</script>

<template>
  <!-- ── Single mode ───────────────────────────────────────────────────────── -->
  <div v-if="!props.range" class="agds-datepicker">
    <!-- Field wrapper -->
    <div
      class="agds-datepicker__field"
      :class="{ 'agds-datepicker__field--invalid': invalid }"
    >
      <!-- Label -->
      <label
        :for="inputId"
        class="agds-datepicker__label"
      >
        {{ label }}<span v-if="optionalSuffix" class="agds-datepicker__optional">{{ optionalSuffix }}</span>
      </label>

      <!-- Secondary label: example date -->
      <span class="agds-datepicker__secondary-label" aria-hidden="true">
        {{ getExample(minDate ?? maxDate ?? new Date(), dateFormat) }}
      </span>

      <!-- Hint -->
      <span v-if="hint" :id="hintId" class="agds-datepicker__hint">{{ hint }}</span>

      <!-- Message -->
      <span v-if="invalid && message" :id="messageId" class="agds-datepicker__message" role="alert">
        {{ message }}
      </span>

      <!-- Input row with Popover anchor -->
      <PopoverRoot v-model:open="isOpen">
        <PopoverAnchor as-child>
          <div class="agds-datepicker__input-row" :class="{ 'agds-datepicker__input-row--open': isOpen }">
            <input
              :id="inputId"
              type="text"
              class="agds-datepicker__input"
              :class="{ 'agds-datepicker__input--invalid': invalid }"
              :value="singleInputText"
              :disabled="disabled"
              :required="required || undefined"
              :aria-invalid="invalid || undefined"
              :aria-required="required || undefined"
              :aria-describedby="describedBy(invalid)"
              :placeholder="getPlaceholder(dateFormat)"
              autocomplete="off"
              v-bind="$attrs"
              @change="onSingleInputChange"
              @blur="onSingleInputBlur"
              @focus="emit('focus', $event)"
            />
            <button
              ref="singleTriggerRef"
              type="button"
              class="agds-datepicker__trigger"
              :disabled="disabled"
              :aria-expanded="isOpen"
              :aria-label="buttonLabel(undefined, singleInputText)"
              :aria-haspopup="'dialog'"
              @click="onSingleTriggerClick"
            >
              <!-- Calendar icon -->
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
          </div>
        </PopoverAnchor>

        <PopoverPortal>
          <PopoverContent
            class="agds-datepicker__popover"
            side="bottom"
            align="start"
            :side-offset="4"
            :trap-focus="false"
            :disable-outside-pointer-events="false"
            role="dialog"
            :aria-label="label ? `Choose ${label.toLowerCase()}` : 'Choose date'"
            aria-modal="true"
            @open-auto-focus.prevent
            @escape-key-down.prevent="closeAndReturnFocus"
          >
            <AGDSDatePickerCalendar
              ref="calendarRef"
              mode="single"
              :selected-date="singleValue"
              :min-date="minDate"
              :max-date="maxDate"
              :default-month="calendarDefaultMonth"
              :number-of-months="1"
              :year-range="yearRange"
              @select="onCalendarSelect"
            />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </div>

  <!-- ── Range mode ────────────────────────────────────────────────────────── -->
  <fieldset
    v-else
    class="agds-datepicker agds-datepicker--range"
    :class="{ 'agds-datepicker--invalid': fromInvalid || toInvalid }"
  >
    <!-- Legend (screen-reader visible even without visible text) -->
    <legend class="agds-datepicker__legend" :class="{ 'sr-only': !label }">
      {{ label ?? 'Date range' }}<span v-if="optionalSuffix" class="agds-datepicker__optional">{{ optionalSuffix }}</span>
    </legend>

    <!-- Shared hint -->
    <span v-if="hint" :id="hintId" class="agds-datepicker__hint">{{ hint }}</span>

    <!-- Shared message (shown when either is invalid) -->
    <span
      v-if="(fromInvalid || toInvalid) && message"
      :id="messageId"
      class="agds-datepicker__message"
      role="alert"
    >
      {{ message }}
    </span>

    <!-- Both inputs in a single popover anchor so the panel aligns to the row -->
    <PopoverRoot v-model:open="isOpen">
      <PopoverAnchor as-child>
        <div class="agds-datepicker__range-row">
          <!-- From field -->
          <div
            class="agds-datepicker__field"
            :class="{ 'agds-datepicker__field--invalid': fromInvalid }"
          >
            <label :for="fromInputId" class="agds-datepicker__label agds-datepicker__label--range">
              {{ fromLabel }}
            </label>
            <span class="agds-datepicker__secondary-label" aria-hidden="true">
              {{ getExample(minDate ?? new Date(), dateFormat) }}
            </span>
            <div
              class="agds-datepicker__input-row"
              :class="{
                'agds-datepicker__input-row--open': isOpen && inputMode === 'from',
                'agds-datepicker__input-row--highlighted': isOpen && inputMode === 'from',
              }"
            >
              <input
                :id="fromInputId"
                type="text"
                class="agds-datepicker__input"
                :class="{ 'agds-datepicker__input--invalid': fromInvalid }"
                :value="fromInputText"
                :disabled="disabled"
                :required="required || undefined"
                :aria-invalid="fromInvalid || undefined"
                :aria-required="required || undefined"
                :aria-describedby="describedBy(fromInvalid)"
                :placeholder="getPlaceholder(dateFormat)"
                autocomplete="off"
                @change="onFromInputChange"
                @blur="onFromInputBlur"
                @focus="emit('focus', $event)"
              />
              <button
                ref="fromTriggerRef"
                type="button"
                class="agds-datepicker__trigger"
                :disabled="disabled"
                :aria-expanded="isOpen && inputMode === 'from'"
                :aria-label="buttonLabel('start', fromInputText)"
                :aria-haspopup="'dialog'"
                @click="onFromTriggerClick"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>

          <!-- To field -->
          <div
            class="agds-datepicker__field"
            :class="{ 'agds-datepicker__field--invalid': toInvalid }"
          >
            <label :for="toInputId" class="agds-datepicker__label agds-datepicker__label--range">
              {{ toLabel }}
            </label>
            <span class="agds-datepicker__secondary-label" aria-hidden="true">
              {{ getExample(maxDate ?? new Date(), dateFormat) }}
            </span>
            <div
              class="agds-datepicker__input-row"
              :class="{
                'agds-datepicker__input-row--open': isOpen && inputMode === 'to',
                'agds-datepicker__input-row--highlighted': isOpen && inputMode === 'to',
              }"
            >
              <input
                :id="toInputId"
                type="text"
                class="agds-datepicker__input"
                :class="{ 'agds-datepicker__input--invalid': toInvalid }"
                :value="toInputText"
                :disabled="disabled"
                :required="required || undefined"
                :aria-invalid="toInvalid || undefined"
                :aria-required="required || undefined"
                :aria-describedby="describedBy(toInvalid)"
                :placeholder="getPlaceholder(dateFormat)"
                autocomplete="off"
                @change="onToInputChange"
                @blur="onToInputBlur"
                @focus="emit('focus', $event)"
              />
              <button
                ref="toTriggerRef"
                type="button"
                class="agds-datepicker__trigger"
                :disabled="disabled"
                :aria-expanded="isOpen && inputMode === 'to'"
                :aria-label="buttonLabel('end', toInputText)"
                :aria-haspopup="'dialog'"
                @click="onToTriggerClick"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          class="agds-datepicker__popover"
          side="bottom"
          align="start"
          :side-offset="4"
          :trap-focus="false"
          :disable-outside-pointer-events="false"
          role="dialog"
          aria-label="Choose date range"
          aria-modal="true"
          @open-auto-focus.prevent
          @escape-key-down.prevent="closeAndReturnFocus"
        >
          <AGDSDatePickerCalendar
            ref="calendarRef"
            mode="range"
            :selected-from="rangeValue.from"
            :selected-to="rangeValue.to"
            :input-mode="inputMode"
            :min-date="minDate"
            :max-date="maxDate"
            :default-month="calendarDefaultMonth"
            :number-of-months="numberOfMonths"
            :year-range="yearRange"
            @select="onCalendarSelect"
          />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </fieldset>
</template>

<style scoped>
/* ── Reset fieldset ──────────────────────────────────────────────────────── */

.agds-datepicker--range {
  border: none;
  padding: 0;
  margin: 0;
}

/* ── Field wrapper ───────────────────────────────────────────────────────── */

.agds-datepicker__field {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

/* ── Label ───────────────────────────────────────────────────────────────── */

.agds-datepicker__label {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-normal);
}

.agds-datepicker__legend {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-normal);
  padding: 0;
  margin-bottom: var(--agds-space-2);
}

.agds-datepicker__optional {
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-text-muted);
}

/* ── Secondary label (example date) ─────────────────────────────────────── */

.agds-datepicker__secondary-label {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-normal);
}

/* ── Hint ────────────────────────────────────────────────────────────────── */

.agds-datepicker__hint {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-normal);
  margin-bottom: var(--agds-space-1);
}

/* ── Error message ───────────────────────────────────────────────────────── */

.agds-datepicker__message {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-error);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-normal);
  display: flex;
  align-items: center;
  gap: var(--agds-space-1);
}

.agds-datepicker__message::before {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='12'/%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='12'/%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'/%3E%3C/svg%3E") center / contain no-repeat;
  flex-shrink: 0;
}

/* ── Input row (text input + calendar button) ────────────────────────────── */

.agds-datepicker__input-row {
  display: inline-flex;
  align-items: stretch;
  max-width: 16rem;
  border-radius: var(--agds-radius-md);
}

.agds-datepicker__input-row--highlighted {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Text input ──────────────────────────────────────────────────────────── */

.agds-datepicker__input {
  flex: 1;
  min-width: 0;
  height: 2.75rem;
  padding: 0 var(--agds-space-3);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-right: none;
  border-radius: var(--agds-radius-md) 0 0 var(--agds-radius-md);
  outline: none;
  transition: border-color var(--agds-transition-fast);
  width: 100%;
}

.agds-datepicker__input::placeholder {
  color: var(--agds-color-text-muted);
}

.agds-datepicker__input:focus {
  border-color: var(--agds-color-action-primary);
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 0;
}

.agds-datepicker__input--invalid,
.agds-datepicker__field--invalid .agds-datepicker__input {
  border-color: var(--agds-color-error);
  background-color: var(--agds-color-error-muted);
}

.agds-datepicker__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--agds-color-bg-subtle);
}

/* ── Calendar trigger button ─────────────────────────────────────────────── */

.agds-datepicker__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  flex-shrink: 0;
  background-color: transparent;
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: 0 var(--agds-radius-md) var(--agds-radius-md) 0;
  color: var(--agds-color-action-primary);
  cursor: pointer;
  transition:
    background-color var(--agds-transition-fast),
    border-color var(--agds-transition-fast),
    color var(--agds-transition-fast);
}

.agds-datepicker__trigger:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-hover);
}

.agds-datepicker__trigger:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  z-index: 1;
}

.agds-datepicker__trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.agds-datepicker__trigger svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Active state — trigger is pressed / calendar is open */
.agds-datepicker__input-row--open .agds-datepicker__trigger,
.agds-datepicker__trigger[aria-expanded='true'] {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg);
}

/* ── Invalid field trigger border ────────────────────────────────────────── */

.agds-datepicker__field--invalid .agds-datepicker__trigger {
  border-color: var(--agds-color-error);
}

/* ── Range row ───────────────────────────────────────────────────────────── */

.agds-datepicker__range-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--agds-space-6);
  margin-top: var(--agds-space-1);
}

/* ── Popover panel ───────────────────────────────────────────────────────── */

.agds-datepicker__popover {
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-radius-lg);
  box-shadow: var(--agds-shadow-lg);
  z-index: var(--agds-z-dropdown);
  animation: agds-popover-in var(--agds-transition-fast);
}

@keyframes agds-popover-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Screen-reader utility ───────────────────────────────────────────────── */

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

/* ── High contrast ───────────────────────────────────────────────────────── */

@media (forced-colors: active) {
  .agds-datepicker__input {
    border-color: ButtonText;
    background: Field;
    color: FieldText;
    forced-color-adjust: none;
  }

  .agds-datepicker__input:focus {
    outline-color: Highlight;
  }

  .agds-datepicker__input:disabled {
    border-color: GrayText;
    color: GrayText;
  }

  .agds-datepicker__trigger {
    border-color: ButtonText;
    background: ButtonFace;
    color: ButtonText;
    forced-color-adjust: none;
  }

  .agds-datepicker__trigger:focus-visible {
    outline: 3px solid Highlight;
    outline-offset: 2px;
  }

  .agds-datepicker__trigger:disabled {
    border-color: GrayText;
    color: GrayText;
  }
}
</style>
