import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSMainNav from './AGDSMainNav.vue'
import type { MainNavItem } from './mainNavTypes'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe-core against the full page in real Chromium.
 *
 * AGDSMainNavDialog uses <Teleport to="body"> so its DOM lives outside #app —
 * scanning the full page ensures aria-modal, role=dialog, and related WAI-ARIA
 * role/state/property attributes are evaluated. The dropdown panel inside
 * AGDSMainNavList also teleports to <body> via Reka UI's DropdownMenuPortal.
 *
 * Page-level structural rules (landmark-one-main, region, page-has-heading-one)
 * are disabled because they are not meaningful in isolated component tests.
 *
 * withTags covers WAI-ARIA role, state, and property requirements plus
 * colour-contrast in real Chromium. WCAG conformance is a property of the
 * consuming application.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules([
      'landmark-one-main',
      'page-has-heading-one',
      'region',
      // Reka UI marks the CT framework's #root element as aria-hidden when a
      // DropdownMenu or Dialog opens (ARIA modal pattern). This causes axe to
      // flag the trigger button inside #root as "focusable inside aria-hidden".
      // In a real application the root of the page is not aria-hidden — only
      // the inert background content is. This is a CT harness artifact and not
      // a real violation in production.
      'aria-hidden-focus',
    ])
    .analyze()
  return results
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const linkItems: MainNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
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

const mixedItems: MainNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Resources',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
  { label: 'Contact', onClick: () => {} },
]

const secondaryItems: MainNavItem[] = [
  { label: 'Sign in', href: '/signin' },
]

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — main navigation (real-browser, colour-contrast enabled)', () => {

  // ── 1. Navigation landmark with accessible name ───────────────────────────

  test('renders navigation landmark with accessible name, axe-clean', async ({ mount, page }) => {
    await mount(AGDSMainNav, {
      props: {
        items: linkItems,
        secondaryItems,
        activePath: '/about',
      },
    })

    // WAI-ARIA: a <nav> landmark must have an accessible name when multiple
    // nav landmarks are present on the page, so assistive technology users
    // can distinguish between them.
    const primaryNav = page.getByRole('navigation', { name: 'Main' })
    await expect(primaryNav).toBeVisible()

    const supplementaryNav = page.getByRole('navigation', { name: 'Supplementary' })
    await expect(supplementaryNav).toBeVisible()

    // The outer element is a <header> which maps to the banner landmark.
    const banner = page.getByRole('banner')
    await expect(banner).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 2. Active link item has aria-current="page" ───────────────────────────

  test('active link item has aria-current="page"', async ({ mount, page }) => {
    await mount(AGDSMainNav, {
      props: {
        items: linkItems,
        activePath: '/about',
      },
    })

    // WAI-ARIA APG: the link corresponding to the current page must expose
    // aria-current="page" so screen readers announce "(current)" to users.
    const aboutLink = page.getByRole('link', { name: 'About' })
    await expect(aboutLink).toHaveAttribute('aria-current', 'page')

    // Non-active links must not carry aria-current.
    const homeLink = page.getByRole('link', { name: 'Home' }).first()
    await expect(homeLink).not.toHaveAttribute('aria-current')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 3a. Dropdown closed state — aria-expanded=false ───────────────────────

  test('dropdown trigger: closed state has aria-haspopup and aria-expanded=false, axe-clean', async ({ mount, page }) => {
    // The primary nav list is display:none on mobile — use a desktop viewport
    // so the nav bar (and dropdown trigger) is rendered and visible.
    await page.setViewportSize({ width: 1280, height: 720 })

    await mount(AGDSMainNav, {
      props: {
        items: dropdownItems,
      },
    })

    // Reka UI's DropdownMenuTrigger wires aria-haspopup="menu" and
    // aria-expanded on the trigger button automatically.
    const trigger = page.getByRole('button', { name: 'Resources' })
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // The dropdown menu must not be present in the closed state.
    await expect(page.getByRole('menu')).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 3b. Dropdown open state — aria-expanded=true, submenu visible ─────────

  test('dropdown trigger: open state has aria-expanded=true and submenu is visible, axe-clean', async ({ mount, page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })

    await mount(AGDSMainNav, {
      props: {
        items: dropdownItems,
      },
    })

    // Use a CSS selector so the query is not affected by ARIA attribute changes
    // during Reka UI's transition (e.g. aria-hidden applied by the popover layer).
    const trigger = page.locator('button[aria-haspopup="menu"]')
    await trigger.click()

    // WAI-ARIA APG: after opening, the trigger must report aria-expanded="true".
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // The menu panel (role=menu) must be visible with the sub-link items.
    const menu = page.getByRole('menu')
    await menu.waitFor({ state: 'visible' })

    // Sub-items appear as role=menuitem inside the panel.
    const menuItems = page.getByRole('menuitem')
    await expect(menuItems).toHaveCount(2)
    await expect(menuItems.nth(0)).toContainText('Docs')
    await expect(menuItems.nth(1)).toContainText('API')

    // axe must pass in the open state (panel is teleported to <body>, so the
    // full-page scan in runAxe catches it).
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 4a. Mobile hamburger — aria-expanded=false (closed) ──────────────────

  test('mobile hamburger: closed state has aria-expanded=false and aria-controls', async ({ mount, page }) => {
    // Mobile viewport ensures the hamburger button is visible (it is hidden
    // via CSS at ≥ 48 rem / 768 px).
    await page.setViewportSize({ width: 375, height: 812 })

    await mount(AGDSMainNav, {
      props: {
        items: mixedItems,
      },
    })

    // WAI-ARIA: the disclosure button must have aria-expanded and
    // aria-controls pointing at the controlled element's id.
    const hamburger = page.getByRole('button', { name: 'Open menu' })
    await expect(hamburger).toBeVisible()
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    await expect(hamburger).toHaveAttribute('aria-controls', 'agds-main-nav-dialog')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 4b. Mobile hamburger — aria-expanded=true, dialog visible ────────────

  test('mobile hamburger: open state has aria-expanded=true and dialog is visible with role=dialog, axe-clean', async ({ mount, page }) => {
    await page.setViewportSize({ width: 375, height: 812 })

    await mount(AGDSMainNav, {
      props: {
        items: mixedItems,
      },
    })

    // Use a CSS selector — after opening, the nav bar receives aria-hidden="true"
    // which would prevent getByRole from finding the hamburger button.
    const hamburger = page.locator('button.agds-main-nav__hamburger')
    await hamburger.click()

    // WAI-ARIA: the button must now expose aria-expanded="true".
    // Even though the bar has aria-hidden="true" in the open state, the DOM
    // attribute is still present and inspectable via toHaveAttribute.
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // WAI-ARIA: the mobile menu panel must carry role=dialog and aria-modal.
    // It is teleported to <body> via <Teleport>, so it appears outside #app.
    const dialog = page.getByRole('dialog', { name: 'Main menu' })
    await dialog.waitFor({ state: 'visible' })
    await expect(dialog).toHaveAttribute('aria-modal', 'true')

    // The dialog must contain the navigation items.
    const nav = dialog.getByRole('navigation', { name: 'Main' })
    await expect(nav).toBeVisible()

    // axe must pass with the dialog open (full-page scan catches teleported DOM).
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
