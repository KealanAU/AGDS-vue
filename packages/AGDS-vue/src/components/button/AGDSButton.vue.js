import { ref } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    loading: false,
    loadingLabel: 'Loading',
    type: 'button',
    focusRingFor: 'keyboard',
});
const emit = defineEmits();
const buttonRef = ref(null);
// Allow parents to programmatically focus the button (e.g. after routing)
const __VLS_exposed = { focus: () => buttonRef.value?.focus() };
defineExpose(__VLS_exposed);
function handleClick(event) {
    // Safari does not focus <button> elements on click — do it manually so
    // focus-visible styles and screen reader virtual cursor stay correct.
    buttonRef.value?.focus();
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
}
const __VLS_defaults = {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    loading: false,
    loadingLabel: 'Loading',
    type: 'button',
    focusRingFor: 'keyboard',
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
/** @type {__VLS_StyleScopedClasses['ausgov-button--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--tertiary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--tertiary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--text']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.emit('focus', $event);
            // @ts-ignore
            [handleClick, emit,];
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.emit('blur', $event);
            // @ts-ignore
            [emit,];
        } },
    ...{ onKeydown: (...[$event]) => {
            __VLS_ctx.emit('keydown', $event);
            // @ts-ignore
            [emit,];
        } },
    ref: "buttonRef",
    type: (props.type),
    disabled: (props.disabled || props.loading),
    'aria-busy': (props.loading ? true : undefined),
    'aria-disabled': ((props.disabled || props.loading) ? true : undefined),
    ...{ class: ([
            'ausgov-button',
            `ausgov-button--${props.variant}`,
            `ausgov-button--${props.size}`,
            {
                'ausgov-button--block': props.block,
                'ausgov-button--loading': props.loading,
                'ausgov-button--disabled': props.disabled,
                'ausgov-button--focus-all': props.focusRingFor === 'all',
            },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--block']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--loading']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button--focus-all']} */ ;
if (__VLS_ctx.$slots.iconBefore) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-button__icon" },
        'aria-hidden': "true",
        ...{ class: ({ 'ausgov-button__icon--hidden': props.loading }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon--hidden']} */ ;
    var __VLS_0 = {};
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-button__label" },
    ...{ class: ({ 'ausgov-button__label--hidden': props.loading }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-button__label']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-button__label--hidden']} */ ;
var __VLS_2 = {};
if (__VLS_ctx.$slots.iconAfter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-button__icon" },
        'aria-hidden': "true",
        ...{ class: ({ 'ausgov-button__icon--hidden': props.loading }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-button__icon--hidden']} */ ;
    var __VLS_4 = {};
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    'aria-live': "assertive",
    ...{ class: "ausgov-button__live-region" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-button__live-region']} */ ;
if (props.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-button__loading-indicator" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__loading-indicator']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "ausgov-button__spinner" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-button__spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (props.loadingLabel);
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
// @ts-ignore
[$slots, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
