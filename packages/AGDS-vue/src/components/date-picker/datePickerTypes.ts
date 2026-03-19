export type DatePickerSingleValue = Date | null
export type DatePickerRangeValue = { from: Date | null; to: Date | null }

export interface AGDSDatePickerProps {
  /**
   * When `true`, the component shows two date inputs (start + end) and
   * `modelValue` must be `{ from: Date | null; to: Date | null }`.
   * When `false` (default), `modelValue` is `Date | null`.
   */
  range?: boolean
  /**
   * The selected date (single mode) or date range (range mode).
   * Use `v-model` for two-way binding.
   */
  modelValue?: DatePickerSingleValue | DatePickerRangeValue
  /** Visible label for the field (single) or fieldset legend (range). */
  label?: string
  /** Visible label for the start-date input (range mode only). Default: "Start date" */
  fromLabel?: string
  /** Visible label for the end-date input (range mode only). Default: "End date" */
  toLabel?: string
  /** HTML `id` for the primary input. Auto-generated if omitted. */
  id?: string
  /** Hint text shown below the label. */
  hint?: string
  /** Validation message shown when the field is invalid. */
  message?: string
  /** If true, the field is rendered in an error state. */
  invalid?: boolean
  /** If true, the start-date input is invalid (range mode only). */
  fromInvalid?: boolean
  /** If true, the end-date input is invalid (range mode only). */
  toInvalid?: boolean
  /** Disables all inputs. */
  disabled?: boolean
  /** Marks the field as required; appends "(optional)" to the label when false. */
  required?: boolean
  /**
   * When true, the "(optional)" suffix is never appended even when `required` is false.
   */
  hideOptionalLabel?: boolean
  /** Days before this date cannot be selected. */
  minDate?: Date
  /** Days after this date cannot be selected. */
  maxDate?: Date
  /**
   * Range of years shown in the year dropdown.
   * When omitted, a ±10 year range from today is used and no dropdown is shown.
   */
  yearRange?: { from: number; to: number }
  /**
   * Date format used for the text input and example label.
   * Supported: `'dd/MM/yyyy'` (default) or `'MM/dd/yyyy'`.
   */
  dateFormat?: string
}

/** Internal props for the calendar grid — not part of the public API. */
export interface CalendarProps {
  /** 'single' for a date picker, 'range' for a date range picker */
  mode: 'single' | 'range'
  /** Selected date (single mode) */
  selectedDate?: Date | null
  /** Range start date (range mode) */
  selectedFrom?: Date | null
  /** Range end date (range mode) */
  selectedTo?: Date | null
  /** Which range input triggered the calendar (range mode) */
  inputMode?: 'from' | 'to'
  minDate?: Date
  maxDate?: Date
  /** Month to open to initially */
  defaultMonth?: Date
  /** Number of calendar months to display side by side */
  numberOfMonths?: 1 | 2
  /** If provided, year dropdown is shown with this range */
  yearRange?: { from: number; to: number }
}
