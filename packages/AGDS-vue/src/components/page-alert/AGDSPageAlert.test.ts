import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSPageAlert from './AGDSPageAlert.vue'
import type { PageAlertTone } from './AGDSPageAlert.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

const TONES: PageAlertTone[] = ['info', 'success', 'warning', 'error']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderAlert(
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) {
  return render(AGDSPageAlert, {
    props: { tone: 'info', title: 'Alert title', ...props },
    slots: Object.keys(slots).length ? slots : undefined,
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSPageAlert — rendering', () => {
  it('renders a <div> with role="region" by default', () => {
    const { container } = renderAlert()
    const el = container.querySelector('div.agds-page-alert')
    expect(el).toBeTruthy()
    expect(el!.getAttribute('role')).toBe('region')
  })

  it('renders the title from the prop', () => {
    const { getByText } = renderAlert({ title: 'Save failed' })
    expect(getByText('Save failed')).toBeTruthy()
  })

  it('renders the default slot content', () => {
    const { getByText } = renderAlert({}, { default: '<p>Please fix the errors below.</p>' })
    expect(getByText('Please fix the errors below.')).toBeTruthy()
  })

  it('does not render body element when default slot is empty', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-page-alert__content')).toBeNull()
  })

  it('renders no title-wrap element when title prop and title slot are both absent', () => {
    const { container } = renderAlert({ title: undefined })
    expect(container.querySelector('.agds-page-alert__title-wrap')).toBeNull()
  })

  it('renders the icon strip for every tone', () => {
    for (const tone of TONES) {
      const { container } = renderAlert({ tone })
      expect(container.querySelector('.agds-page-alert__strip')).toBeTruthy()
      expect(container.querySelector('.agds-page-alert__icon')).toBeTruthy()
    }
  })

  it('renders a tone-specific modifier class', () => {
    for (const tone of TONES) {
      const { container } = renderAlert({ tone })
      expect(container.querySelector(`.agds-page-alert--${tone}`)).toBeTruthy()
    }
  })

  it('accepts a rich #title slot', () => {
    const { getByText } = renderAlert(
      { title: undefined },
      { title: '<h3 class="custom-title">Custom heading</h3>' },
    )
    expect(getByText('Custom heading')).toBeTruthy()
  })
})

// ─── Props: role ──────────────────────────────────────────────────────────────

describe('AGDSPageAlert — role prop', () => {
  it('defaults to role="region"', () => {
    const { container } = renderAlert()
    expect(container.querySelector('[role="region"]')).toBeTruthy()
  })

  it('accepts a custom role', () => {
    const { container } = renderAlert({ role: 'alert' })
    expect(container.querySelector('[role="alert"]')).toBeTruthy()
  })
})

// ─── Live region ──────────────────────────────────────────────────────────────

describe('AGDSPageAlert — live region (ariaLive prop)', () => {
  it('does not set aria-live by default', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-page-alert')!.getAttribute('aria-live')).toBeNull()
  })

  it('sets aria-live="polite" when ariaLive="polite"', () => {
    const { container } = renderAlert({ ariaLive: 'polite' })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('aria-live')).toBe('polite')
  })

  it('sets aria-live="assertive" when ariaLive="assertive"', () => {
    const { container } = renderAlert({ ariaLive: 'assertive' })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('aria-live')).toBe('assertive')
  })

  it('sets aria-live="off" when ariaLive="off"', () => {
    const { container } = renderAlert({ ariaLive: 'off' })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('aria-live')).toBe('off')
  })
})

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe('AGDSPageAlert — ARIA', () => {
  it('aria-labelledby contains toneId and titleId', () => {
    const { container } = renderAlert()
    const root      = container.querySelector('.agds-page-alert')!
    const labelledBy = root.getAttribute('aria-labelledby') ?? ''
    const srTone    = container.querySelector('.agds-page-alert__sr-tone')!
    const titleWrap = container.querySelector('.agds-page-alert__title-wrap')!
    expect(labelledBy).toContain(srTone.id)
    expect(labelledBy).toContain(titleWrap.id)
  })

  it('includes childrenId in aria-labelledby when default slot is populated', () => {
    const { container } = renderAlert({}, { default: '<p>Body text</p>' })
    const root       = container.querySelector('.agds-page-alert')!
    const labelledBy = root.getAttribute('aria-labelledby') ?? ''
    const body       = container.querySelector('.agds-page-alert__content')!
    expect(labelledBy).toContain(body.id)
  })

  it('does not include titleId in aria-labelledby when no title is present', () => {
    const { container } = renderAlert({ title: undefined })
    const root       = container.querySelector('.agds-page-alert')!
    const labelledBy = root.getAttribute('aria-labelledby') ?? ''
    // Should only contain the toneId
    const parts = labelledBy.split(' ').filter(Boolean)
    expect(parts).toHaveLength(1)
  })

  it('icon strip is aria-hidden="true"', () => {
    const { container } = renderAlert()
    const strip = container.querySelector('.agds-page-alert__strip')!
    expect(strip.getAttribute('aria-hidden')).toBe('true')
  })

  it.each([
    ['info',    'Information.'],
    ['success', 'Success.'],
    ['warning', 'Warning.'],
    ['error',   'Error.'],
  ] as const)(
    'sr-tone label for tone "%s" is "%s"',
    (tone, label) => {
      const { container } = renderAlert({ tone })
      const sr = container.querySelector('.agds-page-alert__sr-tone')!
      expect(sr.textContent?.trim()).toBe(label)
    },
  )
})

// ─── Props: onClose ───────────────────────────────────────────────────────────

describe('AGDSPageAlert — onClose prop', () => {
  it('does not render a close button when onClose is omitted', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-page-alert__close')).toBeNull()
  })

  it('renders a close button when onClose is provided', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(container.querySelector('.agds-page-alert__close')).toBeTruthy()
  })

  it('close button has type="button"', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(
      container.querySelector('.agds-page-alert__close')!.getAttribute('type'),
    ).toBe('button')
  })

  it('close button has aria-label="Close"', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(
      container.querySelector('.agds-page-alert__close')!.getAttribute('aria-label'),
    ).toBe('Close')
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const { container } = renderAlert({ onClose })
    await fireEvent.click(container.querySelector('.agds-page-alert__close')!)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders a close button when deprecated onDismiss is provided', () => {
    const { container } = renderAlert({ onDismiss: vi.fn() })
    expect(container.querySelector('.agds-page-alert__close')).toBeTruthy()
  })

  it('calls onDismiss when close is clicked (deprecated path)', async () => {
    const onDismiss = vi.fn()
    const { container } = renderAlert({ onDismiss })
    await fireEvent.click(container.querySelector('.agds-page-alert__close')!)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('prefers onClose over onDismiss when both are provided', async () => {
    const onClose   = vi.fn()
    const onDismiss = vi.fn()
    const { container } = renderAlert({ onClose, onDismiss })
    await fireEvent.click(container.querySelector('.agds-page-alert__close')!)
    expect(onClose).toHaveBeenCalledOnce()
    expect(onDismiss).not.toHaveBeenCalled()
  })
})

// ─── Props: tabIndex ──────────────────────────────────────────────────────────

describe('AGDSPageAlert — tabIndex prop', () => {
  it('has no tabindex by default', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-page-alert')!.getAttribute('tabindex')).toBeNull()
  })

  it('sets tabindex="-1" when focusOnMount=true', () => {
    const { container } = renderAlert({ focusOnMount: true })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('tabindex')).toBe('-1')
  })

  it('sets tabindex="-1" when focusOnUpdate is provided', () => {
    const { container } = renderAlert({ focusOnUpdate: 1 })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('tabindex')).toBe('-1')
  })

  it('uses the explicit tabIndex prop over the computed default', () => {
    const { container } = renderAlert({ tabIndex: 0 })
    expect(container.querySelector('.agds-page-alert')!.getAttribute('tabindex')).toBe('0')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSPageAlert — axe accessibility', () => {
  it.each(TONES)(
    'has no violations: tone=%s, title only',
    async (tone) => {
      const { container } = renderAlert({ tone })
      await runAxe(container, AXE_OPTS)
    },
  )

  it.each(TONES)(
    'has no violations: tone=%s, with body slot',
    async (tone) => {
      const { container } = renderAlert({ tone }, { default: '<p>Additional detail.</p>' })
      await runAxe(container, AXE_OPTS)
    },
  )

  it('has no violations with a close button', async () => {
    const { container } = renderAlert({ tone: 'error', onClose: vi.fn() })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with no title', async () => {
    const { container } = renderAlert({ title: undefined }, { default: '<p>Body only.</p>' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with role="alert"', async () => {
    const { container } = renderAlert({ tone: 'error', role: 'alert' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with ariaLive="polite"', async () => {
    const { container } = renderAlert({ tone: 'info', ariaLive: 'polite' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with ariaLive="assertive"', async () => {
    const { container } = renderAlert({ tone: 'error', ariaLive: 'assertive' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with role="alert" and ariaLive="assertive"', async () => {
    const { container } = renderAlert({ tone: 'error', role: 'alert', ariaLive: 'assertive' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the alert contains an <img> with no alt text', async () => {
    const { container } = renderAlert()
    const img = document.createElement('img')
    img.setAttribute('src', 'alert.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
