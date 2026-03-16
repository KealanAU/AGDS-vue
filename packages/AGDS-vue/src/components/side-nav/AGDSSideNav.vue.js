import { ref, computed } from 'vue';
import SideNavLinkList from './SideNavLinkList.vue';
import { findBestMatch } from './utils';
const props = withDefaults(defineProps(), {
    background: 'body',
    subLevelVisible: 'whenActive',
});
/** Best-matching href from the item tree for the current activePath. */
const bestMatch = computed(() => findBestMatch(props.items, props.activePath));
/** Mobile-only collapse state */
const isExpanded = ref(false);
function toggle() {
    isExpanded.value = !isExpanded.value;
}
const __VLS_defaults = {
    background: 'body',
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
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle-chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav--expanded']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__title--link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__title--link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "ausgov-side-nav" },
    ...{ class: ([
            `ausgov-side-nav--bg-${props.background}`,
            { 'ausgov-side-nav--expanded': __VLS_ctx.isExpanded },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav--expanded']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggle) },
    type: "button",
    ...{ class: "ausgov-side-nav__toggle" },
    'aria-expanded': (__VLS_ctx.isExpanded),
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-side-nav__toggle-label" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle-label']} */ ;
(props.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "ausgov-side-nav__toggle-chevron" },
    'aria-hidden': "true",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__toggle-chevron']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
    points: "6 9 12 15 18 9",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-side-nav__body" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-side-nav__title-wrap" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__title-wrap']} */ ;
const __VLS_0 = (props.titleLink ? 'a' : 'span');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    href: (props.titleLink || undefined),
    'aria-current': (props.titleLink && props.activePath === props.titleLink ? 'page' : undefined),
    ...{ class: "ausgov-side-nav__title" },
    ...{ class: ({ 'ausgov-side-nav__title--link': !!props.titleLink }) },
}));
const __VLS_2 = __VLS_1({
    href: (props.titleLink || undefined),
    'aria-current': (props.titleLink && props.activePath === props.titleLink ? 'page' : undefined),
    ...{ class: "ausgov-side-nav__title" },
    ...{ class: ({ 'ausgov-side-nav__title--link': !!props.titleLink }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__title']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-side-nav__title--link']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
(props.title);
// @ts-ignore
[isExpanded, isExpanded, toggle,];
var __VLS_3;
const __VLS_6 = SideNavLinkList;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    items: (props.items),
    activePath: (__VLS_ctx.bestMatch),
    subLevelVisible: (props.subLevelVisible),
    depth: (1),
}));
const __VLS_8 = __VLS_7({
    items: (props.items),
    activePath: (__VLS_ctx.bestMatch),
    subLevelVisible: (props.subLevelVisible),
    depth: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[bestMatch,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
