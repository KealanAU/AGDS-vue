import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
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
  __name: "tokens",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Design Tokens — AGDS-vue",
      description: "Full reference for all --agds-* CSS custom properties."
    });
    const tokenGroups = [
      {
        title: "Brand colours",
        description: "Primary palette derived from the AGDS brand colour.",
        tokens: [
          { name: "--agds-color-brand", value: "#00698f", type: "color" },
          { name: "--agds-color-brand-hover", value: "#005572", type: "color" },
          { name: "--agds-color-brand-active", value: "#004260", type: "color" },
          { name: "--agds-color-brand-muted", value: "#e0f0f5", type: "color" },
          { name: "--agds-color-brand-muted-fg", value: "#003d54", type: "color" }
        ]
      },
      {
        title: "Text",
        description: "Text colours for body, muted, inverse, and disabled states.",
        tokens: [
          { name: "--agds-color-text", value: "#313131", type: "color" },
          { name: "--agds-color-text-muted", value: "#6e6e6e", type: "color" },
          { name: "--agds-color-text-inverse", value: "#ffffff", type: "color" },
          { name: "--agds-color-text-disabled", value: "#9d9d9d", type: "color" }
        ]
      },
      {
        title: "Background",
        tokens: [
          { name: "--agds-color-bg", value: "#ffffff", type: "color" },
          { name: "--agds-color-bg-subtle", value: "#f5f5f5", type: "color" },
          { name: "--agds-color-bg-muted", value: "#e8e8e8", type: "color" }
        ]
      },
      {
        title: "Focus ring",
        description: "Purple focus ring — meets WCAG 2.2 focus appearance requirements.",
        tokens: [
          { name: "--agds-color-focus", value: "#9263de", type: "color" },
          { name: "--agds-color-focus-width", value: "3px", type: "dimension" }
        ]
      },
      {
        title: "Spacing",
        description: "Spacing scale in rem. Base unit is 4px (0.25rem).",
        tokens: [
          { name: "--agds-space-1", value: "0.25rem  / 4px", type: "spacing" },
          { name: "--agds-space-2", value: "0.5rem   / 8px", type: "spacing" },
          { name: "--agds-space-3", value: "0.75rem  / 12px", type: "spacing" },
          { name: "--agds-space-4", value: "1rem     / 16px", type: "spacing" },
          { name: "--agds-space-5", value: "1.25rem  / 20px", type: "spacing" },
          { name: "--agds-space-6", value: "1.5rem   / 24px", type: "spacing" },
          { name: "--agds-space-8", value: "2rem     / 32px", type: "spacing" },
          { name: "--agds-space-10", value: "2.5rem   / 40px", type: "spacing" },
          { name: "--agds-space-12", value: "3rem     / 48px", type: "spacing" },
          { name: "--agds-space-16", value: "4rem     / 64px", type: "spacing" }
        ]
      },
      {
        title: "Font size",
        tokens: [
          { name: "--agds-font-size-xs", value: "0.75rem  / 12px", type: "font-size" },
          { name: "--agds-font-size-sm", value: "0.875rem / 14px", type: "font-size" },
          { name: "--agds-font-size-md", value: "1rem     / 16px", type: "font-size" },
          { name: "--agds-font-size-lg", value: "1.125rem / 18px", type: "font-size" },
          { name: "--agds-font-size-xl", value: "1.25rem  / 20px", type: "font-size" },
          { name: "--agds-font-size-2xl", value: "1.5rem   / 24px", type: "font-size" },
          { name: "--agds-font-size-3xl", value: "1.875rem / 30px", type: "font-size" },
          { name: "--agds-font-size-4xl", value: "2.25rem  / 36px", type: "font-size" }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tokens-page" data-v-bc2cceeb${_scopeId}><h1 data-v-bc2cceeb${_scopeId}>Design tokens</h1><p class="tokens-page__intro" data-v-bc2cceeb${_scopeId}> All values in AGDS-vue use <code data-v-bc2cceeb${_scopeId}>--agds-*</code> CSS custom properties. Override any token in your own CSS after importing the stylesheet: </p><pre data-v-bc2cceeb${_scopeId}><code data-v-bc2cceeb${_scopeId}>:root {
  --agds-color-brand: #your-colour;
  --agds-color-focus: #your-focus-ring;
}</code></pre><p data-v-bc2cceeb${_scopeId}> See <code data-v-bc2cceeb${_scopeId}>packages/AGDS-vue/src/styles/tokens.css</code> for the complete list. </p><!--[-->`);
            ssrRenderList(tokenGroups, (group) => {
              _push2(`<div class="token-group" data-v-bc2cceeb${_scopeId}><h2 class="token-group__title" data-v-bc2cceeb${_scopeId}>${ssrInterpolate(group.title)}</h2>`);
              if (group.description) {
                _push2(`<p class="token-group__desc" data-v-bc2cceeb${_scopeId}>${ssrInterpolate(group.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="token-table-wrapper" data-v-bc2cceeb${_scopeId}><table class="token-table" data-v-bc2cceeb${_scopeId}><thead data-v-bc2cceeb${_scopeId}><tr data-v-bc2cceeb${_scopeId}><th scope="col" data-v-bc2cceeb${_scopeId}>Token</th><th scope="col" data-v-bc2cceeb${_scopeId}>Value</th>`);
              if (group.tokens[0]?.type === "color") {
                _push2(`<th scope="col" data-v-bc2cceeb${_scopeId}>Swatch</th>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr></thead><tbody data-v-bc2cceeb${_scopeId}><!--[-->`);
              ssrRenderList(group.tokens, (token) => {
                _push2(`<tr data-v-bc2cceeb${_scopeId}><td data-v-bc2cceeb${_scopeId}><code class="token-name" data-v-bc2cceeb${_scopeId}>${ssrInterpolate(token.name)}</code></td><td data-v-bc2cceeb${_scopeId}><code class="token-value" data-v-bc2cceeb${_scopeId}>${ssrInterpolate(token.value)}</code></td>`);
                if (token.type === "color") {
                  _push2(`<td data-v-bc2cceeb${_scopeId}><span class="token-swatch" style="${ssrRenderStyle({ backgroundColor: `var(${token.name})` })}"${ssrRenderAttr("aria-label", `Colour swatch for ${token.name}`)} role="img" data-v-bc2cceeb${_scopeId}></span></td>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "tokens-page" }, [
                createVNode("h1", null, "Design tokens"),
                createVNode("p", { class: "tokens-page__intro" }, [
                  createTextVNode(" All values in AGDS-vue use "),
                  createVNode("code", null, "--agds-*"),
                  createTextVNode(" CSS custom properties. Override any token in your own CSS after importing the stylesheet: ")
                ]),
                createVNode("pre", null, [
                  createVNode("code", null, ":root {\n  --agds-color-brand: #your-colour;\n  --agds-color-focus: #your-focus-ring;\n}")
                ]),
                createVNode("p", null, [
                  createTextVNode(" See "),
                  createVNode("code", null, "packages/AGDS-vue/src/styles/tokens.css"),
                  createTextVNode(" for the complete list. ")
                ]),
                (openBlock(), createBlock(Fragment, null, renderList(tokenGroups, (group) => {
                  return createVNode("div", {
                    key: group.title,
                    class: "token-group"
                  }, [
                    createVNode("h2", { class: "token-group__title" }, toDisplayString(group.title), 1),
                    group.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "token-group__desc"
                    }, toDisplayString(group.description), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "token-table-wrapper" }, [
                      createVNode("table", { class: "token-table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { scope: "col" }, "Token"),
                            createVNode("th", { scope: "col" }, "Value"),
                            group.tokens[0]?.type === "color" ? (openBlock(), createBlock("th", {
                              key: 0,
                              scope: "col"
                            }, "Swatch")) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(group.tokens, (token) => {
                            return openBlock(), createBlock("tr", {
                              key: token.name
                            }, [
                              createVNode("td", null, [
                                createVNode("code", { class: "token-name" }, toDisplayString(token.name), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("code", { class: "token-value" }, toDisplayString(token.value), 1)
                              ]),
                              token.type === "color" ? (openBlock(), createBlock("td", { key: 0 }, [
                                createVNode("span", {
                                  class: "token-swatch",
                                  style: { backgroundColor: `var(${token.name})` },
                                  "aria-label": `Colour swatch for ${token.name}`,
                                  role: "img"
                                }, null, 12, ["aria-label"])
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foundations/tokens.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tokens = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc2cceeb"]]);

export { tokens as default };
//# sourceMappingURL=tokens-BxVAOKG8.mjs.map
