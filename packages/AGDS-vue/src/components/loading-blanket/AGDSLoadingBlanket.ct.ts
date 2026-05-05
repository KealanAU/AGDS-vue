import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSLoadingBlanket from './AGDSLoadingBlanket.vue'

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
 * withTags covers WAI-ARIA role/state/property requirements and colour-contrast
 * in real Chromium. WCAG conformance is a property of the consuming application.
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

test.describe('WAI-ARIA — loading blanket busy state (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: active/visible state must expose a live region so assistive
  // technology is informed of the loading state without requiring focus movement.
  // role="status" (polite) is used for the inline variant.
  test('inline active state: live region present, label accessible, axe-clean', async ({ mount, page }) => {
    await mount(AGDSLoadingBlanket, {
      props: { label: 'Loading' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // The label paragraph must carry role="status" (polite live region).
    const label = page.locator('.agds-loading-blanket__label')
    await expect(label).toHaveAttribute('role', 'status')
    await expect(label).toHaveText('Loading')

    // Decorative dots must be hidden from AT.
    const dots = page.locator('.agds-loading-dots')
    await expect(dots).toHaveAttribute('aria-hidden', 'true')
  })

  // WAI-ARIA: fullScreen variant uses role="alert" (assertive) to demand
  // immediate attention, appropriate for a viewport-blocking overlay.
  test('fullScreen active state: assertive live region, label accessible, axe-clean', async ({ mount, page }) => {
    await mount(AGDSLoadingBlanket, {
      props: { label: 'Saving your changes', fullScreen: true },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const label = page.locator('.agds-loading-blanket__label')
    await expect(label).toHaveAttribute('role', 'alert')
    await expect(label).toHaveText('Saving your changes')

    // Decorative dots must be hidden from AT.
    const dots = page.locator('.agds-loading-dots')
    await expect(dots).toHaveAttribute('aria-hidden', 'true')
  })

  // Colour-contrast: label text must meet the 4.5:1 ratio (WCAG 1.4.3) on the
  // default (light) background. Real Chromium computes the actual contrast ratio
  // from resolved CSS custom properties, so this test is meaningful.
  test('inline label colour contrast passes in real Chromium', async ({ mount, page }) => {
    await mount(AGDSLoadingBlanket, {
      props: { label: 'Loading content' },
    })

    // Run axe limited to colour-contrast only so the failure message is precise.
    const results = await new AxeBuilder({ page })
      .include('#app')
      .withTags(['wcag2aa'])
      .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  // Colour-contrast: fullScreen overlay uses inverse (light) text on a dark
  // semi-transparent overlay. Real Chromium resolves the blended colour so
  // this test catches any token regression that drops contrast below 4.5:1.
  test('fullScreen label colour contrast passes on dark overlay in real Chromium', async ({ mount, page }) => {
    await mount(AGDSLoadingBlanket, {
      props: { label: 'Loading content', fullScreen: true },
    })

    const results = await new AxeBuilder({ page })
      .include('#app')
      .withTags(['wcag2aa'])
      .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
