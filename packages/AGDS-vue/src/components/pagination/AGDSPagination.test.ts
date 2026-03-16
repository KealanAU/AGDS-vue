import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSPagination from './AGDSPagination.vue'
import AgDSPaginationButtons from './AGDSPaginationButtons.vue'
import { usePagination } from './usePagination'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── usePagination ────────────────────────────────────────────────────────────

describe('usePagination', () => {
  it('returns only page items when on a single page (totalPages = 1)', () => {
    const items = usePagination({ currentPage: 1, totalPages: 1, windowLimit: 3 })
    const pageItems = items.filter((i) => i.type === 'page')
    expect(pageItems).toHaveLength(1)
    expect(items.some((i) => i.type === 'direction')).toBe(false)
  })

  it('shows no separator when totalPages <= windowLimit', () => {
    const items = usePagination({ currentPage: 2, totalPages: 3, windowLimit: 3 })
    expect(items.some((i) => i.type === 'separator')).toBe(false)
  })

  it('returns a "right" direction item when not on last page', () => {
    const items = usePagination({ currentPage: 1, totalPages: 5, windowLimit: 3 })
    expect(items.some((i) => i.type === 'direction' && i.direction === 'right')).toBe(true)
  })

  it('returns a "left" direction item when not on first page', () => {
    const items = usePagination({ currentPage: 3, totalPages: 5, windowLimit: 3 })
    expect(items.some((i) => i.type === 'direction' && i.direction === 'left')).toBe(true)
  })

  it('does not return a "left" direction on the first page', () => {
    const items = usePagination({ currentPage: 1, totalPages: 5, windowLimit: 3 })
    expect(items.some((i) => i.type === 'direction' && i.direction === 'left')).toBe(false)
  })

  it('does not return a "right" direction on the last page', () => {
    const items = usePagination({ currentPage: 5, totalPages: 5, windowLimit: 3 })
    expect(items.some((i) => i.type === 'direction' && i.direction === 'right')).toBe(false)
  })

  it('marks the active page correctly', () => {
    const items = usePagination({ currentPage: 3, totalPages: 5, windowLimit: 5 })
    const active = items.filter((i) => i.type === 'page' && i.isActive)
    expect(active).toHaveLength(1)
    expect(active[0].pageNumber).toBe(3)
  })

  it('inserts separators for large page ranges', () => {
    const items = usePagination({ currentPage: 5, totalPages: 10, windowLimit: 3 })
    expect(items.filter((i) => i.type === 'separator').length).toBeGreaterThan(0)
  })

  it('always includes page 1 when range starts past page 1', () => {
    const items = usePagination({ currentPage: 8, totalPages: 10, windowLimit: 3 })
    expect(items.some((i) => i.type === 'page' && i.pageNumber === 1)).toBe(true)
  })

  it('always includes last page when range ends before it', () => {
    const items = usePagination({ currentPage: 3, totalPages: 10, windowLimit: 3 })
    expect(items.some((i) => i.type === 'page' && i.pageNumber === 10)).toBe(true)
  })
})

// ─── AgDSPagination helpers ─────────────────────────────────────────────────

const generateHref = (page: number) => `/items?page=${page}`

function renderPagination(props: Record<string, unknown> = {}) {
  return render(AgDSPagination, {
    props: {
      currentPage: 3,
      totalPages: 10,
      generateHref,
      ...props,
    },
  })
}

// ─── AgDSPagination — rendering ────────────────────────────────────────────

describe('AgDSPagination — rendering', () => {
  it('renders a <nav> element', () => {
    const { getByRole } = renderPagination()
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('nav defaults to aria-label="Pagination"', () => {
    const { getByRole } = renderPagination()
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('Pagination')
  })

  it('uses a custom ariaLabel when provided', () => {
    const { getByRole } = renderPagination({ ariaLabel: 'Search results pages' })
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('Search results pages')
  })

  it('renders page links with correct href', () => {
    const { getAllByRole } = renderPagination({ currentPage: 1, totalPages: 3 })
    const links = getAllByRole('link')
    expect(links.some((l) => l.getAttribute('href') === '/items?page=2')).toBe(true)
  })

  it('marks the active page with aria-current="page"', () => {
    const { getAllByRole } = renderPagination({ currentPage: 3, totalPages: 5 })
    const currentLinks = getAllByRole('link').filter(
      (l) => l.getAttribute('aria-current') === 'page',
    )
    expect(currentLinks).toHaveLength(1)
    expect(currentLinks[0].getAttribute('aria-label')).toBe('Go to page 3')
  })

  it('renders a Previous link when not on the first page', () => {
    const { getByLabelText } = renderPagination({ currentPage: 3, totalPages: 5 })
    expect(getByLabelText('Go to previous page')).toBeTruthy()
  })

  it('renders a Next link when not on the last page', () => {
    const { getByLabelText } = renderPagination({ currentPage: 3, totalPages: 5 })
    expect(getByLabelText('Go to next page')).toBeTruthy()
  })

  it('does not render a Previous link on page 1', () => {
    const { queryByLabelText } = renderPagination({ currentPage: 1, totalPages: 5 })
    expect(queryByLabelText('Go to previous page')).toBeNull()
  })

  it('does not render a Next link on the last page', () => {
    const { queryByLabelText } = renderPagination({ currentPage: 5, totalPages: 5 })
    expect(queryByLabelText('Go to next page')).toBeNull()
  })

  it('Previous href points at currentPage - 1', () => {
    const { getByLabelText } = renderPagination({ currentPage: 4, totalPages: 10 })
    expect(getByLabelText('Go to previous page').getAttribute('href')).toBe('/items?page=3')
  })

  it('Next href points at currentPage + 1', () => {
    const { getByLabelText } = renderPagination({ currentPage: 4, totalPages: 10 })
    expect(getByLabelText('Go to next page').getAttribute('href')).toBe('/items?page=5')
  })
})

// ─── AgDSPagination — secondary controls ───────────────────────────────────

describe('AgDSPagination — secondary controls', () => {
  it('does not render the secondary area by default', () => {
    const { queryByRole } = renderPagination()
    expect(queryByRole('status')).toBeNull()
  })

  it('renders item range text with role="status" when provided', () => {
    const { getByRole } = renderPagination({ itemRangeText: '1 – 10 of 100 items' })
    expect(getByRole('status').textContent?.trim()).toBe('1 – 10 of 100 items')
  })

  it('renders items-per-page select when itemsPerPage is provided', () => {
    const { getByLabelText } = renderPagination({ itemsPerPage: 10 })
    expect(getByLabelText('Items per page')).toBeTruthy()
  })

  it('select value matches itemsPerPage prop', () => {
    const { getByLabelText } = renderPagination({ itemsPerPage: 20 })
    expect((getByLabelText('Items per page') as HTMLSelectElement).value).toBe('20')
  })

  it('select renders default options [10, 20, 50, 100]', () => {
    const { getByLabelText } = renderPagination({ itemsPerPage: 10 })
    const select = getByLabelText('Items per page') as HTMLSelectElement
    const values = Array.from(select.options).map((o) => Number(o.value))
    expect(values).toEqual([10, 20, 50, 100])
  })

  it('select renders custom itemsPerPageOptions', () => {
    const { getByLabelText } = renderPagination({
      itemsPerPage: 5,
      itemsPerPageOptions: [5, 25, 50],
    })
    const select = getByLabelText('Items per page') as HTMLSelectElement
    const values = Array.from(select.options).map((o) => Number(o.value))
    expect(values).toEqual([5, 25, 50])
  })

  it('emits itemsPerPageChange with numeric value when select changes', async () => {
    const { getByLabelText, emitted } = renderPagination({ itemsPerPage: 10 })
    const select = getByLabelText('Items per page') as HTMLSelectElement
    await fireEvent.change(select, { target: { value: '50' } })
    expect(emitted().itemsPerPageChange?.[0]?.[0]).toBe(50)
  })
})

// ─── AgDSPagination — axe ───────────────────────────────────────────────────

describe('AgDSPagination — axe accessibility', () => {
  it('has no violations on page 1 of 5', async () => {
    const { container } = renderPagination({ currentPage: 1, totalPages: 5 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations on a middle page', async () => {
    const { container } = renderPagination({ currentPage: 5, totalPages: 10 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations on the last page', async () => {
    const { container } = renderPagination({ currentPage: 10, totalPages: 10 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with secondary controls', async () => {
    const { container } = renderPagination({
      currentPage: 3,
      totalPages: 10,
      itemRangeText: '21 – 30 of 100 items',
      itemsPerPage: 10,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a violation when a link has no accessible name', async () => {
    // Render a plain anchor with no text — axe must flag link-name rule
    const div = document.createElement('div')
    div.innerHTML = '<a href="/foo"></a>'
    document.body.appendChild(div)
    await expect(runAxe(div, AXE_OPTS)).rejects.toThrow('axe-core found')
    div.remove()
  })
})

// ─── AgDSPaginationButtons helpers ─────────────────────────────────────────

function renderPaginationButtons(props: Record<string, unknown> = {}) {
  return render(AgDSPaginationButtons, {
    props: {
      currentPage: 3,
      totalPages: 10,
      ...props,
    },
  })
}

// ─── AgDSPaginationButtons — rendering ─────────────────────────────────────

describe('AgDSPaginationButtons — rendering', () => {
  it('renders a <nav> element', () => {
    const { getByRole } = renderPaginationButtons()
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('renders page buttons (not links)', () => {
    const { getAllByRole, queryAllByRole } = renderPaginationButtons({ currentPage: 1, totalPages: 3 })
    const buttons = getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(queryAllByRole('link')).toHaveLength(0)
  })

  it('marks the active page with aria-current="page"', () => {
    const { getAllByRole } = renderPaginationButtons({ currentPage: 2, totalPages: 5 })
    const current = getAllByRole('button').filter(
      (b) => b.getAttribute('aria-current') === 'page',
    )
    expect(current).toHaveLength(1)
    expect(current[0].getAttribute('aria-label')).toBe('Go to page 2')
  })

  it('renders a Previous button when not on the first page', () => {
    const { getByLabelText } = renderPaginationButtons({ currentPage: 2, totalPages: 5 })
    expect(getByLabelText('Go to previous page')).toBeTruthy()
  })

  it('does not render a Previous button on page 1', () => {
    const { queryByLabelText } = renderPaginationButtons({ currentPage: 1, totalPages: 5 })
    expect(queryByLabelText('Go to previous page')).toBeNull()
  })
})

// ─── AgDSPaginationButtons — events ────────────────────────────────────────

describe('AgDSPaginationButtons — events', () => {
  it('emits change with the correct page number when a page button is clicked', async () => {
    const { getAllByRole, emitted } = renderPaginationButtons({
      currentPage: 1,
      totalPages: 5,
    })
    const buttons = getAllByRole('button')
    const page2 = buttons.find((b) => b.getAttribute('aria-label') === 'Go to page 2')!
    await fireEvent.click(page2)
    expect(emitted().change?.[0]?.[0]).toBe(2)
  })

  it('emits change with currentPage - 1 when Previous is clicked', async () => {
    const { getByLabelText, emitted } = renderPaginationButtons({
      currentPage: 3,
      totalPages: 5,
    })
    await fireEvent.click(getByLabelText('Go to previous page'))
    expect(emitted().change?.[0]?.[0]).toBe(2)
  })

  it('emits change with currentPage + 1 when Next is clicked', async () => {
    const { getByLabelText, emitted } = renderPaginationButtons({
      currentPage: 3,
      totalPages: 5,
    })
    await fireEvent.click(getByLabelText('Go to next page'))
    expect(emitted().change?.[0]?.[0]).toBe(4)
  })

  it('emits itemsPerPageChange when the per-page select changes', async () => {
    const { getByLabelText, emitted } = renderPaginationButtons({ itemsPerPage: 10 })
    const select = getByLabelText('Items per page') as HTMLSelectElement
    await fireEvent.change(select, { target: { value: '50' } })
    expect(emitted().itemsPerPageChange?.[0]?.[0]).toBe(50)
  })
})

// ─── AgDSPaginationButtons — axe ───────────────────────────────────────────

describe('AgDSPaginationButtons — axe accessibility', () => {
  it('has no violations on page 1 of 5', async () => {
    const { container } = renderPaginationButtons({ currentPage: 1, totalPages: 5 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations on a middle page', async () => {
    const { container } = renderPaginationButtons({ currentPage: 5, totalPages: 10 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations on the last page', async () => {
    const { container } = renderPaginationButtons({ currentPage: 10, totalPages: 10 })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with secondary controls', async () => {
    const { container } = renderPaginationButtons({
      currentPage: 3,
      totalPages: 10,
      itemRangeText: '21 – 30 of 100 items',
      itemsPerPage: 10,
    })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a violation when a button has no accessible name', async () => {
    const div = document.createElement('div')
    div.innerHTML = '<button type="button"></button>'
    document.body.appendChild(div)
    await expect(runAxe(div, AXE_OPTS)).rejects.toThrow('axe-core found')
    div.remove()
  })
})
