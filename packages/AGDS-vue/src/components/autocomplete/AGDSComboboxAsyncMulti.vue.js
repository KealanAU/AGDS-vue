import { ref, shallowRef, computed, watch, onUnmounted, getCurrentInstance } from 'vue';
import AgDSField from '../field/AGDSField.vue';
import { filterOptions } from './comboboxUtils';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_exposed, __VLS_setup = (async () => {
    const props = withDefaults(defineProps(), {
        invalid: false,
        required: false,
        disabled: false,
        block: true,
        loadingLabel: 'Loading',
        emptyResultsMessage: 'No results found',
        debounce: 300,
    });
    const emit = defineEmits();
    const model = defineModel({ default: () => [] });
    const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
    const inputId = computed(() => props.id ?? `agds-combobox-async-multi-${uid}`);
    const listboxId = computed(() => `${inputId.value}-listbox`);
    const inputRef = ref(null);
    const inputValue = ref('');
    const options = shallowRef([]);
    const isOpen = ref(false);
    const isFetching = ref(false);
    const highlightedIndex = ref(-1);
    const hasQueried = ref(false);
    const statusMessage = ref('');
    const srAnnouncement = ref('');
    let debounceTimer = null;
    const isLoading = computed(() => isFetching.value || !!props.loading);
    const activeOptionId = computed(() => highlightedIndex.value >= 0
        ? `${listboxId.value}-option-${highlightedIndex.value}`
        : undefined);
    // Screen reader announcements for selection changes (WCAG 4.1.3)
    let prevLen = 0;
    watch(model, (newVal, oldVal) => {
        const prev = oldVal ?? [];
        if (newVal.length > prev.length) {
            const added = newVal.find((n) => !prev.some((o) => o.value === n.value));
            srAnnouncement.value = `${added?.label ?? 'An item'} has been added.`;
        }
        else if (newVal.length === 0 && prevLen > 0) {
            srAnnouncement.value = 'All items have been removed.';
        }
        else if (newVal.length < prev.length) {
            const removed = prev.find((o) => !newVal.some((n) => n.value === o.value));
            srAnnouncement.value = `${removed?.label ?? 'An item'} has been removed.`;
        }
        prevLen = newVal.length;
    }, { deep: true });
    async function doFetch(query) {
        isFetching.value = true;
        hasQueried.value = true;
        try {
            const results = await props.fetchOptions(query);
            const filtered = filterOptions(results, query, model.value);
            options.value = filtered;
            isOpen.value = true;
            highlightedIndex.value = -1;
            statusMessage.value =
                filtered.length === 0
                    ? props.emptyResultsMessage
                    : `${filtered.length} result${filtered.length === 1 ? '' : 's'} available`;
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
        if (!model.value.some((o) => o.value === option.value)) {
            model.value = [...model.value, option];
        }
        inputValue.value = '';
        options.value = options.value.filter((o) => o.value !== option.value);
        isOpen.value = options.value.length > 0;
        highlightedIndex.value = -1;
        inputRef.value?.focus();
    }
    function removeItem(item) {
        model.value = model.value.filter((o) => o.value !== item.value);
    }
    function removeLastItem() {
        if (model.value.length > 0 && inputValue.value === '') {
            model.value = model.value.slice(0, -1);
        }
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
                break;
            case 'Tab':
                isOpen.value = false;
                break;
            case 'Backspace':
                removeLastItem();
                break;
        }
    }
    function handleFocus(event) {
        emit('focus', event);
    }
    function handleBlur(event) {
        // Delay so mousedown on options fires before we close the dropdown
        setTimeout(() => {
            isOpen.value = false;
            inputValue.value = '';
            emit('blur', event);
        }, 150);
    }
    onUnmounted(() => {
        if (debounceTimer)
            clearTimeout(debounceTimer);
    });
    const __VLS_exposed = { focus: () => inputRef.value?.focus() };
    defineExpose(__VLS_exposed);
    const __VLS_defaultModels = {
        'modelValue': () => [],
    };
    let __VLS_modelEmit;
    const __VLS_defaults = {
        invalid: false,
        required: false,
        disabled: false,
        block: true,
        loadingLabel: 'Loading',
        emptyResultsMessage: 'No results found',
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
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__control']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tag-remove']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tag-remove']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__input']} */ ;
    const __VLS_0 = AgDSField || AgDSField;
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
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-combobox-async-multi" },
            ...{ class: ({ 'agds-combobox-async-multi--block': __VLS_ctx.block }) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi--block']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-combobox-async-multi__control" },
            ...{ class: ({
                    'agds-combobox-async-multi__control--invalid': __VLS_ctx.invalid,
                    'agds-combobox-async-multi__control--disabled': __VLS_ctx.disabled,
                    'agds-combobox-async-multi__control--open': __VLS_ctx.isOpen,
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__control']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__control--invalid']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__control--disabled']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__control--open']} */ ;
        if (__VLS_ctx.model.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "agds-combobox-async-multi__tags" },
                'aria-label': "Selected items",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tags']} */ ;
            for (const [item] of __VLS_vFor((__VLS_ctx.model))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    key: (item.value),
                    ...{ class: "agds-combobox-async-multi__tag" },
                });
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tag']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "agds-combobox-async-multi__tag-label" },
                });
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tag-label']} */ ;
                (item.label);
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onMousedown: (...[$event]) => {
                            if (!(__VLS_ctx.model.length))
                                return;
                            __VLS_ctx.removeItem(item);
                            // @ts-ignore
                            [label, inputId, labelId, hint, invalid, invalid, message, required, hideOptionalLabel, secondaryLabel, block, block, maxWidth, disabled, isOpen, model, model, removeItem,];
                        } },
                    type: "button",
                    ...{ class: "agds-combobox-async-multi__tag-remove" },
                    'aria-label': (`Remove ${item.label}`),
                    tabindex: "-1",
                    disabled: (__VLS_ctx.disabled),
                });
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__tag-remove']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                    'aria-hidden': "true",
                    width: "10",
                    height: "10",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    'stroke-width': "3",
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
                // @ts-ignore
                [disabled,];
            }
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onInput: (__VLS_ctx.handleInput) },
            ...{ onKeydown: (__VLS_ctx.handleKeydown) },
            ...{ onFocus: (__VLS_ctx.handleFocus) },
            ...{ onBlur: (__VLS_ctx.handleBlur) },
            id: (fieldId),
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
            'aria-required': (ariaRequired),
            'aria-invalid': (ariaInvalid),
            'aria-describedby': (ariaDescribedby || undefined),
            placeholder: (__VLS_ctx.model.length === 0 ? __VLS_ctx.placeholder : undefined),
            disabled: (__VLS_ctx.disabled || __VLS_ctx.isLoading),
            'aria-busy': (__VLS_ctx.isLoading || undefined),
            'aria-disabled': (__VLS_ctx.disabled || undefined),
            ...{ class: "agds-combobox-async-multi__input" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__input']} */ ;
        if (__VLS_ctx.isLoading) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                ...{ class: "agds-combobox-async-multi__spinner" },
                'aria-hidden': "true",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__spinner']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            id: (__VLS_ctx.listboxId),
            role: "listbox",
            'aria-label': (__VLS_ctx.label),
            'aria-multiselectable': (true),
            ...{ class: "agds-combobox-async-multi__listbox" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isOpen) }, null, null);
        /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__listbox']} */ ;
        if (__VLS_ctx.isFetching) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ class: "agds-combobox-async-multi__loading" },
                role: "status",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__loading']} */ ;
            (__VLS_ctx.loadingLabel);
        }
        else if (__VLS_ctx.hasQueried && __VLS_ctx.options.length === 0) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                ...{ class: "agds-combobox-async-multi__empty" },
                role: "status",
            });
            /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__empty']} */ ;
            (__VLS_ctx.emptyResultsMessage);
        }
        else {
            for (const [option, index] of __VLS_vFor((__VLS_ctx.options))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    ...{ onMousedown: (...[$event]) => {
                            if (!!(__VLS_ctx.isFetching))
                                return;
                            if (!!(__VLS_ctx.hasQueried && __VLS_ctx.options.length === 0))
                                return;
                            __VLS_ctx.selectOption(option);
                            // @ts-ignore
                            [label, disabled, disabled, isOpen, isOpen, model, handleInput, handleKeydown, handleFocus, handleBlur, inputValue, listboxId, listboxId, activeOptionId, placeholder, isLoading, isLoading, isLoading, isFetching, loadingLabel, hasQueried, options, options, emptyResultsMessage, selectOption,];
                        } },
                    ...{ onMousemove: (...[$event]) => {
                            if (!!(__VLS_ctx.isFetching))
                                return;
                            if (!!(__VLS_ctx.hasQueried && __VLS_ctx.options.length === 0))
                                return;
                            __VLS_ctx.highlightedIndex = index;
                            // @ts-ignore
                            [highlightedIndex,];
                        } },
                    id: (`${__VLS_ctx.listboxId}-option-${index}`),
                    key: (option.value),
                    role: "option",
                    'aria-selected': (__VLS_ctx.model.some((o) => o.value === option.value)),
                    ...{ class: ([
                            'agds-combobox-async-multi__option',
                            { 'agds-combobox-async-multi__option--highlighted': __VLS_ctx.highlightedIndex === index },
                        ]) },
                });
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__option']} */ ;
                /** @type {__VLS_StyleScopedClasses['agds-combobox-async-multi__option--highlighted']} */ ;
                var __VLS_8 = {
                    option: (option),
                };
                (option.label);
                // @ts-ignore
                [model, listboxId, highlightedIndex,];
            }
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            'aria-live': "polite",
            'aria-atomic': "true",
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        (__VLS_ctx.statusMessage);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            'aria-live': "polite",
            'aria-atomic': "true",
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        (__VLS_ctx.srAnnouncement);
        // @ts-ignore
        [statusMessage, srAnnouncement,];
    }
    // @ts-ignore
    [];
    var __VLS_3;
    // @ts-ignore
    var __VLS_9 = __VLS_8;
    // @ts-ignore
    [];
    return {};
})()) => ({}));
export default {};
