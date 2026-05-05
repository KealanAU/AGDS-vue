import { expect } from 'vitest'
import { configureAxe } from 'vitest-axe'
export { configureAxe } from 'vitest-axe'
export type { toHaveNoViolations } from 'vitest-axe/matchers'

/**
 * Pre-configured axe instance. The rule tags below are axe-core's internal
 * category names — keep them as-is. They cover WAI-ARIA role, state, property
 * and keyboard interaction requirements. These rules are necessary but not
 * sufficient for full WCAG conformance; that is a property of the consuming
 * application, not of individual primitive components.
 *
 * Usage in new-style tests:
 *   const results = await axe(container, AXE_OPTS)
 *   expect(results).toHaveNoViolations()
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
  },
})

/**
 * Backwards-compatible wrapper. Verifies WAI-ARIA APG conformance at the
 * component level by running axe against `container` and asserting no
 * violations via `expect(results).toHaveNoViolations()`.
 *
 * Existing call sites need no changes:
 *   await runAxe(container, AXE_OPTS)
 *
 * The `toHaveNoViolations` matcher is registered globally via setup.ts.
 */
export async function runAxe(
  container: Element,
  options?: Parameters<typeof axe>[1],
): Promise<void> {
  const results = await axe(container as HTMLElement, options)
  // Use the global expect injected by Vitest (globals: true in vitest.config.ts)
  // so we pick up the toHaveNoViolations matcher registered in setup.ts.
  expect(results).toHaveNoViolations()
}
