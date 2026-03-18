import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProsePre",
  __ssrInlineRender: true,
  props: {
    code: {},
    language: {},
    filename: {},
    highlights: {},
    meta: {}
  },
  setup(__props) {
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose-pre" }, _attrs))} data-v-29350894><div class="prose-pre__toolbar" data-v-29350894>`);
      if (__props.filename) {
        _push(`<span class="prose-pre__filename" data-v-29350894>${ssrInterpolate(__props.filename)}</span>`);
      } else if (__props.language) {
        _push(`<span class="prose-pre__lang" data-v-29350894>${ssrInterpolate(__props.language)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="prose-pre__copy"${ssrRenderAttr("aria-label", copied.value ? "Copied to clipboard" : "Copy code")} data-v-29350894><span aria-hidden="true" data-v-29350894>${ssrInterpolate(copied.value ? "✓ Copied" : "Copy")}</span></button></div><pre class="prose-pre__block" data-v-29350894>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</pre></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProsePre.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProsePre = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-29350894"]]), { __name: "ProsePre" });

export { ProsePre as default };
//# sourceMappingURL=ProsePre-CEcv2vyF.mjs.map
