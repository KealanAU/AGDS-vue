import AGDSIcon from '../icon/AGDSIcon.vue';
const __VLS_props = withDefaults(defineProps(), {
    external: false,
    focusRingFor: 'keyboard',
});
const __VLS_emit = defineEmits();
const ICON_MAP = {
    up: 'mdi:arrow-up',
    right: 'mdi:arrow-right',
    down: 'mdi:arrow-down',
    left: 'mdi:arrow-left',
};
const __VLS_defaults = {
    external: false,
    focusRingFor: 'keyboard',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
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
            'agds-direction-link',
            { 'agds-direction-link--focus-all': __VLS_ctx.focusRingFor === 'all' },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link--focus-all']} */ ;
if (__VLS_ctx.direction === 'left') {
    const __VLS_0 = AGDSIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        name: (__VLS_ctx.ICON_MAP[__VLS_ctx.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }));
    const __VLS_2 = __VLS_1({
        name: (__VLS_ctx.ICON_MAP[__VLS_ctx.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
}
var __VLS_5 = {};
if (__VLS_ctx.direction !== 'left') {
    const __VLS_7 = AGDSIcon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        name: (__VLS_ctx.ICON_MAP[__VLS_ctx.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }));
    const __VLS_9 = __VLS_8({
        name: (__VLS_ctx.ICON_MAP[__VLS_ctx.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
}
if (__VLS_ctx.external) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[href, external, external, external, focusRingFor, direction, direction, direction, direction, ICON_MAP, ICON_MAP,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
