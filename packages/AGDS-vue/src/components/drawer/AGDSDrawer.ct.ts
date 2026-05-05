import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSDrawer from './AGDSDrawer.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe-core against the full page in real Chromium.
 *
 * The drawer uses Teleport to render outside #app, so its DOM lives directly
 * on <body>. Scanning the full page is required to catch dialog-role,
 * aria-modal, aria-labelledby, and related WAI-ARIA role/state/property
 * violations.
 *
 * Page-level structural rules (landmark-one-main, region, page-has-heading-one)
 * are disabled because they are irrelevant for isolated component tests.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    // These axe rule tags cover WAI-ARIA role, state, and property requirements
    // plus colour-contrast in real Chromium. WCAG conformance is a property of
    // the consuming application.
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — dialog pattern (real-browser, colour-contrast enabled)', () => {
  // ── APG: role=dialog, aria-modal, aria-labelledby (open state) ───────────────

  test('APG: open drawer has role=dialog, aria-modal=true, and aria-labelledby pointing to title', async ({ mount, page }) => {
    await mount(AGDSDrawer, {
      props: {
        modelValue: true,
        title: 'Filter results',
      },
      slots: {
        default: '<p>Use these filters to refine the list.</p>',
      },
    })

    // The drawer uses Teleport so its DOM lives outside #app; wait for it to appear.
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })

    // role=dialog — APG: the container element must have role="dialog"
    await expect(dialog).toHaveAttribute('role', 'dialog')

    // aria-modal=true — APG: hides background content from assistive technology
    await expect(dialog).toHaveAttribute('aria-modal', 'true')

    // aria-labelledby — APG: dialog must have an accessible name via
    // aria-labelledby pointing at the visible title element
    const labelId = await dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    const titleEl = page.locator(`#${labelId}`)
    await expect(titleEl).toContainText('Filter results')

    // axe: verifies WAI-ARIA roles, states, aria-modal, labelledby, and
    // colour-contrast in real Chromium
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: accessible name + axe when actions slot is also present ──────────────

  test('APG: open drawer with actions slot has accessible name and no axe violations', async ({ mount, page }) => {
    await mount(AGDSDrawer, {
      props: {
        modelValue: true,
        title: 'Edit record',
      },
      slots: {
        default: '<p>Make your changes below.</p>',
        actions: '<button type="button">Save</button><button type="button">Cancel</button>',
      },
    })

    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })

    // aria-labelledby must still be present when the actions slot is rendered
    const labelId = await dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    await expect(page.locator(`#${labelId}`)).toContainText('Edit record')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: closed drawer must not be in the accessibility tree ─────────────────

  test('APG: closed drawer (modelValue=false) is absent from the accessibility tree', async ({ mount, page }) => {
    await mount(AGDSDrawer, {
      props: {
        modelValue: false,
        title: 'Hidden drawer',
      },
      slots: { default: '<p>Content</p>' },
    })

    // When modelValue is false the dialog element must not be exposed to AT.
    // getByRole('dialog') should resolve to nothing (count = 0).
    await expect(page.getByRole('dialog')).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── title slot: title text renders in the labelling element ──────────────────

  test('title prop text is rendered inside the aria-labelledby target', async ({ mount, page }) => {
    await mount(AGDSDrawer, {
      props: {
        modelValue: true,
        title: 'Navigation',
      },
      slots: { default: '<p>Side nav content.</p>' },
    })

    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })

    const labelId = await dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()

    // The element referenced by aria-labelledby must contain the title text.
    await expect(page.locator(`#${labelId}`)).toContainText('Navigation')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
