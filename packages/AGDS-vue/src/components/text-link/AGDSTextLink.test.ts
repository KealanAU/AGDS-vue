import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSTextLink from './AGDSTextLink.vue'
import AGDSTextLinkExternal from './AGDSTextLinkExternal.vue'

describe('AGDSTextLink', () => {
  it('renders a link with the correct href', () => {
    render(AGDSTextLink, {
      props: { href: '/about' },
      slots: { default: 'About us' },
    })
    const link = screen.getByRole('link', { name: 'About us' })
    expect(link.getAttribute('href')).toBe('/about')
  })

  it('has no axe violations', async () => {
    const { container } = render(AGDSTextLink, {
      props: { href: '/about' },
      slots: { default: 'About us' },
    })
    await runAxe(container)
  })

  it('intentionally fails axe when a link has no accessible name (validates helper)', async () => {
    // An <a href> with no text content has no accessible name — WCAG 2.4.4
    const { container } = render({ template: '<a href="/foo"></a>' })
    await expect(runAxe(container)).rejects.toThrow()
  })
})

describe('AGDSTextLinkExternal', () => {
  it('renders with target="_blank" and rel="noopener noreferrer"', () => {
    render(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    const link = screen.getByRole('link', { name: /Example/ })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('includes offscreen "opens in a new tab" text', () => {
    render(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    expect(screen.getByText(/opens in a new tab/i)).toBeTruthy()
  })

  it('has no axe violations', async () => {
    const { container } = render(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    await runAxe(container)
  })
})
