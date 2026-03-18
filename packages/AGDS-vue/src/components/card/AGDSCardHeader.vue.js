const props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([
            'agds-card-header',
            props.background && `agds-card-header--${props.background}`,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-card-header']} */ ;
var __VLS_0 = {};
if (props.title || props.subtitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-card-header__content" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-card-header__content']} */ ;
    if (props.title) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-card-header__title" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-card-header__title']} */ ;
        (props.title);
    }
    if (props.subtitle) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-card-header__subtitle" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-card-header__subtitle']} */ ;
        (props.subtitle);
    }
}
var __VLS_2 = {};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
