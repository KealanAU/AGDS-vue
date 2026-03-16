import { computed, getCurrentInstance, ref } from 'vue';
import AGDSField from '../field/AGDSField.vue';
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    autoFocus: false,
    maxWidth: 'md',
    modelValue: '',
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `search-input-${uid}`);
// ── Value — supports both controlled (v-model) and uncontrolled modes ─────────
const inputRef = ref(null);
const internalValue = ref(props.modelValue ?? '');
const value = computed(() => props.modelValue !== undefined ? props.modelValue : internalValue.value);
const showClearButton = computed(() => Boolean(value.value));
function handleInput(event) {
    const val = event.target.value;
    internalValue.value = val;
    emit('update:modelValue', val);
}
function clearInput() {
    if (!value.value)
        return;
    internalValue.value = '';
    emit('update:modelValue', '');
    emit('clear');
    inputRef.value?.focus();
}
function handleKeyDown(event) {
    if (event.code === 'Escape') {
        clearInput();
    }
}
// ── Max-width ─────────────────────────────────────────────────────────────────
const MAX_WIDTH_MAP = {
    md: '30ch',
    lg: '40ch',
    xl: '60ch',
};
const containerStyle = computed(() => props.block ? {} : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] });
// ── Expose ────────────────────────────────────────────────────────────────────
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    autoFocus: false,
    maxWidth: 'md',
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
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__clear']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
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
        ...{ class: "agds-search-input__container" },
        ...{ style: (__VLS_ctx.containerStyle) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-search-input__container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-search-input__icon" },
        ...{ class: ({ 'agds-search-input__icon--disabled': props.disabled }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-search-input__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-search-input__icon--disabled']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "20",
        height: "20",
        fill: "currentColor",
        focusable: "false",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        ...{ onKeydown: (__VLS_ctx.handleKeyDown) },
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.emit('change', $event);
                // @ts-ignore
                [inputId, containerStyle, handleInput, handleKeyDown, emit,];
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
        type: "search",
        autocomplete: "off",
        ...{ class: "agds-search-input__input" },
        ...{ class: ({
                'agds-search-input__input--invalid': props.invalid,
                'agds-search-input__input--block': props.block,
                'agds-search-input__input--has-clear': __VLS_ctx.showClearButton,
            }) },
        name: (props.name),
        disabled: (props.disabled),
        autofocus: (props.autoFocus || undefined),
        placeholder: (props.placeholder),
        value: (__VLS_ctx.value),
    });
    /** @type {__VLS_StyleScopedClasses['agds-search-input__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-search-input__input--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-search-input__input--block']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-search-input__input--has-clear']} */ ;
    if (__VLS_ctx.showClearButton) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.clearInput) },
            role: "button",
            'aria-label': "Clear search",
            ...{ class: "agds-search-input__clear" },
            ...{ class: ({ 'agds-search-input__clear--disabled': props.disabled }) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-search-input__clear']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-search-input__clear--disabled']} */ ;
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
            d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
        });
    }
    // @ts-ignore
    [showClearButton, showClearButton, value, clearInput,];
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
