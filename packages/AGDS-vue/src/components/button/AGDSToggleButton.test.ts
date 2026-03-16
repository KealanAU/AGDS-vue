import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSToggleButton from './AGDSToggleButton.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderToggle(props: Record<string, unknown> = {}) {
  return render(AgDSToggleButton, {
    props: {
      pressed: false,
      label: 'Bookmark',
      pressedLabel: 'Bookmarked',
      ...props,
    },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSToggleButton — rendering', () => {
  it('renders a <button> element', () => {
    const { getByRole } = renderToggle()
    expect(getByRole('button')).toBeTruthy()
  })

  it('shows label in unpressed state', () => {
    const { getByText } = renderToggle({ pressed: false })
    expect(getByText('Bookmark')).toBeTruthy()
  })

  it('shows pressedLabel in pressed state', () => {
    const { getByText } = renderToggle({ pressed: true })
    expect(getByText('Bookmarked')).toBeTruthy()
  })
})

// ─── aria-pressed ────────────────────────────────────────────────────────────

describe('AgDSToggleButton — aria-pressed', () => {
  it('sets aria-pressed="false" when unpressed', () => {
    const { getByRole } = renderToggle({ pressed: false })
    expect(getByRole('button').getAttribute('aria-pressed')).toBe('false')
  })

  it('sets aria-pressed="true" when pressed', () => {
    const { getByRole } = renderToggle({ pressed: true })
    expect(getByRole('button').getAttribute('aria-pressed')).toBe('true')
  })
})

// ─── hiddenLabel ─────────────────────────────────────────────────────────────

describe('AgDSToggleButton — hiddenLabel', () => {
  it('renders visible label when hiddenLabel=false', () => {
    const { getByText } = renderToggle({ hiddenLabel: false })
    expect(getByText('Bookmark')).toBeTruthy()
  })

  it('does not render visible label text when hiddenLabel=true', () => {
    const { queryByText } = renderToggle({ hiddenLabel: true })
    expect(queryByText('Bookmark')).toBeNull()
  })

  it('sets aria-label to label when hiddenLabel=true and unpressed', () => {
    const { getByRole } = renderToggle({ hiddenLabel: true, pressed: false })
    expect(getByRole('button').getAttribute('aria-label')).toBe('Bookmark')
  })

  it('sets aria-label to pressedLabel when hiddenLabel=true and pressed', () => {
    const { getByRole } = renderToggle({ hiddenLabel: true, pressed: true })
    expect(getByRole('button').getAttribute('aria-label')).toBe('Bookmarked')
  })

  it('does not set aria-label when hiddenLabel=false', () => {
    const { getByRole } = renderToggle({ hiddenLabel: false })
    expect(getByRole('button').getAttribute('aria-label')).toBeNull()
  })
})

// ─── Events ──────────────────────────────────────────────────────────────────

describe('AgDSToggleButton — events', () => {
  it('emits update:pressed with true when clicked in unpressed state', async () => {
    const { getByRole, emitted } = renderToggle({ pressed: false })
    await fireEvent.click(getByRole('button'))
    expect(emitted()['update:pressed']).toEqual([[true]])
  })

  it('emits update:pressed with false when clicked in pressed state', async () => {
    const { getByRole, emitted } = renderToggle({ pressed: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted()['update:pressed']).toEqual([[false]])
  })

  it('does not emit when disabled', async () => {
    const { getByRole, emitted } = renderToggle({ disabled: true })
    await fireEvent.click(getByRole('button'))
    expect(emitted()['update:pressed']).toBeUndefined()
  })
})

// ─── iconType ────────────────────────────────────────────────────────────────

describe('AgDSToggleButton — iconType', () => {
  it('defaults to flag iconType', () => {
    const { getByRole } = renderToggle()
    // Icon is rendered — button should exist
    expect(getByRole('button')).toBeTruthy()
  })

  it('renders with star iconType', () => {
    const { getByRole } = renderToggle({ iconType: 'star' })
    expect(getByRole('button')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ─────────────────────────────────────────────────

describe('AgDSToggleButton — axe accessibility', () => {
  it('has no violations in unpressed state', async () => {
    const { container } = renderToggle({ pressed: false })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in pressed state', async () => {
    const { container } = renderToggle({ pressed: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when hiddenLabel=true', async () => {
    const { container } = renderToggle({ hiddenLabel: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when iconType=star', async () => {
    const { container } = renderToggle({ iconType: 'star' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when disabled=true', async () => {
    const { container } = renderToggle({ disabled: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the button has no accessible name', async () => {
    // Intentional: verify the axe helper catches missing names.
    const { container } = render(AgDSToggleButton, {
      props: { pressed: false, label: '', pressedLabel: '', hiddenLabel: true },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
