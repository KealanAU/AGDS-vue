import { defineNuxtModule, addComponentsDir, addImports, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'agds-vue',
    configKey: 'agdsVue',
    compatibility: { nuxt: '>=3.0.0' },
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Inject base styles — consumers don't need to manually import CSS
    nuxt.options.css.push('agds-vue/styles/tokens')
    nuxt.options.css.push('agds-vue/styles/base')

    // Register all components globally — Nuxt scans the components directory
    // and only bundles what is actually used (proper tree-shaking)
    addComponentsDir({
      path: resolver.resolve('components'),
      pathPrefix: false,
      global: true,
      pattern: '**/AGDS*.{vue,mjs}',
    })

    // Auto-import composables so consumers use them without manual imports
    addImports([
      { name: 'useBoxPalette', from: 'agds-vue' },
      { name: 'usePagination', from: 'agds-vue' },
      { name: 'useScrollToField', from: 'agds-vue' },
    ])
  },
})
