import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    as: 'span',
    color: 'text',
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'normal',
});
const colorMap = {
    text: 'var(--ausgov-color-text)',
    muted: 'var(--ausgov-color-text-muted)',
    inverse: 'var(--ausgov-color-text-inverse)',
    disabled: 'var(--ausgov-color-text-disabled)',
};
const familyMap = {
    body: 'var(--ausgov-font-family-body)',
    heading: 'var(--ausgov-font-family-heading)',
    mono: 'var(--ausgov-font-family-mono)',
};
const sizeMap = {
    'xs': 'var(--ausgov-font-size-xs)',
    'sm': 'var(--ausgov-font-size-sm)',
    'md': 'var(--ausgov-font-size-md)',
    'lg': 'var(--ausgov-font-size-lg)',
    'xl': 'var(--ausgov-font-size-xl)',
    '2xl': 'var(--ausgov-font-size-2xl)',
    '3xl': 'var(--ausgov-font-size-3xl)',
    '4xl': 'var(--ausgov-font-size-4xl)',
};
const weightMap = {
    normal: 'var(--ausgov-font-weight-normal)',
    medium: 'var(--ausgov-font-weight-medium)',
    semibold: 'var(--ausgov-font-weight-semibold)',
    bold: 'var(--ausgov-font-weight-bold)',
};
const leadingMap = {
    tight: 'var(--ausgov-line-height-tight)',
    snug: 'var(--ausgov-line-height-snug)',
    normal: 'var(--ausgov-line-height-normal)',
    relaxed: 'var(--ausgov-line-height-relaxed)',
};
const style = computed(() => ({
    color: colorMap[props.color],
    fontFamily: familyMap[props.fontFamily],
    fontSize: sizeMap[props.fontSize],
    fontWeight: weightMap[props.fontWeight],
    lineHeight: leadingMap[props.lineHeight],
}));
const __VLS_defaults = {
    as: 'span',
    color: 'text',
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'normal',
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
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "ausgov-text" },
    ...{ style: (__VLS_ctx.style) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "ausgov-text" },
    ...{ style: (__VLS_ctx.style) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-text']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[style,];
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
