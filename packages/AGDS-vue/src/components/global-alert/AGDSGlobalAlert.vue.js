import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    tone: 'warning',
});
const toneAriaLabel = computed(() => (props.tone === 'info' ? 'Information' : 'Warning'));
// Section aria-label: use title if provided, otherwise fall back to tone label.
const sectionAriaLabel = computed(() => props.title || toneAriaLabel.value);
const __VLS_defaults = {
    tone: 'warning',
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
/** @type {__VLS_StyleScopedClasses['agds-global-alert--info']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__strip']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert--warning']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__strip']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__strip']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__inner--with-close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__close']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__close-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: (['agds-global-alert', `agds-global-alert--${props.tone}`]) },
    'aria-label': (__VLS_ctx.sectionAriaLabel),
});
/** @type {__VLS_StyleScopedClasses['agds-global-alert']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-global-alert__strip" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-global-alert__strip']} */ ;
if (props.tone === 'info') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
        'clip-rule': "evenodd",
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'fill-rule': "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
        'clip-rule': "evenodd",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-global-alert__body" },
});
/** @type {__VLS_StyleScopedClasses['agds-global-alert__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-global-alert__inner" },
    ...{ class: ({ 'agds-global-alert__inner--with-close': !!props.onClose }) },
});
/** @type {__VLS_StyleScopedClasses['agds-global-alert__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-global-alert__inner--with-close']} */ ;
if (props.title) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "agds-global-alert__title" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-global-alert__title']} */ ;
    (props.title);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-global-alert__content" },
});
/** @type {__VLS_StyleScopedClasses['agds-global-alert__content']} */ ;
var __VLS_0 = {};
if (props.onClose) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(props.onClose))
                    return;
                props.onClose();
                // @ts-ignore
                [sectionAriaLabel,];
            } },
        type: "button",
        'aria-label': "Close",
        ...{ class: "agds-global-alert__close" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-global-alert__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-global-alert__close-label" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-global-alert__close-label']} */ ;
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
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M18 6 6 18M6 6l12 12",
    });
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
