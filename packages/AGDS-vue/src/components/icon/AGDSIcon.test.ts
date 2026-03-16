import { describe, it, expect, beforeAll } from 'vitest'
import { render } from '@testing-library/vue'
import { addIcon } from '@iconify/vue'
import { runAxe } from '../../test/a11y'
import AgDSIcon from './AGDSIcon.vue'

// jsdom has no computed styles — disable colour-contrast.
const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// Pre-load a minimal icon so @iconify/vue renders an SVG without network calls.
beforeAll(() => {
  addIcon('mdi:home', {
    body: '<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>',
    width: 24,
    height: 24,
  })
  // Also register with the i- prefix convention to test prefix stripping
  addIcon('mdi:star', {
    body: '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>',
    width: 24,
    height: 24,
  })
})

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSIcon — rendering', () => {
  it('renders an SVG for a string icon name', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('applies the agds-icon class', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    expect(container.querySelector('.agds-icon')).not.toBeNull()
  })

  it('renders a Vue component when name is an object', () => {
    const FakeIcon = { template: '<svg data-testid="custom-svg"></svg>' }
    const { getByTestId } = render(AgDSIcon, { props: { name: FakeIcon } })
    expect(getByTestId('custom-svg')).toBeTruthy()
  })
})

// ─── i- prefix stripping ─────────────────────────────────────────────────────

describe('AgDSIcon — icon name normalisation', () => {
  it('strips the i- prefix so "i-mdi:star" resolves to "mdi:star"', () => {
    const { container } = render(AgDSIcon, { props: { name: 'i-mdi:star' } })
    // If the prefix is correctly stripped, @iconify/vue finds the icon data and
    // renders an SVG. Without stripping it would render nothing.
    expect(container.querySelector('svg')).not.toBeNull()
  })
})

// ─── A11y — decorative (default) ─────────────────────────────────────────────

describe('AgDSIcon — decorative (default)', () => {
  it('defaults to aria-hidden="true"', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })

  it('always has role="img" (@iconify/vue default)', () => {
    // @iconify/vue sets role="img" on every SVG by default
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('role')).toBe('img')
  })

  it('removes aria-hidden when consumer passes aria-hidden="false"', () => {
    // @iconify/vue deletes aria-hidden from the SVG when given any value other than true/"true"
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { 'aria-hidden': 'false' },
    })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBeNull()
  })
})

// ─── A11y — meaningful ───────────────────────────────────────────────────────

describe('AgDSIcon — meaningful (aria-label)', () => {
  it('adds role="img" when aria-label is provided', () => {
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { 'aria-label': 'Go to homepage' },
    })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('role')).toBe('img')
  })

  it('forwards the aria-label to the SVG', () => {
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { 'aria-label': 'Go to homepage' },
    })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-label')).toBe('Go to homepage')
  })

  it('removes aria-hidden when aria-label is provided', () => {
    // We pass aria-hidden="false" to @iconify/vue which causes it to delete the attribute,
    // leaving role="img" + aria-label exposed to assistive technologies.
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { 'aria-label': 'Go to homepage' },
    })
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBeNull()
  })
})

// ─── Props: size ─────────────────────────────────────────────────────────────

describe('AgDSIcon — size prop', () => {
  it.each(['sm', 'md', 'lg', 'xl'] as const)('named size "%s" maps to CSS token', (size) => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home', size } })
    const svg = container.querySelector('svg')
    expect(svg?.style.fontSize).toBe(`var(--agds-icon-size-${size})`)
  })

  it('numeric size is converted to px', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home', size: 32 } })
    const svg = container.querySelector('svg')
    expect(svg?.style.fontSize).toBe('32px')
  })

  it('arbitrary string size passes through', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home', size: '3rem' } })
    const svg = container.querySelector('svg')
    expect(svg?.style.fontSize).toBe('3rem')
  })

  it('defaults to md size token', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    const svg = container.querySelector('svg')
    expect(svg?.style.fontSize).toBe('var(--agds-icon-size-md)')
  })
})

// ─── Props: color ─────────────────────────────────────────────────────────────

describe('AgDSIcon — color prop', () => {
  it('applies a hex color as inline style', () => {
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home', color: 'rgb(0, 105, 143)' },
    })
    const svg = container.querySelector('svg')
    expect(svg?.style.color).toBe('rgb(0, 105, 143)')
  })

  it('does not set inline color when prop is omitted', () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    const svg = container.querySelector('svg')
    expect(svg?.style.color).toBe('')
  })
})

// ─── Axe ─────────────────────────────────────────────────────────────────────

describe('AgDSIcon — accessibility (axe)', () => {
  it('passes axe when decorative', async () => {
    const { container } = render(AgDSIcon, { props: { name: 'mdi:home' } })
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe when meaningful (aria-label)', async () => {
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { 'aria-label': 'Go to homepage' },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('detects axe violation — role="img" without an accessible name', async () => {
    // Intentional: SVG with role="img" but no label should fail the svg-img-alt rule.
    const { container } = render(AgDSIcon, {
      props: { name: 'mdi:home' },
      attrs: { role: 'img', 'aria-hidden': 'false' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
