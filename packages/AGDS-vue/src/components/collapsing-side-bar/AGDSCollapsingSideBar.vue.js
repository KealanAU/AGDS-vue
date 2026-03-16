const props = withDefaults(defineProps(), {
    as: 'section',
    background: 'body',
});
// Unique IDs for aria associations — generated once per instance.
const uid = Math.random().toString(36).slice(2, 8);
const bodyId = `agds-csb-body-${uid}`;
const headingId = `agds-csb-heading-${uid}`;
import { ref } from 'vue';
const isOpen = ref(false);
function toggle() {
    isOpen.value = !isOpen.value;
}
const __VLS_defaults = {
    as: 'section',
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
/** @type {__VLS_StyleScopedClasses['agds-csb--bg-body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb--bg-bodyAlt']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle-title']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__chevron--open']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__heading']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__body']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "agds-csb" },
    ...{ class: (`agds-csb--bg-${props.background}`) },
    'aria-label': (props.ariaLabel || undefined),
    'aria-labelledby': (props.ariaLabel ? undefined : __VLS_ctx.headingId),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "agds-csb" },
    ...{ class: (`agds-csb--bg-${props.background}`) },
    'aria-label': (props.ariaLabel || undefined),
    'aria-labelledby': (props.ariaLabel ? undefined : __VLS_ctx.headingId),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-csb']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: (__VLS_ctx.headingId),
    ...{ class: "agds-csb__heading" },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__heading']} */ ;
var __VLS_7 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "agds-csb__title" },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__title']} */ ;
(props.title);
if (props.subTitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "agds-csb__subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-csb__subtitle']} */ ;
    (props.subTitle);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggle) },
    type: "button",
    ...{ class: "agds-csb__toggle" },
    'aria-expanded': (__VLS_ctx.isOpen),
    'aria-controls': (__VLS_ctx.bodyId),
    'aria-label': (props.title),
});
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-csb__toggle-content" },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-csb__toggle-text" },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-csb__toggle-title" },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__toggle-title']} */ ;
(props.title);
if (props.subTitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-csb__toggle-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-csb__toggle-subtitle']} */ ;
    (props.subTitle);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "agds-csb__chevron" },
    ...{ class: ({ 'agds-csb__chevron--open': __VLS_ctx.isOpen }) },
    'aria-hidden': "true",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
/** @type {__VLS_StyleScopedClasses['agds-csb__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__chevron--open']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M6 9l6 6 6-6",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: (__VLS_ctx.bodyId),
    ...{ class: "agds-csb__body" },
    ...{ class: ({ 'agds-csb__body--open': __VLS_ctx.isOpen }) },
});
/** @type {__VLS_StyleScopedClasses['agds-csb__body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-csb__body--open']} */ ;
var __VLS_9 = {};
// @ts-ignore
[headingId, headingId, toggle, isOpen, isOpen, isOpen, bodyId, bodyId,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
