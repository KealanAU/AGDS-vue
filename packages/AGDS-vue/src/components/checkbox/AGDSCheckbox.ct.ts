import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSCheckbox from './AGDSCheckbox.vue'
import AGDSCheckboxGroupFixture from './AGDSCheckboxGroupFixture.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * withTags covers WAI-ARIA checkbox role, state (aria-checked, aria-disabled),
 * property (aria-required, aria-invalid, aria-describedby) requirements and
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

test.describe('WAI-ARIA APG — checkbox pattern (real-browser, colour-contrast enabled)', () => {
  // APG: unchecked checkbox must have role=checkbox (native input[type=checkbox]
  // satisfies this), aria-checked=false (implicit when not checked), and a
  // label associated via the <label for> / input id relationship.
  test('unchecked checkbox: role=checkbox, label association, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-unchecked', modelValue: false },
      slots: { default: 'Accept terms' },
    })

    const checkbox = page.getByRole('checkbox', { name: 'Accept terms' })
    await expect(checkbox).toBeVisible()
    // APG: role=checkbox is implicit on input[type=checkbox]; aria-checked=false is implicit
    await expect(checkbox).not.toBeChecked()

    // Label association: the <label> for= must match the input id
    const inputId = await checkbox.getAttribute('id')
    const label = page.locator(`label[for="${inputId}"]`)
    await expect(label).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: checked checkbox must expose aria-checked=true (native :checked satisfies this).
  test('checked checkbox: aria-checked=true, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-checked', modelValue: true },
      slots: { default: 'Accept terms' },
    })

    const checkbox = page.getByRole('checkbox', { name: 'Accept terms' })
    await expect(checkbox).toBeChecked()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: the indeterminate / "mixed" state must be communicated via
  // aria-checked="mixed". AGDSCheckbox sets aria-checked="mixed" and sets
  // the .indeterminate DOM property via JS.
  test('indeterminate checkbox: aria-checked=mixed, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-indeterminate', indeterminate: true, modelValue: false },
      slots: { default: 'Select all' },
    })

    const checkbox = page.locator('#cb-indeterminate')
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: disabled checkbox must not be activatable and must expose the disabled
  // state. Native disabled attribute satisfies aria-disabled.
  test('disabled checkbox: native disabled, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-disabled', disabled: true },
      slots: { default: 'Disabled option' },
    })

    const checkbox = page.getByRole('checkbox', { name: 'Disabled option' })
    await expect(checkbox).toBeDisabled()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when aria-required is set the AT must announce the field as required.
  test('required checkbox: aria-required=true, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-required', required: true },
      slots: { default: 'I agree' },
    })

    const checkbox = page.getByRole('checkbox', { name: 'I agree' })
    await expect(checkbox).toHaveAttribute('aria-required', 'true')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: an invalid checkbox must expose aria-invalid=true so that AT can
  // identify the field as erroneous.
  test('invalid standalone checkbox: aria-invalid=true, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckbox, {
      props: { id: 'cb-invalid', invalid: true },
      slots: { default: 'Accept terms' },
    })

    const checkbox = page.getByRole('checkbox', { name: 'Accept terms' })
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: when the checkbox is inside a group and the group is invalid, each
  // checkbox must have aria-invalid=true and aria-describedby pointing to the
  // visible error message element so AT can announce the error on focus.
  test('invalid group: aria-invalid + aria-describedby → error message, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckboxGroupFixture, {
      props: { invalid: true, message: 'Select at least one colour', messageId: 'colour-error' },
    })

    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(2)

    // Every checkbox in the group must carry aria-invalid and aria-describedby
    for (const cb of await checkboxes.all()) {
      await expect(cb).toHaveAttribute('aria-invalid', 'true')
      await expect(cb).toHaveAttribute('aria-describedby', 'colour-error')
    }

    // The error message element must be in the DOM and linked by that id
    const errorMsg = page.locator('#colour-error')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText('Select at least one colour')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // APG: the group container (fieldset) must have an accessible name provided
  // by its legend so AT identifies the purpose of the grouped checkboxes.
  test('checkbox group: fieldset has accessible name via legend, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckboxGroupFixture)

    // fieldset has the implicit "group" role; the legend provides its accessible name
    const group = page.getByRole('group', { name: 'Colours' })
    await expect(group).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // All checkboxes inside a group must propagate the shared name attribute so
  // the browser groups them correctly for form submission and AT navigation.
  // The fixture sets name="colours" on each checkbox directly.
  test('checkbox group: all checkboxes share name attribute, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckboxGroupFixture)

    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(2)
    for (const cb of await checkboxes.all()) {
      await expect(cb).toHaveAttribute('name', 'colours')
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // Disabled group: all child checkboxes must be disabled.
  test('disabled group: all checkboxes disabled, axe-clean', async ({ mount, page }) => {
    await mount(AGDSCheckboxGroupFixture, { props: { disabled: true } })

    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(2)
    for (const cb of await checkboxes.all()) {
      await expect(cb).toBeDisabled()
    }

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
