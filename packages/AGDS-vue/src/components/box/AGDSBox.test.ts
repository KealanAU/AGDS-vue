import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSBox from './AGDSBox.vue'

const AXE_OPTS = { rules: { 'color-contrast': { enabled: false } } } as const

function renderBox(props: Record<string, unknown> = {}, slot = '<p>Content</p>') {
  return render(AgDSBox, { props, slots: { default: slot } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AgDSBox — rendering', () => {
  it('renders a div by default', () => {
    const { container } = renderBox()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('renders the default slot', () => {
    const { getByText } = renderBox({}, '<span>Hello</span>')
    expect(getByText('Hello')).toBeTruthy()
  })
})

// ─── as prop ──────────────────────────────────────────────────────────────────

describe('AgDSBox — as prop', () => {
  it('renders as a <section> when as="section"', () => {
    const { container } = renderBox({ as: 'section' })
    expect(container.querySelector('section')).toBeTruthy()
  })

  it('renders as an <aside> when as="aside"', () => {
    const { container } = renderBox({ as: 'aside' })
    expect(container.querySelector('aside')).toBeTruthy()
  })
})

// ─── Style: display ───────────────────────────────────────────────────────────

describe('AgDSBox — display prop', () => {
  it('sets display style when provided', () => {
    const { container } = renderBox({ display: 'flex' })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.display).toBe('flex')
  })

  it('does not set display style when omitted', () => {
    const { container } = renderBox()
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.display).toBe('')
  })
})

// ─── Style: flex layout ───────────────────────────────────────────────────────

describe('AgDSBox — flex layout props', () => {
  it('sets flexDirection', () => {
    const { container } = renderBox({ display: 'flex', flexDirection: 'column' })
    expect((container.querySelector('div') as HTMLElement).style.flexDirection).toBe('column')
  })

  it('sets alignItems', () => {
    const { container } = renderBox({ display: 'flex', alignItems: 'center' })
    expect((container.querySelector('div') as HTMLElement).style.alignItems).toBe('center')
  })

  it('sets justifyContent', () => {
    const { container } = renderBox({ display: 'flex', justifyContent: 'space-between' })
    expect((container.querySelector('div') as HTMLElement).style.justifyContent).toBe(
      'space-between',
    )
  })

  it('sets flexWrap', () => {
    const { container } = renderBox({ display: 'flex', flexWrap: 'wrap' })
    expect((container.querySelector('div') as HTMLElement).style.flexWrap).toBe('wrap')
  })

  it('sets flexGrow', () => {
    const { container } = renderBox({ flexGrow: 1 })
    expect((container.querySelector('div') as HTMLElement).style.flexGrow).toBe('1')
  })

  it('sets flexShrink', () => {
    const { container } = renderBox({ flexShrink: 0 })
    expect((container.querySelector('div') as HTMLElement).style.flexShrink).toBe('0')
  })
})

// ─── Style: gap ───────────────────────────────────────────────────────────────

describe('AgDSBox — gap prop', () => {
  it('maps a numeric gap to an agds space token', () => {
    const { container } = renderBox({ gap: 4 })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('var(--agds-space-4)')
  })

  it('passes a string gap value verbatim', () => {
    const { container } = renderBox({ gap: '1rem' })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('1rem')
  })

  it('maps columnGap to a space token', () => {
    const { container } = renderBox({ columnGap: 2 })
    expect((container.querySelector('div') as HTMLElement).style.columnGap).toBe(
      'var(--agds-space-2)',
    )
  })

  it('maps rowGap to a space token', () => {
    const { container } = renderBox({ rowGap: 3 })
    expect((container.querySelector('div') as HTMLElement).style.rowGap).toBe(
      'var(--agds-space-3)',
    )
  })
})

// ─── Style: padding ───────────────────────────────────────────────────────────

describe('AgDSBox — padding props', () => {
  it('maps numeric padding to a space token', () => {
    const { container } = renderBox({ padding: 4 })
    expect((container.querySelector('div') as HTMLElement).style.padding).toBe(
      'var(--agds-space-4)',
    )
  })

  it('maps paddingX to paddingLeft and paddingRight', () => {
    const { container } = renderBox({ paddingX: 3 })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.paddingLeft).toBe('var(--agds-space-3)')
    expect(el.style.paddingRight).toBe('var(--agds-space-3)')
  })

  it('maps paddingY to paddingTop and paddingBottom', () => {
    const { container } = renderBox({ paddingY: 2 })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.paddingTop).toBe('var(--agds-space-2)')
    expect(el.style.paddingBottom).toBe('var(--agds-space-2)')
  })

  it('individual side overrides paddingX/Y', () => {
    const { container } = renderBox({ paddingX: 3, paddingLeft: 0 })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.paddingLeft).toBe('var(--agds-space-0)')
    expect(el.style.paddingRight).toBe('var(--agds-space-3)')
  })

  it('shorthand `padding` wins over individual sides', () => {
    const { container } = renderBox({ padding: 4, paddingTop: 1 })
    const el = container.querySelector('div') as HTMLElement
    expect(el.style.padding).toBe('var(--agds-space-4)')
    // Individual sides should not be set when shorthand is present
    expect(el.style.paddingTop).toBe('')
  })
})

// ─── Style: dimensions ────────────────────────────────────────────────────────

describe('AgDSBox — dimension props', () => {
  it('sets width', () => {
    const { container } = renderBox({ width: '100%' })
    expect((container.querySelector('div') as HTMLElement).style.width).toBe('100%')
  })

  it('sets maxWidth', () => {
    const { container } = renderBox({ maxWidth: '80ch' })
    expect((container.querySelector('div') as HTMLElement).style.maxWidth).toBe('80ch')
  })

  it('sets minHeight', () => {
    const { container } = renderBox({ minHeight: '200px' })
    expect((container.querySelector('div') as HTMLElement).style.minHeight).toBe('200px')
  })
})

// ─── Attr passthrough ─────────────────────────────────────────────────────────

describe('AgDSBox — attribute passthrough', () => {
  it('passes aria-label to the root element', () => {
    const { container } = render(AgDSBox, {
      attrs: { 'aria-label': 'region' },
      slots: { default: '<p>Content</p>' },
    })
    expect((container.querySelector('div') as HTMLElement).getAttribute('aria-label')).toBe(
      'region',
    )
  })

  it('passes class to the root element', () => {
    const { container } = render(AgDSBox, {
      attrs: { class: 'custom-class' },
      slots: { default: '<p>Content</p>' },
    })
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSBox — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderBox()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations as a flex container', async () => {
    const { container } = renderBox(
      { display: 'flex', flexDirection: 'column', gap: 2 },
      '<p>Item one</p><p>Item two</p>',
    )
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with padding and dimensions', async () => {
    const { container } = renderBox({ padding: 4, maxWidth: '60ch' })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an <img> has no alt text', async () => {
    const { container } = renderBox()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
