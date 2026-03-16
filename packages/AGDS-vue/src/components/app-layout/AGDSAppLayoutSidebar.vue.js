import { ref, watch, nextTick, computed } from 'vue';
import { useAppLayoutContext } from './appLayoutContext';
import AgDSAppLayoutSidebarNav from './AGDSAppLayoutSidebarNav.vue';
import { findBestMatch, } from './appLayoutTypes';
const props = withDefaults(defineProps(), {
    background: 'bodyAlt',
    subLevelVisible: 'whenActive',
});
const { focusMode, isMobileMenuOpen, closeMobileMenu } = useAppLayoutContext();
/** Best-matching active path across all groups. */
const bestMatch = computed(() => findBestMatch(props.items, props.activePath));
const dialogEl = ref(null);
const closeButtonEl = ref(null);
// Focus close button on open; restore scroll lock on close
watch(isMobileMenuOpen, async (open) => {
    if (open) {
        await nextTick();
        closeButtonEl.value?.focus();
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = '';
    }
});
function handleKeydown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileMenu();
        return;
    }
    // Basic focus trap — keep Tab inside the dialog
    if (event.key === 'Tab') {
        const focusable = dialogEl.value?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
        if (!focusable?.length)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}
const __VLS_defaults = {
    background: 'bodyAlt',
    subLevelVisible: 'whenActive',
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
/** @type {__VLS_StyleScopedClasses['agds-alsdialog__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-alsdialog__close']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "agds-app-layout-sidebar" },
    ...{ class: ([
            `agds-app-layout-sidebar--${__VLS_ctx.background}`,
            { 'agds-app-layout-sidebar--focus-mode': __VLS_ctx.focusMode },
        ]) },
    'aria-label': "Navigation",
});
/** @type {__VLS_StyleScopedClasses['agds-app-layout-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-app-layout-sidebar--focus-mode']} */ ;
const __VLS_0 = AgDSAppLayoutSidebarNav;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    items: (__VLS_ctx.items),
    activePath: (__VLS_ctx.bestMatch),
    subLevelVisible: (__VLS_ctx.subLevelVisible),
    background: (__VLS_ctx.background),
}));
const __VLS_2 = __VLS_1({
    items: (__VLS_ctx.items),
    activePath: (__VLS_ctx.bestMatch),
    subLevelVisible: (__VLS_ctx.subLevelVisible),
    background: (__VLS_ctx.background),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
/** @ts-ignore @type {typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    to: "body",
}));
const __VLS_7 = __VLS_6({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    name: "agds-alsdialog-backdrop",
}));
const __VLS_13 = __VLS_12({
    name: "agds-alsdialog-backdrop",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
if (__VLS_ctx.isMobileMenuOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeMobileMenu) },
        ...{ class: "agds-alsdialog__backdrop" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-alsdialog__backdrop']} */ ;
}
// @ts-ignore
[background, background, focusMode, items, bestMatch, subLevelVisible, isMobileMenuOpen, closeMobileMenu,];
var __VLS_14;
let __VLS_17;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    name: "agds-alsdialog-panel",
}));
const __VLS_19 = __VLS_18({
    name: "agds-alsdialog-panel",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
if (__VLS_ctx.isMobileMenuOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onKeydown: (__VLS_ctx.handleKeydown) },
        id: "agds-app-layout-sidebar-dialog",
        ref: "dialogEl",
        role: "dialog",
        'aria-modal': "true",
        'aria-label': "Menu",
        ...{ class: "agds-alsdialog" },
        ...{ class: ([`agds-alsdialog--${__VLS_ctx.background}`]) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-alsdialog']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-alsdialog__header" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-alsdialog__header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeMobileMenu) },
        ref: "closeButtonEl",
        type: "button",
        ...{ class: "agds-alsdialog__close" },
        'aria-label': "Close menu",
    });
    /** @type {__VLS_StyleScopedClasses['agds-alsdialog__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        ...{ class: "agds-alsdialog__close-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-alsdialog__close-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    const __VLS_23 = AgDSAppLayoutSidebarNav;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        ...{ 'onClose': {} },
        items: (__VLS_ctx.items),
        activePath: (__VLS_ctx.bestMatch),
        subLevelVisible: (__VLS_ctx.subLevelVisible),
        background: (__VLS_ctx.background),
    }));
    const __VLS_25 = __VLS_24({
        ...{ 'onClose': {} },
        items: (__VLS_ctx.items),
        activePath: (__VLS_ctx.bestMatch),
        subLevelVisible: (__VLS_ctx.subLevelVisible),
        background: (__VLS_ctx.background),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    let __VLS_28;
    const __VLS_29 = ({ close: {} },
        { onClose: (__VLS_ctx.closeMobileMenu) });
    var __VLS_26;
    var __VLS_27;
}
// @ts-ignore
[background, background, items, bestMatch, subLevelVisible, isMobileMenuOpen, closeMobileMenu, closeMobileMenu, handleKeydown,];
var __VLS_20;
// @ts-ignore
[];
var __VLS_8;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
