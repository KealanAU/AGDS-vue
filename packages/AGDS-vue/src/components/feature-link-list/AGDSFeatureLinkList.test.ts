import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSFeatureLinkList from './AGDSFeatureLinkList.vue'
import AgDSFeatureLinkListItem from './AGDSFeatureLinkListItem.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const baseLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About us', secondaryText: 'Learn more about us' },
  { href: '/contact', label: 'Contact' },
]

// ─── AgDSFeatureLinkList ────────────────────────────────────────────────────

describe('AgDSFeatureLinkList — rendering', () => {
  it('renders a <ul> with the list class', () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    expect(container.querySelector('ul.agds-feature-link-list')).toBeTruthy()
  })

  it('renders one <li> per link', () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    expect(container.querySelectorAll('li')).toHaveLength(3)
  })

  it('renders the label text for each link', () => {
    const { getByText } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    expect(getByText('Services')).toBeTruthy()
    expect(getByText('About us')).toBeTruthy()
    expect(getByText('Contact')).toBeTruthy()
  })

  it('renders the correct href for each link', () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    const anchors = container.querySelectorAll('a')
    expect(anchors[0].getAttribute('href')).toBe('/services')
    expect(anchors[1].getAttribute('href')).toBe('/about')
    expect(anchors[2].getAttribute('href')).toBe('/contact')
  })

  it('renders secondary text when provided', () => {
    const { getByText } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    expect(getByText('Learn more about us')).toBeTruthy()
  })

  it('does not render secondary text when omitted', () => {
    const { container } = render(AgDSFeatureLinkList, {
      props: { links: [{ href: '/services', label: 'Services' }] },
    })
    expect(container.querySelector('.agds-feature-link-list-item__secondary')).toBeNull()
  })
})

describe('AgDSFeatureLinkList — background prop', () => {
  it('forwards body background to each item by default', () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    const items = container.querySelectorAll('.agds-feature-link-list-item--bg-body')
    expect(items).toHaveLength(3)
  })

  it('forwards bodyAlt background to each item', () => {
    const { container } = render(AgDSFeatureLinkList, {
      props: { links: baseLinks, background: 'bodyAlt' },
    })
    const items = container.querySelectorAll('.agds-feature-link-list-item--bg-bodyAlt')
    expect(items).toHaveLength(3)
  })
})

describe('AgDSFeatureLinkList — chevron icon', () => {
  it('renders an aria-hidden SVG chevron per item', () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    const chevrons = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(chevrons).toHaveLength(3)
  })
})

// ─── AgDSFeatureLinkListItem — standalone ───────────────────────────────────

describe('AgDSFeatureLinkListItem — rendering', () => {
  it('renders a <li> with an <a> inside', () => {
    const { container } = render(AgDSFeatureLinkListItem, {
      props: { href: '/foo', label: 'Foo' },
    })
    expect(container.querySelector('li')).toBeTruthy()
    expect(container.querySelector('a[href="/foo"]')).toBeTruthy()
  })

  it('renders the label', () => {
    const { getByText } = render(AgDSFeatureLinkListItem, {
      props: { href: '/foo', label: 'Foo bar' },
    })
    expect(getByText('Foo bar')).toBeTruthy()
  })

  it('renders secondary text when provided', () => {
    const { getByText } = render(AgDSFeatureLinkListItem, {
      props: { href: '/foo', label: 'Foo', secondaryText: 'Description' },
    })
    expect(getByText('Description')).toBeTruthy()
  })
})

describe('AgDSFeatureLinkListItem — external links', () => {
  it('sets target="_blank" and rel when external=true', () => {
    const { container } = render(AgDSFeatureLinkListItem, {
      props: { href: 'https://example.com', label: 'External', external: true },
    })
    const a = container.querySelector('a')!
    expect(a.getAttribute('target')).toBe('_blank')
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders offscreen "opens in a new tab" text when external=true', () => {
    const { container } = render(AgDSFeatureLinkListItem, {
      props: { href: 'https://example.com', label: 'External', external: true },
    })
    const sr = container.querySelector('.sr-only')
    expect(sr?.textContent).toContain('opens in a new tab')
  })

  it('does not set target or sr-only text when external=false (default)', () => {
    const { container } = render(AgDSFeatureLinkListItem, {
      props: { href: '/internal', label: 'Internal' },
    })
    const a = container.querySelector('a')!
    expect(a.hasAttribute('target')).toBe(false)
    expect(container.querySelector('.sr-only')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSFeatureLinkList — axe accessibility', () => {
  it('has no violations: default (body background)', async () => {
    const { container } = render(AgDSFeatureLinkList, { props: { links: baseLinks } })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: bodyAlt background', async () => {
    const { container } = render(AgDSFeatureLinkList, {
      props: { links: baseLinks, background: 'bodyAlt' },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: single item with secondary text', async () => {
    const { container } = render(AgDSFeatureLinkList, {
      props: {
        links: [{ href: '/a', label: 'Alpha', secondaryText: 'Alpha description' }],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: external link item', async () => {
    const { container } = render(AgDSFeatureLinkList, {
      props: {
        links: [{ href: 'https://example.com', label: 'External site', external: true }],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation: link with empty accessible name', async () => {
    const { container } = render(AgDSFeatureLinkListItem, {
      props: { href: '/bad', label: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
