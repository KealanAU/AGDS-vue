import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSideNav from './AGDSSideNav.vue'
import { findBestMatch, hasSubLevelActiveItem } from './utils'
import type { SideNavItem } from './utils'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const FLAT_ITEMS: SideNavItem[] = [
  { href: '/foo', label: 'Foo' },
  { href: '/bar', label: 'Bar' },
  { href: '/baz', label: 'Baz' },
]

const NESTED_ITEMS: SideNavItem[] = [
  {
    href: '/services',
    label: 'Services',
    items: [
      { href: '/services/health', label: 'Health' },
      { href: '/services/education', label: 'Education' },
    ],
  },
  {
    href: '/about',
    label: 'About',
    items: [
      {
        href: '/about/team',
        label: 'Team',
        items: [{ href: '/about/team/leadership', label: 'Leadership' }],
      },
    ],
  },
  { href: '/contact', label: 'Contact' },
]

function renderNav(
  props: Partial<InstanceType<typeof AGDSSideNav>['$props']> & {
    activePath: string
    items: SideNavItem[]
    title: string
  },
) {
  return render(AGDSSideNav, { props })
}

// ─── Utils ────────────────────────────────────────────────────────────────────

describe('findBestMatch', () => {
  it('returns exact match when available', () => {
    expect(findBestMatch(FLAT_ITEMS, '/foo')).toBe('/foo')
  })

  it('returns longest prefix match when no exact match', () => {
    const items: SideNavItem[] = [
      { href: '/services', label: 'Services' },
      { href: '/services/health', label: 'Health' },
    ]
    expect(findBestMatch(items, '/services/health/medicare')).toBe('/services/health')
  })

  it('returns empty string when activePath is undefined', () => {
    expect(findBestMatch(FLAT_ITEMS, undefined)).toBe('')
  })

  it('returns empty string when no match found', () => {
    expect(findBestMatch(FLAT_ITEMS, '/no-match')).toBe('')
  })
})

describe('hasSubLevelActiveItem', () => {
  it('returns true when a child href matches', () => {
    expect(hasSubLevelActiveItem(NESTED_ITEMS[0].items, '/services/health')).toBe(true)
  })

  it('returns true for deeply nested match', () => {
    expect(hasSubLevelActiveItem(NESTED_ITEMS[1].items, '/about/team/leadership')).toBe(true)
  })

  it('returns false when no item matches', () => {
    expect(hasSubLevelActiveItem(NESTED_ITEMS[0].items, '/contact')).toBe(false)
  })

  it('returns false for undefined items', () => {
    expect(hasSubLevelActiveItem(undefined, '/foo')).toBe(false)
  })
})

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSSideNav — rendering', () => {
  it('renders a <nav> landmark', () => {
    const { getByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Navigation' })
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('renders all top-level link labels', () => {
    const { getByText } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Navigation' })
    expect(getByText('Foo')).toBeTruthy()
    expect(getByText('Bar')).toBeTruthy()
    expect(getByText('Baz')).toBeTruthy()
  })

  it('renders links with correct hrefs', () => {
    const { getAllByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Navigation' })
    const links = getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/foo')
    expect(hrefs).toContain('/bar')
    expect(hrefs).toContain('/baz')
  })

  it('renders the title text in the title element', () => {
    const { container } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'My Section' })
    const titleEl = container.querySelector('.agds-side-nav__title')
    expect(titleEl?.textContent?.trim()).toBe('My Section')
  })

  it('renders title as a span (not a link) when titleLink is not provided', () => {
    const { container } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Nav' })
    const titleWrap = container.querySelector('.agds-side-nav__title-wrap')
    expect(titleWrap?.querySelector('span.agds-side-nav__title')).toBeTruthy()
    expect(titleWrap?.querySelector('a.agds-side-nav__title')).toBeNull()
  })

  it('renders title as an anchor when titleLink is provided', () => {
    const { container } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Nav',
      titleLink: '/nav',
    })
    const anchor = container.querySelector('a.agds-side-nav__title')
    expect(anchor).toBeTruthy()
    expect(anchor?.getAttribute('href')).toBe('/nav')
  })

  it('applies aria-current="page" to title link when it matches activePath', () => {
    const { container } = renderNav({
      activePath: '/nav',
      items: FLAT_ITEMS,
      title: 'Nav',
      titleLink: '/nav',
    })
    const anchor = container.querySelector('a.agds-side-nav__title')
    expect(anchor?.getAttribute('aria-current')).toBe('page')
  })

  it('does not apply aria-current to title link when activePath differs', () => {
    const { container } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Nav',
      titleLink: '/nav',
    })
    const anchor = container.querySelector('a.agds-side-nav__title')
    expect(anchor?.getAttribute('aria-current')).toBeNull()
  })
})

// ─── Active path ──────────────────────────────────────────────────────────────

describe('AGDSSideNav — active path', () => {
  it('sets aria-current="page" on the matching link', () => {
    const { getAllByRole } = renderNav({ activePath: '/bar', items: FLAT_ITEMS, title: 'Nav' })
    const links = getAllByRole('link')
    const barLink = links.find((l) => l.getAttribute('href') === '/bar')
    expect(barLink?.getAttribute('aria-current')).toBe('page')
  })

  it('does not set aria-current on non-active links', () => {
    const { getAllByRole } = renderNav({ activePath: '/bar', items: FLAT_ITEMS, title: 'Nav' })
    const links = getAllByRole('link')
    const fooLink = links.find((l) => l.getAttribute('href') === '/foo')
    expect(fooLink?.getAttribute('aria-current')).toBeNull()
  })

  it('uses prefix matching: highlights /services/health when activePath is /services/health/details', () => {
    const { getAllByRole } = renderNav({
      activePath: '/services/health/details',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'always',
    })
    const links = getAllByRole('link')
    const healthLink = links.find((l) => l.getAttribute('href') === '/services/health')
    expect(healthLink?.getAttribute('aria-current')).toBe('page')
  })
})

// ─── Sub-level visibility ─────────────────────────────────────────────────────

describe('AGDSSideNav — subLevelVisible', () => {
  it('shows sub-items of the active parent when subLevelVisible="whenActive"', () => {
    const { getByText } = renderNav({
      activePath: '/services/health',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'whenActive',
    })
    expect(getByText('Health')).toBeTruthy()
    expect(getByText('Education')).toBeTruthy()
  })

  it('hides sub-items of inactive parents when subLevelVisible="whenActive"', () => {
    const { queryByText } = renderNav({
      activePath: '/services/health',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'whenActive',
    })
    // About's sub-items should NOT be visible
    expect(queryByText('Team')).toBeNull()
  })

  it('shows all sub-items when subLevelVisible="always"', () => {
    const { getByText } = renderNav({
      activePath: '/contact',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'always',
    })
    expect(getByText('Health')).toBeTruthy()
    expect(getByText('Education')).toBeTruthy()
    expect(getByText('Team')).toBeTruthy()
    expect(getByText('Leadership')).toBeTruthy()
  })

  it('shows sub-items when active page is in a nested list', () => {
    const { getByText } = renderNav({
      activePath: '/about/team/leadership',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'whenActive',
    })
    expect(getByText('Team')).toBeTruthy()
    expect(getByText('Leadership')).toBeTruthy()
  })

  it('adds chevron indicator to items with sub-items when subLevelVisible="whenActive"', () => {
    const { getAllByRole } = renderNav({
      activePath: '/services/health',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'whenActive',
    })
    const servicesLink = getAllByRole('link').find(
      (l) => l.getAttribute('href') === '/services',
    )
    // aria-label is set when hasSubIndicator is true
    expect(servicesLink?.getAttribute('aria-label')).toContain('Services')
    expect(servicesLink?.getAttribute('aria-label')).toContain('sub links')
  })

  it('does NOT add chevron aria-label to items with sub-items when subLevelVisible="always"', () => {
    const { getAllByRole } = renderNav({
      activePath: '/contact',
      items: NESTED_ITEMS,
      title: 'Nav',
      subLevelVisible: 'always',
    })
    const servicesLink = getAllByRole('link').find(
      (l) => l.getAttribute('href') === '/services',
    )
    // no indicator when always showing
    expect(servicesLink?.getAttribute('aria-label')).toBeNull()
  })
})

// ─── Background ───────────────────────────────────────────────────────────────

describe('AGDSSideNav — background', () => {
  it('applies body background class by default', () => {
    const { container } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Nav' })
    expect(container.querySelector('.agds-side-nav--bg-body')).toBeTruthy()
  })

  it('applies bodyAlt background class when background="bodyAlt"', () => {
    const { container } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Nav',
      background: 'bodyAlt',
    })
    expect(container.querySelector('.agds-side-nav--bg-bodyAlt')).toBeTruthy()
  })
})

// ─── Mobile toggle ────────────────────────────────────────────────────────────

describe('AGDSSideNav — mobile toggle', () => {
  it('renders a toggle button with aria-expanded="false" initially', () => {
    const { getByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'My Nav' })
    const button = getByRole('button')
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded="true" after clicking the toggle', async () => {
    const { getByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'My Nav' })
    const button = getByRole('button')
    await fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })

  it('adds agds-side-nav--expanded class after clicking toggle', async () => {
    const { container, getByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Nav' })
    await fireEvent.click(getByRole('button'))
    expect(container.querySelector('.agds-side-nav--expanded')).toBeTruthy()
  })

  it('collapses again on second click', async () => {
    const { container, getByRole } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Nav' })
    const button = getByRole('button')
    await fireEvent.click(button)
    await fireEvent.click(button)
    expect(container.querySelector('.agds-side-nav--expanded')).toBeNull()
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSideNav — axe accessibility', () => {
  it('has no violations with flat items', async () => {
    const { container } = renderNav({ activePath: '/foo', items: FLAT_ITEMS, title: 'Navigation' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with nested items and subLevelVisible="whenActive"', async () => {
    const { container } = renderNav({
      activePath: '/services/health',
      items: NESTED_ITEMS,
      title: 'Navigation',
      subLevelVisible: 'whenActive',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with subLevelVisible="always"', async () => {
    const { container } = renderNav({
      activePath: '/contact',
      items: NESTED_ITEMS,
      title: 'Navigation',
      subLevelVisible: 'always',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a titleLink', async () => {
    const { container } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Navigation',
      titleLink: '/nav',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with bodyAlt background', async () => {
    const { container } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Navigation',
      background: 'bodyAlt',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in expanded (mobile) state', async () => {
    const { container, getByRole } = renderNav({
      activePath: '/foo',
      items: FLAT_ITEMS,
      title: 'Navigation',
    })
    await fireEvent.click(getByRole('button'))
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when a link has an empty label', async () => {
    const badItems: SideNavItem[] = [{ href: '/empty', label: '' }]
    const { container } = renderNav({ activePath: '/empty', items: badItems, title: 'Nav' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})
