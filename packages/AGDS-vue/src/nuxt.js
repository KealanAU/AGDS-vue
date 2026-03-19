import { defineNuxtModule, addComponent, addImports } from '@nuxt/kit';
import { componentNames } from './componentNames';
export default defineNuxtModule({
    meta: {
        name: 'agds-vue',
        configKey: 'agdsVue',
        compatibility: { nuxt: '>=3.0.0' },
    },
    setup(_options, nuxt) {
        // Inject styles — consumers don't need css: ['agds-vue/styles']
        nuxt.options.css.push('agds-vue/styles');
        // Register all components globally (works with Nuxt Content MDC renderer too)
        for (const name of componentNames) {
            addComponent({
                name,
                export: name,
                filePath: 'agds-vue',
                global: true,
            });
        }
        // Auto-import composables so consumers use them without manual imports
        addImports([
            { name: 'useBoxPalette', from: 'agds-vue' },
            { name: 'usePagination', from: 'agds-vue' },
            { name: 'useScrollToField', from: 'agds-vue' },
        ]);
    },
});
