import { computed, getCurrentInstance, ref } from 'vue';
import AGDSField from '../field/AGDSField.vue';
import AGDSCheckbox from '../checkbox/AGDSCheckbox.vue';
import AgDSStack from '../stack/AGDSStack.vue';
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    autoFocus: false,
    modelValue: '',
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `password-input-${uid}`);
// ── Show/hide toggle ──────────────────────────────────────────────────────────
const showPassword = ref(false);
const inputType = computed(() => (showPassword.value ? 'text' : 'password'));
// ── Refs ──────────────────────────────────────────────────────────────────────
const inputRef = ref(null);
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    autoFocus: false,
    modelValue: '',
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
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
const __VLS_0 = AgDSStack || AgDSStack;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gap: (1),
}));
const __VLS_2 = __VLS_1({
    gap: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
const __VLS_7 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    label: (props.label),
    id: (__VLS_ctx.inputId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    maxWidth: (props.maxWidth),
}));
const __VLS_9 = __VLS_8({
    label: (props.label),
    id: (__VLS_ctx.inputId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    maxWidth: (props.maxWidth),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
{
    const { default: __VLS_13 } = __VLS_10.slots;
    const [slotProps] = __VLS_vSlot(__VLS_13);
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                __VLS_ctx.emit('update:modelValue', $event.target.value);
                // @ts-ignore
                [inputId, emit,];
            } },
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.emit('change', $event);
                // @ts-ignore
                [emit,];
            } },
        ...{ onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [emit,];
            } },
        ...{ onBlur: (...[$event]) => {
                __VLS_ctx.emit('blur', $event);
                // @ts-ignore
                [emit,];
            } },
        ref: "inputRef",
        ...(slotProps),
        type: (__VLS_ctx.inputType),
        ...{ class: "agds-password-input__input" },
        ...{ class: ({
                'agds-password-input__input--invalid': props.invalid,
                'agds-password-input__input--block': props.block,
            }) },
        name: (props.name),
        disabled: (props.disabled),
        autocomplete: (props.autoComplete),
        autofocus: (props.autoFocus || undefined),
        maxlength: (props.maxLength),
        value: (props.modelValue),
    });
    /** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-password-input__input--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-password-input__input--block']} */ ;
    // @ts-ignore
    [inputType,];
}
// @ts-ignore
[];
var __VLS_10;
const __VLS_14 = AGDSCheckbox || AGDSCheckbox;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.showPassword),
    'aria-controls': (__VLS_ctx.inputId),
    disabled: (props.disabled),
    size: "sm",
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.showPassword),
    'aria-controls': (__VLS_ctx.inputId),
    disabled: (props.disabled),
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_19 } = __VLS_17.slots;
// @ts-ignore
[inputId, showPassword,];
var __VLS_17;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
