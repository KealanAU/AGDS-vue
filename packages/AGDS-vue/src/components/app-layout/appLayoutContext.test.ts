import { describe, it, expect } from 'vitest'
import { useAppLayoutContext } from './appLayoutContext'

describe('useAppLayoutContext', () => {
  it('throws when called outside a provider', () => {
    // inject() returns undefined when called outside a component — the guard throws
    expect(() => useAppLayoutContext()).toThrow('useAppLayoutContext must be called within AGDSAppLayout')
  })
})
