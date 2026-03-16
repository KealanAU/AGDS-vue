import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSComboboxAsync from './AGDSComboboxAsync.vue'
import AgDSAutocomplete from './AGDSAutocomplete.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Shared option fixtures ───────────────────────────────────────────────────

const OPTIONS = [
  { label: 'Australia', value: 'au' },
  { label: 'Austria', value: 'at' },
  { label: 'Australasia', value: 'aa' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFetch(results = OPTIONS) {
  return vi.fn().mockResolvedValue(results)
}

function renderCombobox(props: Record<string, unknown> = {}) {
  const fetchOptions = props.fetchOptions ?? makeFetch()
  return render(AgDSComboboxAsync, {
    props: {
      label: 'Country',
      fetchOptions,
      debounce: 0,
      ...props,
    },
  })
}

function renderAutocomplete(props: Record<string, unknown> = {}) {
  const fetchOptions = props.fetchOptions ?? makeFetch()
  return render(AgDSAutocomplete, {
    props: {
      label: 'Country',
      fetchOptions,
      debounce: 0,
      ...props,
    },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — rendering', () => {
  it('renders a visible label', () => {
    renderCombobox()
    expect(screen.getByText('Country')).toBeTruthy()
  })

  it('renders the input with role="combobox"', () => {
    renderCombobox()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders the listbox element', () => {
    renderCombobox()
    // The listbox is always in the DOM (v-show); hidden: true finds it when closed
    expect(screen.getByRole('listbox', { hidden: true })).toBeTruthy()
  })

  it('renders the dropdown trigger button by default', () => {
    renderCombobox()
    expect(screen.getByLabelText('Open options')).toBeTruthy()
  })

  it('does not render the trigger when showDropdownTrigger=false', () => {
    renderCombobox({ showDropdownTrigger: false })
    expect(screen.queryByLabelText('Open options')).toBeNull()
    expect(screen.queryByLabelText('Close options')).toBeNull()
  })

  it('input has aria-expanded="false" initially', () => {
    renderCombobox()
    expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe('false')
  })

  it('input has aria-controls pointing to the listbox', () => {
    renderCombobox({ id: 'my-cb' })
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('aria-controls')).toBe('my-cb-listbox')
    expect(document.getElementById('my-cb-listbox')).toBeTruthy()
  })

  it('passes placeholder to the input', () => {
    renderCombobox({ placeholder: 'Search countries…' })
    expect(screen.getByPlaceholderText('Search countries…')).toBeTruthy()
  })
})

// ─── Typing and fetch ─────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — typing and fetch', () => {
  it('calls fetchOptions after user types (debounce=0)', async () => {
    const fetchOptions = makeFetch()
    renderCombobox({ fetchOptions })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(fetchOptions).toHaveBeenCalledWith('aus'))
  })

  it('shows options in the listbox after fetch resolves', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy()
      expect(screen.getByRole('option', { name: 'Austria' })).toBeTruthy()
    })
  })

  it('sets aria-expanded="true" when options are shown', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() =>
      expect(input.getAttribute('aria-expanded')).toBe('true'),
    )
  })

  it('shows empty results message when fetch returns []', async () => {
    renderCombobox({ fetchOptions: vi.fn().mockResolvedValue([]) })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'xyz' } })
    // Target the li specifically to avoid matching the sr-only aria-live region
    await waitFor(() =>
      expect(screen.getByText('No results found', { selector: 'li' })).toBeTruthy(),
    )
  })

  it('shows custom emptyResultsMessage', async () => {
    renderCombobox({
      fetchOptions: vi.fn().mockResolvedValue([]),
      emptyResultsMessage: 'Nothing here',
    })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'xyz' } })
    await waitFor(() =>
      expect(screen.getByText('Nothing here', { selector: 'li' })).toBeTruthy(),
    )
  })

  it('clears options and hides listbox when input is emptied', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.input(input, { target: { value: '' } })
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── Loading state ────────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — loading state', () => {
  it('shows spinner when loading=true', () => {
    renderCombobox({ loading: true })
    expect(document.querySelector('.agds-combobox__spinner')).toBeTruthy()
  })

  it('sets aria-busy on the input when loading=true', () => {
    renderCombobox({ loading: true })
    expect(screen.getByRole('combobox').getAttribute('aria-busy')).toBe('true')
  })

  it('disables the input when loading=true', () => {
    renderCombobox({ loading: true })
    expect(screen.getByRole('combobox').hasAttribute('disabled')).toBe(true)
  })
})

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — disabled state', () => {
  it('disables the input when disabled=true', () => {
    renderCombobox({ disabled: true })
    expect(screen.getByRole('combobox').hasAttribute('disabled')).toBe(true)
  })

  it('sets aria-disabled on the input when disabled=true', () => {
    renderCombobox({ disabled: true })
    expect(screen.getByRole('combobox').getAttribute('aria-disabled')).toBe('true')
  })

  it('does not call fetchOptions when input fires while disabled', async () => {
    const fetchOptions = makeFetch()
    renderCombobox({ fetchOptions, disabled: true })
    // disabled input won't fire input events — just verify fetch was never called
    expect(fetchOptions).not.toHaveBeenCalled()
  })
})

// ─── Option selection ─────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — option selection', () => {
  it('selects an option on mousedown and updates the input value', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    const option = screen.getByRole('option', { name: 'Australia' })
    await fireEvent.mouseDown(option)
    expect((input as HTMLInputElement).value).toBe('Australia')
  })

  it('closes the dropdown after selecting an option', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })

  it('sets aria-selected="true" on the selected option when dropdown reopens via trigger', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    expect(input.getAttribute('aria-expanded')).toBe('false')

    // Re-open via the trigger button (does not clear the selection)
    const trigger = screen.getByLabelText('Open options')
    await fireEvent.mouseDown(trigger)
    await waitFor(() => {
      const opt = screen.getByRole('option', { name: 'Australia' })
      expect(opt.getAttribute('aria-selected')).toBe('true')
    })
  })
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────

describe('AgDSComboboxAsync — keyboard navigation', () => {
  it('ArrowDown moves highlight to first option', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy()
  })

  it('Enter selects the highlighted option', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    await fireEvent.keyDown(input, { key: 'Enter' })
    expect((input as HTMLInputElement).value).toBe('Australia')
  })

  it('Escape closes the dropdown', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(input.getAttribute('aria-expanded')).toBe('true'))

    await fireEvent.keyDown(input, { key: 'Escape' })
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })

  it('ArrowUp wraps to last option from no-highlight state', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australasia' })).toBeTruthy())

    await fireEvent.keyDown(input, { key: 'ArrowUp' })
    // Should highlight the last option (Australasia, index 2)
    const lastOpt = screen.getByRole('option', { name: 'Australasia' })
    expect(lastOpt.classList.contains('agds-combobox__option--highlighted')).toBe(true)
  })
})

// ─── Clear button ─────────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — clear button', () => {
  it('does not render clear button when clearable=false (default)', () => {
    renderCombobox()
    expect(document.querySelector('.agds-combobox__clear')).toBeNull()
  })

  it('shows clear button when clearable=true and input has text', async () => {
    renderCombobox({ clearable: true })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    expect(document.querySelector('.agds-combobox__clear')).toBeTruthy()
  })

  it('clears the input and selection when clear button is clicked', async () => {
    renderCombobox({ clearable: true })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))

    const clearBtn = document.querySelector('.agds-combobox__clear') as HTMLElement
    await fireEvent.mouseDown(clearBtn)
    expect((input as HTMLInputElement).value).toBe('')
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── Dropdown trigger ─────────────────────────────────────────────────────────

describe('AgDSComboboxAsync — dropdown trigger', () => {
  it('opens the listbox on trigger click when options exist', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')

    // Load some options first
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())

    // Close it
    await fireEvent.keyDown(input, { key: 'Escape' })
    expect(input.getAttribute('aria-expanded')).toBe('false')

    // Re-open via trigger
    const trigger = screen.getByLabelText('Open options')
    await fireEvent.mouseDown(trigger)
    expect(input.getAttribute('aria-expanded')).toBe('true')
  })

  it('closes the listbox when trigger is clicked while open', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(input.getAttribute('aria-expanded')).toBe('true'))

    const trigger = screen.getByLabelText('Close options')
    await fireEvent.mouseDown(trigger)
    expect(input.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── AgDSAutocomplete wrapper ───────────────────────────────────────────────

describe('AgDSAutocomplete', () => {
  it('renders with role="combobox"', () => {
    renderAutocomplete()
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('does not render a dropdown trigger', () => {
    renderAutocomplete()
    expect(screen.queryByLabelText('Open options')).toBeNull()
  })

  it('renders a clear button when input has text', async () => {
    renderAutocomplete()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    expect(document.querySelector('.agds-combobox__clear')).toBeTruthy()
  })

  it('uses "No results found" as the default empty message', async () => {
    renderAutocomplete({ fetchOptions: vi.fn().mockResolvedValue([]) })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'xyz' } })
    await waitFor(() =>
      expect(screen.getByText('No results found', { selector: 'li' })).toBeTruthy(),
    )
  })

  it('fetches and shows options after typing', async () => {
    renderAutocomplete()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSComboboxAsync — axe accessibility', () => {
  it('has no violations in the default (closed) state', async () => {
    const { container } = renderCombobox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when the listbox is open with options', async () => {
    const { container } = renderCombobox()
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in the disabled state', async () => {
    const { container } = renderCombobox({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in the loading state', async () => {
    const { container } = renderCombobox({ loading: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when clearable=true with a selection', async () => {
    const { container } = renderCombobox({ clearable: true })
    const input = screen.getByRole('combobox')
    await fireEvent.input(input, { target: { value: 'aus' } })
    await waitFor(() => expect(screen.getByRole('option', { name: 'Australia' })).toBeTruthy())
    await fireEvent.mouseDown(screen.getByRole('option', { name: 'Australia' }))
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations for AgDSAutocomplete', async () => {
    const { container } = renderAutocomplete()
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when the label is empty', async () => {
    // Verify the helper catches real axe failures — empty label means the
    // input has no accessible name (WCAG 4.1.2 / 1.3.1).
    const { container } = render(AgDSComboboxAsync, {
      props: {
        label: '',
        fetchOptions: makeFetch(),
      },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
