import axe from 'axe-core'
import { expect } from 'vitest'

/**
 * Runs axe-core against a container element and throws a descriptive error
 * if any accessibility violations are found.
 *
 * Usage:
 *   const { container } = render(MyComponent)
 *   await runAxe(container)
 */
export async function runAxe(
  container: HTMLElement,
  options?: axe.RunOptions,
): Promise<void> {
  const results = await axe.run(container, {
    // Ensures rules are evaluated against the actual DOM context
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    ...options,
  })

  if (results.violations.length === 0) return

  const message = results.violations
    .map((v) => {
      const nodes = v.nodes
        .map((n) => `    - ${n.target.join(', ')}\n      ${n.failureSummary}`)
        .join('\n')
      return `[${v.id}] ${v.description} (${v.impact})\n${nodes}`
    })
    .join('\n\n')

  expect.fail(`axe-core found ${results.violations.length} violation(s):\n\n${message}`)
}
