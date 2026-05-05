import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSCombobox from './AGDSCombobox.vue'
import AGDSComboboxMulti from './AGDSComboboxMulti.vue'

// Async variants (AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete) require a
// real `fetchOptions` function that returns a Promise. They are not tested here because
// CT tests run in a real browser without a backend — mocking async fetches would need a
// route interceptor or a stub component wrapper that falls outside the scope of these
// structural/ARIA tests. Test them at the integration or unit level instead.

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * The combobox listbox is teleported to <body> via ComboboxPortal, so axe
 * must scan the full page rather than just #app. Page-level structural rules
 * (landmark-one-main, page-has-heading-one, region) are disabled because
 * component tests run in a minimal HTML page that intentionally lacks those
 * page-structure landmarks.
 *
 * withTags covers WAI-ARIA role/state/property requirements and colour-contrast
 * in real Chromium. WCAG conformance is a property of the consuming application.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    // Scope to body (not just #app) so the portalled listbox is included.
    .include('body')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

/**
 * Opens the combobox by clicking the chevron trigger button.
 *
 * Reka UI's ComboboxRoot defaults openOnClick and openOnFocus to false, so
 * clicking or focusing the input element does not open the panel — only the
 * ComboboxTrigger click or a keyboard ArrowDown on the focused input does.
 */
async function openByTrigger(page: Page, triggerSelector: string) {
  await page.locator(triggerSelector).click()
}

// ─── AGDSCombobox (single-select) ────────────────────────────────────────────

test.describe('WAI-ARIA APG — combobox pattern (real-browser, colour-contrast enabled)', () => {
  test.describe('AGDSCombobox — single-select', () => {
    // APG: collapsed state — the input must expose role=combobox and aria-expanded=false.
    test('collapsed state: input has role=combobox and aria-expanded=false', async ({
      mount,
      page,
    }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toBeVisible()
      await expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    // APG: collapsed state — no listbox should be present in the DOM.
    test('collapsed state: listbox is not visible', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await expect(page.getByRole('listbox')).not.toBeVisible()
    })

    // APG: collapsed state axe check.
    test('collapsed state: axe-clean', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      const results = await runAxe(page)
      expect(results.violations).toEqual([])
    })

    // APG: opening the listbox — clicking the trigger button sets aria-expanded=true
    // and renders a visible role=listbox.
    // Note: Reka UI ComboboxRoot defaults openOnClick/openOnFocus to false; only
    // the ComboboxTrigger button click or keyboard ArrowDown opens the panel.
    test('expanded state: aria-expanded=true and role=listbox visible after trigger click', async ({
      mount,
      page,
    }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await openByTrigger(page, '.agds-combobox__trigger')

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toHaveAttribute('aria-expanded', 'true')
      await expect(page.getByRole('listbox')).toBeVisible()
    })

    // APG: listbox must contain options with role=option.
    test('expanded state: options have role=option', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await openByTrigger(page, '.agds-combobox__trigger')

      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      const optionItems = listbox.getByRole('option')
      await expect(optionItems).toHaveCount(3)
    })

    // APG: the input must expose aria-controls pointing to the listbox id.
    test('expanded state: aria-controls points to the listbox', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await openByTrigger(page, '.agds-combobox__trigger')

      const input = page.getByRole('combobox', { name: 'Fruit' })
      const controlsId = await input.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()

      // The listbox element must actually exist with that id.
      const listbox = page.locator(`[id="${controlsId}"]`)
      await expect(listbox).toBeVisible()
    })

    // APG: expanded state axe check (listbox portalled to body — runAxe scopes to body).
    test('expanded state: axe-clean', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await openByTrigger(page, '.agds-combobox__trigger')
      await expect(page.getByRole('listbox')).toBeVisible()

      const results = await runAxe(page)
      expect(results.violations).toEqual([])
    })

    // APG: keyboard — pressing ArrowDown on the focused input must open the listbox.
    test('keyboard: ArrowDown opens the listbox', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await input.focus()
      await page.keyboard.press('ArrowDown')

      await expect(page.getByRole('listbox')).toBeVisible()
      await expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    // APG: keyboard — pressing Escape must close the listbox and restore
    // aria-expanded=false.
    test('keyboard: Escape closes the listbox', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      await openByTrigger(page, '.agds-combobox__trigger')
      await expect(page.getByRole('listbox')).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(page.getByRole('listbox')).not.toBeVisible()
      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    // APG: keyboard — pressing Enter on a highlighted option must select it and
    // close the listbox.
    test('keyboard: Enter selects the highlighted option', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: { label: 'Fruit', options, id: 'fruit' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await input.focus()
      await page.keyboard.press('ArrowDown') // open + highlight first option
      await page.keyboard.press('Enter') // select

      // After selection the listbox should close.
      await expect(page.getByRole('listbox')).not.toBeVisible()
      // The input should display the selected option's label.
      await expect(input).toHaveValue('Apple')
    })

    // APG: selected option — when modelValue is pre-set, the option must carry
    // aria-selected=true when the listbox is opened.
    test('selected option has aria-selected=true', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit',
          modelValue: { label: 'Banana', value: 'banana' },
        },
      })

      await openByTrigger(page, '.agds-combobox__trigger')

      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      const bananaOption = listbox.getByRole('option', { name: 'Banana' })
      await expect(bananaOption).toHaveAttribute('aria-selected', 'true')
    })

    // APG: unselected options must have aria-selected=false (not merely absent).
    // Opening the listbox with a pre-selected value shows only the matching option
    // (because the combobox restores the selected label into the search input).
    // Clearing the input reveals all options so we can assert on an unselected one.
    test('unselected options have aria-selected=false', async ({ mount, page }) => {
      await mount(AGDSCombobox, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit',
          modelValue: { label: 'Banana', value: 'banana' },
        },
      })

      await openByTrigger(page, '.agds-combobox__trigger')

      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      // Clear the search input so all options are visible (opening with a
      // pre-selected value populates the input with the selected label which
      // filters the list down to only that item).
      const input = page.getByRole('combobox', { name: 'Fruit' })
      await input.fill('')

      // After clearing, all three options should be visible.
      const optionItems = listbox.getByRole('option')
      await expect(optionItems).toHaveCount(3)

      // Apple is not selected — it must carry aria-selected=false.
      const appleOption = listbox.getByRole('option').filter({ hasText: 'Apple' })
      await expect(appleOption).toHaveAttribute('aria-selected', 'false')
    })
  })

  // ─── AGDSComboboxMulti (multi-select) ──────────────────────────────────────

  test.describe('AGDSComboboxMulti — multi-select', () => {
    // APG: collapsed state.
    test('collapsed state: input has role=combobox and aria-expanded=false', async ({
      mount,
      page,
    }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toBeVisible()
      await expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    // APG: collapsed state — no listbox should be visible.
    test('collapsed state: listbox is not visible', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await expect(page.getByRole('listbox')).not.toBeVisible()
    })

    // APG: collapsed state axe check.
    test('collapsed state: axe-clean', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      const results = await runAxe(page)
      expect(results.violations).toEqual([])
    })

    // APG: expanded state.
    test('expanded state: aria-expanded=true and role=listbox visible after trigger click', async ({
      mount,
      page,
    }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toHaveAttribute('aria-expanded', 'true')
      await expect(page.getByRole('listbox')).toBeVisible()
    })

    // APG: listbox options.
    test('expanded state: options have role=option', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')

      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      const optionItems = listbox.getByRole('option')
      await expect(optionItems).toHaveCount(3)
    })

    // APG: aria-controls.
    test('expanded state: aria-controls points to the listbox', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')

      const input = page.getByRole('combobox', { name: 'Fruit' })
      const controlsId = await input.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()

      const listbox = page.locator(`[id="${controlsId}"]`)
      await expect(listbox).toBeVisible()
    })

    // APG: expanded state axe check.
    test('expanded state: axe-clean', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')
      await expect(page.getByRole('listbox')).toBeVisible()

      const results = await runAxe(page)
      expect(results.violations).toEqual([])
    })

    // APG: keyboard — ArrowDown opens listbox.
    test('keyboard: ArrowDown opens the listbox', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await input.focus()
      await page.keyboard.press('ArrowDown')

      await expect(page.getByRole('listbox')).toBeVisible()
      await expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    // APG: keyboard — Escape closes listbox.
    test('keyboard: Escape closes the listbox', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')
      await expect(page.getByRole('listbox')).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(page.getByRole('listbox')).not.toBeVisible()
      const input = page.getByRole('combobox', { name: 'Fruit' })
      await expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    // APG: keyboard — Enter selects highlighted option; selected item is removed
    // from the listbox (multi-select excludes already-selected items) and a tag
    // appears in the tags list.
    test('keyboard: Enter selects the highlighted option', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: { label: 'Fruit', options, id: 'fruit-multi' },
      })

      const input = page.getByRole('combobox', { name: 'Fruit' })
      await input.focus()
      await page.keyboard.press('ArrowDown') // open + focus first option
      await page.keyboard.press('Enter') // select

      // In multi-select the listbox stays open; the item moves to the tags list.
      const tagsList = page.getByRole('list', { name: 'Selected items' })
      await expect(tagsList).toBeVisible()
      await expect(tagsList.getByText('Apple')).toBeVisible()
    })

    // APG: multiple selections — pre-selected items appear as tags.
    test('multiple selections: tags list reflects all selected items', async ({
      mount,
      page,
    }) => {
      await mount(AGDSComboboxMulti, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit-multi',
          modelValue: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
      })

      const tagsList = page.getByRole('list', { name: 'Selected items' })
      await expect(tagsList).toBeVisible()
      await expect(tagsList.getByText('Apple')).toBeVisible()
      await expect(tagsList.getByText('Banana')).toBeVisible()
    })

    // APG: multiple selections — already-selected items are excluded from the
    // listbox (multi-select hides them to prevent re-selection).
    test('multiple selections: already-selected items excluded from listbox', async ({
      mount,
      page,
    }) => {
      await mount(AGDSComboboxMulti, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit-multi',
          modelValue: [
            { label: 'Apple', value: 'apple' },
            { label: 'Cherry', value: 'cherry' },
          ],
        },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')

      const listbox = page.getByRole('listbox')
      await expect(listbox).toBeVisible()

      // Apple and Cherry are selected; only Banana remains in the listbox.
      const visibleOptions = listbox.getByRole('option')
      await expect(visibleOptions).toHaveCount(1)
      await expect(visibleOptions.first()).toHaveText(/Banana/)
    })

    // APG: multiple selections — axe check with pre-selected items and open listbox.
    test('multiple selections: axe-clean', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit-multi',
          modelValue: [{ label: 'Apple', value: 'apple' }],
        },
      })

      await openByTrigger(page, '.agds-combobox-multi__trigger')
      await expect(page.getByRole('listbox')).toBeVisible()

      const results = await runAxe(page)
      expect(results.violations).toEqual([])
    })

    // APG: remove a tag via the × button removes it from the tags list.
    test('removing a tag removes it from the tags list', async ({ mount, page }) => {
      await mount(AGDSComboboxMulti, {
        props: {
          label: 'Fruit',
          options,
          id: 'fruit-multi',
          modelValue: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
      })

      // Click the remove button for Apple.
      const removeApple = page.getByRole('button', { name: 'Remove Apple' })
      await removeApple.click()

      const tagsList = page.getByRole('list', { name: 'Selected items' })
      await expect(tagsList.getByText('Apple')).not.toBeVisible()
      await expect(tagsList.getByText('Banana')).toBeVisible()
    })
  })
})
