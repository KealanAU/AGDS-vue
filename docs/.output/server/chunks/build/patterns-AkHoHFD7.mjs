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
  __name: "patterns",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Patterns — AGDS-vue",
      description: "Common UI patterns for Australian government digital services. Coming soon."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="coming-soon" data-v-e3d99582${_scopeId}><div class="coming-soon__badge" data-v-e3d99582${_scopeId}>Coming soon</div><h1 class="coming-soon__title" data-v-e3d99582${_scopeId}>Patterns</h1><p class="coming-soon__body" data-v-e3d99582${_scopeId}> Patterns are reusable compositions of components that solve common government service design problems — things like multi-step form flows, address collection, search and filter interfaces, and confirmation pages. </p><p class="coming-soon__body" data-v-e3d99582${_scopeId}> Patterns will be added once the core component library reaches P1 completion. Track progress in <a href="https://github.com/your-org/AGDS-vue" target="_blank" rel="noopener" data-v-e3d99582${_scopeId}>the repository</a>. </p>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/components",
              class: "coming-soon__link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Browse components instead`);
                } else {
                  return [
                    createTextVNode("Browse components instead")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "coming-soon" }, [
                createVNode("div", { class: "coming-soon__badge" }, "Coming soon"),
                createVNode("h1", { class: "coming-soon__title" }, "Patterns"),
                createVNode("p", { class: "coming-soon__body" }, " Patterns are reusable compositions of components that solve common government service design problems — things like multi-step form flows, address collection, search and filter interfaces, and confirmation pages. "),
                createVNode("p", { class: "coming-soon__body" }, [
                  createTextVNode(" Patterns will be added once the core component library reaches P1 completion. Track progress in "),
                  createVNode("a", {
                    href: "https://github.com/your-org/AGDS-vue",
                    target: "_blank",
                    rel: "noopener"
                  }, "the repository"),
                  createTextVNode(". ")
                ]),
                createVNode(_component_NuxtLink, {
                  to: "/components",
                  class: "coming-soon__link"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Browse components instead")
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/patterns.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const patterns = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3d99582"]]);

export { patterns as default };
//# sourceMappingURL=patterns-AkHoHFD7.mjs.map
