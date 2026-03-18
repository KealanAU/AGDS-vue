import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSGroupedFields from './AGDSGroupedFields.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderGroupedFields(props: Record<string, unknown> = {}) {
  return render(AGDSGroupedFields, {
    props: { legend: 'Date range', ...props },
    slots: {
      default: `
        <template #default="{ field1Props, field2Props }">
          <label for="from">From<input id="from" type="text" v-bind="field1Props" /></label>
          <label for="to">To<input id="to" type="text" v-bind="field2Props" /></label>
        </template>
      `,
    },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSGroupedFields — rendering', () => {
  it('renders the legend', () => {
    const { getByText } = renderGroupedFields()
    expect(getByText('Date range')).toBeTruthy()
  })

  it('appends "(optional)" to the legend when hideOptionalLabel is false', () => {
    const { getByText } = renderGroupedFields({ hideOptionalLabel: false })
    expect(getByText('(optional)', { exact: false })).toBeTruthy()
  })

  it('suppresses "(optional)" when hideOptionalLabel is true', () => {
    const { queryByText } = renderGroupedFields({ hideOptionalLabel: true })
    expect(queryByText('(optional)', { exact: false })).toBeNull()
  })

  it('renders hint text when provided', () => {
    const { getByText } = renderGroupedFields({ hint: 'Enter start and end dates' })
    expect(getByText('Enter start and end dates')).toBeTruthy()
  })

  it('does not render hint when omitted', () => {
    const { queryByText } = renderGroupedFields()
    expect(queryByText('Enter start and end dates')).toBeNull()
  })

  it('renders error message when either field is invalid', () => {
    const { getByText } = renderGroupedFields({ field1Invalid: true, message: 'Enter a valid date range' })
    expect(getByText('Enter a valid date range')).toBeTruthy()
  })

  it('does not render error message when both fields are valid', () => {
    const { queryByText } = renderGroupedFields({ message: 'Enter a valid date range' })
    expect(queryByText('Enter a valid date range')).toBeNull()
  })

  it('applies the invalid container modifier when either field is invalid', () => {
    const { container } = renderGroupedFields({ field1Invalid: true })
    expect(container.querySelector('.agds-field-container--invalid')).toBeTruthy()
  })

  it('does not apply invalid modifier when both fields are valid', () => {
    const { container } = renderGroupedFields()
    expect(container.querySelector('.agds-field-container--invalid')).toBeNull()
  })

  it('renders the data-grouped-fields attribute on the row', () => {
    const { container } = renderGroupedFields()
    expect(container.querySelector('[data-grouped-fields]')).toBeTruthy()
  })
})

// ─── Legend visibility ────────────────────────────────────────────────────────

describe('AGDSGroupedFields — legend visibility', () => {
  it('visually hides the legend when visuallyHideLegend is true', () => {
    const { container } = renderGroupedFields({ visuallyHideLegend: true })
    const legend = container.querySelector('legend')
    expect(legend?.className).toContain('agds-grouped-fields__legend--hidden')
  })

  it('does not apply the hidden class when visuallyHideLegend is false', () => {
    const { container } = renderGroupedFields({ visuallyHideLegend: false })
    const legend = container.querySelector('legend')
    expect(legend?.className).not.toContain('agds-grouped-fields__legend--hidden')
  })
})

// ─── ARIA — field1Props ───────────────────────────────────────────────────────

describe('AGDSGroupedFields — field1Props a11y', () => {
  it('sets aria-invalid=true on field 1 when field1Invalid is true', () => {
    const { container } = renderGroupedFields({ field1Invalid: true })
    const inputs = container.querySelectorAll('input')
    expect(inputs[0]?.getAttribute('aria-invalid')).toBe('true')
    expect(inputs[1]?.getAttribute('aria-invalid')).toBe('false')
  })

  it('sets aria-describedby referencing the message id on field 1 when invalid + message', () => {
    const { container } = renderGroupedFields({ field1Invalid: true, message: 'Error' })
    const input = container.querySelectorAll('input')[0]
    expect(input?.getAttribute('aria-describedby')).toContain('message')
  })

  it('sets aria-describedby referencing hint id on field 1 when hint is provided', () => {
    const { container } = renderGroupedFields({ hint: 'Some hint' })
    const input = container.querySelectorAll('input')[0]
    expect(input?.getAttribute('aria-describedby')).toContain('hint')
  })

  it('includes both message and hint ids in aria-describedby when field 1 is invalid', () => {
    const { container } = renderGroupedFields({
      field1Invalid: true,
      hint: 'Some hint',
      message: 'Error',
    })
    const describedBy = container.querySelectorAll('input')[0]?.getAttribute('aria-describedby') ?? ''
    expect(describedBy).toContain('message')
    expect(describedBy).toContain('hint')
  })
})

// ─── ARIA — field2Props ───────────────────────────────────────────────────────

describe('AGDSGroupedFields — field2Props a11y', () => {
  it('sets aria-invalid=true on field 2 when field2Invalid is true', () => {
    const { container } = renderGroupedFields({ field2Invalid: true })
    const inputs = container.querySelectorAll('input')
    expect(inputs[0]?.getAttribute('aria-invalid')).toBe('false')
    expect(inputs[1]?.getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set message id in aria-describedby on field 2 when only field 1 is invalid', () => {
    const { container } = renderGroupedFields({ field1Invalid: true, message: 'Error' })
    const describedBy = container.querySelectorAll('input')[1]?.getAttribute('aria-describedby') ?? ''
    expect(describedBy).not.toContain('message')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSGroupedFields — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderGroupedFields()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with hint', async () => {
    const { container } = renderGroupedFields({ hint: 'Enter start and end dates' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when field 1 is invalid', async () => {
    const { container } = renderGroupedFields({ field1Invalid: true, message: 'Enter a valid start date' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when both fields are invalid', async () => {
    const { container } = renderGroupedFields({
      field1Invalid: true,
      field2Invalid: true,
      message: 'Both dates are required',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when legend is visually hidden', async () => {
    const { container } = renderGroupedFields({ visuallyHideLegend: true })
    await runAxe(container, AXE_OPTS)
  })
})
