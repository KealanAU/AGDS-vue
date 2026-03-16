import AgDSHeaderBrand from './AGDSHeaderBrand.vue';
const __VLS_props = withDefaults(defineProps(), {
    background: 'body',
    dividerPosition: 'after',
    href: '/',
    maxWidth: 'container',
    size: 'md',
});
const __VLS_defaults = {
    background: 'body',
    dividerPosition: 'after',
    href: '/',
    maxWidth: 'container',
    size: 'md',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-header__right-col']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-header__right-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "agds-header" },
    ...{ class: ([
            `agds-header--${__VLS_ctx.background}`,
            `agds-header--${__VLS_ctx.size}`,
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-header__inner" },
    ...{ class: ([`agds-header__inner--${__VLS_ctx.maxWidth}`]) },
});
/** @type {__VLS_StyleScopedClasses['agds-header__inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-header__brand-col" },
    ...{ class: ({ 'agds-header__brand-col--with-right': !!__VLS_ctx.$slots.rightContent }) },
});
/** @type {__VLS_StyleScopedClasses['agds-header__brand-col']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-header__brand-col--with-right']} */ ;
const __VLS_0 = AgDSHeaderBrand || AgDSHeaderBrand;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    badgeLabel: (__VLS_ctx.badgeLabel),
    dividerPosition: (__VLS_ctx.dividerPosition),
    hasRightContent: (!!__VLS_ctx.$slots.rightContent),
    heading: (__VLS_ctx.heading),
    href: (__VLS_ctx.href),
    secondHref: (__VLS_ctx.secondHref),
    size: (__VLS_ctx.size),
    subline: (__VLS_ctx.subline),
}));
const __VLS_2 = __VLS_1({
    badgeLabel: (__VLS_ctx.badgeLabel),
    dividerPosition: (__VLS_ctx.dividerPosition),
    hasRightContent: (!!__VLS_ctx.$slots.rightContent),
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
        [background, size, size, maxWidth, $slots, $slots, $slots, badgeLabel, dividerPosition, heading, href, secondHref, subline,];
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
if (__VLS_ctx.$slots.rightContent) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-header__right-col" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-header__right-col']} */ ;
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
