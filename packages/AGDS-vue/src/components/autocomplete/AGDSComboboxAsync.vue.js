import { ref, shallowRef, computed, onUnmounted, getCurrentInstance } from 'vue';
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxPortal, ComboboxRoot, ComboboxViewport, } from 'reka-ui';
import AGDSField from '../field/AGDSField.vue';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_exposed, __VLS_setup = (async () => {
    const props = withDefaults(defineProps(), {
        invalid: false,
        required: false,
        disabled: false,
        block: false,
        loadingLabel: 'Loading',
        emptyResultsMessage: 'No results found',
        showDropdownTrigger: true,
        clearable: false,
        debounce: 300,
    });
    const emit = defineEmits();
    // Public model: Option | null
    const model = defineModel();
    // Reka UI model: the selected option's value string, or undefined.
    // The computed setter maps the string back to an Option object.
    const selectedValue = computed({
        get: () => model.value?.value,
        set: (val) => {
            if (val == null) {
                model.value = null;
                return;
            }
            const opt = options.value.find((o) => o.value === val);
            if (opt)
                model.value = opt;
        },
    });
    const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
    const inputId = computed(() => props.id ?? `agds-combobox-async-${uid}`);
    const containerRef = ref(null);
    const options = shallowRef([]);
    const isOpen = ref(false);
    const isFetching = ref(false);
    const networkError = ref(false);
    const hasQueried = ref(false);
    const statusMessage = ref('');
    let debounceTimer = null;
    const cache = {};
    const isLoading = computed(() => isFetching.value || !!props.loading);
    const inputText = ref('');
    const showClear = computed(() => props.clearable && (model.value != null || inputText.value.length > 0));
    // Only follow Reka UI's close signals (Escape, click outside, selection).
    // We control opening ourselves from fetch results so the dropdown never opens empty.
    function handleOpenChange(open) {
        if (!open)
            isOpen.value = false;
    }
    // displayValue maps the Reka UI selected value string back to a display label.
    // Checks current options first, falls back to the public model for cached selections.
    function getDisplayValue(val) {
        const v = val;
        if (!v)
            return '';
        const opt = options.value.find((o) => o.value === v);
        if (opt)
            return opt.label;
        return model.value?.value === v ? (model.value.label ?? '') : '';
    }
    async function doFetch(query) {
        const key = query.toLowerCase();
        if (cache[key]) {
            options.value = cache[key];
            networkError.value = false;
            isFetching.value = false;
            isOpen.value = true;
            statusMessage.value =
                cache[key].length === 0
                    ? props.emptyResultsMessage
                    : `${cache[key].length} result${cache[key].length === 1 ? '' : 's'} available`;
            return;
        }
        try {
            const results = await props.fetchOptions(query);
            cache[key] = results;
            options.value = results;
            networkError.value = false;
            statusMessage.value =
                results.length === 0
                    ? props.emptyResultsMessage
                    : `${results.length} result${results.length === 1 ? '' : 's'} available`;
        }
        catch {
            options.value = [];
            networkError.value = true;
            statusMessage.value = '';
        }
        finally {
            isFetching.value = false;
        }
    }
    function handleInput(event) {
        const query = event.target.value;
        inputText.value = query;
        // Clear the selection when the user edits away from the selected label
        if (model.value != null && query !== model.value.label) {
            model.value = null;
        }
        if (debounceTimer)
            clearTimeout(debounceTimer);
        if (!query.trim()) {
            options.value = [];
            isFetching.value = false;
            isOpen.value = false;
            hasQueried.value = false;
            networkError.value = false;
            statusMessage.value = '';
            return;
        }
        // Show loading state immediately while debouncing so the dropdown opens right away
        hasQueried.value = true;
        isFetching.value = true;
        isOpen.value = true;
        debounceTimer = setTimeout(() => doFetch(query), props.debounce);
    }
    function handleClear() {
        model.value = null;
        options.value = [];
        isOpen.value = false;
        hasQueried.value = false;
        isFetching.value = false;
        networkError.value = false;
        statusMessage.value = 'Selection cleared';
        inputText.value = '';
        getAnchorEl()?.querySelector('input')?.focus();
    }
    function getAnchorEl() {
        const ref = containerRef.value;
        return ref?.$el ?? ref;
    }
    function toggleDropdown() {
        if (isOpen.value) {
            isOpen.value = false;
        }
        else if (options.value.length > 0 || isFetching.value || networkError.value) {
            isOpen.value = true;
        }
        else {
            const inputEl = getAnchorEl()?.querySelector('input');
            if (inputEl?.value)
                doFetch(inputEl.value);
        }
    }
    onUnmounted(() => {
        if (debounceTimer)
            clearTimeout(debounceTimer);
    });
    const __VLS_exposed = { focus: () => getAnchorEl()?.querySelector('input')?.focus() };
    defineExpose(__VLS_exposed);
    let __VLS_modelEmit;
    const __VLS_defaults = {
        invalid: false,
        required: false,
        disabled: false,
        block: false,
        loadingLabel: 'Loading',
        emptyResultsMessage: 'No results found',
        showDropdownTrigger: true,
        clearable: false,
        debounce: 300,
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
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__option']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async__option']} */ ;
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
        maxWidth: (__VLS_ctx.block ? undefined : __VLS_ctx.maxWidth),
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
        maxWidth: (__VLS_ctx.block ? undefined : __VLS_ctx.maxWidth),
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
            ...{ 'onUpdate:open': {} },
            modelValue: (__VLS_ctx.selectedValue),
            open: (__VLS_ctx.isOpen),
            disabled: (__VLS_ctx.disabled),
            name: (__VLS_ctx.name),
            required: (__VLS_ctx.required),
            ignoreFilter: (true),
            openOnFocus: (false),
            openOnClick: (false),
            ...{ class: "agds-combobox-async" },
            ...{ class: ({ 'agds-combobox-async--block': __VLS_ctx.block }) },
        }));
        const __VLS_10 = __VLS_9({
            ...{ 'onUpdate:open': {} },
            modelValue: (__VLS_ctx.selectedValue),
            open: (__VLS_ctx.isOpen),
            disabled: (__VLS_ctx.disabled),
            name: (__VLS_ctx.name),
            required: (__VLS_ctx.required),
            ignoreFilter: (true),
            openOnFocus: (false),
            openOnClick: (false),
            ...{ class: "agds-combobox-async" },
            ...{ class: ({ 'agds-combobox-async--block': __VLS_ctx.block }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        let __VLS_13;
        const __VLS_14 = ({ 'update:open': {} },
            { 'onUpdate:open': (__VLS_ctx.handleOpenChange) });
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async--block']} */ ;
        const { default: __VLS_15 } = __VLS_11.slots;
        let __VLS_16;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxAnchor | typeof __VLS_components.ComboboxAnchor} */
        ComboboxAnchor;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
            ref: "containerRef",
            ...{ class: "agds-combobox-async__control" },
            ...{ class: ({ 'agds-combobox-async__control--invalid': __VLS_ctx.invalid }) },
        }));
        const __VLS_18 = __VLS_17({
            ref: "containerRef",
            ...{ class: "agds-combobox-async__control" },
            ...{ class: ({ 'agds-combobox-async__control--invalid': __VLS_ctx.invalid }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        var __VLS_21 = {};
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async__control']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async__control--invalid']} */ ;
        const { default: __VLS_23 } = __VLS_19.slots;
        let __VLS_24;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxInput} */
        ComboboxInput;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
            ...{ 'onInput': {} },
            ...{ 'onFocus': {} },
            ...{ 'onBlur': {} },
            id: (fieldId),
            displayValue: (__VLS_ctx.getDisplayValue),
            ...{ class: "agds-combobox-async__input" },
            placeholder: (__VLS_ctx.placeholder),
            'aria-required': (ariaRequired),
            'aria-invalid': (ariaInvalid),
            'aria-describedby': (ariaDescribedby || undefined),
            'aria-busy': (__VLS_ctx.isLoading || undefined),
            disabled: (!!props.loading),
        }));
        const __VLS_26 = __VLS_25({
            ...{ 'onInput': {} },
            ...{ 'onFocus': {} },
            ...{ 'onBlur': {} },
            id: (fieldId),
            displayValue: (__VLS_ctx.getDisplayValue),
            ...{ class: "agds-combobox-async__input" },
            placeholder: (__VLS_ctx.placeholder),
            'aria-required': (ariaRequired),
            'aria-invalid': (ariaInvalid),
            'aria-describedby': (ariaDescribedby || undefined),
            'aria-busy': (__VLS_ctx.isLoading || undefined),
            disabled: (!!props.loading),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_29;
        const __VLS_30 = ({ input: {} },
            { onInput: (__VLS_ctx.handleInput) });
        const __VLS_31 = ({ focus: {} },
            { onFocus: (...[$event]) => {
                    __VLS_ctx.emit('focus', $event);
                    // @ts-ignore
                    [label, inputId, labelId, hint, invalid, invalid, message, required, required, hideOptionalLabel, secondaryLabel, block, block, maxWidth, selectedValue, isOpen, disabled, name, handleOpenChange, getDisplayValue, placeholder, isLoading, handleInput, emit,];
                } });
        const __VLS_32 = ({ blur: {} },
            { onBlur: (...[$event]) => {
                    __VLS_ctx.emit('blur', $event);
                    // @ts-ignore
                    [emit,];
                } });
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async__input']} */ ;
        var __VLS_27;
        var __VLS_28;
        if (__VLS_ctx.isLoading) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                ...{ class: "agds-combobox-async__spinner" },
                'aria-hidden': "true",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__spinner']} */ ;
        }
        if (__VLS_ctx.showClear && !__VLS_ctx.isLoading) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onMousedown: (__VLS_ctx.handleClear) },
                type: "button",
                ...{ class: "agds-combobox-async__btn agds-combobox-async__clear" },
                'aria-label': "Clear selection",
                tabindex: "-1",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__clear']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                'aria-hidden': "true",
                width: "16",
                height: "16",
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
        if (__VLS_ctx.showClear && __VLS_ctx.showDropdownTrigger && !__VLS_ctx.isLoading) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                ...{ class: "agds-combobox-async__divider" },
                'aria-hidden': "true",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__divider']} */ ;
        }
        if (__VLS_ctx.showDropdownTrigger) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onMousedown: (__VLS_ctx.toggleDropdown) },
                type: "button",
                ...{ class: "agds-combobox-async__btn" },
                ...{ class: ({ 'agds-combobox-async__btn--open': __VLS_ctx.isOpen }) },
                'aria-label': (__VLS_ctx.isOpen ? 'Close options' : 'Open options'),
                tabindex: "-1",
                disabled: (__VLS_ctx.disabled),
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__btn--open']} */ ;
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
        }
        // @ts-ignore
        [isOpen, isOpen, disabled, isLoading, isLoading, isLoading, showClear, showClear, handleClear, showDropdownTrigger, showDropdownTrigger, toggleDropdown,];
        var __VLS_19;
        let __VLS_33;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxPortal | typeof __VLS_components.ComboboxPortal} */
        ComboboxPortal;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({}));
        const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
        const { default: __VLS_38 } = __VLS_36.slots;
        let __VLS_39;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxContent | typeof __VLS_components.ComboboxContent} */
        ComboboxContent;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
            ...{ class: "agds-combobox-async__content" },
            avoidCollisions: (false),
        }));
        const __VLS_41 = __VLS_40({
            ...{ class: "agds-combobox-async__content" },
            avoidCollisions: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async__content']} */ ;
        const { default: __VLS_44 } = __VLS_42.slots;
        let __VLS_45;
        /** @ts-ignore @type {typeof __VLS_components.ComboboxViewport | typeof __VLS_components.ComboboxViewport} */
        ComboboxViewport;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
            ...{ class: "agds-combobox-async__listbox" },
        }));
        const __VLS_47 = __VLS_46({
            ...{ class: "agds-combobox-async__listbox" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async__listbox']} */ ;
        const { default: __VLS_50 } = __VLS_48.slots;
        if (__VLS_ctx.isFetching) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ class: "agds-combobox-async__status" },
                role: "status",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__status']} */ ;
            (__VLS_ctx.loadingLabel);
        }
        else if (__VLS_ctx.networkError) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ class: "agds-combobox-async__status agds-combobox-async__status--error" },
                role: "alert",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__status']} */ ;
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async__status--error']} */ ;
        }
        else {
            if (__VLS_ctx.hasQueried && __VLS_ctx.options.length === 0) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    ...{ class: "agds-combobox-async__status" },
                    role: "status",
                });
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async__status']} */ ;
                (__VLS_ctx.emptyResultsMessage);
            }
            for (const [option] of __VLS_vFor((__VLS_ctx.options))) {
                let __VLS_51;
                /** @ts-ignore @type {typeof __VLS_components.ComboboxItem | typeof __VLS_components.ComboboxItem} */
                ComboboxItem;
                // @ts-ignore
                const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
                    key: (option.value),
                    value: (option.value),
                    ...{ class: "agds-combobox-async__option" },
                }));
                const __VLS_53 = __VLS_52({
                    key: (option.value),
                    value: (option.value),
                    ...{ class: "agds-combobox-async__option" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_52));
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async__option']} */ ;
                const { default: __VLS_56 } = __VLS_54.slots;
                var __VLS_57 = {
                    option: (option),
                };
                (option.label);
                let __VLS_59;
                /** @ts-ignore @type {typeof __VLS_components.ComboboxItemIndicator | typeof __VLS_components.ComboboxItemIndicator} */
                ComboboxItemIndicator;
                // @ts-ignore
                const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
                    ...{ class: "agds-combobox-async__option-check" },
                }));
                const __VLS_61 = __VLS_60({
                    ...{ class: "agds-combobox-async__option-check" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_60));
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async__option-check']} */ ;
                const { default: __VLS_64 } = __VLS_62.slots;
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
                [isFetching, loadingLabel, networkError, hasQueried, options, options, emptyResultsMessage,];
                var __VLS_62;
                // @ts-ignore
                [];
                var __VLS_54;
                // @ts-ignore
                [];
            }
        }
        // @ts-ignore
        [];
        var __VLS_48;
        // @ts-ignore
        [];
        var __VLS_42;
        // @ts-ignore
        [];
        var __VLS_36;
        // @ts-ignore
        [];
        var __VLS_11;
        var __VLS_12;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            'aria-live': "polite",
            'aria-atomic': "true",
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        (__VLS_ctx.statusMessage);
        // @ts-ignore
        [statusMessage,];
    }
    // @ts-ignore
    [];
    var __VLS_3;
    // @ts-ignore
    var __VLS_22 = __VLS_21, __VLS_58 = __VLS_57;
    // @ts-ignore
    [];
    return {};
})()) => ({}));
export default {};
