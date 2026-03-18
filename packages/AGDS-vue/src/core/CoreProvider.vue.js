import { provide, h, defineComponent } from 'vue';
import { CORE_CONTEXT_KEY } from './coreContext';
const props = defineProps();
/** Default link — a plain native anchor that passes all props through. */
const DefaultLink = defineComponent({
    name: 'AGDSDefaultLink',
    inheritAttrs: false,
    props: {
        href: { type: String, default: undefined },
    },
    setup(linkProps, { attrs, slots }) {
        return () => h('a', { href: linkProps.href, ...attrs }, slots.default?.());
    },
});
provide(CORE_CONTEXT_KEY, {
    linkComponent: props.linkComponent ?? DefaultLink,
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
