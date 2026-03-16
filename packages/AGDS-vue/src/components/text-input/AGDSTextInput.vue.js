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
    type: 'text',
    modelValue: '',
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `text-input-${uid}`);
// ── Value ─────────────────────────────────────────────────────────────────────
const inputRef = ref(null);
const internalValue = ref(props.modelValue ?? '');
const value = computed(() => props.modelValue !== undefined ? props.modelValue : internalValue.value);
function handleInput(event) {
    const val = event.target.value;
    internalValue.value = val;
    emit('update:modelValue', val);
}
// ── Max-width ─────────────────────────────────────────────────────────────────
const MAX_WIDTH_MAP = {
    xs: '10ch',
    sm: '20ch',
    md: '30ch',
    lg: '40ch',
    xl: '60ch',
};
const containerStyle = computed(() => props.block ? { width: '100%' } : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] });
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
    type: 'text',
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
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.emit('change', $event);
                // @ts-ignore
                [inputId, handleInput, emit,];
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
        ...{ class: "agds-text-input" },
        ...{ class: ({
                'agds-text-input--invalid': props.invalid,
                'agds-text-input--block': props.block,
            }) },
        ...{ style: (__VLS_ctx.containerStyle) },
        type: (props.type),
        name: (props.name),
        disabled: (props.disabled),
        autofocus: (props.autoFocus || undefined),
        autocomplete: (props.autoComplete),
        inputmode: (props.inputMode),
        maxlength: (props.maxLength),
        pattern: (props.pattern),
        placeholder: (props.placeholder),
        value: (__VLS_ctx.value),
    });
    /** @type {__VLS_StyleScopedClasses['agds-text-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-text-input--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-text-input--block']} */ ;
    // @ts-ignore
    [containerStyle, value,];
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
