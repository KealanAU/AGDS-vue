import { provide } from 'vue';
import { CHECKBOX_GROUP_KEY } from './checkboxGroupContext';
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    disabled: false,
});
provide(CHECKBOX_GROUP_KEY, {
    get name() { return props.name; },
    get invalid() { return props.invalid; },
    get required() { return props.required; },
    get disabled() { return props.disabled; },
    get messageId() { return props.messageId; },
});
const __VLS_defaults = {
    invalid: false,
    required: false,
    disabled: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.fieldset, __VLS_intrinsics.fieldset)({
    ...{ class: "ausgov-checkbox-group" },
    ...{ class: ({ 'ausgov-checkbox-group--invalid': props.invalid }) },
    disabled: (props.disabled || undefined),
});
/** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group--invalid']} */ ;
if (props.legend || __VLS_ctx.$slots.legend) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.legend, __VLS_intrinsics.legend)({
        ...{ class: "ausgov-checkbox-group__legend" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group__legend']} */ ;
    var __VLS_0 = {};
    (props.legend);
    if (props.required) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-checkbox-group__required" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group__required']} */ ;
    }
}
if (__VLS_ctx.$slots.hint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-checkbox-group__hint" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group__hint']} */ ;
    var __VLS_2 = {};
}
if (props.invalid && __VLS_ctx.$slots.message) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: (props.messageId),
        ...{ class: "ausgov-checkbox-group__message" },
        role: "alert",
        'aria-live': "assertive",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group__message']} */ ;
    var __VLS_4 = {};
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-checkbox-group__items" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-checkbox-group__items']} */ ;
var __VLS_6 = {};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4, __VLS_7 = __VLS_6;
// @ts-ignore
[$slots, $slots, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
