import { computed } from 'vue';
import { statusBadgeToneMap, getTone } from './statusBadgeUtils';
const props = withDefaults(defineProps(), {
    tone: 'infoHigh',
    weight: 'regular',
});
// ── Derived state ─────────────────────────────────────────────────────────────
const resolvedTone = computed(() => getTone(props.tone));
const toneConfig = computed(() => statusBadgeToneMap[resolvedTone.value]);
// `appearance` takes precedence over the deprecated `weight`.
const resolvedAppearance = computed(() => props.appearance ?? props.weight ?? 'regular');
const badgeStyle = computed(() => ({
    '--sb-border-color': toneConfig.value.borderColor,
    '--sb-icon-color': toneConfig.value.iconColor,
}));
const __VLS_defaults = {
    tone: 'infoHigh',
    weight: 'regular',
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
/** @type {__VLS_StyleScopedClasses['agds-status-badge--regular']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-status-badge__icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: ([
            'agds-status-badge',
            `agds-status-badge--${__VLS_ctx.resolvedAppearance}`,
        ]) },
    ...{ style: (__VLS_ctx.badgeStyle) },
});
/** @type {__VLS_StyleScopedClasses['agds-status-badge']} */ ;
if (__VLS_ctx.toneConfig.iconVariant === 'filled') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "false",
        'aria-label': (`Status: ${__VLS_ctx.toneConfig.iconLabel}.`),
        ...{ class: "agds-status-badge__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-status-badge__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        'clip-rule': "evenodd",
        d: (__VLS_ctx.toneConfig.iconPath),
    });
}
else if (__VLS_ctx.toneConfig.iconVariant === 'outline') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        focusable: "false",
        'aria-hidden': "false",
        'aria-label': (`Status: ${__VLS_ctx.toneConfig.iconLabel}.`),
        ...{ class: "agds-status-badge__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-status-badge__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: (__VLS_ctx.toneConfig.iconPath),
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "false",
        'aria-label': (`Status: ${__VLS_ctx.toneConfig.iconLabel}.`),
        ...{ class: "agds-status-badge__icon" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-status-badge__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "12",
        cy: "12",
        r: "4",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-status-badge__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-status-badge__label']} */ ;
(__VLS_ctx.label);
// @ts-ignore
[resolvedAppearance, badgeStyle, toneConfig, toneConfig, toneConfig, toneConfig, toneConfig, toneConfig, toneConfig, label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
