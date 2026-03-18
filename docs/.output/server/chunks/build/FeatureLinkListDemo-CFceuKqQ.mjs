import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue'
import { ssrRenderComponent } from 'vue/server-renderer'
import { AgDSFeatureLinkList as ud } from './AGDS-vue-DKm2H2go.mjs'
import 'reka-ui'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FeatureLinkListDemo',
  __ssrInlineRender: true,
  props: {
    variant: {},
  },
  setup(__props) {
    const props = __props
    const basicLinks = [
      { href: '#', label: 'Apply for a grant' },
      { href: '#', label: 'Check your eligibility' },
      { href: '#', label: 'Find a service near you' },
    ]
    const secondaryLinks = [
      {
        href: '#',
        label: 'Apply for a grant',
        secondaryText: 'For individuals and small businesses affected by recent natural disasters',
      },
      {
        href: '#',
        label: 'Check your eligibility',
        secondaryText: 'Answer a few questions to see what support is available to you',
      },
    ]
    const links = computed(() => (props.variant === 'secondary' ? secondaryLinks : basicLinks))
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        ssrRenderComponent(unref(ud), mergeProps({ links: unref(links) }, _attrs), null, _parent),
      )
    }
  },
})
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'components/content/FeatureLinkListDemo.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const FeatureLinkListDemo = Object.assign(_sfc_main, { __name: 'FeatureLinkListDemo' })

export { FeatureLinkListDemo as default }
//# sourceMappingURL=FeatureLinkListDemo-CFceuKqQ.mjs.map
