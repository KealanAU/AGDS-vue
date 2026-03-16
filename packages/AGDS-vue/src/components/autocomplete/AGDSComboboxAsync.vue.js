import { ref, computed, watch, onUnmounted, getCurrentInstance } from 'vue';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_exposed, __VLS_setup = (async () => {
    const props = withDefaults(defineProps(), {
        loadingLabel: 'Loading',
        emptyResultsMessage: 'No results found',
        showDropdownTrigger: true,
        clearable: false,
        debounce: 300,
    });
    const emit = defineEmits();
    const model = defineModel();
    const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
    const inputId = computed(() => props.id ?? `ausgov-combobox-${uid}`);
    const listboxId = computed(() => `${inputId.value}-listbox`);
    const inputRef = ref(null);
    const inputValue = ref(model.value?.label ?? '');
    const options = ref([]);
    const isOpen = ref(false);
    const isFetching = ref(false);
    const highlightedIndex = ref(-1);
    const hasQueried = ref(false);
    const statusMessage = ref('');
    let debounceTimer = null;
    const isLoading = computed(() => isFetching.value || !!props.loading);
    const activeOptionId = computed(() => highlightedIndex.value >= 0
        ? `${listboxId.value}-option-${highlightedIndex.value}`
        : undefined);
    const showClear = computed(() => props.clearable && (!!inputValue.value || model.value != null));
    // Sync input text when model is updated externally
    watch(() => model.value, (val) => {
        inputValue.value = val?.label ?? '';
    });
    function optionId(index) {
        return `${listboxId.value}-option-${index}`;
    }
    async function doFetch(query) {
        isFetching.value = true;
        hasQueried.value = true;
        try {
            const results = await props.fetchOptions(query);
            options.value = results;
            isOpen.value = true;
            highlightedIndex.value = -1;
            statusMessage.value =
                results.length === 0
                    ? props.emptyResultsMessage
                    : `${results.length} result${results.length === 1 ? '' : 's'} available`;
        }
        catch {
            options.value = [];
            statusMessage.value = '';
        }
        finally {
            isFetching.value = false;
        }
    }
    function handleInput() {
        const query = inputValue.value;
        // Clear the selection when the user edits away from the selected label
        if (model.value != null && query !== model.value.label) {
            model.value = null;
        }
        if (debounceTimer)
            clearTimeout(debounceTimer);
        if (!query.trim()) {
            options.value = [];
            isOpen.value = false;
            hasQueried.value = false;
            statusMessage.value = '';
            return;
        }
        debounceTimer = setTimeout(() => doFetch(query), props.debounce);
    }
    function selectOption(option) {
        model.value = option;
        inputValue.value = option.label;
        isOpen.value = false;
        highlightedIndex.value = -1;
        statusMessage.value = `${option.label} selected`;
        inputRef.value?.focus();
    }
    function handleKeydown(event) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!isOpen.value && options.value.length > 0)
                    isOpen.value = true;
                if (options.value.length > 0) {
                    highlightedIndex.value = (highlightedIndex.value + 1) % options.value.length;
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!isOpen.value && options.value.length > 0)
                    isOpen.value = true;
                if (options.value.length > 0) {
                    highlightedIndex.value =
                        highlightedIndex.value <= 0
                            ? options.value.length - 1
                            : highlightedIndex.value - 1;
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (isOpen.value && highlightedIndex.value >= 0) {
                    selectOption(options.value[highlightedIndex.value]);
                }
                else if (isOpen.value && options.value.length > 0) {
                    selectOption(options.value[0]);
                }
                break;
            case 'Escape':
                if (isOpen.value) {
                    isOpen.value = false;
                    highlightedIndex.value = -1;
                }
                else if (props.clearable) {
                    handleClear();
                }
                break;
            case 'Tab':
                isOpen.value = false;
                break;
        }
    }
    function handleClear() {
        model.value = null;
        inputValue.value = '';
        options.value = [];
        isOpen.value = false;
        hasQueried.value = false;
        statusMessage.value = 'Selection cleared';
        inputRef.value?.focus();
    }
    function toggleDropdown() {
        if (isOpen.value) {
            isOpen.value = false;
        }
        else if (options.value.length > 0) {
            isOpen.value = true;
        }
        else if (inputValue.value) {
            doFetch(inputValue.value);
        }
    }
    function handleFocus(event) {
        emit('focus', event);
    }
    function handleBlur(event) {
        // Delay so mousedown on options fires before we close the dropdown
        setTimeout(() => {
            isOpen.value = false;
            // Restore input to match the current selection (or clear it)
            if (model.value != null) {
                inputValue.value = model.value.label;
            }
            emit('blur', event);
        }, 150);
    }
    onUnmounted(() => {
        if (debounceTimer)
            clearTimeout(debounceTimer);
    });
    const __VLS_exposed = { focus: () => inputRef.value?.focus() };
    defineExpose(__VLS_exposed);
    let __VLS_modelEmit;
    const __VLS_defaults = {
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
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__clear']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__trigger']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__trigger']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-combobox" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.inputId),
        ...{ class: "ausgov-combobox__label" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__label']} */ ;
    var __VLS_0 = {};
    (__VLS_ctx.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-combobox__control" },
        ...{ class: ({
                'ausgov-combobox__control--disabled': __VLS_ctx.disabled,
                'ausgov-combobox__control--open': __VLS_ctx.isOpen,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__control--disabled']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__control--open']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        ...{ onKeydown: (__VLS_ctx.handleKeydown) },
        ...{ onFocus: (__VLS_ctx.handleFocus) },
        ...{ onBlur: (__VLS_ctx.handleBlur) },
        id: (__VLS_ctx.inputId),
        ref: "inputRef",
        value: (__VLS_ctx.inputValue),
        role: "combobox",
        type: "text",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        'aria-expanded': (__VLS_ctx.isOpen),
        'aria-autocomplete': "list",
        'aria-controls': (__VLS_ctx.listboxId),
        'aria-activedescendant': (__VLS_ctx.activeOptionId),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled || __VLS_ctx.isLoading),
        'aria-busy': (__VLS_ctx.isLoading || undefined),
        'aria-disabled': (__VLS_ctx.disabled || undefined),
        ...{ class: "ausgov-combobox__input" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__input']} */ ;
    if (__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "ausgov-combobox__spinner" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__spinner']} */ ;
    }
    if (__VLS_ctx.showClear && !__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onMousedown: (__VLS_ctx.handleClear) },
            type: "button",
            ...{ class: "ausgov-combobox__clear" },
            'aria-label': "Clear selection",
            tabindex: "-1",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__clear']} */ ;
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
    if (__VLS_ctx.showDropdownTrigger) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onMousedown: (__VLS_ctx.toggleDropdown) },
            type: "button",
            ...{ class: "ausgov-combobox__trigger" },
            ...{ class: ({ 'ausgov-combobox__trigger--open': __VLS_ctx.isOpen }) },
            'aria-label': (__VLS_ctx.isOpen ? 'Close options' : 'Open options'),
            tabindex: "-1",
            disabled: (__VLS_ctx.disabled),
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__trigger']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__trigger--open']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        id: (__VLS_ctx.listboxId),
        role: "listbox",
        'aria-label': (__VLS_ctx.label),
        ...{ class: "ausgov-combobox__listbox" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isOpen) }, null, null);
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__listbox']} */ ;
    if (__VLS_ctx.hasQueried && !__VLS_ctx.isFetching && __VLS_ctx.options.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "ausgov-combobox__empty" },
            role: "status",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__empty']} */ ;
        (__VLS_ctx.emptyResultsMessage);
    }
    for (const [option, index] of __VLS_vFor((__VLS_ctx.options))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onMousedown: (...[$event]) => {
                    __VLS_ctx.selectOption(option);
                    // @ts-ignore
                    [inputId, inputId, label, label, disabled, disabled, disabled, disabled, isOpen, isOpen, isOpen, isOpen, isOpen, handleInput, handleKeydown, handleFocus, handleBlur, inputValue, listboxId, listboxId, activeOptionId, placeholder, isLoading, isLoading, isLoading, isLoading, showClear, handleClear, showDropdownTrigger, toggleDropdown, hasQueried, isFetching, options, options, emptyResultsMessage, selectOption,];
                } },
            ...{ onMousemove: (...[$event]) => {
                    __VLS_ctx.highlightedIndex = index;
                    // @ts-ignore
                    [highlightedIndex,];
                } },
            id: (__VLS_ctx.optionId(index)),
            key: (option.value),
            role: "option",
            'aria-selected': (__VLS_ctx.model?.value === option.value),
            ...{ class: ([
                    'ausgov-combobox__option',
                    {
                        'ausgov-combobox__option--highlighted': __VLS_ctx.highlightedIndex === index,
                        'ausgov-combobox__option--selected': __VLS_ctx.model?.value === option.value,
                    },
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__option']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__option--highlighted']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-combobox__option--selected']} */ ;
        var __VLS_2 = {
            option: (option),
        };
        (option.label);
        // @ts-ignore
        [highlightedIndex, optionId, model, model,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        'aria-live': "polite",
        'aria-atomic': "true",
        ...{ class: "sr-only ausgov-combobox__status" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-combobox__status']} */ ;
    (__VLS_ctx.statusMessage);
    // @ts-ignore
    var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
    // @ts-ignore
    [statusMessage,];
    return {};
})()) => ({}));
export default {};
