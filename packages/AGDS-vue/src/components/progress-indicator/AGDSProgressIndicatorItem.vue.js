import { computed } from 'vue';
import { AGDSIcon } from '../icon';
const STATUS_MAP = {
    blocked: { label: 'Cannot start yet', icon: 'mdi:lock', iconColor: 'border' },
    doing: { label: 'In progress', icon: 'mdi:progress-clock', iconColor: 'border' },
    started: { label: 'In progress', icon: 'mdi:progress-clock', iconColor: 'border' },
    todo: { label: 'Not started', icon: 'mdi:checkbox-blank-circle-outline', iconColor: 'border' },
    done: { label: 'Completed', icon: 'mdi:check-circle', iconColor: 'success' },
    saved: { label: 'Saved', icon: 'mdi:check-circle-outline', iconColor: 'success' },
    error: { label: 'Error', icon: 'mdi:alert-circle', iconColor: 'error' },
};
const props = defineProps();
const statusInfo = computed(() => STATUS_MAP[props.item.status]);
const resolvedIconColor = computed(() => {
    const { iconColor } = statusInfo.value;
    if (props.item.isActive && iconColor === 'border')
        return 'var(--agds-color-action-primary)';
    if (iconColor === 'success')
        return 'var(--agds-color-success)';
    if (iconColor === 'error')
        return 'var(--agds-color-error)';
    return 'var(--agds-color-border)';
});
const tag = computed(() => props.item.href ? 'a' : 'button');
/** The active level-2 sub-item (if any). */
const activeSubItem = computed(() => props.item.isActive
    ? (props.item.items?.find(i => i.isActive) ?? null)
    : null);
/** Items with a sub-list suppress the bottom border on the main content. */
const hasSub = computed(() => !!(props.item.items?.length));
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--last']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line--sub']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--last']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--bg-body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--bg-body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--bg-bodyAlt']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--bg-bodyAlt']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item--last']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-list']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "agds-progress-indicator__item" },
    ...{ class: ([
            `agds-progress-indicator__item--bg-${__VLS_ctx.background}`,
            __VLS_ctx.item.isActive && 'agds-progress-indicator__item--active',
            __VLS_ctx.isFirst && 'agds-progress-indicator__item--first',
            __VLS_ctx.isLast && 'agds-progress-indicator__item--last',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__grid" },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__icon-col" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__icon-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__line agds-progress-indicator__line--top" },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line--top']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__ring" },
    ...{ class: ({ 'agds-progress-indicator__ring--active': __VLS_ctx.item.isActive }) },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__ring']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__ring--active']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.AGDSIcon} */
AGDSIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: (__VLS_ctx.statusInfo.icon),
    size: "md",
    color: (__VLS_ctx.resolvedIconColor),
    'aria-hidden': "true",
}));
const __VLS_2 = __VLS_1({
    name: (__VLS_ctx.statusInfo.icon),
    size: "md",
    color: (__VLS_ctx.resolvedIconColor),
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__line agds-progress-indicator__line--bottom" },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line--bottom']} */ ;
const __VLS_5 = (__VLS_ctx.tag);
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    ...{ class: "agds-progress-indicator__content" },
    ...{ class: ({ 'agds-progress-indicator__content--no-sub': !__VLS_ctx.hasSub }) },
    ...(__VLS_ctx.item.href
        ? { href: __VLS_ctx.item.href }
        : { type: 'button' }),
    'aria-current': (__VLS_ctx.item.isActive ? 'step' : undefined),
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    ...{ class: "agds-progress-indicator__content" },
    ...{ class: ({ 'agds-progress-indicator__content--no-sub': !__VLS_ctx.hasSub }) },
    ...(__VLS_ctx.item.href
        ? { href: __VLS_ctx.item.href }
        : { type: 'button' }),
    'aria-current': (__VLS_ctx.item.isActive ? 'step' : undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.item.href ? undefined : __VLS_ctx.item.onClick?.($event);
            // @ts-ignore
            [background, item, item, item, item, item, item, item, isFirst, isLast, statusInfo, resolvedIconColor, tag, hasSub,];
        } });
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__content--no-sub']} */ ;
const { default: __VLS_12 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__label" },
    ...{ class: ({ 'agds-progress-indicator__label--bold': __VLS_ctx.item.isActive }) },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__label--bold']} */ ;
(__VLS_ctx.item.label);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-progress-indicator__status-text" },
});
/** @type {__VLS_StyleScopedClasses['agds-progress-indicator__status-text']} */ ;
(__VLS_ctx.statusInfo.label);
// @ts-ignore
[item, item, statusInfo,];
var __VLS_8;
var __VLS_9;
if (__VLS_ctx.activeSubItem) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "agds-progress-indicator__line agds-progress-indicator__line--sub" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-progress-indicator__line--sub']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "agds-progress-indicator__sub-list" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-list']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "agds-progress-indicator__sub-item" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-item']} */ ;
    const __VLS_13 = (__VLS_ctx.activeSubItem.href ? 'a' : 'span');
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ class: "agds-progress-indicator__sub-link" },
        href: (__VLS_ctx.activeSubItem.href || undefined),
        'aria-current': "step",
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "agds-progress-indicator__sub-link" },
        href: (__VLS_ctx.activeSubItem.href || undefined),
        'aria-current': "step",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['agds-progress-indicator__sub-link']} */ ;
    const { default: __VLS_18 } = __VLS_16.slots;
    let __VLS_19;
    /** @ts-ignore @type {typeof __VLS_components.AGDSIcon} */
    AGDSIcon;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        name: "mdi:arrow-right-bottom",
        size: "sm",
        color: "var(--agds-color-action-primary)",
        'aria-hidden': "true",
    }));
    const __VLS_21 = __VLS_20({
        name: "mdi:arrow-right-bottom",
        size: "sm",
        color: "var(--agds-color-action-primary)",
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.activeSubItem.label);
    // @ts-ignore
    [activeSubItem, activeSubItem, activeSubItem, activeSubItem,];
    var __VLS_16;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
