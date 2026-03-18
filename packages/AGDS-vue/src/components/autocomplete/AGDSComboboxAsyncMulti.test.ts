import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSComboboxAsyncMulti from './AGDSComboboxAsyncMulti.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const OPTIONS = [
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Australasia', value: 'aa' },
]

function makeFetch(results = OPTIONS) {
  return vi.fn().mockResolvedValue(results)
}

function renderComponent(props: Record<string, unknown> = {}) {
  const fetchOptions = props.fetchOptions ?? makeFetch()
  return render(AGDSComboboxAsyncMulti, {
    props: {
      label: 'Countries',
      fetchOptions,
      debounce: 0,
      ...props,
    },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — rendering', () => {
  it('renders a visible label', () => {
    renderComponent()
    expect(screen.getByText('Countries')).toBeTruthy()
  })

  it('renders the input with role="combobox"', () => {
    renderComponent()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders the listbox element (hidden when closed)', () => {
    renderComponent()
    expect(screen.getByRole('listbox', { hidden: true })).toBeTruthy()
  })

  it('input has aria-expanded="false" initially', () => {
    renderComponent()
    expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe('false')
  })

  it('input has aria-controls pointing to the listbox', () => {
    renderComponent({ id: 'my-cb' })
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('aria-controls')).toBe('my-cb-listbox')
    expect(document.getElementById('my-cb-listbox')).toBeTruthy()
  })

  it('passes placeholder to the input when no items are selected', () => {
    renderComponent({ placeholder: 'Search countries…' })
    expect(screen.getByPlaceholderText('Search countries…')).toBeTruthy()
  })

  it('hides placeholder once an item is selected', async () => {
    renderComponent({ placeholder: 'Search countries…' })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    expect(input.getAttribute('placeholder')).toBeNull()
  })
})

// ─── Typing and fetch ─────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — typing and fetch', () => {
  it('calls fetchOptions after user types (debounce=0)', async () => {
    const fetchOptions = makeFetch()
    renderComponent({ fetchOptions })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(fetchOptions).toHaveBeenCalledWith('aus'))
  })

  it('shows options in the listbox after fetch resolves', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy()
      expect(screen.getByRole('option', { name: 'Austria' })).toBeTruthy()
    })
  })

  it('sets aria-expanded="true" when options are shown', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(input.getAttribute('aria-expanded')).toBe('true'))
  })

  it('shows empty results message when fetch returns []', async () => {
    renderComponent({ fetchOptions: vi.fn().mockResolvedValue([]) })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'xyz' } })
    await waitFor(() =>
      expect(screen.getByText('No results found', { selector: 'li' })).toBeTruthy(),
    )
  })

  it('hides listbox when input is emptied', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.input(input, { target: { value: '' } })
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── Selection ────────────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — selection', () => {
  it('adds an item on mousedown and clears the input', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    expect(screen.getByText('Australia')).toBeTruthy()
    expect((input as HTMLInputElement).value).toBe('')
  })

  it('adds multiple items', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')

    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Austria' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Austria' }))

    expect(screen.getByText('Australia')).toBeTruthy()
    expect(screen.getByText('Austria')).toBeTruthy()
  })

  it('excludes already-selected items from results', async () => {
    const fetchOptions = makeFetch()
    renderComponent({ fetchOptions })
    const input = screen.getByRole('combobox')

    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    // Search again — Australia should be filtered out of the results
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(fetchOptions).toHaveBeenCalledTimes(2))
    await waitFor(() => expect(screen.queryByRole('option', { name: 'Australia' })).toBeNull())
    // But the other options still appear
    expect(screen.getByRole('option', { name: 'Austria' })).toBeTruthy()
  })

  it('removes an item when its remove button is clicked', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    const removeBtn = screen.getByLabelText('Remove Australia')
    await fireEvent.mouseDown(removeBtn)
    expect(screen.queryByText('Australia', { selector: '.agds-combobox-async-multi__tag-label' })).toBeNull()
  })
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — keyboard navigation', () => {
  it('ArrowDown moves highlight to first option', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy()
  })

  it('Enter selects the highlighted option', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    await fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText('Australia')).toBeTruthy()
    expect((input as HTMLInputElement).value).toBe('')
  })

  it('Escape closes the dropdown', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(input.getAttribute('aria-expanded')).toBe('true'))

    await fireEvent.keyDown(input, { key: 'Escape' })
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })

  it('Backspace removes the last selected item when input is empty', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    // Input is now empty — Backspace should remove last tag
    await fireEvent.keyDown(input, { key: 'Backspace' })
    expect(screen.queryByText('Australia', { selector: '.agds-combobox-async-multi__tag-label' })).toBeNull()
  })

  it('Backspace does nothing when input has text', async () => {
    renderComponent()
    const input = screen.getByRole('combobox')

    // Select an item first
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    // Now type something into the input and press backspace
    await fireEvent.input(input, { target: { value: 'x' } })
    await fireEvent.keyDown(input, { key: 'Backspace' })
    // The selected tag should still be there
    expect(screen.getByText('Australia')).toBeTruthy()
  })
})

// ─── Loading state ────────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — loading state', () => {
  it('shows spinner when loading=true', () => {
    renderComponent({ loading: true })
    expect(document.querySelector('.agds-combobox-async-multi__spinner')).toBeTruthy()
  })

  it('sets aria-busy on the input when loading=true', () => {
    renderComponent({ loading: true })
    expect(screen.getByRole('combobox').getAttribute('aria-busy')).toBe('true')
  })

  it('disables the input when loading=true', () => {
    renderComponent({ loading: true })
    expect(screen.getByRole('combobox').hasAttribute('disabled')).toBe(true)
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — disabled state', () => {
  it('disables the input when disabled=true', () => {
    renderComponent({ disabled: true })
    expect(screen.getByRole('combobox').hasAttribute('disabled')).toBe(true)
  })

  it('sets aria-disabled on the input when disabled=true', () => {
    renderComponent({ disabled: true })
    expect(screen.getByRole('combobox').getAttribute('aria-disabled')).toBe('true')
  })

  it('does not call fetchOptions when disabled', () => {
    const fetchOptions = makeFetch()
    renderComponent({ fetchOptions, disabled: true })
    expect(fetchOptions).not.toHaveBeenCalled()
  })
})

// ─── Field integration ────────────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — field integration', () => {
  it('renders hint text', () => {
    renderComponent({ hint: 'Start typing to search' })
    expect(screen.getByText('Start typing to search')).toBeTruthy()
  })

  it('renders message when invalid=true', () => {
    renderComponent({ invalid: true, message: 'At least one country is required' })
    expect(screen.getByText('At least one country is required')).toBeTruthy()
  })

  it('appends "(optional)" to the label when required=false', () => {
    renderComponent({ required: false })
    expect(screen.getByText('(optional)')).toBeTruthy()
  })

  it('does not append "(optional)" when required=true', () => {
    renderComponent({ required: true })
    expect(screen.queryByText('(optional)')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSComboboxAsyncMulti — axe accessibility', () => {
  it('has no violations in the default (closed) state', async () => {
    const { container } = renderComponent()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when the listbox is open with options', async () => {
    const { container } = renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with selected items', async () => {
    const { container } = renderComponent()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in the disabled state', async () => {
    const { container } = renderComponent({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in the invalid state', async () => {
    const { container } = renderComponent({
      invalid: true,
      message: 'At least one country required',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when the input has no accessible name', async () => {
    // Render without a label prop so the input is not associated with any label.
    // AGDSField renders an empty <label> that axe still flags as a missing name.
    const { container } = render(AGDSComboboxAsyncMulti, {
      props: { label: ' ', fetchOptions: makeFetch() },
      // Override aria-label to undefined so there is genuinely no accessible name
      attrs: { 'aria-label': null },
    })
    // Verify the axe helper catches real failures by removing the label association
    const input = container.querySelector('[role="combobox"]')
    if (input) {
      input.removeAttribute('id')
      // Remove the for attribute from the label so the association is broken
      container.querySelector('label')?.removeAttribute('for')
    }
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
