import { defineComponent, mergeProps, unref, useSSRContext } from 'vue'
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer'
import { AgDSProgressIndicator as eh } from './AGDS-vue-DKm2H2go.mjs'
import 'reka-ui'

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ProgressIndicatorDemo',
  __ssrInlineRender: true,
  props: {
    variant: {},
  },
  setup(__props) {
    const defaultItems = [
      { label: 'Eligibility check', status: 'done', href: '/apply/eligibility' },
      { label: 'Personal details', status: 'started', href: '/apply/personal' },
      { label: 'Contact information', status: 'todo', href: '/apply/contact' },
      { label: 'Review and submit', status: 'blocked', href: '/apply/review' },
    ]
    const allStatusItems = [
      { label: 'Completed step', status: 'done' },
      { label: 'In progress step', status: 'started' },
      { label: 'Not started step', status: 'todo' },
      { label: 'Blocked step', status: 'blocked' },
      { label: 'Error step', status: 'error' },
      { label: 'Saved step', status: 'saved' },
    ]
    const subItems = [
      { label: 'Personal details', status: 'done', href: '/apply/personal' },
      {
        label: 'Contact information',
        status: 'started',
        href: '/apply/contact',
        items: [
          { label: 'Email address', href: '/apply/contact/email' },
          { label: 'Postal address', href: '/apply/contact/address' },
        ],
      },
      { label: 'Review and submit', status: 'todo', href: '/apply/review' },
    ]
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<div${ssrRenderAttrs(mergeProps({ style: { 'max-width': '400px', width: '100%' } }, _attrs))}>`,
      )
      if (__props.variant === 'statuses') {
        _push(
          ssrRenderComponent(
            unref(eh),
            {
              items: allStatusItems,
              'active-path': 'In progress step',
            },
            null,
            _parent,
          ),
        )
      } else if (__props.variant === 'sub-items') {
        _push(
          ssrRenderComponent(
            unref(eh),
            {
              items: subItems,
              'active-path': '/apply/contact/address',
            },
            null,
            _parent,
          ),
        )
      } else if (__props.variant === 'bodyAlt') {
        _push(
          ssrRenderComponent(
            unref(eh),
            {
              items: defaultItems,
              'active-path': '/apply/personal',
              background: 'bodyAlt',
            },
            null,
            _parent,
          ),
        )
      } else {
        _push(
          ssrRenderComponent(
            unref(eh),
            {
              items: defaultItems,
              'active-path': '/apply/personal',
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
    'components/content/ProgressIndicatorDemo.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
const ProgressIndicatorDemo = Object.assign(_sfc_main, { __name: 'ProgressIndicatorDemo' })

export { ProgressIndicatorDemo as default }
//# sourceMappingURL=ProgressIndicatorDemo-DIwXxS3O.mjs.map
