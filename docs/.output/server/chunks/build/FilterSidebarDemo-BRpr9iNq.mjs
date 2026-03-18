import {
  defineComponent,
  ref,
  mergeProps,
  unref,
  withCtx,
  createVNode,
  createTextVNode,
  useSSRContext,
} from 'vue'
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer'
import { AgDSFilterSidebar as Qv } from './AGDS-vue-DKm2H2go.mjs'
import 'reka-ui'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FilterSidebarDemo',
  __ssrInlineRender: true,
  props: {
    variant: {},
  },
  setup(__props) {
    const props = __props
    const activeCount = ref(props.variant === 'active' ? 3 : 0)
    const showClear = ref(props.variant === 'clear' || props.variant === 'active')
    function onClearFilters() {
      activeCount.value = 0
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { 'max-width': '320px' } }, _attrs))}>`)
      _push(
        ssrRenderComponent(
          unref(Qv),
          {
            'active-filters-count': activeCount.value,
            'show-clear-filters': showClear.value,
            background: __props.variant === 'bodyAlt' ? 'bodyAlt' : 'body',
            onClearFilters,
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<fieldset style="${ssrRenderStyle({ border: 'none', padding: '0', margin: '0' })}"${_scopeId}><legend style="${ssrRenderStyle({ 'font-weight': 'bold', 'margin-bottom': '8px' })}"${_scopeId}>Category</legend><label style="${ssrRenderStyle({ display: 'block', 'margin-bottom': '4px' })}"${_scopeId}><input type="checkbox"${_scopeId}> News </label><label style="${ssrRenderStyle({ display: 'block', 'margin-bottom': '4px' })}"${_scopeId}><input type="checkbox"${_scopeId}> Grants </label><label style="${ssrRenderStyle({ display: 'block' })}"${_scopeId}><input type="checkbox"${_scopeId}> Publications </label></fieldset>`,
                )
              } else {
                return [
                  createVNode(
                    'fieldset',
                    { style: { border: 'none', padding: '0', margin: '0' } },
                    [
                      createVNode(
                        'legend',
                        { style: { 'font-weight': 'bold', 'margin-bottom': '8px' } },
                        'Category',
                      ),
                      createVNode(
                        'label',
                        { style: { display: 'block', 'margin-bottom': '4px' } },
                        [createVNode('input', { type: 'checkbox' }), createTextVNode(' News ')],
                      ),
                      createVNode(
                        'label',
                        { style: { display: 'block', 'margin-bottom': '4px' } },
                        [createVNode('input', { type: 'checkbox' }), createTextVNode(' Grants ')],
                      ),
                      createVNode('label', { style: { display: 'block' } }, [
                        createVNode('input', { type: 'checkbox' }),
                        createTextVNode(' Publications '),
                      ]),
                    ],
                  ),
                ]
              }
            }),
            _: 1,
          },
          _parent,
        ),
      )
      _push(`</div>`)
    }
  },
})
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'components/content/FilterSidebarDemo.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const FilterSidebarDemo = Object.assign(_sfc_main, { __name: 'FilterSidebarDemo' })

export { FilterSidebarDemo as default }
//# sourceMappingURL=FilterSidebarDemo-BRpr9iNq.mjs.map
