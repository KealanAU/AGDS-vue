const __VLS_props = withDefaults(defineProps(), {
    dividerPosition: 'after',
    hasRightContent: false,
    href: '/',
    size: 'md',
});
const __VLS_defaults = {
    dividerPosition: 'after',
    hasRightContent: false,
    href: '/',
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
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand--single']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand--single']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand--single']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap--sm']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap--md']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--single']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--between']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--after']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading--sm']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading--md']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__subline--md']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand--dual']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logos']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link--sm']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link--md']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link--second']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--single']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--between']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--after']} */ ;
if (__VLS_ctx.$slots.logo && __VLS_ctx.$slots.secondLogo) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand ausgov-header-brand--dual" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand--dual']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand__logos" },
        ...{ class: ({
                'ausgov-header-brand__logos--gap-right': __VLS_ctx.hasRightContent && __VLS_ctx.dividerPosition === 'after',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logos']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logos--gap-right']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_ctx.href),
        ...{ class: "ausgov-header-brand__logo-link" },
        ...{ class: ([`ausgov-header-brand__logo-link--${__VLS_ctx.size}`]) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
    var __VLS_0 = {};
    if (__VLS_ctx.dividerPosition === 'between') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "ausgov-header-brand__divider ausgov-header-brand__divider--between" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--between']} */ ;
    }
    const __VLS_2 = (__VLS_ctx.secondHref ? 'a' : 'span');
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
        ...(__VLS_ctx.secondHref ? { href: __VLS_ctx.secondHref } : {}),
        ...{ class: "ausgov-header-brand__logo-link ausgov-header-brand__logo-link--second" },
        ...{ class: ([`ausgov-header-brand__logo-link--${__VLS_ctx.size}`]) },
    }));
    const __VLS_4 = __VLS_3({
        ...(__VLS_ctx.secondHref ? { href: __VLS_ctx.secondHref } : {}),
        ...{ class: "ausgov-header-brand__logo-link ausgov-header-brand__logo-link--second" },
        ...{ class: ([`ausgov-header-brand__logo-link--${__VLS_ctx.size}`]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-link--second']} */ ;
    const { default: __VLS_7 } = __VLS_5.slots;
    var __VLS_8 = {};
    // @ts-ignore
    [$slots, $slots, hasRightContent, dividerPosition, dividerPosition, href, size, size, secondHref, secondHref, secondHref,];
    var __VLS_5;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand__heading-row" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading-row']} */ ;
    if (__VLS_ctx.dividerPosition === 'after') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "ausgov-header-brand__divider ausgov-header-brand__divider--after" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--after']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_ctx.href),
        ...{ class: "ausgov-header-brand__heading-link" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading-link']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand__title-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__title-wrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-header-brand__heading" },
        ...{ class: ([`ausgov-header-brand__heading--${__VLS_ctx.size}`]) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading']} */ ;
    (__VLS_ctx.heading);
    if (__VLS_ctx.badgeLabel) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-header-brand__badge" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__badge']} */ ;
        (__VLS_ctx.badgeLabel);
    }
    if (__VLS_ctx.subline) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-header-brand__subline" },
            ...{ class: ([`ausgov-header-brand__subline--${__VLS_ctx.size}`]) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__subline']} */ ;
        (__VLS_ctx.subline);
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_ctx.href),
        ...{ class: "ausgov-header-brand ausgov-header-brand--single" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand--single']} */ ;
    if (__VLS_ctx.$slots.logo) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ausgov-header-brand__logo-wrap" },
            ...{ class: ([`ausgov-header-brand__logo-wrap--${__VLS_ctx.size}`]) },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__logo-wrap']} */ ;
        var __VLS_10 = {};
    }
    if (__VLS_ctx.$slots.logo) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "ausgov-header-brand__divider ausgov-header-brand__divider--single" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__divider--single']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand__text" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-header-brand__title-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__title-wrap']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-header-brand__heading" },
        ...{ class: ([`ausgov-header-brand__heading--${__VLS_ctx.size}`]) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__heading']} */ ;
    (__VLS_ctx.heading);
    if (__VLS_ctx.badgeLabel) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-header-brand__badge" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__badge']} */ ;
        (__VLS_ctx.badgeLabel);
    }
    if (__VLS_ctx.subline) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-header-brand__subline" },
            ...{ class: ([`ausgov-header-brand__subline--${__VLS_ctx.size}`]) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-header-brand__subline']} */ ;
        (__VLS_ctx.subline);
    }
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_9 = __VLS_8, __VLS_11 = __VLS_10;
// @ts-ignore
[$slots, $slots, dividerPosition, href, href, size, size, size, size, size, heading, heading, badgeLabel, badgeLabel, badgeLabel, badgeLabel, subline, subline, subline, subline,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
