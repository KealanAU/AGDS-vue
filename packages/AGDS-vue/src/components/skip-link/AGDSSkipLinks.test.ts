import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSSkipLinks from './AGDSSkipLinks.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const DEFAULT_LINKS = [
  { label: 'Skip to main content', href: '#main-content' },
  { label: 'Skip to navigation', href: '#main-nav' },
]

function renderSkipLinks(
  props: Record<string, unknown> = {},
) {
  return render(AGDSSkipLinks, {
    props: { links: DEFAULT_LINKS, ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSSkipLinks — rendering', () => {
  it('renders a <nav> landmark', () => {
    const { getByRole } = renderSkipLinks()
    expect(getByRole('navigation')).toBeTruthy()
  })

  it('renders one link per entry in the links prop', () => {
    const { getAllByRole } = renderSkipLinks()
    expect(getAllByRole('link')).toHaveLength(2)
  })

  it('renders link text correctly', () => {
    const { getByText } = renderSkipLinks()
    expect(getByText('Skip to main content')).toBeTruthy()
    expect(getByText('Skip to navigation')).toBeTruthy()
  })

  it('sets href on each link', () => {
    const { getAllByRole } = renderSkipLinks()
    const links = getAllByRole('link') as HTMLAnchorElement[]
    expect(links[0].getAttribute('href')).toBe('#main-content')
    expect(links[1].getAttribute('href')).toBe('#main-nav')
  })

  it('renders a single link when links prop has one entry', () => {
    const { getAllByRole } = renderSkipLinks({
      links: [{ label: 'Skip to content', href: '#content' }],
    })
    expect(getAllByRole('link')).toHaveLength(1)
  })
})

// ─── Props: ariaLabel ─────────────────────────────────────────────────────────

describe('AGDSSkipLinks — ariaLabel prop', () => {
  it('defaults nav aria-label to "Skip links"', () => {
    const { getByRole } = renderSkipLinks()
    expect(getByRole('navigation', { name: 'Skip links' })).toBeTruthy()
  })

  it('applies a custom ariaLabel to the nav element', () => {
    const { getByRole } = renderSkipLinks({ ariaLabel: 'Page shortcuts' })
    expect(getByRole('navigation', { name: 'Page shortcuts' })).toBeTruthy()
  })
})

// ─── Accessibility: links are in the DOM ──────────────────────────────────────

describe('AGDSSkipLinks — DOM presence', () => {
  it('links are present in the DOM even when visually hidden', () => {
    // Skip links are visually hidden but must be in the DOM for keyboard users.
    const { getAllByRole } = renderSkipLinks()
    const links = getAllByRole('link')
    expect(links).toHaveLength(2)
    // They should not have display:none or visibility:hidden (CSS clip is used)
    links.forEach((link) => {
      expect(link.style.display).not.toBe('none')
      expect(link.style.visibility).not.toBe('hidden')
    })
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSSkipLinks — axe accessibility', () => {
  it('has no violations with default links', async () => {
    const { container } = renderSkipLinks()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a single link', async () => {
    const { container } = renderSkipLinks({
      links: [{ label: 'Skip to content', href: '#content' }],
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a custom ariaLabel', async () => {
    const { container } = renderSkipLinks({ ariaLabel: 'Page shortcuts' })
    await runAxe(container, AXE_OPTS)
  })
})
