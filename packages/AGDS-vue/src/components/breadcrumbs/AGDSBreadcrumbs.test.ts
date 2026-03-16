import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSBreadcrumbs from './AGDSBreadcrumbs.vue'
import type { BreadcrumbLink } from './AGDSBreadcrumbs.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const TWO_LINKS: BreadcrumbLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
]

const MANY_LINKS: BreadcrumbLink[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/services/health', label: 'Health' },
  { href: '/services/health/medicare', label: 'Medicare' },
]

function renderBreadcrumbs(links: BreadcrumbLink[], props: Record<string, unknown> = {}) {
  return render(AgDSBreadcrumbs, { props: { links, ...props } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSBreadcrumbs — rendering', () => {
  it('renders a <nav> landmark', () => {
    const { getByRole } = renderBreadcrumbs(TWO_LINKS)
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('defaults aria-label to "Breadcrumbs"', () => {
    const { getByRole } = renderBreadcrumbs(TWO_LINKS)
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('Breadcrumbs')
  })

  it('accepts a custom aria-label', () => {
    const { getByRole } = renderBreadcrumbs(TWO_LINKS, { ariaLabel: 'You are here' })
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('You are here')
  })

  it('renders an ordered list', () => {
    const { container } = renderBreadcrumbs(TWO_LINKS)
    expect(container.querySelector('ol')).toBeTruthy()
  })

  it('renders all link labels', () => {
    const { getByText } = renderBreadcrumbs(TWO_LINKS)
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('About')).toBeTruthy()
  })

  it('renders links with correct hrefs', () => {
    const { getAllByRole } = renderBreadcrumbs(TWO_LINKS)
    const links = getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('/')
  })

  it('renders all items in DOM regardless of collapsed state (CSS controls visibility)', () => {
    const { container } = renderBreadcrumbs(MANY_LINKS)
    const links = container.querySelectorAll('a')
    // Home + Services + Health + Medicare = 4
    expect(links).toHaveLength(4)
  })
})

// ─── Current page ─────────────────────────────────────────────────────────────

describe('AgDSBreadcrumbs — current page', () => {
  it('sets aria-current="page" on the last item link', () => {
    const { getAllByRole } = renderBreadcrumbs(TWO_LINKS)
    const links = getAllByRole('link')
    expect(links[links.length - 1].getAttribute('aria-current')).toBe('page')
  })

  it('does not set aria-current on non-last items', () => {
    const { getAllByRole } = renderBreadcrumbs(TWO_LINKS)
    const links = getAllByRole('link')
    expect(links[0].getAttribute('aria-current')).toBeNull()
  })

  it('appends sr-only "(current page)" text to the last item', () => {
    const { container } = renderBreadcrumbs(TWO_LINKS)
    const srOnly = container.querySelector('.sr-only')
    expect(srOnly?.textContent).toContain('current page')
  })
})

// ─── Collapsed state (3+ links) ───────────────────────────────────────────────

describe('AgDSBreadcrumbs — collapsed state', () => {
  it('renders a toggle button in the DOM when there are middle links', () => {
    const { getByRole } = renderBreadcrumbs(MANY_LINKS)
    expect(getByRole('button', { name: 'Show all breadcrumbs' })).toBeTruthy()
  })

  it('toggle button has aria-expanded="false" when collapsed', () => {
    const { getByRole } = renderBreadcrumbs(MANY_LINKS)
    expect(getByRole('button', { name: 'Show all breadcrumbs' }).getAttribute('aria-expanded')).toBe('false')
  })

  it('adds agds-breadcrumbs--collapsed class when there are middle links', () => {
    const { container } = renderBreadcrumbs(MANY_LINKS)
    expect(container.querySelector('.agds-breadcrumbs--collapsed')).toBeTruthy()
  })

  it('middle item LIs have the agds-breadcrumbs__middle-item class for CSS targeting', () => {
    const { container } = renderBreadcrumbs(MANY_LINKS)
    const middleItems = container.querySelectorAll('.agds-breadcrumbs__middle-item')
    expect(middleItems).toHaveLength(2) // Services, Health
  })

  it('the toggle LI has the agds-breadcrumbs__toggle-item class for CSS targeting', () => {
    const { container } = renderBreadcrumbs(MANY_LINKS)
    expect(container.querySelector('.agds-breadcrumbs__toggle-item')).toBeTruthy()
  })

  it('does not add collapsed class when there are no middle links (2 items)', () => {
    const { container } = renderBreadcrumbs(TWO_LINKS)
    expect(container.querySelector('.agds-breadcrumbs--collapsed')).toBeNull()
  })
})

// ─── Expanded state ───────────────────────────────────────────────────────────

describe('AgDSBreadcrumbs — expanded state', () => {
  it('does not render a toggle button when there are no middle links (2 items)', () => {
    const { queryByRole } = renderBreadcrumbs(TWO_LINKS)
    expect(queryByRole('button', { name: 'Show all breadcrumbs' })).toBeNull()
  })

  it('removes the collapsed class after clicking the toggle', async () => {
    const { container, getByRole } = renderBreadcrumbs(MANY_LINKS)
    await fireEvent.click(getByRole('button', { name: 'Show all breadcrumbs' }))
    expect(container.querySelector('.agds-breadcrumbs--collapsed')).toBeNull()
  })

  it('renders all links in DOM order', () => {
    const { getAllByRole } = renderBreadcrumbs(MANY_LINKS)
    const links = getAllByRole('link')
    expect(links.map((l) => l.textContent?.trim().replace(' (current page)', ''))).toEqual([
      'Home', 'Services', 'Health', 'Medicare',
    ])
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSBreadcrumbs — axe accessibility', () => {
  it('has no violations with two links', async () => {
    const { container } = renderBreadcrumbs(TWO_LINKS)
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in collapsed state (4 links)', async () => {
    const { container } = renderBreadcrumbs(MANY_LINKS)
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in expanded state', async () => {
    const { container, getByRole } = renderBreadcrumbs(MANY_LINKS)
    await fireEvent.click(getByRole('button', { name: 'Show all breadcrumbs' }))
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a custom aria-label', async () => {
    const { container } = renderBreadcrumbs(TWO_LINKS, { ariaLabel: 'Page hierarchy' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when links have no accessible name', async () => {
    const { container } = render(AgDSBreadcrumbs, {
      props: { links: [{ href: '/', label: '' }, { href: '/about', label: '' }] },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
