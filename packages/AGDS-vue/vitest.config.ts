import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json-summary', 'json'],
      include: ['src/components/**/*.vue', 'src/components/**/*.ts'],
      exclude: [
        'src/test/**',
        'src/index.ts',
        'src/components/**/index.ts',
        'src/components/**/*.ct.ts',
        'src/components/**/*Fixture.vue',
        'src/components/**/comboboxTypes.ts',
        'src/components/**/datePickerTypes.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
