import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    as: 'div',
    tone: 'neutral',
    variant: 'regular',
    onBodyAlt: false,
});
// Neutral tone switches to a slightly darker shade when placed on a bodyAlt surface.
const useBodyAltBg = computed(() => props.tone === 'neutral' && (props.onBodyAlt || props.background === 'shadeAlt'));
// Show the default info icon when tone=info and no custom icon slot is provided.
// Checked in template via $slots.icon.
const showDefaultIcon = computed(() => props.tone === 'info');
const __VLS_defaults = {
    as: 'div',
    tone: 'neutral',
    variant: 'regular',
    onBodyAlt: false,
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
/** @type {__VLS_StyleScopedClasses['ausgov-callout--neutral']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--info']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--info']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--feature']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__content']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--regular']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__content']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--feature']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__content']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--compact']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--regular']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--feature']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout__title']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: ([
            'ausgov-callout',
            `ausgov-callout--${props.tone}`,
            `ausgov-callout--${props.variant}`,
            { 'ausgov-callout--body-alt': __VLS_ctx.useBodyAltBg },
        ]) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: ([
            'ausgov-callout',
            `ausgov-callout--${props.tone}`,
            `ausgov-callout--${props.variant}`,
            { 'ausgov-callout--body-alt': __VLS_ctx.useBodyAltBg },
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-callout']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-callout--body-alt']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.$slots.icon || __VLS_ctx.showDefaultIcon) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-callout__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-callout__icon']} */ ;
    var __VLS_7 = {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        role: "img",
        'aria-label': "Information",
        ...{ class: "ausgov-callout__icon-inner" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-callout__icon-inner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        'aria-hidden': "true",
        focusable: "false",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
        'clip-rule': "evenodd",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-callout__content" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-callout__content']} */ ;
if (props.title) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "ausgov-callout__title" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-callout__title']} */ ;
    (props.title);
}
var __VLS_9 = {};
// @ts-ignore
[useBodyAltBg, $slots, showDefaultIcon,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
