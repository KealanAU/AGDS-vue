import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSFieldset from './AGDSFieldset.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LABELLED_SLOT = '<label for="street">Street</label><input id="street" type="text" />'

function renderFieldset(props: Record<string, unknown> = {}, slot = '') {
  return render(AGDSFieldset, {
    props: { legend: 'Delivery address', ...props },
    slots: { default: slot || LABELLED_SLOT },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSFieldset — rendering', () => {
  it('renders a legend', () => {
    const { getByText } = renderFieldset()
    expect(getByText('Delivery address')).toBeTruthy()
  })

  it('renders hint text when provided', () => {
    const { getByText } = renderFieldset({ hint: 'Enter your full street address' })
    expect(getByText('Enter your full street address')).toBeTruthy()
  })

  it('does not render hint when omitted', () => {
    const { queryByText } = renderFieldset()
    expect(queryByText('Enter your full street address')).toBeNull()
  })

  it('renders slot content inside the content wrapper', () => {
    const { container } = renderFieldset({}, LABELLED_SLOT)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('uses a custom id on the fieldset when provided', () => {
    const { container } = renderFieldset({ id: 'my-fieldset' })
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.id).toBe('my-fieldset')
  })

  it('auto-generates a fieldset id when none is provided', () => {
    const { container } = renderFieldset()
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.id).toMatch(/^fieldset-/)
  })
})

// ─── ARIA ────────────────────────────────────────────────────────────────────

describe('AGDSFieldset — aria attributes', () => {
  it('sets aria-describedby referencing the hint id when hint is provided', () => {
    const { container } = renderFieldset({ hint: 'Some hint' })
    const fieldset = container.querySelector('fieldset')
    const hintId = container.querySelector('.agds-fieldset__hint')?.id
    expect(fieldset?.getAttribute('aria-describedby')).toBe(hintId)
  })

  it('does not set aria-describedby when hint is omitted', () => {
    const { container } = renderFieldset()
    const fieldset = container.querySelector('fieldset')
    expect(fieldset?.getAttribute('aria-describedby')).toBeNull()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSFieldset — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderFieldset()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a hint', async () => {
    const { container } = renderFieldset({ hint: 'Enter your full street address' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a custom id', async () => {
    const { container } = renderFieldset({ id: 'address-fieldset' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when a fieldset has no legend', async () => {
    const { container } = render({ template: '<fieldset><input type="text" /></fieldset>' })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('toHaveNoViolations')
  })
})
