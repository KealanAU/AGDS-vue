import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSelect from './AGDSSelect.vue'
import type { Options } from './AGDSSelect.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const OPTIONS: Options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

const GROUP_OPTIONS: Options = [
  {
    label: 'Fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
    ],
  },
]

function renderSelect(props: Record<string, unknown> = {}) {
  return render(AGDSSelect, {
    props: { label: 'Fruit', options: OPTIONS, required: true, ...props },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSSelect — rendering', () => {
  it('renders a combobox', () => {
    const { getByRole } = renderSelect()
    expect(getByRole('combobox')).toBeTruthy()
  })

  it('associates the label with the select', () => {
    const { getByLabelText } = renderSelect()
    expect(getByLabelText('Fruit', { selector: 'select' })).toBeTruthy()
  })

  it('uses a custom id when provided', () => {
    const { getByRole } = renderSelect({ id: 'my-select' })
    expect(getByRole('combobox').id).toBe('my-select')
  })

  it('renders flat options', () => {
    const { getByRole } = renderSelect()
    const select = getByRole('combobox') as HTMLSelectElement
    expect(select.options.length).toBe(3)
  })

  it('renders a placeholder option when provided', () => {
    const { getByRole } = renderSelect({ placeholder: 'Select a fruit' })
    const select = getByRole('combobox') as HTMLSelectElement
    const firstOption = select.options[0]
    expect(firstOption.value).toBe('')
    expect(firstOption.text).toBe('Select a fruit')
  })

  it('renders optgroups', () => {
    const { container } = render(AGDSSelect, {
      props: { label: 'Produce', options: GROUP_OPTIONS, required: true },
    })
    const groups = container.querySelectorAll('optgroup')
    expect(groups.length).toBe(2)
    expect(groups[0].label).toBe('Fruit')
    expect(groups[1].label).toBe('Vegetables')
  })

  it('renders the hint text', () => {
    const { getByText } = renderSelect({ hint: 'Choose one' })
    expect(getByText('Choose one')).toBeTruthy()
  })

  it('renders the error message when invalid', () => {
    const { getByText } = renderSelect({ invalid: true, message: 'Selection required' })
    expect(getByText('Selection required')).toBeTruthy()
  })
})

// ─── Props: disabled ──────────────────────────────────────────────────────────

describe('AGDSSelect — disabled prop', () => {
  it('sets the native disabled attribute', () => {
    const { getByRole } = renderSelect({ disabled: true })
    expect((getByRole('combobox') as HTMLSelectElement).disabled).toBe(true)
  })

  it('is not disabled by default', () => {
    const { getByRole } = renderSelect()
    expect((getByRole('combobox') as HTMLSelectElement).disabled).toBe(false)
  })

  it('does not emit change when disabled', async () => {
    const { getByRole, emitted } = renderSelect({ disabled: true })
    // Native disabled select cannot fire change, so just confirm no emissions occurred
    await fireEvent.change(getByRole('combobox'), { target: { value: 'banana' } })
    // The element is disabled so the browser blocks the event; emitted list should be empty
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

// ─── Props: invalid ───────────────────────────────────────────────────────────

describe('AGDSSelect — invalid prop', () => {
  it('sets aria-invalid on the select', () => {
    const { getByRole } = renderSelect({ invalid: true, message: 'Error' })
    expect(getByRole('combobox').getAttribute('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when valid', () => {
    const { getByRole } = renderSelect()
    expect(getByRole('combobox').getAttribute('aria-invalid')).toBe('false')
  })
})

// ─── v-model ──────────────────────────────────────────────────────────────────

describe('AGDSSelect — v-model', () => {
  it('reflects modelValue in the select', () => {
    const { getByRole } = renderSelect({ modelValue: 'banana' })
    expect((getByRole('combobox') as HTMLSelectElement).value).toBe('banana')
  })

  it('emits update:modelValue on change', async () => {
    const { getByRole, emitted } = renderSelect()
    await fireEvent.change(getByRole('combobox'), { target: { value: 'banana' } })
    expect((emitted()['update:modelValue'] as string[][])[0][0]).toBe('banana')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSelect — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderSelect()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid', async () => {
    const { container } = renderSelect({ invalid: true, message: 'Selection required' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled', async () => {
    const { container } = renderSelect({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a placeholder', async () => {
    const { container } = renderSelect({ placeholder: 'Select a fruit' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with option groups', async () => {
    const { container } = render(AGDSSelect, {
      props: { label: 'Produce', options: GROUP_OPTIONS, required: true },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when block=true', async () => {
    const { container } = renderSelect({ block: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for each maxWidth variant', async () => {
    for (const maxWidth of ['sm', 'md', 'lg', 'xl'] as const) {
      const { container } = renderSelect({ maxWidth })
      await runAxe(container, AXE_OPTS)
    }
  })

  it('detects a violation when a select has no label', async () => {
    const { container } = render({ template: '<select id="unlabelled"><option>A</option></select>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
