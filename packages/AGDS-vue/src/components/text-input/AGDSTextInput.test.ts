import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSTextInput from './AGDSTextInput.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderInput(props: Record<string, unknown> = {}) {
  return render(AgDSTextInput, {
    props: { label: 'Full name', ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSTextInput — rendering', () => {
  it('renders a text input', () => {
    const { getByRole } = renderInput()
    expect(getByRole('textbox')).toBeTruthy()
  })

  it('defaults to type="text"', () => {
    const { getByRole } = renderInput()
    expect(getByRole('textbox').getAttribute('type')).toBe('text')
  })

  it('renders a custom type', () => {
    const { getByRole } = renderInput({ type: 'email' })
    expect(getByRole('textbox').getAttribute('type')).toBe('email')
  })

  it('associates the label with the input', () => {
    const { getByLabelText } = renderInput({ required: true })
    expect(getByLabelText('Full name', { selector: 'input' })).toBeTruthy()
  })

  it('uses a custom id when provided', () => {
    const { getByRole } = renderInput({ id: 'my-name' })
    expect(getByRole('textbox').id).toBe('my-name')
  })

  it('renders a placeholder', () => {
    const { getByPlaceholderText } = renderInput({ placeholder: 'Jane Smith' })
    expect(getByPlaceholderText('Jane Smith')).toBeTruthy()
  })

  it('renders the hint text', () => {
    const { getByText } = renderInput({ hint: 'As it appears on your ID' })
    expect(getByText('As it appears on your ID')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderInput({ invalid: true, message: 'Name is required' })
    expect(getByText('Name is required')).toBeTruthy()
  })

  it('does not render the error message when not invalid', () => {
    const { queryByText } = renderInput({ invalid: false, message: 'Name is required' })
    expect(queryByText('Name is required')).toBeNull()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AgDSTextInput — disabled prop', () => {
  it('sets the native disabled attribute', () => {
    const { getByRole } = renderInput({ disabled: true })
    expect((getByRole('textbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('is not disabled by default', () => {
    const { getByRole } = renderInput()
    expect((getByRole('textbox') as HTMLInputElement).disabled).toBe(false)
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AgDSTextInput — invalid prop', () => {
  it('sets aria-invalid when invalid', () => {
    const { getByRole } = renderInput({ invalid: true })
    expect(getByRole('textbox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid by default', () => {
    const { getByRole } = renderInput()
    expect(getByRole('textbox').getAttribute('aria-invalid')).not.toBe('true')
  })
})

// ─── v-model ──────────────────────────────────────────────────────────────────

describe('AgDSTextInput — v-model', () => {
  it('reflects modelValue in the input', () => {
    const { getByRole } = renderInput({ modelValue: 'Alice' })
    expect((getByRole('textbox') as HTMLInputElement).value).toBe('Alice')
  })

  it('emits update:modelValue on typing', async () => {
    const { getByRole, emitted } = renderInput({ modelValue: '' })
    await fireEvent.input(getByRole('textbox'), { target: { value: 'Bob' } })
    expect((emitted()['update:modelValue'] as string[][])[0][0]).toBe('Bob')
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AgDSTextInput — events', () => {
  it('emits change on native change', async () => {
    const { getByRole, emitted } = renderInput()
    await fireEvent.change(getByRole('textbox'))
    expect(emitted().change).toHaveLength(1)
  })

  it('emits focus on native focus', async () => {
    const { getByRole, emitted } = renderInput()
    await fireEvent.focus(getByRole('textbox'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on native blur', async () => {
    const { getByRole, emitted } = renderInput()
    await fireEvent.blur(getByRole('textbox'))
    expect(emitted().blur).toHaveLength(1)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSTextInput — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderInput()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderInput({ invalid: true, message: 'Name is required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderInput({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when block=true', async () => {
    const { container } = renderInput({ block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for each maxWidth variant', async () => {
    for (const maxWidth of ['xs', 'sm', 'md', 'lg', 'xl'] as const) {
      const { container } = renderInput({ maxWidth })
      await runAxe(container, AXE_OPTS)
    }
  })

  it('has a violation when a text input has no label', async () => {
    const { container } = render({ template: '<input type="text" id="unlabelled" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
