import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSVisuallyHidden from './AGDSVisuallyHidden.vue'
import AGDSExternalLinkCallout from './AGDSExternalLinkCallout.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── AGDSVisuallyHidden ─────────────────────────────────────────────────────

describe('AGDSVisuallyHidden — rendering', () => {
  it('renders a span by default', () => {
    const { container } = render(AGDSVisuallyHidden, {
      slots: { default: 'Hidden text' },
    })
    const el = container.querySelector('span.agds-visually-hidden')
    expect(el).toBeTruthy()
    expect(el!.textContent).toBe('Hidden text')
  })

  it('renders a custom element via the `as` prop', () => {
    const { container } = render(AGDSVisuallyHidden, {
      props: { as: 'div' },
      slots: { default: 'Hidden text' },
    })
    expect(container.querySelector('div.agds-visually-hidden')).toBeTruthy()
  })

  it('passes axe with slot content', async () => {
    const { container } = render(AGDSVisuallyHidden, {
      slots: { default: 'Screen reader only' },
    })
    await runAxe(container, AXE_OPTS)
  })
})

// ─── AGDSExternalLinkCallout ────────────────────────────────────────────────

describe('AGDSExternalLinkCallout — rendering', () => {
  it('renders the new-tab announcement text', () => {
    const { container } = render(AGDSExternalLinkCallout)
    expect(container.textContent).toContain(', opens in a new tab')
  })

  it('renders inside a visually-hidden span', () => {
    const { container } = render(AGDSExternalLinkCallout)
    expect(container.querySelector('span.agds-visually-hidden')).toBeTruthy()
  })

  it('passes axe when used inside a link', async () => {
    const { container } = render({
      template: `<a href="/page">Visit page<AGDSExternalLinkCallout /></a>`,
      components: { AGDSExternalLinkCallout },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('intentionally fails axe when link has no accessible name (verifies helper)', async () => {
    const { container } = render({
      template: `<a href="/page"><img src="x.png" /></a>`,
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
