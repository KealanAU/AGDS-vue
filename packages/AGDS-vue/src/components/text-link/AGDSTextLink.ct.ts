import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSTextLink from './AGDSTextLink.vue'
import AGDSTextLinkExternal from './AGDSTextLinkExternal.vue'

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
 * withTags: WAI-ARIA coverage — not a WCAG conformance claim.
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

test.describe('WAI-ARIA — inline text link (real-browser, colour-contrast enabled)', () => {
  // WAI-ARIA: native <a> with href satisfies role=link.
  // Accessible name is derived from text content.
  test('has role=link with accessible name from text content', async ({ mount, page }) => {
    await mount(AGDSTextLink, {
      props: { href: '/example' },
      slots: { default: 'Read more about accessibility' },
    })

    const link = page.locator('a')
    await expect(link).toHaveAttribute('href', '/example')
    // role=link is implicit on <a href>, so just verify it exists as a link.
    await expect(link).toHaveCount(1)
    await expect(link).toContainText('Read more about accessibility')
  })

  test('axe-clean: colour contrast and WAI-ARIA rules pass', async ({ mount, page }) => {
    await mount(AGDSTextLink, {
      props: { href: '/example' },
      slots: { default: 'Read more about accessibility' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // WAI-ARIA: links that open in a new tab must include an accessible warning
  // in the link name so screen reader users are not surprised by the context switch.
  // AGDSTextLinkExternal adds a visually-hidden ", opens in a new tab" callout
  // and aria-hidden="true" on the icon.
  test('external variant: has role=link with accessible new-tab warning in name', async ({ mount, page }) => {
    await mount(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit example.com' },
    })

    const link = page.locator('a')
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    // The accessible name must include the new-tab warning text.
    const accessibleName = await link.evaluate((el) =>
      (el as HTMLAnchorElement).textContent ?? '',
    )
    expect(accessibleName).toContain('opens in a new tab')
  })

  test('external variant: icon is hidden from assistive technology', async ({ mount, page }) => {
    await mount(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit example.com' },
    })

    // The external-link icon must be aria-hidden so AT does not announce it.
    const icon = page.locator('a svg[aria-hidden="true"]')
    await expect(icon).toHaveCount(1)
  })

  test('external variant: axe-clean', async ({ mount, page }) => {
    await mount(AGDSTextLinkExternal, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit example.com' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })

  // WAI-ARIA: accessible name via aria-label overrides text content.
  test('aria-label falls through $attrs and provides accessible name', async ({ mount, page }) => {
    await mount(AGDSTextLink, {
      props: { href: '/docs', 'aria-label': 'Read documentation' } as any,
      slots: { default: 'Docs' },
    })

    const link = page.locator('a')
    await expect(link).toHaveAttribute('aria-label', 'Read documentation')

    const results = await runAxe(page)
    expect(results.violations).toEqual([])
  })
})
