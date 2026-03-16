import { hasSubLevelActiveItem } from './utils';
import AusGovIcon from '../icon/AGDSIcon.vue';
const props = withDefaults(defineProps(), { depth: 1 });
function isCurrentPage(item) {
    return item.href === props.activePath;
}
function isActiveAncestor(item) {
    return hasSubLevelActiveItem(item.items, props.activePath);
}
function isActive(item) {
    return isCurrentPage(item) || isActiveAncestor(item);
}
function showSubList(item) {
    if (!item.items?.length)
        return false;
    return (isCurrentPage(item) ||
        isActiveAncestor(item) ||
        props.subLevelVisible === 'always');
}
function hasSubIndicator(item) {
    return (item.items?.length ?? 0) > 0 && props.subLevelVisible === 'whenActive';
}
const __VLS_defaults = { depth: 1 };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__item--active-ancestor']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link--current']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "ausgov-side-nav__list" },
    ...{ class: ({ 'ausgov-side-nav__list--nested': __VLS_ctx.depth > 1 }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__list']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__list--nested']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.items))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (item.href),
        ...{ class: "ausgov-side-nav__item" },
        ...{ class: ({
                'ausgov-side-nav__item--active-ancestor': __VLS_ctx.isActive(item) && __VLS_ctx.depth === 1,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__item']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__item--active-ancestor']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (item.href),
        'aria-current': (__VLS_ctx.isCurrentPage(item) ? 'page' : undefined),
        'aria-label': (__VLS_ctx.hasSubIndicator(item)
            ? `${item.label}${__VLS_ctx.showSubList(item) ? ', has expanded sub links' : ', has sub links'}`
            : undefined),
        ...{ class: "ausgov-side-nav__link" },
        ...{ class: ({
                'ausgov-side-nav__link--current': __VLS_ctx.isCurrentPage(item),
                'ausgov-side-nav__link--sub': __VLS_ctx.depth > 1,
            }) },
        ...{ style: ({ paddingLeft: `${__VLS_ctx.depth}rem` }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link--current']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link--sub']} */ ;
    if (__VLS_ctx.depth > 2) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-side-nav__ancestor-mark" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__ancestor-mark']} */ ;
    }
    else if (__VLS_ctx.depth > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-side-nav__ancestor-mark" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__ancestor-mark']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-side-nav__link-label" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__link-label']} */ ;
    (item.label);
    if (__VLS_ctx.hasSubIndicator(item)) {
        const __VLS_0 = AusGovIcon;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            name: "mdi:chevron-right",
            size: (__VLS_ctx.depth > 1 ? 'sm' : 'md'),
            'aria-hidden': "true",
            ...{ class: "ausgov-side-nav__chevron" },
            ...{ class: ({ 'ausgov-side-nav__chevron--open': __VLS_ctx.showSubList(item) }) },
        }));
        const __VLS_2 = __VLS_1({
            name: "mdi:chevron-right",
            size: (__VLS_ctx.depth > 1 ? 'sm' : 'md'),
            'aria-hidden': "true",
            ...{ class: "ausgov-side-nav__chevron" },
            ...{ class: ({ 'ausgov-side-nav__chevron--open': __VLS_ctx.showSubList(item) }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__chevron']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-side-nav__chevron--open']} */ ;
    }
    if (item.items?.length && __VLS_ctx.showSubList(item)) {
        let __VLS_5;
        /** @ts-ignore @type {typeof __VLS_components.SideNavLinkList} */
        SideNavLinkList;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
            items: (item.items),
            activePath: (__VLS_ctx.activePath),
            subLevelVisible: (__VLS_ctx.subLevelVisible),
            depth: ((__VLS_ctx.depth ?? 1) + 1),
        }));
        const __VLS_7 = __VLS_6({
            items: (item.items),
            activePath: (__VLS_ctx.activePath),
            subLevelVisible: (__VLS_ctx.subLevelVisible),
            depth: ((__VLS_ctx.depth ?? 1) + 1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    // @ts-ignore
    [depth, depth, depth, depth, depth, depth, depth, depth, items, isActive, isCurrentPage, isCurrentPage, hasSubIndicator, hasSubIndicator, showSubList, showSubList, showSubList, activePath, subLevelVisible,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
