import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSButtonLink from './AGDSButtonLink.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

function renderLink(props: Record<string, unknown> = {}, slot = 'Apply now') {
  return render(AGDSButtonLink, {
    props: { href: '/apply', ...props },
    slots: { default: slot },
  })
}

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('AGDSButtonLink — rendering', () => {
  it('renders an <a> element', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link')).toBeTruthy()
  })

  it('sets the href attribute', () => {
    const { getByRole } = renderLink({ href: '/about' })
    expect(getByRole('link').getAttribute('href')).toBe('/about')
  })

  it('renders slot content', () => {
    const { getByText } = renderLink({}, 'Get started')
    expect(getByText('Get started')).toBeTruthy()
  })

  it('applies base agds-button class', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').className).toContain('agds-button')
  })
})

// ─── Props: variant ────────────────────────────────────────────────────────────

describe('AGDSButtonLink — variant prop', () => {
  it('defaults to primary variant', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').className).toContain('agds-button--primary')
  })

  it.each(['primary', 'secondary', 'tertiary'] as const)(
    'applies agds-button--%s class for variant="%s"',
    (variant) => {
      const { getByRole } = renderLink({ variant })
      expect(getByRole('link').className).toContain(`agds-button--${variant}`)
    },
  )
})

// ─── Props: size ──────────────────────────────────────────────────────────────

describe('AGDSButtonLink — size prop', () => {
  it('defaults to md size', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').className).toContain('agds-button--md')
  })

  it.each(['sm', 'md', 'lg'] as const)(
    'applies agds-button--%s class for size="%s"',
    (size) => {
      const { getByRole } = renderLink({ size })
      expect(getByRole('link').className).toContain(`agds-button--${size}`)
    },
  )
})

// ─── Props: block ──────────────────────────────────────────────────────────────

describe('AGDSButtonLink — block prop', () => {
  it('does not apply block class by default', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').className).not.toContain('agds-button--block')
  })

  it('applies agds-button--block when block=true', () => {
    const { getByRole } = renderLink({ block: true })
    expect(getByRole('link').className).toContain('agds-button--block')
  })
})

// ─── Props: external ──────────────────────────────────────────────────────────

describe('AGDSButtonLink — external prop', () => {
  it('does not set target or rel by default', () => {
    const { getByRole } = renderLink()
    expect(getByRole('link').getAttribute('target')).toBeNull()
    expect(getByRole('link').getAttribute('rel')).toBeNull()
  })

  it('sets target="_blank" when external=true', () => {
    const { getByRole } = renderLink({ external: true })
    expect(getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('sets rel="noopener noreferrer" when external=true', () => {
    const { getByRole } = renderLink({ external: true })
    expect(getByRole('link').getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('renders sr-only "opens in a new tab" text when external=true', () => {
    const { getByText } = renderLink({ external: true })
    expect(getByText(', opens in a new tab')).toBeTruthy()
  })

  it('does not render sr-only text when not external', () => {
    const { queryByText } = renderLink()
    expect(queryByText(', opens in a new tab')).toBeNull()
  })
})

// ─── Icon slots ───────────────────────────────────────────────────────────────

describe('AGDSButtonLink — icon slots', () => {
  it('renders iconBefore slot content', () => {
    const { container } = render(AGDSButtonLink, {
      props: { href: '/apply' },
      slots: {
        default: 'Apply now',
        iconBefore: '<svg data-testid="icon-before" />',
      },
    })
    expect(container.querySelector('[data-testid="icon-before"]')).toBeTruthy()
  })

  it('wraps iconBefore in an aria-hidden span', () => {
    const { container } = render(AGDSButtonLink, {
      props: { href: '/apply' },
      slots: {
        default: 'Apply now',
        iconBefore: '<svg />',
      },
    })
    const iconWrapper = container.querySelector('.agds-button__icon')
    expect(iconWrapper?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders iconAfter slot content', () => {
    const { container } = render(AGDSButtonLink, {
      props: { href: '/apply' },
      slots: {
        default: 'Apply now',
        iconAfter: '<svg data-testid="icon-after" />',
      },
    })
    expect(container.querySelector('[data-testid="icon-after"]')).toBeTruthy()
  })
})

// ─── Events ───────────────────────────────────────────────────────────────────

describe('AGDSButtonLink — events', () => {
  it('emits click when clicked', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.click(getByRole('link'))
    expect(emitted().click).toHaveLength(1)
  })

  it('emits click with MouseEvent payload', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.click(getByRole('link'))
    expect(emitted().click[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('emits focus when focused', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.focus(getByRole('link'))
    expect(emitted().focus).toHaveLength(1)
  })

  it('emits blur when blurred', async () => {
    const { getByRole, emitted } = renderLink()
    await fireEvent.blur(getByRole('link'))
    expect(emitted().blur).toHaveLength(1)
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSButtonLink — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderLink()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when variant=secondary', async () => {
    const { container } = renderLink({ variant: 'secondary' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when external=true', async () => {
    const { container } = renderLink({ external: true })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the link has no accessible name', async () => {
    const { container } = render(AGDSButtonLink, {
      props: { href: '/apply' },
      slots: { default: '' },
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
