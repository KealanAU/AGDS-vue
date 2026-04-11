import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTimePicker from './AGDSTimePicker.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderTimePicker(props: Record<string, unknown> = {}) {
  return render(AGDSTimePicker, {
    props: { label: 'Meeting time', ...props },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSTimePicker — rendering', () => {
  it('renders a combobox input', () => {
    renderTimePicker()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders a visible label', () => {
    renderTimePicker()
    expect(screen.getByText('Meeting time')).toBeTruthy()
  })

  it('renders a dropdown trigger button', () => {
    renderTimePicker()
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(1)
  })

  it('uses a custom id when provided', () => {
    renderTimePicker({ id: 'my-time' })
    expect(screen.getByRole('combobox').id).toBe('my-time')
  })

  it('renders a placeholder', () => {
    renderTimePicker({ placeholder: 'Select time…' })
    expect(screen.getByPlaceholderText('Select time…')).toBeTruthy()
  })

  it('renders hint text when provided', () => {
    renderTimePicker({ hint: 'Select a time for the meeting' })
    expect(screen.getByText('Select a time for the meeting')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    renderTimePicker({ invalid: true, message: 'Select a valid time' })
    expect(screen.getByText('Select a valid time')).toBeTruthy()
  })

  it('does not render the error message when not invalid', () => {
    renderTimePicker({ message: 'Select a valid time' })
    expect(screen.queryByText('Select a valid time')).toBeNull()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSTimePicker — disabled prop', () => {
  it('disables the input when disabled=true', () => {
    renderTimePicker({ disabled: true })
    expect(screen.getByRole('combobox').hasAttribute('disabled')).toBe(true)
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AGDSTimePicker — invalid prop', () => {
  it('sets aria-invalid when invalid=true', () => {
    renderTimePicker({ invalid: true })
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid by default', () => {
    renderTimePicker()
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).not.toBe('true')
  })
})

// ─── Props: block ─────────────────────────────────────────────────────────────

describe('AGDSTimePicker — block prop', () => {
  it('applies block class when block=true', () => {
    const { container } = renderTimePicker({ block: true })
    expect(container.querySelector('.agds-time-picker--block')).toBeTruthy()
  })

  it('does not apply block class by default', () => {
    const { container } = renderTimePicker()
    expect(container.querySelector('.agds-time-picker--block')).toBeNull()
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSTimePicker — events', () => {
  it('emits focus event when the input is focused', async () => {
    const { emitted } = renderTimePicker()
    const input = screen.getByRole('combobox')
    await fireEvent.focus(input)
    expect(emitted().focus).toBeTruthy()
  })

  it('emits blur event when the input loses focus', async () => {
    const { emitted } = renderTimePicker()
    const input = screen.getByRole('combobox')
    await fireEvent.blur(input)
    expect(emitted().blur).toBeTruthy()
  })
})

// ─── Model value ──────────────────────────────────────────────────────────────

describe('AGDSTimePicker — modelValue', () => {
  it('renders with an initial selection (exercises selectedValue getter true branch)', () => {
    const initialOption = { value: '09:00', label: '9:00 am' }
    const { container } = renderTimePicker({ modelValue: initialOption })
    // The combobox should render, and the getter would return initialOption.value
    expect(container.querySelector('input')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSTimePicker — axe accessibility', () => {
  it('has no violations in the default (closed) state', async () => {
    const { container } = renderTimePicker()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required=true', async () => {
    const { container } = renderTimePicker({ required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with a message', async () => {
    const { container } = renderTimePicker({ invalid: true, message: 'Select a valid time' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderTimePicker({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with hint text', async () => {
    const { container } = renderTimePicker({ hint: 'Select a time for the meeting' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when a text input has no label', async () => {
    const { container } = render({ template: '<input type="text" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
