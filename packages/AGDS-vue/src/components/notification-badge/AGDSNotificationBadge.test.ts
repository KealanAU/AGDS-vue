import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSNotificationBadge from './AGDSNotificationBadge.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderBadge(props: Record<string, unknown> = {}) {
  return render(AgDSNotificationBadge, { props })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSNotificationBadge — rendering', () => {
  it('renders the value as text', () => {
    renderBadge({ value: 5, tone: 'action' })
    expect(screen.getByText('5')).toBeTruthy()
  })

  it('renders as a <span>', () => {
    const { container } = renderBadge({ value: 3, tone: 'neutral' })
    expect(container.querySelector('span.agds-badge')).toBeTruthy()
  })

  it('applies the tone modifier class', () => {
    const { container } = renderBadge({ value: 1, tone: 'neutral' })
    expect(container.querySelector('.agds-badge--neutral')).toBeTruthy()
  })

  it('applies the action tone class', () => {
    const { container } = renderBadge({ value: 1, tone: 'action' })
    expect(container.querySelector('.agds-badge--action')).toBeTruthy()
  })
})

// ─── max prop ────────────────────────────────────────────────────────────────

describe('AgDSNotificationBadge — max prop', () => {
  it('shows the exact value when value <= max', () => {
    renderBadge({ value: 5, max: 99, tone: 'action' })
    expect(screen.getByText('5')).toBeTruthy()
  })

  it('shows "{max}+" when value exceeds max', () => {
    renderBadge({ value: 100, max: 99, tone: 'action' })
    expect(screen.getByText('99+')).toBeTruthy()
  })

  it('shows the exact value when value === max', () => {
    renderBadge({ value: 99, max: 99, tone: 'action' })
    expect(screen.getByText('99')).toBeTruthy()
  })

  it('shows the value with no cap when max is omitted', () => {
    renderBadge({ value: 999, tone: 'action' })
    expect(screen.getByText('999')).toBeTruthy()
  })
})

// ─── aria-hidden passthrough ─────────────────────────────────────────────────

describe('AgDSNotificationBadge — aria-hidden passthrough', () => {
  it('passes aria-hidden="true" to the root element', () => {
    const { container } = render(AgDSNotificationBadge, {
      props: { value: 3, tone: 'action' },
      attrs: { 'aria-hidden': 'true' },
    })
    const badge = container.querySelector('.agds-badge')
    expect(badge?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Accessibility ───────────────────────────────────────────────────────────

describe('AgDSNotificationBadge — axe', () => {
  it('neutral tone has no violations', async () => {
    const { container } = renderBadge({ value: 5, tone: 'neutral' })
    await runAxe(container, AXE_OPTS)
  })

  it('action tone has no violations', async () => {
    const { container } = renderBadge({ value: 5, tone: 'action' })
    await runAxe(container, AXE_OPTS)
  })

  it('max+ display has no violations', async () => {
    const { container } = renderBadge({ value: 100, max: 99, tone: 'action' })
    await runAxe(container, AXE_OPTS)
  })

  it('catches a real violation — button with no accessible name', async () => {
    const { container } = render({ template: '<button></button>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
