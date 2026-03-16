import { ref } from 'vue';
import AgDSBreadcrumbsDivider from './AGDSBreadcrumbsDivider.vue';
const __VLS_props = withDefaults(defineProps(), {
    current: false,
});
const linkRef = ref(null);
const __VLS_exposed = { focus: () => linkRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    current: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "agds-breadcrumbs__item" },
});
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__item']} */ ;
const __VLS_0 = AgDSBreadcrumbsDivider;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
if (__VLS_ctx.href) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ref: "linkRef",
        href: (__VLS_ctx.href),
        'aria-current': (__VLS_ctx.current ? 'page' : undefined),
        ...{ class: "agds-breadcrumbs__link" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__link']} */ ;
    (__VLS_ctx.label);
    if (__VLS_ctx.current) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        'aria-current': (__VLS_ctx.current ? 'page' : undefined),
        ...{ class: "agds-breadcrumbs__text" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__text']} */ ;
    (__VLS_ctx.label);
    if (__VLS_ctx.current) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    }
}
// @ts-ignore
[href, href, current, current, current, current, label, label,];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeProps: {},
    props: {},
});
export default {};
