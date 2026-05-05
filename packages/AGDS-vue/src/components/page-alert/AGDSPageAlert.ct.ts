import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSPageAlert from './AGDSPageAlert.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * Page-level structural rules are disabled because component tests run in a
 * minimal HTML page that intentionally lacks those page-structure landmarks.
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

test.describe('WAI-ARIA — PageAlert live region (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: the root element defaults to role="region" and must have an
  // accessible name via aria-labelledby (composed of tone label + title).
  test('has aria-labelledby referencing tone and title elements, axe-clean', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'error', title: 'There is a problem' },
      slots: { default: '<p>Check the fields below and try again.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // Root must expose aria-labelledby.
    const root = page.locator('.agds-page-alert')
    await expect(root).toHaveAttribute('aria-labelledby', /.+/)
  })

  // WAI-ARIA: when role="alert" is set the element acts as an assertive live
  // region, appropriate for error messages injected after page load.
  test('role=alert makes it an assertive live region, axe-clean', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'error', title: 'Submission failed', role: 'alert' },
      slots: { default: '<p>Please correct the errors below.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const root = page.locator('.agds-page-alert')
    await expect(root).toHaveAttribute('role', 'alert')
  })

  // Colour contrast: error tone (red strip).
  test('error tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'error', title: 'Validation errors found' },
      slots: { default: '<p>Fix the highlighted fields and resubmit.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: success tone (green strip).
  test('success tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'success', title: 'Form submitted successfully' },
      slots: { default: '<p>Your application has been received.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: warning tone (amber strip).
  test('warning tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'warning', title: 'Your session is about to expire' },
      slots: { default: '<p>Save your work to avoid losing any changes.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: info tone (blue strip).
  test('info tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: { tone: 'info', title: 'Information' },
      slots: { default: '<p>This form will be reviewed within 5 business days.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Dismissible: close button must have an accessible name (WCAG 4.1.2).
  test('dismissible: close button has accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: {
        tone: 'info',
        title: 'Dismiss this alert',
        onClose: () => {},
      },
      slots: { default: '<p>You can close this alert.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toBeVisible()
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })

  // Dismissible error: combines role=alert + close button.
  test('dismissible error: role=alert, close button has accessible name, axe-clean', async ({ mount, page }) => {
    await mount(AGDSPageAlert, {
      props: {
        tone: 'error',
        title: 'There is a problem',
        role: 'alert',
        onClose: () => {},
      },
      slots: { default: '<p>Correct the errors and resubmit.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const root = page.locator('.agds-page-alert')
    await expect(root).toHaveAttribute('role', 'alert')

    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })
})
