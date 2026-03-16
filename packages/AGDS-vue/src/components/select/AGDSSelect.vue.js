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
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const selectId = computed(() => props.id ?? `select-${uid}`);
// ── Ref & expose ──────────────────────────────────────────────────────────────
const selectRef = ref(null);
const __VLS_exposed = { focus: () => selectRef.value?.focus() };
defineExpose(__VLS_exposed);
// ── Container max-width ───────────────────────────────────────────────────────
const MAX_WIDTH_MAP = {
    sm: '20ch',
    md: '30ch',
    lg: '40ch',
    xl: '60ch',
};
const containerStyle = computed(() => props.block ? {} : { maxWidth: MAX_WIDTH_MAP[props.maxWidth] });
// ── Handlers ──────────────────────────────────────────────────────────────────
function handleChange(event) {
    if (props.disabled)
        return;
    emit('update:modelValue', event.target.value);
    emit('change', event);
}
const __VLS_defaults = {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    block: false,
    disabled: false,
    autoFocus: false,
    maxWidth: 'md',
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
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
const __VLS_0 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: (props.label),
    id: (__VLS_ctx.selectId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    maxWidth: (props.maxWidth),
}));
const __VLS_2 = __VLS_1({
    label: (props.label),
    id: (__VLS_ctx.selectId),
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
        ...{ class: "agds-select__container" },
        ...{ class: ({ 'agds-select__container--block': props.block }) },
        ...{ style: (__VLS_ctx.containerStyle) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-select__container']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-select__container--block']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
        ...{ onChange: (__VLS_ctx.handleChange) },
        ...{ onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [selectId, containerStyle, handleChange, emit,];
            } },
        ...{ onBlur: (...[$event]) => {
                __VLS_ctx.emit('blur', $event);
                // @ts-ignore
                [emit,];
            } },
        ref: "selectRef",
        ...(slotProps),
        ...{ class: "agds-select" },
        ...{ class: ({
                'agds-select--invalid': props.invalid,
                'agds-select--block': props.block,
                'agds-select--disabled': props.disabled,
            }) },
        name: (props.name),
        disabled: (props.disabled),
        autocomplete: (props.autoComplete),
        autofocus: (props.autoFocus || undefined),
        value: (props.modelValue),
    });
    /** @type {__VLS_StyleScopedClasses['agds-select']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-select--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-select--block']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-select--disabled']} */ ;
    if (props.placeholder) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "",
        });
        (props.placeholder);
    }
    for (const [opt] of __VLS_vFor((props.options))) {
        ('options' in opt ? opt.label : opt.value);
        if ('options' in opt) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.optgroup, __VLS_intrinsics.optgroup)({
                label: (opt.label),
                disabled: (opt.disabled),
            });
            for (const [child] of __VLS_vFor((opt.options))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    key: (child.value),
                    value: (child.value),
                    disabled: (child.disabled),
                });
                (child.label);
                // @ts-ignore
                [];
            }
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                value: (opt.value),
                disabled: (opt.disabled),
            });
            (opt.label);
        }
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-select__icon" },
        ...{ class: ({ 'agds-select__icon--disabled': props.disabled }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-select__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-select__icon--disabled']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "20",
        height: "20",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        focusable: "false",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
        points: "6 9 12 15 18 9",
    });
    // @ts-ignore
    [];
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
