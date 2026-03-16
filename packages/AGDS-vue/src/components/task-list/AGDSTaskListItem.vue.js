import { computed } from 'vue';
import AgDSIcon from '../icon/AGDSIcon.vue';
import AgDSVisuallyHidden from '../visually-hidden/AGDSVisuallyHidden.vue';
const props = withDefaults(defineProps(), {
    ordered: false,
    type: 'button',
    disabled: false,
});
const __VLS_emit = defineEmits();
const isLink = computed(() => !!props.href);
const STATUS_MAP = {
    notRequired: {
        label: 'No longer required',
        icon: 'mdi:minus-circle-outline',
        iconColor: 'var(--agds-color-border)',
    },
    blocked: {
        label: 'Cannot start yet',
        icon: 'mdi:lock-outline',
        iconColor: 'var(--agds-color-border)',
    },
    doing: {
        label: 'In progress',
        icon: 'mdi:clock-outline',
        iconColor: 'var(--agds-color-action-primary)',
    },
    todo: {
        label: 'Not started',
        icon: 'mdi:radiobox-blank',
        iconColor: 'var(--agds-color-action-primary)',
    },
    done: {
        label: 'Completed',
        icon: 'mdi:check-circle',
        iconColor: 'var(--agds-color-success)',
    },
    doneRecently: {
        label: 'Completed',
        icon: 'mdi:check-circle',
        iconColor: 'var(--agds-color-success)',
    },
};
const statusInfo = computed(() => STATUS_MAP[props.status]);
const __VLS_defaults = {
    ordered: false,
    type: 'button',
    disabled: false,
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
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item--doing']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__left']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__icon-desktop']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__status-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "agds-task-list-item" },
    ...{ class: (`agds-task-list-item--${__VLS_ctx.status}`) },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item']} */ ;
const __VLS_0 = (__VLS_ctx.isLink ? 'a' : 'button');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    href: (__VLS_ctx.isLink ? __VLS_ctx.href : undefined),
    type: (__VLS_ctx.isLink ? undefined : __VLS_ctx.type),
    disabled: (!__VLS_ctx.isLink && __VLS_ctx.disabled ? true : undefined),
    'aria-disabled': (__VLS_ctx.disabled ? true : undefined),
    ...{ class: "agds-task-list-item__trigger" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    href: (__VLS_ctx.isLink ? __VLS_ctx.href : undefined),
    type: (__VLS_ctx.isLink ? undefined : __VLS_ctx.type),
    disabled: (!__VLS_ctx.isLink && __VLS_ctx.disabled ? true : undefined),
    'aria-disabled': (__VLS_ctx.disabled ? true : undefined),
    ...{ class: "agds-task-list-item__trigger" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [status, isLink, isLink, isLink, isLink, href, type, disabled, disabled, $emit,];
        } });
const __VLS_7 = ({ focus: {} },
    { onFocus: (...[$event]) => {
            __VLS_ctx.$emit('focus', $event);
            // @ts-ignore
            [$emit,];
        } });
const __VLS_8 = ({ blur: {} },
    { onBlur: (...[$event]) => {
            __VLS_ctx.$emit('blur', $event);
            // @ts-ignore
            [$emit,];
        } });
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__trigger']} */ ;
const { default: __VLS_9 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__left" },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__icon-desktop" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__icon-desktop']} */ ;
const __VLS_10 = AgDSIcon;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    name: (__VLS_ctx.statusInfo.icon),
    size: "xl",
    color: (__VLS_ctx.statusInfo.iconColor),
}));
const __VLS_12 = __VLS_11({
    name: (__VLS_ctx.statusInfo.icon),
    size: "xl",
    color: (__VLS_ctx.statusInfo.iconColor),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__body" },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__label']} */ ;
if (__VLS_ctx.ordered) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "agds-task-list-item__counter" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-task-list-item__counter']} */ ;
}
var __VLS_15 = {};
const __VLS_17 = AgDSVisuallyHidden || AgDSVisuallyHidden;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
// @ts-ignore
[statusInfo, statusInfo, ordered,];
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__status" },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__status']} */ ;
const __VLS_23 = AgDSIcon;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    ...{ class: "agds-task-list-item__icon-mobile" },
    name: (__VLS_ctx.statusInfo.icon),
    size: "md",
    color: (__VLS_ctx.statusInfo.iconColor),
    'aria-hidden': "true",
}));
const __VLS_25 = __VLS_24({
    ...{ class: "agds-task-list-item__icon-mobile" },
    name: (__VLS_ctx.statusInfo.icon),
    size: "md",
    color: (__VLS_ctx.statusInfo.iconColor),
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__icon-mobile']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-task-list-item__status-label" },
});
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__status-label']} */ ;
(__VLS_ctx.statusInfo.label);
const __VLS_28 = AgDSVisuallyHidden || AgDSVisuallyHidden;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_33 } = __VLS_31.slots;
// @ts-ignore
[statusInfo, statusInfo, statusInfo,];
var __VLS_31;
if (__VLS_ctx.message) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-task-list-item__message" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-task-list-item__message']} */ ;
    (__VLS_ctx.message);
}
const __VLS_34 = AgDSIcon;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    name: "mdi:arrow-right",
    ...{ class: "agds-task-list-item__arrow" },
    color: ('var(--agds-color-action-primary)'),
    'aria-hidden': "true",
}));
const __VLS_36 = __VLS_35({
    name: "mdi:arrow-right",
    ...{ class: "agds-task-list-item__arrow" },
    color: ('var(--agds-color-action-primary)'),
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['agds-task-list-item__arrow']} */ ;
// @ts-ignore
[message, message,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_16 = __VLS_15;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
