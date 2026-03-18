import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSeoMeta } from './v4-BoXkTVyN.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-91XGOZ2f.mjs';
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
  __name: "spacing",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Spacing — AGDS-vue",
      description: "The spacing scale and layout tokens used across AGDS-vue."
    });
    const scale = [
      { token: "--agds-space-1", rem: "0.25rem", px: "4px" },
      { token: "--agds-space-2", rem: "0.5rem", px: "8px" },
      { token: "--agds-space-3", rem: "0.75rem", px: "12px" },
      { token: "--agds-space-4", rem: "1rem", px: "16px" },
      { token: "--agds-space-5", rem: "1.25rem", px: "20px" },
      { token: "--agds-space-6", rem: "1.5rem", px: "24px" },
      { token: "--agds-space-8", rem: "2rem", px: "32px" },
      { token: "--agds-space-10", rem: "2.5rem", px: "40px" },
      { token: "--agds-space-12", rem: "3rem", px: "48px" },
      { token: "--agds-space-16", rem: "4rem", px: "64px" },
      { token: "--agds-space-20", rem: "5rem", px: "80px" },
      { token: "--agds-space-24", rem: "6rem", px: "96px" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="found-page" data-v-88fa953e${_scopeId}><h1 data-v-88fa953e${_scopeId}>Spacing</h1><p class="found-page__intro" data-v-88fa953e${_scopeId}> A base-4px spacing scale. Every margin, padding, and gap value in AGDS-vue uses a <code data-v-88fa953e${_scopeId}>--agds-space-*</code> token — no arbitrary values. </p><div class="space-table-wrap" data-v-88fa953e${_scopeId}><table class="space-table" data-v-88fa953e${_scopeId}><thead data-v-88fa953e${_scopeId}><tr data-v-88fa953e${_scopeId}><th scope="col" data-v-88fa953e${_scopeId}>Token</th><th scope="col" data-v-88fa953e${_scopeId}>rem</th><th scope="col" data-v-88fa953e${_scopeId}>px</th><th scope="col" data-v-88fa953e${_scopeId}>Visual</th></tr></thead><tbody data-v-88fa953e${_scopeId}><!--[-->`);
            ssrRenderList(scale, (step) => {
              _push2(`<tr data-v-88fa953e${_scopeId}><td data-v-88fa953e${_scopeId}><code class="space-token" data-v-88fa953e${_scopeId}>${ssrInterpolate(step.token)}</code></td><td data-v-88fa953e${_scopeId}><code class="space-value" data-v-88fa953e${_scopeId}>${ssrInterpolate(step.rem)}</code></td><td data-v-88fa953e${_scopeId}><code class="space-value" data-v-88fa953e${_scopeId}>${ssrInterpolate(step.px)}</code></td><td data-v-88fa953e${_scopeId}><div class="space-bar" style="${ssrRenderStyle({ width: step.rem, minWidth: "2px" })}"${ssrRenderAttr("aria-label", `${step.px} wide`)} data-v-88fa953e${_scopeId}></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "found-page" }, [
                createVNode("h1", null, "Spacing"),
                createVNode("p", { class: "found-page__intro" }, [
                  createTextVNode(" A base-4px spacing scale. Every margin, padding, and gap value in AGDS-vue uses a "),
                  createVNode("code", null, "--agds-space-*"),
                  createTextVNode(" token — no arbitrary values. ")
                ]),
                createVNode("div", { class: "space-table-wrap" }, [
                  createVNode("table", { class: "space-table" }, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { scope: "col" }, "Token"),
                        createVNode("th", { scope: "col" }, "rem"),
                        createVNode("th", { scope: "col" }, "px"),
                        createVNode("th", { scope: "col" }, "Visual")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(scale, (step) => {
                        return createVNode("tr", {
                          key: step.token
                        }, [
                          createVNode("td", null, [
                            createVNode("code", { class: "space-token" }, toDisplayString(step.token), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("code", { class: "space-value" }, toDisplayString(step.rem), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("code", { class: "space-value" }, toDisplayString(step.px), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", {
                              class: "space-bar",
                              style: { width: step.rem, minWidth: "2px" },
                              "aria-label": `${step.px} wide`
                            }, null, 12, ["aria-label"])
                          ])
                        ]);
                      }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foundations/spacing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const spacing = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-88fa953e"]]);

export { spacing as default };
//# sourceMappingURL=spacing-Dua9TXML.mjs.map
