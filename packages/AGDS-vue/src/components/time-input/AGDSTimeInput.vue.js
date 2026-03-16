import { computed, getCurrentInstance, ref, watch } from 'vue';
import AGDSField from '../field/AGDSField.vue';
import { acceptedTimeFormats, formatTime, transformValuePropToInputValue, } from './timeInputUtils';
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    maxWidth: 'md',
    timeFormat: 'h:mm aaa',
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `time-input-${uid}`);
// ── Input value ───────────────────────────────────────────────────────────────
const inputRef = ref(null);
const inputValue = ref(transformValuePropToInputValue(props.modelValue?.value, props.timeFormat));
// Sync when modelValue or timeFormat prop changes externally
watch(() => [props.modelValue, props.timeFormat], ([newValue, newFormat]) => {
    inputValue.value = transformValuePropToInputValue(newValue?.value, newFormat);
});
function handleInput(event) {
    // Update the raw input immediately so the user can type freely
    inputValue.value = event.target.value;
}
function handleBlur(event) {
    const raw = event.target.value;
    const normalizedTime = formatTime(raw, 'HH:mm');
    const timeValue = normalizedTime
        ? { formatted: formatTime(raw, props.timeFormat), value: normalizedTime }
        : undefined;
    emit('update:modelValue', timeValue);
    emit('change', timeValue);
    emit('blur', event);
}
// ── Secondary label (e.g. "(e.g. 9:30 pm)") ──────────────────────────────────
const secondaryLabel = computed(() => {
    const fmt = acceptedTimeFormats.includes(props.timeFormat) ? props.timeFormat : 'h:mm aaa';
    return '(e.g. ' + formatTime('21:30', fmt) + ')';
});
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
    maxWidth: 'md',
    timeFormat: 'h:mm aaa',
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
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
const __VLS_0 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: (__VLS_ctx.label),
    id: (__VLS_ctx.inputId),
    hint: (__VLS_ctx.hint),
    invalid: (__VLS_ctx.invalid),
    message: (__VLS_ctx.message),
    required: (__VLS_ctx.required),
    hideOptionalLabel: (__VLS_ctx.hideOptionalLabel),
    secondaryLabel: (__VLS_ctx.secondaryLabel),
    maxWidth: (__VLS_ctx.maxWidth),
}));
const __VLS_2 = __VLS_1({
    label: (__VLS_ctx.label),
    id: (__VLS_ctx.inputId),
    hint: (__VLS_ctx.hint),
    invalid: (__VLS_ctx.invalid),
    message: (__VLS_ctx.message),
    required: (__VLS_ctx.required),
    hideOptionalLabel: (__VLS_ctx.hideOptionalLabel),
    secondaryLabel: (__VLS_ctx.secondaryLabel),
    maxWidth: (__VLS_ctx.maxWidth),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { default: __VLS_7 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_7);
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        ...{ onBlur: (__VLS_ctx.handleBlur) },
        ...{ onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [label, inputId, hint, invalid, message, required, hideOptionalLabel, secondaryLabel, maxWidth, handleInput, handleBlur, emit,];
            } },
        ref: "inputRef",
        ...(slotProps),
        ...{ class: "agds-time-input" },
        ...{ class: ({
                'agds-time-input--invalid': __VLS_ctx.invalid,
                'agds-time-input--block': __VLS_ctx.block,
            }) },
        ...{ style: (__VLS_ctx.containerStyle) },
        type: "text",
        name: (__VLS_ctx.name),
        disabled: (__VLS_ctx.disabled),
        placeholder: (__VLS_ctx.placeholder),
        value: (__VLS_ctx.inputValue),
    });
    /** @type {__VLS_StyleScopedClasses['agds-time-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-time-input--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-time-input--block']} */ ;
    // @ts-ignore
    [invalid, block, containerStyle, name, disabled, placeholder, inputValue,];
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
