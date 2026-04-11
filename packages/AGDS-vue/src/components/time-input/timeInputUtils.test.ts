import { describe, it, expect } from 'vitest'
import { formatTime, transformValuePropToInputValue, acceptedTimeFormats } from './timeInputUtils'

// ─── acceptedTimeFormats ──────────────────────────────────────────────────────

describe('acceptedTimeFormats', () => {
  it('exports an array of 5 format strings', () => {
    expect(acceptedTimeFormats).toHaveLength(5)
    expect(acceptedTimeFormats).toContain('h:mm aaa')
    expect(acceptedTimeFormats).toContain('HH:mm')
  })
})

// ─── formatTime ──────────────────────────────────────────────────────────────

describe('formatTime — empty / unparseable input', () => {
  it('returns empty string for empty input', () => {
    expect(formatTime('', 'HH:mm')).toBe('')
  })

  it('returns empty string for whitespace-only input', () => {
    expect(formatTime('   ', 'HH:mm')).toBe('')
  })

  it('returns empty string when input cannot be parsed', () => {
    // purely alphabetic — strips to empty after removing non-alphanumeric
    expect(formatTime('abc', 'HH:mm')).toBe('')
  })

  it('returns empty string for a 5+ digit input', () => {
    expect(formatTime('93045', 'HH:mm')).toBe('')
  })

  it('returns empty string for out-of-range hours', () => {
    expect(formatTime('9900', 'HH:mm')).toBe('')
  })

  it('returns empty string for out-of-range minutes', () => {
    expect(formatTime('0299', 'HH:mm')).toBe('')
  })
})

describe('formatTime — HH:mm format', () => {
  it('formats single-digit hour string ("9") as 09:00', () => {
    expect(formatTime('9', 'HH:mm')).toBe('09:00')
  })

  it('formats two-digit hour string ("21") as 21:00', () => {
    expect(formatTime('21', 'HH:mm')).toBe('21:00')
  })

  it('formats three-digit string ("930") as 09:30', () => {
    expect(formatTime('930', 'HH:mm')).toBe('09:30')
  })

  it('formats four-digit string ("2130") as 21:30', () => {
    expect(formatTime('2130', 'HH:mm')).toBe('21:30')
  })

  it('formats "09:30" (with colon) as 09:30', () => {
    expect(formatTime('09:30', 'HH:mm')).toBe('09:30')
  })

  it('formats "21:30" as 21:30', () => {
    expect(formatTime('21:30', 'HH:mm')).toBe('21:30')
  })

  it('formats "00:00" as 00:00', () => {
    expect(formatTime('00:00', 'HH:mm')).toBe('00:00')
  })
})

describe('formatTime — h:mm aaa format (12-hour, lowercase)', () => {
  it('formats "09:30" as 9:30 am', () => {
    expect(formatTime('09:30', 'h:mm aaa')).toBe('9:30 am')
  })

  it('formats "21:30" as 9:30 pm', () => {
    expect(formatTime('21:30', 'h:mm aaa')).toBe('9:30 pm')
  })

  it('formats noon "12:00" as 12:00 pm', () => {
    expect(formatTime('12:00', 'h:mm aaa')).toBe('12:00 pm')
  })

  it('formats midnight "00:00" as 12:00 am', () => {
    expect(formatTime('00:00', 'h:mm aaa')).toBe('12:00 am')
  })

  it('formats "01:15" as 1:15 am', () => {
    expect(formatTime('01:15', 'h:mm aaa')).toBe('1:15 am')
  })
})

describe('formatTime — h:mm aa format (12-hour, uppercase)', () => {
  it('formats "09:30" as 9:30 AM', () => {
    expect(formatTime('09:30', 'h:mm aa')).toBe('9:30 AM')
  })

  it('formats "21:30" as 9:30 PM', () => {
    expect(formatTime('21:30', 'h:mm aa')).toBe('9:30 PM')
  })

  it('formats midnight "00:00" as 12:00 AM', () => {
    expect(formatTime('00:00', 'h:mm aa')).toBe('12:00 AM')
  })
})

describe('formatTime — hh:mm aaa format (12-hour, zero-padded, lowercase)', () => {
  it('formats "09:30" as 09:30 am', () => {
    expect(formatTime('09:30', 'hh:mm aaa')).toBe('09:30 am')
  })

  it('formats "21:30" as 09:30 pm', () => {
    expect(formatTime('21:30', 'hh:mm aaa')).toBe('09:30 pm')
  })

  it('formats midnight "00:00" as 12:00 am', () => {
    expect(formatTime('00:00', 'hh:mm aaa')).toBe('12:00 am')
  })
})

describe('formatTime — hh:mm aa format (12-hour, zero-padded, uppercase)', () => {
  it('formats "09:30" as 09:30 AM', () => {
    expect(formatTime('09:30', 'hh:mm aa')).toBe('09:30 AM')
  })

  it('formats "21:30" as 09:30 PM', () => {
    expect(formatTime('21:30', 'hh:mm aa')).toBe('09:30 PM')
  })
})

describe('formatTime — default format (unknown format string)', () => {
  it('falls back to HH:mm for an unrecognised format', () => {
    expect(formatTime('09:30', 'unknown' as never)).toBe('09:30')
  })
})

describe('formatTime — am/pm suffix parsing', () => {
  it('parses "9pm" → 21:00 in HH:mm format', () => {
    expect(formatTime('9pm', 'HH:mm')).toBe('21:00')
  })

  it('parses "9:30pm" → 21:30 in HH:mm format', () => {
    expect(formatTime('9:30pm', 'HH:mm')).toBe('21:30')
  })

  it('parses "9am" → 09:00 in HH:mm format', () => {
    expect(formatTime('9am', 'HH:mm')).toBe('09:00')
  })

  it('parses "12pm" as noon → 12:00', () => {
    // 12pm means noon — no adjustment needed (isPm && hours === 12 skips += 12)
    expect(formatTime('12pm', 'HH:mm')).toBe('12:00')
  })

  it('parses "12am" as midnight → 00:00', () => {
    // isAm && hours === 12 → hours = 0
    expect(formatTime('12am', 'HH:mm')).toBe('00:00')
  })

  it('parses "930pm" → 21:30', () => {
    expect(formatTime('930pm', 'HH:mm')).toBe('21:30')
  })
})

// ─── transformValuePropToInputValue ──────────────────────────────────────────

describe('transformValuePropToInputValue', () => {
  it('returns empty string for undefined value', () => {
    expect(transformValuePropToInputValue(undefined, 'HH:mm')).toBe('')
  })

  it('returns empty string for empty string value', () => {
    expect(transformValuePropToInputValue('', 'HH:mm')).toBe('')
  })

  it('formats "09:30" in HH:mm format', () => {
    expect(transformValuePropToInputValue('09:30', 'HH:mm')).toBe('09:30')
  })

  it('formats "09:30" in h:mm aaa format', () => {
    expect(transformValuePropToInputValue('09:30', 'h:mm aaa')).toBe('9:30 am')
  })

  it('formats "21:30" in h:mm aa format', () => {
    expect(transformValuePropToInputValue('21:30', 'h:mm aa')).toBe('9:30 PM')
  })
})
