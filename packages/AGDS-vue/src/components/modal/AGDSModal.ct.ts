import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSModal from './AGDSModal.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe-core against the full page in real Chromium.
 *
 * The modal uses a portal (DialogPortal), so its DOM lives outside #app —
 * scanning the full page is required to catch dialog-role, aria-modal,
 * aria-labelledby, and related WAI-ARIA role/state/property violations.
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
  // ── APG: role=dialog, aria-modal, aria-labelledby (open — body content only) ──

  test('APG: open dialog has role=dialog, aria-modal=true, and aria-labelledby pointing to title', async ({ mount, page }) => {
    await mount(AGDSModal, {
      props: {
        modelValue: true,
        title: 'Confirm action',
      },
      slots: {
        default: '<p>Are you sure you want to proceed?</p>',
      },
    })

    // The dialog portal renders outside #app; wait for it to appear in the DOM.
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
    await expect(titleEl).toContainText('Confirm action')

    // axe: verifies WAI-ARIA roles, states, aria-modal, labelledby, and
    // colour-contrast in real Chromium
    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: accessible name + axe when actions slot is also present ──────────────

  test('APG: open dialog with actions slot has accessible name and no axe violations', async ({ mount, page }) => {
    await mount(AGDSModal, {
      props: {
        modelValue: true,
        title: 'Delete record',
      },
      slots: {
        default: '<p>This action cannot be undone.</p>',
        actions: '<button type="button">Delete</button><button type="button">Cancel</button>',
      },
    })

    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })

    // aria-labelledby must still be present when the actions slot is rendered
    const labelId = await dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    await expect(page.locator(`#${labelId}`)).toContainText('Delete record')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // ── APG: closed dialog must not be in the accessibility tree ─────────────────

  test('APG: closed dialog (modelValue=false) is absent from the accessibility tree', async ({ mount, page }) => {
    await mount(AGDSModal, {
      props: {
        modelValue: false,
        title: 'Hidden modal',
      },
      slots: { default: '<p>Content</p>' },
    })

    // When modelValue is false the dialog element must not be exposed to AT.
    // getByRole('dialog') should resolve to nothing (count = 0).
    await expect(page.getByRole('dialog')).toHaveCount(0)

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
