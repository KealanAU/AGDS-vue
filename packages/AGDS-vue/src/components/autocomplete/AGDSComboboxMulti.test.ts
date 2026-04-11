import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { runAxe } from '../../test/a11y'
import AGDSComboboxMulti from './AGDSComboboxMulti.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const OPTIONS = [
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Canada', value: 'ca' },
]

function renderCombobox(props: Record<string, unknown> = {}) {
  return render(AGDSComboboxMulti, {
    props: {
      label: 'Countries',
      options: OPTIONS,
      ...props,
    },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — rendering', () => {
  it('renders a visible label', () => {
    renderCombobox()
    expect(screen.getByText('Countries')).toBeTruthy()
  })

  it('renders an input with role="combobox"', () => {
    renderCombobox()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders a trigger button', () => {
    const { container } = renderCombobox()
    expect(container.querySelector('.agds-combobox-multi__trigger')).toBeTruthy()
  })

  it('renders placeholder when no items selected', () => {
    renderCombobox({ placeholder: 'Select countries' })
    expect(screen.getByPlaceholderText('Select countries')).toBeTruthy()
  })

  it('renders an aria-live region', () => {
    const { container } = renderCombobox()
    expect(container.querySelector('[aria-live="polite"]')).toBeTruthy()
  })

  it('renders the hint when provided', () => {
    renderCombobox({ hint: 'Select one or more countries' })
    expect(screen.getByText('Select one or more countries')).toBeTruthy()
  })

  it('renders the invalid message when invalid=true', () => {
    renderCombobox({ invalid: true, message: 'This field is required' })
    expect(screen.getByText('This field is required')).toBeTruthy()
  })
})

// ─── Selected tags ────────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — selected items as tags', () => {
  it('renders no tags when no items are selected', () => {
    const { container } = renderCombobox()
    expect(container.querySelector('.agds-combobox-multi__tags')).toBeNull()
  })

  it('renders tags for each selected item', () => {
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0], OPTIONS[1]],
      },
    })
    const tags = container.querySelectorAll('.agds-combobox-multi__tag')
    expect(tags).toHaveLength(2)
  })

  it('shows item labels in the tags', () => {
    render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0]],
      },
    })
    expect(screen.getByText('Australia')).toBeTruthy()
  })

  it('renders a remove button for each selected tag', () => {
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0], OPTIONS[1]],
      },
    })
    expect(container.querySelectorAll('.agds-combobox-multi__tag-remove')).toHaveLength(2)
  })

  it('remove button has an accessible aria-label', () => {
    render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0]],
      },
    })
    expect(screen.getByLabelText('Remove Australia')).toBeTruthy()
  })
})

// ─── Tag removal ──────────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — removing items', () => {
  it('emits update:modelValue without the removed item on mousedown', async () => {
    const onUpdate = vi.fn()
    render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0], OPTIONS[1]],
        'onUpdate:modelValue': onUpdate,
      },
    })
    const removeBtn = screen.getByLabelText('Remove Australia')
    await fireEvent.mouseDown(removeBtn)
    expect(onUpdate).toHaveBeenCalledWith([OPTIONS[1]])
  })

  it('remove button is disabled when disabled=true', () => {
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0]],
        disabled: true,
      },
    })
    const removeBtn = container.querySelector(
      '.agds-combobox-multi__tag-remove',
    ) as HTMLButtonElement
    expect(removeBtn.disabled).toBe(true)
  })
})

// ─── Opening and filtering ────────────────────────────────────────────────────

describe('AGDSComboboxMulti — opening and filtering', () => {
  it('shows options when trigger is clicked', async () => {
    const { container } = renderCombobox()
    const trigger = container.querySelector('.agds-combobox-multi__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).toBeTruthy()
    })
  })

  it('excludes already-selected items from the dropdown', async () => {
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0]],
      },
    })
    const trigger = container.querySelector('.agds-combobox-multi__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy())

    expect(screen.queryByRole('option', { name: 'Australia' })).toBeNull()
    expect(screen.queryByRole('option', { name: 'Austria' })).toBeTruthy()
  })

  it('shows emptyResultsMessage when no options match', async () => {
    renderCombobox({ emptyResultsMessage: 'No countries found' })
    const { container } = renderCombobox()
    const trigger = container.querySelector('.agds-combobox-multi__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy())

    const input = screen.getAllByRole('combobox')[1]
    await fireEvent.input(input, { target: { value: 'zzz' } })
    await waitFor(() => {
      expect(screen.queryByText('No options found')).toBeTruthy()
    })
  })
})

// ─── Selection ────────────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — selecting options', () => {
  it('emits update:modelValue with the new selection', async () => {
    const onUpdate = vi.fn()
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [],
        'onUpdate:modelValue': onUpdate,
      },
    })
    const trigger = container.querySelector('.agds-combobox-multi__trigger') as HTMLElement
    const user = userEvent.setup()
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy())

    const option = screen.getByRole('option', { name: 'Australia' })
    await fireEvent.click(option)
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith([OPTIONS[0]])
    })
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — disabled state', () => {
  it('disables the input when disabled=true', () => {
    renderCombobox({ disabled: true })
    expect((screen.getByRole('combobox') as HTMLInputElement).disabled).toBe(true)
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSComboboxMulti — events', () => {
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

// ─── Status message (aria-live) ────────────────────────────────────────────

describe('AGDSComboboxMulti — status messages', () => {
  it('announces item addition to screen readers', async () => {
    const { container, rerender } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [],
      },
    })

    await rerender({ modelValue: [OPTIONS[0]] })

    await waitFor(() => {
      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion?.textContent?.trim()).toContain('Australia')
    })
  })

  it('announces item removal to screen readers', async () => {
    const { container, rerender } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0]],
      },
    })

    await rerender({ modelValue: [] })

    await waitFor(() => {
      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion?.textContent?.trim()).toContain('removed')
    })
  })

  it('announces "All items have been removed" when cleared from non-empty', async () => {
    // Start empty, add items (fires watch, sets prevLen > 0), then clear all.
    // The "all items removed" branch requires prevLen > 0 from a prior watch call.
    const { container, rerender } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [],
      },
    })

    // Add items — watch fires, prevLen becomes 2
    await rerender({ modelValue: [OPTIONS[0], OPTIONS[1]] })
    await waitFor(() => {
      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion?.textContent?.trim()).toContain('has been added')
    })

    // Remove all — now prevLen > 0 so "All items have been removed" fires
    await rerender({ modelValue: [] })

    await waitFor(() => {
      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion?.textContent?.trim()).toContain('All items have been removed')
    })
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSComboboxMulti — axe accessibility', () => {
  it('has no violations in the default (closed) state', async () => {
    const { container } = renderCombobox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled=true', async () => {
    const { container } = renderCombobox({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with selected items', async () => {
    const { container } = render(AGDSComboboxMulti, {
      props: {
        label: 'Countries',
        options: OPTIONS,
        modelValue: [OPTIONS[0], OPTIONS[1]],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when input has no label', async () => {
    const { container } = render({ template: '<input type="text" />' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
