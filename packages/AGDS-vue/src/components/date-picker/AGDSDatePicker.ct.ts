import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSDatePicker from './AGDSDatePicker.vue'

// ─── axe helpers ─────────────────────────────────────────────────────────────

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
 * withTags covers WAI-ARIA role/state/property requirements plus colour-
 * contrast in real Chromium. WCAG conformance is a property of the consuming
 * application, not an individual component in isolation.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

/**
 * Full-page axe scan used when the calendar popover is open — the calendar
 * panel is rendered via PopoverPortal (Teleport) outside #app, so we must
 * scan the whole document. Page-structure landmark rules are disabled for
 * the same reason as runAxe above.
 */
async function runAxeFullPage(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — date picker (real-browser, colour-contrast enabled)', () => {
  // ── Single mode — default (calendar closed) ────────────────────────────────

  test('default state: input is labelled, trigger has accessible name, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: { label: 'Date of birth' },
    })

    // Input must be associated with its label via a matching for/id pair.
    const input = page.locator('input[type="text"]')
    await expect(input).toBeVisible()

    const inputId = await input.getAttribute('id')
    expect(inputId).toBeTruthy()

    const label = page.locator(`label[for="${inputId}"]`)
    await expect(label).toBeVisible()
    await expect(label).toContainText('Date of birth')

    // Trigger button must have an accessible name provided by aria-label.
    const trigger = page.locator('button[aria-haspopup="dialog"]').first()
    await expect(trigger).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-label', /choose date/i)

    // Trigger must advertise the collapsed state.
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('required field: no "(optional)" suffix is appended, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: { label: 'Appointment date', required: true },
    })

    const label = page.locator('label').first()
    await expect(label).not.toContainText('optional')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('invalid state: error message is announced via role=alert, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: {
        label: 'Appointment date',
        invalid: true,
        message: 'Enter a valid date',
        required: true,
      },
    })

    const msg = page.locator('[role="alert"]')
    await expect(msg).toBeVisible()
    await expect(msg).toContainText('Enter a valid date')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('hint text is associated with the input via aria-describedby, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: {
        label: 'Appointment date',
        hint: 'Enter the date in DD/MM/YYYY format',
        required: true,
      },
    })

    const hint = page.locator('.agds-datepicker__hint')
    await expect(hint).toBeVisible()

    const hintId = await hint.getAttribute('id')
    expect(hintId).toBeTruthy()

    const input = page.locator('input[type="text"]')
    const describedBy = await input.getAttribute('aria-describedby')
    expect(describedBy).toContain(hintId)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('disabled state: input and trigger are both disabled, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: { label: 'Appointment date', disabled: true, required: true },
    })

    const input = page.locator('input[type="text"]')
    await expect(input).toBeDisabled()

    const trigger = page.locator('button[aria-haspopup="dialog"]').first()
    await expect(trigger).toBeDisabled()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── Single mode — calendar open ────────────────────────────────────────────

  test('calendar open: popover has role=dialog, grid renders day cells, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: { label: 'Appointment date', required: true },
    })

    const trigger = page.locator('button[aria-haspopup="dialog"]').first()
    await trigger.click()

    // Trigger must now report expanded.
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // The popover panel must carry role=dialog (set on PopoverContent).
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    // Calendar grid must be present.
    const grid = page.locator('[role="grid"]')
    await expect(grid).toBeVisible()

    // Navigation buttons must exist with accessible names.
    const prevBtn = page.locator('button[aria-label*="Previous month"]')
    await expect(prevBtn).toBeVisible()

    const nextBtn = page.locator('button[aria-label*="Next month"]')
    await expect(nextBtn).toBeVisible()

    // At least one day cell should be present.
    const cells = page.locator('[role="gridcell"]')
    await expect(cells.first()).toBeVisible()

    // Full-page scan because the calendar portals outside #app.
    const results = await runAxeFullPage(page)
    expect(results.violations).toEqual([])
  })

  test('calendar open with pre-selected date: selected cell has aria-selected=true, axe-clean', async ({ mount, page }) => {
    const selectedDate = new Date(2025, 5, 15) // 15 June 2025
    await mount(AGDSDatePicker, {
      props: {
        label: 'Appointment date',
        modelValue: selectedDate,
        required: true,
      },
    })

    const trigger = page.locator('button[aria-haspopup="dialog"]').first()
    await trigger.click()

    // The selected day cell must expose aria-selected=true.
    const selectedCell = page.locator('[role="gridcell"][aria-selected="true"]')
    await expect(selectedCell).toBeVisible()

    const results = await runAxeFullPage(page)
    expect(results.violations).toEqual([])
  })

  // ── Range mode ─────────────────────────────────────────────────────────────

  test('range mode: renders two labelled inputs in a fieldset, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: {
        range: true,
        label: 'Travel dates',
        required: true,
      },
    })

    // Range mode uses a <fieldset> with a <legend>.
    const fieldset = page.locator('fieldset')
    await expect(fieldset).toBeVisible()

    const legend = fieldset.locator('legend')
    await expect(legend).toBeVisible()
    await expect(legend).toContainText('Travel dates')

    // Two text inputs, each labelled.
    const inputs = page.locator('input[type="text"]')
    await expect(inputs).toHaveCount(2)

    // Each input must have a matching label.
    for (const input of await inputs.all()) {
      const id = await input.getAttribute('id')
      expect(id).toBeTruthy()
      const lbl = page.locator(`label[for="${id}"]`)
      await expect(lbl).toBeVisible()
    }

    // Both trigger buttons must have accessible names.
    const triggers = page.locator('button[aria-haspopup="dialog"]')
    await expect(triggers).toHaveCount(2)

    const fromTrigger = triggers.first()
    await expect(fromTrigger).toHaveAttribute('aria-label', /choose start date/i)

    const toTrigger = triggers.nth(1)
    await expect(toTrigger).toHaveAttribute('aria-label', /choose end date/i)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('range mode calendar open: dialog and grid are present, axe-clean', async ({ mount, page }) => {
    await mount(AGDSDatePicker, {
      props: {
        range: true,
        label: 'Travel dates',
        required: true,
      },
    })

    // Open via the "start date" trigger.
    const fromTrigger = page.locator('button[aria-haspopup="dialog"]').first()
    await fromTrigger.click()

    await expect(fromTrigger).toHaveAttribute('aria-expanded', 'true')

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    const grid = page.locator('[role="grid"]').first()
    await expect(grid).toBeVisible()

    const cells = page.locator('[role="gridcell"]')
    await expect(cells.first()).toBeVisible()

    const results = await runAxeFullPage(page)
    expect(results.violations).toEqual([])
  })

  test('range mode with pre-selected range: both endpoints have aria-selected=true, axe-clean', async ({ mount, page }) => {
    const from = new Date(2025, 5, 10) // 10 June 2025
    const to = new Date(2025, 5, 20) // 20 June 2025

    await mount(AGDSDatePicker, {
      props: {
        range: true,
        label: 'Travel dates',
        modelValue: { from, to },
        required: true,
      },
    })

    // Open via the "start date" trigger so the calendar lands on June 2025.
    const fromTrigger = page.locator('button[aria-haspopup="dialog"]').first()
    await fromTrigger.click()

    const selectedCells = page.locator('[role="gridcell"][aria-selected="true"]')
    await expect(selectedCells).toHaveCount(2)

    const results = await runAxeFullPage(page)
    expect(results.violations).toEqual([])
  })
})
