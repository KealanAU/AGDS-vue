import { describe, it, expect } from 'vitest'
import {
  clampNumber,
  parseTime,
  formatValue,
  filterOptions,
  generateOptions,
} from './timePickerUtils'

// ─── clampNumber ──────────────────────────────────────────────────────────────

describe('clampNumber', () => {
  it('returns the number when within range', () => {
    expect(clampNumber(5, 0, 10)).toBe(5)
  })

  it('clamps to min when number is below range', () => {
    expect(clampNumber(-5, 0, 10)).toBe(0)
  })

  it('clamps to max when number is above range', () => {
    expect(clampNumber(15, 0, 10)).toBe(10)
  })

  it('returns 0 for NaN input', () => {
    expect(clampNumber(NaN, 0, 10)).toBe(0)
  })

  it('returns min when num equals min', () => {
    expect(clampNumber(0, 0, 10)).toBe(0)
  })

  it('returns max when num equals max', () => {
    expect(clampNumber(10, 0, 10)).toBe(10)
  })
})

// ─── parseTime ───────────────────────────────────────────────────────────────

describe('parseTime', () => {
  it('parses "09:30" into [9, 30]', () => {
    expect(parseTime('09:30')).toEqual([9, 30])
  })

  it('parses "00:00" into [0, 0]', () => {
    expect(parseTime('00:00')).toEqual([0, 0])
  })

  it('parses "23:59" into [23, 59]', () => {
    expect(parseTime('23:59')).toEqual([23, 59])
  })

  it('clamps out-of-range hours to 24', () => {
    expect(parseTime('99:00')[0]).toBe(24)
  })

  it('clamps out-of-range minutes to 59', () => {
    expect(parseTime('00:99')[1]).toBe(59)
  })
})

// ─── formatValue ─────────────────────────────────────────────────────────────

describe('formatValue', () => {
  it('zero-pads hours and minutes', () => {
    expect(formatValue(9, 5)).toBe('09:05')
  })

  it('handles double-digit values', () => {
    expect(formatValue(21, 30)).toBe('21:30')
  })

  it('handles midnight', () => {
    expect(formatValue(0, 0)).toBe('00:00')
  })
})

// ─── filterOptions ────────────────────────────────────────────────────────────

const TIME_OPTIONS = [
  { label: '9:00 am', value: '09:00' },
  { label: '9:30 am', value: '09:30' },
  { label: '12:00 pm', value: '12:00' },
  { label: '12:30 pm', value: '12:30' },
  { label: '9:00 pm', value: '21:00' },
  { label: '12:00 am', value: '00:00' },
]

describe('filterOptions', () => {
  it('returns all options when input is empty', () => {
    expect(filterOptions(TIME_OPTIONS, '')).toHaveLength(TIME_OPTIONS.length)
  })

  it('returns all options when input is undefined', () => {
    expect(filterOptions(TIME_OPTIONS, undefined)).toHaveLength(TIME_OPTIONS.length)
  })

  it('matches by exact normalised value (e.g. "09:30" matches 09:30 option)', () => {
    const results = filterOptions(TIME_OPTIONS, '9:30')
    expect(results.some((o) => o.value === '09:30')).toBe(true)
  })

  it('matches by digit subsequence ("930" matches 09:30)', () => {
    const results = filterOptions(TIME_OPTIONS, '930')
    expect(results.some((o) => o.value === '09:30')).toBe(true)
  })

  it('matches by label substring ("9:00 am" contains "9:00")', () => {
    const results = filterOptions(TIME_OPTIONS, '9:00')
    expect(results.some((o) => o.label === '9:00 am')).toBe(true)
  })

  it('matches midnight via "1200" prefix alias', () => {
    const results = filterOptions(TIME_OPTIONS, '12')
    // "12" starts with "12" so midnight alias branch fires and includes "00:00"
    expect(results.some((o) => o.value === '00:00')).toBe(true)
  })

  it('matches midnight via "24" prefix alias', () => {
    const options = [{ label: '12:00 am', value: '00:00' }]
    const results = filterOptions(options, '24')
    expect(results).toHaveLength(1)
  })

  it('returns empty array when nothing matches', () => {
    expect(filterOptions(TIME_OPTIONS, 'zzz')).toHaveLength(0)
  })

  it('excludes already-selected items when selectedItems is provided', () => {
    const selected = [{ label: '9:00 am', value: '09:00' }]
    const results = filterOptions(TIME_OPTIONS, '', selected)
    expect(results.some((o) => o.value === '09:00')).toBe(false)
  })

  it('includes options that match but are not selected', () => {
    const selected = [{ label: '9:00 am', value: '09:00' }]
    const results = filterOptions(TIME_OPTIONS, '', selected)
    expect(results.some((o) => o.value === '09:30')).toBe(true)
  })

  it('returns empty when all options are filtered out by selection', () => {
    const results = filterOptions(
      [{ label: '9:00 am', value: '09:00' }],
      '',
      [{ label: '9:00 am', value: '09:00' }],
    )
    expect(results).toHaveLength(0)
  })
})

// ─── generateOptions ──────────────────────────────────────────────────────────

describe('generateOptions', () => {
  it('generates options at 60-minute intervals between 09:00 and 12:00', () => {
    const opts = generateOptions({
      interval: 60,
      min: '09:00',
      max: '12:00',
      timeFormat: 'h:mm aaa',
    })
    expect(opts).toHaveLength(4) // 09:00, 10:00, 11:00, 12:00
    expect(opts[0].value).toBe('09:00')
    expect(opts[3].value).toBe('12:00')
  })

  it('generates options at 30-minute intervals', () => {
    const opts = generateOptions({
      interval: 30,
      min: '09:00',
      max: '10:00',
      timeFormat: 'HH:mm',
    })
    expect(opts).toHaveLength(3) // 09:00, 09:30, 10:00
  })

  it('swaps min and max if they are reversed (hours reversed)', () => {
    const opts = generateOptions({
      interval: 60,
      min: '12:00',
      max: '09:00',
      timeFormat: 'HH:mm',
    })
    // After swap, min=09:00 max=12:00
    expect(opts[0].value).toBe('09:00')
    expect(opts[opts.length - 1].value).toBe('12:00')
  })

  it('swaps min and max when same hour but minutes reversed', () => {
    const opts = generateOptions({
      interval: 15,
      min: '09:45',
      max: '09:15',
      timeFormat: 'HH:mm',
    })
    // After swap: min=09:15, max=09:45
    expect(opts[0].value).toBe('09:15')
  })

  it('uses 60-minute interval when interval is NaN', () => {
    const opts = generateOptions({
      interval: NaN,
      min: '09:00',
      max: '11:00',
      timeFormat: 'HH:mm',
    })
    expect(opts).toHaveLength(3)
  })

  it('does not include 24:00 (midnight is placed as 00:00 at start)', () => {
    const opts = generateOptions({
      interval: 60,
      min: '23:00',
      max: '24:00',
      timeFormat: 'HH:mm',
    })
    // 24:00 should be excluded; only 23:00 included
    expect(opts.some((o) => o.value === '24:00')).toBe(false)
    expect(opts[0].value).toBe('23:00')
  })

  it('labels options in the specified timeFormat', () => {
    const opts = generateOptions({
      interval: 60,
      min: '09:00',
      max: '09:00',
      timeFormat: 'h:mm aaa',
    })
    expect(opts[0].label).toBe('9:00 am')
  })
})
