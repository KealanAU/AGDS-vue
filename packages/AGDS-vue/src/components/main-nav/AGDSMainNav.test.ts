import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { runAxe } from '../../test/a11y'
import AGDSMainNav from './AGDSMainNav.vue'
import type { MainNavItem } from './mainNavTypes'

const items: MainNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
]

const secondaryItems: MainNavItem[] = [
  { label: 'Sign in', href: '/signin' },
]

const dropdownItems: MainNavItem[] = [
  {
    label: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
]

afterEach(() => {
  document.body.style.overflow = ''
})

// ── Render ──────────────────────────────────────────────────

describe('AGDSMainNav — render', () => {
  it('renders the banner landmark', () => {
    render(AGDSMainNav, { props: { items } })
    expect(screen.getByRole('banner')).toBeTruthy()
  })

  it('renders primary nav with correct aria-label', () => {
    render(AGDSMainNav, { props: { items } })
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeTruthy()
  })

  it('renders secondary nav with correct aria-label', () => {
    render(AGDSMainNav, { props: { items, secondaryItems } })
    expect(screen.getByRole('navigation', { name: 'Supplementary' })).toBeTruthy()
  })

  it('renders link items as <a> elements', () => {
    render(AGDSMainNav, { props: { items } })
    expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveProperty('href')
  })

  it('renders button items as <button> elements', () => {
    const buttonItems: MainNavItem[] = [{ label: 'Contact', onClick: vi.fn() }]
    render(AGDSMainNav, { props: { items: buttonItems } })
    expect(screen.getByRole('button', { name: 'Contact' })).toBeTruthy()
  })

  it('applies the id prop to the header element', () => {
    const { container } = render(AGDSMainNav, { props: { items, id: 'my-nav' } })
    expect(container.querySelector('#my-nav')).toBeTruthy()
  })
})

// ── Active path ─────────────────────────────────────────────

describe('AGDSMainNav — activePath', () => {
  it('marks the matching link with aria-current="page"', () => {
    render(AGDSMainNav, { props: { items, activePath: '/about' } })
    expect(screen.getByRole('link', { name: 'About' })).toHaveProperty('ariaCurrent', 'page')
  })

  it('does not mark non-matching links as current', () => {
    render(AGDSMainNav, { props: { items, activePath: '/about' } })
    // getAllByRole because the same link may appear in both the desktop list and mobile dialog
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    homeLinks.forEach((link) => {
      expect(link.getAttribute('aria-current')).toBeNull()
    })
  })

  it('performs longest-prefix match', () => {
    const prefixItems: MainNavItem[] = [
      { label: 'Root', href: '/' },
      { label: 'About', href: '/about' },
    ]
    render(AGDSMainNav, { props: { items: prefixItems, activePath: '/about/team' } })
    expect(screen.getByRole('link', { name: 'About' })).toHaveProperty('ariaCurrent', 'page')
    expect(screen.getByRole('link', { name: 'Root' }).getAttribute('aria-current')).toBeNull()
  })
})

// ── focusMode ────────────────────────────────────────────────

describe('AGDSMainNav — focusMode', () => {
  it('hides nav items when focusMode is true', () => {
    render(AGDSMainNav, { props: { items, focusMode: true } })
    expect(screen.queryByRole('navigation')).toBeNull()
  })

  it('still renders the bottom border element in focusMode', () => {
    const { container } = render(AGDSMainNav, { props: { items, focusMode: true } })
    expect(container.querySelector('.agds-main-nav__border')).toBeTruthy()
  })
})

// ── Hamburger & mobile dialog ────────────────────────────────

describe('AGDSMainNav — mobile menu', () => {
  it('renders a hamburger button when items are provided', () => {
    render(AGDSMainNav, { props: { items } })
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy()
  })

  it('hamburger has aria-expanded="false" when closed', () => {
    render(AGDSMainNav, { props: { items } })
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
  })

  it('opens the mobile dialog on hamburger click', async () => {
    render(AGDSMainNav, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('dialog', { name: 'Main menu' })).toBeTruthy()
  })

  it('closes the dialog when the Close button is clicked', async () => {
    render(AGDSMainNav, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    await fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('closes the dialog on Escape', async () => {
    render(AGDSMainNav, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const dialog = screen.getByRole('dialog', { name: 'Main menu' })
    await fireEvent.keyDown(dialog, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })
  })

  it('renders items in the mobile dialog', async () => {
    render(AGDSMainNav, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const dialog = screen.getByRole('dialog', { name: 'Main menu' })
    const links = dialog.querySelectorAll('a')
    expect(links.length).toBeGreaterThan(0)
  })

  it('does not render hamburger when no items', () => {
    render(AGDSMainNav, { props: {} })
    expect(screen.queryByRole('button', { name: 'Open menu' })).toBeNull()
  })
})

// ── Dropdown items ───────────────────────────────────────────

describe('AGDSMainNav — dropdown items', () => {
  it('renders a dropdown trigger button', () => {
    render(AGDSMainNav, { props: { items: dropdownItems } })
    // The dropdown button renders with the label text
    const buttons = screen.getAllByRole('button')
    const resourcesBtn = buttons.find((b) => b.textContent?.includes('Resources'))
    expect(resourcesBtn).toBeTruthy()
  })

  it('shows dropdown sub-links in mobile dialog', async () => {
    render(AGDSMainNav, { props: { items: dropdownItems } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const dialog = screen.getByRole('dialog', { name: 'Main menu' })
    expect(dialog.querySelector('a[href="/docs"]')).toBeTruthy()
    expect(dialog.querySelector('a[href="/api"]')).toBeTruthy()
  })
})

// ── Background variants ──────────────────────────────────────

describe('AGDSMainNav — background', () => {
  it('applies body class by default', () => {
    const { container } = render(AGDSMainNav, { props: { items } })
    expect(container.querySelector('.agds-main-nav--body')).toBeTruthy()
  })

  it('applies bodyAlt class when set', () => {
    const { container } = render(AGDSMainNav, { props: { items, background: 'bodyAlt' } })
    expect(container.querySelector('.agds-main-nav--bodyAlt')).toBeTruthy()
  })
})

// ── Button onClick ───────────────────────────────────────────

describe('AGDSMainNav — button items', () => {
  it('calls onClick when a button nav item is clicked', async () => {
    const onClick = vi.fn()
    const buttonItems: MainNavItem[] = [{ label: 'Contact', onClick }]
    render(AGDSMainNav, { props: { items: buttonItems } })
    await fireEvent.click(screen.getByRole('button', { name: 'Contact' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})

// ── Axe accessibility ────────────────────────────────────────

describe('AGDSMainNav — axe', () => {
  it('has no violations in default state', async () => {
    const { container } = render(AGDSMainNav, {
      props: { items, secondaryItems, activePath: '/about' },
    })
    await runAxe(container)
  })

  it('has no violations in focusMode', async () => {
    const { container } = render(AGDSMainNav, { props: { items, focusMode: true } })
    await runAxe(container)
  })

  it('has no violations when the mobile dialog is open', async () => {
    const { container } = render(AGDSMainNav, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    await screen.findByRole('dialog')
    await runAxe(document.body)
  })

  it('intentionally catches a missing label violation', async () => {
    const { container } = render({ template: '<a href="/test"></a>' })
    await expect(runAxe(container)).rejects.toThrow()
  })
})
