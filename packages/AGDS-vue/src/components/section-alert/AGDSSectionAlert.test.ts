import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AgDSSectionAlert from './AGDSSectionAlert.vue'
import { sectionAlertToneMap } from './sectionAlertUtils'
import type { SectionAlertTones, SectionAlertTone } from './sectionAlertUtils'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderAlert(
  props: Record<string, unknown> = {},
  slot = '',
) {
  return render(AgDSSectionAlert, {
    props: { title: 'Alert title', tone: 'infoHigh', ...props },
    slots: slot ? { default: slot } : undefined,
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AgDSSectionAlert — rendering', () => {
  it('renders a <div> with role="region" by default', () => {
    const { container } = renderAlert()
    const el = container.querySelector('div.agds-section-alert')
    expect(el).toBeTruthy()
    expect(el!.getAttribute('role')).toBe('region')
  })

  it('renders the title', () => {
    const { getByText } = renderAlert({ title: 'Save failed' })
    expect(getByText('Save failed')).toBeTruthy()
  })

  it('renders the default slot content', () => {
    const { getByText } = renderAlert({}, '<p>Please fix the errors below.</p>')
    expect(getByText('Please fix the errors below.')).toBeTruthy()
  })

  it('does not render body element when slot is empty', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-section-alert__content')).toBeNull()
  })

  it('renders an icon for every tone', () => {
    for (const tone of Object.keys(sectionAlertToneMap) as SectionAlertTones[]) {
      const { container } = renderAlert({ tone })
      expect(container.querySelector('.agds-section-alert__icon')).toBeTruthy()
    }
  })
})

// ─── Props: tone (resolved) ───────────────────────────────────────────────────

describe('AgDSSectionAlert — tone prop (new tones)', () => {
  it.each(Object.keys(sectionAlertToneMap) as SectionAlertTones[])(
    'applies agds-section-alert--%s class for tone="%s"',
    (tone) => {
      const { container } = renderAlert({ tone })
      expect(container.querySelector(`.agds-section-alert--${tone}`)).toBeTruthy()
    },
  )

  it('adds --enclosed modifier for Low and Medium tones', () => {
    const enclosedTones = (Object.keys(sectionAlertToneMap) as SectionAlertTones[]).filter(
      (t) => sectionAlertToneMap[t].enclosedBorder,
    )
    for (const tone of enclosedTones) {
      const { container } = renderAlert({ tone })
      expect(
        container.querySelector('.agds-section-alert--enclosed'),
        `expected ${tone} to have --enclosed modifier`,
      ).toBeTruthy()
    }
  })

  it('does NOT add --enclosed modifier for High tones', () => {
    const highTones: SectionAlertTones[] = ['errorHigh', 'infoHigh', 'successHigh', 'warningHigh']
    for (const tone of highTones) {
      const { container } = renderAlert({ tone })
      expect(
        container.querySelector('.agds-section-alert--enclosed'),
        `expected ${tone} to NOT have --enclosed modifier`,
      ).toBeNull()
    }
  })
})

// ─── Props: legacy tone aliases ───────────────────────────────────────────────

describe('AgDSSectionAlert — legacy tone aliases', () => {
  const legacyMap: Array<[SectionAlertTone, SectionAlertTones]> = [
    ['error',   'errorHigh'],
    ['success', 'successHigh'],
    ['warning', 'warningHigh'],
    ['info',    'infoHigh'],
  ]

  it.each(legacyMap)(
    'legacy tone "%s" resolves to class agds-section-alert--%s',
    (legacy, resolved) => {
      const { container } = renderAlert({ tone: legacy })
      expect(container.querySelector(`.agds-section-alert--${resolved}`)).toBeTruthy()
    },
  )

  it.each(legacyMap)(
    'legacy tone "%s" does NOT apply a class with the legacy name',
    (legacy) => {
      const { container } = renderAlert({ tone: legacy })
      expect(container.querySelector(`.agds-section-alert--${legacy}`)).toBeNull()
    },
  )

  it('legacy error tone is NOT enclosed (errorHigh has no enclosed border)', () => {
    const { container } = renderAlert({ tone: 'error' })
    expect(container.querySelector('.agds-section-alert--enclosed')).toBeNull()
  })
})

// ─── Props: role ──────────────────────────────────────────────────────────────

describe('AgDSSectionAlert — role prop', () => {
  it('defaults to role="region"', () => {
    const { container } = renderAlert()
    expect(container.querySelector('[role="region"]')).toBeTruthy()
  })

  it('uses a custom role when provided', () => {
    const { container } = renderAlert({ role: 'alert' })
    expect(container.querySelector('[role="alert"]')).toBeTruthy()
  })
})

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe('AgDSSectionAlert — ARIA', () => {
  it('has aria-labelledby referencing toneId and titleId', () => {
    const { container } = renderAlert()
    const root = container.querySelector('.agds-section-alert')!
    const labelledBy = root.getAttribute('aria-labelledby') ?? ''
    const srTone = container.querySelector('.agds-section-alert__sr-tone')
    const title  = container.querySelector('.agds-section-alert__title')
    expect(labelledBy).toContain(srTone!.id)
    expect(labelledBy).toContain(title!.id)
  })

  it('includes childrenId in aria-labelledby when slot is populated', () => {
    const { container } = renderAlert({}, '<p>Body text</p>')
    const root = container.querySelector('.agds-section-alert')!
    const labelledBy = root.getAttribute('aria-labelledby') ?? ''
    const body = container.querySelector('.agds-section-alert__content')
    expect(labelledBy).toContain(body!.id)
  })

  it('icon SVG has aria-hidden="true"', () => {
    const { container } = renderAlert({ tone: 'warningHigh' })
    const svg = container.querySelector('.agds-section-alert__icon')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
  })

  it('sr-tone span is present and holds the tone label', () => {
    const { container } = renderAlert({ tone: 'successHigh' })
    const sr = container.querySelector('.agds-section-alert__sr-tone')!
    expect(sr.textContent?.trim()).toBe('success')
  })

  it.each([
    ['cannotStartLow',  'cannot start'],
    ['errorHigh',       'error'],
    ['errorLow',        'error'],
    ['errorMedium',     'error'],
    ['infoHigh',        'information'],
    ['infoLow',         'information'],
    ['infoMedium',      'information'],
    ['inProgressLow',   'in progress'],
    ['notStartedLow',   'not started'],
    ['pausedLow',       'paused'],
    ['successHigh',     'success'],
    ['successLow',      'success'],
    ['successMedium',   'success'],
    ['unknownLow',      'unknown'],
    ['warningHigh',     'warning'],
    ['warningLow',      'warning'],
    ['warningMedium',   'warning'],
  ] as const)(
    'sr-tone label for "%s" is "%s"',
    (tone, label) => {
      const { container } = renderAlert({ tone })
      const sr = container.querySelector('.agds-section-alert__sr-tone')!
      expect(sr.textContent?.trim()).toBe(label)
    },
  )

  it('legacy tone sr-tone label for "info" is "information"', () => {
    const { container } = renderAlert({ tone: 'info' })
    const sr = container.querySelector('.agds-section-alert__sr-tone')!
    expect(sr.textContent?.trim()).toBe('information')
  })
})

// ─── Icon variant ─────────────────────────────────────────────────────────────

describe('AgDSSectionAlert — icon variant', () => {
  it('High tones render a filled SVG (fill="currentColor")', () => {
    for (const tone of ['errorHigh', 'infoHigh', 'successHigh', 'warningHigh'] as const) {
      const { container } = renderAlert({ tone })
      const svg = container.querySelector('.agds-section-alert__icon')!
      expect(svg.getAttribute('fill')).toBe('currentColor')
    }
  })

  it('Low and Medium tones render an outline SVG (fill="none")', () => {
    for (const tone of ['errorLow', 'infoMedium', 'warningLow', 'cannotStartLow'] as const) {
      const { container } = renderAlert({ tone })
      const svg = container.querySelector('.agds-section-alert__icon')!
      expect(svg.getAttribute('fill')).toBe('none')
      expect(svg.getAttribute('stroke')).toBe('currentColor')
    }
  })
})

// ─── Props: onClose ───────────────────────────────────────────────────────────

describe('AgDSSectionAlert — onClose prop', () => {
  it('does not render a close button when onClose is omitted', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-section-alert__close')).toBeNull()
  })

  it('renders a close button when onClose is provided', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(container.querySelector('.agds-section-alert__close')).toBeTruthy()
  })

  it('close button has type="button"', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(container.querySelector('.agds-section-alert__close')!.getAttribute('type')).toBe('button')
  })

  it('close button has aria-label="Close"', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(
      container.querySelector('.agds-section-alert__close')!.getAttribute('aria-label'),
    ).toBe('Close')
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const { container } = renderAlert({ onClose })
    await fireEvent.click(container.querySelector('.agds-section-alert__close')!)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders a close button when deprecated onDismiss is provided', () => {
    const { container } = renderAlert({ onDismiss: vi.fn() })
    expect(container.querySelector('.agds-section-alert__close')).toBeTruthy()
  })

  it('calls onDismiss when the close button is clicked (deprecated path)', async () => {
    const onDismiss = vi.fn()
    const { container } = renderAlert({ onDismiss })
    await fireEvent.click(container.querySelector('.agds-section-alert__close')!)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('prefers onClose over onDismiss when both are provided', async () => {
    const onClose  = vi.fn()
    const onDismiss = vi.fn()
    const { container } = renderAlert({ onClose, onDismiss })
    await fireEvent.click(container.querySelector('.agds-section-alert__close')!)
    expect(onClose).toHaveBeenCalledOnce()
    expect(onDismiss).not.toHaveBeenCalled()
  })
})

// ─── Props: tabIndex ──────────────────────────────────────────────────────────

describe('AgDSSectionAlert — tabIndex prop', () => {
  it('has no tabindex by default', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-section-alert')!.getAttribute('tabindex')).toBeNull()
  })

  it('sets tabindex="-1" when focusOnMount=true', () => {
    const { container } = renderAlert({ focusOnMount: true })
    expect(container.querySelector('.agds-section-alert')!.getAttribute('tabindex')).toBe('-1')
  })

  it('sets tabindex="-1" when focusOnUpdate is provided', () => {
    const { container } = renderAlert({ focusOnUpdate: 1 })
    expect(container.querySelector('.agds-section-alert')!.getAttribute('tabindex')).toBe('-1')
  })

  it('uses the explicit tabIndex prop over the computed default', () => {
    const { container } = renderAlert({ tabIndex: 0 })
    expect(container.querySelector('.agds-section-alert')!.getAttribute('tabindex')).toBe('0')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AgDSSectionAlert — axe accessibility', () => {
  it.each(Object.keys(sectionAlertToneMap) as SectionAlertTones[])(
    'has no violations: tone=%s, title only',
    async (tone) => {
      const { container } = renderAlert({ tone })
      await runAxe(container, AXE_OPTS)
    },
  )

  it.each(Object.keys(sectionAlertToneMap) as SectionAlertTones[])(
    'has no violations: tone=%s, with body slot',
    async (tone) => {
      const { container } = renderAlert({ tone }, '<p>Additional detail.</p>')
      await runAxe(container, AXE_OPTS)
    },
  )

  it('has no violations with a close button', async () => {
    const { container } = renderAlert({ tone: 'errorHigh', onClose: vi.fn() })
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
