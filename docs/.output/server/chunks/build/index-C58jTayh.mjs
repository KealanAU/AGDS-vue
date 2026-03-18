import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-91XGOZ2f.mjs';
import { defineComponent, withAsyncContext, computed, ref, withCtx, unref, createVNode, toDisplayString, withDirectives, isRef, vModelText, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { u as useSeoMeta } from './v4-BoXkTVyN.mjs';
import { u as useAsyncData, q as queryCollection } from './client-kI3uTTuq.mjs';
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
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Components — AGDS-vue",
      description: "All 86 components in the AGDS-vue library, grouped by category."
    });
    const { data: docs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "component-docs",
      () => queryCollection("components").all()
    )), __temp = await __temp, __restore(), __temp);
    const docLookup = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const doc of docs.value ?? []) {
        const slug = doc.path.replace("/components/", "");
        map.set(doc.title.toLowerCase(), {
          slug,
          status: doc.status ?? "stable"
        });
      }
      return map;
    });
    function docFor(name) {
      return docLookup.value.get(name.toLowerCase()) ?? null;
    }
    const categories = [
      {
        name: "Content",
        components: [
          { name: "Accordion", priority: "P2" },
          { name: "Avatar", priority: "P3" },
          { name: "Callout", priority: "P1" },
          { name: "Card", priority: "P1" },
          { name: "Details", priority: "P2" },
          { name: "Divider", priority: "P2" },
          { name: "Feature link list", priority: "P2" },
          { name: "Heading", priority: "P1" },
          { name: "Hero banner", priority: "P2" },
          { name: "Icon", priority: "P1" },
          { name: "Link list", priority: "P2" },
          { name: "List", priority: "P1" },
          { name: "Page alert", priority: "P1" },
          { name: "Prose", priority: "P2" },
          { name: "Section alert", priority: "P1" },
          { name: "Skip link", priority: "P1" },
          { name: "Status badge", priority: "P2" },
          { name: "Summary list", priority: "P2" },
          { name: "Table", priority: "P1" },
          { name: "Tags", priority: "P2" },
          { name: "Task list", priority: "P2" },
          { name: "Text", priority: "P1" },
          { name: "Text link", priority: "P1" }
        ]
      },
      {
        name: "Forms",
        components: [
          { name: "Autocomplete", priority: "P2" },
          { name: "Checkbox", priority: "P1" },
          { name: "Combobox", priority: "P2" },
          { name: "Combobox async multi", priority: "P2" },
          { name: "Conditional field container", priority: "P2" },
          { name: "Control group", priority: "P2" },
          { name: "Date picker", priority: "P2" },
          { name: "Field", priority: "P1" },
          { name: "Fieldset", priority: "P1" },
          { name: "File input", priority: "P2" },
          { name: "File upload", priority: "P2" },
          { name: "Grouped fields", priority: "P2" },
          { name: "Password input", priority: "P2" },
          { name: "Radio", priority: "P1" },
          { name: "Search box", priority: "P1" },
          { name: "Search input", priority: "P1" },
          { name: "Select", priority: "P1" },
          { name: "Switch", priority: "P2" },
          { name: "Text input", priority: "P1" },
          { name: "Textarea", priority: "P1" },
          { name: "Time input", priority: "P3" },
          { name: "Time picker", priority: "P3" },
          { name: "Toggle button", priority: "P2" }
        ]
      },
      {
        name: "Foundations",
        components: [
          { name: "A11y", priority: "P1" },
          { name: "Box", priority: "P1" },
          { name: "Columns", priority: "P1" },
          { name: "Core", priority: "P1" },
          { name: "Flex", priority: "P1" },
          { name: "Stack", priority: "P1" }
        ]
      },
      {
        name: "Layout",
        components: [
          { name: "App layout", priority: "P1" },
          { name: "Breadcrumbs", priority: "P1" },
          { name: "Call to action", priority: "P2" },
          { name: "Content", priority: "P1" },
          { name: "Collapsing side bar", priority: "P2" },
          { name: "Drawer", priority: "P2" },
          { name: "Filter sidebar", priority: "P2" },
          { name: "Footer", priority: "P1" },
          { name: "Form stack", priority: "P1" },
          { name: "Global alert", priority: "P1" },
          { name: "Header", priority: "P1" },
          { name: "Inpage nav", priority: "P2" },
          { name: "Loading", priority: "P1" },
          { name: "Main nav", priority: "P1" },
          { name: "Modal", priority: "P1" },
          { name: "Notification badge", priority: "P2" },
          { name: "Pagination", priority: "P1" },
          { name: "Progress indicator", priority: "P2" },
          { name: "Side nav", priority: "P2" },
          { name: "Sub nav", priority: "P2" },
          { name: "Tabs", priority: "P1" }
        ]
      },
      {
        name: "Navigation",
        components: [
          { name: "Breadcrumbs", priority: "P1" },
          { name: "Button", priority: "P1" },
          { name: "Direction link", priority: "P2" },
          { name: "Dropdown menu", priority: "P2" },
          { name: "Inpage nav", priority: "P2" },
          { name: "Main nav", priority: "P1" },
          { name: "Pagination", priority: "P1" },
          { name: "Side nav", priority: "P2" },
          { name: "Sub nav", priority: "P2" },
          { name: "Tabs", priority: "P1" }
        ]
      }
    ];
    const search = ref("");
    const activeCategory = ref(null);
    const filteredCategories = computed(
      () => categories.filter((cat) => !activeCategory.value || cat.name === activeCategory.value).map((cat) => ({
        ...cat,
        components: cat.components.filter(
          (c) => c.name.toLowerCase().includes(search.value.toLowerCase())
        )
      })).filter((cat) => cat.components.length > 0)
    );
    const totalComplete = computed(
      () => categories.flatMap((c) => c.components).filter((c) => docFor(c.name)).length
    );
    const totalComponents = computed(() => categories.flatMap((c) => c.components).length);
    const allCategories = categories.map((c) => c.name);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="components-page" data-v-e809f522${_scopeId}><div class="components-page__header" data-v-e809f522${_scopeId}><h1 class="components-page__title" data-v-e809f522${_scopeId}>Components</h1><p class="components-page__meta" data-v-e809f522${_scopeId}>${ssrInterpolate(unref(totalComplete))} / ${ssrInterpolate(unref(totalComponents))} built</p></div><div class="components-page__toolbar" data-v-e809f522${_scopeId}><div class="components-page__search" data-v-e809f522${_scopeId}><label for="component-search" class="sr-only" data-v-e809f522${_scopeId}>Search components</label><input id="component-search"${ssrRenderAttr("value", unref(search))} type="search" placeholder="Search components…" class="components-page__search-input" data-v-e809f522${_scopeId}></div><div class="components-page__filters" role="group" aria-label="Filter by category" data-v-e809f522${_scopeId}><button class="${ssrRenderClass([{ "components-page__filter-btn--active": unref(activeCategory) === null }, "components-page__filter-btn"])}" data-v-e809f522${_scopeId}> All </button><!--[-->`);
            ssrRenderList(unref(allCategories), (cat) => {
              _push2(`<button class="${ssrRenderClass([{ "components-page__filter-btn--active": unref(activeCategory) === cat }, "components-page__filter-btn"])}" data-v-e809f522${_scopeId}>${ssrInterpolate(cat)}</button>`);
            });
            _push2(`<!--]--></div></div>`);
            if (unref(filteredCategories).length === 0) {
              _push2(`<div class="components-page__empty" data-v-e809f522${_scopeId}> No components match &quot;<strong data-v-e809f522${_scopeId}>${ssrInterpolate(unref(search))}</strong>&quot;. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(filteredCategories), (cat) => {
              _push2(`<div class="component-category" data-v-e809f522${_scopeId}><h2 class="component-category__title" data-v-e809f522${_scopeId}>${ssrInterpolate(cat.name)}</h2><div class="component-grid" data-v-e809f522${_scopeId}><!--[-->`);
              ssrRenderList(cat.components, (comp) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: comp.name,
                  to: docFor(comp.name) ? `/components/${docFor(comp.name).slug}` : void 0,
                  class: [
                    "component-card",
                    docFor(comp.name) ? "component-card--linked" : "component-card--planned"
                  ],
                  "aria-disabled": !docFor(comp.name) ? "true" : void 0,
                  tabindex: docFor(comp.name) ? void 0 : -1
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="component-card__header" data-v-e809f522${_scopeId2}><span class="component-card__name" data-v-e809f522${_scopeId2}>${ssrInterpolate(comp.name)}</span><span class="${ssrRenderClass([`component-card__status--${docFor(comp.name) ? "stable" : "planned"}`, "component-card__status"])}" data-v-e809f522${_scopeId2}>${ssrInterpolate(docFor(comp.name) ? "Stable" : "Planned")}</span></div><span class="component-card__priority" data-v-e809f522${_scopeId2}>${ssrInterpolate(comp.priority)}</span>`);
                    } else {
                      return [
                        createVNode("div", { class: "component-card__header" }, [
                          createVNode("span", { class: "component-card__name" }, toDisplayString(comp.name), 1),
                          createVNode("span", {
                            class: ["component-card__status", `component-card__status--${docFor(comp.name) ? "stable" : "planned"}`]
                          }, toDisplayString(docFor(comp.name) ? "Stable" : "Planned"), 3)
                        ]),
                        createVNode("span", { class: "component-card__priority" }, toDisplayString(comp.priority), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "components-page" }, [
                createVNode("div", { class: "components-page__header" }, [
                  createVNode("h1", { class: "components-page__title" }, "Components"),
                  createVNode("p", { class: "components-page__meta" }, toDisplayString(unref(totalComplete)) + " / " + toDisplayString(unref(totalComponents)) + " built", 1)
                ]),
                createVNode("div", { class: "components-page__toolbar" }, [
                  createVNode("div", { class: "components-page__search" }, [
                    createVNode("label", {
                      for: "component-search",
                      class: "sr-only"
                    }, "Search components"),
                    withDirectives(createVNode("input", {
                      id: "component-search",
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      type: "search",
                      placeholder: "Search components…",
                      class: "components-page__search-input"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(search)]
                    ])
                  ]),
                  createVNode("div", {
                    class: "components-page__filters",
                    role: "group",
                    "aria-label": "Filter by category"
                  }, [
                    createVNode("button", {
                      class: ["components-page__filter-btn", { "components-page__filter-btn--active": unref(activeCategory) === null }],
                      onClick: ($event) => activeCategory.value = null
                    }, " All ", 10, ["onClick"]),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allCategories), (cat) => {
                      return openBlock(), createBlock("button", {
                        key: cat,
                        class: ["components-page__filter-btn", { "components-page__filter-btn--active": unref(activeCategory) === cat }],
                        onClick: ($event) => activeCategory.value = cat
                      }, toDisplayString(cat), 11, ["onClick"]);
                    }), 128))
                  ])
                ]),
                unref(filteredCategories).length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "components-page__empty"
                }, [
                  createTextVNode(' No components match "'),
                  createVNode("strong", null, toDisplayString(unref(search)), 1),
                  createTextVNode('". ')
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                  return openBlock(), createBlock("div", {
                    key: cat.name,
                    class: "component-category"
                  }, [
                    createVNode("h2", { class: "component-category__title" }, toDisplayString(cat.name), 1),
                    createVNode("div", { class: "component-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(cat.components, (comp) => {
                        return openBlock(), createBlock(_component_NuxtLink, {
                          key: comp.name,
                          to: docFor(comp.name) ? `/components/${docFor(comp.name).slug}` : void 0,
                          class: [
                            "component-card",
                            docFor(comp.name) ? "component-card--linked" : "component-card--planned"
                          ],
                          "aria-disabled": !docFor(comp.name) ? "true" : void 0,
                          tabindex: docFor(comp.name) ? void 0 : -1
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "component-card__header" }, [
                              createVNode("span", { class: "component-card__name" }, toDisplayString(comp.name), 1),
                              createVNode("span", {
                                class: ["component-card__status", `component-card__status--${docFor(comp.name) ? "stable" : "planned"}`]
                              }, toDisplayString(docFor(comp.name) ? "Stable" : "Planned"), 3)
                            ]),
                            createVNode("span", { class: "component-card__priority" }, toDisplayString(comp.priority), 1)
                          ]),
                          _: 2
                        }, 1032, ["to", "class", "aria-disabled", "tabindex"]);
                      }), 128))
                    ])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e809f522"]]);

export { index as default };
//# sourceMappingURL=index-C58jTayh.mjs.map
