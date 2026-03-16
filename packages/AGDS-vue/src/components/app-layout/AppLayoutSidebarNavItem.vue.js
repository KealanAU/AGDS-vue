import { computed } from 'vue';
import { isNavLinkItem, isNavButtonItem, hasActiveDescendant, } from './appLayoutTypes';
const props = defineProps();
const emit = defineEmits();
const isLink = computed(() => isNavLinkItem(props.item));
const isButton = computed(() => isNavButtonItem(props.item));
const linkItem = computed(() => isNavLinkItem(props.item) ? props.item : null);
/** Item href exactly matches current page. */
const isCurrentPage = computed(() => isNavLinkItem(props.item) && props.item.href === props.activePath);
/** Item is an ancestor of the current page (has a matching sub-item). */
const isAncestor = computed(() => isNavLinkItem(props.item) && !!props.item.items?.length
    ? hasActiveDescendant(props.item.items, props.activePath)
    : false);
/** Whether the sub-level should be visible. */
const isOpen = computed(() => props.subLevelVisible === 'always' || isAncestor.value || isCurrentPage.value);
const hoverBg = computed(() => props.background === 'body'
    ? 'var(--ausgov-color-bg-subtle)'
    : 'var(--ausgov-color-bg-muted)');
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
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link--current']} */ ;
(__VLS_ctx.hoverBg);
// @ts-ignore
[hoverBg,];
if (__VLS_ctx.isLink) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "ausgov-alsnav-item" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isLink))
                    return;
                __VLS_ctx.emit('close');
                // @ts-ignore
                [isLink, emit,];
            } },
        href: (__VLS_ctx.linkItem.href),
        'aria-current': (__VLS_ctx.isCurrentPage ? 'page' : undefined),
        ...{ class: "ausgov-alsnav-item__link" },
        ...{ class: ({
                'ausgov-alsnav-item__link--current': __VLS_ctx.isCurrentPage,
                'ausgov-alsnav-item__link--ancestor': __VLS_ctx.isAncestor && !__VLS_ctx.isCurrentPage,
                'ausgov-alsnav-item__link--level2': __VLS_ctx.level === 2,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link--current']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link--ancestor']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__link--level2']} */ ;
    if (__VLS_ctx.linkItem.icon && __VLS_ctx.level === 1) {
        const __VLS_0 = (__VLS_ctx.linkItem.icon);
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            'aria-hidden': "true",
            ...{ class: "ausgov-alsnav-item__icon" },
        }));
        const __VLS_2 = __VLS_1({
            'aria-hidden': "true",
            ...{ class: "ausgov-alsnav-item__icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__icon']} */ ;
    }
    if (__VLS_ctx.level === 2) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            'aria-hidden': "true",
            ...{ class: "ausgov-alsnav-item__dash" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__dash']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-alsnav-item__label" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__label']} */ ;
    (__VLS_ctx.item.label);
    if (__VLS_ctx.linkItem.items?.length && __VLS_ctx.subLevelVisible !== 'always') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            'aria-hidden': "true",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            ...{ class: "ausgov-alsnav-item__chevron" },
            ...{ class: ({ 'ausgov-alsnav-item__chevron--open': __VLS_ctx.isAncestor || __VLS_ctx.isCurrentPage }) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__chevron']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__chevron--open']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
            points: "9 18 15 12 9 6",
        });
    }
    if (__VLS_ctx.linkItem.items?.length && __VLS_ctx.isOpen) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "ausgov-alsnav-item__sub" },
            role: "list",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__sub']} */ ;
        for (const [sub, si] of __VLS_vFor((__VLS_ctx.linkItem.items))) {
            let __VLS_5;
            /** @ts-ignore @type {typeof __VLS_components.AppLayoutSidebarNavItem} */
            AppLayoutSidebarNavItem;
            // @ts-ignore
            const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
                ...{ 'onClose': {} },
                key: (si),
                item: (sub),
                activePath: (__VLS_ctx.activePath),
                level: (__VLS_ctx.level + 1),
                subLevelVisible: (__VLS_ctx.subLevelVisible),
                background: (__VLS_ctx.background),
            }));
            const __VLS_7 = __VLS_6({
                ...{ 'onClose': {} },
                key: (si),
                item: (sub),
                activePath: (__VLS_ctx.activePath),
                level: (__VLS_ctx.level + 1),
                subLevelVisible: (__VLS_ctx.subLevelVisible),
                background: (__VLS_ctx.background),
            }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            let __VLS_10;
            const __VLS_11 = ({ close: {} },
                { onClose: (...[$event]) => {
                        if (!(__VLS_ctx.isLink))
                            return;
                        if (!(__VLS_ctx.linkItem.items?.length && __VLS_ctx.isOpen))
                            return;
                        __VLS_ctx.emit('close');
                        // @ts-ignore
                        [emit, linkItem, linkItem, linkItem, linkItem, linkItem, linkItem, isCurrentPage, isCurrentPage, isCurrentPage, isCurrentPage, isAncestor, isAncestor, level, level, level, level, item, subLevelVisible, subLevelVisible, isOpen, activePath, background,];
                    } });
            var __VLS_8;
            var __VLS_9;
            // @ts-ignore
            [];
        }
    }
}
else if (__VLS_ctx.isButton) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "ausgov-alsnav-item" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLink))
                    return;
                if (!(__VLS_ctx.isButton))
                    return;
                __VLS_ctx.item.onClick?.($event);
                __VLS_ctx.emit('close');
                // @ts-ignore
                [emit, item, isButton,];
            } },
        type: "button",
        ...{ class: "ausgov-alsnav-item__button" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__button']} */ ;
    if (__VLS_ctx.item.icon && __VLS_ctx.level === 1) {
        const __VLS_12 = (__VLS_ctx.item.icon);
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
            'aria-hidden': "true",
            ...{ class: "ausgov-alsnav-item__icon" },
        }));
        const __VLS_14 = __VLS_13({
            'aria-hidden': "true",
            ...{ class: "ausgov-alsnav-item__icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__icon']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-alsnav-item__label" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__label']} */ ;
    (__VLS_ctx.item.label);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "ausgov-alsnav-item" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-alsnav-item__text" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-alsnav-item__text']} */ ;
    (__VLS_ctx.item.label);
}
// @ts-ignore
[level, item, item, item, item,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
