import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSFlex from './AGDSFlex.vue'

const AXE_OPTS = { rules: { 'color-contrast': { enabled: false } } } as const

function renderFlex(props: Record<string, unknown> = {}, slot = '<p>Content</p>') {
  return render(AgDSFlex, { props, slots: { default: slot } })
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

describe('AgDSFlex — defaults', () => {
  it('renders a div by default', () => {
    const { container } = renderFlex()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('applies display: flex by default', () => {
    const { container } = renderFlex()
    expect((container.querySelector('div') as HTMLElement).style.display).toBe('flex')
  })

  it('applies flex-direction: row by default', () => {
    const { container } = renderFlex()
    expect((container.querySelector('div') as HTMLElement).style.flexDirection).toBe('row')
  })

  it('applies justify-content: flex-start by default', () => {
    const { container } = renderFlex()
    expect((container.querySelector('div') as HTMLElement).style.justifyContent).toBe('flex-start')
  })

  it('applies align-items: stretch by default', () => {
    const { container } = renderFlex()
    expect((container.querySelector('div') as HTMLElement).style.alignItems).toBe('stretch')
  })
})

// ─── inline prop ──────────────────────────────────────────────────────────────

describe('AgDSFlex — inline prop', () => {
  it('applies display: inline-flex when inline=true', () => {
    const { container } = renderFlex({ inline: true })
    expect((container.querySelector('div') as HTMLElement).style.display).toBe('inline-flex')
  })

  it('display prop takes priority over inline', () => {
    const { container } = renderFlex({ inline: true, display: 'flex' })
    expect((container.querySelector('div') as HTMLElement).style.display).toBe('flex')
  })
})

// ─── as prop ──────────────────────────────────────────────────────────────────

describe('AgDSFlex — as prop', () => {
  it('renders as the given element', () => {
    const { container } = renderFlex({ as: 'ul' })
    expect(container.querySelector('ul')).toBeTruthy()
  })
})

// ─── Layout props ─────────────────────────────────────────────────────────────

describe('AgDSFlex — layout props', () => {
  it('sets flex-direction: column', () => {
    const { container } = renderFlex({ flexDirection: 'column' })
    expect((container.querySelector('div') as HTMLElement).style.flexDirection).toBe('column')
  })

  it('maps numeric gap to a space token', () => {
    const { container } = renderFlex({ gap: 3 })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('var(--agds-space-3)')
  })

  it('sets align-items: center', () => {
    const { container } = renderFlex({ alignItems: 'center' })
    expect((container.querySelector('div') as HTMLElement).style.alignItems).toBe('center')
  })
})

// ─── Slot ─────────────────────────────────────────────────────────────────────

describe('AgDSFlex — slot', () => {
  it('renders default slot content', () => {
    const { getByText } = renderFlex({}, '<span>Child</span>')
    expect(getByText('Child')).toBeTruthy()
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('AgDSFlex — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderFlex()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations as a column layout', async () => {
    const { container } = renderFlex(
      { flexDirection: 'column', gap: 2 },
      '<p>Item A</p><p>Item B</p>',
    )
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an <img> has no alt text', async () => {
    const { container } = renderFlex()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
