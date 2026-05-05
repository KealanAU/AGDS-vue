import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSGlobalAlert from './AGDSGlobalAlert.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * Page-level structural rules (landmark-one-main, page-has-heading-one,
 * region) are disabled because component tests run in a minimal HTML page
 * that intentionally lacks those page-structure landmarks.
 *
 * withTags: covers WAI-ARIA role/state/property requirements and colour
 * contrast in real Chromium. WCAG conformance is a property of the
 * consuming application, not this isolated component test.
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

test.describe('WAI-ARIA — GlobalAlert live region (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: the banner must have an accessible label (aria-label on the
  // <section>) so it is exposed as a named region landmark.
  test('has accessible name via aria-label and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: { tone: 'warning', title: 'Scheduled maintenance' },
      slots: { default: 'The service will be unavailable on Sunday.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // Section must be labelled so it is a named landmark.
    const section = page.locator('section')
    await expect(section).toHaveAttribute('aria-label', 'Scheduled maintenance')
  })

  // When role="alert" is set the element acts as an assertive live region.
  test('role=alert makes the banner an assertive live region, axe-clean', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: { tone: 'warning', role: 'alert', ariaLive: 'assertive' },
      slots: { default: 'Critical service outage in progress.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const section = page.locator('section')
    await expect(section).toHaveAttribute('role', 'alert')
    await expect(section).toHaveAttribute('aria-live', 'assertive')
  })

  // Colour contrast: warning tone (amber strip + body bg).
  test('warning tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: { tone: 'warning', title: 'Important notice' },
      slots: { default: 'Please be aware of the following information.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: info tone (blue strip + body bg).
  test('info tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: { tone: 'info', title: 'New feature available' },
      slots: { default: 'A new feature has been added to your account.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Dismissible: the close button must have an accessible name (WCAG 4.1.2).
  test('dismissible: close button has accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: {
        tone: 'info',
        title: 'Dismiss me',
        onClose: () => {},
      },
      slots: { default: 'This alert can be dismissed.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // Close button must have an accessible name.
    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toBeVisible()
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })

  // Dismissible warning tone: both tone colour contrast and close button.
  test('dismissible warning tone: close button has accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSGlobalAlert, {
      props: {
        tone: 'warning',
        title: 'Warning banner',
        onClose: () => {},
      },
      slots: { default: 'Dismiss this warning when resolved.' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })
})
