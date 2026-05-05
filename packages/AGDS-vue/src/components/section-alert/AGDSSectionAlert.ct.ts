import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSSectionAlert from './AGDSSectionAlert.vue'

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

test.describe('WAI-ARIA — SectionAlert live region (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: the root element defaults to role="region" and must have an
  // accessible name via aria-labelledby (composed of visually-hidden tone
  // label + title).
  test('has aria-labelledby referencing tone and title elements, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'errorHigh', title: 'This field is required' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const root = page.locator('.agds-section-alert')
    await expect(root).toHaveAttribute('aria-labelledby', /.+/)
  })

  // WAI-ARIA: when role="alert" is set the element acts as an assertive live
  // region, appropriate for inline validation errors injected after page load.
  test('role=alert makes it an assertive live region, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'errorHigh', title: 'Invalid date format', role: 'alert' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const root = page.locator('.agds-section-alert')
    await expect(root).toHaveAttribute('role', 'alert')
  })

  // Colour contrast: errorHigh (filled red icon, error-muted background).
  test('errorHigh tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'errorHigh', title: 'An error has occurred' },
      slots: { default: '<p>Please review and correct the issue.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: errorMedium (outline icon, neutral bg + error border).
  test('errorMedium tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'errorMedium', title: 'Please check your input' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: errorLow (outline icon, neutral bg + neutral border).
  test('errorLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'errorLow', title: 'Field needs attention' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: successHigh (filled green icon, success-muted background).
  test('successHigh tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'successHigh', title: 'Application submitted' },
      slots: { default: '<p>Your application has been received successfully.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: successMedium (outline icon, neutral bg + success border).
  test('successMedium tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'successMedium', title: 'Changes saved' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: successLow (outline icon, neutral bg + neutral border).
  test('successLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'successLow', title: 'Draft saved' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: warningHigh (filled amber icon, warning-muted background).
  test('warningHigh tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'warningHigh', title: 'Unsaved changes' },
      slots: { default: '<p>Your changes will be lost if you navigate away.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: warningMedium (outline icon, neutral bg + warning border).
  test('warningMedium tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'warningMedium', title: 'Review required' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: warningLow (outline icon, neutral bg + neutral border).
  test('warningLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'warningLow', title: 'Optional step' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: infoHigh (filled blue icon, info-muted background).
  test('infoHigh tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'infoHigh', title: 'Processing may take a moment' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: infoMedium (outline icon, neutral bg + info border).
  test('infoMedium tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'infoMedium', title: 'Additional information' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: infoLow (outline icon, neutral bg + neutral border).
  test('infoLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'infoLow', title: 'Helpful tip' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: cannotStartLow (no-symbol outline icon, neutral bg).
  test('cannotStartLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'cannotStartLow', title: 'Cannot start yet' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: inProgressLow (arrow-path outline icon, neutral bg).
  test('inProgressLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'inProgressLow', title: 'Processing your request' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: notStartedLow (clock outline icon, neutral bg).
  test('notStartedLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'notStartedLow', title: 'Not yet started' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: pausedLow (pause-circle outline icon, neutral bg).
  test('pausedLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'pausedLow', title: 'On hold' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Colour contrast: unknownLow (help outline icon, neutral bg).
  test('unknownLow tone is axe-clean (colour contrast)', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: { tone: 'unknownLow', title: 'Status unknown' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Dismissible: close button must have an accessible name (WCAG 4.1.2).
  test('dismissible: close button has accessible name and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: {
        tone: 'infoHigh',
        title: 'Close this alert',
        onClose: () => {},
      },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toBeVisible()
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })

  // Dismissible error: combines role=alert + close button.
  test('dismissible errorHigh: role=alert, close button has accessible name, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSectionAlert, {
      props: {
        tone: 'errorHigh',
        title: 'Fix this error',
        role: 'alert',
        onClose: () => {},
      },
      slots: { default: '<p>Correct the issue and try again.</p>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const root = page.locator('.agds-section-alert')
    await expect(root).toHaveAttribute('role', 'alert')

    const closeBtn = page.locator('button[aria-label="Close"]')
    await expect(closeBtn).toHaveAttribute('aria-label', 'Close')
  })
})
