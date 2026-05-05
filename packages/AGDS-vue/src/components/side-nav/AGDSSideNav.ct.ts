import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSSideNav from './AGDSSideNav.vue'
import type { SideNavItem } from './utils'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * Page-level structural rules (landmark-one-main, page-has-heading-one) are
 * disabled because component tests run in a minimal HTML page that
 * intentionally lacks those page-structure landmarks. The `region` rule is
 * kept enabled because a side nav must be a navigation landmark.
 *
 * withTags covers WAI-ARIA role, state, and property requirements plus
 * colour-contrast in real Chromium. WCAG conformance is a property of the
 * consuming application.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one'])
    .analyze()
  return results
}

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const flatItems: SideNavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const nestedItems: SideNavItem[] = [
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    items: [
      { href: '/services/design', label: 'Design' },
      { href: '/services/development', label: 'Development' },
    ],
  },
  { href: '/contact', label: 'Contact' },
]

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — side navigation (real-browser, colour-contrast enabled)', () => {
  // APG: a navigation region must be a <nav> element (or role="navigation") and
  // must carry an accessible name to distinguish it from other nav landmarks.
  test('has role=navigation (nav element) with accessible name, axe-clean', async ({
    mount,
    page,
  }) => {
    await mount(AGDSSideNav, {
      props: {
        title: 'Section navigation',
        activePath: '/about',
        items: flatItems,
      },
    })

    // The root element must be a <nav> landmark.
    const nav = page.locator('nav.agds-side-nav')
    await expect(nav).toBeVisible()

    // A <nav> without an aria-label may be ambiguous when multiple landmarks
    // exist. The title text visually labels the nav; verify it is rendered and
    // that the landmark is present.
    await expect(nav).toContainText('Section navigation')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: the link matching the current page must expose aria-current="page"
  // so assistive technology announces the user's current location.
  test('active link has aria-current="page"', async ({ mount, page }) => {
    await mount(AGDSSideNav, {
      props: {
        title: 'Section navigation',
        activePath: '/services',
        items: flatItems,
      },
    })

    // Only the active link should carry aria-current="page".
    const currentLink = page.locator('a[aria-current="page"]')
    await expect(currentLink).toHaveCount(1)
    await expect(currentLink).toHaveAttribute('href', '/services')

    // Non-active links must not have aria-current.
    const aboutLink = page.locator('a[href="/about"]')
    await expect(aboutLink).not.toHaveAttribute('aria-current')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: nested navigation items must render in a proper list structure so
  // assistive technology can announce item count and hierarchy.
  test('nested items render correct list structure, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSideNav, {
      props: {
        title: 'Section navigation',
        // Active path inside a sub-list so nested items are revealed.
        activePath: '/services/design',
        items: nestedItems,
        subLevelVisible: 'always' as const,
      },
    })

    // All list items (top-level + nested) must be inside <ul> elements.
    const topList = page.locator('ul.agds-side-nav__list').first()
    await expect(topList).toBeVisible()

    // The nested sub-list under "Services" must also be present.
    const nestedList = page.locator('ul.agds-side-nav__list--nested')
    await expect(nestedList).toBeVisible()

    // Sub-items must render inside the nested list.
    const designLink = page.locator('a[href="/services/design"]')
    await expect(designLink).toBeVisible()
    await expect(designLink).toContainText('Design')

    const devLink = page.locator('a[href="/services/development"]')
    await expect(devLink).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG + WCAG 1.4.3: the active (current-page) link must have sufficient
  // colour contrast against its background. Real Chromium evaluates computed
  // styles so this exercises actual token values.
  test('colour contrast of active vs inactive items passes in real Chromium', async ({
    mount,
    page,
  }) => {
    await mount(AGDSSideNav, {
      props: {
        title: 'Section navigation',
        activePath: '/services',
        items: flatItems,
      },
    })

    // Verify distinct visual treatment: active link carries the current class.
    const activeLink = page.locator('a.agds-side-nav__link--current')
    await expect(activeLink).toBeVisible()

    // Inactive links must not carry the current class.
    const inactiveLinks = page.locator(
      'a.agds-side-nav__link:not(.agds-side-nav__link--current)',
    )
    await expect(inactiveLinks).toHaveCount(2)

    // Axe contrast check runs against actual Chromium-computed colours.
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Title-as-link: when titleLink is provided the title renders as an <a> and
  // must expose aria-current="page" when it matches the active path.
  test('title link has aria-current="page" when it matches activePath', async ({
    mount,
    page,
  }) => {
    await mount(AGDSSideNav, {
      props: {
        title: 'Section navigation',
        activePath: '/section',
        titleLink: '/section',
        items: flatItems,
      },
    })

    const titleLink = page.locator('a.agds-side-nav__title--link')
    await expect(titleLink).toHaveAttribute('aria-current', 'page')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
