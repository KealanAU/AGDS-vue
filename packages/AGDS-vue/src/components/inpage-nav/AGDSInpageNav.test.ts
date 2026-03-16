import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSInpageNav from './AGDSInpageNav.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const LINKS = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'Contact', href: '#contact' },
]

function renderNav(props: Record<string, unknown> = {}) {
  return render(AgDSInpageNav, { props: { links: LINKS, ...props } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSInpageNav — rendering', () => {
  it('renders a <nav> landmark', () => {
    renderNav()
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('applies the default aria-label "In page"', () => {
    renderNav()
    const nav = screen.getByRole('navigation', { name: 'In page' })
    expect(nav).toBeTruthy()
  })

  it('applies a custom aria-label', () => {
    renderNav({ ariaLabel: 'On this page' })
    const nav = screen.getByRole('navigation', { name: 'On this page' })
    expect(nav).toBeTruthy()
  })

  it('renders all links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: 'Introduction' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Requirements' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeTruthy()
  })

  it('sets href on each link', () => {
    const { container } = renderNav()
    const anchors = container.querySelectorAll<HTMLAnchorElement>('.agds-inpage-nav__link')
    expect(anchors[0].getAttribute('href')).toBe('#introduction')
    expect(anchors[1].getAttribute('href')).toBe('#requirements')
    expect(anchors[2].getAttribute('href')).toBe('#contact')
  })

  it('renders links inside a <ul> list', () => {
    const { container } = renderNav()
    expect(container.querySelector('ul.agds-inpage-nav__list')).toBeTruthy()
    expect(container.querySelectorAll('li.agds-inpage-nav__item')).toHaveLength(3)
  })
})

// ─── Title prop ───────────────────────────────────────────────────────────────

describe('AgDSInpageNav — title prop', () => {
  it('renders an <h2> when title is provided', () => {
    const { container } = renderNav({ title: 'Contents' })
    const heading = container.querySelector('h2.agds-inpage-nav__title')
    expect(heading).toBeTruthy()
    expect(heading?.textContent).toBe('Contents')
  })

  it('does not render an <h2> when title is omitted', () => {
    const { container } = renderNav()
    expect(container.querySelector('h2')).toBeNull()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSInpageNav — axe', () => {
  it('has no violations without a title', async () => {
    const { container } = renderNav()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a title', async () => {
    const { container } = renderNav({ title: 'Contents' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a custom aria-label', async () => {
    const { container } = renderNav({ ariaLabel: 'On this page' })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation — link with no accessible name', async () => {
    const { container } = render({ template: '<a href="#section"></a>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
