import { describe, it, expect } from 'vitest'
import { useDropdownMenuContext } from './dropdownMenuContext'

describe('useDropdownMenuContext', () => {
  it('throws when called outside a provider', () => {
    // inject() returns undefined when called outside a component — the guard throws
    expect(() => useDropdownMenuContext()).toThrow('useDropdownMenuContext must be called within AGDSDropdownMenu')
  })
})
