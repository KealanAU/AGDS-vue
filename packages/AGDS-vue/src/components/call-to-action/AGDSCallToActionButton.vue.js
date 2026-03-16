import { ref } from 'vue';
import AgDSIcon from '../icon/AGDSIcon.vue';
const props = withDefaults(defineProps(), {
    disabled: false,
    loading: false,
    loadingLabel: 'Loading',
    type: 'button',
    focusRingFor: 'keyboard',
});
const emit = defineEmits();
const buttonRef = ref(null);
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
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta__icon']} */ ;
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
            'agds-cta',
            {
                'agds-cta--focus-all': props.focusRingFor === 'all',
                'agds-cta--disabled': props.disabled,
                'agds-cta--loading': props.loading,
            },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta--focus-all']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta--loading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-cta__label" },
    ...{ class: ({ 'agds-cta__label--hidden': props.loading }) },
});
/** @type {__VLS_StyleScopedClasses['agds-cta__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta__label--hidden']} */ ;
var __VLS_0 = {};
const __VLS_2 = AgDSIcon;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
    name: "mdi:chevron-right",
    size: "sm",
    ...{ class: "agds-cta__icon" },
    ...{ class: ({ 'agds-cta__icon--hidden': props.loading }) },
    'aria-hidden': "true",
}));
const __VLS_4 = __VLS_3({
    name: "mdi:chevron-right",
    size: "sm",
    ...{ class: "agds-cta__icon" },
    ...{ class: ({ 'agds-cta__icon--hidden': props.loading }) },
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {__VLS_StyleScopedClasses['agds-cta__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-cta__icon--hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    'aria-live': "assertive",
    ...{ class: "agds-cta__live-region" },
});
/** @type {__VLS_StyleScopedClasses['agds-cta__live-region']} */ ;
if (props.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-cta__loading-indicator" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-cta__loading-indicator']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "agds-cta__spinner" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-cta__spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (props.loadingLabel);
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
