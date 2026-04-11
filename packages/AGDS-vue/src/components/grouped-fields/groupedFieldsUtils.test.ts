import { describe, it, expect } from 'vitest'
import { GROUPED_FIELDS_DATA_ATTR } from './groupedFieldsUtils'

describe('groupedFieldsUtils', () => {
  it('exports the correct data attribute name', () => {
    expect(GROUPED_FIELDS_DATA_ATTR).toBe('data-grouped-fields')
  })
})
