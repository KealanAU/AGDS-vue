import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTextarea from './AGDSTextarea.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderTextarea(props: Record<string, unknown> = {}) {
  return render(AGDSTextarea, {
    props: { label: 'Message', ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSTextarea — rendering', () => {
  it('renders a textarea', () => {
    const { container } = renderTextarea()
    expect(container.querySelector('textarea')).toBeTruthy()
  })

  it('associates the label with the textarea', () => {
    const { getByLabelText } = renderTextarea({ required: true })
    expect(getByLabelText('Message', { selector: 'textarea' })).toBeTruthy()
  })

  it('uses a custom id when provided', () => {
    const { container } = renderTextarea({ id: 'my-message' })
    expect(container.querySelector('textarea')?.id).toBe('my-message')
  })

  it('renders a placeholder', () => {
    const { getByPlaceholderText } = renderTextarea({ placeholder: 'Enter your message…' })
    expect(getByPlaceholderText('Enter your message…')).toBeTruthy()
  })

  it('renders the hint text', () => {
    const { getByText } = renderTextarea({ hint: 'Maximum 500 characters' })
    expect(getByText('Maximum 500 characters')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderTextarea({ invalid: true, message: 'Message is required' })
    expect(getByText('Message is required')).toBeTruthy()
  })

  it('does not render the error message when not invalid', () => {
    const { queryByText } = renderTextarea({ invalid: false, message: 'Message is required' })
    expect(queryByText('Message is required')).toBeNull()
  })

  it('renders a custom rows value', () => {
    const { container } = renderTextarea({ rows: 8 })
    expect(container.querySelector('textarea')?.getAttribute('rows')).toBe('8')
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSTextarea — disabled prop', () => {
  it('sets the native disabled attribute', () => {
    const { container } = renderTextarea({ disabled: true })
    expect((container.querySelector('textarea') as HTMLTextAreaElement).disabled).toBe(true)
  })

  it('is not disabled by default', () => {
    const { container } = renderTextarea()
    expect((container.querySelector('textarea') as HTMLTextAreaElement).disabled).toBe(false)
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AGDSTextarea — invalid prop', () => {
  it('sets aria-invalid when invalid', () => {
    const { container } = renderTextarea({ invalid: true })
    expect(container.querySelector('textarea')?.getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid by default', () => {
    const { container } = renderTextarea()
    expect(container.querySelector('textarea')?.getAttribute('aria-invalid')).not.toBe('true')
  })
})

// ─── v-model ──────────────────────────────────────────────────────────────────

describe('AGDSTextarea — v-model', () => {
  it('reflects modelValue in the textarea', () => {
    const { container } = renderTextarea({ modelValue: 'Hello world' })
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('Hello world')
  })

  it('emits update:modelValue on typing', async () => {
    const { container, emitted } = renderTextarea({ modelValue: '' })
    await fireEvent.input(container.querySelector('textarea')!, { target: { value: 'new text' } })
    expect((emitted()['update:modelValue'] as string[][])[0][0]).toBe('new text')
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSTextarea — events', () => {
  it('emits change on native change', async () => {
    const { container, emitted } = renderTextarea()
    await fireEvent.change(container.querySelector('textarea')!)
    expect(emitted().change).toHaveLength(1)
  })

  it('emits focus on native focus', async () => {
    const { container, emitted } = renderTextarea()
    await fireEvent.focus(container.querySelector('textarea')!)
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur on native blur', async () => {
    const { container, emitted } = renderTextarea()
    await fireEvent.blur(container.querySelector('textarea')!)
    expect(emitted().blur).toHaveLength(1)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSTextarea — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderTextarea()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderTextarea({ invalid: true, message: 'Message is required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderTextarea({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when block=true', async () => {
    const { container } = renderTextarea({ block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for each maxWidth variant', async () => {
    for (const maxWidth of ['md', 'lg', 'xl'] as const) {
      const { container } = renderTextarea({ maxWidth })
      await runAxe(container, AXE_OPTS)
    }
  })

  it('has a violation when a textarea has no label', async () => {
    const { container } = render({ template: '<textarea id="unlabelled"></textarea>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
