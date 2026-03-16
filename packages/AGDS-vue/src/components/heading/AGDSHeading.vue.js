const props = withDefaults(defineProps(), {
    type: 'h2',
});
// Maps heading level → CSS custom-property that controls font size.
// Mirrors the scale from the React headingFontSizeMap.
const fontSizeMap = {
    h1: 'var(--ausgov-font-size-4xl)',
    h2: 'var(--ausgov-font-size-3xl)',
    h3: 'var(--ausgov-font-size-2xl)',
    h4: 'var(--ausgov-font-size-xl)',
    h5: 'var(--ausgov-font-size-lg)',
    h6: 'var(--ausgov-font-size-md)',
};
// `as` overrides the rendered tag; `type` is the fallback and drives font size.
const tag = props.as ?? props.type;
const fontSize = fontSizeMap[props.type];
const __VLS_defaults = {
    type: 'h2',
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
const __VLS_0 = (__VLS_ctx.tag);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "ausgov-heading" },
    ...{ class: (`ausgov-heading--${props.type}`) },
    ...{ style: ({ fontSize: __VLS_ctx.fontSize }) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "ausgov-heading" },
    ...{ class: (`ausgov-heading--${props.type}`) },
    ...{ style: ({ fontSize: __VLS_ctx.fontSize }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-heading']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[tag, fontSize,];
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
