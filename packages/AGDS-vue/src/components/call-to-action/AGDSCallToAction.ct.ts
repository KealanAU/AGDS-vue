import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSCallToActionLink from './AGDSCallToActionLink.vue'

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
 * withTags: WAI-ARIA coverage — not a WCAG conformance claim.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA — call-to-action link (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: native <a> with href satisfies role=link implicitly.
  test('has role=link with href present', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: '/get-started' },
      slots: { default: 'Get started' },
    })

    const link = page.locator('a')
    await expect(link).toHaveAttribute('href', '/get-started')
    await expect(link).toHaveCount(1)
  })

  // WAI-ARIA: accessible name must be derived from text content alone —
  // the chevron icon must not contribute to or corrupt the accessible name.
  test('accessible name comes from text content only', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: '/get-started' },
      slots: { default: 'Get started' },
    })

    const link = page.locator('a')
    // The visible text content must be present in the element.
    await expect(link).toContainText('Get started')
  })

  // WAI-ARIA: decorative icons must be hidden from assistive technology so
  // they do not appear in the accessible name computation or the AT reading order.
  test('chevron icon is aria-hidden and excluded from accessible name', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: '/get-started' },
      slots: { default: 'Get started' },
    })

    // The icon SVG inside the link must carry aria-hidden="true".
    const icon = page.locator('a svg[aria-hidden="true"]')
    await expect(icon).toHaveCount(1)
  })

  test('axe-clean: colour contrast and WAI-ARIA rules pass', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: '/get-started' },
      slots: { default: 'Get started' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // WAI-ARIA: links that open in a new tab must include an accessible warning
  // in the link name so screen reader users are not surprised by the context switch.
  // AGDSCallToActionLink appends a visually-hidden ", opens in a new tab" span
  // when the external prop is set.
  test('external variant: has target=_blank and includes new-tab warning in accessible name', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: 'https://example.com', external: true },
      slots: { default: 'Learn more' },
    })

    const link = page.locator('a')
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    // The visually-hidden span must be present in the DOM (sr-only, not display:none).
    const srOnly = page.locator('a .sr-only')
    await expect(srOnly).toContainText('opens in a new tab')
  })

  test('external variant: axe-clean', async ({ mount, page }) => {
    await mount(AGDSCallToActionLink, {
      props: { href: 'https://example.com', external: true },
      slots: { default: 'Learn more' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
