import { watch, useTemplateRef } from 'vue';
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose, } from 'reka-ui';
const props = defineProps();
const emit = defineEmits();
// Focus the title on open so the screen reader announces it immediately.
const titleRef = useTemplateRef({});
function onOpenAutoFocus(e) {
    e.preventDefault();
    titleRef.value?.$el?.focus();
}
// Lock body scroll while the modal is open.
watch(() => props.modelValue, (open) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
    }
}, { immediate: true });
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-modal__dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-modal__close']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-modal__close']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-modal__title']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.DialogRoot | typeof __VLS_components.DialogRoot} */
DialogRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (props.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (props.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': ((open) => __VLS_ctx.emit('update:modelValue', open)) });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
let __VLS_9;
/** @ts-ignore @type {typeof __VLS_components.DialogPortal | typeof __VLS_components.DialogPortal} */
DialogPortal;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    forceMount: true,
}));
const __VLS_11 = __VLS_10({
    forceMount: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_14 } = __VLS_12.slots;
let __VLS_15;
/** @ts-ignore @type {typeof __VLS_components.DialogOverlay} */
DialogOverlay;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    ...{ class: "ausgov-modal__overlay" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "ausgov-modal__overlay" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['ausgov-modal__overlay']} */ ;
let __VLS_20;
/** @ts-ignore @type {typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    ...{ 'onOpenAutoFocus': {} },
    ...{ class: "ausgov-modal__dialog" },
}));
const __VLS_22 = __VLS_21({
    ...{ 'onOpenAutoFocus': {} },
    ...{ class: "ausgov-modal__dialog" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
const __VLS_26 = ({ openAutoFocus: {} },
    { onOpenAutoFocus: (__VLS_ctx.onOpenAutoFocus) });
/** @type {__VLS_StyleScopedClasses['ausgov-modal__dialog']} */ ;
const { default: __VLS_27 } = __VLS_23.slots;
let __VLS_28;
/** @ts-ignore @type {typeof __VLS_components.DialogClose | typeof __VLS_components.DialogClose} */
DialogClose;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    asChild: true,
}));
const __VLS_30 = __VLS_29({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_33 } = __VLS_31.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "ausgov-modal__close" },
    'aria-label': "Close modal",
});
/** @type {__VLS_StyleScopedClasses['ausgov-modal__close']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "ausgov-modal__close-icon" },
    'aria-hidden': "true",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
/** @type {__VLS_StyleScopedClasses['ausgov-modal__close-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.line)({
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.line)({
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[emit, onOpenAutoFocus,];
var __VLS_31;
let __VLS_34;
/** @ts-ignore @type {typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    ref: "titleRef",
    tabindex: "-1",
    ...{ class: "ausgov-modal__title" },
}));
const __VLS_36 = __VLS_35({
    ref: "titleRef",
    tabindex: "-1",
    ...{ class: "ausgov-modal__title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
var __VLS_39 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-modal__title']} */ ;
const { default: __VLS_41 } = __VLS_37.slots;
(props.title);
// @ts-ignore
[];
var __VLS_37;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-modal__body" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-modal__body']} */ ;
var __VLS_42 = {};
if (__VLS_ctx.$slots.actions) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-modal__actions" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-modal__actions']} */ ;
    var __VLS_44 = {};
}
// @ts-ignore
[$slots,];
var __VLS_23;
var __VLS_24;
// @ts-ignore
[];
var __VLS_12;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_40 = __VLS_39, __VLS_43 = __VLS_42, __VLS_45 = __VLS_44;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
