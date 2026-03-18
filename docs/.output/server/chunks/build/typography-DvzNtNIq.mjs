import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "typography",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Typography — AGDS-vue",
      description: "Type scale and font tokens used across AGDS-vue."
    });
    const scale = [
      {
        token: "--agds-font-size-xs",
        rem: "0.75rem",
        px: "12px",
        sample: "xs — The quick brown fox"
      },
      {
        token: "--agds-font-size-sm",
        rem: "0.875rem",
        px: "14px",
        sample: "sm — The quick brown fox"
      },
      { token: "--agds-font-size-md", rem: "1rem", px: "16px", sample: "md — The quick brown fox" },
      {
        token: "--agds-font-size-lg",
        rem: "1.125rem",
        px: "18px",
        sample: "lg — The quick brown fox"
      },
      {
        token: "--agds-font-size-xl",
        rem: "1.25rem",
        px: "20px",
        sample: "xl — The quick brown fox"
      },
      {
        token: "--agds-font-size-2xl",
        rem: "1.5rem",
        px: "24px",
        sample: "2xl — The quick brown fox"
      },
      {
        token: "--agds-font-size-3xl",
        rem: "1.875rem",
        px: "30px",
        sample: "3xl — The quick brown fox"
      },
      {
        token: "--agds-font-size-4xl",
        rem: "2.25rem",
        px: "36px",
        sample: "4xl — The quick brown fox"
      }
    ];
    const weights = [
      { token: "--agds-font-weight-normal", value: "400", label: "Normal (400)" },
      { token: "--agds-font-weight-medium", value: "500", label: "Medium (500)" },
      { token: "--agds-font-weight-semibold", value: "600", label: "Semibold (600)" },
      { token: "--agds-font-weight-bold", value: "700", label: "Bold (700)" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="found-page" data-v-dd2ee041${_scopeId}><h1 data-v-dd2ee041${_scopeId}>Typography</h1><p class="found-page__intro" data-v-dd2ee041${_scopeId}> AGDS-vue uses a system font stack — no external fonts are loaded. All typographic values are available as <code data-v-dd2ee041${_scopeId}>--agds-font-*</code> tokens. </p><h2 data-v-dd2ee041${_scopeId}>Font family</h2><div class="font-family-card" data-v-dd2ee041${_scopeId}><p class="font-family-card__stack" data-v-dd2ee041${_scopeId}> system-ui, -apple-system, BlinkMacSystemFont, &#39;Segoe UI&#39;, Roboto, sans-serif </p><code class="font-family-card__token" data-v-dd2ee041${_scopeId}>--agds-font-family-body</code></div><h2 data-v-dd2ee041${_scopeId}>Size scale</h2><div class="type-scale" data-v-dd2ee041${_scopeId}><!--[-->`);
            ssrRenderList(scale, (step) => {
              _push2(`<div class="type-step" data-v-dd2ee041${_scopeId}><div class="type-step__meta" data-v-dd2ee041${_scopeId}><code class="type-step__token" data-v-dd2ee041${_scopeId}>${ssrInterpolate(step.token)}</code><span class="type-step__values" data-v-dd2ee041${_scopeId}>${ssrInterpolate(step.rem)} / ${ssrInterpolate(step.px)}</span></div><p class="type-step__sample" style="${ssrRenderStyle({ fontSize: step.rem, margin: 0 })}" data-v-dd2ee041${_scopeId}>${ssrInterpolate(step.sample)}</p></div>`);
            });
            _push2(`<!--]--></div><h2 data-v-dd2ee041${_scopeId}>Font weights</h2><div class="weight-grid" data-v-dd2ee041${_scopeId}><!--[-->`);
            ssrRenderList(weights, (w) => {
              _push2(`<div class="weight-card" data-v-dd2ee041${_scopeId}><p class="weight-card__sample" style="${ssrRenderStyle({ fontWeight: w.value })}" data-v-dd2ee041${_scopeId}>The quick brown fox</p><code class="weight-card__token" data-v-dd2ee041${_scopeId}>${ssrInterpolate(w.token)}</code><p class="weight-card__label" data-v-dd2ee041${_scopeId}>${ssrInterpolate(w.label)}</p></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "found-page" }, [
                createVNode("h1", null, "Typography"),
                createVNode("p", { class: "found-page__intro" }, [
                  createTextVNode(" AGDS-vue uses a system font stack — no external fonts are loaded. All typographic values are available as "),
                  createVNode("code", null, "--agds-font-*"),
                  createTextVNode(" tokens. ")
                ]),
                createVNode("h2", null, "Font family"),
                createVNode("div", { class: "font-family-card" }, [
                  createVNode("p", { class: "font-family-card__stack" }, " system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif "),
                  createVNode("code", { class: "font-family-card__token" }, "--agds-font-family-body")
                ]),
                createVNode("h2", null, "Size scale"),
                createVNode("div", { class: "type-scale" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(scale, (step) => {
                    return createVNode("div", {
                      key: step.token,
                      class: "type-step"
                    }, [
                      createVNode("div", { class: "type-step__meta" }, [
                        createVNode("code", { class: "type-step__token" }, toDisplayString(step.token), 1),
                        createVNode("span", { class: "type-step__values" }, toDisplayString(step.rem) + " / " + toDisplayString(step.px), 1)
                      ]),
                      createVNode("p", {
                        class: "type-step__sample",
                        style: { fontSize: step.rem, margin: 0 }
                      }, toDisplayString(step.sample), 5)
                    ]);
                  }), 64))
                ]),
                createVNode("h2", null, "Font weights"),
                createVNode("div", { class: "weight-grid" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(weights, (w) => {
                    return createVNode("div", {
                      key: w.token,
                      class: "weight-card"
                    }, [
                      createVNode("p", {
                        class: "weight-card__sample",
                        style: { fontWeight: w.value }
                      }, "The quick brown fox", 4),
                      createVNode("code", { class: "weight-card__token" }, toDisplayString(w.token), 1),
                      createVNode("p", { class: "weight-card__label" }, toDisplayString(w.label), 1)
                    ]);
                  }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foundations/typography.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const typography = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd2ee041"]]);

export { typography as default };
//# sourceMappingURL=typography-DvzNtNIq.mjs.map
