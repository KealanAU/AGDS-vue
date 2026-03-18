import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/nuxt.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'nuxt',
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      external: ['@nuxt/kit', '@nuxt/schema', 'nuxt', 'vue', 'reka-ui'],
    },
  },
})
