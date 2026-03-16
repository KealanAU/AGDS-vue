import { provide } from 'vue';
import { CONTENT_SPACING_KEY } from './contentContext';
const props = withDefaults(defineProps(), {
    as: 'div',
    maxWidth: 'container',
});
// Provide spacing to descendant ContentBleed components.
provide(CONTENT_SPACING_KEY, props.paddingY);
const __VLS_defaults = {
    as: 'div',
    maxWidth: 'container',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content--section']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content--page']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    id: (props.id),
    ...{ class: "agds-content" },
    ...{ class: ([
            props.background && `agds-content--${props.background}`,
            `agds-content--${props.paddingY}`,
        ]) },
}));
const __VLS_2 = __VLS_1({
    id: (props.id),
    ...{ class: "agds-content" },
    ...{ class: ([
            props.background && `agds-content--${props.background}`,
            `agds-content--${props.paddingY}`,
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-content']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-content__inner" },
    ...{ class: (`agds-content__inner--${props.maxWidth === 'containerLg' ? 'container-lg' : 'container'}`) },
});
/** @type {__VLS_StyleScopedClasses['agds-content__inner']} */ ;
var __VLS_7 = {};
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
