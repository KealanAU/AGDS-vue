import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSButton from './AGDSButton.vue'

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

test.describe('AGDSButton — WAI-ARIA APG — button pattern (real-browser, colour-contrast enabled)', () => {
  test('primary variant has correct role and accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      slots: { default: 'Submit' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('secondary variant has correct role and accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Cancel' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('tertiary variant has correct role and accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { variant: 'tertiary' },
      slots: { default: 'Learn more' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when disabled, the button must not be activatable and must expose
  // the disabled state (native disabled attribute satisfies aria-disabled).
  test('disabled state exposes aria-disabled and is not activatable', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // Verify the native disabled attribute is present (APG requirement).
    const btn = page.locator('button')
    await expect(btn).toBeDisabled()
  })

  // APG: loading state must communicate busy status to assistive technology
  // via aria-busy, and the button must not be activatable while loading.
  test('loading state exposes aria-busy and is not activatable', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { loading: true, loadingLabel: 'Submitting form' },
      slots: { default: 'Submit' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const btn = page.locator('button')
    await expect(btn).toHaveAttribute('aria-busy', 'true')
    await expect(btn).toBeDisabled()
  })

  test('sm size has correct role and accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('lg size has correct role and accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: accessible name must be present. When only an icon is slotted (no
  // visible text), an aria-label must supply the name — this test verifies
  // the button is still accessible in that scenario.
  test('icon-only button with aria-label has an accessible name', async ({ mount, page }) => {
    await mount(AGDSButton, {
      // aria-label falls through $attrs to the root <button> (inheritAttrs: true).
      // Cast needed because Playwright CT types only know declared props.
      props: { 'aria-label': 'Close' } as Record<string, unknown>,
      slots: { default: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>' },
    })
    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const btn = page.locator('button')
    await expect(btn).toHaveAttribute('aria-label', 'Close')
  })
})
