import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "colours",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Colours — AGDS-vue",
      description: "The colour palette used across AGDS-vue, derived from the AGDS brand colours."
    });
    const palettes = [
      {
        title: "Brand",
        description: "Core palette. Use brand as the primary action colour throughout.",
        swatches: [
          { token: "--agds-color-brand", hex: "#00698f", label: "Brand", on: "white" },
          { token: "--agds-color-brand-hover", hex: "#005572", label: "Brand hover", on: "white" },
          { token: "--agds-color-brand-active", hex: "#004260", label: "Brand active", on: "white" },
          { token: "--agds-color-brand-muted", hex: "#e0f0f5", label: "Brand muted", on: "dark" },
          {
            token: "--agds-color-brand-muted-fg",
            hex: "#003d54",
            label: "Brand muted fg",
            on: "white"
          }
        ]
      },
      {
        title: "Text",
        swatches: [
          { token: "--agds-color-text", hex: "#313131", label: "Text", on: "white" },
          { token: "--agds-color-text-muted", hex: "#6e6e6e", label: "Text muted", on: "white" },
          { token: "--agds-color-text-inverse", hex: "#ffffff", label: "Text inverse", on: "dark" },
          {
            token: "--agds-color-text-disabled",
            hex: "#9d9d9d",
            label: "Text disabled",
            on: "white"
          }
        ]
      },
      {
        title: "Background",
        swatches: [
          { token: "--agds-color-bg", hex: "#ffffff", label: "Background", on: "dark" },
          { token: "--agds-color-bg-subtle", hex: "#f5f5f5", label: "Background subtle", on: "dark" },
          { token: "--agds-color-bg-muted", hex: "#e8e8e8", label: "Background muted", on: "dark" }
        ]
      },
      {
        title: "Focus",
        description: "Purple focus ring — 3px solid, meets WCAG 2.2 focus appearance.",
        swatches: [{ token: "--agds-color-focus", hex: "#9263de", label: "Focus ring", on: "white" }]
      },
      {
        title: "Status",
        swatches: [
          { token: "--agds-color-success", hex: "#0b7e00", label: "Success", on: "white" },
          { token: "--agds-color-success-muted", hex: "#e5f5e3", label: "Success muted", on: "dark" },
          { token: "--agds-color-warning", hex: "#c56900", label: "Warning", on: "white" },
          { token: "--agds-color-warning-muted", hex: "#fdf3e3", label: "Warning muted", on: "dark" },
          { token: "--agds-color-error", hex: "#d60000", label: "Error", on: "white" },
          { token: "--agds-color-error-muted", hex: "#fde8e8", label: "Error muted", on: "dark" }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="found-page" data-v-9a11c7f8${_scopeId}><h1 data-v-9a11c7f8${_scopeId}>Colours</h1><p class="found-page__intro" data-v-9a11c7f8${_scopeId}> The AgDS-vue colour system is derived from the Agriculture Design System brand palette. Every colour is available as a <code data-v-9a11c7f8${_scopeId}>--agds-color-*</code> CSS custom property. </p><!--[-->`);
            ssrRenderList(palettes, (palette) => {
              _push2(`<div class="palette" data-v-9a11c7f8${_scopeId}><h2 class="palette__title" data-v-9a11c7f8${_scopeId}>${ssrInterpolate(palette.title)}</h2>`);
              if (palette.description) {
                _push2(`<p class="palette__desc" data-v-9a11c7f8${_scopeId}>${ssrInterpolate(palette.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="swatch-grid" data-v-9a11c7f8${_scopeId}><!--[-->`);
              ssrRenderList(palette.swatches, (s) => {
                _push2(`<div class="swatch" data-v-9a11c7f8${_scopeId}><div style="${ssrRenderStyle({ backgroundColor: s.hex })}" class="${ssrRenderClass([s.on === "dark" ? "swatch__block--dark-border" : "", "swatch__block"])}" data-v-9a11c7f8${_scopeId}></div><div class="swatch__meta" data-v-9a11c7f8${_scopeId}><p class="swatch__label" data-v-9a11c7f8${_scopeId}>${ssrInterpolate(s.label)}</p><p class="swatch__hex" data-v-9a11c7f8${_scopeId}>${ssrInterpolate(s.hex)}</p><p class="swatch__token" data-v-9a11c7f8${_scopeId}>${ssrInterpolate(s.token)}</p></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "found-page" }, [
                createVNode("h1", null, "Colours"),
                createVNode("p", { class: "found-page__intro" }, [
                  createTextVNode(" The AgDS-vue colour system is derived from the Agriculture Design System brand palette. Every colour is available as a "),
                  createVNode("code", null, "--agds-color-*"),
                  createTextVNode(" CSS custom property. ")
                ]),
                (openBlock(), createBlock(Fragment, null, renderList(palettes, (palette) => {
                  return createVNode("div", {
                    key: palette.title,
                    class: "palette"
                  }, [
                    createVNode("h2", { class: "palette__title" }, toDisplayString(palette.title), 1),
                    palette.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "palette__desc"
                    }, toDisplayString(palette.description), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "swatch-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(palette.swatches, (s) => {
                        return openBlock(), createBlock("div", {
                          key: s.token,
                          class: "swatch"
                        }, [
                          createVNode("div", {
                            class: ["swatch__block", s.on === "dark" ? "swatch__block--dark-border" : ""],
                            style: { backgroundColor: s.hex }
                          }, null, 6),
                          createVNode("div", { class: "swatch__meta" }, [
                            createVNode("p", { class: "swatch__label" }, toDisplayString(s.label), 1),
                            createVNode("p", { class: "swatch__hex" }, toDisplayString(s.hex), 1),
                            createVNode("p", { class: "swatch__token" }, toDisplayString(s.token), 1)
                          ])
                        ]);
                      }), 128))
                    ])
                  ]);
                }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foundations/colours.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colours = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a11c7f8"]]);

export { colours as default };
//# sourceMappingURL=colours-JDQEPgGZ.mjs.map
