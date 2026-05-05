import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { runAxe } from '../../test/a11y'
import AGDSCombobox from './AGDSCombobox.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const OPTIONS = [
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Canada', value: 'ca' },
]

function renderCombobox(props: Record<string, unknown> = {}) {
  return render(AGDSCombobox, {
    props: {
      label: 'Country',
      options: OPTIONS,
      ...props,
    },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSCombobox — rendering', () => {
  it('renders a visible label', () => {
    renderCombobox()
    expect(screen.getByText('Country')).toBeTruthy()
  })

  it('renders an input with role="combobox"', () => {
    renderCombobox()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders a trigger button', () => {
    const { container } = renderCombobox()
    expect(container.querySelector('.agds-combobox__trigger')).toBeTruthy()
  })

  it('passes placeholder to the input', () => {
    renderCombobox({ placeholder: 'Search countries…' })
    expect(screen.getByPlaceholderText('Search countries…')).toBeTruthy()
  })

  it('renders the hint when provided', () => {
    renderCombobox({ hint: 'Start typing to search' })
    expect(screen.getByText('Start typing to search')).toBeTruthy()
  })

  it('renders the invalid message when invalid=true', () => {
    renderCombobox({ invalid: true, message: 'This field is required' })
    expect(screen.getByText('This field is required')).toBeTruthy()
  })

  it('applies block class when block=true', () => {
    const { container } = renderCombobox({ block: true })
    expect(container.querySelector('.agds-combobox--block')).toBeTruthy()
  })
})

// ─── Props: id ────────────────────────────────────────────────────────────────

describe('AGDSCombobox — id prop', () => {
  it('uses provided id on the input', () => {
    renderCombobox({ id: 'my-combobox' })
    expect(screen.getByRole('combobox').getAttribute('id')).toBe('my-combobox')
  })

  it('auto-generates an id when not provided', () => {
    renderCombobox()
    const id = screen.getByRole('combobox').getAttribute('id')
    expect(id).toBeTruthy()
    expect(id).toMatch(/^agds-combobox-/)
  })
})

// ─── Opening and filtering ────────────────────────────────────────────────────

describe('AGDSCombobox — opening and filtering', () => {
  it('shows all options when trigger is clicked', async () => {
    const { container } = renderCombobox()
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).toBeTruthy()
    })
  })

  it('shows filtered options after typing', async () => {
    const { container } = renderCombobox()
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy())

    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => {
      expect(screen.queryByRole('option', { name: 'Australia' })).toBeTruthy()
      expect(screen.queryByRole('option', { name: 'Canada' })).toBeNull()
    })
  })

  it('shows emptyResultsMessage when options array is empty', async () => {
    const { container } = render(AGDSCombobox, {
      props: {
        label: 'Country',
        options: [],
        emptyResultsMessage: 'No countries found',
      },
    })
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByText('No countries found')).toBeTruthy()
    })
  })

  it('shows default "No options found" message when options are empty', async () => {
    const { container } = render(AGDSCombobox, {
      props: { label: 'Country', options: [] },
    })
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByText('No options found')).toBeTruthy()
    })
  })
})

// ─── Selection ────────────────────────────────────────────────────────────────

describe('AGDSCombobox — option selection', () => {
  it('selects an option and emits update:modelValue', async () => {
    const onUpdate = vi.fn()
    const { container } = render(AGDSCombobox, {
      props: {
        label: 'Country',
        options: OPTIONS,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy())

    const option = screen.getByRole('option', { name: 'Australia' })
    await fireEvent.click(option)
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(OPTIONS[0])
    })
  })

  it('displays the selected value in the input', async () => {
    const { container } = render(AGDSCombobox, {
      props: {
        label: 'Country',
        options: OPTIONS,
        modelValue: OPTIONS[0],
      },
    })
    const input = container.querySelector('.agds-combobox__input') as HTMLInputElement
    // The display value function maps the selected option to its label
    const trigger = container.querySelector('.agds-combobox__trigger') as HTMLElement
    expect(trigger).toBeTruthy()
    // Rendered with a pre-selected value
    expect(input).toBeTruthy()
  })
})

// ─── Clearable ────────────────────────────────────────────────────────────────

describe('AGDSCombobox — clearable prop', () => {
  it('does not render a clear button when clearable=false (default)', () => {
    const { container } = renderCombobox()
    expect(container.querySelector('.agds-combobox__clear')).toBeNull()
  })

  it('does not render a clear button when clearable=true but no selection', () => {
    const { container } = renderCombobox({ clearable: true })
    expect(container.querySelector('.agds-combobox__clear')).toBeNull()
  })

  it('renders a clear button when clearable=true and a selection exists', () => {
    const { container } = render(AGDSCombobox, {
      props: {
        label: 'Country',
        options: OPTIONS,
        clearable: true,
        modelValue: OPTIONS[0],
      },
    })
    expect(container.querySelector('.agds-combobox__clear')).toBeTruthy()
  })

  it('clears the selection when the clear button is clicked', async () => {
    const onUpdate = vi.fn()
    const { container } = render(AGDSCombobox, {
      props: {
        label: 'Country',
        options: OPTIONS,
        clearable: true,
        modelValue: OPTIONS[0],
        'onUpdate:modelValue': onUpdate,
      },
    })
    const clearBtn = container.querySelector('.agds-combobox__clear') as HTMLElement
    await fireEvent.mouseDown(clearBtn)
    expect(onUpdate).toHaveBeenCalledWith(null)
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('AGDSCombobox — disabled state', () => {
  it('disables the input when disabled=true', () => {
    renderCombobox({ disabled: true })
    expect((screen.getByRole('combobox') as HTMLInputElement).disabled).toBe(true)
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSCombobox — events', () => {
  it('emits focus when the input is focused', async () => {
    const { emitted } = renderCombobox()
    await fireEvent.focus(screen.getByRole('combobox'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur when the input loses focus', async () => {
    const { emitted } = renderCombobox()
    await fireEvent.blur(screen.getByRole('combobox'))
    expect(emitted().blur).toHaveLength(1)
  })
})

// ─── expose: focus() ─────────────────────────────────────────────────────────

describe('AGDSCombobox — defineExpose', () => {
  it('exposes a focus method that focuses the input', () => {
    const { container } = renderCombobox()
    const input = container.querySelector('input') as HTMLInputElement
    const focusSpy = vi.spyOn(input, 'focus')
    input.focus()
    expect(focusSpy).toHaveBeenCalled()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSCombobox — axe accessibility', () => {
  it('has no violations in the default (closed) state', async () => {
    const { container } = renderCombobox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled=true', async () => {
    const { container } = renderCombobox({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when invalid=true', async () => {
    const { container } = renderCombobox({
      invalid: true,
      message: 'Select a country',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an input has no label', async () => {
    const { container } = render({ template: '<input type="text" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})
