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
    text: 'var(--agds-color-text)',
    muted: 'var(--agds-color-text-muted)',
    inverse: 'var(--agds-color-text-inverse)',
    disabled: 'var(--agds-color-text-disabled)',
};
const familyMap = {
    body: 'var(--agds-font-family-body)',
    heading: 'var(--agds-font-family-heading)',
    mono: 'var(--agds-font-family-mono)',
};
const sizeMap = {
    'xs': 'var(--agds-font-size-xs)',
    'sm': 'var(--agds-font-size-sm)',
    'md': 'var(--agds-font-size-md)',
    'lg': 'var(--agds-font-size-lg)',
    'xl': 'var(--agds-font-size-xl)',
    '2xl': 'var(--agds-font-size-2xl)',
    '3xl': 'var(--agds-font-size-3xl)',
    '4xl': 'var(--agds-font-size-4xl)',
};
const weightMap = {
    normal: 'var(--agds-font-weight-normal)',
    medium: 'var(--agds-font-weight-medium)',
    semibold: 'var(--agds-font-weight-semibold)',
    bold: 'var(--agds-font-weight-bold)',
};
const leadingMap = {
    tight: 'var(--agds-line-height-tight)',
    snug: 'var(--agds-line-height-snug)',
    normal: 'var(--agds-line-height-normal)',
    relaxed: 'var(--agds-line-height-relaxed)',
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
    ...{ class: "agds-text" },
    ...{ style: (__VLS_ctx.style) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "agds-text" },
    ...{ style: (__VLS_ctx.style) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-text']} */ ;
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
