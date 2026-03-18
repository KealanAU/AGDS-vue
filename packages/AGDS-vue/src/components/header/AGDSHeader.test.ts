import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSHeader from './AGDSHeader.vue'

// jsdom has no computed styles — disable colour-contrast rule for all tests.
const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderHeader(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return render(AGDSHeader, { props, slots })
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSHeader — rendering', () => {
  it('renders a <header> landmark element', () => {
    const { getByRole } = renderHeader({ heading: 'Department of Example' })
    expect(getByRole('banner')).toBeTruthy()
  })

  it('renders the heading text', () => {
    const { getByText } = renderHeader({ heading: 'Australian Taxation Office' })
    expect(getByText('Australian Taxation Office')).toBeTruthy()
  })

  it('renders a link wrapping the heading', () => {
    const { getByRole } = renderHeader({ heading: 'My Service' })
    const link = getByRole('link', { name: 'My Service' })
    expect(link).toBeTruthy()
  })

  it('defaults the heading link href to "/"', () => {
    const { getByRole } = renderHeader({ heading: 'My Service' })
    const link = getByRole('link', { name: 'My Service' })
    expect(link.getAttribute('href')).toBe('/')
  })

  it('uses the provided href for the heading link', () => {
    const { getByRole } = renderHeader({ heading: 'My Service', href: '/home' })
    const link = getByRole('link', { name: 'My Service' })
    expect(link.getAttribute('href')).toBe('/home')
  })
})

// ─── Props: background ────────────────────────────────────────────────────────

describe('AGDSHeader — background prop', () => {
  it('defaults to body background', () => {
    const { getByRole } = renderHeader({ heading: 'Test' })
    expect(getByRole('banner').className).toContain('agds-header--body')
  })

  it.each(['body', 'bodyAlt'] as const)(
    'applies agds-header--%s class for background="%s"',
    (background) => {
      const { getByRole } = renderHeader({ heading: 'Test', background })
      expect(getByRole('banner').className).toContain(`agds-header--${background}`)
    },
  )
})

// ─── Props: size ──────────────────────────────────────────────────────────────

describe('AGDSHeader — size prop', () => {
  it('defaults to md size', () => {
    const { getByRole } = renderHeader({ heading: 'Test' })
    expect(getByRole('banner').className).toContain('agds-header--md')
  })

  it.each(['sm', 'md'] as const)(
    'applies agds-header--%s class for size="%s"',
    (size) => {
      const { getByRole } = renderHeader({ heading: 'Test', size })
      expect(getByRole('banner').className).toContain(`agds-header--${size}`)
    },
  )
})

// ─── Props: maxWidth ──────────────────────────────────────────────────────────

describe('AGDSHeader — maxWidth prop', () => {
  it('defaults to container', () => {
    const { container } = renderHeader({ heading: 'Test' })
    const inner = container.querySelector('.agds-header__inner')
    expect(inner?.className).toContain('agds-header__inner--container')
  })

  it.each(['container', 'containerLg'] as const)(
    'applies inner--%s class for maxWidth="%s"',
    (maxWidth) => {
      const { container } = renderHeader({ heading: 'Test', maxWidth })
      const inner = container.querySelector('.agds-header__inner')
      expect(inner?.className).toContain(`agds-header__inner--${maxWidth}`)
    },
  )
})

// ─── Props: subline ───────────────────────────────────────────────────────────

describe('AGDSHeader — subline prop', () => {
  it('renders subline text when provided', () => {
    const { getByText } = renderHeader({ heading: 'My Service', subline: 'Helping Australians' })
    expect(getByText('Helping Australians')).toBeTruthy()
  })

  it('does not render subline element when not provided', () => {
    const { container } = renderHeader({ heading: 'My Service' })
    expect(container.querySelector('.agds-header-brand__subline')).toBeNull()
  })
})

// ─── Props: badgeLabel ────────────────────────────────────────────────────────

describe('AGDSHeader — badgeLabel prop', () => {
  it('renders badge text when provided', () => {
    const { getByText } = renderHeader({ heading: 'My Service', badgeLabel: 'Beta' })
    expect(getByText('Beta')).toBeTruthy()
  })

  it('applies badge CSS class', () => {
    const { container } = renderHeader({ heading: 'My Service', badgeLabel: 'Beta' })
    expect(container.querySelector('.agds-header-brand__badge')).toBeTruthy()
  })

  it('does not render badge when badgeLabel is not provided', () => {
    const { container } = renderHeader({ heading: 'My Service' })
    expect(container.querySelector('.agds-header-brand__badge')).toBeNull()
  })
})

// ─── Single-logo layout ───────────────────────────────────────────────────────

describe('AGDSHeader — single logo slot', () => {
  it('renders logo slot content', () => {
    const { getByAltText } = renderHeader(
      { heading: 'ATO' },
      { logo: '<img src="ato.svg" alt="Australian Taxation Office logo">' },
    )
    expect(getByAltText('Australian Taxation Office logo')).toBeTruthy()
  })

  it('logo is wrapped in a decorative element (aria-hidden)', () => {
    const { container } = renderHeader(
      { heading: 'ATO' },
      { logo: '<img src="ato.svg" alt="logo">' },
    )
    const logoWrap = container.querySelector('.agds-header-brand__logo-wrap')
    expect(logoWrap?.getAttribute('aria-hidden')).toBe('true')
  })

  it('entire brand is a single link in single-logo mode', () => {
    const { getAllByRole } = renderHeader(
      { heading: 'ATO' },
      { logo: '<img src="ato.svg" alt="logo">' },
    )
    // Only the single brand link should be present — no extra logo links
    const links = getAllByRole('link')
    expect(links).toHaveLength(1)
  })

  it('single brand link href defaults to "/"', () => {
    const { getByRole } = renderHeader(
      { heading: 'ATO' },
      { logo: '<img src="ato.svg" alt="logo">' },
    )
    expect(getByRole('link').getAttribute('href')).toBe('/')
  })
})

// ─── Dual-logo layout ─────────────────────────────────────────────────────────

describe('AGDSHeader — dual logo slots', () => {
  const dualSlots = {
    logo: '<img src="primary.svg" alt="Department of Home Affairs">',
    secondLogo: '<img src="secondary.svg" alt="Australian Border Force">',
  }

  it('renders both logo slots', () => {
    const { getByAltText } = renderHeader({ heading: 'Home Affairs' }, dualSlots)
    expect(getByAltText('Department of Home Affairs')).toBeTruthy()
    expect(getByAltText('Australian Border Force')).toBeTruthy()
  })

  it('renders a separate heading link in dual-logo mode', () => {
    const { getByRole } = renderHeader({ heading: 'Home Affairs' }, dualSlots)
    expect(getByRole('link', { name: 'Home Affairs' })).toBeTruthy()
  })

  it('primary logo link href matches heading href', () => {
    const { getAllByRole } = renderHeader(
      { heading: 'Home Affairs', href: '/home-affairs' },
      dualSlots,
    )
    const links = getAllByRole('link') as HTMLAnchorElement[]
    const logoLink = links.find(l => l.querySelector('img[alt="Department of Home Affairs"]'))
    expect(logoLink?.getAttribute('href')).toBe('/home-affairs')
  })

  it('second logo renders as <span> when secondHref is not provided', () => {
    const { container } = renderHeader({ heading: 'Home Affairs' }, dualSlots)
    const logos = container.querySelectorAll('.agds-header-brand__logo-link')
    // second logo-link element should be a span (no href)
    const secondEl = logos[1]
    expect(secondEl.tagName.toLowerCase()).toBe('span')
  })

  it('second logo renders as <a> when secondHref is provided', () => {
    const { container } = renderHeader(
      { heading: 'Home Affairs', secondHref: '/abf' },
      dualSlots,
    )
    const logos = container.querySelectorAll('.agds-header-brand__logo-link')
    const secondEl = logos[1]
    expect(secondEl.tagName.toLowerCase()).toBe('a')
    expect(secondEl.getAttribute('href')).toBe('/abf')
  })

  it('applies dividerPosition=between class by default (after)', () => {
    const { container } = renderHeader(
      { heading: 'Home Affairs', dividerPosition: 'between' },
      dualSlots,
    )
    expect(container.querySelector('.agds-header-brand__divider--between')).toBeTruthy()
  })

  it('renders after-divider when dividerPosition=after', () => {
    const { container } = renderHeader(
      { heading: 'Home Affairs', dividerPosition: 'after' },
      dualSlots,
    )
    expect(container.querySelector('.agds-header-brand__divider--after')).toBeTruthy()
  })
})

// ─── Right content slot ───────────────────────────────────────────────────────

describe('AGDSHeader — rightContent slot', () => {
  it('renders right content slot when provided', () => {
    const { getByRole } = renderHeader(
      { heading: 'My Service' },
      { rightContent: '<nav aria-label="Header navigation"><ul><li><a href="/search">Search</a></li></ul></nav>' },
    )
    expect(getByRole('navigation', { name: 'Header navigation' })).toBeTruthy()
  })

  it('does not render right column when slot is absent', () => {
    const { container } = renderHeader({ heading: 'My Service' })
    expect(container.querySelector('.agds-header__right-col')).toBeNull()
  })

  it('adds brand-col--with-right class when right content present', () => {
    const { container } = renderHeader(
      { heading: 'My Service' },
      { rightContent: '<nav aria-label="test nav"><a href="#">Link</a></nav>' },
    )
    const brandCol = container.querySelector('.agds-header__brand-col')
    expect(brandCol?.className).toContain('agds-header__brand-col--with-right')
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSHeader — axe accessibility', () => {
  it('has no violations in minimal state (heading only)', async () => {
    const { container } = renderHeader({ heading: 'Department of Agriculture, Fisheries and Forestry' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with subline and badge', async () => {
    const { container } = renderHeader({
      heading: 'My Service',
      subline: 'Making it easier',
      badgeLabel: 'Beta',
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in bodyAlt background', async () => {
    const { container } = renderHeader({ heading: 'My Service', background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations in size=sm', async () => {
    const { container } = renderHeader({ heading: 'My Service', size: 'sm' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with single logo slot', async () => {
    const { container } = render(AGDSHeader, {
      props: { heading: 'ATO', href: '/' },
      slots: { logo: '<img src="ato.svg" alt="Australian Taxation Office logo">' },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with dual logo slots', async () => {
    const { container } = render(AGDSHeader, {
      props: { heading: 'Home Affairs', href: '/' },
      slots: {
        logo: '<img src="primary.svg" alt="Department of Home Affairs">',
        secondLogo: '<img src="secondary.svg" alt="Australian Border Force">',
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with right content slot', async () => {
    const { container } = render(AGDSHeader, {
      props: { heading: 'My Service' },
      slots: {
        rightContent: '<nav aria-label="Main navigation"><ul><li><a href="/about">About</a></li></ul></nav>',
      },
    })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with containerLg maxWidth', async () => {
    const { container } = renderHeader({ heading: 'My Service', maxWidth: 'containerLg' })
    await runAxe(container, AXE_OPTS)
  })

  it('has a violation when the header landmark has no accessible heading', async () => {
    // Verify the axe helper catches real violations — render an empty banner
    // with no heading inside it (the heading is empty, so no accessible name).
    const { container } = render(AGDSHeader, {
      props: { heading: '' },
    })
    // The header link will have an empty name, triggering a violation.
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
