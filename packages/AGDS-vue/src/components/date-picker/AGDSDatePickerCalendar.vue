<!-- Internal calendar grid used by AGDSDatePicker — not exported from the library -->
<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import type { CalendarProps } from './datePickerTypes'

// ── Date utilities ───────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth() + n, 1)
  return d
}

/** Get 42 cells (6 rows × 7 cols) for a month grid, starting on Monday */
function getMonthGrid(year: number, month: number): Date[] {
  const firstOfMonth = new Date(year, month, 1)
  const dow = firstOfMonth.getDay() // 0=Sun … 6=Sat
  const leadingDays = dow === 0 ? 6 : dow - 1 // offset to Mon-first

  const days: Date[] = []
  for (let i = leadingDays; i > 0; i--) {
    days.push(new Date(year, month, 1 - i))
  }
  const lastDate = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= lastDate; d++) {
    days.push(new Date(year, month, d))
  }
  while (days.length < 42) {
    const last = days[days.length - 1]
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1))
  }
  return days
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// ── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<CalendarProps>(), {
  mode: 'single',
  selectedDate: null,
  selectedFrom: null,
  selectedTo: null,
  inputMode: undefined,
  numberOfMonths: 1,
})

const emit = defineEmits<{
  /** Emitted when the user selects a day */
  select: [date: Date]
}>()

// ── State ────────────────────────────────────────────────────────────────────

const todayDate = startOfDay(new Date())

function getInitialView(): { year: number; month: number } {
  let ref: Date
  if (props.defaultMonth) {
    ref = props.defaultMonth
  } else if (props.mode === 'single' && props.selectedDate) {
    ref = props.selectedDate
  } else if (props.mode === 'range') {
    if (props.inputMode === 'to' && props.selectedTo) {
      ref = props.selectedTo
    } else if (props.selectedFrom) {
      ref = props.selectedFrom
    } else {
      ref = todayDate
    }
  } else {
    ref = todayDate
  }

  let year = ref.getFullYear()
  let month = ref.getMonth()

  // When showing 2 months in range 'to' mode, shift left by 1 so 'to' is on the right
  if (
    props.mode === 'range' &&
    props.numberOfMonths === 2 &&
    props.inputMode === 'to' &&
    props.selectedTo
  ) {
    const shifted = addMonths(new Date(year, month, 1), -1)
    year = shifted.getFullYear()
    month = shifted.getMonth()
  }

  return { year, month }
}

const initial = getInitialView()
const viewYear = ref(initial.year)
const viewMonth = ref(initial.month)
const hoveredDate = ref<Date | null>(null)
const focusedDate = ref<Date | null>(null)
const calendarRef = ref<HTMLDivElement | null>(null)

// ── Computed ─────────────────────────────────────────────────────────────────

const monthsToShow = computed<{ year: number; month: number }[]>(() => {
  const months = [{ year: viewYear.value, month: viewMonth.value }]
  if (props.numberOfMonths === 2) {
    const next = addMonths(new Date(viewYear.value, viewMonth.value, 1), 1)
    months.push({ year: next.getFullYear(), month: next.getMonth() })
  }
  return months
})

const currentYear = new Date().getFullYear()

function getYearOptions(): number[] {
  const from = props.yearRange?.from ?? currentYear - 10
  const to = props.yearRange?.to ?? currentYear + 10
  const years: number[] = []
  for (let y = from; y <= to; y++) years.push(y)
  if (!years.includes(viewYear.value)) {
    years.push(viewYear.value)
    years.sort((a, b) => a - b)
  }
  return years
}

const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const WEEKDAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKDAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function isDisabled(date: Date): boolean {
  const d = startOfDay(date)
  if (props.minDate && d < startOfDay(props.minDate)) return true
  if (props.maxDate && d > startOfDay(props.maxDate)) return true
  return false
}

function getDayMeta(date: Date, monthIdx: number) {
  const d = startOfDay(date)
  const isToday = isSameDay(d, todayDate)
  const isOtherMonth = date.getMonth() !== monthsToShow.value[monthIdx].month
  const disabled = isDisabled(date)

  let isSelected = false
  let isRangeStart = false
  let isRangeEnd = false
  let isInRange = false

  if (props.mode === 'single') {
    isSelected = !!(props.selectedDate && isSameDay(d, props.selectedDate))
  } else {
    const from = props.selectedFrom ? startOfDay(props.selectedFrom) : null
    const to = props.selectedTo ? startOfDay(props.selectedTo) : null
    const hovered = hoveredDate.value ? startOfDay(hoveredDate.value) : null

    isRangeStart = !!(from && isSameDay(d, from))
    isRangeEnd = !!(to && isSameDay(d, to))
    isSelected = isRangeStart || isRangeEnd

    if (from && to) {
      isInRange = d > from && d < to
    } else if (hovered) {
      // Preview range while hovering before both ends are selected
      if (props.inputMode === 'from' && to) {
        const lo = hovered < to ? hovered : to
        const hi = hovered < to ? to : hovered
        isInRange = d > lo && d < hi
      } else if (props.inputMode === 'to' && from) {
        const lo = from < hovered ? from : hovered
        const hi = from < hovered ? hovered : from
        isInRange = d > lo && d < hi
      }
    }
  }

  const isFocused = !!(focusedDate.value && isSameDay(d, focusedDate.value))

  return {
    date: d,
    key: toDateKey(d),
    isToday,
    isOtherMonth,
    disabled,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isFocused,
    tabindex: isFocused ? 0 : -1,
    ariaLabel: buildAriaLabel(d, isSelected, isInRange, isToday),
  }
}

function buildAriaLabel(
  d: Date,
  isSelected: boolean,
  isInRange: boolean,
  isToday: boolean,
): string {
  const parts: string[] = []
  if (isSelected) parts.push('Selected.')
  if (isInRange) parts.push('Within range.')
  if (isToday) parts.push('Today.')
  const dateStr = d.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  parts.push(dateStr)
  return parts.join(' ')
}

// ── Methods ──────────────────────────────────────────────────────────────────

function prevMonth() {
  const prev = addMonths(new Date(viewYear.value, viewMonth.value, 1), -1)
  viewYear.value = prev.getFullYear()
  viewMonth.value = prev.getMonth()
}

function nextMonth() {
  const next = addMonths(new Date(viewYear.value, viewMonth.value, 1), 1)
  viewYear.value = next.getFullYear()
  viewMonth.value = next.getMonth()
}

function onYearChange(e: Event) {
  viewYear.value = parseInt((e.target as HTMLSelectElement).value)
}

function onMonthChange(e: Event) {
  viewMonth.value = parseInt((e.target as HTMLSelectElement).value)
}

function selectDay(date: Date) {
  if (isDisabled(date)) return
  emit('select', date)
}

function focusCellByDate(date: Date) {
  const key = toDateKey(date)
  const el = calendarRef.value?.querySelector(`[data-date="${key}"]`) as HTMLElement | null
  el?.focus()
}

function onDayKeydown(event: KeyboardEvent, date: Date) {
  let target: Date | null = null

  switch (event.key) {
    case 'ArrowLeft':
      target = addDays(date, -1)
      break
    case 'ArrowRight':
      target = addDays(date, 1)
      break
    case 'ArrowUp':
      target = addDays(date, -7)
      break
    case 'ArrowDown':
      target = addDays(date, 7)
      break
    case 'PageUp':
      target = addMonths(date, event.shiftKey ? -12 : -1)
      break
    case 'PageDown':
      target = addMonths(date, event.shiftKey ? 12 : 1)
      break
    case 'Home': {
      // First day of week (Monday)
      const dow = date.getDay()
      const offset = dow === 0 ? -6 : 1 - dow
      target = addDays(date, offset)
      break
    }
    case 'End': {
      // Last day of week (Sunday)
      const dow = date.getDay()
      const offset = dow === 0 ? 0 : 7 - dow
      target = addDays(date, offset)
      break
    }
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectDay(date)
      return
    default:
      return
  }

  if (target) {
    event.preventDefault()
    focusedDate.value = target

    // Navigate view if target is outside current visible range
    const first = monthsToShow.value[0]
    const last = monthsToShow.value[monthsToShow.value.length - 1]
    if (
      target.getFullYear() < first.year ||
      (target.getFullYear() === first.year && target.getMonth() < first.month)
    ) {
      prevMonth()
    } else if (
      target.getFullYear() > last.year ||
      (target.getFullYear() === last.year && target.getMonth() > last.month)
    ) {
      nextMonth()
    }

    nextTick(() => focusCellByDate(target!))
  }
}

/** Called by parent after the popover opens to focus the right day */
function focusInitialDay() {
  nextTick(() => {
    let target: Date
    if (props.mode === 'single') {
      target = props.selectedDate ?? todayDate
    } else {
      target =
        (props.inputMode === 'to' ? props.selectedTo : props.selectedFrom) ?? todayDate
    }
    focusedDate.value = target
    focusCellByDate(target)
  })
}

onMounted(focusInitialDay)

defineExpose({
  /** Moves keyboard focus to the initially selected or today's day cell — sets up the keyboard navigation entry point when the calendar opens. */
  focusInitialDay,
})

// ── Template helpers ─────────────────────────────────────────────────────────

function getGridRows(year: number, month: number) {
  const days = getMonthGrid(year, month)
  // Split into 6 rows of 7
  const rows: Date[][] = []
  for (let r = 0; r < 6; r++) {
    rows.push(days.slice(r * 7, r * 7 + 7))
  }
  return rows
}

const hasPrevMonth = computed(() => {
  if (!props.minDate) return true
  const lastDayOfPrev = new Date(viewYear.value, viewMonth.value, 0)
  return lastDayOfPrev >= startOfDay(props.minDate)
})

const hasNextMonth = computed(() => {
  if (!props.maxDate) return true
  const lastMonth = monthsToShow.value[monthsToShow.value.length - 1]
  const firstDayOfNext = new Date(lastMonth.year, lastMonth.month + 1, 1)
  return firstDayOfNext <= startOfDay(props.maxDate)
})
</script>

<template>
  <div
    ref="calendarRef"
    class="agds-calendar"
    :class="{ 'agds-calendar--range': mode === 'range' }"
  >
    <!-- Month header + navigation — rendered per-month panel -->
    <div class="agds-calendar__months">
      <div
        v-for="(panel, panelIdx) in monthsToShow"
        :key="`${panel.year}-${panel.month}`"
        class="agds-calendar__month"
      >
        <!-- Caption row: prev / heading / next -->
        <div class="agds-calendar__caption">
          <!-- Prev arrow — only on first panel -->
          <button
            v-if="panelIdx === 0"
            type="button"
            class="agds-calendar__nav-btn agds-calendar__nav-btn--prev"
            :disabled="!hasPrevMonth"
            :aria-label="`Previous month, ${MONTH_LABELS[(panel.month - 1 + 12) % 12]}`"
            @click="prevMonth"
          >
            <!-- Left chevron -->
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span v-else class="agds-calendar__nav-placeholder" aria-hidden="true" />

          <!-- Month / year heading -->
          <div class="agds-calendar__heading" aria-live="polite" aria-atomic="true">
            <template v-if="yearRange || panelIdx === 0">
              <!-- Selects for month and year (shown on first panel only for UX clarity) -->
              <template v-if="panelIdx === 0">
                <div class="agds-calendar__selects">
                  <div class="agds-calendar__select-wrap">
                    <label :for="`agds-cal-month-${panel.year}-${panel.month}`" class="sr-only">Month</label>
                    <select
                      :id="`agds-cal-month-${panel.year}-${panel.month}`"
                      class="agds-calendar__select"
                      :value="panel.month"
                      @change="onMonthChange"
                    >
                      <option
                        v-for="(name, idx) in MONTH_LABELS"
                        :key="idx"
                        :value="idx"
                      >
                        {{ name }}
                      </option>
                    </select>
                    <!-- Chevron icon -->
                    <svg class="agds-calendar__select-chevron" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  <div class="agds-calendar__select-wrap">
                    <label :for="`agds-cal-year-${panel.year}-${panel.month}`" class="sr-only">Year</label>
                    <select
                      :id="`agds-cal-year-${panel.year}-${panel.month}`"
                      class="agds-calendar__select"
                      :value="panel.year"
                      @change="onYearChange"
                    >
                      <option
                        v-for="yr in getYearOptions()"
                        :key="yr"
                        :value="yr"
                      >
                        {{ yr }}
                      </option>
                    </select>
                    <svg class="agds-calendar__select-chevron" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </template>
              <!-- Second panel shows plain text heading -->
              <template v-else>
                <span class="agds-calendar__month-label">
                  {{ MONTH_LABELS[panel.month] }} {{ panel.year }}
                </span>
              </template>
            </template>
            <!-- No yearRange: plain text heading -->
            <template v-else>
              <span class="agds-calendar__month-label">
                {{ MONTH_LABELS[panel.month] }} {{ panel.year }}
              </span>
            </template>
          </div>

          <!-- Next arrow — only on last panel -->
          <button
            v-if="panelIdx === monthsToShow.length - 1"
            type="button"
            class="agds-calendar__nav-btn agds-calendar__nav-btn--next"
            :disabled="!hasNextMonth"
            :aria-label="`Next month, ${MONTH_LABELS[(panel.month + 1) % 12]}`"
            @click="nextMonth"
          >
            <!-- Right chevron -->
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <span v-else class="agds-calendar__nav-placeholder" aria-hidden="true" />
        </div>

        <!-- Day grid -->
        <table
          class="agds-calendar__grid"
          role="grid"
          :aria-label="`${MONTH_LABELS[panel.month]} ${panel.year}`"
        >
          <thead>
            <tr>
              <th
                v-for="(abbr, i) in WEEKDAY_ABBR"
                :key="abbr"
                class="agds-calendar__weekday"
                scope="col"
                :abbr="WEEKDAY_FULL[i]"
              >
                {{ abbr }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIdx) in getGridRows(panel.year, panel.month)"
              :key="rowIdx"
              role="row"
            >
              <td
                v-for="day in row"
                :key="toDateKey(day)"
                role="gridcell"
                class="agds-calendar__cell"
                v-bind="(() => {
                  const meta = getDayMeta(day, panelIdx)
                  return {
                    'data-date': meta.key,
                    tabindex: meta.tabindex,
                    'aria-label': meta.ariaLabel,
                    'aria-selected': meta.isSelected ? 'true' : undefined,
                    'aria-current': meta.isToday ? 'date' : undefined,
                    'aria-disabled': meta.disabled ? 'true' : undefined,
                    class: [
                      'agds-calendar__cell',
                      meta.isOtherMonth && 'agds-calendar__cell--other-month',
                      meta.isToday && 'agds-calendar__cell--today',
                      meta.isSelected && 'agds-calendar__cell--selected',
                      meta.isRangeStart && 'agds-calendar__cell--range-start',
                      meta.isRangeEnd && 'agds-calendar__cell--range-end',
                      meta.isInRange && 'agds-calendar__cell--in-range',
                      meta.disabled && 'agds-calendar__cell--disabled',
                      meta.isFocused && 'agds-calendar__cell--focused',
                    ].filter(Boolean).join(' '),
                  }
                })()"
                @click="selectDay(day)"
                @keydown="onDayKeydown($event, day)"
                @mouseenter="hoveredDate = day"
                @mouseleave="hoveredDate = null"
                @focus="focusedDate = day"
              >
                <span class="agds-calendar__day-inner" aria-hidden="true">
                  {{ day.getDate() }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────── */

.agds-calendar {
  padding: var(--agds-space-4);
  background-color: var(--agds-color-bg);
}

.agds-calendar__months {
  display: flex;
  gap: var(--agds-space-6);
}

.agds-calendar__month {
  flex: 1 1 auto;
}

/* ── Caption row ─────────────────────────────────────────────────────────── */

.agds-calendar__caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-2);
  margin-bottom: var(--agds-space-3);
}

.agds-calendar__heading {
  flex: 1;
  text-align: center;
}

.agds-calendar__month-label {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
}

/* ── Nav buttons ─────────────────────────────────────────────────────────── */

.agds-calendar__nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--agds-radius-md);
  color: var(--agds-color-action-primary);
  cursor: pointer;
  flex-shrink: 0;
  transition: color var(--agds-transition-fast), background-color var(--agds-transition-fast);
}

.agds-calendar__nav-btn:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-hover);
}

.agds-calendar__nav-btn:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-calendar__nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.agds-calendar__nav-btn svg {
  width: 1rem;
  height: 1rem;
}

.agds-calendar__nav-placeholder {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

/* ── Month / year selects ────────────────────────────────────────────────── */

.agds-calendar__selects {
  display: inline-flex;
  gap: var(--agds-space-2);
  justify-content: center;
}

.agds-calendar__select-wrap {
  position: relative;
}

.agds-calendar__select {
  appearance: none;
  background: none;
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  padding: var(--agds-space-1) var(--agds-space-6) var(--agds-space-1) var(--agds-space-2);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  height: 2rem;
  cursor: pointer;
}

.agds-calendar__select:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-calendar__select-chevron {
  position: absolute;
  top: 50%;
  right: var(--agds-space-1);
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  color: var(--agds-color-action-primary);
}

/* ── Grid ────────────────────────────────────────────────────────────────── */

.agds-calendar__grid {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

/* Reset any prose/doc-page table styles that leak in */
.agds-calendar__grid th,
.agds-calendar__grid td {
  padding: 0;
  text-align: center;
  border: none;
  background: none;
  font-weight: inherit;
  font-size: inherit;
  text-transform: none;
  letter-spacing: normal;
}

/* ── Weekday header ──────────────────────────────────────────────────────── */

.agds-calendar__weekday {
  width: 2.75rem;
  height: 2.75rem;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-text-muted);
}

/* ── Day cells ───────────────────────────────────────────────────────────── */

.agds-calendar__cell {
  position: relative;
  width: 2.75rem;
  height: 2.75rem;
  /* Use flex on the td to reliably centre content — avoids height:100% issues on child spans */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--agds-radius-md);
  box-sizing: border-box;
  cursor: pointer;
  color: var(--agds-color-action-primary);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  transition:
    background-color var(--agds-transition-fast),
    color var(--agds-transition-fast);
}

.agds-calendar__cell:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  z-index: 1;
}

.agds-calendar__cell:hover:not(.agds-calendar__cell--disabled) {
  background-color: var(--agds-color-bg-muted);
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold);
}

/* Today indicator dot */
.agds-calendar__cell--today::after {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 50%;
  background-color: currentColor;
}

.agds-calendar__cell--today {
  font-weight: var(--agds-font-weight-bold);
}

/* Selected / range-start / range-end */
.agds-calendar__cell--selected {
  background-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg);
  font-weight: var(--agds-font-weight-bold);
  border-radius: var(--agds-radius-full);
}

.agds-calendar__cell--selected:hover:not(.agds-calendar__cell--disabled) {
  background-color: var(--agds-color-action-primary-hover);
  color: var(--agds-color-action-primary-fg);
}

/* Range: start/end have rounded left/right, middle has no radius and muted bg */
.agds-calendar__cell--range-start:not(.agds-calendar__cell--range-end) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.agds-calendar__cell--range-end:not(.agds-calendar__cell--range-start) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.agds-calendar__cell--in-range {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-text);
  border-radius: 0;
}

/* Disabled */
.agds-calendar__cell--disabled {
  opacity: 0.35;
  cursor: not-allowed;
  color: var(--agds-color-text);
}

/* Other month days are dimmed — use an explicit muted colour rather than
   opacity so the text meets WCAG 2 AA contrast (4.5:1) against white. */
.agds-calendar__cell--other-month {
  color: var(--agds-color-text-muted);
}

.agds-calendar__day-inner {
  pointer-events: none;
  user-select: none;
}

/* ── Utilities ───────────────────────────────────────────────────────────── */

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
  .agds-calendar__cell--selected {
    forced-color-adjust: none;
    background-color: Highlight;
    color: HighlightText;
  }
  .agds-calendar__cell--in-range {
    forced-color-adjust: none;
    background-color: Highlight;
    color: HighlightText;
    opacity: 0.5;
  }
}
</style>
