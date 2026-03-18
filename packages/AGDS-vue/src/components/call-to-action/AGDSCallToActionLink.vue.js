import AGDSIcon from '../icon/AGDSIcon.vue';
const __VLS_props = withDefaults(defineProps(), {
    external: false,
    focusRingFor: 'keyboard',
});
const __VLS_emit = defineEmits();
const __VLS_defaults = {
    external: false,
    focusRingFor: 'keyboard',
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
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta__icon']} */ ;
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
            'agds-cta',
            { 'agds-cta--focus-all': __VLS_ctx.focusRingFor === 'all' },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta--focus-all']} */ ;
var __VLS_0 = {};
const __VLS_2 = AGDSIcon;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
    name: "mdi:chevron-right",
    size: "sm",
    ...{ class: "agds-cta__icon" },
    'aria-hidden': "true",
}));
const __VLS_4 = __VLS_3({
    name: "mdi:chevron-right",
    size: "sm",
    ...{ class: "agds-cta__icon" },
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {__VLS_StyleScopedClasses['agds-cta__icon']} */ ;
if (__VLS_ctx.external) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[href, external, external, external, focusRingFor,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
