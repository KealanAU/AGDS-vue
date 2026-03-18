import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs'
import { _ as __nuxt_component_0$1 } from './nuxt-link-91XGOZ2f.mjs'
import { defineComponent, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue'
import { ssrRenderComponent } from 'vue/server-renderer'
import { u as useSeoMeta } from './v4-BoXkTVyN.mjs'
import { _ as _export_sfc } from './server.mjs'
import '../nitro/nitro.mjs'
import 'node:http'
import 'node:https'
import 'node:events'
import 'node:buffer'
import 'node:fs'
import 'node:path'
import 'node:crypto'
import 'node:url'
import 'better-sqlite3'
import '../routes/renderer.mjs'
import 'vue-bundle-renderer/runtime'
import 'unhead/server'
import 'devalue'
import 'unhead/plugins'
import 'unhead/utils'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'installation',
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: 'Installation — AGDS-vue',
      description: 'How to install and set up AGDS-vue in your Vue 3 project.',
    })
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0
      const _component_NuxtLink = __nuxt_component_0$1
      _push(
        ssrRenderComponent(
          _component_DocsLayout,
          _attrs,
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<article class="prose-page" data-v-271f3deb${_scopeId}><h1 data-v-271f3deb${_scopeId}>Installation</h1><h2 data-v-271f3deb${_scopeId}>Requirements</h2><ul data-v-271f3deb${_scopeId}><li data-v-271f3deb${_scopeId}>Vue 3.5+</li><li data-v-271f3deb${_scopeId}>Node 20+</li></ul><h2 data-v-271f3deb${_scopeId}>Install the package</h2><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>pnpm add AGDS-vue</code></pre><h2 data-v-271f3deb${_scopeId}>Register globally (recommended)</h2><p data-v-271f3deb${_scopeId}>Register all components and import the stylesheet once in <code data-v-271f3deb${_scopeId}>main.ts</code>:</p><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>import { createApp } from &#39;vue&#39;
import AgDSVue from &#39;AGDS-vue&#39;
import &#39;AGDS-vue/styles&#39;
import App from &#39;./App.vue&#39;

createApp(App).use(AgDSVue).mount(&#39;#app&#39;)</code></pre><h2 data-v-271f3deb${_scopeId}>Import individually</h2><p data-v-271f3deb${_scopeId}> For better tree-shaking, import only the components you need. Still import the stylesheet once in <code data-v-271f3deb${_scopeId}>main.ts</code> — not per-component: </p><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>// main.ts
import &#39;AGDS-vue/styles&#39;</code></pre><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>&lt;!-- MyComponent.vue --&gt;
&lt;script setup&gt;
import { AgDSButton } from &#39;AGDS-vue&#39;
&lt;/script&gt;</code></pre><h2 data-v-271f3deb${_scopeId}>Nuxt 3</h2><p data-v-271f3deb${_scopeId}>Create a plugin at <code data-v-271f3deb${_scopeId}>plugins/AGDS-vue.ts</code>:</p><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>import AgDSVue from &#39;AGDS-vue&#39;

export default defineNuxtPlugin((nuxtApp) =&gt; {
  nuxtApp.vueApp.use(AgDSVue)
})</code></pre><p data-v-271f3deb${_scopeId}>Add the stylesheet in <code data-v-271f3deb${_scopeId}>nuxt.config.ts</code>:</p><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>export default defineNuxtConfig({
  css: [&#39;AGDS-vue/styles&#39;],
  plugins: [&#39;~/plugins/AGDS-vue.ts&#39;],
})</code></pre><h2 data-v-271f3deb${_scopeId}>Design tokens</h2><p data-v-271f3deb${_scopeId}> All styles use <code data-v-271f3deb${_scopeId}>--agds-*</code> CSS custom properties. The stylesheet imported above includes all tokens. To override any token, declare it in your own CSS after the import: </p><pre data-v-271f3deb${_scopeId}><code data-v-271f3deb${_scopeId}>/* your-overrides.css */
:root {
  --agds-color-brand: #your-brand-colour;
  --agds-color-focus: #your-focus-colour;
}</code></pre><div class="callout" data-v-271f3deb${_scopeId}><strong data-v-271f3deb${_scopeId}>Next:</strong>`)
                _push2(
                  ssrRenderComponent(
                    _component_NuxtLink,
                    { to: '/foundations/tokens' },
                    {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`Explore the full token reference`)
                        } else {
                          return [createTextVNode('Explore the full token reference')]
                        }
                      }),
                      _: 1,
                    },
                    _parent2,
                    _scopeId,
                  ),
                )
                _push2(` or `)
                _push2(
                  ssrRenderComponent(
                    _component_NuxtLink,
                    { to: '/components' },
                    {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`browse all components`)
                        } else {
                          return [createTextVNode('browse all components')]
                        }
                      }),
                      _: 1,
                    },
                    _parent2,
                    _scopeId,
                  ),
                )
                _push2(`. </div></article>`)
              } else {
                return [
                  createVNode('article', { class: 'prose-page' }, [
                    createVNode('h1', null, 'Installation'),
                    createVNode('h2', null, 'Requirements'),
                    createVNode('ul', null, [
                      createVNode('li', null, 'Vue 3.5+'),
                      createVNode('li', null, 'Node 20+'),
                    ]),
                    createVNode('h2', null, 'Install the package'),
                    createVNode('pre', null, [createVNode('code', null, 'pnpm add AGDS-vue')]),
                    createVNode('h2', null, 'Register globally (recommended)'),
                    createVNode('p', null, [
                      createTextVNode('Register all components and import the stylesheet once in '),
                      createVNode('code', null, 'main.ts'),
                      createTextVNode(':'),
                    ]),
                    createVNode('pre', null, [
                      createVNode(
                        'code',
                        null,
                        "import { createApp } from 'vue'\nimport AgDSVue from 'AGDS-vue'\nimport 'AGDS-vue/styles'\nimport App from './App.vue'\n\ncreateApp(App).use(AgDSVue).mount('#app')",
                      ),
                    ]),
                    createVNode('h2', null, 'Import individually'),
                    createVNode('p', null, [
                      createTextVNode(
                        ' For better tree-shaking, import only the components you need. Still import the stylesheet once in ',
                      ),
                      createVNode('code', null, 'main.ts'),
                      createTextVNode(' — not per-component: '),
                    ]),
                    createVNode('pre', null, [
                      createVNode('code', null, "// main.ts\nimport 'AGDS-vue/styles'"),
                    ]),
                    createVNode('pre', null, [
                      createVNode(
                        'code',
                        null,
                        "<!-- MyComponent.vue -->\n<script setup>\nimport { AgDSButton } from 'AGDS-vue'\n<\/script>",
                      ),
                    ]),
                    createVNode('h2', null, 'Nuxt 3'),
                    createVNode('p', null, [
                      createTextVNode('Create a plugin at '),
                      createVNode('code', null, 'plugins/AGDS-vue.ts'),
                      createTextVNode(':'),
                    ]),
                    createVNode('pre', null, [
                      createVNode(
                        'code',
                        null,
                        "import AgDSVue from 'AGDS-vue'\n\nexport default defineNuxtPlugin((nuxtApp) => {\n  nuxtApp.vueApp.use(AgDSVue)\n})",
                      ),
                    ]),
                    createVNode('p', null, [
                      createTextVNode('Add the stylesheet in '),
                      createVNode('code', null, 'nuxt.config.ts'),
                      createTextVNode(':'),
                    ]),
                    createVNode('pre', null, [
                      createVNode(
                        'code',
                        null,
                        "export default defineNuxtConfig({\n  css: ['AGDS-vue/styles'],\n  plugins: ['~/plugins/AGDS-vue.ts'],\n})",
                      ),
                    ]),
                    createVNode('h2', null, 'Design tokens'),
                    createVNode('p', null, [
                      createTextVNode(' All styles use '),
                      createVNode('code', null, '--agds-*'),
                      createTextVNode(
                        ' CSS custom properties. The stylesheet imported above includes all tokens. To override any token, declare it in your own CSS after the import: ',
                      ),
                    ]),
                    createVNode('pre', null, [
                      createVNode(
                        'code',
                        null,
                        '/* your-overrides.css */\n:root {\n  --agds-color-brand: #your-brand-colour;\n  --agds-color-focus: #your-focus-colour;\n}',
                      ),
                    ]),
                    createVNode('div', { class: 'callout' }, [
                      createVNode('strong', null, 'Next:'),
                      createVNode(
                        _component_NuxtLink,
                        { to: '/foundations/tokens' },
                        {
                          default: withCtx(() => [
                            createTextVNode('Explore the full token reference'),
                          ]),
                          _: 1,
                        },
                      ),
                      createTextVNode(' or '),
                      createVNode(
                        _component_NuxtLink,
                        { to: '/components' },
                        {
                          default: withCtx(() => [createTextVNode('browse all components')]),
                          _: 1,
                        },
                      ),
                      createTextVNode('. '),
                    ]),
                  ]),
                ]
              }
            }),
            _: 1,
          },
          _parent,
        ),
      )
    }
  },
})
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'pages/installation.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const installation = /* @__PURE__ */ _export_sfc(_sfc_main, [['__scopeId', 'data-v-271f3deb']])

export { installation as default }
//# sourceMappingURL=installation-ByM3g1vc.mjs.map
