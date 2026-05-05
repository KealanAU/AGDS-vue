import { cleanup } from '@testing-library/vue'
import { afterEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'

// Register the toHaveNoViolations matcher globally so all test files can use
// expect(results).toHaveNoViolations() without any per-file setup.
expect.extend(axeMatchers)

// jsdom does not implement scrollIntoView — mock it globally so Reka UI
// keyboard navigation does not cause unhandled rejections in tests.
Element.prototype.scrollIntoView = vi.fn()

// Unmount and clean up the DOM after every test
afterEach(() => {
  cleanup()
})
