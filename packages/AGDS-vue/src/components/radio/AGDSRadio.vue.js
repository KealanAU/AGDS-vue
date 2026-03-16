import { computed, inject } from 'vue';
import { RADIO_GROUP_KEY } from './radioGroupContext';
const props = withDefaults(defineProps(), {
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
});
const emit = defineEmits();
// ── Auto-generate a stable id when none is provided ─────────────────────────
let _idCounter = 0;
const autoId = `agds-radio-${++_idCounter}`;
const inputId = computed(() => props.id ?? autoId);
// ── Group context (provided by AgDSRadioGroup) ─────────────────────────────
const group = inject(RADIO_GROUP_KEY, null);
const resolvedName = computed(() => props.name ?? group?.name ?? undefined);
const resolvedInvalid = computed(() => typeof props.invalid === 'boolean' && props.invalid
    ? true
    : group?.invalid ?? false);
const resolvedRequired = computed(() => typeof props.required === 'boolean' && props.required
    ? true
    : group?.required ?? false);
const resolvedDisabled = computed(() => props.disabled || (group?.disabled ?? false));
const describedBy = computed(() => resolvedInvalid.value && group?.messageId ? group.messageId : undefined);
const isChecked = computed(() => props.modelValue === props.value);
// ── Handlers ─────────────────────────────────────────────────────────────────
function handleChange(event) {
    if (resolvedDisabled.value)
        return;
    emit('update:modelValue', props.value);
    emit('change', event);
}
// ── Expose ───────────────────────────────────────────────────────────────────
import { ref } from 'vue';
const inputRef = ref(null);
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
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
/** @type {__VLS_StyleScopedClasses['agds-radio__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__dot']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.inputId),
    ...{ class: "agds-radio" },
    ...{ class: ([
            `agds-radio--${props.size}`,
            { 'agds-radio--disabled': __VLS_ctx.resolvedDisabled },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-radio__control" },
});
/** @type {__VLS_StyleScopedClasses['agds-radio__control']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.emit('focus', $event);
            // @ts-ignore
            [inputId, resolvedDisabled, handleChange, emit,];
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.emit('blur', $event);
            // @ts-ignore
            [emit,];
        } },
    id: (__VLS_ctx.inputId),
    ref: "inputRef",
    type: "radio",
    ...{ class: "agds-radio__input" },
    name: (__VLS_ctx.resolvedName),
    value: (props.value),
    checked: (__VLS_ctx.isChecked),
    disabled: (__VLS_ctx.resolvedDisabled),
    required: (__VLS_ctx.resolvedRequired || undefined),
    'aria-invalid': (__VLS_ctx.resolvedInvalid || undefined),
    'aria-required': (__VLS_ctx.resolvedRequired || undefined),
    'aria-describedby': (__VLS_ctx.describedBy),
});
(__VLS_ctx.$attrs);
/** @type {__VLS_StyleScopedClasses['agds-radio__input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-radio__indicator" },
    ...{ class: ({
            'agds-radio__indicator--invalid': __VLS_ctx.resolvedInvalid,
            'agds-radio__indicator--disabled': __VLS_ctx.resolvedDisabled,
        }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-radio__indicator--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "agds-radio__dot" },
});
/** @type {__VLS_StyleScopedClasses['agds-radio__dot']} */ ;
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-radio__label" },
        ...{ class: ({ 'agds-radio__label--disabled': __VLS_ctx.resolvedDisabled }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-radio__label']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-radio__label--disabled']} */ ;
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[inputId, resolvedDisabled, resolvedDisabled, resolvedDisabled, resolvedName, isChecked, resolvedRequired, resolvedRequired, resolvedInvalid, resolvedInvalid, describedBy, $attrs, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
