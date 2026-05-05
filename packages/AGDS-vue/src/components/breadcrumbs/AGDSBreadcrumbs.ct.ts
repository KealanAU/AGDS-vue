import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSBreadcrumbs from './AGDSBreadcrumbs.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * Page-level structural rules (landmark-one-main, page-has-heading-one,
 * region) are disabled because component tests run in a minimal HTML page
 * that intentionally lacks those page-structure landmarks — they are not
 * meaningful violations for isolated component tests.
 *
 * withTags covers WAI-ARIA role, state, and property requirements plus
 * colour-contrast in real Chromium. WCAG conformance is a property of
 * the consuming application, not an isolated component test.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — breadcrumbs navigation (real-browser, colour-contrast enabled)', () => {
  // APG: breadcrumbs must be wrapped in a <nav> with an accessible label,
  // contain an ordered list, and each item must be a link inside a <li>.
  // Use a 2-item list to avoid the mobile collapse toggle (which adds a
  // non-link <li>) so we can assert exact link and item counts.
  test('has nav element with aria-label, ordered list of links, and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSBreadcrumbs, {
      props: {
        links: [
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
        ],
      },
    })

    const nav = page.locator('nav')
    await expect(nav).toHaveAttribute('aria-label', 'Breadcrumbs')

    const list = nav.locator('ol')
    await expect(list).toBeVisible()

    // 2-item list: 2 <li> elements, each wrapping a link.
    // No toggle is injected because there are no middle items.
    const items = list.locator('li')
    await expect(items).toHaveCount(2)

    const links = list.locator('a')
    await expect(links).toHaveCount(2)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: the last breadcrumb item representing the current page must have
  // aria-current="page" on its link element.
  test('last item has aria-current="page"', async ({ mount, page }) => {
    await mount(AGDSBreadcrumbs, {
      props: {
        links: [
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Widgets', href: '/products/widgets' },
        ],
      },
    })

    const links = page.locator('nav ol a')
    const count = await links.count()
    const lastLink = links.nth(count - 1)

    await expect(lastLink).toHaveAttribute('aria-current', 'page')

    // Earlier links must not have aria-current
    for (let i = 0; i < count - 1; i++) {
      await expect(links.nth(i)).not.toHaveAttribute('aria-current', 'page')
    }
  })

  // Edge case: single-item breadcrumb — the component renders only the last
  // (current) item when links.length === 1. Must still be axe-clean.
  test('single-item breadcrumb (edge case) is axe-clean', async ({ mount, page }) => {
    await mount(AGDSBreadcrumbs, {
      props: {
        links: [{ label: 'Home', href: '/' }],
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
