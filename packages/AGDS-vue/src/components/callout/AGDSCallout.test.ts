import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSCallout from './AGDSCallout.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderCallout(
  props: Record<string, unknown> = {},
  slot = '<p>Callout content</p>',
) {
  return render(AGDSCallout, {
    props,
    slots: { default: slot },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSCallout — rendering', () => {
  it('renders a <div> by default', () => {
    const { container } = renderCallout()
    expect(container.querySelector('div.agds-callout')).toBeTruthy()
  })

  it('renders the default slot content', () => {
    const { getByText } = renderCallout({}, '<p>Important notice</p>')
    expect(getByText('Important notice')).toBeTruthy()
  })

  it('renders the title when provided', () => {
    const { getByText } = renderCallout({ title: 'Watch out' })
    expect(getByText('Watch out')).toBeTruthy()
  })

  it('does not render a title element when title is omitted', () => {
    const { container } = renderCallout()
    expect(container.querySelector('.agds-callout__title')).toBeNull()
  })
})

// ─── Props: as ───────────────────────────────────────────────────────────────

describe('AGDSCallout — as prop', () => {
  it('renders as <aside> when as="aside"', () => {
    const { container } = renderCallout({ as: 'aside' })
    expect(container.querySelector('aside.agds-callout')).toBeTruthy()
  })

  it('renders as <section> when as="section"', () => {
    const { container } = renderCallout({ as: 'section' })
    expect(container.querySelector('section.agds-callout')).toBeTruthy()
  })
})

// ─── Props: tone ─────────────────────────────────────────────────────────────

describe('AGDSCallout — tone prop', () => {
  it('defaults to neutral tone', () => {
    const { container } = renderCallout()
    expect(container.querySelector('.agds-callout--neutral')).toBeTruthy()
  })

  it.each(['neutral', 'info'] as const)(
    'applies agds-callout--%s class for tone="%s"',
    (tone) => {
      const { container } = renderCallout({ tone })
      expect(container.querySelector(`.agds-callout--${tone}`)).toBeTruthy()
    },
  )

  it('shows the default info icon when tone=info and no icon slot is provided', () => {
    const { container } = renderCallout({ tone: 'info' })
    expect(container.querySelector('.agds-callout__icon')).toBeTruthy()
  })

  it('does not render an icon for neutral tone by default', () => {
    const { container } = renderCallout({ tone: 'neutral' })
    expect(container.querySelector('.agds-callout__icon')).toBeNull()
  })
})

// ─── Props: variant ───────────────────────────────────────────────────────────

describe('AGDSCallout — variant prop', () => {
  it('defaults to regular variant', () => {
    const { container } = renderCallout()
    expect(container.querySelector('.agds-callout--regular')).toBeTruthy()
  })

  it.each(['compact', 'regular', 'feature'] as const)(
    'applies agds-callout--%s class for variant="%s"',
    (variant) => {
      const { container } = renderCallout({ variant })
      expect(container.querySelector(`.agds-callout--${variant}`)).toBeTruthy()
    },
  )
})

// ─── Props: onBodyAlt ─────────────────────────────────────────────────────────

describe('AGDSCallout — onBodyAlt prop', () => {
  it('applies body-alt class when onBodyAlt=true and tone=neutral', () => {
    const { container } = renderCallout({ tone: 'neutral', onBodyAlt: true })
    expect(container.querySelector('.agds-callout--body-alt')).toBeTruthy()
  })

  it('does not apply body-alt class by default', () => {
    const { container } = renderCallout()
    expect(container.querySelector('.agds-callout--body-alt')).toBeNull()
  })

  it('does not apply body-alt class when tone=info', () => {
    const { container } = renderCallout({ tone: 'info', onBodyAlt: true })
    expect(container.querySelector('.agds-callout--body-alt')).toBeNull()
  })

  it('applies body-alt class when deprecated background="shadeAlt" with neutral tone', () => {
    const { container } = renderCallout({ tone: 'neutral', background: 'shadeAlt' })
    expect(container.querySelector('.agds-callout--body-alt')).toBeTruthy()
  })
})

// ─── Slots ────────────────────────────────────────────────────────────────────

describe('AGDSCallout — icon slot', () => {
  it('renders a custom icon slot', () => {
    const { container } = render(AGDSCallout, {
      props: { tone: 'neutral' },
      slots: {
        default: '<p>Content</p>',
        icon: '<span data-testid="custom-icon">★</span>',
      },
    })
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeTruthy()
  })

  it('uses the custom icon slot instead of the default info icon', () => {
    const { container } = render(AGDSCallout, {
      props: { tone: 'info' },
      slots: {
        default: '<p>Content</p>',
        icon: '<span data-testid="custom-icon">★</span>',
      },
    })
    // Custom icon present, default SVG should not be
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeTruthy()
    expect(container.querySelector('svg')).toBeNull()
  })
})

// ─── Info icon accessibility ──────────────────────────────────────────────────

describe('AGDSCallout — info icon a11y', () => {
  it('info icon has role="img" and aria-label="Information"', () => {
    const { container } = renderCallout({ tone: 'info' })
    const icon = container.querySelector('[role="img"]')
    expect(icon).toBeTruthy()
    expect(icon!.getAttribute('aria-label')).toBe('Information')
  })

  it('info SVG has aria-hidden="true" since the wrapping span carries the label', () => {
    const { container } = renderCallout({ tone: 'info' })
    const svg = container.querySelector('svg')
    expect(svg!.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSCallout — axe accessibility', () => {
  it('has no violations: tone=neutral, variant=regular', async () => {
    const { container } = renderCallout({ tone: 'neutral', variant: 'regular' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=neutral, variant=compact', async () => {
    const { container } = renderCallout({ tone: 'neutral', variant: 'compact' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=neutral, variant=feature', async () => {
    const { container } = renderCallout({ tone: 'neutral', variant: 'feature' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=info, variant=regular', async () => {
    const { container } = renderCallout({ tone: 'info', variant: 'regular' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=info, variant=compact', async () => {
    const { container } = renderCallout({ tone: 'info', variant: 'compact' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=info, variant=feature', async () => {
    const { container } = renderCallout({ tone: 'info', variant: 'feature' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a title', async () => {
    const { container } = renderCallout({ tone: 'info', title: 'Note' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations rendered as aside', async () => {
    const { container } = renderCallout({ as: 'aside', 'aria-label': 'Information callout' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when onBodyAlt=true', async () => {
    const { container } = renderCallout({ tone: 'neutral', onBodyAlt: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the container holds an <img> with no alt text', async () => {
    // Verify runAxe correctly catches real violations.
    const { container } = renderCallout()
    const img = document.createElement('img')
    img.setAttribute('src', 'notice.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
