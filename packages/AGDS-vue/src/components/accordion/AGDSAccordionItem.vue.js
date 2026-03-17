import { inject, computed } from 'vue';
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, } from 'reka-ui';
const props = withDefaults(defineProps(), {
    background: undefined,
    headingLevel: 3,
    disabled: false,
});
// Fall back to the accordion-level background if the item doesn't override it.
const inheritedBackground = inject('accordionBackground', 'body');
const activeBackground = computed(() => props.background ?? inheritedBackground);
const indent = inject('accordionIndent', false);
const __VLS_defaults = {
    background: undefined,
    headingLevel: 3,
    disabled: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger--bg-bodyAlt']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel-inner']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.AccordionItem | typeof __VLS_components.AccordionItem} */
AccordionItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    value: (props.value),
    disabled: (props.disabled),
    ...{ class: (['agds-accordion-item', `agds-accordion-item--bg-${__VLS_ctx.activeBackground}`]) },
}));
const __VLS_2 = __VLS_1({
    value: (props.value),
    disabled: (props.disabled),
    ...{ class: (['agds-accordion-item', `agds-accordion-item--bg-${__VLS_ctx.activeBackground}`]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-accordion-item']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof __VLS_components.AccordionHeader | typeof __VLS_components.AccordionHeader} */
AccordionHeader;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    as: (`h${props.headingLevel}`),
    ...{ class: "agds-accordion-item__heading" },
}));
const __VLS_9 = __VLS_8({
    as: (`h${props.headingLevel}`),
    ...{ class: "agds-accordion-item__heading" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__heading']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type {typeof __VLS_components.AccordionTrigger | typeof __VLS_components.AccordionTrigger} */
AccordionTrigger;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ class: ([
            'agds-accordion-item__trigger',
            `agds-accordion-item__trigger--bg-${__VLS_ctx.activeBackground}`,
            { 'agds-accordion-item__trigger--indented': __VLS_ctx.indent },
        ]) },
}));
const __VLS_15 = __VLS_14({
    ...{ class: ([
            'agds-accordion-item__trigger',
            `agds-accordion-item__trigger--bg-${__VLS_ctx.activeBackground}`,
            { 'agds-accordion-item__trigger--indented': __VLS_ctx.indent },
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__trigger--indented']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-accordion-item__title" },
});
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__title']} */ ;
(props.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "agds-accordion-item__chevron" },
    'aria-hidden': "true",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__chevron']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
    points: "6 9 12 15 18 9",
});
// @ts-ignore
[activeBackground, activeBackground, indent,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_19;
/** @ts-ignore @type {typeof __VLS_components.AccordionContent | typeof __VLS_components.AccordionContent} */
AccordionContent;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: ([
            'agds-accordion-item__panel',
            { 'agds-accordion-item__panel--indented': __VLS_ctx.indent },
        ]) },
}));
const __VLS_21 = __VLS_20({
    ...{ class: ([
            'agds-accordion-item__panel',
            { 'agds-accordion-item__panel--indented': __VLS_ctx.indent },
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel--indented']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-accordion-item__panel-inner" },
});
/** @type {__VLS_StyleScopedClasses['agds-accordion-item__panel-inner']} */ ;
var __VLS_25 = {};
// @ts-ignore
[indent,];
var __VLS_22;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_26 = __VLS_25;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
