import { _ as __nuxt_component_0 } from './client-kI3uTTuq.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'perfect-debounce';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocPreview",
  __ssrInlineRender: true,
  props: {
    label: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "doc-preview" }, _attrs))} data-v-6ec0d90c>`);
      if (__props.label) {
        _push(`<p class="doc-preview__label" data-v-6ec0d90c>${ssrInterpolate(__props.label)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="doc-preview__canvas" data-v-6ec0d90c>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/DocPreview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DocPreview = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-6ec0d90c"]]), { __name: "DocPreview" });

export { DocPreview as default };
//# sourceMappingURL=DocPreview-BN2pdIhs.mjs.map
