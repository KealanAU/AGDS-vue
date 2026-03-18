import { useAppLayoutContext } from './appLayoutContext';
import AGDSHeaderBrand from '../header/AGDSHeaderBrand.vue';
const props = withDefaults(defineProps(), {
    href: '/',
    background: 'body',
    dividerPosition: 'after',
    maxWidth: 'container',
    size: 'md',
});
const { focusMode, isMobileMenuOpen, openMobileMenu } = useAppLayoutContext();
const __VLS_defaults = {
    href: '/',
    background: 'body',
    dividerPosition: 'after',
    maxWidth: 'container',
    size: 'md',
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
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header__hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header__hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header__hamburger']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "agds-app-layout-header" },
    ...{ class: ([`agds-app-layout-header--${__VLS_ctx.background}`]) },
});
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-app-layout-header__inner" },
    ...{ class: ([`agds-app-layout-header__inner--${__VLS_ctx.maxWidth}`]) },
});
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header__inner']} */ ;
if (!__VLS_ctx.focusMode) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.openMobileMenu) },
        type: "button",
        ...{ class: "agds-app-layout-header__hamburger" },
        'aria-expanded': (__VLS_ctx.isMobileMenuOpen),
        'aria-haspopup': "dialog",
        'aria-label': "Open menu",
        'aria-controls': "agds-app-layout-sidebar-dialog",
    });
    /** @type {__VLS_StyleScopedClasses['agds-app-layout-header__hamburger']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        ...{ class: "agds-app-layout-header__hamburger-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-app-layout-header__hamburger-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "6",
        x2: "21",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "12",
        x2: "21",
        y2: "12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "18",
        x2: "21",
        y2: "18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-app-layout-header__brand" },
});
/** @type {__VLS_StyleScopedClasses['agds-app-layout-header__brand']} */ ;
const __VLS_0 = AGDSHeaderBrand || AGDSHeaderBrand;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    badgeLabel: (__VLS_ctx.badgeLabel),
    dividerPosition: (__VLS_ctx.dividerPosition),
    hasRightContent: (!!__VLS_ctx.$slots.account),
    heading: (__VLS_ctx.heading),
    href: (__VLS_ctx.href),
    secondHref: (__VLS_ctx.secondHref),
    size: (__VLS_ctx.size),
    subline: (__VLS_ctx.subline),
}));
const __VLS_2 = __VLS_1({
    badgeLabel: (__VLS_ctx.badgeLabel),
    dividerPosition: (__VLS_ctx.dividerPosition),
    hasRightContent: (!!__VLS_ctx.$slots.account),
    heading: (__VLS_ctx.heading),
    href: (__VLS_ctx.href),
    secondHref: (__VLS_ctx.secondHref),
    size: (__VLS_ctx.size),
    subline: (__VLS_ctx.subline),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.$slots.logo) {
    {
        const { logo: __VLS_6 } = __VLS_3.slots;
        var __VLS_7 = {};
        // @ts-ignore
        [background, maxWidth, focusMode, openMobileMenu, isMobileMenuOpen, badgeLabel, dividerPosition, $slots, $slots, heading, href, secondHref, size, subline,];
    }
}
if (__VLS_ctx.$slots.secondLogo) {
    {
        const { secondLogo: __VLS_9 } = __VLS_3.slots;
        var __VLS_10 = {};
        // @ts-ignore
        [$slots,];
    }
}
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.$slots.account) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-app-layout-header__account" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-app-layout-header__account']} */ ;
    var __VLS_12 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_11 = __VLS_10, __VLS_13 = __VLS_12;
// @ts-ignore
[$slots,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
