const props = withDefaults(defineProps(), {
    ariaLabel: 'In page',
});
const __VLS_defaults = {
    ariaLabel: 'In page',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "ausgov-inpage-nav" },
    'aria-label': (props.ariaLabel),
});
/** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav']} */ ;
if (props.title) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "ausgov-inpage-nav__title" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__title']} */ ;
    (props.title);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "ausgov-inpage-nav__list" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__list']} */ ;
for (const [link, index] of __VLS_vFor((props.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (index),
        ...{ class: "ausgov-inpage-nav__item" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (link.href),
        ...{ class: "ausgov-inpage-nav__link" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-inpage-nav__link']} */ ;
    (link.label);
}
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
