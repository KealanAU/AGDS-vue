import { describe, it, expect, vi, afterEach } from 'vitest'
import { filterOptions, useIsIos } from './comboboxUtils'

const OPTIONS = [
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Canada', value: 'ca' },
]

// ─── filterOptions ────────────────────────────────────────────────────────────

describe('filterOptions', () => {
  it('returns all options for empty input', () => {
    expect(filterOptions(OPTIONS, '')).toHaveLength(3)
  })

  it('matches by value (case-insensitive)', () => {
    const results = filterOptions(OPTIONS, 'AU')
    expect(results.some((o) => o.value === 'au')).toBe(true)
  })

  it('matches by label when value does not match', () => {
    // 'canada' is in the label but 'ca' value also contains 'a' — use a unique label substring
    const opts = [
      { label: 'New Zealand', value: 'nz' },
      { label: 'United States', value: 'us' },
    ]
    const results = filterOptions(opts, 'Zealand')
    expect(results).toHaveLength(1)
    expect(results[0].value).toBe('nz')
  })

  it('returns empty array when nothing matches', () => {
    expect(filterOptions(OPTIONS, 'zzz')).toHaveLength(0)
  })

  it('excludes selected items when selectedItems is provided', () => {
    const selected = [{ label: 'Australia', value: 'au' }]
    const results = filterOptions(OPTIONS, '', selected)
    expect(results.some((o) => o.value === 'au')).toBe(false)
  })

  it('includes options that match the query even if selected list is provided but item is not selected', () => {
    const selected = [{ label: 'Canada', value: 'ca' }]
    const results = filterOptions(OPTIONS, 'aus', selected)
    expect(results.some((o) => o.value === 'au')).toBe(true)
    expect(results.some((o) => o.value === 'ca')).toBe(false)
  })

  it('returns empty when only option matches but is already selected', () => {
    const selected = [{ label: 'Australia', value: 'au' }]
    const results = filterOptions([{ label: 'Australia', value: 'au' }], '', selected)
    expect(results).toHaveLength(0)
  })
})

// ─── useIsIos ─────────────────────────────────────────────────────────────────

describe('useIsIos', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns false in a jsdom environment (no Apple Pay CSS support)', () => {
    // In jsdom, CSS.supports for Apple Pay returns false → iOS is not detected
    expect(typeof useIsIos()).toBe('boolean')
  })

  it('returns false when window.CSS.supports is not available', () => {
    vi.stubGlobal('CSS', undefined)
    expect(useIsIos()).toBe(false)
  })

  it('returns true when both Apple Pay and overflow-scrolling are supported', () => {
    vi.stubGlobal('CSS', {
      supports: (prop: string) =>
        prop === '-webkit-appearance' || prop === '-webkit-overflow-scrolling',
    })
    expect(useIsIos()).toBe(true)
  })

  it('returns false when Apple Pay CSS is not supported', () => {
    vi.stubGlobal('CSS', {
      supports: (_prop: string) => false,
    })
    expect(useIsIos()).toBe(false)
  })
})
