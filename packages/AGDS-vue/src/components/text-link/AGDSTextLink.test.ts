import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { runAxe } from '../../test-utils/axe'
import AgDSTextLink from './AGDSTextLink.vue'
import AgDSTextLinkExternal from './AGDSTextLinkExternal.vue'

describe('AgDSTextLink', () => {
  it('renders a link with the correct href', () => {
    render(AgDSTextLink, {
      props: { href: '/about' },
      slots: { default: 'About us' },
    })
    const link = screen.getByRole('link', { name: 'About us' })
    expect(link).toHaveAttribute('href', '/about')
  })

  it('has no axe violations', async () => {
    const { container } = render(AgDSTextLink, {
      props: { href: '/about' },
      slots: { default: 'About us' },
    })
    await runAxe(container)
  })

  it('intentionally fails axe when href is missing (validates helper)', async () => {
    const { container } = render({ template: '<a>No href</a>' })
    await expect(runAxe(container)).rejects.toThrow()
  })
})

describe('AgDSTextLinkExternal', () => {
  it('renders with target="_blank" and rel="noopener noreferrer"', () => {
    render(AgDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    const link = screen.getByRole('link', { name: /Example/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('includes offscreen "opens in a new tab" text', () => {
    render(AgDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    expect(screen.getByText(/opens in a new tab/i)).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(AgDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Example' },
    })
    await runAxe(container)
  })
})
