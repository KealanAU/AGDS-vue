import { useSlots, computed } from 'vue';
const props = withDefaults(defineProps(), {
    ariaHidden: true,
    textAlign: 'center',
});
const slots = useSlots();
// Use the slot to toggle between plain <hr> and grid-with-text layouts.
const hasText = computed(() => !!slots.default);
const __VLS_defaults = {
    ariaHidden: true,
    textAlign: 'center',
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
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider--align-left']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
if (__VLS_ctx.hasText) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-divider ausgov-divider--with-text" },
        ...{ class: (`ausgov-divider--align-${props.textAlign}`) },
        role: "separator",
        'aria-hidden': (props.ariaHidden ? 'true' : undefined),
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-divider']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-divider--with-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.hr)({
        ...{ class: "ausgov-divider__line" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-divider__line']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-divider__text" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-divider__text']} */ ;
    var __VLS_0 = {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.hr)({
        ...{ class: "ausgov-divider__line" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-divider__line']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.hr)({
        ...{ class: "ausgov-divider" },
        'aria-hidden': (props.ariaHidden ? 'true' : undefined),
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-divider']} */ ;
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[hasText,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
