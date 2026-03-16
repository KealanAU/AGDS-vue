import { computed, getCurrentInstance, ref } from 'vue';
import AgDSFlex from '../flex/AGDSFlex.vue';
const props = withDefaults(defineProps(), {
    label: 'Search',
    labelVisible: false,
});
const emit = defineEmits();
// ── ID ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const inputId = computed(() => props.id ?? `search-${uid}`);
// ── Value — supports both controlled (v-model) and uncontrolled modes ─────────
const inputRef = ref(null);
const internalValue = ref(props.defaultValue ?? '');
const value = computed(() => props.modelValue !== undefined ? props.modelValue : internalValue.value);
const showClearButton = computed(() => Boolean(value.value));
function handleInput(event) {
    const val = event.target.value;
    internalValue.value = val;
    emit('update:modelValue', val);
}
function clearInput() {
    internalValue.value = '';
    emit('update:modelValue', '');
    inputRef.value?.focus();
}
const __VLS_exposed = { focus: () => inputRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    label: 'Search',
    labelVisible: false,
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
/** @type {__VLS_StyleScopedClasses['agds-search-box__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-box__clear']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-box__clear']} */ ;
const __VLS_0 = AgDSFlex || AgDSFlex;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    flexDirection: "column",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    flexDirection: "column",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.inputId),
    ...{ class: "agds-search-box__label" },
    ...{ class: ({ 'sr-only': !props.labelVisible }) },
});
/** @type {__VLS_StyleScopedClasses['agds-search-box__label']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
(props.label);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-search-box__input-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['agds-search-box__input-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.emit('blur', $event);
            // @ts-ignore
            [inputId, handleInput, emit,];
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.emit('focus', $event);
            // @ts-ignore
            [emit,];
        } },
    ref: "inputRef",
    id: (__VLS_ctx.inputId),
    type: "search",
    autocomplete: "off",
    ...{ class: "agds-search-box__input" },
    ...{ class: ({ 'agds-search-box__input--has-clear': __VLS_ctx.showClearButton }) },
    name: (props.name),
    placeholder: (props.placeholder),
    value: (__VLS_ctx.value),
});
/** @type {__VLS_StyleScopedClasses['agds-search-box__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-search-box__input--has-clear']} */ ;
if (__VLS_ctx.showClearButton) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clearInput) },
        type: "button",
        ...{ class: "agds-search-box__clear" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-search-box__clear']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "16",
        height: "16",
        'aria-hidden': "true",
        focusable: "false",
        fill: "currentColor",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
// @ts-ignore
[inputId, showClearButton, showClearButton, value, clearInput,];
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
