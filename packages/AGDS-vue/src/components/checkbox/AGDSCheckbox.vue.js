import { computed, inject, onMounted, ref, watch } from 'vue';
import { CHECKBOX_GROUP_KEY } from './checkboxGroupContext';
const props = withDefaults(defineProps(), {
    size: 'md',
    disabled: false,
    indeterminate: false,
    invalid: false,
    required: false,
    modelValue: false,
});
const emit = defineEmits();
// ── Auto-generate a stable id when none is provided ─────────────────────────
let _idCounter = 0;
const autoId = `agds-checkbox-${++_idCounter}`;
const inputId = computed(() => props.id ?? autoId);
// ── Group context (provided by AGDSCheckboxGroup) ──────────────────────────
const group = inject(CHECKBOX_GROUP_KEY, null);
const resolvedName = computed(() => props.name ?? group?.name ?? undefined);
const resolvedInvalid = computed(() => typeof props.invalid === 'boolean' && props.invalid
    ? true
    : group?.invalid ?? false);
const resolvedRequired = computed(() => typeof props.required === 'boolean' && props.required
    ? true
    : group?.required ?? false);
const resolvedDisabled = computed(() => props.disabled || (group?.disabled ?? false));
const describedBy = computed(() => resolvedInvalid.value && group?.messageId ? group.messageId : undefined);
// ── Refs ────────────────────────────────────────────────────────────────────
const inputRef = ref(null);
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
// ── Indeterminate — must be set via JS property, not HTML attribute ───────────
function applyIndeterminate() {
    if (inputRef.value) {
        inputRef.value.indeterminate = Boolean(props.indeterminate);
    }
}
onMounted(applyIndeterminate);
watch(() => props.indeterminate, applyIndeterminate);
// ── Checked — indeterminate overrides to false so input is not checked ────────
const checkedValue = computed(() => (props.indeterminate ? false : props.modelValue));
// ── Handlers ─────────────────────────────────────────────────────────────────
function handleChange(event) {
    if (resolvedDisabled.value)
        return;
    const target = event.target;
    emit('update:modelValue', target.checked);
    emit('change', event);
}
const __VLS_defaults = {
    size: 'md',
    disabled: false,
    indeterminate: false,
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
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.inputId),
    ...{ class: "agds-checkbox" },
    ...{ class: ([
            `agds-checkbox--${props.size}`,
            { 'agds-checkbox--disabled': __VLS_ctx.resolvedDisabled },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox--disabled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-checkbox__control" },
});
/** @type {__VLS_StyleScopedClasses['agds-checkbox__control']} */ ;
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
    type: "checkbox",
    ...{ class: "agds-checkbox__input" },
    name: (__VLS_ctx.resolvedName),
    checked: (__VLS_ctx.checkedValue),
    disabled: (__VLS_ctx.resolvedDisabled),
    required: (__VLS_ctx.resolvedRequired || undefined),
    'aria-checked': (props.indeterminate ? 'mixed' : undefined),
    'aria-invalid': (__VLS_ctx.resolvedInvalid || undefined),
    'aria-required': (__VLS_ctx.resolvedRequired || undefined),
    'aria-describedby': (__VLS_ctx.describedBy),
});
(__VLS_ctx.$attrs);
/** @type {__VLS_StyleScopedClasses['agds-checkbox__input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-checkbox__indicator" },
    ...{ class: ({
            'agds-checkbox__indicator--invalid': __VLS_ctx.resolvedInvalid,
            'agds-checkbox__indicator--disabled': __VLS_ctx.resolvedDisabled,
        }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-checkbox__indicator--disabled']} */ ;
if (!props.indeterminate) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "agds-checkbox__icon agds-checkbox__icon--check" },
        viewBox: "0 0 12 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        focusable: "false",
    });
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__icon--check']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M1 5L4.5 8.5L11 1.5",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "agds-checkbox__icon agds-checkbox__icon--minus" },
        viewBox: "0 0 12 2",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        focusable: "false",
    });
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__icon--minus']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M1 1H11",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
    });
}
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-checkbox__label" },
        ...{ class: ({ 'agds-checkbox__label--disabled': __VLS_ctx.resolvedDisabled }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__label']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-checkbox__label--disabled']} */ ;
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[inputId, resolvedDisabled, resolvedDisabled, resolvedDisabled, resolvedName, checkedValue, resolvedRequired, resolvedRequired, resolvedInvalid, resolvedInvalid, describedBy, $attrs, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
