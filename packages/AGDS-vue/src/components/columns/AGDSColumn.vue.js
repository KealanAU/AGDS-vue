import { computed, useAttrs } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps();
const attrs = useAttrs();
const style = computed(() => {
    const raw = {
        gridColumn: props.span !== undefined ? `span ${props.span} / span ${props.span}` : undefined,
        gridColumnStart: props.start !== undefined ? String(props.start) : undefined,
        gridColumnEnd: props.end !== undefined ? String(props.end) : undefined,
        alignSelf: props.alignSelf,
        justifySelf: props.justifySelf,
    };
    return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined));
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (props.as ?? 'div');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.attrs),
    ...{ style: (__VLS_ctx.style) },
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.attrs),
    ...{ style: (__VLS_ctx.style) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[attrs, style,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
