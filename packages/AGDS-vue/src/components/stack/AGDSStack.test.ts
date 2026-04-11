import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSStack from './AGDSStack.vue'

const AXE_OPTS = { rules: { 'color-contrast': { enabled: false } } } as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderStack(props: Record<string, unknown> = {}, slot = '<p>Content</p>') {
  return render(AGDSStack, { props, slots: { default: slot } })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSStack — rendering', () => {
  it('renders a div by default', () => {
    const { container } = renderStack()
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('applies flex-direction: column', () => {
    const { container } = renderStack()
    expect((container.querySelector('div') as HTMLElement).style.flexDirection).toBe('column')
  })

  it('renders as a custom element when as prop is provided', () => {
    const { container } = renderStack({ as: 'nav' })
    expect(container.querySelector('nav')).toBeTruthy()
  })

  it('renders slot content', () => {
    const { getByText } = renderStack({}, '<span>Child</span>')
    expect(getByText('Child')).toBeTruthy()
  })
})

// ─── Layout props ─────────────────────────────────────────────────────────────

describe('AGDSStack — layout props', () => {
  it('maps numeric gap to a space token', () => {
    const { container } = renderStack({ gap: 2 })
    expect((container.querySelector('div') as HTMLElement).style.gap).toBe('var(--agds-space-2)')
  })

  it('sets align-items from prop', () => {
    const { container } = renderStack({ alignItems: 'center' })
    expect((container.querySelector('div') as HTMLElement).style.alignItems).toBe('center')
  })

  it('sets justify-content from prop', () => {
    const { container } = renderStack({ justifyContent: 'space-between' })
    expect((container.querySelector('div') as HTMLElement).style.justifyContent).toBe('space-between')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSStack — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderStack()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with gap and multiple children', async () => {
    const { container } = renderStack({ gap: 3 }, '<p>Item A</p><p>Item B</p><p>Item C</p>')
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with alignItems=center', async () => {
    const { container } = renderStack({ alignItems: 'center', gap: 2 }, '<p>Item A</p><p>Item B</p>')
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when an <img> has no alt text', async () => {
    const { container } = renderStack()
    const img = document.createElement('img')
    img.setAttribute('src', 'photo.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
