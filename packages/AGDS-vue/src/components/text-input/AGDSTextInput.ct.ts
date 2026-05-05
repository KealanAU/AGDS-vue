import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSTextInput from './AGDSTextInput.vue'

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
 * via real Chromium. This is not a WCAG conformance claim — conformance is a
 * property of the consuming application.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    // withTags: WAI-ARIA coverage (roles, states, properties) + colour-contrast.
    // Not a WCAG conformance claim — conformance is a property of the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA — text input form control (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: every text input must have a programmatically associated label
  // via <label for> / id pairing so assistive technology can announce the field name.
  test('default — label is associated with input via for/id pairing, axe-clean', async ({ mount, page }) => {
    await mount(AGDSTextInput, {
      props: { label: 'Full name', id: 'test-input' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // Verify <label for> matches the input id.
    const input = page.locator('input')
    const inputId = await input.getAttribute('id')
    const label = page.locator(`label[for="${inputId}"]`)
    await expect(label).toBeVisible()
  })

  // WAI-ARIA: hint text must be linked to the control via aria-describedby so
  // screen readers announce the hint alongside the field label.
  test('with hint — hint element linked via aria-describedby', async ({ mount, page }) => {
    await mount(AGDSTextInput, {
      props: {
        label: 'Email address',
        hint: 'We will only use this to contact you about your application.',
        id: 'test-input-hint',
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const input = page.locator('input')
    const describedBy = await input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    // The element(s) referenced by aria-describedby must exist in the DOM.
    const ids = (describedBy as string).split(/\s+/)
    for (const id of ids) {
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })

  // WAI-ARIA: when a field is invalid, aria-invalid=true must be set on the
  // control and aria-describedby must reference the error message element so
  // screen readers can announce the error.
  test('invalid — aria-invalid=true and error message linked via aria-describedby', async ({ mount, page }) => {
    await mount(AGDSTextInput, {
      props: {
        label: 'Email address',
        invalid: true,
        message: 'Enter a valid email address.',
        id: 'test-input-invalid',
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const input = page.locator('input')
    await expect(input).toHaveAttribute('aria-invalid', 'true')

    const describedBy = await input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    const ids = (describedBy as string).split(/\s+/)
    for (const id of ids) {
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })

  // WAI-ARIA: disabled inputs must expose the disabled state via the native
  // disabled attribute so assistive technology can communicate non-interactivity.
  test('disabled — native disabled attribute present, axe-clean', async ({ mount, page }) => {
    await mount(AGDSTextInput, {
      props: { label: 'Username', disabled: true, id: 'test-input-disabled' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    await expect(page.locator('input')).toBeDisabled()
  })

  // WAI-ARIA: required fields must expose their required state via aria-required
  // so assistive technology can communicate the constraint to users.
  test('required — aria-required attribute present, axe-clean', async ({ mount, page }) => {
    await mount(AGDSTextInput, {
      props: { label: 'First name', required: true, id: 'test-input-required' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    await expect(page.locator('input')).toHaveAttribute('aria-required', 'true')
  })
})
