import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSStatusBadge from './AGDSStatusBadge.vue'
import { statusBadgeToneMap } from './statusBadgeUtils'
import type { StatusBadgeTones } from './statusBadgeUtils'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// All modern tones, excluding the internal 'neutral' legacy key
const modernTones = Object.keys(statusBadgeToneMap).filter(
  (t) => t !== 'neutral',
) as StatusBadgeTones[]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderBadge(props: Record<string, unknown> = {}) {
  return render(AGDSStatusBadge, {
    props: { label: 'Pending', tone: 'infoHigh', ...props },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSStatusBadge — rendering', () => {
  it('renders a <span> root element', () => {
    const { container } = renderBadge()
    expect(container.querySelector('span.agds-status-badge')).toBeTruthy()
  })

  it('renders the label text', () => {
    const { getByText } = renderBadge({ label: 'Submitted' })
    expect(getByText('Submitted')).toBeTruthy()
  })

  it('renders an SVG icon for every modern tone', () => {
    for (const tone of modernTones) {
      const { container } = renderBadge({ tone })
      expect(
        container.querySelector('.agds-status-badge__icon'),
        `expected icon for tone="${tone}"`,
      ).toBeTruthy()
    }
  })

  it('renders an SVG icon for the legacy neutral tone', () => {
    const { container } = renderBadge({ tone: 'neutral' })
    expect(container.querySelector('.agds-status-badge__icon')).toBeTruthy()
  })
})

// ─── Props: tone (modern) ─────────────────────────────────────────────────────

describe('AGDSStatusBadge — tone prop (modern tones)', () => {
  it.each(modernTones)(
    'applies agds-status-badge--regular class with tone="%s"',
    (tone) => {
      const { container } = renderBadge({ tone })
      expect(container.querySelector('.agds-status-badge--regular')).toBeTruthy()
    },
  )
})

// ─── Props: appearance ────────────────────────────────────────────────────────

describe('AGDSStatusBadge — appearance prop', () => {
  it('defaults to regular appearance', () => {
    const { container } = renderBadge()
    expect(container.querySelector('.agds-status-badge--regular')).toBeTruthy()
    expect(container.querySelector('.agds-status-badge--subtle')).toBeNull()
  })

  it('applies --regular class when appearance="regular"', () => {
    const { container } = renderBadge({ appearance: 'regular' })
    expect(container.querySelector('.agds-status-badge--regular')).toBeTruthy()
  })

  it('applies --subtle class when appearance="subtle"', () => {
    const { container } = renderBadge({ appearance: 'subtle' })
    expect(container.querySelector('.agds-status-badge--subtle')).toBeTruthy()
    expect(container.querySelector('.agds-status-badge--regular')).toBeNull()
  })
})

// ─── Props: weight (deprecated) ──────────────────────────────────────────────

describe('AGDSStatusBadge — weight prop (deprecated)', () => {
  it('weight="subtle" applies --subtle class when appearance is not set', () => {
    const { container } = renderBadge({ weight: 'subtle' })
    expect(container.querySelector('.agds-status-badge--subtle')).toBeTruthy()
  })

  it('appearance takes precedence over weight', () => {
    const { container } = renderBadge({ appearance: 'regular', weight: 'subtle' })
    expect(container.querySelector('.agds-status-badge--regular')).toBeTruthy()
    expect(container.querySelector('.agds-status-badge--subtle')).toBeNull()
  })
})

// ─── Props: legacy tone aliases ───────────────────────────────────────────────

describe('AGDSStatusBadge — legacy tone aliases', () => {
  const legacyMap = [
    ['success', 'successMedium'],
    ['error',   'errorMedium'],
    ['info',    'infoMedium'],
    ['warning', 'warningMedium'],
  ] as const

  it.each(legacyMap)(
    'legacy tone "%s" renders the icon label for "%s"',
    (legacyTone, modernTone) => {
      const { container: legacyContainer } = renderBadge({ tone: legacyTone })
      const { container: modernContainer } = renderBadge({ tone: modernTone })

      const legacyIcon = legacyContainer.querySelector('.agds-status-badge__icon')!
      const modernIcon = modernContainer.querySelector('.agds-status-badge__icon')!

      expect(legacyIcon.getAttribute('aria-label')).toBe(
        modernIcon.getAttribute('aria-label'),
      )
    },
  )

  it('legacy tone "neutral" renders a dot icon (circle element)', () => {
    const { container } = renderBadge({ tone: 'neutral' })
    expect(container.querySelector('.agds-status-badge__icon circle')).toBeTruthy()
  })

  it('legacy tone "neutral" aria-label is "Status: neutral."', () => {
    const { container } = renderBadge({ tone: 'neutral' })
    expect(
      container.querySelector('.agds-status-badge__icon')!.getAttribute('aria-label'),
    ).toBe('Status: neutral.')
  })
})

// ─── ARIA ─────────────────────────────────────────────────────────────────────

describe('AGDSStatusBadge — ARIA', () => {
  it('icon has aria-hidden="false"', () => {
    const { container } = renderBadge()
    expect(
      container.querySelector('.agds-status-badge__icon')!.getAttribute('aria-hidden'),
    ).toBe('false')
  })

  it.each([
    ['cannotStartLow',  'Status: cannot start.'],
    ['errorHigh',       'Status: error.'],
    ['errorLow',        'Status: error.'],
    ['infoHigh',        'Status: information.'],
    ['infoMedium',      'Status: information.'],
    ['inProgressLow',   'Status: in progress.'],
    ['notStartedLow',   'Status: not started.'],
    ['pausedLow',       'Status: paused.'],
    ['successHigh',     'Status: success.'],
    ['unknownLow',      'Status: unknown.'],
    ['warningHigh',     'Status: warning.'],
    ['warningMedium',   'Status: warning.'],
  ] as const)(
    'icon aria-label for tone="%s" is "%s"',
    (tone, expectedLabel) => {
      const { container } = renderBadge({ tone })
      expect(
        container.querySelector('.agds-status-badge__icon')!.getAttribute('aria-label'),
      ).toBe(expectedLabel)
    },
  )
})

// ─── Icon variant ─────────────────────────────────────────────────────────────

describe('AGDSStatusBadge — icon variant', () => {
  it('High tones render a filled SVG (fill="currentColor")', () => {
    for (const tone of ['errorHigh', 'infoHigh', 'successHigh', 'warningHigh'] as const) {
      const { container } = renderBadge({ tone })
      expect(
        container.querySelector('.agds-status-badge__icon')!.getAttribute('fill'),
        `expected fill="currentColor" for tone="${tone}"`,
      ).toBe('currentColor')
    }
  })

  it('Low and Medium tones render an outline SVG (fill="none")', () => {
    for (const tone of ['errorLow', 'infoMedium', 'warningLow', 'cannotStartLow'] as const) {
      const { container } = renderBadge({ tone })
      const svg = container.querySelector('.agds-status-badge__icon')!
      expect(svg.getAttribute('fill'), `expected fill="none" for tone="${tone}"`).toBe('none')
      expect(svg.getAttribute('stroke')).toBe('currentColor')
    }
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSStatusBadge — axe accessibility', () => {
  it.each(modernTones)(
    'has no violations: tone=%s, appearance=regular',
    async (tone) => {
      const { container } = renderBadge({ tone })
      await runAxe(container, AXE_OPTS)
    },
  )

  it.each(modernTones)(
    'has no violations: tone=%s, appearance=subtle',
    async (tone) => {
      const { container } = renderBadge({ tone, appearance: 'subtle' })
      await runAxe(container, AXE_OPTS)
    },
  )

  it('has no violations: legacy neutral tone', async () => {
    const { container } = renderBadge({ tone: 'neutral' })
    await runAxe(container, AXE_OPTS)
  })

  it('intentionally fails: image without alt text', async () => {
    const { container } = renderBadge()
    const img = document.createElement('img')
    img.setAttribute('src', 'badge.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
