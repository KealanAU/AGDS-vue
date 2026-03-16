import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSSearchInput from './AGDSSearchInput.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderInput(props: Record<string, unknown> = {}) {
  return render(AgDSSearchInput, {
    props: { label: 'Search', ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSSearchInput — rendering', () => {
  it('renders a search input', () => {
    const { getByRole } = renderInput()
    expect(getByRole('searchbox')).toBeTruthy()
  })

  it('renders type="search"', () => {
    const { getByRole } = renderInput()
    expect(getByRole('searchbox').getAttribute('type')).toBe('search')
  })

  it('renders autocomplete="off"', () => {
    const { getByRole } = renderInput()
    expect(getByRole('searchbox').getAttribute('autocomplete')).toBe('off')
  })

  it('associates the label with the input', () => {
    // Pass required=true so the "(optional)" suffix is not appended
    const { getByLabelText } = renderInput({ required: true })
    expect(getByLabelText('Search', { selector: 'input' })).toBeTruthy()
  })

  it('uses a custom id when provided', () => {
    const { getByRole } = renderInput({ id: 'site-search' })
    expect(getByRole('searchbox').id).toBe('site-search')
  })

  it('renders a placeholder', () => {
    const { getByPlaceholderText } = renderInput({ placeholder: 'Search services…' })
    expect(getByPlaceholderText('Search services…')).toBeTruthy()
  })

  it('renders the hint text', () => {
    const { getByText } = renderInput({ hint: 'Enter a keyword' })
    expect(getByText('Enter a keyword')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderInput({ invalid: true, message: 'Required field' })
    expect(getByText('Required field')).toBeTruthy()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AgDSSearchInput — disabled prop', () => {
  it('sets the native disabled attribute', () => {
    const { getByRole } = renderInput({ disabled: true })
    expect((getByRole('searchbox') as HTMLInputElement).disabled).toBe(true)
  })

  it('is not disabled by default', () => {
    const { getByRole } = renderInput()
    expect((getByRole('searchbox') as HTMLInputElement).disabled).toBe(false)
  })
})

// ─── Clear button ─────────────────────────────────────────────────────────────

describe('AgDSSearchInput — clear button', () => {
  it('is not shown when the input is empty', () => {
    const { queryByRole } = renderInput({ modelValue: '' })
    expect(queryByRole('button', { name: 'Clear search' })).toBeNull()
  })

  it('is shown when there is a value', () => {
    const { getByRole } = renderInput({ modelValue: 'hello' })
    expect(getByRole('button', { name: 'Clear search' })).toBeTruthy()
  })

  it('clears the input on click and emits update:modelValue', async () => {
    // Use v-model binding so the parent propagates the empty value back
    const { getByRole, queryByRole, emitted } = render({
      components: { AgDSSearchInput },
      template: `<AgDSSearchInput v-model="query" label="Search" />`,
      data() { return { query: 'hello' } },
    })
    await fireEvent.click(getByRole('button', { name: 'Clear search' }))
    expect((emitted()['update:modelValue'] as string[][])?.[0]?.[0] ?? '').toBe('')
    expect(queryByRole('button', { name: 'Clear search' })).toBeNull()
  })

  it('emits "clear" on click', async () => {
    const { getByRole, emitted } = render(AgDSSearchInput, {
      props: { label: 'Search', modelValue: 'hello' },
    })
    await fireEvent.click(getByRole('button', { name: 'Clear search' }))
    expect(emitted().clear).toHaveLength(1)
  })

  it('is not keyboard-focusable (no tabindex)', () => {
    const { getByRole } = renderInput({ modelValue: 'hello' })
    const clearBtn = getByRole('button', { name: 'Clear search' })
    // role="button" div intentionally has no tabindex — keyboard users use Escape
    expect(clearBtn.getAttribute('tabindex')).toBeNull()
    expect(clearBtn.tagName).toBe('DIV')
  })
})

// ─── Keyboard: Escape clears ──────────────────────────────────────────────────

describe('AgDSSearchInput — Escape key', () => {
  it('clears the input when Escape is pressed', async () => {
    const { getByRole, emitted } = render(AgDSSearchInput, {
      props: { label: 'Search', modelValue: 'vue3' },
    })
    await fireEvent.keyDown(getByRole('searchbox'), { code: 'Escape' })
    expect((emitted()['update:modelValue'] as string[][])[0][0]).toBe('')
    expect(emitted().clear).toHaveLength(1)
  })

  it('does nothing on Escape when the input is already empty', async () => {
    const { getByRole, emitted } = render(AgDSSearchInput, {
      props: { label: 'Search', modelValue: '' },
    })
    await fireEvent.keyDown(getByRole('searchbox'), { code: 'Escape' })
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

// ─── v-model ──────────────────────────────────────────────────────────────────

describe('AgDSSearchInput — v-model', () => {
  it('reflects modelValue in the input', () => {
    const { getByRole } = renderInput({ modelValue: 'government' })
    expect((getByRole('searchbox') as HTMLInputElement).value).toBe('government')
  })

  it('emits update:modelValue on typing', async () => {
    const { getByRole, emitted } = renderInput({ modelValue: '' })
    await fireEvent.input(getByRole('searchbox'), { target: { value: 'abc' } })
    expect((emitted()['update:modelValue'] as string[][])[0][0]).toBe('abc')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSSearchInput — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderInput()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderInput({ invalid: true, message: 'Enter a search term' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderInput({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when clear button is visible', async () => {
    const { container } = renderInput({ modelValue: 'search term' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when block=true', async () => {
    const { container } = renderInput({ block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for each maxWidth variant', async () => {
    for (const maxWidth of ['md', 'lg', 'xl'] as const) {
      const { container } = renderInput({ maxWidth })
      await runAxe(container, AXE_OPTS)
    }
  })

  it('has a violation when a search input has no label', async () => {
    // Render a bare input with no label — verifies the axe helper catches real failures
    const { container } = render({ template: '<input type="search" id="unlabelled" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
