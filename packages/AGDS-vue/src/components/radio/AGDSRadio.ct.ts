import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSRadioGroupFixture from './AGDSRadioGroupFixture.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * withTags covers WAI-ARIA radio/radiogroup roles, state (aria-checked),
 * property (aria-required, aria-invalid, aria-describedby, aria-labelledby)
 * requirements and colour-contrast. WCAG conformance is a property of the
 * consuming application.
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

test.describe('WAI-ARIA APG — radio group pattern (real-browser, colour-contrast enabled)', () => {
  // APG: the group container (fieldset) must carry an accessible name — provided
  // by the <legend> — so that AT can identify the purpose of the radio group.
  test('radiogroup has accessible name via legend, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture)

    // fieldset has the implicit "group" role; the legend provides its accessible name
    const group = page.getByRole('group', { name: 'Payment method' })
    await expect(group).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: every radio must have a label (via <label for>) so AT can announce
  // the option text when the control receives focus.
  test('each radio has a label association, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture)

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)

    // Each radio's id must be referenced by a <label for>
    for (const radio of await radios.all()) {
      const id = await radio.getAttribute('id')
      const label = page.locator(`label[for="${id}"]`)
      await expect(label).toBeVisible()
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: aria-checked=true must be exposed on the selected radio (native
  // :checked state satisfies this for input[type=radio]).
  test('checked radio: aria-checked=true on selected option, others unchecked, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture, { props: { selectedValue: 'bank' } })

    const bankRadio = page.getByRole('radio', { name: 'Bank transfer' })
    await expect(bankRadio).toBeChecked()

    // The other two must not be checked
    await expect(page.getByRole('radio', { name: 'Credit card' })).not.toBeChecked()
    await expect(page.getByRole('radio', { name: 'Cash' })).not.toBeChecked()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: unchecked radios must expose aria-checked=false (implicit on
  // input[type=radio] when not selected).
  test('unchecked radio group: all radios unchecked, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture)

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)
    for (const radio of await radios.all()) {
      await expect(radio).not.toBeChecked()
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: disabled radios must not be activatable. Native disabled attribute
  // satisfies aria-disabled. Disabled group must propagate to all children.
  test('disabled group: all radios disabled, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture, { props: { disabled: true } })

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)
    for (const radio of await radios.all()) {
      await expect(radio).toBeDisabled()
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when the group is invalid, each radio must expose aria-invalid=true
  // and aria-describedby pointing to the visible error message element so AT
  // can announce the error on focus.
  test('invalid group: aria-invalid + aria-describedby → error message, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture, {
      props: {
        invalid: true,
        message: 'Please select a payment method',
        messageId: 'payment-error',
      },
    })

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)

    for (const radio of await radios.all()) {
      await expect(radio).toHaveAttribute('aria-invalid', 'true')
      await expect(radio).toHaveAttribute('aria-describedby', 'payment-error')
    }

    // The error message element must be in the DOM and linked by that id
    const errorMsg = page.locator('#payment-error')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText('Please select a payment method')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // All radios inside a group must share the name attribute so the browser
  // groups them for mutual exclusion and correct form submission.
  test('radio group: all radios share name attribute, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture)

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)
    for (const radio of await radios.all()) {
      await expect(radio).toHaveAttribute('name', 'payment')
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when aria-required is set the AT must announce the group as required.
  test('required group: aria-required=true on each radio, axe-clean', async ({ mount, page }) => {
    await mount(AGDSRadioGroupFixture, { props: { required: true } })

    const radios = page.getByRole('radio')
    await expect(radios).toHaveCount(3)
    for (const radio of await radios.all()) {
      await expect(radio).toHaveAttribute('aria-required', 'true')
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
