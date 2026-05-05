import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { test, expect } from '../../test/ctMount'
import AGDSProgressIndicator from './AGDSProgressIndicator.vue'
import type { ProgressIndicatorItem } from './AGDSProgressIndicator.vue'

// ─── axe helper ──────────────────────────────────────────────────────────────

/**
 * Runs axe rules covering WAI-ARIA roles, states, and properties. In
 * Playwright these run against real Chromium so colour-contrast is evaluated
 * against actual computed styles.
 *
 * withTags: covers WAI-ARIA role/state/property requirements and colour-contrast
 * in real Chromium. WCAG conformance is a property of the consuming application.
 *
 * Page-level structural rules are disabled because component tests run in a
 * minimal HTML page that intentionally lacks those page-structure landmarks.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include('#app')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze()
  return results
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const baseSteps: ProgressIndicatorItem[] = [
  { label: 'Personal details', status: 'done', href: '/step-1' },
  { label: 'Contact information', status: 'doing', href: '/step-2' },
  { label: 'Review and submit', status: 'todo', href: '/step-3' },
]

const stepsWithBlocked: ProgressIndicatorItem[] = [
  { label: 'Eligibility check', status: 'done', href: '/step-1' },
  { label: 'Upload documents', status: 'doing', href: '/step-2' },
  { label: 'Declaration', status: 'blocked', href: '/step-3' },
  { label: 'Submit application', status: 'todo', href: '/step-4' },
]

const stepsWithError: ProgressIndicatorItem[] = [
  { label: 'Personal details', status: 'error', href: '/step-1' },
  { label: 'Contact information', status: 'todo', href: '/step-2' },
]

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('WAI-ARIA APG — progress indicator (real-browser, colour-contrast enabled)', () => {
  // APG: step progress indicators must expose a list structure so assistive
  // technology can announce step count and position.
  test('renders list of steps, all axe-clean', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: { items: baseSteps, activePath: '/step-2' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // The step list must be a <ul> (unordered list of steps).
    const list = page.locator('ul.agds-progress-indicator__list')
    await expect(list).toBeVisible()

    // Each item must be a <li>.
    const items = list.locator('li')
    await expect(items).toHaveCount(baseSteps.length)
  })

  // APG: the active/current step must expose aria-current="step" so AT can
  // announce which step the user is currently on.
  test('active step has aria-current="step"', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: { items: baseSteps, activePath: '/step-2' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // The active step's interactive element carries aria-current="step".
    const activeContent = page.locator('[aria-current="step"]')
    await expect(activeContent).toHaveCount(1)
    await expect(activeContent).toContainText('Contact information')
  })

  // APG: completed steps must be visually and semantically distinct. The
  // status text "Completed" provides the semantic signal for AT users.
  test('completed step state is axe-clean', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: {
        items: [
          { label: 'Personal details', status: 'done', href: '/step-1' },
          { label: 'Contact information', status: 'todo', href: '/step-2' },
        ],
        activePath: '/step-2',
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    // The done step must expose its status label to AT via visible text.
    const doneItem = page
      .locator('li.agds-progress-indicator__item')
      .filter({ hasText: 'Personal details' })
    await expect(doneItem.locator('.agds-progress-indicator__status-text')).toHaveText('Completed')
  })

  // APG: blocked steps must communicate that the step cannot be started yet.
  // The status text "Cannot start yet" provides this signal.
  test('blocked step state is axe-clean', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: { items: stepsWithBlocked, activePath: '/step-2' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const blockedItem = page
      .locator('li.agds-progress-indicator__item')
      .filter({ hasText: 'Declaration' })
    await expect(blockedItem.locator('.agds-progress-indicator__status-text')).toHaveText(
      'Cannot start yet',
    )
  })

  // APG: todo steps must communicate that the step has not been started.
  test('todo step state is axe-clean', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: {
        items: [
          { label: 'Step one', status: 'done', href: '/step-1' },
          { label: 'Step two', status: 'todo', href: '/step-2' },
        ],
        activePath: '/step-1',
      },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const todoItem = page
      .locator('li.agds-progress-indicator__item')
      .filter({ hasText: 'Step two' })
    await expect(todoItem.locator('.agds-progress-indicator__status-text')).toHaveText(
      'Not started',
    )
  })

  // error status must expose "Error" label and remain axe-clean.
  test('error step state is axe-clean', async ({ mount, page }) => {
    await mount(AGDSProgressIndicator, {
      props: { items: stepsWithError, activePath: '/step-2' },
    })

    const results = await runAxe(page)
    expect(results.violations).toEqual([])

    const errorItem = page
      .locator('li.agds-progress-indicator__item')
      .filter({ hasText: 'Personal details' })
    await expect(errorItem.locator('.agds-progress-indicator__status-text')).toHaveText('Error')
  })
})
