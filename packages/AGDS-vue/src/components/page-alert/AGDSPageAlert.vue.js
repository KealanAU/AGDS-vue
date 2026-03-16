import { computed, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue';
const props = withDefaults(defineProps(), {
    role: 'region',
});
const __VLS_exposed = { focus: () => alertRef.value?.focus() };
defineExpose(__VLS_exposed);
// ── IDs ────────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid;
const baseId = computed(() => props.id ?? `page-alert-${uid}`);
const toneId = computed(() => `${baseId.value}-tone`);
const titleId = computed(() => `${baseId.value}-title`);
const childrenId = computed(() => `${baseId.value}-body`);
const slots = useSlots();
const hasTitle = computed(() => !!props.title || !!slots.title);
const ariaLabelledBy = computed(() => {
    const parts = [toneId.value];
    if (hasTitle.value)
        parts.push(titleId.value);
    if (slots.default)
        parts.push(childrenId.value);
    return parts.join(' ');
});
// ── Programmatic focus ─────────────────────────────────────────────────────────
const alertRef = ref(null);
const resolvedTabIndex = computed(() => {
    if (props.tabIndex !== undefined)
        return props.tabIndex;
    if (props.focusOnMount || props.focusOnUpdate !== undefined)
        return -1;
    return undefined;
});
onMounted(() => {
    if (props.focusOnMount)
        alertRef.value?.focus();
});
watch(() => props.focusOnUpdate, () => { alertRef.value?.focus(); }, { deep: true });
// ── Tone config ────────────────────────────────────────────────────────────────
const toneMap = {
    info: {
        fg: 'var(--agds-color-info)',
        bg: 'var(--agds-color-info-muted)',
        iconLabel: 'Information',
        iconPath: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
    },
    success: {
        fg: 'var(--agds-color-success)',
        bg: 'var(--agds-color-success-muted)',
        iconLabel: 'Success',
        iconPath: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
    },
    warning: {
        fg: 'var(--agds-color-warning)',
        bg: 'var(--agds-color-warning-muted)',
        iconLabel: 'Warning',
        iconPath: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    },
    error: {
        fg: 'var(--agds-color-error)',
        bg: 'var(--agds-color-error-muted)',
        iconLabel: 'Error',
        iconPath: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    },
};
const toneConfig = computed(() => toneMap[props.tone]);
const toneStyle = computed(() => ({
    '--pa-fg': toneConfig.value.fg,
    '--pa-bg': toneConfig.value.bg,
}));
// ── Close handler ──────────────────────────────────────────────────────────────
const closeHandler = computed(() => props.onClose ?? props.onDismiss ?? null);
const __VLS_defaults = {
    role: 'region',
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
/** @type {__VLS_StyleScopedClasses['agds-page-alert']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__body--with-close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__close-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "alertRef",
    id: (props.id),
    ...{ class: (['agds-page-alert', `agds-page-alert--${props.tone}`]) },
    ...{ style: (__VLS_ctx.toneStyle) },
    role: (props.role),
    'aria-labelledby': (__VLS_ctx.ariaLabelledBy),
    tabindex: (__VLS_ctx.resolvedTabIndex),
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-page-alert__strip" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert__strip']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    focusable: "false",
    'aria-hidden': "true",
    ...{ class: "agds-page-alert__icon" },
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert__icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'fill-rule': "evenodd",
    'clip-rule': "evenodd",
    d: (__VLS_ctx.toneConfig.iconPath),
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-page-alert__body" },
    ...{ class: ({ 'agds-page-alert__body--with-close': !!__VLS_ctx.closeHandler }) },
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert__body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-page-alert__body--with-close']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-page-alert__inner" },
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert__inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    id: (__VLS_ctx.toneId),
    ...{ class: "agds-page-alert__sr-tone" },
});
/** @type {__VLS_StyleScopedClasses['agds-page-alert__sr-tone']} */ ;
(__VLS_ctx.toneConfig.iconLabel);
if (__VLS_ctx.hasTitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: (__VLS_ctx.titleId),
        ...{ class: "agds-page-alert__title-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__title-wrap']} */ ;
    var __VLS_0 = {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "agds-page-alert__title" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__title']} */ ;
    (props.title);
}
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: (__VLS_ctx.childrenId),
        ...{ class: "agds-page-alert__content" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__content']} */ ;
    var __VLS_2 = {};
}
if (__VLS_ctx.closeHandler) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.closeHandler))
                    return;
                __VLS_ctx.closeHandler();
                // @ts-ignore
                [toneStyle, ariaLabelledBy, resolvedTabIndex, toneConfig, toneConfig, closeHandler, closeHandler, closeHandler, toneId, hasTitle, titleId, $slots, childrenId,];
            } },
        type: "button",
        'aria-label': "Close",
        ...{ class: "agds-page-alert__close" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-page-alert__close-label" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__close-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        focusable: "false",
        'aria-hidden': "true",
        ...{ class: "agds-page-alert__close-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-page-alert__close-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M18 6 6 18M6 6l12 12",
    });
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
