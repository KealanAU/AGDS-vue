import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSHeading from './AGDSHeading.vue'
import AGDSH1 from './AGDSH1.vue'
import AGDSH2 from './AGDSH2.vue'
import AGDSH3 from './AGDSH3.vue'
import AGDSH4 from './AGDSH4.vue'
import AGDSH5 from './AGDSH5.vue'
import AGDSH6 from './AGDSH6.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderHeading(props: Record<string, unknown> = {}, slot = 'Heading text') {
  return render(AGDSHeading, { props, slots: { default: slot } })
}

// ─── Rendered element ─────────────────────────────────────────────────────────

describe('AGDSHeading — rendered element', () => {
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

describe('AGDSHeading — as prop', () => {
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

describe('AGDSHeading — CSS classes', () => {
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

describe('AGDSH1 – AGDSH6 convenience wrappers', () => {
  it('AGDSH1 renders an <h1>', () => {
    const { container } = render(AGDSH1, { slots: { default: 'Title' } })
    expect(container.querySelector('h1')).toBeTruthy()
    expect(container.querySelector('.agds-heading--h1')).toBeTruthy()
  })

  it('AGDSH2 renders an <h2>', () => {
    const { container } = render(AGDSH2, { slots: { default: 'Title' } })
    expect(container.querySelector('h2')).toBeTruthy()
  })

  it('AGDSH3 renders an <h3>', () => {
    const { container } = render(AGDSH3, { slots: { default: 'Title' } })
    expect(container.querySelector('h3')).toBeTruthy()
  })

  it('AGDSH4 renders an <h4>', () => {
    const { container } = render(AGDSH4, { slots: { default: 'Title' } })
    expect(container.querySelector('h4')).toBeTruthy()
  })

  it('AGDSH5 renders an <h5>', () => {
    const { container } = render(AGDSH5, { slots: { default: 'Title' } })
    expect(container.querySelector('h5')).toBeTruthy()
  })

  it('AGDSH6 renders an <h6>', () => {
    const { container } = render(AGDSH6, { slots: { default: 'Title' } })
    expect(container.querySelector('h6')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSHeading — axe accessibility', () => {
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
