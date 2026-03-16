import { ref, watch, nextTick } from 'vue';
import { isLinkItem, isDropdownItem } from './mainNavTypes';
const props = defineProps();
const emit = defineEmits();
const dialogEl = ref(null);
const closeButtonEl = ref(null);
// Focus the close button when the dialog opens; restore focus when it closes
watch(() => props.isOpen, async (open) => {
    if (open) {
        await nextTick();
        closeButtonEl.value?.focus();
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = '';
    }
});
function close() {
    emit('close');
}
function handleKeydown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        close();
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
/** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "agds-main-nav-dialog",
}));
const __VLS_8 = __VLS_7({
    name: "agds-main-nav-dialog",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (props.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.close) },
        ...{ class: "agds-main-nav-dialog__backdrop" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__backdrop']} */ ;
}
// @ts-ignore
[close,];
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    name: "agds-main-nav-dialog-panel",
}));
const __VLS_14 = __VLS_13({
    name: "agds-main-nav-dialog-panel",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
if (props.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onKeydown: (__VLS_ctx.handleKeydown) },
        ref: "dialogEl",
        id: (props.id),
        role: "dialog",
        'aria-modal': "true",
        'aria-label': "Main menu",
        ...{ class: "agds-main-nav-dialog" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-main-nav-dialog__header" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.close) },
        ref: "closeButtonEl",
        type: "button",
        ...{ class: "agds-main-nav-dialog__close" },
        'aria-label': "Close menu",
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        ...{ class: "agds-main-nav-dialog__close-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__close-icon']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        'aria-label': "Main",
        ...{ class: "agds-main-nav-dialog__nav" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__nav']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "agds-main-nav-dialog__list" },
        role: "list",
    });
    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__list']} */ ;
    for (const [item, index] of __VLS_vFor((props.items))) {
        (index);
        if (__VLS_ctx.isLinkItem(item)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
                ...{ onClick: (__VLS_ctx.close) },
                href: (item.href),
                'aria-current': (item.href === props.activePath ? 'page' : undefined),
                ...{ class: ([
                        'agds-main-nav-dialog__link',
                        { 'agds-main-nav-dialog__link--active': item.href === props.activePath },
                    ]) },
            });
            /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
            /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link--active']} */ ;
            (item.label);
        }
        else if (__VLS_ctx.isDropdownItem(item)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "agds-main-nav-dialog__group-label" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__group-label']} */ ;
            (item.label);
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "agds-main-nav-dialog__group-list" },
                role: "list",
            });
            /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__group-list']} */ ;
            for (const [sub, si] of __VLS_vFor((item.items))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    key: (si),
                });
                if (__VLS_ctx.isLinkItem(sub)) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
                        ...{ onClick: (__VLS_ctx.close) },
                        href: (sub.href),
                        'aria-current': (sub.href === props.activePath ? 'page' : undefined),
                        ...{ class: ([
                                'agds-main-nav-dialog__link',
                                'agds-main-nav-dialog__link--sub',
                                { 'agds-main-nav-dialog__link--active': sub.href === props.activePath },
                            ]) },
                    });
                    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
                    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link--sub']} */ ;
                    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link--active']} */ ;
                    (sub.label);
                }
                else {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                        ...{ onClick: (...[$event]) => {
                                if (!(props.isOpen))
                                    return;
                                if (!!(__VLS_ctx.isLinkItem(item)))
                                    return;
                                if (!(__VLS_ctx.isDropdownItem(item)))
                                    return;
                                if (!!(__VLS_ctx.isLinkItem(sub)))
                                    return;
                                sub.onClick?.($event);
                                __VLS_ctx.close();
                                // @ts-ignore
                                [close, close, close, close, handleKeydown, isLinkItem, isLinkItem, isDropdownItem,];
                            } },
                        type: "button",
                        ...{ class: "agds-main-nav-dialog__link agds-main-nav-dialog__link--sub" },
                    });
                    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
                    /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link--sub']} */ ;
                    (sub.label);
                }
                // @ts-ignore
                [];
            }
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(props.isOpen))
                            return;
                        if (!!(__VLS_ctx.isLinkItem(item)))
                            return;
                        if (!!(__VLS_ctx.isDropdownItem(item)))
                            return;
                        item.onClick?.($event);
                        __VLS_ctx.close();
                        // @ts-ignore
                        [close,];
                    } },
                type: "button",
                ...{ class: "agds-main-nav-dialog__link" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-main-nav-dialog__link']} */ ;
            (item.label);
        }
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
var __VLS_15;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
