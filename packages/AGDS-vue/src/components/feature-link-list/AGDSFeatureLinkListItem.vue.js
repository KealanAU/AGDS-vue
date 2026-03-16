const __VLS_props = withDefaults(defineProps(), {
    external: false,
    background: 'body',
});
const __VLS_defaults = {
    external: false,
    background: 'body',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "agds-feature-link-list-item" },
    ...{ class: (`agds-feature-link-list-item--bg-${__VLS_ctx.background}`) },
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: (__VLS_ctx.href),
    target: (__VLS_ctx.external ? '_blank' : undefined),
    rel: (__VLS_ctx.external ? 'noopener noreferrer' : undefined),
    ...{ class: "agds-feature-link-list-item__link" },
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-feature-link-list-item__text" },
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-feature-link-list-item__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__label']} */ ;
(__VLS_ctx.label);
if (__VLS_ctx.secondaryText) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-feature-link-list-item__secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__secondary']} */ ;
    (__VLS_ctx.secondaryText);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "agds-feature-link-list-item__chevron" },
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'aria-hidden': "true",
    focusable: "false",
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list-item__chevron']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
    points: "9 18 15 12 9 6",
});
if (__VLS_ctx.external) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
// @ts-ignore
[background, href, external, external, external, label, secondaryText, secondaryText,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
