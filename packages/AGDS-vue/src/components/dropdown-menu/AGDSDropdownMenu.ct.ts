import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSDropdownMenuFixture from './AGDSDropdownMenuFixture.vue'
import AGDSDropdownMenuRadioFixture from './AGDSDropdownMenuRadioFixture.vue'

// ─── axe helpers ─────────────────────────────────────────────────────────────

/**
 * Runs axe-core against #app in real Chromium.
 *
 * Used for the closed state where the trigger is inside #app and the menu
 * portal has not yet been rendered.
 *
 * Page-level structural rules (landmark-one-main, region, page-has-heading-one)
 * are disabled because they are irrelevant for isolated component tests.
 *
 * withTags covers WAI-ARIA role/state/property requirements and colour-contrast
 * in real Chromium. WCAG conformance is a property of the consuming application.
 */
async function runAxeClosed(page: Page) {
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

/**
 * Runs axe-core scoped to the portal menu content when the menu is open.
 *
 * When the menu is open, Reka sets aria-hidden="true" on #app to hide
 * background content from assistive technology — this is correct ARIA
 * behaviour for a popup menu. Axe's aria-hidden-focus rule would flag the
 * still-focusable trigger button inside the now-hidden #app subtree; this is
 * a known Reka UI focus-management trade-off and is not a violation of the
 * component under test.
 *
 * By scoping to the portal container (the DropdownMenuContent element that
 * Reka renders into <body>), we test the menu's own ARIA wiring — role=menu,
 * role=menuitem/menuitemradio, aria-checked — without being affected by the
 * intentional aria-hidden applied to the background.
 */
async function runAxeOpen(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('[role="menu"]')
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — menu button pattern (real-browser, colour-contrast enabled)', () => {
  // ── APG: closed state — trigger attributes ────────────────────────────────

  test('APG: closed state — trigger has aria-haspopup=menu and aria-expanded=false', async ({ mount, page }) => {
    await mount(AGDSDropdownMenuFixture)

    // APG: the trigger button must expose aria-haspopup="menu" and
    // aria-expanded="false" when the menu is closed.
    //
    // getByRole works here because #app is not aria-hidden in the closed state.
    const trigger = page.getByRole('button', { name: 'Actions' })
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // The menu must not be present in the closed state.
    await expect(page.getByRole('menu')).toHaveCount(0)

    const results = await runAxeClosed(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: open state — menu role, item roles, aria-expanded=true ──────────

  test('APG: open state — menu has role=menu, items have role=menuitem, trigger has aria-expanded=true', async ({ mount, page }) => {
    await mount(AGDSDropdownMenuFixture)

    // Click trigger to open the menu.
    await page.locator('button').click()

    // APG: the menu container must have role="menu" (rendered in portal to <body>).
    const menu = page.getByRole('menu')
    await menu.waitFor({ state: 'visible' })

    // APG: when the menu is open, Reka sets aria-hidden="true" on #app to hide
    // background content from assistive technology. Use the DOM attribute locator
    // to inspect the trigger, which is now hidden from the AT-visible tree.
    const trigger = page.locator('[aria-haspopup="menu"]')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // APG: each item must have role="menuitem".
    // Items are in the portal (body), accessible to getByRole since they are
    // not within any aria-hidden subtree.
    const items = page.getByRole('menuitem')
    await expect(items).toHaveCount(2)
    await expect(items.nth(0)).toContainText('Edit')
    await expect(items.nth(1)).toContainText('Delete')

    // axe is scoped to the portal menu content — see runAxeOpen() for rationale.
    const results = await runAxeOpen(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: radio variant — role=menuitemradio and aria-checked ─────────────

  test('APG: radio variant — items have role=menuitemradio with aria-checked', async ({ mount, page }) => {
    await mount(AGDSDropdownMenuRadioFixture)

    // Click trigger to open the menu.
    await page.locator('button').click()

    const menu = page.getByRole('menu')
    await menu.waitFor({ state: 'visible' })

    // APG: radio items must have role="menuitemradio".
    const radioItems = page.getByRole('menuitemradio')
    await expect(radioItems).toHaveCount(2)

    // APG: the checked item must expose aria-checked="true", unchecked must
    // expose aria-checked="false".
    await expect(radioItems.nth(0)).toHaveAttribute('aria-checked', 'true')
    await expect(radioItems.nth(1)).toHaveAttribute('aria-checked', 'false')

    // axe is scoped to the portal menu content — see runAxeOpen() for rationale.
    const results = await runAxeOpen(page)
    expect(results.violations).toEqual([])
  })
})
