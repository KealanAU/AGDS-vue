import { computed, ref } from 'vue';
const props = withDefaults(defineProps(), {
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
    modelValue: false,
});
const emit = defineEmits();
let _idCounter = 0;
const autoId = `agds-switch-${++_idCounter}`;
const inputId = computed(() => props.id ?? autoId);
const inputRef = ref(null);
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
function handleChange(event) {
    if (props.disabled)
        return;
    const target = event.target;
    emit('update:modelValue', target.checked);
    emit('change', event);
}
const __VLS_defaults = {
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
    modelValue: false,
};
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
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.inputId),
    ...{ class: "agds-switch" },
    ...{ class: ([
            `agds-switch--${props.size}`,
            { 'agds-switch--disabled': props.disabled },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.emit('focus', $event);
            // @ts-ignore
            [inputId, handleChange, emit,];
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.emit('blur', $event);
            // @ts-ignore
            [emit,];
        } },
    id: (__VLS_ctx.inputId),
    ref: "inputRef",
    type: "checkbox",
    role: "switch",
    ...{ class: "agds-switch__input" },
    name: (props.name),
    checked: (props.modelValue),
    disabled: (props.disabled),
    required: (props.required || undefined),
    'aria-invalid': (props.invalid || undefined),
    'aria-required': (props.required || undefined),
});
(__VLS_ctx.$attrs);
/** @type {__VLS_StyleScopedClasses['agds-switch__input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-switch__track" },
    ...{ class: ({
            'agds-switch__track--invalid': props.invalid,
            'agds-switch__track--disabled': props.disabled,
        }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-switch__track']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-switch__track--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "agds-switch__thumb" },
});
/** @type {__VLS_StyleScopedClasses['agds-switch__thumb']} */ ;
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-switch__label" },
        ...{ class: ({ 'agds-switch__label--disabled': props.disabled }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-switch__label']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-switch__label--disabled']} */ ;
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[inputId, $attrs, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
