import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSAccordionFixture from './AGDSAccordionFixture.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * withTags covers WAI-ARIA role, state, and property requirements
 * (button role, aria-expanded, aria-controls, aria-labelledby, region) and
 * colour-contrast. WCAG conformance is a property of the consuming application.
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
//
// AGDSAccordionFixture.vue is a thin test-only wrapper that renders two
// AGDSAccordionItem children inside AGDSAccordion, enabling real-browser
// testing without modifying playwright/index.ts.

test.describe('WAI-ARIA APG — accordion/disclosure pattern (real-browser, colour-contrast enabled)', () => {
  // APG: In the collapsed (closed) state the trigger must expose
  // role=button and aria-expanded=false so assistive technology
  // announces the collapsed state to users.
  test('collapsed state: trigger has aria-expanded=false and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSAccordionFixture)

    // APG: every trigger is a native <button> — role=button is implicit
    const triggers = page.getByRole('button')
    await expect(triggers).toHaveCount(2)

    // APG: triggers must start collapsed — aria-expanded=false
    await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false')
    await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'false')

    // APG: trigger must have aria-controls attribute (Reka sets it; value may be
    // empty string when closed — presence is sufficient for the collapsed check)
    await expect(triggers.nth(0)).toHaveAttribute('aria-controls')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: After activation the trigger must expose aria-expanded=true and
  // the associated panel must be visible and labelled by the trigger.
  test('expanded state: trigger has aria-expanded=true, panel is visible, and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSAccordionFixture)

    const trigger = page.getByRole('button', { name: 'Section one' })

    // APG: aria-expanded=false before activation
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Activate the trigger
    await trigger.click()

    // APG: aria-expanded=true after activation
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // APG: aria-controls must point to the now-visible panel
    const controlsId = await trigger.getAttribute('aria-controls')
    expect(controlsId).toBeTruthy()
    const panel = page.locator(`#${controlsId}`)
    await expect(panel).toBeVisible()

    // APG: panel must have aria-labelledby pointing back to the trigger
    const triggerId = await trigger.getAttribute('id')
    expect(triggerId).toBeTruthy()
    await expect(panel).toHaveAttribute('aria-labelledby', triggerId!)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: In multiple mode (the default) each item operates independently —
  // expanding one item must not collapse any other item.
  test('multiple items: each item is independently expandable and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSAccordionFixture, { props: { type: 'multiple' } })

    const triggerOne = page.getByRole('button', { name: 'Section one' })
    const triggerTwo = page.getByRole('button', { name: 'Section two' })

    // Expand both items
    await triggerOne.click()
    await triggerTwo.click()

    // APG: both triggers must now report aria-expanded=true independently
    await expect(triggerOne).toHaveAttribute('aria-expanded', 'true')
    await expect(triggerTwo).toHaveAttribute('aria-expanded', 'true')

    // Both panels must be visible simultaneously
    const controlsIdOne = await triggerOne.getAttribute('aria-controls')
    const controlsIdTwo = await triggerTwo.getAttribute('aria-controls')
    expect(controlsIdOne).toBeTruthy()
    expect(controlsIdTwo).toBeTruthy()
    await expect(page.locator(`#${controlsIdOne}`)).toBeVisible()
    await expect(page.locator(`#${controlsIdTwo}`)).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
