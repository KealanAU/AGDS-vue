import AusGovBreadcrumbsDivider from './AGDSBreadcrumbsDivider.vue';
const emit = defineEmits();
function handleClick(event) {
    emit('click', event);
}
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
/** @type {__VLS_StyleScopedClasses['ausgov-breadcrumbs__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-breadcrumbs__toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "ausgov-breadcrumbs__item" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-breadcrumbs__item']} */ ;
const __VLS_0 = AusGovBreadcrumbsDivider;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    type: "button",
    ...{ class: "ausgov-breadcrumbs__toggle" },
    'aria-expanded': "false",
    'aria-label': "Show all breadcrumbs",
});
/** @type {__VLS_StyleScopedClasses['ausgov-breadcrumbs__toggle']} */ ;
// @ts-ignore
[handleClick,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
