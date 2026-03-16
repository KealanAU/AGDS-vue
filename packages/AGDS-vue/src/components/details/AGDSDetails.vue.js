const __VLS_props = withDefaults(defineProps(), {
    iconBefore: false,
    onBodyAlt: false,
});
const __VLS_defaults = {
    iconBefore: false,
    onBodyAlt: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.details, __VLS_intrinsics.details)({
    ...{ class: "ausgov-details" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-details']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.summary, __VLS_intrinsics.summary)({
    ...{ class: "ausgov-details__summary" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-details__summary']} */ ;
if (__VLS_ctx.iconBefore) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        role: "img",
        'aria-label': "Information.",
        ...{ class: "ausgov-details__icon-before" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-details__icon-before']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        'aria-hidden': "true",
        focusable: "false",
        ...{ class: "ausgov-details__icon-svg" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-details__icon-svg']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
        'clip-rule': "evenodd",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-details__label" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-details__label']} */ ;
(__VLS_ctx.label);
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'aria-hidden': "true",
    focusable: "false",
    ...{ class: "ausgov-details__chevron" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-details__chevron']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M6 9l6 6 6-6",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-details__content" },
    ...{ class: ({ 'ausgov-details__content--body-alt': __VLS_ctx.onBodyAlt }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-details__content']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-details__content--body-alt']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[iconBefore, label, onBodyAlt,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
