import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSSelect from './AGDSSelect.vue'

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
 * withTags: WAI-ARIA role/state/property coverage via axe rules — not a WCAG
 * conformance claim; conformance is a property of the consuming application.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — listbox / select pattern (real-browser, colour-contrast enabled)', () => {
  // 1. Default state — label association
  test('default state: select has label association and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSSelect, {
      props: {
        label: 'Favourite fruit',
        options: OPTIONS,
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // The <label for> must point at the <select> id — this satisfies the
    // WAI-ARIA requirement that the combobox (native select) has an
    // accessible name via label association.
    const select = page.locator('select')
    const selectId = await select.getAttribute('id')
    expect(selectId).toBeTruthy()

    const label = page.locator(`label[for="${selectId}"]`)
    await expect(label).toBeVisible()
  })

  // 2. Required state
  test('required state: aria-required or required attribute present, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSelect, {
      props: {
        label: 'Favourite fruit',
        options: OPTIONS,
        required: true,
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // AGDSField passes aria-required=true via scoped slot props to the <select>.
    const select = page.locator('select')
    const ariaRequired = await select.getAttribute('aria-required')
    const required = await select.getAttribute('required')
    expect(ariaRequired === 'true' || required !== null).toBe(true)
  })

  // 3. Invalid state with error message
  test('invalid state: aria-invalid=true, error linked via aria-describedby, axe-clean', async ({ mount, page }) => {
    await mount(AGDSSelect, {
      props: {
        label: 'Favourite fruit',
        options: OPTIONS,
        invalid: true,
        message: 'Please select an option',
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const select = page.locator('select')

    // aria-invalid must be "true" (APG / HTML-AAM requirement).
    await expect(select).toHaveAttribute('aria-invalid', 'true')

    // The error message element must exist and be referenced by aria-describedby.
    const describedBy = await select.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    const messageId = describedBy!.split(' ').find((id) => id.includes('message'))
    expect(messageId).toBeTruthy()

    const messageEl = page.locator(`#${messageId}`)
    await expect(messageEl).toBeVisible()
    await expect(messageEl).toContainText('Please select an option')
  })

  // 4. Disabled state
  test('disabled state: select is disabled and is axe-clean', async ({ mount, page }) => {
    await mount(AGDSSelect, {
      props: {
        label: 'Favourite fruit',
        options: OPTIONS,
        disabled: true,
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const select = page.locator('select')
    await expect(select).toBeDisabled()
  })
})
