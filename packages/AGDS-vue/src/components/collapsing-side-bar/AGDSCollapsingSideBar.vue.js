const props = withDefaults(defineProps(), {
    as: 'section',
    background: 'body',
});
// Unique IDs for aria associations — generated once per instance.
const uid = Math.random().toString(36).slice(2, 8);
const bodyId = `ausgov-csb-body-${uid}`;
const headingId = `ausgov-csb-heading-${uid}`;
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
/** @type {__VLS_StyleScopedClasses['ausgov-csb--bg-body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb--bg-bodyAlt']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__chevron--open']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__heading']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__body']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "ausgov-csb" },
    ...{ class: (`ausgov-csb--bg-${props.background}`) },
    'aria-label': (props.ariaLabel || undefined),
    'aria-labelledby': (props.ariaLabel ? undefined : __VLS_ctx.headingId),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "ausgov-csb" },
    ...{ class: (`ausgov-csb--bg-${props.background}`) },
    'aria-label': (props.ariaLabel || undefined),
    'aria-labelledby': (props.ariaLabel ? undefined : __VLS_ctx.headingId),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-csb']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: (__VLS_ctx.headingId),
    ...{ class: "ausgov-csb__heading" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__heading']} */ ;
var __VLS_7 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "ausgov-csb__title" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__title']} */ ;
(props.title);
if (props.subTitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "ausgov-csb__subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-csb__subtitle']} */ ;
    (props.subTitle);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggle) },
    type: "button",
    ...{ class: "ausgov-csb__toggle" },
    'aria-expanded': (__VLS_ctx.isOpen),
    'aria-controls': (__VLS_ctx.bodyId),
    'aria-label': (props.title),
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-csb__toggle-content" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-csb__toggle-text" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-csb__toggle-title" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle-title']} */ ;
(props.title);
if (props.subTitle) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-csb__toggle-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-csb__toggle-subtitle']} */ ;
    (props.subTitle);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "ausgov-csb__chevron" },
    ...{ class: ({ 'ausgov-csb__chevron--open': __VLS_ctx.isOpen }) },
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
/** @type {__VLS_StyleScopedClasses['ausgov-csb__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__chevron--open']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M6 9l6 6 6-6",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: (__VLS_ctx.bodyId),
    ...{ class: "ausgov-csb__body" },
    ...{ class: ({ 'ausgov-csb__body--open': __VLS_ctx.isOpen }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-csb__body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-csb__body--open']} */ ;
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
