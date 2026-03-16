import type { DefaultComboboxOption } from '../autocomplete/comboboxUtils'
import { formatTime, type TimeFormat } from '../time-input/timeInputUtils'

export function clampNumber(num: number, min: number, max: number): number {
  const clamped = Math.min(Math.max(num, min), max)
  return isNaN(clamped) ? 0 : clamped
}

export function parseTime(timeString: string): [number, number] {
  const [hours, minutes] = timeString.split(':').map(Number)
  return [clampNumber(hours, 0, 24), clampNumber(minutes, 0, 59)]
}

export function formatValue(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * Time-aware filter for TimePicker options.
 * Matches on: exact HH:mm, stripped numeric digits, display label, and midnight aliases.
 */
export function filterOptions<Option extends DefaultComboboxOption>(
  options: Option[],
  inputValue: string | undefined = '',
  selectedItems?: Option[],
): Option[] {
  const sanitizedInputValue = inputValue.toLowerCase().replace(/\W/g, '')
  const formattedInputValue = formatTime(sanitizedInputValue, 'HH:mm')

  return options.filter((option) => {
    const [HH, mm] = option.value.split(':')
    const HHmm = `${HH}${mm}`

    const hasMatch =
      // Exact normalised match: user typed "9:30" → "09:30" matches stored value
      formattedInputValue === option.value ||
      // Partial digit match: user typed "930" matches "0930" stored as "09:30"
      HHmm.includes(sanitizedInputValue) ||
      // Label substring match: user typed "9:30 pm"
      option.label.toLowerCase().includes(sanitizedInputValue) ||
      // Midnight alias: "1200" or "2400" should match "00:00"
      (sanitizedInputValue.length < 4 &&
        (sanitizedInputValue.startsWith('12') || sanitizedInputValue.startsWith('24')) &&
        HH === '00') ||
      // Normalised label match (strips colons/spaces for comparison)
      option.label.toLowerCase().replace(/\W/g, '').includes(sanitizedInputValue)

    if (!selectedItems) return hasMatch
    return (
      hasMatch &&
      !selectedItems.some((item) => item.label === option.label && item.value === option.value)
    )
  })
}

/**
 * Generate an array of time options between min and max at the given interval (minutes).
 */
export function generateOptions({
  interval,
  max,
  min,
  timeFormat,
}: {
  interval: number
  max: string
  min: string
  timeFormat: TimeFormat
}): DefaultComboboxOption[] {
  const [parsedMinHours, parsedMinMinutes] = parseTime(min)
  const [parsedMaxHours, parsedMaxMinutes] = parseTime(max)
  const validInterval = isNaN(Number(interval))
    ? 60
    : Math.round(clampNumber(Number(interval), 1, 180))

  let minHours: number
  let minMinutes: number
  let maxHours: number
  let maxMinutes: number

  // Swap min/max if they are reversed
  if (parsedMinHours > parsedMaxHours) {
    minHours = parsedMaxHours
    minMinutes = parsedMaxMinutes
    maxHours = parsedMinHours
    maxMinutes = parsedMinMinutes
  } else if (parsedMinHours === parsedMaxHours && parsedMinMinutes > parsedMaxMinutes) {
    minHours = parsedMinHours
    minMinutes = parsedMaxMinutes
    maxHours = parsedMaxHours
    maxMinutes = parsedMinMinutes
  } else {
    minHours = parsedMinHours
    minMinutes = parsedMinMinutes
    maxHours = parsedMaxHours
    maxMinutes = parsedMaxMinutes
  }

  const minTotalMinutes = minHours * 60 + minMinutes
  const maxTotalMinutes = maxHours * 60 + maxMinutes

  const options: DefaultComboboxOption[] = []

  for (
    let totalMinutes = minTotalMinutes;
    totalMinutes <= maxTotalMinutes;
    totalMinutes += validInterval
  ) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const HHmm = formatValue(hours, minutes)

    // Midnight (00:00) is placed first at the start of the range, not duplicated at 24:00
    if (hours !== 24) {
      options.push({
        label: formatTime(HHmm, timeFormat),
        value: HHmm,
      })
    }
  }

  return options
}
