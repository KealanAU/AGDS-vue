import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSFilterSidebar from './AGDSFilterSidebar.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderFilter(
  props: Partial<InstanceType<typeof AgDSFilterSidebar>['$props']> = {},
  slots: Record<string, string> = {},
) {
  return render(AgDSFilterSidebar, { props, slots })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSFilterSidebar — rendering', () => {
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

  it('does not render "Clear filters" button when showClearFilters is false', () => {
    const { queryByRole } = renderFilter({ showClearFilters: false })
    const btn = queryByRole('button', { name: /clear filters/i })
    expect(btn).toBeNull()
  })

  it('renders "Clear filters" button when showClearFilters is true', () => {
    const { getByRole } = renderFilter({ showClearFilters: true })
    expect(getByRole('button', { name: /clear filters/i })).toBeTruthy()
  })

  it('"Clear filters" button has type="button"', () => {
    const { getByRole } = renderFilter({ showClearFilters: true })
    expect(getByRole('button', { name: /clear filters/i }).getAttribute('type')).toBe('button')
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AgDSFilterSidebar — events', () => {
  it('emits clearFilters when "Clear filters" button is clicked', async () => {
    const onClearFilters = vi.fn()
    const { getByRole } = render(AgDSFilterSidebar, {
      props: { showClearFilters: true },
      attrs: { onClearFilters },
    })
    await fireEvent.click(getByRole('button', { name: /clear filters/i }))
    expect(onClearFilters).toHaveBeenCalledOnce()
  })
})

// ─── Background ───────────────────────────────────────────────────────────────

describe('AgDSFilterSidebar — background', () => {
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

describe('AgDSFilterSidebar — toggle', () => {
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

describe('AgDSFilterSidebar — axe accessibility', () => {
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

  it('has no violations with showClearFilters', async () => {
    const { container } = renderFilter({ showClearFilters: true })
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
