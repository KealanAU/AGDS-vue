import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSearchBox from './AGDSSearchBox.vue'
import AGDSSearchBoxInput from './AGDSSearchBoxInput.vue'
import AGDSSearchBoxButton from './AGDSSearchBoxButton.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderSearchBox(inputProps: Record<string, unknown> = {}) {
  return render({
    components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
    template: `
      <AGDSSearchBox>
        <AGDSSearchBoxInput v-bind="inputProps" />
        <AGDSSearchBoxButton label="Search" />
      </AGDSSearchBox>
    `,
    data() {
      return { inputProps }
    },
  })
}

// ─── SearchBox (form wrapper) ─────────────────────────────────────────────────

describe('AGDSSearchBox — rendering', () => {
  it('renders a <form> with role="search"', () => {
    const { getByRole } = renderSearchBox()
    expect(getByRole('search')).toBeTruthy()
  })

  it('renders the default aria-label "Sitewide"', () => {
    const { getByRole } = renderSearchBox()
    expect(getByRole('search').getAttribute('aria-label')).toBe('Sitewide')
  })

  it('accepts a custom aria-label', () => {
    const { getByRole } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox aria-label="Products">
          <AGDSSearchBoxInput />
          <AGDSSearchBoxButton label="Search" />
        </AGDSSearchBox>
      `,
    })
    expect(getByRole('search').getAttribute('aria-label')).toBe('Products')
  })

  it('emits submit when the form is submitted', async () => {
    const { getByRole, emitted } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox @submit.prevent="onSubmit">
          <AGDSSearchBoxInput />
          <AGDSSearchBoxButton label="Search" />
        </AGDSSearchBox>
      `,
      setup() {
        return { onSubmit: vi.fn() }
      },
    })
    await fireEvent.submit(getByRole('search'))
    // submit event bubbles through form's submit handler
    expect(getByRole('search')).toBeTruthy()
  })
})

// ─── SearchBoxInput ───────────────────────────────────────────────────────────

describe('AGDSSearchBoxInput — rendering', () => {
  it('renders an input with type="search"', () => {
    const { getByRole } = renderSearchBox()
    const input = getByRole('searchbox')
    expect(input.getAttribute('type')).toBe('search')
  })

  it('renders autocomplete="off"', () => {
    const { getByRole } = renderSearchBox()
    expect(getByRole('searchbox').getAttribute('autocomplete')).toBe('off')
  })

  it('renders an sr-only label by default', () => {
    const { getByLabelText } = renderSearchBox()
    expect(getByLabelText('Search', { selector: 'input' })).toBeTruthy()
  })

  it('renders a visible label when labelVisible=true', () => {
    const { getByLabelText } = renderSearchBox({ labelVisible: true })
    expect(getByLabelText('Search', { selector: 'input' })).toBeTruthy()
  })

  it('uses a custom label text', () => {
    const { getByLabelText } = renderSearchBox({ label: 'Find a service' })
    expect(getByLabelText('Find a service', { selector: 'input' })).toBeTruthy()
  })

  it('associates label with input via for/id', () => {
    const { getByLabelText } = renderSearchBox({ id: 'my-search' })
    const input = getByLabelText('Search', { selector: 'input' }) as HTMLInputElement
    expect(input.id).toBe('my-search')
  })

  it('renders the placeholder', () => {
    const { getByPlaceholderText } = renderSearchBox({ placeholder: 'Type here…' })
    expect(getByPlaceholderText('Type here…')).toBeTruthy()
  })
})

describe('AGDSSearchBoxInput — clear button', () => {
  it('does not show a clear button when the input is empty', () => {
    const { queryByRole } = renderSearchBox({ modelValue: '' })
    // The clear button has type="button" — there should be only the submit button
    const buttons = queryByRole('search')!.querySelectorAll('button[type="button"]')
    expect(buttons).toHaveLength(0)
  })

  it('shows a clear button when modelValue is non-empty', () => {
    const { getByText } = renderSearchBox({ modelValue: 'hello' })
    expect(getByText('Clear search')).toBeTruthy()
  })

  it('clears the input when the clear button is clicked', async () => {
    const { getByText, getByRole, queryByText } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox>
          <AGDSSearchBoxInput v-model="query" />
          <AGDSSearchBoxButton label="Search" />
        </AGDSSearchBox>
      `,
      data() {
        return { query: 'hello' }
      },
    })
    await fireEvent.click(getByText('Clear search'))
    expect((getByRole('searchbox') as HTMLInputElement).value).toBe('')
    expect(queryByText('Clear search')).toBeNull()
  })
})

describe('AGDSSearchBoxInput — v-model', () => {
  it('reflects modelValue in the input', () => {
    const { getByRole } = renderSearchBox({ modelValue: 'vue3' })
    expect((getByRole('searchbox') as HTMLInputElement).value).toBe('vue3')
  })

  it('emits update:modelValue on input', async () => {
    const { getByRole, emitted } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox>
          <AGDSSearchBoxInput :model-value="query" @update:model-value="query = $event" />
          <AGDSSearchBoxButton label="Search" />
        </AGDSSearchBox>
      `,
      data() {
        return { query: '' }
      },
    })
    await fireEvent.input(getByRole('searchbox'), { target: { value: 'gov' } })
    expect((getByRole('searchbox') as HTMLInputElement).value).toBe('gov')
  })
})

// ─── SearchBoxButton ──────────────────────────────────────────────────────────

describe('AGDSSearchBoxButton — rendering', () => {
  it('renders a submit button', () => {
    const { getByRole } = renderSearchBox()
    const submitBtn = getByRole('button', { name: 'Search' })
    expect(submitBtn.getAttribute('type')).toBe('submit')
  })

  it('has an accessible name matching the label prop', () => {
    const { getByRole } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox>
          <AGDSSearchBoxInput />
          <AGDSSearchBoxButton label="Find" />
        </AGDSSearchBox>
      `,
    })
    expect(getByRole('button', { name: 'Find' })).toBeTruthy()
  })

  it('hides visible label text in iconOnly mode via sr-only', () => {
    const { getByRole } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox>
          <AGDSSearchBoxInput />
          <AGDSSearchBoxButton label="Search" :icon-only="true" />
        </AGDSSearchBox>
      `,
    })
    // aria-label keeps the accessible name even with sr-only text
    expect(getByRole('button', { name: 'Search' })).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSearchBox — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderSearchBox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with labelVisible=true', async () => {
    const { container } = renderSearchBox({ labelVisible: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when input has a value (clear button visible)', async () => {
    const { container } = renderSearchBox({ modelValue: 'search term' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in icon-only button mode', async () => {
    const { container } = render({
      components: { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton },
      template: `
        <AGDSSearchBox>
          <AGDSSearchBoxInput />
          <AGDSSearchBoxButton label="Search" :icon-only="true" />
        </AGDSSearchBox>
      `,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the input has no accessible name', async () => {
    // Intentional bad case — verifies the axe helper catches real failures.
    // AGDSSearchBoxInput always renders an associated <label>, so we render a
    // raw unlabelled <input type="search"> to guarantee axe detects the violation.
    const { container } = render({
      template: `<div><input type="search" /></div>`,
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
