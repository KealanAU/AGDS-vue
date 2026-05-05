import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.ct.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    ctViteConfig: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
