import { describe, it, expect, vi, afterEach } from 'vitest'
import { getTone } from './sectionAlertUtils'

describe('getTone', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the same key for a non-legacy tone', () => {
    expect(getTone('errorHigh')).toBe('errorHigh')
    expect(getTone('successHigh')).toBe('successHigh')
    expect(getTone('infoLow')).toBe('infoLow')
  })

  it('maps legacy tone "error" to "errorHigh"', () => {
    expect(getTone('error')).toBe('errorHigh')
  })

  it('maps legacy tone "success" to "successHigh"', () => {
    expect(getTone('success')).toBe('successHigh')
  })

  it('maps legacy tone "warning" to "warningHigh"', () => {
    expect(getTone('warning')).toBe('warningHigh')
  })

  it('maps legacy tone "info" to "infoHigh"', () => {
    expect(getTone('info')).toBe('infoHigh')
  })

  it('logs a deprecation warning in DEV mode when a legacy tone is used', () => {
    // Stub import.meta.env.DEV to true so the warning branch is covered
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const env = (import.meta as unknown as Record<string, unknown>).env as Record<string, unknown>
    const origDev = env.DEV
    env.DEV = true
    try {
      const result = getTone('error')
      expect(result).toBe('errorHigh')
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('"error" is deprecated'),
      )
    } finally {
      env.DEV = origDev
      consoleSpy.mockRestore()
    }
  })
})
