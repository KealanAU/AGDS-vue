import { ref } from 'vue';
import AgDSButton from '../button/AGDSButton.vue';
const props = withDefaults(defineProps(), {
    iconOnly: false,
});
const buttonRef = ref(null);
const __VLS_exposed = { focus: () => buttonRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    iconOnly: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-search-box__button-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['agds-search-box__button-wrapper']} */ ;
const __VLS_0 = AgDSButton || AgDSButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ref: "buttonRef",
    type: "submit",
    'aria-label': (props.label),
    ...{ class: "agds-search-box__button" },
}));
const __VLS_2 = __VLS_1({
    ref: "buttonRef",
    type: "submit",
    'aria-label': (props.label),
    ...{ class: "agds-search-box__button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-search-box__button']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
{
    const { iconBefore: __VLS_8 } = __VLS_3.slots;
    if (props.iconOnly) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "20",
            height: "20",
            'aria-hidden': "true",
            focusable: "false",
            fill: "currentColor",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        });
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: ({ 'sr-only': props.iconOnly }) },
});
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
(props.label);
if (!props.iconOnly) {
    {
        const { iconAfter: __VLS_9 } = __VLS_3.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "20",
            height: "20",
            'aria-hidden': "true",
            focusable: "false",
            fill: "currentColor",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        });
    }
}
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeProps: {},
    props: {},
});
export default {};
