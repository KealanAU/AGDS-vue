import AgDSFeatureLinkListItem from './AGDSFeatureLinkListItem.vue';
const __VLS_props = withDefaults(defineProps(), {
    background: 'body',
});
const __VLS_defaults = {
    background: 'body',
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
    ...{ class: "agds-feature-link-list" },
});
/** @type {__VLS_StyleScopedClasses['agds-feature-link-list']} */ ;
for (const [link, index] of __VLS_vFor((__VLS_ctx.links))) {
    const __VLS_0 = AgDSFeatureLinkListItem;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (index),
        ...(link),
        background: (__VLS_ctx.background),
    }));
    const __VLS_2 = __VLS_1({
        key: (index),
        ...(link),
        background: (__VLS_ctx.background),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [links, background,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
