import { _ as __nuxt_component_0 } from './DocsLayout-B0Z6M1_I.mjs';
import { defineComponent, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "digital-service-standard",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Digital Service Standard — AGDS-vue",
      description: "How AgDS-vue aligns with all 10 criteria of the Digital Service Standard."
    });
    const criteria = [
      {
        number: 1,
        title: "Understand what the problem is",
        status: "in-progress",
        summary: "Component APIs are deliberate, minimal, and derived from real government service patterns.",
        items: [
          { done: true, text: "Every prop has a clearly stated purpose in TSDoc" },
          {
            done: true,
            text: "Prop names are consistent across the library (variant, size, disabled, loading)"
          },
          { done: false, text: "All exported types documented with use cases" },
          { done: false, text: "Breaking changes require migration guide" }
        ]
      },
      {
        number: 2,
        title: "Understand what users need",
        status: "not-started",
        summary: "Props, slots, and events reflect real-world patterns found in Australian government service forms.",
        items: [
          { done: false, text: "All form components support v-model binding" },
          {
            done: false,
            text: "Label, hint, and error message are first-class props on every form component"
          },
          { done: false, text: "Components support server-side validation error display" }
        ]
      },
      {
        number: 3,
        title: "Leave no one behind",
        status: "in-progress",
        summary: "Every component meets WCAG 2.2 AA. Reka UI handles keyboard navigation and ARIA.",
        items: [
          { done: false, text: "axe-core passes on all components in all states" },
          { done: false, text: "WCAG 2.2 AA contrast ratios met (4.5:1 text, 3:1 large/UI)" },
          { done: true, text: "Focus ring: 3px solid #9263de on all interactive elements" },
          {
            done: true,
            text: "Reka UI primitives provide keyboard nav for all interactive components"
          },
          { done: true, text: "Button: aria-busy on loading, aria-disabled on disabled" }
        ]
      },
      {
        number: 4,
        title: "Use agile and user-centred methods",
        status: "in-progress",
        summary: "Components compose cleanly — slots over props, small focused components over monoliths.",
        items: [
          { done: true, text: "Button exposes default slot for content" },
          { done: false, text: "Layout components expose named slots for structural regions" },
          { done: false, text: "No component reaches into its parent or uses $parent" }
        ]
      },
      {
        number: 5,
        title: "Understand what can be reused",
        status: "complete",
        summary: "All style values reference --agds-* CSS custom properties. No hardcoded colours or spacing.",
        items: [
          { done: true, text: "Every colour value references a --agds-* CSS custom property" },
          { done: true, text: "Every spacing value references a --agds-space-* token" },
          { done: true, text: "Every font value references --agds-font-* tokens" },
          { done: true, text: "No component uses !important" },
          { done: true, text: "No component uses Tailwind or any external CSS class framework" }
        ]
      },
      {
        number: 6,
        title: "Describe, not prescribe",
        status: "in-progress",
        summary: "Reka UI primitives used for all interaction patterns — no custom focus traps or ARIA management.",
        items: [
          { done: true, text: "All interactive component primitives documented in COMPONENTS.md" },
          {
            done: false,
            text: "No component reimplements focus trapping or keyboard routing that Reka provides"
          },
          { done: true, text: "reka-ui pinned as a peer dependency" }
        ]
      },
      {
        number: 7,
        title: "Ensure the service is simple to use",
        status: "complete",
        summary: "Zero runtime dependencies beyond vue and reka-ui. No analytics, no CDN fonts.",
        items: [
          { done: true, text: "Zero runtime dependencies beyond vue and reka-ui" },
          { done: true, text: "No analytics, telemetry, or external network calls" },
          { done: true, text: "No CDN font or icon loading — system font stack, inline SVG slots" }
        ]
      },
      {
        number: 8,
        title: "Make the service accountable",
        status: "not-started",
        summary: "Reka UI keeps primitives modern and maintained. Changelog maintained per Conventional Commits.",
        items: [
          { done: false, text: "Reka UI peer dependency kept up to date" },
          { done: false, text: "CHANGELOG.md maintained per Conventional Commits" },
          { done: false, text: "Each component's Reka primitive documented with reason it was chosen" }
        ]
      },
      {
        number: 9,
        title: "Be open",
        status: "not-started",
        summary: "Minimum 80% statement coverage. Every component has render, slot, props, events, and a11y tests.",
        items: [
          { done: false, text: "Minimum 80% statement coverage" },
          { done: false, text: "Every component: render, slot, props, events, and axe-core tests" },
          { done: false, text: "Coverage report on every PR" }
        ]
      },
      {
        number: 10,
        title: "Keep improving",
        status: "not-started",
        summary: "Semantic Versioning, deprecation warnings, and migration guides for every breaking change.",
        items: [
          { done: false, text: "Semantic Versioning strictly followed" },
          {
            done: false,
            text: "Deprecated props annotated with @deprecated and console warning in dev"
          },
          { done: false, text: "Migration guides for every breaking change" }
        ]
      }
    ];
    function statusClass(status) {
      return {
        complete: "criterion--complete",
        "in-progress": "criterion--in-progress",
        "not-started": "criterion--not-started"
      }[status] ?? "";
    }
    function statusLabel(status) {
      return {
        complete: "Complete",
        "in-progress": "In progress",
        "not-started": "Not started"
      }[status] ?? status;
    }
    const overallProgress = computed(
      () => criteria.flatMap((c) => c.items).filter((i) => i.done).length
    );
    const overallTotal = computed(() => criteria.flatMap((c) => c.items).length);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_DocsLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dss-page" data-v-cebee8c2${_scopeId}><h1 data-v-cebee8c2${_scopeId}>Digital Service Standard</h1><p class="dss-page__intro" data-v-cebee8c2${_scopeId}> The <a href="https://www.dta.gov.au/help-and-advice/about-digital-service-standard" target="_blank" rel="noopener" data-v-cebee8c2${_scopeId}> Digital Service Standard </a> defines 10 criteria that government digital services must meet. This page tracks how AGDS-vue aligns with each criterion, and maps them to automated assertions in our Vitest + axe-core test suite. </p><div class="dss-progress" data-v-cebee8c2${_scopeId}><div class="dss-progress__bar-wrap" role="progressbar"${ssrRenderAttr("aria-valuenow", unref(overallProgress))}${ssrRenderAttr("aria-valuemax", unref(overallTotal))} aria-label="Overall checklist progress" data-v-cebee8c2${_scopeId}><div class="dss-progress__bar" style="${ssrRenderStyle({ width: `${unref(overallProgress) / unref(overallTotal) * 100}%` })}" data-v-cebee8c2${_scopeId}></div></div><span class="dss-progress__label" data-v-cebee8c2${_scopeId}>${ssrInterpolate(unref(overallProgress))} / ${ssrInterpolate(unref(overallTotal))} checklist items done</span></div><!--[-->`);
            ssrRenderList(criteria, (criterion) => {
              _push2(`<div class="${ssrRenderClass([statusClass(criterion.status), "criterion"])}" data-v-cebee8c2${_scopeId}><div class="criterion__header" data-v-cebee8c2${_scopeId}><span class="criterion__number" data-v-cebee8c2${_scopeId}>${ssrInterpolate(criterion.number)}</span><div class="criterion__meta" data-v-cebee8c2${_scopeId}><h2 class="criterion__title" data-v-cebee8c2${_scopeId}>${ssrInterpolate(criterion.title)}</h2><span class="criterion__status-badge" data-v-cebee8c2${_scopeId}>${ssrInterpolate(statusLabel(criterion.status))}</span></div></div><p class="criterion__summary" data-v-cebee8c2${_scopeId}>${ssrInterpolate(criterion.summary)}</p><ul class="criterion__checklist" data-v-cebee8c2${_scopeId}><!--[-->`);
              ssrRenderList(criterion.items, (item, i) => {
                _push2(`<li class="${ssrRenderClass([{ "criterion__check--done": item.done }, "criterion__check"])}" data-v-cebee8c2${_scopeId}><span class="criterion__check-icon" aria-hidden="true" data-v-cebee8c2${_scopeId}>${ssrInterpolate(item.done ? "✓" : "○")}</span><span data-v-cebee8c2${_scopeId}>${ssrInterpolate(item.text)}</span></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "dss-page" }, [
                createVNode("h1", null, "Digital Service Standard"),
                createVNode("p", { class: "dss-page__intro" }, [
                  createTextVNode(" The "),
                  createVNode("a", {
                    href: "https://www.dta.gov.au/help-and-advice/about-digital-service-standard",
                    target: "_blank",
                    rel: "noopener"
                  }, " Digital Service Standard "),
                  createTextVNode(" defines 10 criteria that government digital services must meet. This page tracks how AGDS-vue aligns with each criterion, and maps them to automated assertions in our Vitest + axe-core test suite. ")
                ]),
                createVNode("div", { class: "dss-progress" }, [
                  createVNode("div", {
                    class: "dss-progress__bar-wrap",
                    role: "progressbar",
                    "aria-valuenow": unref(overallProgress),
                    "aria-valuemax": unref(overallTotal),
                    "aria-label": "Overall checklist progress"
                  }, [
                    createVNode("div", {
                      class: "dss-progress__bar",
                      style: { width: `${unref(overallProgress) / unref(overallTotal) * 100}%` }
                    }, null, 4)
                  ], 8, ["aria-valuenow", "aria-valuemax"]),
                  createVNode("span", { class: "dss-progress__label" }, toDisplayString(unref(overallProgress)) + " / " + toDisplayString(unref(overallTotal)) + " checklist items done", 1)
                ]),
                (openBlock(), createBlock(Fragment, null, renderList(criteria, (criterion) => {
                  return createVNode("div", {
                    key: criterion.number,
                    class: ["criterion", statusClass(criterion.status)]
                  }, [
                    createVNode("div", { class: "criterion__header" }, [
                      createVNode("span", { class: "criterion__number" }, toDisplayString(criterion.number), 1),
                      createVNode("div", { class: "criterion__meta" }, [
                        createVNode("h2", { class: "criterion__title" }, toDisplayString(criterion.title), 1),
                        createVNode("span", { class: "criterion__status-badge" }, toDisplayString(statusLabel(criterion.status)), 1)
                      ])
                    ]),
                    createVNode("p", { class: "criterion__summary" }, toDisplayString(criterion.summary), 1),
                    createVNode("ul", { class: "criterion__checklist" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(criterion.items, (item, i) => {
                        return openBlock(), createBlock("li", {
                          key: i,
                          class: ["criterion__check", { "criterion__check--done": item.done }]
                        }, [
                          createVNode("span", {
                            class: "criterion__check-icon",
                            "aria-hidden": "true"
                          }, toDisplayString(item.done ? "✓" : "○"), 1),
                          createVNode("span", null, toDisplayString(item.text), 1)
                        ], 2);
                      }), 128))
                    ])
                  ], 2);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/digital-service-standard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const digitalServiceStandard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cebee8c2"]]);

export { digitalServiceStandard as default };
//# sourceMappingURL=digital-service-standard-B11avnCr.mjs.map
