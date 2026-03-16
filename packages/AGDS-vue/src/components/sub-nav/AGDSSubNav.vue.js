import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Content',
    background: 'body',
});
function findBestMatch(links, activePath) {
    if (!activePath)
        return '';
    for (const link of links) {
        if (link.href === activePath)
            return link.href;
    }
    let best = '';
    for (const link of links) {
        if (activePath.startsWith(link.href) && link.href.length > best.length) {
            best = link.href;
        }
    }
    return best;
}
const bestMatch = computed(() => findBestMatch(props.links, props.activePath));
const __VLS_defaults = {
    ariaLabel: 'Content',
    background: 'body',
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
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__list']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__link--active']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__bottom-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "agds-sub-nav" },
    ...{ class: (`agds-sub-nav--bg-${props.background}`) },
    'aria-label': (props.ariaLabel),
    id: (props.id || undefined),
});
/** @type {__VLS_StyleScopedClasses['agds-sub-nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "agds-sub-nav__list" },
});
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__list']} */ ;
for (const [link] of __VLS_vFor((props.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (link.href),
        ...{ class: "agds-sub-nav__item" },
        ...{ class: ({ 'agds-sub-nav__item--active': link.href === __VLS_ctx.bestMatch }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-sub-nav__item']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-sub-nav__item--active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (link.href),
        'aria-current': (link.href === __VLS_ctx.bestMatch ? 'page' : undefined),
        ...{ class: "agds-sub-nav__link" },
        ...{ class: ({ 'agds-sub-nav__link--active': link.href === __VLS_ctx.bestMatch }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-sub-nav__link']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-sub-nav__link--active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (link.label);
    if (link.endElement) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-sub-nav__end-element" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-sub-nav__end-element']} */ ;
        (link.endElement);
    }
    // @ts-ignore
    [bestMatch, bestMatch, bestMatch,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "agds-sub-nav__bottom-bar" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-sub-nav__bottom-bar']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
