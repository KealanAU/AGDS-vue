import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSDetails from './AGDSDetails.vue'

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
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — disclosure pattern (real-browser, colour-contrast enabled)', () => {
  // APG disclosure pattern: the summary trigger must be visible and the panel
  // content must be hidden when the component is in its collapsed (default) state.
  test('collapsed — summary trigger is visible, panel content is hidden', async ({ mount, page }) => {
    await mount(AGDSDetails, {
      props: { label: 'More information' },
      slots: { default: '<p>Detail content</p>' },
    })

    // The native <summary> element is always visible as the disclosure trigger.
    const summary = page.locator('summary.agds-details__summary')
    await expect(summary).toBeVisible()

    // The <details> element should not have the open attribute in collapsed state.
    const details = page.locator('details.agds-details')
    await expect(details).not.toHaveAttribute('open')

    // The content div exists in the DOM but is hidden from view because the
    // native <details> element collapses it when not open.
    const content = page.locator('.agds-details__content')
    await expect(content).not.toBeVisible()
  })

  // APG disclosure pattern: activating the trigger must expand the panel,
  // set the open attribute on the <details> element (which the browser uses
  // to represent the expanded state), and make the panel content visible.
  test('expanded — open attribute is set and panel content is visible', async ({ mount, page }) => {
    await mount(AGDSDetails, {
      props: { label: 'More information' },
      slots: { default: '<p>Detail content</p>' },
    })

    const summary = page.locator('summary.agds-details__summary')
    await summary.click()

    // Native <details> uses the open attribute to represent expanded state —
    // browsers expose this as aria-expanded=true on the summary's button role.
    const details = page.locator('details.agds-details')
    await expect(details).toHaveAttribute('open')

    // Panel content must be visible to all users when expanded.
    const content = page.locator('.agds-details__content')
    await expect(content).toBeVisible()
    await expect(content).toContainText('Detail content')
  })

  // APG disclosure pattern: axe must find no violations in the collapsed state,
  // including colour-contrast of the summary trigger text.
  test('axe-clean in collapsed (default) state', async ({ mount, page }) => {
    await mount(AGDSDetails, {
      props: { label: 'More information' },
      slots: { default: '<p>Detail content</p>' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG disclosure pattern: axe must find no violations in the expanded state,
  // including colour-contrast of the revealed panel content.
  test('axe-clean in expanded state', async ({ mount, page }) => {
    await mount(AGDSDetails, {
      props: { label: 'More information' },
      slots: { default: '<p>Detail content</p>' },
    })

    const summary = page.locator('summary.agds-details__summary')
    await summary.click()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when an icon is present the icon wrapper must supply an accessible
  // name via role=img + aria-label so AT users receive the informational meaning.
  test('iconBefore — icon has accessible name, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDetails, {
      props: { label: 'More information', iconBefore: true },
      slots: { default: '<p>Detail content</p>' },
    })

    const icon = page.locator('.agds-details__icon-before')
    await expect(icon).toHaveAttribute('role', 'img')
    await expect(icon).toHaveAttribute('aria-label', 'Information.')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
