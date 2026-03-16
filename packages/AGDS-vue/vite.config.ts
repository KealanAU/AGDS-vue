import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'AgDSVue',
      fileName: 'AGDS-vue',
    },
    rollupOptions: {
      external: ['vue', 'reka-ui'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'reka-ui': 'RekaUI',
        },
      },
    },
  },
})
