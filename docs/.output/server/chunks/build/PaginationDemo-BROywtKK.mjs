import { AgDSPagination as qd, AgDSPaginationButtons as ou } from './AGDS-vue-DKm2H2go.mjs'
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer'
import { _ as _export_sfc } from './server.mjs'
import 'reka-ui'
import '../nitro/nitro.mjs'
import 'node:http'
import 'node:https'
import 'node:events'
import 'node:buffer'
import 'node:fs'
import 'node:path'
import 'node:crypto'
import 'node:url'
import 'better-sqlite3'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PaginationDemo',
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    variant: {},
  },
  setup(__props) {
    const props = __props
    const currentPage = computed(() => props.currentPage ?? 3)
    const totalPages = computed(() => props.totalPages ?? 10)
    const variant = computed(() => props.variant ?? 'link')
    function generateHref(page) {
      return `?page=${page}`
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AgDSPagination = qd
      const _component_AgDSPaginationButtons = ou
      _push(
        `<div${ssrRenderAttrs(mergeProps({ class: 'pagination-demo' }, _attrs))} data-v-403aacc2>`,
      )
      if (unref(variant) === 'link') {
        _push(
          ssrRenderComponent(
            _component_AgDSPagination,
            {
              'current-page': unref(currentPage),
              'total-pages': unref(totalPages),
              'generate-href': generateHref,
            },
            null,
            _parent,
          ),
        )
      } else {
        _push(
          ssrRenderComponent(
            _component_AgDSPaginationButtons,
            {
              'current-page': unref(currentPage),
              'total-pages': unref(totalPages),
            },
            null,
            _parent,
          ),
        )
      }
      _push(`</div>`)
    }
  },
})
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'components/content/PaginationDemo.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const PaginationDemo = /* @__PURE__ */ Object.assign(
  _export_sfc(_sfc_main, [['__scopeId', 'data-v-403aacc2']]),
  { __name: 'PaginationDemo' },
)

export { PaginationDemo as default }
//# sourceMappingURL=PaginationDemo-BROywtKK.mjs.map
