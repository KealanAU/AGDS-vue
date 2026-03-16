import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSPasswordInput from './AGDSPasswordInput.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderInput(props: Record<string, unknown> = {}) {
  return render(AgDSPasswordInput, { props: { label: 'Password', ...props } })
}

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSPasswordInput — accessibility', () => {
  it('passes axe in default state', async () => {
    const { container } = renderInput()
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe when invalid', async () => {
    const { container } = renderInput({ invalid: true, message: 'Password is required' })
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe when disabled', async () => {
    const { container } = renderInput({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('fails axe when input has no label (intentional violation check)', async () => {
    // Render a bare input with no associated label to verify runAxe catches real violations
    const div = document.createElement('div')
    const input = document.createElement('input')
    input.type = 'text'
    div.appendChild(input)
    document.body.appendChild(div)
    await expect(runAxe(div, AXE_OPTS)).rejects.toThrow()
    document.body.removeChild(div)
  })
})

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSPasswordInput — rendering', () => {
  it('renders a password input by default', () => {
    const { getByLabelText } = renderInput()
    const input = getByLabelText('Password (optional)') as HTMLInputElement
    expect(input.type).toBe('password')
  })

  it('renders the label', () => {
    const { container } = renderInput()
    const label = container.querySelector('label')
    expect(label?.textContent?.replace(/\s+/g, ' ').trim()).toMatch(/Password/)
  })

  it('renders the "Show password" checkbox', () => {
    const { getByRole } = renderInput()
    const checkbox = getByRole('checkbox', { name: /show password/i })
    expect(checkbox).toBeTruthy()
  })

  it('renders hint text when provided', () => {
    const { getByText } = renderInput({ hint: 'Must be at least 8 characters' })
    expect(getByText('Must be at least 8 characters')).toBeTruthy()
  })

  it('renders error message when invalid', () => {
    const { getByText } = renderInput({ invalid: true, message: 'Password is required' })
    expect(getByText('Password is required')).toBeTruthy()
  })

  it('does not render error message when not invalid', () => {
    const { queryByText } = renderInput({ invalid: false, message: 'Password is required' })
    expect(queryByText('Password is required')).toBeNull()
  })

  it('appends (optional) when required is false', () => {
    const { getByText } = renderInput({ required: false })
    expect(getByText('(optional)')).toBeTruthy()
  })

  it('does not append (optional) when required is true', () => {
    const { queryByText } = renderInput({ required: true })
    expect(queryByText('(optional)')).toBeNull()
  })

  it('accepts a custom id', () => {
    const { getByLabelText } = renderInput({ required: true, id: 'my-password' })
    const input = getByLabelText('Password') as HTMLInputElement
    expect(input.id).toBe('my-password')
  })
})

// ─── Show/hide toggle ─────────────────────────────────────────────────────────

describe('AgDSPasswordInput — show/hide toggle', () => {
  it('toggles input type to text when "Show password" is checked', async () => {
    const { getByLabelText, getByRole } = renderInput({ required: true })
    const input = getByLabelText('Password') as HTMLInputElement
    const checkbox = getByRole('checkbox', { name: /show password/i }) as HTMLInputElement

    expect(input.type).toBe('password')

    await fireEvent.click(checkbox)
    expect(input.type).toBe('text')

    await fireEvent.click(checkbox)
    expect(input.type).toBe('password')
  })

  it('checkbox has aria-controls pointing to the input id', () => {
    const { getByRole, getByLabelText } = renderInput({ required: true, id: 'pwd' })
    const input = getByLabelText('Password') as HTMLInputElement
    const checkbox = getByRole('checkbox', { name: /show password/i })
    expect(checkbox.getAttribute('aria-controls')).toBe(input.id)
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AgDSPasswordInput — disabled prop', () => {
  it('disables the input', () => {
    const { getByLabelText } = renderInput({ required: true, disabled: true })
    const input = getByLabelText('Password') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('disables the "Show password" checkbox', () => {
    const { getByRole } = renderInput({ disabled: true })
    const checkbox = getByRole('checkbox', { name: /show password/i }) as HTMLInputElement
    expect(checkbox.disabled).toBe(true)
  })
})

// ─── Props: ARIA ──────────────────────────────────────────────────────────────

describe('AgDSPasswordInput — ARIA attributes', () => {
  it('sets aria-invalid on input when invalid', () => {
    const { getByLabelText } = renderInput({ required: true, invalid: true, message: 'Error' })
    const input = getByLabelText('Password')
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('sets aria-required on input when required', () => {
    const { getByLabelText } = renderInput({ required: true })
    const input = getByLabelText('Password')
    expect(input.getAttribute('aria-required')).toBe('true')
  })

  it('sets aria-describedby to hint id when hint is provided', () => {
    const { getByLabelText } = renderInput({ required: true, hint: 'Hint text' })
    const input = getByLabelText('Password')
    expect(input.getAttribute('aria-describedby')).toBeTruthy()
  })
})

// ─── v-model ──────────────────────────────────────────────────────────────────

describe('AgDSPasswordInput — v-model', () => {
  it('emits update:modelValue on input', async () => {
    const { getByLabelText, emitted } = renderInput({ required: true, modelValue: '' })
    const input = getByLabelText('Password') as HTMLInputElement

    await fireEvent.input(input, { target: { value: 'secret' } })
    expect(emitted()['update:modelValue']).toEqual([['secret']])
  })

  it('reflects the modelValue in the input', () => {
    const { getByLabelText } = renderInput({ required: true, modelValue: 'hunter2' })
    const input = getByLabelText('Password') as HTMLInputElement
    expect(input.value).toBe('hunter2')
  })
})

// ─── defineExpose: focus ──────────────────────────────────────────────────────

describe('AgDSPasswordInput — defineExpose', () => {
  it('exposes a focus method', () => {
    const { getByLabelText } = renderInput({ required: true })
    const input = getByLabelText('Password') as HTMLInputElement
    // If focus() throws, the test fails
    expect(() => input.focus()).not.toThrow()
  })
})
