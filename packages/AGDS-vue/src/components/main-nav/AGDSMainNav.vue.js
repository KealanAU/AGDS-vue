import { ref, computed } from 'vue';
import AgDSMainNavList from './AGDSMainNavList.vue';
import AgDSMainNavDialog from './AGDSMainNavDialog.vue';
import { findBestMatch, } from './mainNavTypes';
const props = withDefaults(defineProps(), {
    background: 'body',
    borderColor: 'brand',
    focusMode: false,
    maxWidth: 'container',
});
// Mobile menu open state
const isMobileMenuOpen = ref(false);
const hamburgerRef = ref(null);
function openMobileMenu() {
    isMobileMenuOpen.value = true;
}
function closeMobileMenu() {
    isMobileMenuOpen.value = false;
    // Return focus to the hamburger button after dialog closes
    hamburgerRef.value?.focus();
}
// Best-matching active path across primary + secondary items
const bestMatch = computed(() => findBestMatch([...(props.items ?? []), ...(props.secondaryItems ?? [])], props.activePath));
const maxWidthValue = computed(() => props.maxWidth === 'containerLg' ? '90rem' : '75rem');
const borderColorValue = computed(() => {
    const map = {
        brand: 'var(--agds-color-border-brand)',
        border: 'var(--agds-color-border)',
        'border-strong': 'var(--agds-color-border-strong)',
    };
    return map[props.borderColor];
});
const __VLS_defaults = {
    background: 'body',
    borderColor: 'brand',
    focusMode: false,
    maxWidth: 'container',
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
/** @type {__VLS_StyleScopedClasses['agds-main-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav__hamburger']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    id: (props.id),
    ...{ class: ([
            'agds-main-nav',
            `agds-main-nav--${props.background}`,
        ]) },
    tabindex: "-1",
});
/** @type {__VLS_StyleScopedClasses['agds-main-nav']} */ ;
if (!props.focusMode) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        'aria-hidden': (__VLS_ctx.isMobileMenuOpen ? true : undefined),
        ...{ class: "agds-main-nav__bar" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav__bar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-main-nav__inner" },
        ...{ style: ({ maxWidth: __VLS_ctx.maxWidthValue }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav__inner']} */ ;
    if (props.items?.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.openMobileMenu) },
            ref: "hamburgerRef",
            type: "button",
            ...{ class: "agds-main-nav__hamburger" },
            'aria-expanded': (__VLS_ctx.isMobileMenuOpen),
            'aria-controls': "agds-main-nav-dialog",
            'aria-label': "Open menu",
        });
        /** @type {__VLS_StyleScopedClasses['agds-main-nav__hamburger']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            'aria-hidden': "true",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            ...{ class: "agds-main-nav__hamburger-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-main-nav__hamburger-icon']} */ ;
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
    if (props.items?.length) {
        const __VLS_0 = AgDSMainNavList;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            items: (props.items),
            activePath: (__VLS_ctx.bestMatch),
            type: "primary",
            'aria-label': "Main",
        }));
        const __VLS_2 = __VLS_1({
            items: (props.items),
            activePath: (__VLS_ctx.bestMatch),
            type: "primary",
            'aria-label': "Main",
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
    if (props.secondaryItems?.length) {
        const __VLS_5 = AgDSMainNavList;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
            items: (props.secondaryItems),
            activePath: (__VLS_ctx.bestMatch),
            type: "secondary",
            'aria-label': "Supplementary",
        }));
        const __VLS_7 = __VLS_6({
            items: (props.secondaryItems),
            activePath: (__VLS_ctx.bestMatch),
            type: "secondary",
            'aria-label': "Supplementary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "agds-main-nav__border" },
    ...{ style: ({ borderBottomColor: __VLS_ctx.borderColorValue }) },
});
/** @type {__VLS_StyleScopedClasses['agds-main-nav__border']} */ ;
const __VLS_10 = AgDSMainNavDialog;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    ...{ 'onClose': {} },
    id: "agds-main-nav-dialog",
    items: (props.items),
    activePath: (__VLS_ctx.bestMatch),
    isOpen: (__VLS_ctx.isMobileMenuOpen),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClose': {} },
    id: "agds-main-nav-dialog",
    items: (props.items),
    activePath: (__VLS_ctx.bestMatch),
    isOpen: (__VLS_ctx.isMobileMenuOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_15;
const __VLS_16 = ({ close: {} },
    { onClose: (__VLS_ctx.closeMobileMenu) });
var __VLS_13;
var __VLS_14;
// @ts-ignore
[isMobileMenuOpen, isMobileMenuOpen, isMobileMenuOpen, maxWidthValue, openMobileMenu, bestMatch, bestMatch, bestMatch, borderColorValue, closeMobileMenu,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
