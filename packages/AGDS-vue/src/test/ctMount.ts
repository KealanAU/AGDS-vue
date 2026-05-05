/**
 * Re-exports the Playwright CT `test` and `expect` from the Vue adapter.
 *
 * Import from here in *.ct.ts files so the component fixture (`mount`) is
 * always available without having to import the long package name each time.
 */
export { test, expect } from '@playwright/experimental-ct-vue'
export type { MountOptions, MountResult } from '@playwright/experimental-ct-vue'
