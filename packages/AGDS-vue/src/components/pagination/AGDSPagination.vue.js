import { computed, getCurrentInstance } from 'vue';
import { usePagination, separatorAriaLabel } from './usePagination';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Pagination',
    windowLimit: 3,
    itemsPerPageOptions: () => [10, 20, 50, 100],
});
const emit = defineEmits();
const uid = getCurrentInstance()?.uid ?? 0;
const perPageId = `agds-pagination-per-page-${uid}`;
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
    return separatorAriaLabel(items.value, index, true);
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
/** @type {__VLS_StyleScopedClasses['agds-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__direction']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__direction-label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__page']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__separator']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination__select']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-pagination" },
    ...{ class: ({ 'agds-pagination--has-secondary': __VLS_ctx.hasSecondary }) },
});
/** @type {__VLS_StyleScopedClasses['agds-pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-pagination--has-secondary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': (__VLS_ctx.ariaLabel),
    ...{ class: "agds-pagination__nav" },
});
/** @type {__VLS_StyleScopedClasses['agds-pagination__nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ol, __VLS_intrinsics.ol)({
    ...{ class: "agds-pagination__list" },
});
/** @type {__VLS_StyleScopedClasses['agds-pagination__list']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.items))) {
    (__VLS_ctx.itemKey(item, index));
    if (item.type === 'direction') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: ([
                    'agds-pagination__item',
                    `agds-pagination__item--${item.direction}`,
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
            href: (__VLS_ctx.generateHref(item.pageNumber)),
            'aria-label': (item.direction === 'left' ? 'Go to previous page' : 'Go to next page'),
            ...{ class: "agds-pagination__direction" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__direction']} */ ;
        if (item.direction === 'left') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "agds-pagination__arrow" },
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
            /** @type {__VLS_StyleScopedClasses['agds-pagination__arrow']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "15 18 9 12 15 6",
            });
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-pagination__direction-label" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__direction-label']} */ ;
        (item.direction === 'left' ? 'Previous' : 'Next');
        if (item.direction === 'right') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "agds-pagination__arrow" },
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
            /** @type {__VLS_StyleScopedClasses['agds-pagination__arrow']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "9 18 15 12 9 6",
            });
        }
    }
    else if (item.type === 'page') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "agds-pagination__item" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
            href: (__VLS_ctx.generateHref(item.pageNumber)),
            'aria-label': (`Go to page ${item.pageNumber}`),
            'aria-current': (item.isActive ? 'page' : undefined),
            ...{ class: ([
                    'agds-pagination__page',
                    { 'agds-pagination__page--active': item.isActive },
                ]) },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__page']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-pagination__page--active']} */ ;
        (item.pageNumber);
    }
    else if (item.type === 'separator') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "agds-pagination__item agds-pagination__separator" },
            'aria-label': (__VLS_ctx.getSeparatorLabel(index)),
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__item']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-pagination__separator']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            'aria-hidden': "true",
            ...{ class: "agds-pagination__ellipsis" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__ellipsis']} */ ;
    }
    // @ts-ignore
    [hasSecondary, ariaLabel, items, itemKey, generateHref, generateHref, getSeparatorLabel,];
}
if (__VLS_ctx.hasSecondary) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-pagination__secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-pagination__secondary']} */ ;
    if (__VLS_ctx.itemRangeText) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            role: "status",
            ...{ class: "agds-pagination__range" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__range']} */ ;
        (__VLS_ctx.itemRangeText);
    }
    if (__VLS_ctx.showPerPage) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-pagination__per-page" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__per-page']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: (__VLS_ctx.perPageId),
            ...{ class: "agds-pagination__per-page-label" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__per-page-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-pagination__select-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__select-wrap']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
            ...{ onChange: (__VLS_ctx.onPerPageChange) },
            id: (__VLS_ctx.perPageId),
            value: (__VLS_ctx.itemsPerPage),
            ...{ class: "agds-pagination__select" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-pagination__select']} */ ;
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
