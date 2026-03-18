import { computed, getCurrentInstance, ref, watch } from 'vue';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxPortal, ComboboxRoot, ComboboxTrigger, ComboboxViewport, } from 'reka-ui';
import AGDSField from '../field/AGDSField.vue';
import { filterOptions, generateOptions } from './timePickerUtils';
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    disabled: false,
    block: false,
    loading: false,
    interval: 15,
    max: '24:00',
    min: '00:00',
    timeFormat: 'h:mm aaa',
    emptyResultsMessage: 'No options found',
});
const emit = defineEmits();
// ── Model ─────────────────────────────────────────────────────────────────────
// Public v-model: DefaultComboboxOption | null
const model = defineModel({ default: null });
// Reka UI model: the option.value string, or undefined when nothing is selected
const selectedValue = computed({
    get: () => model.value?.value,
    set: (val) => {
        model.value = val != null ? (options.value.find((o) => o.value === val) ?? null) : null;
    },
});
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `agds-time-picker-${uid}`);
// ── Options ───────────────────────────────────────────────────────────────────
const options = computed(() => generateOptions({
    interval: props.interval,
    max: props.max,
    min: props.min,
    timeFormat: props.timeFormat,
}));
// Reset the search term whenever the option set is regenerated (e.g. timeFormat changes)
const searchTerm = ref('');
watch(options, () => {
    searchTerm.value = '';
});
const filteredOptions = computed(() => filterOptions(options.value, searchTerm.value));
// ── Expose ────────────────────────────────────────────────────────────────────
const containerRef = ref(null);
const __VLS_exposed = { focus: () => containerRef.value?.querySelector('input')?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaultModels = {
    'modelValue': null,
};
let __VLS_modelEmit;
const __VLS_defaults = {
    invalid: false,
    required: false,
    disabled: false,
    block: false,
    loading: false,
    interval: 15,
    max: '24:00',
    min: '00:00',
    timeFormat: 'h:mm aaa',
    emptyResultsMessage: 'No options found',
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
/** @type {__VLS_StyleScopedClasses['agds-time-picker__control']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__option']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-time-picker__option']} */ ;
const __VLS_0 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: (__VLS_ctx.label),
    id: (__VLS_ctx.inputId),
    labelId: (__VLS_ctx.labelId),
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
    labelId: (__VLS_ctx.labelId),
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
    const [{ id: fieldId, 'aria-required': ariaRequired, 'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby, }] = __VLS_vSlot(__VLS_7);
    let __VLS_8;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxRoot | typeof __VLS_components.ComboboxRoot} */
    ComboboxRoot;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        modelValue: (__VLS_ctx.selectedValue),
        disabled: (__VLS_ctx.disabled),
        name: (__VLS_ctx.name),
        required: (__VLS_ctx.required),
        ignoreFilter: (true),
        ...{ class: "agds-time-picker" },
        ...{ class: ({ 'agds-time-picker--block': __VLS_ctx.block }) },
    }));
    const __VLS_10 = __VLS_9({
        modelValue: (__VLS_ctx.selectedValue),
        disabled: (__VLS_ctx.disabled),
        name: (__VLS_ctx.name),
        required: (__VLS_ctx.required),
        ignoreFilter: (true),
        ...{ class: "agds-time-picker" },
        ...{ class: ({ 'agds-time-picker--block': __VLS_ctx.block }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    /** @type {__VLS_StyleScopedClasses['agds-time-picker']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-time-picker--block']} */ ;
    const { default: __VLS_13 } = __VLS_11.slots;
    let __VLS_14;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxAnchor | typeof __VLS_components.ComboboxAnchor} */
    ComboboxAnchor;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        ref: "containerRef",
        ...{ class: "agds-time-picker__control" },
        ...{ class: ({ 'agds-time-picker__control--invalid': __VLS_ctx.invalid }) },
    }));
    const __VLS_16 = __VLS_15({
        ref: "containerRef",
        ...{ class: "agds-time-picker__control" },
        ...{ class: ({ 'agds-time-picker__control--invalid': __VLS_ctx.invalid }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    var __VLS_19 = {};
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__control--invalid']} */ ;
    const { default: __VLS_21 } = __VLS_17.slots;
    let __VLS_22;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxInput} */
    ComboboxInput;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        id: (fieldId),
        modelValue: (__VLS_ctx.searchTerm),
        displayValue: ((val) => __VLS_ctx.options.find((o) => o.value === val)?.label ?? ''),
        ...{ class: "agds-time-picker__input" },
        placeholder: (__VLS_ctx.placeholder),
        'aria-required': (ariaRequired),
        'aria-invalid': (ariaInvalid),
        'aria-describedby': (ariaDescribedby || undefined),
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        id: (fieldId),
        modelValue: (__VLS_ctx.searchTerm),
        displayValue: ((val) => __VLS_ctx.options.find((o) => o.value === val)?.label ?? ''),
        ...{ class: "agds-time-picker__input" },
        placeholder: (__VLS_ctx.placeholder),
        'aria-required': (ariaRequired),
        'aria-invalid': (ariaInvalid),
        'aria-describedby': (ariaDescribedby || undefined),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_27;
    const __VLS_28 = ({ focus: {} },
        { onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [label, inputId, labelId, hint, invalid, invalid, message, required, required, hideOptionalLabel, secondaryLabel, maxWidth, selectedValue, disabled, name, block, searchTerm, options, placeholder, emit,];
            } });
    const __VLS_29 = ({ blur: {} },
        { onBlur: (...[$event]) => {
                __VLS_ctx.emit('blur', $event);
                // @ts-ignore
                [emit,];
            } });
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__input']} */ ;
    var __VLS_25;
    var __VLS_26;
    let __VLS_30;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxTrigger | typeof __VLS_components.ComboboxTrigger} */
    ComboboxTrigger;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ class: "agds-time-picker__trigger" },
        disabled: (__VLS_ctx.disabled),
    }));
    const __VLS_32 = __VLS_31({
        ...{ class: "agds-time-picker__trigger" },
        disabled: (__VLS_ctx.disabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__trigger']} */ ;
    const { default: __VLS_35 } = __VLS_33.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
        points: "6 9 12 15 18 9",
    });
    // @ts-ignore
    [disabled,];
    var __VLS_33;
    // @ts-ignore
    [];
    var __VLS_17;
    let __VLS_36;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxPortal | typeof __VLS_components.ComboboxPortal} */
    ComboboxPortal;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const { default: __VLS_41 } = __VLS_39.slots;
    let __VLS_42;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxContent | typeof __VLS_components.ComboboxContent} */
    ComboboxContent;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        ...{ class: "agds-time-picker__content" },
        avoidCollisions: (false),
    }));
    const __VLS_44 = __VLS_43({
        ...{ class: "agds-time-picker__content" },
        avoidCollisions: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__content']} */ ;
    const { default: __VLS_47 } = __VLS_45.slots;
    let __VLS_48;
    /** @ts-ignore @type {typeof __VLS_components.ComboboxViewport | typeof __VLS_components.ComboboxViewport} */
    ComboboxViewport;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        ...{ class: "agds-time-picker__listbox" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ class: "agds-time-picker__listbox" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['agds-time-picker__listbox']} */ ;
    const { default: __VLS_53 } = __VLS_51.slots;
    if (__VLS_ctx.loading) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-time-picker__loading" },
            'aria-live': "polite",
        });
        /** @type {__VLS_StyleScopedClasses['agds-time-picker__loading']} */ ;
    }
    else {
        let __VLS_54;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxEmpty | typeof __VLS_components.ComboboxEmpty} */
        ComboboxEmpty;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
            ...{ class: "agds-time-picker__empty" },
        }));
        const __VLS_56 = __VLS_55({
            ...{ class: "agds-time-picker__empty" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        /** @type {__VLS_StyleScopedClasses['agds-time-picker__empty']} */ ;
        const { default: __VLS_59 } = __VLS_57.slots;
        (__VLS_ctx.emptyResultsMessage);
        // @ts-ignore
        [loading, emptyResultsMessage,];
        var __VLS_57;
        for (const [option] of __VLS_vFor((__VLS_ctx.filteredOptions))) {
            let __VLS_60;
            /** @ts-ignore @type {typeof __VLS_components.ComboboxItem | typeof __VLS_components.ComboboxItem} */
            ComboboxItem;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
                key: (option.value),
                value: (option.value),
                ...{ class: "agds-time-picker__option" },
            }));
            const __VLS_62 = __VLS_61({
                key: (option.value),
                value: (option.value),
                ...{ class: "agds-time-picker__option" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            /** @type {__VLS_StyleScopedClasses['agds-time-picker__option']} */ ;
            const { default: __VLS_65 } = __VLS_63.slots;
            (option.label);
            let __VLS_66;
            /** @ts-ignore @type {typeof __VLS_components.ComboboxItemIndicator | typeof __VLS_components.ComboboxItemIndicator} */
            ComboboxItemIndicator;
            // @ts-ignore
            const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
                ...{ class: "agds-time-picker__option-check" },
            }));
            const __VLS_68 = __VLS_67({
                ...{ class: "agds-time-picker__option-check" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_67));
            /** @type {__VLS_StyleScopedClasses['agds-time-picker__option-check']} */ ;
            const { default: __VLS_71 } = __VLS_69.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                'aria-hidden': "true",
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2.5",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "20 6 9 17 4 12",
            });
            // @ts-ignore
            [filteredOptions,];
            var __VLS_69;
            // @ts-ignore
            [];
            var __VLS_63;
            // @ts-ignore
            [];
        }
    }
    // @ts-ignore
    [];
    var __VLS_51;
    // @ts-ignore
    [];
    var __VLS_45;
    // @ts-ignore
    [];
    var __VLS_39;
    // @ts-ignore
    [];
    var __VLS_11;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_20 = __VLS_19;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
