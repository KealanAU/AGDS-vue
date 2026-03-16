import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSLinkList from './AGDSLinkList.vue'
import AgDSLinkListItem from './AGDSLinkListItem.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const baseLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
]

// ─── AgDSLinkList ───────────────────────────────────────────────────────────

describe('AgDSLinkList — rendering', () => {
  it('renders a <ul> with the list class', () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks } })
    expect(container.querySelector('ul.agds-link-list')).toBeTruthy()
  })

  it('renders one <li> per link', () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks } })
    expect(container.querySelectorAll('li')).toHaveLength(3)
  })

  it('renders the label text for each link', () => {
    const { getByText } = render(AgDSLinkList, { props: { links: baseLinks } })
    expect(getByText('Services')).toBeTruthy()
    expect(getByText('About us')).toBeTruthy()
    expect(getByText('Contact')).toBeTruthy()
  })

  it('renders the correct href for each link', () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks } })
    const anchors = container.querySelectorAll('a')
    expect(anchors[0].getAttribute('href')).toBe('/services')
    expect(anchors[1].getAttribute('href')).toBe('/about')
    expect(anchors[2].getAttribute('href')).toBe('/contact')
  })
})

describe('AgDSLinkList — horizontal prop', () => {
  it('applies vertical class by default', () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks } })
    expect(container.querySelector('.agds-link-list--vertical')).toBeTruthy()
    expect(container.querySelector('.agds-link-list--horizontal')).toBeNull()
  })

  it('applies horizontal class when horizontal=true', () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks, horizontal: true } })
    expect(container.querySelector('.agds-link-list--horizontal')).toBeTruthy()
    expect(container.querySelector('.agds-link-list--vertical')).toBeNull()
  })
})

// ─── AgDSLinkListItem — standalone ─────────────────────────────────────────

describe('AgDSLinkListItem — rendering', () => {
  it('renders a <li> with an <a> inside', () => {
    const { container } = render(AgDSLinkListItem, {
      props: { href: '/foo', label: 'Foo' },
    })
    expect(container.querySelector('li')).toBeTruthy()
    expect(container.querySelector('a[href="/foo"]')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = render(AgDSLinkListItem, {
      props: { href: '/foo', label: 'Foo bar' },
    })
    expect(getByText('Foo bar', { exact: false })).toBeTruthy()
  })
})

describe('AgDSLinkListItem — external links', () => {
  it('sets target and rel when target="_blank"', () => {
    const { container } = render(AgDSLinkListItem, {
      props: { href: 'https://example.com', label: 'External', target: '_blank' },
    })
    const a = container.querySelector('a')!
    expect(a.getAttribute('target')).toBe('_blank')
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders offscreen "opens in a new tab" text when target="_blank"', () => {
    const { container } = render(AgDSLinkListItem, {
      props: { href: 'https://example.com', label: 'External', target: '_blank' },
    })
    const sr = container.querySelector('.sr-only')
    expect(sr?.textContent).toContain('opens in a new tab')
  })

  it('does not set rel or sr-only text for internal links', () => {
    const { container } = render(AgDSLinkListItem, {
      props: { href: '/internal', label: 'Internal' },
    })
    const a = container.querySelector('a')!
    expect(a.hasAttribute('rel')).toBe(false)
    expect(container.querySelector('.sr-only')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSLinkList — axe accessibility', () => {
  it('has no violations: vertical (default)', async () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks } })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: horizontal', async () => {
    const { container } = render(AgDSLinkList, { props: { links: baseLinks, horizontal: true } })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: single external link', async () => {
    const { container } = render(AgDSLinkList, {
      props: {
        links: [{ href: 'https://example.com', label: 'External site', target: '_blank' }],
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation: link with empty accessible name', async () => {
    const { container } = render(AgDSLinkListItem, {
      props: { href: '/bad', label: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
