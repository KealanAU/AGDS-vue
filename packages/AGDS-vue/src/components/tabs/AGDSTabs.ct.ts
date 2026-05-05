import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSTabs from './AGDSTabs.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles (tablist, tab, tabpanel), states
 * (aria-selected), and properties (aria-controls, aria-labelledby) in real
 * Chromium with colour-contrast evaluation.
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
// AGDSTabList, AGDSTab and AGDSTabPanel are registered as global components in
// playwright/index.ts so they can be used directly inside slot HTML strings.

test.describe('WAI-ARIA APG — tabs pattern (real-browser, colour-contrast enabled)', () => {
  test('tablist, tab, and tabpanel roles are present and axe-clean', async ({ mount, page }) => {
    await mount(AGDSTabs, {
      props: { defaultValue: 'overview' },
      slots: {
        default: /* html */ `
          <AgDSTabList aria-label="Product sections">
            <AgDSTab value="overview">Overview</AgDSTab>
            <AgDSTab value="details">Details</AgDSTab>
            <AgDSTab value="reviews">Reviews</AgDSTab>
          </AgDSTabList>
          <AgDSTabPanel value="overview"><p>Overview content</p></AgDSTabPanel>
          <AgDSTabPanel value="details"><p>Details content</p></AgDSTabPanel>
          <AgDSTabPanel value="reviews"><p>Reviews content</p></AgDSTabPanel>
        `,
      },
    })

    // APG: container has role=tablist; each trigger role=tab; each content role=tabpanel
    await expect(page.getByRole('tablist')).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Overview' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Details' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Reviews' })).toBeVisible()
    await expect(page.getByRole('tabpanel')).toBeVisible()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('active tab has aria-selected=true; inactive tabs have aria-selected=false', async ({ mount, page }) => {
    await mount(AGDSTabs, {
      props: { defaultValue: 'overview' },
      slots: {
        default: /* html */ `
          <AgDSTabList aria-label="Product sections">
            <AgDSTab value="overview">Overview</AgDSTab>
            <AgDSTab value="details">Details</AgDSTab>
            <AgDSTab value="reviews">Reviews</AgDSTab>
          </AgDSTabList>
          <AgDSTabPanel value="overview"><p>Overview content</p></AgDSTabPanel>
          <AgDSTabPanel value="details"><p>Details content</p></AgDSTabPanel>
          <AgDSTabPanel value="reviews"><p>Reviews content</p></AgDSTabPanel>
        `,
      },
    })

    // APG: active tab aria-selected=true
    await expect(page.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    // APG: inactive tabs aria-selected=false
    await expect(page.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'false')
    await expect(page.getByRole('tab', { name: 'Reviews' })).toHaveAttribute('aria-selected', 'false')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('each tab has aria-controls pointing to its panel; each panel has aria-labelledby pointing to its tab', async ({ mount, page }) => {
    await mount(AGDSTabs, {
      props: { defaultValue: 'overview' },
      slots: {
        default: /* html */ `
          <AgDSTabList aria-label="Product sections">
            <AgDSTab value="overview">Overview</AgDSTab>
            <AgDSTab value="details">Details</AgDSTab>
          </AgDSTabList>
          <AgDSTabPanel value="overview"><p>Overview content</p></AgDSTabPanel>
          <AgDSTabPanel value="details"><p>Details content</p></AgDSTabPanel>
        `,
      },
    })

    // APG: aria-controls on tab → panel id; aria-labelledby on panel → tab id
    const overviewTab = page.getByRole('tab', { name: 'Overview' })
    const tabId = await overviewTab.getAttribute('id')
    const controlsId = await overviewTab.getAttribute('aria-controls')

    expect(tabId).toBeTruthy()
    expect(controlsId).toBeTruthy()

    // The panel must have the id the tab points to
    await expect(page.locator(`#${controlsId}`)).toBeVisible()
    // The panel must label itself back to the tab
    await expect(page.locator(`#${controlsId}`)).toHaveAttribute('aria-labelledby', tabId!)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('bodyAlt background meets colour-contrast requirements', async ({ mount, page }) => {
    await mount(AGDSTabs, {
      props: { defaultValue: 'first', background: 'bodyAlt' },
      slots: {
        default: /* html */ `
          <AgDSTabList aria-label="Sections">
            <AgDSTab value="first">First</AgDSTab>
            <AgDSTab value="second">Second</AgDSTab>
          </AgDSTabList>
          <AgDSTabPanel value="first"><p>First panel</p></AgDSTabPanel>
          <AgDSTabPanel value="second"><p>Second panel</p></AgDSTabPanel>
        `,
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  test('disabled tab has aria-disabled and does not gain aria-selected=true', async ({ mount, page }) => {
    await mount(AGDSTabs, {
      props: { defaultValue: 'active' },
      slots: {
        default: /* html */ `
          <AgDSTabList aria-label="Options">
            <AgDSTab value="active">Active</AgDSTab>
            <AgDSTab value="disabled" :disabled="true">Disabled</AgDSTab>
          </AgDSTabList>
          <AgDSTabPanel value="active"><p>Active content</p></AgDSTabPanel>
          <AgDSTabPanel value="disabled"><p>Disabled content</p></AgDSTabPanel>
        `,
      },
    })

    // APG: disabled tab must not be selected
    await expect(page.getByRole('tab', { name: 'Disabled' })).toHaveAttribute('aria-selected', 'false')
    // Reka UI renders disabled tabs with the native disabled attribute (which
    // assistive technology exposes as aria-disabled) rather than aria-disabled.
    await expect(page.getByRole('tab', { name: 'Disabled' })).toBeDisabled()

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
