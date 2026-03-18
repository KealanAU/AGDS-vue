import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-91XGOZ2f.mjs';
import { defineComponent, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeoMeta } from './v4-BoXkTVyN.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-sqlite3';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "AgDS-vue — Agriculture Design System",
      description: "Accessible Vue 3 components for the Agriculture Design System (AgDS) — Department of Agriculture, Fisheries and Forestry."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="intro" data-v-80acb673${_scopeId}><h1 class="intro__title" data-v-80acb673${_scopeId}>AGDS-vue</h1><p class="intro__lead" data-v-80acb673${_scopeId}> A suite of accessible Vue 3 components for building the Export Service with efficiency and consistency. Built on <a href="https://reka-ui.com" target="_blank" rel="noopener" data-v-80acb673${_scopeId}>Reka UI</a> primitives with <code data-v-80acb673${_scopeId}>--agds-*</code> design tokens. </p><div class="intro__actions" data-v-80acb673${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/installation",
              class: "intro__cta intro__cta--primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Get started`);
                } else {
                  return [
                    createTextVNode("Get started")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/components",
              class: "intro__cta intro__cta--secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Browse components`);
                } else {
                  return [
                    createTextVNode("Browse components")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="intro__features" data-v-80acb673${_scopeId}><div class="feature" data-v-80acb673${_scopeId}><h2 class="feature__title" data-v-80acb673${_scopeId}>Accessible by default</h2><p class="feature__body" data-v-80acb673${_scopeId}> Every interactive component gets correct keyboard navigation, focus management, and ARIA attributes via Reka UI — no configuration needed. </p></div><div class="feature" data-v-80acb673${_scopeId}><h2 class="feature__title" data-v-80acb673${_scopeId}>Design tokens</h2><p class="feature__body" data-v-80acb673${_scopeId}> All colours, spacing, and typography are <code data-v-80acb673${_scopeId}>--agds-*</code> CSS custom properties. Override the whole system with a handful of variable declarations. </p></div><div class="feature" data-v-80acb673${_scopeId}><h2 class="feature__title" data-v-80acb673${_scopeId}>TypeScript-first</h2><p class="feature__body" data-v-80acb673${_scopeId}> Fully typed props, emits, and slots on every component. Exported interfaces let you build typed wrappers with zero effort. </p></div><div class="feature" data-v-80acb673${_scopeId}><h2 class="feature__title" data-v-80acb673${_scopeId}>Digital Service Standard</h2><p class="feature__body" data-v-80acb673${_scopeId}> Built to align with all 10 criteria of the `);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/digital-service-standard" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Digital Service Standard`);
                } else {
                  return [
                    createTextVNode("Digital Service Standard")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`. </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "intro" }, [
                createVNode("h1", { class: "intro__title" }, "AGDS-vue"),
                createVNode("p", { class: "intro__lead" }, [
                  createTextVNode(" A suite of accessible Vue 3 components for building the Export Service with efficiency and consistency. Built on "),
                  createVNode("a", {
                    href: "https://reka-ui.com",
                    target: "_blank",
                    rel: "noopener"
                  }, "Reka UI"),
                  createTextVNode(" primitives with "),
                  createVNode("code", null, "--agds-*"),
                  createTextVNode(" design tokens. ")
                ]),
                createVNode("div", { class: "intro__actions" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/installation",
                    class: "intro__cta intro__cta--primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Get started")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, {
                    to: "/components",
                    class: "intro__cta intro__cta--secondary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Browse components")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "intro__features" }, [
                  createVNode("div", { class: "feature" }, [
                    createVNode("h2", { class: "feature__title" }, "Accessible by default"),
                    createVNode("p", { class: "feature__body" }, " Every interactive component gets correct keyboard navigation, focus management, and ARIA attributes via Reka UI — no configuration needed. ")
                  ]),
                  createVNode("div", { class: "feature" }, [
                    createVNode("h2", { class: "feature__title" }, "Design tokens"),
                    createVNode("p", { class: "feature__body" }, [
                      createTextVNode(" All colours, spacing, and typography are "),
                      createVNode("code", null, "--agds-*"),
                      createTextVNode(" CSS custom properties. Override the whole system with a handful of variable declarations. ")
                    ])
                  ]),
                  createVNode("div", { class: "feature" }, [
                    createVNode("h2", { class: "feature__title" }, "TypeScript-first"),
                    createVNode("p", { class: "feature__body" }, " Fully typed props, emits, and slots on every component. Exported interfaces let you build typed wrappers with zero effort. ")
                  ]),
                  createVNode("div", { class: "feature" }, [
                    createVNode("h2", { class: "feature__title" }, "Digital Service Standard"),
                    createVNode("p", { class: "feature__body" }, [
                      createTextVNode(" Built to align with all 10 criteria of the "),
                      createVNode(_component_NuxtLink, { to: "/digital-service-standard" }, {
                        default: withCtx(() => [
                          createTextVNode("Digital Service Standard")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-80acb673"]]);

export { index as default };
//# sourceMappingURL=index-glo07kdy.mjs.map
