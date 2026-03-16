import { computed } from 'vue';
import AusGovIcon from '../icon/AGDSIcon.vue';
const props = withDefaults(defineProps(), {
    textAlign: 'left',
});
const emit = defineEmits();
const ariaSort = computed(() => {
    if (props.sort === 'ASC')
        return 'ascending';
    if (props.sort === 'DESC')
        return 'descending';
    return undefined;
});
const sortIcon = computed(() => {
    if (props.sort === 'ASC')
        return 'heroicons:arrow-up';
    if (props.sort === 'DESC')
        return 'heroicons:arrow-down';
    return 'heroicons:arrows-up-down';
});
const isSorted = computed(() => Boolean(props.sort));
const __VLS_defaults = {
    textAlign: 'left',
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
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__button']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__label']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
    ...{ class: "ausgov-table-header-sortable" },
    ...{ class: (__VLS_ctx.isSorted && 'ausgov-table-header-sortable--active') },
    scope: "col",
    'aria-sort': (__VLS_ctx.ariaSort),
    colSpan: (props.colSpan),
    ...{ style: (props.width ? { width: props.width } : undefined) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('click', $event);
            // @ts-ignore
            [isSorted, ariaSort, emit,];
        } },
    type: "button",
    ...{ class: "ausgov-table-header-sortable__button" },
    ...{ class: (`ausgov-table-header-sortable__button--${props.textAlign}`) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ausgov-table-header-sortable__label" },
    ...{ style: (props.textAlign === 'right'
            ? { marginLeft: 'auto' }
            : props.textAlign === 'center'
                ? { marginInline: 'auto' }
                : undefined) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__label']} */ ;
var __VLS_0 = {};
const __VLS_2 = AusGovIcon;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
    name: (__VLS_ctx.sortIcon),
    size: "sm",
    ...{ class: "ausgov-table-header-sortable__icon" },
    'aria-hidden': "true",
}));
const __VLS_4 = __VLS_3({
    name: (__VLS_ctx.sortIcon),
    size: "sm",
    ...{ class: "ausgov-table-header-sortable__icon" },
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {__VLS_StyleScopedClasses['ausgov-table-header-sortable__icon']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[sortIcon,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
