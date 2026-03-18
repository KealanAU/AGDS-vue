import { computed, getCurrentInstance, ref } from 'vue';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxPortal, ComboboxRoot, ComboboxTrigger, ComboboxViewport, } from 'reka-ui';
import AGDSField from '../field/AGDSField.vue';
import { filterOptions } from './comboboxUtils';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_exposed, __VLS_setup = (async () => {
    const props = withDefaults(defineProps(), {
        invalid: false,
        required: false,
        disabled: false,
        block: false,
        clearable: false,
        emptyResultsMessage: 'No options found',
    });
    const emit = defineEmits();
    // Public model: Option | null
    const model = defineModel({ default: null });
    // Reka UI model: the option.value string, or undefined when nothing is selected.
    // When Reka UI emits update:modelValue the computed setter maps the string back to an Option.
    const selectedValue = computed({
        get: () => model.value?.value,
        set: (val) => {
            model.value = val != null ? (props.options.find((o) => o.value === val) ?? null) : null;
        },
    });
    const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
    const inputId = computed(() => props.id ?? `agds-combobox-${uid}`);
    // Search term drives our own filtering (ignoreFilter=true on ComboboxRoot bypasses Reka UI's
    // built-in string matching so we can match on both label and value fields).
    const searchTerm = ref('');
    const filteredOptions = computed(() => filterOptions(props.options, searchTerm.value));
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
        clearable: false,
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
    /** @type {__VLS_StyleScopedClasses['agds-combobox__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__clear']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__trigger']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__trigger']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__option']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox__option']} */ ;
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
            ...{ class: "agds-combobox" },
            ...{ class: ({ 'agds-combobox--block': __VLS_ctx.block }) },
        }));
        const __VLS_10 = __VLS_9({
            modelValue: (__VLS_ctx.selectedValue),
            disabled: (__VLS_ctx.disabled),
            name: (__VLS_ctx.name),
            required: (__VLS_ctx.required),
            ignoreFilter: (true),
            ...{ class: "agds-combobox" },
            ...{ class: ({ 'agds-combobox--block': __VLS_ctx.block }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        /** @type {__VLS_StyleScopedClasses['agds-combobox']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox--block']} */ ;
        const { default: __VLS_13 } = __VLS_11.slots;
        let __VLS_14;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxAnchor | typeof __VLS_components.ComboboxAnchor} */
        ComboboxAnchor;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
            ref: "containerRef",
            ...{ class: "agds-combobox__control" },
            ...{ class: ({ 'agds-combobox__control--invalid': __VLS_ctx.invalid }) },
        }));
        const __VLS_16 = __VLS_15({
            ref: "containerRef",
            ...{ class: "agds-combobox__control" },
            ...{ class: ({ 'agds-combobox__control--invalid': __VLS_ctx.invalid }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        var __VLS_19 = {};
        /** @type {__VLS_StyleScopedClasses['agds-combobox__control']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox__control--invalid']} */ ;
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
            ...{ class: "agds-combobox__input" },
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
            ...{ class: "agds-combobox__input" },
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
        /** @type {__VLS_StyleScopedClasses['agds-combobox__input']} */ ;
        var __VLS_25;
        var __VLS_26;
        if (__VLS_ctx.clearable && __VLS_ctx.model != null) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onMousedown: (...[$event]) => {
                        if (!(__VLS_ctx.clearable && __VLS_ctx.model != null))
                            return;
                        __VLS_ctx.model = null;
                        // @ts-ignore
                        [clearable, model, model,];
                    } },
                type: "button",
                ...{ class: "agds-combobox__clear" },
                'aria-label': "Clear selection",
                tabindex: "-1",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox__clear']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                'aria-hidden': "true",
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2.5",
                'stroke-linecap': "round",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
                x1: "18",
                y1: "6",
                x2: "6",
                y2: "18",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
                x1: "6",
                y1: "6",
                x2: "18",
                y2: "18",
            });
        }
        let __VLS_30;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxTrigger | typeof __VLS_components.ComboboxTrigger} */
        ComboboxTrigger;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
            ...{ class: "agds-combobox__trigger" },
            disabled: (__VLS_ctx.disabled),
        }));
        const __VLS_32 = __VLS_31({
            ...{ class: "agds-combobox__trigger" },
            disabled: (__VLS_ctx.disabled),
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        /** @type {__VLS_StyleScopedClasses['agds-combobox__trigger']} */ ;
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
            ...{ class: "agds-combobox__content" },
            avoidCollisions: (false),
        }));
        const __VLS_44 = __VLS_43({
            ...{ class: "agds-combobox__content" },
            avoidCollisions: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        /** @type {__VLS_StyleScopedClasses['agds-combobox__content']} */ ;
        const { default: __VLS_47 } = __VLS_45.slots;
        let __VLS_48;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxViewport | typeof __VLS_components.ComboboxViewport} */
        ComboboxViewport;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
            ...{ class: "agds-combobox__listbox" },
        }));
        const __VLS_50 = __VLS_49({
            ...{ class: "agds-combobox__listbox" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        /** @type {__VLS_StyleScopedClasses['agds-combobox__listbox']} */ ;
        const { default: __VLS_53 } = __VLS_51.slots;
        let __VLS_54;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxEmpty | typeof __VLS_components.ComboboxEmpty} */
        ComboboxEmpty;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
            ...{ class: "agds-combobox__empty" },
        }));
        const __VLS_56 = __VLS_55({
            ...{ class: "agds-combobox__empty" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        /** @type {__VLS_StyleScopedClasses['agds-combobox__empty']} */ ;
        const { default: __VLS_59 } = __VLS_57.slots;
        (__VLS_ctx.emptyResultsMessage);
        // @ts-ignore
        [emptyResultsMessage,];
        var __VLS_57;
        for (const [option] of __VLS_vFor((__VLS_ctx.filteredOptions))) {
            let __VLS_60;
            /** @ts-ignore @type {typeof __VLS_components.ComboboxItem | typeof __VLS_components.ComboboxItem} */
            ComboboxItem;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
                key: (option.value),
                value: (option.value),
                ...{ class: "agds-combobox__option" },
            }));
            const __VLS_62 = __VLS_61({
                key: (option.value),
                value: (option.value),
                ...{ class: "agds-combobox__option" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            /** @type {__VLS_StyleScopedClasses['agds-combobox__option']} */ ;
            const { default: __VLS_65 } = __VLS_63.slots;
            var __VLS_66 = {
                option: (option),
            };
            (option.label);
            let __VLS_68;
            /** @ts-ignore @type {typeof __VLS_components.ComboboxItemIndicator | typeof __VLS_components.ComboboxItemIndicator} */
            ComboboxItemIndicator;
            // @ts-ignore
            const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
                ...{ class: "agds-combobox__option-check" },
            }));
            const __VLS_70 = __VLS_69({
                ...{ class: "agds-combobox__option-check" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            /** @type {__VLS_StyleScopedClasses['agds-combobox__option-check']} */ ;
            const { default: __VLS_73 } = __VLS_71.slots;
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
            var __VLS_71;
            // @ts-ignore
            [];
            var __VLS_63;
            // @ts-ignore
            [];
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
    var __VLS_20 = __VLS_19, __VLS_67 = __VLS_66;
    // @ts-ignore
    [];
    return {};
})()) => ({}));
export default {};
