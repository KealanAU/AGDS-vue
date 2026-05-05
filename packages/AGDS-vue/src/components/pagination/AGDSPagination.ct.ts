import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSPagination from './AGDSPagination.vue'
import AGDSPaginationButtons from './AGDSPaginationButtons.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * withTags: WAI-ARIA role/state/property coverage + colour-contrast in real
 * Chromium. WCAG conformance is a property of the consuming application, not
 * an isolated component.
 *
 * Page-level structural rules are disabled because component tests run in a
 * minimal HTML page that intentionally lacks those page-structure landmarks.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

const generateHref = (pageNumber: number) => `/page/${pageNumber}`

// ─── Tests: AGDSPagination (link-based) ──────────────────────────────────────

test.describe('WAI-ARIA APG — pagination navigation (real-browser, colour-contrast enabled)', () => {
  // ── 1. role=navigation + axe-clean ───────────────────────────────────────

  test('has role=navigation with accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 3,
        totalPages: 10,
        generateHref,
      },
    })

    const nav = page.locator('nav')
    await expect(nav).toHaveAttribute('aria-label', 'Pagination')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('accepts a custom aria-label on the navigation landmark', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 3,
        totalPages: 10,
        generateHref,
        ariaLabel: 'Search results pagination',
      },
    })

    const nav = page.locator('nav')
    await expect(nav).toHaveAttribute('aria-label', 'Search results pagination')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 2. aria-current="page" on the active page ─────────────────────────────

  test('current page link has aria-current="page"', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 3,
        totalPages: 10,
        generateHref,
      },
    })

    // Exactly one element should carry aria-current="page".
    const currentLinks = page.locator('[aria-current="page"]')
    await expect(currentLinks).toHaveCount(1)
    await expect(currentLinks.first()).toHaveAttribute('aria-label', 'Go to page 3')
  })

  // ── 3. Previous not present on page 1 ────────────────────────────────────

  test('previous link is absent when on page 1', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        generateHref,
      },
    })

    // usePagination omits the direction item entirely on the first page.
    const prev = page.locator('[aria-label="Go to previous page"]')
    await expect(prev).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 4. Next not present on last page ─────────────────────────────────────

  test('next link is absent when on the last page', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
        generateHref,
      },
    })

    const next = page.locator('[aria-label="Go to next page"]')
    await expect(next).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 5. Page number links have accessible names ────────────────────────────

  test('page number links have accessible names that include the page number', async ({ mount, page }) => {
    await mount(AGDSPagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        generateHref,
      },
    })

    // Every page link must expose an accessible name containing its page number.
    for (let p = 1; p <= 5; p++) {
      const link = page.locator(`[aria-label="Go to page ${p}"]`)
      await expect(link).toHaveCount(1)
    }
  })
})

// ─── Tests: AGDSPaginationButtons (button-based) ─────────────────────────────

test.describe('WAI-ARIA APG — pagination navigation buttons variant (real-browser, colour-contrast enabled)', () => {
  // ── 1. role=navigation + axe-clean ───────────────────────────────────────

  test('has role=navigation with accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSPaginationButtons, {
      props: {
        currentPage: 3,
        totalPages: 10,
      },
    })

    const nav = page.locator('nav')
    await expect(nav).toHaveAttribute('aria-label', 'Pagination')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 2. aria-current="page" on the active page ─────────────────────────────

  test('current page button has aria-current="page"', async ({ mount, page }) => {
    await mount(AGDSPaginationButtons, {
      props: {
        currentPage: 3,
        totalPages: 10,
      },
    })

    const currentButtons = page.locator('[aria-current="page"]')
    await expect(currentButtons).toHaveCount(1)
    await expect(currentButtons.first()).toHaveAttribute('aria-label', 'Go to page 3')
  })

  // ── 3. Previous not present on page 1 ────────────────────────────────────

  test('previous button is absent when on page 1', async ({ mount, page }) => {
    await mount(AGDSPaginationButtons, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    const prev = page.locator('[aria-label="Go to previous page"]')
    await expect(prev).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 4. Next not present on last page ─────────────────────────────────────

  test('next button is absent when on the last page', async ({ mount, page }) => {
    await mount(AGDSPaginationButtons, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    const next = page.locator('[aria-label="Go to next page"]')
    await expect(next).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── 5. Page number buttons have accessible names ──────────────────────────

  test('page number buttons have accessible names that include the page number', async ({ mount, page }) => {
    await mount(AGDSPaginationButtons, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    for (let p = 1; p <= 5; p++) {
      const btn = page.locator(`[aria-label="Go to page ${p}"]`)
      await expect(btn).toHaveCount(1)
    }
  })
})
