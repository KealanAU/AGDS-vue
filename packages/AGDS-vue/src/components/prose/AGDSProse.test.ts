import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSProse from './AGDSProse.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderProse(props: Record<string, unknown> = {}, slot = '<p>Content</p>') {
  return render(AGDSProse, { props, slots: { default: slot } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSProse — rendering', () => {
  it('renders as a div by default', () => {
    const { container } = renderProse()
    expect(container.querySelector('div.agds-prose')).toBeTruthy()
  })

  it('renders as a custom element when as prop is provided', () => {
    const { container } = renderProse({ as: 'article' })
    expect(container.querySelector('article.agds-prose')).toBeTruthy()
  })

  it('renders as a main element', () => {
    const { container } = renderProse({ as: 'main' })
    expect(container.querySelector('main.agds-prose')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderProse({}, '<p>Hello world</p>')
    expect(getByText('Hello world')).toBeTruthy()
  })

  it('renders headings in the slot', () => {
    const { getByRole } = renderProse({}, '<h2>Section title</h2>')
    expect(getByRole('heading', { level: 2 })).toBeTruthy()
  })

  it('renders a link in the slot', () => {
    const { getByRole } = renderProse({}, '<a href="/about">About</a>')
    expect(getByRole('link', { name: 'About' })).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSProse — axe accessibility', () => {
  it('has no violations with default props and paragraph content', async () => {
    const { container } = renderProse()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when rendered as article', async () => {
    const { container } = renderProse({ as: 'article' }, '<p>Body text here.</p>')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with rich text content', async () => {
    const { container } = renderProse(
      {},
      '<p>Some text with a <a href="/about">link</a>.</p>' +
      '<ul><li>Item one</li><li>Item two</li></ul>' +
      '<blockquote><p>A quote.</p></blockquote>',
    )
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a properly labelled image', async () => {
    const { container } = renderProse({}, '<img src="photo.png" alt="A scenic landscape" />')
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when prose contains an image with no alt text', async () => {
    const { container } = renderProse({}, '<img src="photo.png" />')
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
