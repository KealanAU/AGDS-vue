import { computed } from 'vue';
import AgDSCollapsingSideBar from '../collapsing-side-bar/AGDSCollapsingSideBar.vue';
const props = withDefaults(defineProps(), {
    activeFiltersCount: 0,
    background: 'body',
    showClearFilters: false,
});
const emit = defineEmits();
/** Visible title: "Filters" or "Filters (3)" */
const title = computed(() => props.activeFiltersCount ? `Filters (${props.activeFiltersCount})` : 'Filters');
/**
 * Screen reader label: "Filters" or "Filters (3 active)".
 * More descriptive than the visible label so AT users understand the count is a filter count.
 */
const ariaLabel = computed(() => props.activeFiltersCount
    ? `Filters (${props.activeFiltersCount} active)`
    : 'Filters');
const __VLS_defaults = {
    activeFiltersCount: 0,
    background: 'body',
    showClearFilters: false,
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
/** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__body']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__clear-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__clear-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__clear-btn']} */ ;
const __VLS_0 = AgDSCollapsingSideBar || AgDSCollapsingSideBar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    title: (__VLS_ctx.title),
    'aria-label': (__VLS_ctx.ariaLabel),
    background: (props.background),
    as: "section",
}));
const __VLS_2 = __VLS_1({
    title: (__VLS_ctx.title),
    'aria-label': (__VLS_ctx.ariaLabel),
    background: (props.background),
    as: "section",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-filter-sidebar__body" },
});
/** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__body']} */ ;
var __VLS_7 = {};
if (props.showClearFilters) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.hr)({
        ...{ class: "agds-filter-sidebar__divider" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__divider']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(props.showClearFilters))
                    return;
                __VLS_ctx.emit('clearFilters');
                // @ts-ignore
                [title, ariaLabel, emit,];
            } },
        type: "button",
        ...{ class: "agds-filter-sidebar__clear-btn" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-filter-sidebar__clear-btn']} */ ;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
