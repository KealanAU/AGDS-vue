import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTimeInput from './AGDSTimeInput.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderTimeInput(props: Record<string, unknown> = {}) {
  return render(AGDSTimeInput, {
    props: { label: 'Meeting time', ...props },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSTimeInput — rendering', () => {
  it('renders a text input', () => {
    const { getByRole } = renderTimeInput()
    expect(getByRole('textbox')).toBeTruthy()
  })

  it('associates the label with the input', () => {
    const { getByLabelText } = renderTimeInput({ required: true })
    expect(getByLabelText(/Meeting time/, { selector: 'input' })).toBeTruthy()
  })

  it('renders a secondary label with the format hint', () => {
    const { container } = renderTimeInput()
    expect(container.textContent).toContain('e.g.')
  })

  it('uses a custom id when provided', () => {
    const { getByRole } = renderTimeInput({ id: 'my-time' })
    expect(getByRole('textbox').id).toBe('my-time')
  })

  it('renders a placeholder', () => {
    const { getByPlaceholderText } = renderTimeInput({ placeholder: '9:00 am' })
    expect(getByPlaceholderText('9:00 am')).toBeTruthy()
  })

  it('renders hint text when provided', () => {
    const { getByText } = renderTimeInput({ hint: 'Use 12-hour format' })
    expect(getByText('Use 12-hour format')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderTimeInput({ invalid: true, message: 'Enter a valid time' })
    expect(getByText('Enter a valid time')).toBeTruthy()
  })

  it('does not render the error message when not invalid', () => {
    const { queryByText } = renderTimeInput({ message: 'Enter a valid time' })
    expect(queryByText('Enter a valid time')).toBeNull()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSTimeInput — disabled prop', () => {
  it('sets the native disabled attribute', () => {
    const { getByRole } = renderTimeInput({ disabled: true })
    expect((getByRole('textbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('is not disabled by default', () => {
    const { getByRole } = renderTimeInput()
    expect((getByRole('textbox') as HTMLInputElement).disabled).toBe(false)
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AGDSTimeInput — invalid prop', () => {
  it('sets aria-invalid when invalid=true', () => {
    const { getByRole } = renderTimeInput({ invalid: true })
    expect(getByRole('textbox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid by default', () => {
    const { getByRole } = renderTimeInput()
    expect(getByRole('textbox').getAttribute('aria-invalid')).not.toBe('true')
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSTimeInput — events', () => {
  it('emits focus on native focus', async () => {
    const { getByRole, emitted } = renderTimeInput()
    await fireEvent.focus(getByRole('textbox'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on native blur', async () => {
    const { getByRole, emitted } = renderTimeInput()
    await fireEvent.blur(getByRole('textbox'))
    expect(emitted().blur).toHaveLength(1)
  })

  it('emits update:modelValue with undefined when blurred with empty input', async () => {
    const { getByRole, emitted } = renderTimeInput()
    const input = getByRole('textbox')
    // Blur with empty value → normalizedTime is '' → TimeValue is undefined
    await fireEvent.blur(input, { target: { value: '' } })
    const updates = emitted()['update:modelValue']
    expect(updates).toHaveLength(1)
    expect(updates[0][0]).toBeUndefined()
  })

  it('emits update:modelValue with a parsed TimeValue when blurred with a valid time', async () => {
    const { getByRole, emitted } = renderTimeInput()
    const input = getByRole('textbox')
    await fireEvent.blur(input, { target: { value: '09:30' } })
    const updates = emitted()['update:modelValue']
    expect(updates).toHaveLength(1)
    const payload = updates[0][0] as { value: string; formatted: string }
    expect(payload.value).toBe('09:30')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSTimeInput — axe accessibility', () => {
  it('has no violations in the default state', async () => {
    const { container } = renderTimeInput()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when required=true', async () => {
    const { container } = renderTimeInput({ required: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid with a message', async () => {
    const { container } = renderTimeInput({ invalid: true, message: 'Enter a valid time' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderTimeInput({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when block=true', async () => {
    const { container } = renderTimeInput({ block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with hint text', async () => {
    const { container } = renderTimeInput({ hint: 'Use 12-hour format' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when a text input has no label', async () => {
    const { container } = render({ template: '<input type="text" id="unlabelled" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
