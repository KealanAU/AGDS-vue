import { computed, getCurrentInstance, ref, watch, nextTick } from 'vue';
import { usePagination, separatorAriaLabel } from './usePagination';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Pagination',
    windowLimit: 3,
    itemsPerPageOptions: () => [10, 20, 50, 100],
});
const emit = defineEmits();
const uid = getCurrentInstance()?.uid ?? 0;
const perPageId = `ausgov-pagination-per-page-${uid}`;
// Focus management: when "Previous" disappears (page reaches 1),
// focus the page-1 button so keyboard users don't lose their place.
const pendingFocusFirst = ref(false);
const firstPageButtonRef = ref(null);
watch(() => props.currentPage, async (newPage) => {
    if (pendingFocusFirst.value && newPage === 1) {
        await nextTick();
        firstPageButtonRef.value?.focus();
        pendingFocusFirst.value = false;
    }
});
const items = computed(() => usePagination({
    currentPage: props.currentPage,
    totalPages: props.totalPages,
    windowLimit: props.windowLimit,
}));
const showPerPage = computed(() => props.itemsPerPage !== undefined);
const hasSecondary = computed(() => Boolean(props.itemRangeText) || showPerPage.value);
function itemKey(item, index) {
    if (item.type === 'direction')
        return item.direction;
    if (item.type === 'page')
        return `page-${item.pageNumber}`;
    return `separator-${index}`;
}
function getSeparatorLabel(index) {
    return separatorAriaLabel(items.value, index, false);
}
function handleDirectionClick(item) {
    emit('change', item.pageNumber);
    // When clicking "Previous" and it will disappear (going to page 1),
    // set a flag so we can focus the page-1 button after re-render.
    if (item.direction === 'left' && item.pageNumber === 1) {
        pendingFocusFirst.value = true;
    }
}
function handlePageClick(pageNumber) {
    emit('change', pageNumber);
}
function onPerPageChange(event) {
    const value = Number(event.target.value);
    emit('itemsPerPageChange', value);
}
const __VLS_defaults = {
    ariaLabel: 'Pagination',
    windowLimit: 3,
    itemsPerPageOptions: () => [10, 20, 50, 100],
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
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__separator']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__select']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-pagination" },
    ...{ class: ({ 'ausgov-pagination--has-secondary': __VLS_ctx.hasSecondary }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-pagination--has-secondary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': (__VLS_ctx.ariaLabel),
    ...{ class: "ausgov-pagination__nav" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ol, __VLS_intrinsics.ol)({
    ...{ class: "ausgov-pagination__list" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-pagination__list']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.items))) {
    (__VLS_ctx.itemKey(item, index));
    if (item.type === 'direction') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: ([
                    'ausgov-pagination__item',
                    `ausgov-pagination__item--${item.direction}`,
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(item.type === 'direction'))
                        return;
                    __VLS_ctx.handleDirectionClick(item);
                    // @ts-ignore
                    [hasSecondary, ariaLabel, items, itemKey, handleDirectionClick,];
                } },
            type: "button",
            'aria-label': (item.direction === 'left' ? 'Go to previous page' : 'Go to next page'),
            ...{ class: "ausgov-pagination__direction" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction']} */ ;
        if (item.direction === 'left') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "ausgov-pagination__arrow" },
                'aria-hidden': "true",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            /** @type {__VLS_StyleScopedClasses['ausgov-pagination__arrow']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "15 18 9 12 15 6",
            });
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-pagination__direction-label" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__direction-label']} */ ;
        (item.direction === 'left' ? 'Previous' : 'Next');
        if (item.direction === 'right') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "ausgov-pagination__arrow" },
                'aria-hidden': "true",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            /** @type {__VLS_StyleScopedClasses['ausgov-pagination__arrow']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "9 18 15 12 9 6",
            });
        }
    }
    else if (item.type === 'page') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "ausgov-pagination__item" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(item.type === 'direction'))
                        return;
                    if (!(item.type === 'page'))
                        return;
                    __VLS_ctx.handlePageClick(item.pageNumber);
                    // @ts-ignore
                    [handlePageClick,];
                } },
            ref: (item.pageNumber === 1 ? (el) => { __VLS_ctx.firstPageButtonRef = el; } : undefined),
            type: "button",
            'aria-label': (`Go to page ${item.pageNumber}`),
            'aria-current': (item.isActive ? 'page' : undefined),
            ...{ class: ([
                    'ausgov-pagination__page',
                    { 'ausgov-pagination__page--active': item.isActive },
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__page']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__page--active']} */ ;
        (item.pageNumber);
    }
    else if (item.type === 'separator') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "ausgov-pagination__item ausgov-pagination__separator" },
            'aria-label': (__VLS_ctx.getSeparatorLabel(index)),
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__item']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__separator']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            'aria-hidden': "true",
            ...{ class: "ausgov-pagination__ellipsis" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__ellipsis']} */ ;
    }
    // @ts-ignore
    [firstPageButtonRef, getSeparatorLabel,];
}
if (__VLS_ctx.hasSecondary) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-pagination__secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pagination__secondary']} */ ;
    if (__VLS_ctx.itemRangeText) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            role: "status",
            ...{ class: "ausgov-pagination__range" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__range']} */ ;
        (__VLS_ctx.itemRangeText);
    }
    if (__VLS_ctx.showPerPage) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ausgov-pagination__per-page" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__per-page']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: (__VLS_ctx.perPageId),
            ...{ class: "ausgov-pagination__per-page-label" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__per-page-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ausgov-pagination__select-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__select-wrap']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
            ...{ onChange: (__VLS_ctx.onPerPageChange) },
            id: (__VLS_ctx.perPageId),
            value: (__VLS_ctx.itemsPerPage),
            ...{ class: "ausgov-pagination__select" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pagination__select']} */ ;
        for (const [opt] of __VLS_vFor((__VLS_ctx.itemsPerPageOptions))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                key: (opt),
                value: (opt),
            });
            (opt);
            // @ts-ignore
            [hasSecondary, itemRangeText, itemRangeText, showPerPage, perPageId, perPageId, onPerPageChange, itemsPerPage, itemsPerPageOptions,];
        }
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
