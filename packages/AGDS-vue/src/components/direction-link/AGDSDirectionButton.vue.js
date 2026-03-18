import { ref } from 'vue';
import AGDSIcon from '../icon/AGDSIcon.vue';
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
    buttonRef.value?.focus();
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
}
const ICON_MAP = {
    up: 'mdi:arrow-up',
    right: 'mdi:arrow-right',
    down: 'mdi:arrow-down',
    left: 'mdi:arrow-left',
};
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
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
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
            'agds-direction-link',
            {
                'agds-direction-link--focus-all': props.focusRingFor === 'all',
                'agds-direction-link--disabled': props.disabled,
                'agds-direction-link--loading': props.loading,
            },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-direction-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link--focus-all']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link--loading']} */ ;
if (props.direction === 'left') {
    const __VLS_0 = AGDSIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        name: (__VLS_ctx.ICON_MAP[props.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }));
    const __VLS_2 = __VLS_1({
        name: (__VLS_ctx.ICON_MAP[props.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-direction-link__label" },
    ...{ class: ({ 'agds-direction-link__label--hidden': props.loading }) },
});
/** @type {__VLS_StyleScopedClasses['agds-direction-link__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-direction-link__label--hidden']} */ ;
var __VLS_5 = {};
if (props.direction !== 'left') {
    const __VLS_7 = AGDSIcon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        name: (__VLS_ctx.ICON_MAP[props.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        ...{ class: ({ 'agds-direction-link__icon--hidden': props.loading }) },
        'aria-hidden': "true",
    }));
    const __VLS_9 = __VLS_8({
        name: (__VLS_ctx.ICON_MAP[props.direction]),
        size: "sm",
        ...{ class: "agds-direction-link__icon" },
        ...{ class: ({ 'agds-direction-link__icon--hidden': props.loading }) },
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__icon--hidden']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    'aria-live': "assertive",
    ...{ class: "agds-direction-link__live-region" },
});
/** @type {__VLS_StyleScopedClasses['agds-direction-link__live-region']} */ ;
if (props.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-direction-link__loading-indicator" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__loading-indicator']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "agds-direction-link__spinner" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-direction-link__spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (props.loadingLabel);
}
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[ICON_MAP, ICON_MAP,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
