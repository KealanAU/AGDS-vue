import { ref } from 'vue';
import AGDSComboboxAsync from './AGDSComboboxAsync.vue';
const __VLS_export = ((__VLS_props, __VLS_ctx, __VLS_exposed, __VLS_setup = (async () => {
    const props = withDefaults(defineProps(), {
        emptyResultsMessage: 'No results found',
        loadingLabel: 'Loading',
        debounce: 300,
    });
    const emit = defineEmits();
    const model = defineModel();
    const comboboxRef = ref(null);
    const __VLS_exposed = { focus: () => comboboxRef.value?.focus() };
    defineExpose(__VLS_exposed);
    let __VLS_modelEmit;
    const __VLS_defaults = {
        emptyResultsMessage: 'No results found',
        loadingLabel: 'Loading',
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
    const __VLS_0 = AGDSComboboxAsync || AGDSComboboxAsync;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        ref: "comboboxRef",
        ...(props),
        modelValue: (__VLS_ctx.model),
        clearable: (true),
        showDropdownTrigger: (false),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        ref: "comboboxRef",
        ...(props),
        modelValue: (__VLS_ctx.model),
        clearable: (true),
        showDropdownTrigger: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ focus: {} },
        { onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [model, emit,];
            } });
    const __VLS_7 = ({ blur: {} },
        { onBlur: (...[$event]) => {
                __VLS_ctx.emit('blur', $event);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_8 = {};
    const { default: __VLS_10 } = __VLS_3.slots;
    if (__VLS_ctx.$slots.option) {
        {
            const { option: __VLS_11 } = __VLS_3.slots;
            const [slotProps] = __VLS_vSlot(__VLS_11);
            var __VLS_12 = {
                ...(slotProps),
            };
            // @ts-ignore
            [$slots,];
        }
    }
    // @ts-ignore
    [];
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    var __VLS_9 = __VLS_8, __VLS_13 = __VLS_12;
    // @ts-ignore
    [];
    return {};
})()) => ({}));
export default {};
