import { defineNuxtModule, addComponent } from '@nuxt/kit';
import { componentNames } from './componentNames';
export default defineNuxtModule({
    meta: {
        name: 'agds-vue',
        configKey: 'agdsVue',
        compatibility: { nuxt: '>=3.0.0' },
    },
    setup(_options, nuxt) {
        // Inject styles so consumers don't need to add css: ['agds-vue/styles'] manually
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
    },
});
