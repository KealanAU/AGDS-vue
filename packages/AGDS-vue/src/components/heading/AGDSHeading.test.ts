import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSHeading from './AGDSHeading.vue'
import AgDSH1 from './AGDSH1.vue'
import AgDSH2 from './AGDSH2.vue'
import AgDSH3 from './AGDSH3.vue'
import AgDSH4 from './AGDSH4.vue'
import AgDSH5 from './AGDSH5.vue'
import AgDSH6 from './AGDSH6.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderHeading(props: Record<string, unknown> = {}, slot = 'Heading text') {
  return render(AgDSHeading, { props, slots: { default: slot } })
}

// ─── Rendered element ─────────────────────────────────────────────────────────

describe('AgDSHeading — rendered element', () => {
  it('renders as h2 by default', () => {
    const { container } = renderHeading()
    expect(container.querySelector('h2')).toBeTruthy()
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'renders the correct element for type="%s"',
    (type) => {
      const { container } = renderHeading({ type })
      expect(container.querySelector(type)).toBeTruthy()
    },
  )

  it('renders the slot content', () => {
    const { getByText } = renderHeading({}, 'Page title')
    expect(getByText('Page title')).toBeTruthy()
  })
})

// ─── `as` prop — polymorphic tag ──────────────────────────────────────────────

describe('AgDSHeading — as prop', () => {
  it('overrides the rendered element while keeping the type class', () => {
    const { container } = renderHeading({ type: 'h2', as: 'h3' })
    // rendered element should be h3 (the `as` value)
    expect(container.querySelector('h3')).toBeTruthy()
    expect(container.querySelector('h2')).toBeNull()
    // class reflects the semantic type, not the rendered element
    expect(container.querySelector('.agds-heading--h2')).toBeTruthy()
  })
})

// ─── CSS classes ──────────────────────────────────────────────────────────────

describe('AgDSHeading — CSS classes', () => {
  it('always has the base agds-heading class', () => {
    const { container } = renderHeading()
    expect(container.querySelector('.agds-heading')).toBeTruthy()
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'applies agds-heading--%s modifier for type="%s"',
    (type) => {
      const { container } = renderHeading({ type })
      expect(container.querySelector(`.agds-heading--${type}`)).toBeTruthy()
    },
  )
})

// ─── Convenience wrappers ─────────────────────────────────────────────────────

describe('AgDSH1 – AgDSH6 convenience wrappers', () => {
  it('AgDSH1 renders an <h1>', () => {
    const { container } = render(AgDSH1, { slots: { default: 'Title' } })
    expect(container.querySelector('h1')).toBeTruthy()
    expect(container.querySelector('.agds-heading--h1')).toBeTruthy()
  })

  it('AgDSH2 renders an <h2>', () => {
    const { container } = render(AgDSH2, { slots: { default: 'Title' } })
    expect(container.querySelector('h2')).toBeTruthy()
  })

  it('AgDSH3 renders an <h3>', () => {
    const { container } = render(AgDSH3, { slots: { default: 'Title' } })
    expect(container.querySelector('h3')).toBeTruthy()
  })

  it('AgDSH4 renders an <h4>', () => {
    const { container } = render(AgDSH4, { slots: { default: 'Title' } })
    expect(container.querySelector('h4')).toBeTruthy()
  })

  it('AgDSH5 renders an <h5>', () => {
    const { container } = render(AgDSH5, { slots: { default: 'Title' } })
    expect(container.querySelector('h5')).toBeTruthy()
  })

  it('AgDSH6 renders an <h6>', () => {
    const { container } = render(AgDSH6, { slots: { default: 'Title' } })
    expect(container.querySelector('h6')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSHeading — axe accessibility', () => {
  it('has no violations: default (h2)', async () => {
    const { container } = renderHeading()
    await runAxe(container, AXE_OPTS)
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
    'has no violations: type="%s"',
    async (type) => {
      const { container } = renderHeading({ type })
      await runAxe(container, AXE_OPTS)
    },
  )

  it('has no violations: as prop override', async () => {
    const { container } = renderHeading({ type: 'h2', as: 'h3' })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation: image without alt text', async () => {
    const { container } = renderHeading()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
