const __VLS_props = withDefaults(defineProps(), {
    variant: 'primary',
    size: 'md',
    block: false,
    external: false,
});
const __VLS_emit = defineEmits();
const __VLS_defaults = {
    variant: 'primary',
    size: 'md',
    block: false,
    external: false,
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
/** @type {__VLS_StyleScopedClasses['ausgov-button--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--tertiary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [$emit,];
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.$emit('focus', $event);
            // @ts-ignore
            [$emit,];
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.$emit('blur', $event);
            // @ts-ignore
            [$emit,];
        } },
    href: (__VLS_ctx.href),
    target: (__VLS_ctx.external ? '_blank' : undefined),
    rel: (__VLS_ctx.external ? 'noopener noreferrer' : undefined),
    ...{ class: ([
            'ausgov-button',
            `ausgov-button--${__VLS_ctx.variant}`,
            `ausgov-button--${__VLS_ctx.size}`,
            { 'ausgov-button--block': __VLS_ctx.block },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--block']} */ ;
if (__VLS_ctx.$slots.iconBefore) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-button__icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon']} */ ;
    var __VLS_0 = {};
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-button__label" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-button__label']} */ ;
var __VLS_2 = {};
if (__VLS_ctx.$slots.iconAfter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-button__icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon']} */ ;
    var __VLS_4 = {};
}
if (__VLS_ctx.external) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
// @ts-ignore
[href, external, external, external, variant, size, block, $slots, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
