const __VLS_props = withDefaults(defineProps(), {
    ariaLabel: 'Skip links',
});
const __VLS_defaults = {
    ariaLabel: 'Skip links',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': (__VLS_ctx.ariaLabel),
    ...{ class: "agds-skip-links" },
});
/** @type {__VLS_StyleScopedClasses['agds-skip-links']} */ ;
for (const [link, index] of __VLS_vFor((__VLS_ctx.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        key: (index),
        href: (link.href),
        ...{ class: "agds-skip-link" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-skip-link']} */ ;
    (link.label);
    // @ts-ignore
    [ariaLabel, links,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
