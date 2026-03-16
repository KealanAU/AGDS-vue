import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    fullScreen: false,
});
const dotCount = computed(() => (props.fullScreen ? 5 : 3));
const dotSize = computed(() => (props.fullScreen ? 'lg' : 'md'));
const __VLS_defaults = {
    fullScreen: false,
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
/** @type {__VLS_StyleScopedClasses['ausgov-loading-dots__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-loading-dots__dot']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([
            'ausgov-loading-blanket',
            { 'ausgov-loading-blanket--full-screen': __VLS_ctx.fullScreen },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-loading-blanket']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-loading-blanket--full-screen']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-loading-blanket__content" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-loading-blanket__content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: (['ausgov-loading-dots', `ausgov-loading-dots--${__VLS_ctx.dotSize}`]) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['ausgov-loading-dots']} */ ;
for (const [i] of __VLS_vFor((__VLS_ctx.dotCount))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        key: (i),
        ...{ class: "ausgov-loading-dots__dot" },
        ...{ style: ({ animationDelay: `${(i - 1) * 100}ms` }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-loading-dots__dot']} */ ;
    // @ts-ignore
    [fullScreen, dotSize, dotCount,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    role: (__VLS_ctx.fullScreen ? 'alert' : 'status'),
    ...{ class: "ausgov-loading-blanket__label" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-loading-blanket__label']} */ ;
(__VLS_ctx.label);
// @ts-ignore
[fullScreen, label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
