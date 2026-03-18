import AGDSLinkListItem from './AGDSLinkListItem.vue';
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
var __VLS_0 = {};
for (const [link, index] of __VLS_vFor((__VLS_ctx.links))) {
    const __VLS_2 = AGDSLinkListItem;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
        key: (index),
        ...(link),
    }));
    const __VLS_4 = __VLS_3({
        key: (index),
        ...(link),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    // @ts-ignore
    [horizontal, links,];
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
