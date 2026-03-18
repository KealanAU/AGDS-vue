import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSDetails from './AGDSDetails.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderDetails(
  props: Record<string, unknown> = {},
  slot = '<p>Detail content</p>',
) {
  return render(AGDSDetails, {
    props: { label: 'More information', ...props },
    slots: { default: slot },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSDetails — rendering', () => {
  it('renders a <details> element', () => {
    const { container } = renderDetails()
    expect(container.querySelector('details.agds-details')).toBeTruthy()
  })

  it('renders a <summary> trigger with the label', () => {
    const { getByText } = renderDetails()
    expect(getByText('More information')).toBeTruthy()
  })

  it('renders the default slot content', () => {
    const { getByText } = renderDetails({}, '<p>Body text</p>')
    expect(getByText('Body text')).toBeTruthy()
  })

  it('renders content inside the content div', () => {
    const { container } = renderDetails()
    expect(container.querySelector('.agds-details__content')).toBeTruthy()
  })
})

// ─── Props: label ─────────────────────────────────────────────────────────────

describe('AGDSDetails — label prop', () => {
  it('renders the provided label text', () => {
    const { getByText } = renderDetails({ label: 'Show details' })
    expect(getByText('Show details')).toBeTruthy()
  })
})

// ─── Props: iconBefore ────────────────────────────────────────────────────────

describe('AGDSDetails — iconBefore prop', () => {
  it('does not render the icon by default', () => {
    const { container } = renderDetails()
    expect(container.querySelector('.agds-details__icon-before')).toBeNull()
  })

  it('renders the info icon when iconBefore=true', () => {
    const { container } = renderDetails({ iconBefore: true })
    expect(container.querySelector('.agds-details__icon-before')).toBeTruthy()
  })

  it('icon wrapper has role="img" and aria-label="Information."', () => {
    const { container } = renderDetails({ iconBefore: true })
    const icon = container.querySelector('.agds-details__icon-before')
    expect(icon!.getAttribute('role')).toBe('img')
    expect(icon!.getAttribute('aria-label')).toBe('Information.')
  })

  it('SVG inside icon wrapper has aria-hidden="true"', () => {
    const { container } = renderDetails({ iconBefore: true })
    const svg = container.querySelector('.agds-details__icon-before svg')
    expect(svg!.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Props: onBodyAlt ─────────────────────────────────────────────────────────

describe('AGDSDetails — onBodyAlt prop', () => {
  it('does not apply body-alt class by default', () => {
    const { container } = renderDetails()
    expect(container.querySelector('.agds-details__content--body-alt')).toBeNull()
  })

  it('applies body-alt class when onBodyAlt=true', () => {
    const { container } = renderDetails({ onBodyAlt: true })
    expect(container.querySelector('.agds-details__content--body-alt')).toBeTruthy()
  })
})

// ─── Chevron ──────────────────────────────────────────────────────────────────

describe('AGDSDetails — chevron', () => {
  it('renders a chevron SVG', () => {
    const { container } = renderDetails()
    expect(container.querySelector('.agds-details__chevron')).toBeTruthy()
  })

  it('chevron SVG has aria-hidden="true"', () => {
    const { container } = renderDetails()
    const chevron = container.querySelector('.agds-details__chevron')
    expect(chevron!.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Semantics ────────────────────────────────────────────────────────────────

describe('AGDSDetails — semantics', () => {
  it('summary is a <summary> element', () => {
    const { container } = renderDetails()
    expect(container.querySelector('details > summary')).toBeTruthy()
  })

  it('details is not open by default', () => {
    const { container } = renderDetails()
    const details = container.querySelector('details')
    expect(details!.hasAttribute('open')).toBe(false)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSDetails — axe accessibility', () => {
  it('has no violations with default props', async () => {
    const { container } = renderDetails()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with iconBefore=true', async () => {
    const { container } = renderDetails({ iconBefore: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with onBodyAlt=true', async () => {
    const { container } = renderDetails({ onBodyAlt: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with all props set', async () => {
    const { container } = renderDetails({ iconBefore: true, onBodyAlt: true, label: 'More info' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the container holds an <img> with no alt text', async () => {
    const { container } = renderDetails()
    const img = document.createElement('img')
    img.setAttribute('src', 'info.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
