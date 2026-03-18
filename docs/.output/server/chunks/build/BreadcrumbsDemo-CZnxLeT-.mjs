import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { AgDSBreadcrumbs as js } from './AGDS-vue-DKm2H2go.mjs';
import 'reka-ui';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbsDemo",
  __ssrInlineRender: true,
  props: {
    variant: {}
  },
  setup(__props) {
    const props = __props;
    const basicLinks = [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { label: "Apply for a permit" }
    ];
    const collapsedLinks = [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/services/permits", label: "Permits" },
      { href: "/services/permits/building", label: "Building" },
      { label: "Apply for a permit" }
    ];
    const links = computed(() => props.variant === "collapsed" ? collapsedLinks : basicLinks);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(js), mergeProps({ links: unref(links) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/BreadcrumbsDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BreadcrumbsDemo = Object.assign(_sfc_main, { __name: "BreadcrumbsDemo" });

export { BreadcrumbsDemo as default };
//# sourceMappingURL=BreadcrumbsDemo-CZnxLeT-.mjs.map
