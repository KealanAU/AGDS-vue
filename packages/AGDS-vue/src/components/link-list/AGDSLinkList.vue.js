import AgDSLinkListItem from './AGDSLinkListItem.vue';
const __VLS_props = withDefaults(defineProps(), {
    horizontal: false,
});
const __VLS_defaults = {
    horizontal: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "agds-link-list" },
    ...{ class: (__VLS_ctx.horizontal ? 'agds-link-list--horizontal' : 'agds-link-list--vertical') },
});
/** @type {__VLS_StyleScopedClasses['agds-link-list']} */ ;
for (const [link, index] of __VLS_vFor((__VLS_ctx.links))) {
    const __VLS_0 = AgDSLinkListItem;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (index),
        ...(link),
    }));
    const __VLS_2 = __VLS_1({
        key: (index),
        ...(link),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [horizontal, links,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
