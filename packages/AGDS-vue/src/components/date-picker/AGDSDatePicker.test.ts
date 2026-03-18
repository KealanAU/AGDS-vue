import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSDatePicker from './AGDSDatePicker.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderDatePicker(props: Record<string, unknown> = {}) {
  return render(AGDSDatePicker, { props })
}

// ─── Single mode — rendering ───────────────────────────────────────────────────

describe('AGDSDatePicker — single mode rendering', () => {
  it('renders a text input', () => {
    const { getByRole } = renderDatePicker({ label: 'Date of birth' })
    expect(getByRole('textbox')).toBeTruthy()
  })

  it('renders a label associated with the input', () => {
    const { getByLabelText } = renderDatePicker({ label: 'Date of birth' })
    expect(getByLabelText(/Date of birth/)).toBeTruthy()
  })

  it('renders the calendar trigger button', () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date of birth' })
    const buttons = getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('calendar trigger button has aria-expanded="false" initially', () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date of birth' })
    const triggerBtn = getAllByRole('button').find(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    )!
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('false')
  })

  it('calendar trigger button has aria-haspopup="dialog"', () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date of birth' })
    const triggerBtn = getAllByRole('button').find(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    )!
    expect(triggerBtn).toBeTruthy()
  })

  it('calendar trigger label says "Choose date" when no value', () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date of birth' })
    const triggerBtn = getAllByRole('button').find(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    )!
    expect(triggerBtn.getAttribute('aria-label')).toContain('Choose')
  })
})

// ─── Single mode — optional label ─────────────────────────────────────────────

describe('AGDSDatePicker — optional label', () => {
  it('appends "(optional)" when required=false (default)', () => {
    const { getByLabelText } = renderDatePicker({ label: 'Date of birth' })
    expect(getByLabelText(/Date of birth \(optional\)/)).toBeTruthy()
  })

  it('does not append "(optional)" when required=true', () => {
    const { getByText } = renderDatePicker({ label: 'Date of birth', required: true })
    const labelEl = getByText((text) => text.includes('Date of birth'))
    expect(labelEl.textContent).not.toContain('optional')
  })

  it('does not append "(optional)" when hideOptionalLabel=true', () => {
    const { getByText } = renderDatePicker({ label: 'Date of birth', hideOptionalLabel: true })
    const labelEl = getByText((text) => text.includes('Date of birth'))
    expect(labelEl.textContent).not.toContain('optional')
  })
})

// ─── Single mode — hint & message ─────────────────────────────────────────────

describe('AGDSDatePicker — hint and message', () => {
  it('renders hint text when provided', () => {
    const { getByText } = renderDatePicker({ label: 'Date', hint: 'Use format DD/MM/YYYY' })
    expect(getByText('Use format DD/MM/YYYY')).toBeTruthy()
  })

  it('does not render error message when invalid=false', () => {
    const { queryByRole } = renderDatePicker({
      label: 'Date',
      message: 'Invalid date',
      invalid: false,
    })
    expect(queryByRole('alert')).toBeNull()
  })

  it('renders error message with role="alert" when invalid=true', () => {
    const { getByRole } = renderDatePicker({
      label: 'Date',
      message: 'Enter a valid date',
      invalid: true,
    })
    expect(getByRole('alert')).toBeTruthy()
    expect(getByRole('alert').textContent).toContain('Enter a valid date')
  })
})

// ─── Single mode — disabled ───────────────────────────────────────────────────

describe('AGDSDatePicker — disabled prop', () => {
  it('disables the text input when disabled=true', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', disabled: true })
    expect((getByRole('textbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('disables the calendar trigger button when disabled=true', () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date', disabled: true })
    const triggerBtn = getAllByRole('button').find(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    ) as HTMLButtonElement | undefined
    expect(triggerBtn?.disabled).toBe(true)
  })
})

// ─── Single mode — aria attributes on input ───────────────────────────────────

describe('AGDSDatePicker — input ARIA attributes', () => {
  it('sets aria-invalid on the input when invalid=true', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', invalid: true })
    expect(getByRole('textbox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when invalid=false', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', invalid: false })
    expect(getByRole('textbox').getAttribute('aria-invalid')).toBeNull()
  })

  it('sets aria-required on the input when required=true', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', required: true })
    expect(getByRole('textbox').getAttribute('aria-required')).toBe('true')
  })

  it('links aria-describedby to hint when hint is provided', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', hint: 'Hint text' })
    const describedBy = getByRole('textbox').getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
  })

  it('links aria-describedby to message when invalid and message provided', () => {
    const { getByRole } = renderDatePicker({ label: 'Date', message: 'Bad date', invalid: true })
    const describedBy = getByRole('textbox').getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
  })
})

// ─── Single mode — trigger toggles calendar ───────────────────────────────────

describe('AGDSDatePicker — trigger opens calendar', () => {
  it('aria-expanded changes to true after clicking trigger', async () => {
    const { getAllByRole } = renderDatePicker({ label: 'Date of birth' })
    const triggerBtn = getAllByRole('button').find(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    )!
    await fireEvent.click(triggerBtn)
    expect(triggerBtn.getAttribute('aria-expanded')).toBe('true')
  })
})

// ─── Range mode — rendering ───────────────────────────────────────────────────

describe('AGDSDatePicker — range mode rendering', () => {
  it('renders a <fieldset> in range mode', () => {
    const { container } = renderDatePicker({ range: true, label: 'Date range' })
    expect(container.querySelector('fieldset')).toBeTruthy()
  })

  it('renders a <legend> with the label text', () => {
    const { container } = renderDatePicker({ range: true, label: 'Date range' })
    const legend = container.querySelector('legend')
    expect(legend?.textContent).toContain('Date range')
  })

  it('renders two text inputs in range mode', () => {
    const { getAllByRole } = renderDatePicker({ range: true, label: 'Date range' })
    expect(getAllByRole('textbox')).toHaveLength(2)
  })

  it('renders two calendar trigger buttons in range mode', () => {
    const { getAllByRole } = renderDatePicker({ range: true, label: 'Date range' })
    const triggers = getAllByRole('button').filter(
      (b) => b.getAttribute('aria-haspopup') === 'dialog',
    )
    expect(triggers).toHaveLength(2)
  })

  it('renders fromLabel as the start date label', () => {
    const { getByLabelText } = renderDatePicker({
      range: true,
      label: 'Date range',
      fromLabel: 'Start date',
    })
    expect(getByLabelText(/Start date/)).toBeTruthy()
  })

  it('renders toLabel as the end date label', () => {
    const { getByLabelText } = renderDatePicker({
      range: true,
      label: 'Date range',
      toLabel: 'End date',
    })
    expect(getByLabelText(/End date/)).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSDatePicker — axe accessibility', () => {
  it('has no violations in single mode with a label', async () => {
    const { container } = renderDatePicker({ label: 'Date of birth' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required=true', async () => {
    const { container } = renderDatePicker({ label: 'Date of birth', required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with message', async () => {
    const { container } = renderDatePicker({
      label: 'Date of birth',
      invalid: true,
      message: 'Enter a valid date',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderDatePicker({ label: 'Date of birth', disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in range mode', async () => {
    const { container } = renderDatePicker({ range: true, label: 'Date range' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in range mode when invalid', async () => {
    const { container } = renderDatePicker({
      range: true,
      label: 'Date range',
      fromInvalid: true,
      message: 'Enter a valid start date',
    })
    await runAxe(container, AXE_OPTS)
  })
})
