import { computed, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue';
import { getTone, sectionAlertToneMap } from './sectionAlertUtils';
const props = withDefaults(defineProps(), {
    role: 'region',
});
const __VLS_exposed = { focus: () => alertRef.value?.focus() };
defineExpose(__VLS_exposed);
// ── IDs ───────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid;
const baseId = computed(() => props.id ?? `section-alert-${uid}`);
const toneId = computed(() => `${baseId.value}-icon`);
const titleId = computed(() => `${baseId.value}-title`);
const childrenId = computed(() => `${baseId.value}-body`);
const slots = useSlots();
const ariaLabelledBy = computed(() => {
    const parts = [toneId.value, titleId.value];
    if (slots.default)
        parts.push(childrenId.value);
    return parts.join(' ');
});
// ── Programmatic focus ────────────────────────────────────────────────────────
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
// ── Resolved tone ─────────────────────────────────────────────────────────────
const resolvedTone = computed(() => getTone(props.tone));
const toneConfig = computed(() => sectionAlertToneMap[resolvedTone.value]);
const toneStyle = computed(() => ({
    '--sa-bg': toneConfig.value.bg,
    '--sa-border-color': toneConfig.value.borderColor,
    '--sa-icon-color': toneConfig.value.iconColor,
}));
// ── Close handler ─────────────────────────────────────────────────────────────
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
/** @type {__VLS_StyleScopedClasses['agds-section-alert']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert__title']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert__content']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert__close-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "alertRef",
    id: (props.id),
    ...{ class: ([
            'agds-section-alert',
            `agds-section-alert--${__VLS_ctx.resolvedTone}`,
            { 'agds-section-alert--enclosed': __VLS_ctx.toneConfig.enclosedBorder },
        ]) },
    ...{ style: (__VLS_ctx.toneStyle) },
    role: (props.role),
    'aria-labelledby': (__VLS_ctx.ariaLabelledBy),
    tabindex: (__VLS_ctx.resolvedTabIndex),
});
/** @type {__VLS_StyleScopedClasses['agds-section-alert']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-section-alert--enclosed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-section-alert__icon-wrap" },
});
/** @type {__VLS_StyleScopedClasses['agds-section-alert__icon-wrap']} */ ;
if (__VLS_ctx.toneConfig.iconVariant === 'filled') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
        ...{ class: "agds-section-alert__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        'clip-rule': "evenodd",
        d: (__VLS_ctx.toneConfig.iconPath),
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        focusable: "false",
        'aria-hidden': "true",
        ...{ class: "agds-section-alert__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: (__VLS_ctx.toneConfig.iconPath),
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    id: (__VLS_ctx.toneId),
    ...{ class: "agds-section-alert__sr-tone" },
});
/** @type {__VLS_StyleScopedClasses['agds-section-alert__sr-tone']} */ ;
(__VLS_ctx.toneConfig.iconLabel);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-section-alert__body" },
});
/** @type {__VLS_StyleScopedClasses['agds-section-alert__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    id: (__VLS_ctx.titleId),
    ...{ class: "agds-section-alert__title" },
});
/** @type {__VLS_StyleScopedClasses['agds-section-alert__title']} */ ;
(props.title);
if (__VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: (__VLS_ctx.childrenId),
        ...{ class: "agds-section-alert__content" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__content']} */ ;
    var __VLS_0 = {};
}
if (__VLS_ctx.closeHandler) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.closeHandler))
                    return;
                __VLS_ctx.closeHandler();
                // @ts-ignore
                [resolvedTone, toneConfig, toneConfig, toneConfig, toneConfig, toneConfig, toneStyle, ariaLabelledBy, resolvedTabIndex, toneId, titleId, $slots, childrenId, closeHandler, closeHandler,];
            } },
        type: "button",
        'aria-label': "Close",
        ...{ class: "agds-section-alert__close" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-section-alert__close-label" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__close-label']} */ ;
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
        ...{ class: "agds-section-alert__close-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-section-alert__close-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M18 6 6 18M6 6l12 12",
    });
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
