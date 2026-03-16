import { ref, computed, nextTick } from 'vue';
import AgDSBreadcrumbsItem from './AGDSBreadcrumbsItem.vue';
import AgDSBreadcrumbsToggle from './AGDSBreadcrumbsToggle.vue';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Breadcrumbs',
});
const firstLink = computed(() => props.links[0]);
const lastLink = computed(() => props.links[props.links.length - 1]);
const middleLinks = computed(() => props.links.filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1));
const hasMiddle = computed(() => middleLinks.value.length > 0);
// Tracks whether the user has manually expanded on mobile.
// On desktop the toggle is always CSS-hidden so this only matters for small viewports.
const isExpanded = ref(false);
const firstItemRef = ref(null);
async function expand() {
    isExpanded.value = true;
    await nextTick();
    firstItemRef.value?.focus();
}
const __VLS_defaults = {
    ariaLabel: 'Breadcrumbs',
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
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__toggle-item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs--collapsed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': (props.ariaLabel),
    ...{ class: "agds-breadcrumbs" },
    ...{ class: ({ 'agds-breadcrumbs--collapsed': __VLS_ctx.hasMiddle && !__VLS_ctx.isExpanded }) },
});
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs--collapsed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ol, __VLS_intrinsics.ol)({
    ...{ class: "agds-breadcrumbs__list" },
});
/** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__list']} */ ;
const __VLS_0 = AgDSBreadcrumbsItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ref: "firstItemRef",
    href: (__VLS_ctx.firstLink.href),
    label: (__VLS_ctx.firstLink.label),
}));
const __VLS_2 = __VLS_1({
    ref: "firstItemRef",
    href: (__VLS_ctx.firstLink.href),
    label: (__VLS_ctx.firstLink.label),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
var __VLS_3;
if (__VLS_ctx.hasMiddle) {
    const __VLS_7 = AgDSBreadcrumbsToggle;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onClick': {} },
        ...{ class: "agds-breadcrumbs__toggle-item" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        ...{ class: "agds-breadcrumbs__toggle-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ click: {} },
        { onClick: (__VLS_ctx.expand) });
    /** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__toggle-item']} */ ;
    var __VLS_10;
    var __VLS_11;
}
for (const [link, idx] of __VLS_vFor((__VLS_ctx.middleLinks))) {
    const __VLS_14 = AgDSBreadcrumbsItem;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        key: (idx),
        href: (link.href),
        label: (link.label),
        ...{ class: "agds-breadcrumbs__middle-item" },
    }));
    const __VLS_16 = __VLS_15({
        key: (idx),
        href: (link.href),
        label: (link.label),
        ...{ class: "agds-breadcrumbs__middle-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    /** @type {__VLS_StyleScopedClasses['agds-breadcrumbs__middle-item']} */ ;
    // @ts-ignore
    [hasMiddle, hasMiddle, isExpanded, firstLink, firstLink, expand, middleLinks,];
}
if (props.links.length > 1) {
    const __VLS_19 = AgDSBreadcrumbsItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        href: (__VLS_ctx.lastLink.href),
        label: (__VLS_ctx.lastLink.label),
        current: (true),
    }));
    const __VLS_21 = __VLS_20({
        href: (__VLS_ctx.lastLink.href),
        label: (__VLS_ctx.lastLink.label),
        current: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
}
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[lastLink, lastLink,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
