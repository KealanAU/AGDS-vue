import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSubNav from './AGDSSubNav.vue'
import type { SubNavLink } from './AGDSSubNav.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const LINKS: SubNavLink[] = [
  { href: '/overview', label: 'Overview' },
  { href: '/details', label: 'Details' },
  { href: '/history', label: 'History' },
]

function renderNav(props: Partial<InstanceType<typeof AGDSSubNav>['$props']> & { links: SubNavLink[] }) {
  return render(AGDSSubNav, { props })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSSubNav — rendering', () => {
  it('renders a <nav> landmark', () => {
    const { getByRole } = renderNav({ links: LINKS })
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('uses ariaLabel as the accessible name (defaults to "Content")', () => {
    const { getByRole } = renderNav({ links: LINKS })
    expect(getByRole('navigation', { name: 'Content' })).toBeTruthy()
  })

  it('accepts a custom ariaLabel', () => {
    const { getByRole } = renderNav({ links: LINKS, ariaLabel: 'Section navigation' })
    expect(getByRole('navigation', { name: 'Section navigation' })).toBeTruthy()
  })

  it('renders all link labels', () => {
    const { getByText } = renderNav({ links: LINKS })
    expect(getByText('Overview')).toBeTruthy()
    expect(getByText('Details')).toBeTruthy()
    expect(getByText('History')).toBeTruthy()
  })

  it('renders correct hrefs', () => {
    const { getAllByRole } = renderNav({ links: LINKS })
    const hrefs = getAllByRole('link').map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/overview')
    expect(hrefs).toContain('/details')
    expect(hrefs).toContain('/history')
  })

  it('places the id on the <nav> element', () => {
    const { container } = renderNav({ links: LINKS, id: 'my-nav' })
    expect(container.querySelector('nav#my-nav')).toBeTruthy()
  })

  it('renders endElement text when provided', () => {
    const links: SubNavLink[] = [{ href: '/updates', label: 'Updates', endElement: 'New' }]
    const { getByText } = renderNav({ links })
    expect(getByText('New')).toBeTruthy()
  })
})

// ─── Active path ──────────────────────────────────────────────────────────────

describe('AGDSSubNav — active path', () => {
  it('sets aria-current="page" on the matching link', () => {
    const { getAllByRole } = renderNav({ links: LINKS, activePath: '/details' })
    const links = getAllByRole('link')
    const detailsLink = links.find((l) => l.getAttribute('href') === '/details')
    expect(detailsLink?.getAttribute('aria-current')).toBe('page')
  })

  it('does not set aria-current on non-active links', () => {
    const { getAllByRole } = renderNav({ links: LINKS, activePath: '/details' })
    const links = getAllByRole('link')
    const overviewLink = links.find((l) => l.getAttribute('href') === '/overview')
    expect(overviewLink?.getAttribute('aria-current')).toBeNull()
  })

  it('applies active class to matching item', () => {
    const { container } = renderNav({ links: LINKS, activePath: '/overview' })
    const activeItem = container.querySelector('.agds-sub-nav__item--active')
    expect(activeItem).toBeTruthy()
    expect(activeItem?.querySelector('a')?.getAttribute('href')).toBe('/overview')
  })

  it('applies active class to matching link', () => {
    const { container } = renderNav({ links: LINKS, activePath: '/overview' })
    expect(container.querySelector('.agds-sub-nav__link--active')).toBeTruthy()
  })

  it('uses prefix matching when no exact match', () => {
    const { getAllByRole } = renderNav({ links: LINKS, activePath: '/details/section' })
    const links = getAllByRole('link')
    const detailsLink = links.find((l) => l.getAttribute('href') === '/details')
    expect(detailsLink?.getAttribute('aria-current')).toBe('page')
  })

  it('sets no active link when activePath has no match', () => {
    const { container } = renderNav({ links: LINKS, activePath: '/nowhere' })
    expect(container.querySelector('.agds-sub-nav__item--active')).toBeNull()
  })

  it('sets no active link when activePath is undefined', () => {
    const { container } = renderNav({ links: LINKS })
    expect(container.querySelector('.agds-sub-nav__item--active')).toBeNull()
  })
})

// ─── Background ───────────────────────────────────────────────────────────────

describe('AGDSSubNav — background', () => {
  it('applies body background class by default', () => {
    const { container } = renderNav({ links: LINKS })
    expect(container.querySelector('.agds-sub-nav--bg-body')).toBeTruthy()
  })

  it('applies bodyAlt background class when background="bodyAlt"', () => {
    const { container } = renderNav({ links: LINKS, background: 'bodyAlt' })
    expect(container.querySelector('.agds-sub-nav--bg-bodyAlt')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSubNav — axe accessibility', () => {
  it('has no violations with no active path', async () => {
    const { container } = renderNav({ links: LINKS })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with an active link', async () => {
    const { container } = renderNav({ links: LINKS, activePath: '/details' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with bodyAlt background', async () => {
    const { container } = renderNav({ links: LINKS, activePath: '/overview', background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with custom ariaLabel', async () => {
    const { container } = renderNav({ links: LINKS, ariaLabel: 'Section navigation' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with endElement content', async () => {
    const links: SubNavLink[] = [
      { href: '/overview', label: 'Overview' },
      { href: '/updates', label: 'Updates', endElement: 'New' },
    ]
    const { container } = renderNav({ links, activePath: '/overview' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when a link has an empty label', async () => {
    const badLinks: SubNavLink[] = [{ href: '/empty', label: '' }]
    const { container } = renderNav({ links: badLinks })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
