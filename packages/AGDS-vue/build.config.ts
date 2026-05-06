import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/',
      outDir: './dist/',
      builder: 'mkdist',
    },
  ],
  declaration: true,
  failOnWarn: false,
  clean: true,
  rollup: {
    emitCJS: false,
  },
  externals: ['vue', 'reka-ui', '@iconify/vue', '@nuxt/kit', '@nuxt/schema', 'nuxt'],
  hooks: {
    'mkdist:entry:options'(_ctx, _entry, options) {
      options.addRelativeDeclarationExtensions = false
      options.pattern = ['**', '!**/*.test.ts', '!**/*.ct.ts', '!**/*Fixture.vue', '!**/test/**']
    },
  },
})
