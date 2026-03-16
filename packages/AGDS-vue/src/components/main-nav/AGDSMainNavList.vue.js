import AgDSDropdownMenu from '../dropdown-menu/AGDSDropdownMenu.vue';
import AgDSDropdownMenuButton from '../dropdown-menu/AGDSDropdownMenuButton.vue';
import AgDSDropdownMenuPanel from '../dropdown-menu/AGDSDropdownMenuPanel.vue';
import AgDSDropdownMenuItemLink from '../dropdown-menu/AGDSDropdownMenuItemLink.vue';
import { isLinkItem, isDropdownItem } from './mainNavTypes';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Main',
});
const __VLS_defaults = {
    ariaLabel: 'Main',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__list-nav--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__link--active']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': (props.ariaLabel),
    ...{ class: ([
            'agds-main-nav__list-nav',
            `agds-main-nav__list-nav--${props.type}`,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-main-nav__list-nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "agds-main-nav__list" },
    role: "list",
});
/** @type {__VLS_StyleScopedClasses['agds-main-nav__list']} */ ;
for (const [item, index] of __VLS_vFor((props.items))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (index),
        ...{ class: "agds-main-nav__list-item" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav__list-item']} */ ;
    if (__VLS_ctx.isLinkItem(item)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
            href: (item.href),
            'aria-current': (item.href === props.activePath ? 'page' : undefined),
            ...{ class: ([
                    'agds-main-nav__link',
                    { 'agds-main-nav__link--active': item.href === props.activePath },
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-main-nav__link']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-main-nav__link--active']} */ ;
        (item.label);
    }
    else if (__VLS_ctx.isDropdownItem(item)) {
        const __VLS_0 = AgDSDropdownMenu || AgDSDropdownMenu;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            popoverPlacement: "bottom-end",
            popoverOffset: (-8),
        }));
        const __VLS_2 = __VLS_1({
            popoverPlacement: "bottom-end",
            popoverOffset: (-8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_5 } = __VLS_3.slots;
        const __VLS_6 = AgDSDropdownMenuButton || AgDSDropdownMenuButton;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        const { default: __VLS_11 } = __VLS_9.slots;
        (item.label);
        // @ts-ignore
        [isLinkItem, isDropdownItem,];
        var __VLS_9;
        const __VLS_12 = AgDSDropdownMenuPanel || AgDSDropdownMenuPanel;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        const { default: __VLS_17 } = __VLS_15.slots;
        for (const [sub, si] of __VLS_vFor((item.items))) {
            (si);
            if (__VLS_ctx.isLinkItem(sub)) {
                const __VLS_18 = AgDSDropdownMenuItemLink || AgDSDropdownMenuItemLink;
                // @ts-ignore
                const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
                    href: (sub.href),
                }));
                const __VLS_20 = __VLS_19({
                    href: (sub.href),
                }, ...__VLS_functionalComponentArgsRest(__VLS_19));
                const { default: __VLS_23 } = __VLS_21.slots;
                (sub.label);
                // @ts-ignore
                [isLinkItem,];
                var __VLS_21;
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_15;
        // @ts-ignore
        [];
        var __VLS_3;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLinkItem(item)))
                        return;
                    if (!!(__VLS_ctx.isDropdownItem(item)))
                        return;
                    item.onClick?.($event);
                    // @ts-ignore
                    [];
                } },
            type: "button",
            ...{ class: "agds-main-nav__link" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-main-nav__link']} */ ;
        (item.label);
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
