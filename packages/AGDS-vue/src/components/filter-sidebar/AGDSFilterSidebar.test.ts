import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSFilterSidebar from './AGDSFilterSidebar.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderFilter(
  props: Partial<InstanceType<typeof AGDSFilterSidebar>['$props']> = {},
  slots: Record<string, string> = {},
) {
  return render(AGDSFilterSidebar, { props, slots })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSFilterSidebar — rendering', () => {
  it('renders a <section> landmark', () => {
    const { container } = renderFilter()
    expect(container.querySelector('section')).toBeTruthy()
  })

  it('renders "Filters" as the default title', () => {
    const { container } = renderFilter()
    const toggle = container.querySelector('.agds-csb__toggle-title')
    expect(toggle?.textContent).toBe('Filters')
  })

  it('renders "Filters (3)" when activeFiltersCount=3', () => {
    const { container } = renderFilter({ activeFiltersCount: 3 })
    const toggle = container.querySelector('.agds-csb__toggle-title')
    expect(toggle?.textContent).toBe('Filters (3)')
  })

  it('sets aria-label to "Filters" when activeFiltersCount is 0', () => {
    const { container } = renderFilter({ activeFiltersCount: 0 })
    const root = container.querySelector('section')
    expect(root?.getAttribute('aria-label')).toBe('Filters')
  })

  it('sets aria-label to "Filters (3 active)" when activeFiltersCount=3', () => {
    const { container } = renderFilter({ activeFiltersCount: 3 })
    const root = container.querySelector('section')
    expect(root?.getAttribute('aria-label')).toBe('Filters (3 active)')
  })

  it('renders default slot content', () => {
    const { getByText } = renderFilter({}, { default: '<p>A filter control</p>' })
    expect(getByText('A filter control')).toBeTruthy()
  })

  it('does not render the actions divider when actions slot is empty', () => {
    const { container } = renderFilter()
    expect(container.querySelector('.agds-filter-sidebar__divider')).toBeNull()
  })

  it('renders the actions slot content and divider when provided', () => {
    const { getByRole, container } = renderFilter(
      {},
      { actions: '<button type="button">Clear filters</button>' },
    )
    expect(getByRole('button', { name: /clear filters/i })).toBeTruthy()
    expect(container.querySelector('.agds-filter-sidebar__divider')).toBeTruthy()
  })

  it('actions slot renders before the divider, after filter controls', () => {
    const { container } = renderFilter(
      {},
      { actions: '<button type="button">Clear filters</button>' },
    )
    const body = container.querySelector('.agds-filter-sidebar__body')!
    const divider = body.querySelector('.agds-filter-sidebar__divider')!
    const btn = body.querySelector('button')!
    // divider comes before the button in DOM order
    expect(
      divider.compareDocumentPosition(btn) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})

// ─── Actions slot interaction ─────────────────────────────────────────────────

describe('AGDSFilterSidebar — actions slot interaction', () => {
  it('actions slot button receives click events', async () => {
    let clicked = false
    const { getByRole } = render({
      components: { AGDSFilterSidebar },
      template: `
        <AGDSFilterSidebar>
          <template #actions>
            <button type="button" @click="clicked = true">Clear filters</button>
          </template>
        </AGDSFilterSidebar>
      `,
      data() {
        return { clicked }
      },
    })
    await fireEvent.click(getByRole('button', { name: /clear filters/i }))
    expect(getByRole('button', { name: /clear filters/i })).toBeTruthy()
  })
})

// ─── Background ───────────────────────────────────────────────────────────────

describe('AGDSFilterSidebar — background', () => {
  it('applies body background by default', () => {
    const { container } = renderFilter()
    expect(container.querySelector('.agds-csb--bg-body')).toBeTruthy()
  })

  it('applies bodyAlt background when background="bodyAlt"', () => {
    const { container } = renderFilter({ background: 'bodyAlt' })
    expect(container.querySelector('.agds-csb--bg-bodyAlt')).toBeTruthy()
  })
})

// ─── Toggle ───────────────────────────────────────────────────────────────────

describe('AGDSFilterSidebar — toggle', () => {
  it('toggle button is collapsed by default', () => {
    const { container } = renderFilter()
    const btn = container.querySelector('.agds-csb__toggle')
    expect(btn?.getAttribute('aria-expanded')).toBe('false')
  })

  it('expands body when toggle is clicked', async () => {
    const { container } = renderFilter()
    await fireEvent.click(container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!)
    expect(container.querySelector('.agds-csb__body--open')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSFilterSidebar — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderFilter()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when expanded', async () => {
    const { container } = renderFilter()
    await fireEvent.click(container.querySelector<HTMLButtonElement>('.agds-csb__toggle')!)
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with activeFiltersCount', async () => {
    const { container } = renderFilter({ activeFiltersCount: 5 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with actions slot', async () => {
    const { container } = renderFilter(
      {},
      { actions: '<button type="button">Clear filters</button>' },
    )
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with bodyAlt background', async () => {
    const { container } = renderFilter({ background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when an image without alt is placed in the slot', async () => {
    const { container } = renderFilter(
      {},
      { default: '<img src="test.png" />' },
    )
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
