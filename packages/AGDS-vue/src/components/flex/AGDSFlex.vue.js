import { computed } from 'vue';
import AusGovBox from '../box/AGDSBox.vue';
const props = withDefaults(defineProps(), {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    inline: false,
});
/**
 * Forward all props to Box, but swap `inline` for the correct `display` value
 * and omit `inline` itself (Box doesn't know about it).
 */
const boxProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inline, display, ...rest } = props;
    return {
        ...rest,
        display: display ?? (inline ? 'inline-flex' : 'flex'),
    };
});
const __VLS_defaults = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    inline: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AusGovBox || AusGovBox;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.boxProps),
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.boxProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[boxProps,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
