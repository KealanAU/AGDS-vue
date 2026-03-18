import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer'
import { AgDSSideNav as qv } from './AGDS-vue-DKm2H2go.mjs'
import 'reka-ui'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SideNavDemo',
  __ssrInlineRender: true,
  props: {
    variant: {},
  },
  setup(__props) {
    const props = __props
    const items = [
      { href: '/services', label: 'All services' },
      {
        href: '/services/health',
        label: 'Health',
        items: [
          { href: '/services/health/medicare', label: 'Medicare' },
          { href: '/services/health/aged-care', label: 'Aged care' },
        ],
      },
      {
        href: '/services/education',
        label: 'Education',
        items: [
          { href: '/services/education/schools', label: 'Schools' },
          { href: '/services/education/higher', label: 'Higher education' },
        ],
      },
      { href: '/services/contact', label: 'Contact' },
    ]
    const activePath = ref('/services/health')
    const subLevelVisible = computed(() => (props.variant === 'always' ? 'always' : 'whenActive'))
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { 'max-width': '320px' } }, _attrs))}>`)
      _push(
        ssrRenderComponent(
          unref(qv),
          {
            'active-path': activePath.value,
            title: 'Services',
            'title-link': '/services',
            items,
            'sub-level-visible': subLevelVisible.value,
          },
          null,
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
    'components/content/SideNavDemo.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const SideNavDemo = Object.assign(_sfc_main, { __name: 'SideNavDemo' })

export { SideNavDemo as default }
//# sourceMappingURL=SideNavDemo-vLwTKQyH.mjs.map
