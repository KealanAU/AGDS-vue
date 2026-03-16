import { cleanup } from '@testing-library/vue'
import { afterEach, vi } from 'vitest'

// jsdom does not implement scrollIntoView — mock it globally so Reka UI
// keyboard navigation does not cause unhandled rejections in tests.
Element.prototype.scrollIntoView = vi.fn()

// Unmount and clean up the DOM after every test
afterEach(() => {
  cleanup()
})
