import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSGlobalAlert from './AGDSGlobalAlert.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderAlert(
  props: Record<string, unknown> = {},
  slot = '<p>Alert body content.</p>',
) {
  return render(AGDSGlobalAlert, {
    props,
    slots: { default: slot },
  })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSGlobalAlert — rendering', () => {
  it('renders a <section> element', () => {
    const { container } = renderAlert()
    expect(container.querySelector('section.agds-global-alert')).toBeTruthy()
  })

  it('renders the default slot content', () => {
    const { getByText } = renderAlert({}, '<p>Service disruption in progress.</p>')
    expect(getByText('Service disruption in progress.')).toBeTruthy()
  })

  it('renders the title when provided', () => {
    const { getByRole } = renderAlert({ title: 'System maintenance' })
    expect(getByRole('heading', { name: 'System maintenance' })).toBeTruthy()
  })

  it('does not render a title element when title is omitted', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-global-alert__title')).toBeNull()
  })

  it('renders the icon strip', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-global-alert__strip')).toBeTruthy()
  })
})

// ─── Props: tone ─────────────────────────────────────────────────────────────

describe('AGDSGlobalAlert — tone prop', () => {
  it('defaults to warning tone', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-global-alert--warning')).toBeTruthy()
  })

  it.each(['info', 'warning'] as const)(
    'applies agds-global-alert--%s class for tone="%s"',
    (tone) => {
      const { container } = renderAlert({ tone })
      expect(container.querySelector(`.agds-global-alert--${tone}`)).toBeTruthy()
    },
  )

  it('sets aria-label="Warning" for warning tone with no title', () => {
    const { container } = renderAlert({ tone: 'warning' })
    expect(container.querySelector('section')!.getAttribute('aria-label')).toBe('Warning')
  })

  it('sets aria-label="Information" for info tone with no title', () => {
    const { container } = renderAlert({ tone: 'info' })
    expect(container.querySelector('section')!.getAttribute('aria-label')).toBe('Information')
  })

  it('uses title as aria-label when title is provided', () => {
    const { container } = renderAlert({ title: 'Site-wide outage', tone: 'warning' })
    expect(container.querySelector('section')!.getAttribute('aria-label')).toBe('Site-wide outage')
  })
})

// ─── Props: onClose ───────────────────────────────────────────────────────────

describe('AGDSGlobalAlert — onClose prop', () => {
  it('does not render a close button when onClose is omitted', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-global-alert__close')).toBeNull()
  })

  it('renders a close button when onClose is provided', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(container.querySelector('.agds-global-alert__close')).toBeTruthy()
  })

  it('close button has aria-label="Close"', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    const btn = container.querySelector('.agds-global-alert__close')!
    expect(btn.getAttribute('aria-label')).toBe('Close')
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    const { container } = renderAlert({ onClose })
    const btn = container.querySelector('.agds-global-alert__close')!
    await fireEvent.click(btn)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('adds --with-close class to inner content when onClose is provided', () => {
    const { container } = renderAlert({ onClose: vi.fn() })
    expect(container.querySelector('.agds-global-alert__inner--with-close')).toBeTruthy()
  })

  it('does not add --with-close class when onClose is omitted', () => {
    const { container } = renderAlert()
    expect(container.querySelector('.agds-global-alert__inner--with-close')).toBeNull()
  })
})

// ─── Icon strip accessibility ─────────────────────────────────────────────────

describe('AGDSGlobalAlert — icon strip a11y', () => {
  it('icon strip is aria-hidden (tone conveyed by section aria-label)', () => {
    const { container } = renderAlert()
    const strip = container.querySelector('.agds-global-alert__strip')!
    expect(strip.getAttribute('aria-hidden')).toBe('true')
  })

  it('icon SVG has aria-hidden="true"', () => {
    const { container } = renderAlert({ tone: 'warning' })
    const svg = container.querySelector('.agds-global-alert__strip svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSGlobalAlert — axe accessibility', () => {
  it('has no violations: tone=warning, no title, no close', async () => {
    const { container } = renderAlert({ tone: 'warning' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=info, no title, no close', async () => {
    const { container } = renderAlert({ tone: 'info' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=warning, with title', async () => {
    const { container } = renderAlert({ tone: 'warning', title: 'System alert' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: tone=info, with title', async () => {
    const { container } = renderAlert({ tone: 'info', title: 'Information' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: with close button', async () => {
    const { container } = renderAlert({ tone: 'warning', onClose: vi.fn() })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations: with title and close button', async () => {
    const { container } = renderAlert({ tone: 'info', title: 'Note', onClose: vi.fn() })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the container holds an <img> with no alt text', async () => {
    const { container } = renderAlert()
    const img = document.createElement('img')
    img.setAttribute('src', 'alert.png')
    container.appendChild(img)
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
