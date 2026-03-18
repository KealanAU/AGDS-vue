import { computed, getCurrentInstance, ref } from 'vue';
import AGDSField from '../field/AGDSField.vue';
import AGDSIcon from '../icon/AGDSIcon.vue';
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
/** @type {__VLS_StyleScopedClasses['agds-password-input__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-password-input__toggle']} */ ;
const __VLS_0 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: (props.label),
    id: (__VLS_ctx.inputId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    maxWidth: (props.maxWidth),
}));
const __VLS_2 = __VLS_1({
    label: (props.label),
    id: (__VLS_ctx.inputId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    maxWidth: (props.maxWidth),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { default: __VLS_7 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_7);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-password-input__wrapper" },
        ...{ class: ({ 'agds-password-input__wrapper--block': props.block }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-password-input__wrapper']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-password-input__wrapper--block']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
                // @ts-ignore
                [inputType, showPassword, showPassword,];
            } },
        type: "button",
        ...{ class: "agds-password-input__toggle" },
        'aria-label': (__VLS_ctx.showPassword ? 'Hide password' : 'Show password'),
        'aria-controls': (__VLS_ctx.inputId),
        'aria-pressed': (__VLS_ctx.showPassword),
        disabled: (props.disabled),
    });
    /** @type {__VLS_StyleScopedClasses['agds-password-input__toggle']} */ ;
    const __VLS_8 = AGDSIcon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        name: (__VLS_ctx.showPassword ? 'mdi:eye-off' : 'mdi:eye'),
        size: "md",
        'aria-hidden': "true",
    }));
    const __VLS_10 = __VLS_9({
        name: (__VLS_ctx.showPassword ? 'mdi:eye-off' : 'mdi:eye'),
        size: "md",
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    // @ts-ignore
    [inputId, showPassword, showPassword, showPassword,];
}
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
