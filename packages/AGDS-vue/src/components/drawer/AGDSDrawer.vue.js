import { ref, watch, nextTick, onUnmounted } from 'vue';
const props = withDefaults(defineProps(), {
    width: 'md',
    mutedOverlay: false,
    elementToFocusOnClose: null,
});
const emit = defineEmits();
// ── Unique ID for aria-labelledby ──────────────────────────────────────────
let _idCounter = 0;
const titleId = `ausgov-drawer-title-${++_idCounter}`;
// ── Refs ───────────────────────────────────────────────────────────────────
const drawerEl = ref(null);
const titleEl = ref(null);
/** The element that had focus before the drawer opened — restored on close. */
let _priorFocus = null;
// ── Open / close ───────────────────────────────────────────────────────────
function close() {
    emit('update:modelValue', false);
}
watch(() => props.modelValue, async (open) => {
    if (typeof document === 'undefined')
        return;
    if (open) {
        _priorFocus = document.activeElement;
        document.body.style.overflow = 'hidden';
        await nextTick();
        titleEl.value?.focus();
    }
    else {
        document.body.style.overflow = '';
        await nextTick();
        const target = props.elementToFocusOnClose ?? _priorFocus;
        target?.focus();
    }
}, { immediate: true });
onUnmounted(() => {
    // Guard against unmounting while open (e.g. page navigation)
    if (props.modelValue)
        document.body.style.overflow = '';
});
// ── Keyboard handling (Escape + focus trap) ────────────────────────────────
function handleKeydown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close();
        return;
    }
    if (event.key === 'Tab') {
        const focusable = Array.from(drawerEl.value?.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), ' +
            'select:not([disabled]), textarea:not([disabled]), [tabindex="0"]') ?? []);
        if (!focusable.length)
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
    width: 'md',
    mutedOverlay: false,
    elementToFocusOnClose: null,
};
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
/** @type {__VLS_StyleScopedClasses['ausgov-drawer__title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer__close']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer__close']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer__body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer-overlay-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer-overlay-leave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer-panel-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-drawer-panel-leave-active']} */ ;
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
    name: "ausgov-drawer-overlay",
}));
const __VLS_8 = __VLS_7({
    name: "ausgov-drawer-overlay",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.modelValue) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.close) },
        ...{ class: "ausgov-drawer__overlay" },
        ...{ class: ({ 'ausgov-drawer__overlay--muted': __VLS_ctx.mutedOverlay }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__overlay']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__overlay--muted']} */ ;
}
// @ts-ignore
[modelValue, close, mutedOverlay,];
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    name: "ausgov-drawer-panel",
}));
const __VLS_14 = __VLS_13({
    name: "ausgov-drawer-panel",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
if (__VLS_ctx.modelValue) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onKeydown: (__VLS_ctx.handleKeydown) },
        ref: "drawerEl",
        role: "dialog",
        'aria-modal': "true",
        'aria-labelledby': (__VLS_ctx.titleId),
        ...{ class: "ausgov-drawer" },
        ...{ class: (`ausgov-drawer--${__VLS_ctx.width}`) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-drawer__header" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ref: "titleEl",
        id: (__VLS_ctx.titleId),
        ...{ class: "ausgov-drawer__title" },
        tabindex: "-1",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__title']} */ ;
    (__VLS_ctx.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.close) },
        type: "button",
        ...{ class: "ausgov-drawer__close" },
        'aria-label': "Close",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        ...{ class: "ausgov-drawer__close-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__close-icon']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "ausgov-drawer__body" },
        'aria-label': (`${__VLS_ctx.title} content`),
        tabindex: "0",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-drawer__body']} */ ;
    var __VLS_18 = {};
    if (__VLS_ctx.$slots.actions) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ausgov-drawer__footer" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-drawer__footer']} */ ;
        var __VLS_20 = {};
    }
}
// @ts-ignore
[modelValue, close, handleKeydown, titleId, titleId, width, title, title, $slots,];
var __VLS_15;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_19 = __VLS_18, __VLS_21 = __VLS_20;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
