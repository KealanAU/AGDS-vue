import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSFooter from './AGDSFooter.vue'
import AGDSFooterDivider from './AGDSFooterDivider.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderFooter(props: Record<string, unknown> = {}, slot = '<p>Footer content</p>') {
  return render(AGDSFooter, { props, slots: { default: slot } })
}

// ─── AGDSFooter — rendering ───────────────────────────────────────────────────

describe('AGDSFooter — rendering', () => {
  it('renders a <footer> landmark', () => {
    const { container } = renderFooter()
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderFooter({}, '<p>My footer</p>')
    expect(getByText('My footer')).toBeTruthy()
  })

  it('applies the body background class by default', () => {
    const { container } = renderFooter()
    expect(container.querySelector('.agds-footer--body')).toBeTruthy()
  })

  it('applies the bodyAlt background class when background="bodyAlt"', () => {
    const { container } = renderFooter({ background: 'bodyAlt' })
    expect(container.querySelector('.agds-footer--bodyAlt')).toBeTruthy()
  })

  it('applies the container max-width class by default', () => {
    const { container } = renderFooter()
    expect(container.querySelector('.agds-footer__inner--container')).toBeTruthy()
  })

  it('applies the containerLg max-width class when maxWidth="containerLg"', () => {
    const { container } = renderFooter({ maxWidth: 'containerLg' })
    expect(container.querySelector('.agds-footer__inner--containerLg')).toBeTruthy()
  })
})

// ─── AGDSFooterDivider — rendering ───────────────────────────────────────────

describe('AGDSFooterDivider — rendering', () => {
  it('renders an <hr>', () => {
    const { container } = render(AGDSFooterDivider)
    expect(container.querySelector('hr')).toBeTruthy()
  })

  it('has aria-hidden="true"', () => {
    const { container } = render(AGDSFooterDivider)
    expect(container.querySelector('hr')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('applies the accent colour class by default', () => {
    const { container } = render(AGDSFooterDivider)
    expect(container.querySelector('.agds-footer-divider--accent')).toBeTruthy()
  })

  it('applies the muted colour class when color="muted"', () => {
    const { container } = render(AGDSFooterDivider, { props: { color: 'muted' } })
    expect(container.querySelector('.agds-footer-divider--muted')).toBeTruthy()
  })
})

// ─── AGDSFooter — axe accessibility ──────────────────────────────────────────

describe('AGDSFooter — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderFooter()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with background="bodyAlt"', async () => {
    const { container } = renderFooter({ background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with maxWidth="containerLg"', async () => {
    const { container } = renderFooter({ maxWidth: 'containerLg' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an image without alt text is in the footer', async () => {
    const { container } = renderFooter()
    const img = document.createElement('img')
    img.setAttribute('src', 'logo.png')
    container.querySelector('footer')!.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})

// ─── AGDSFooterDivider — axe accessibility ────────────────────────────────────

describe('AGDSFooterDivider — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = render(AGDSFooterDivider)
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with color="muted"', async () => {
    const { container } = render(AGDSFooterDivider, { props: { color: 'muted' } })
    await runAxe(container, AXE_OPTS)
  })
})
