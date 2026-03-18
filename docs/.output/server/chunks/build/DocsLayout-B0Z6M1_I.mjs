import { _ as __nuxt_component_0$1 } from './nuxt-link-91XGOZ2f.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, e as useRoute } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocsLayout",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const mobileNavOpen = ref(false);
    function closeNav() {
      mobileNavOpen.value = false;
    }
    const navSections = [
      {
        title: "Getting started",
        items: [
          { label: "Introduction", to: "/" },
          { label: "Installation", to: "/installation" }
        ]
      },
      {
        title: "Foundations",
        items: [
          { label: "Design tokens", to: "/foundations/tokens" },
          { label: "Colours", to: "/foundations/colours" },
          { label: "Typography", to: "/foundations/typography" },
          { label: "Spacing", to: "/foundations/spacing" },
          { label: "A11y", to: "/components/visually-hidden" },
          { label: "Core", to: "/components/core" },
          { label: "Stack", to: "/components/stack" }
        ]
      },
      {
        title: "Components",
        items: [{ label: "All components", to: "/components" }]
      },
      {
        title: "Standards",
        items: [{ label: "Digital Service Standard", to: "/digital-service-standard" }]
      },
      {
        title: "Coming soon",
        items: [
          { label: "Patterns", to: "/patterns" },
          { label: "Templates", to: "/templates" }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["docs-layout", { "docs-layout--nav-open": mobileNavOpen.value }]
      }, _attrs))} data-v-e67e8be6><a href="#main-content" class="skip-link" data-v-e67e8be6>Skip to main content</a><header class="docs-mobile-header" role="banner" data-v-e67e8be6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "docs-mobile-header__logo",
        onClick: closeNav
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` AGDS-vue `);
          } else {
            return [
              createTextVNode(" AGDS-vue ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="docs-mobile-header__toggle"${ssrRenderAttr("aria-expanded", mobileNavOpen.value)} aria-controls="docs-nav" aria-label="Toggle navigation menu" data-v-e67e8be6><span class="docs-mobile-header__hamburger" aria-hidden="true" data-v-e67e8be6></span></button></header><nav id="docs-nav" class="docs-nav" aria-label="Documentation navigation"${ssrIncludeBooleanAttr(!mobileNavOpen.value ? void 0 : void 0) ? " inert" : ""} data-v-e67e8be6><div class="docs-nav__inner" data-v-e67e8be6><div class="docs-nav__brand" data-v-e67e8be6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "docs-nav__logo",
        onClick: closeNav
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` AGDS-vue `);
          } else {
            return [
              createTextVNode(" AGDS-vue ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="docs-nav__version" data-v-e67e8be6>v0.1.0</span></div><!--[-->`);
      ssrRenderList(navSections, (section) => {
        _push(`<div class="docs-nav__section" data-v-e67e8be6><p class="docs-nav__section-title" data-v-e67e8be6>${ssrInterpolate(section.title)}</p><ul class="docs-nav__list" role="list" data-v-e67e8be6><!--[-->`);
        ssrRenderList(section.items, (item) => {
          _push(`<li data-v-e67e8be6>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "docs-nav__link",
            "active-class": "docs-nav__link--active",
            onClick: closeNav
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></nav>`);
      if (mobileNavOpen.value) {
        _push(`<div class="docs-nav-overlay" aria-hidden="true" data-v-e67e8be6></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main id="main-content" class="docs-main" tabindex="-1" data-v-e67e8be6><div class="docs-content" data-v-e67e8be6>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DocsLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-e67e8be6"]]), { __name: "DocsLayout" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=DocsLayout-B0Z6M1_I.mjs.map
