import type { AxeResults } from 'axe-core'

declare module 'vitest' {
  interface Assertion<R = any> {
    toHaveNoViolations(): R
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void
  }
}

export type { AxeResults }
