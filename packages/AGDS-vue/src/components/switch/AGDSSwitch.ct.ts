import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSSwitch from './AGDSSwitch.vue'

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

test.describe('WAI-ARIA APG — switch pattern (real-browser, colour-contrast enabled)', () => {
  // APG switch pattern: unchecked state must expose role=switch, aria-checked=false,
  // and have an accessible name so AT users understand the control's purpose.
  test('unchecked state — role=switch, aria-checked=false, has accessible name', async ({ mount, page }) => {
    await mount(AGDSSwitch, {
      props: { modelValue: false },
      slots: { default: 'Notifications' },
    })

    const input = page.locator('[role="switch"]')
    await expect(input).toHaveAttribute('role', 'switch')
    // aria-checked is implied by the native :checked state; Chromium exposes
    // it as aria-checked=false when the checkbox is unchecked.
    await expect(input).not.toBeChecked()

    // Accessible name is provided by the associated <label> (for/id pairing).
    await expect(page.getByRole('switch', { name: 'Notifications' })).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG switch pattern: checked state must expose aria-checked=true so AT
  // users can determine the current on/off state of the control.
  test('checked state — aria-checked=true, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSwitch, {
      props: { modelValue: true },
      slots: { default: 'Notifications' },
    })

    const input = page.locator('[role="switch"]')
    // Chromium exposes aria-checked=true when the native checkbox is checked.
    await expect(input).toBeChecked()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG switch pattern: disabled state must not be activatable and must expose
  // the disabled state. The native disabled attribute satisfies aria-disabled.
  test('disabled state — not activatable, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSwitch, {
      props: { modelValue: false, disabled: true },
      slots: { default: 'Notifications' },
    })

    const input = page.locator('[role="switch"]')
    await expect(input).toBeDisabled()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: keyboard — Space must toggle the switch state. This verifies real
  // browser keyboard behaviour rather than simulated events.
  test('keyboard — Space toggles from unchecked to checked', async ({ mount, page }) => {
    await mount(AGDSSwitch, {
      props: { modelValue: false },
      slots: { default: 'Notifications' },
    })

    const input = page.locator('[role="switch"]')
    await input.focus()
    await expect(input).toBeFocused()

    await page.keyboard.press('Space')
    await expect(input).toBeChecked()
  })

  // APG: icon-only usage — when no label slot is provided, an aria-label on
  // the input supplies the accessible name via $attrs passthrough.
  test('aria-label — accessible name supplied via aria-label when no slot', async ({ mount, page }) => {
    await mount(AGDSSwitch, {
      props: { 'aria-label': 'Enable notifications' } as Record<string, unknown>,
    })

    await expect(page.getByRole('switch', { name: 'Enable notifications' })).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
