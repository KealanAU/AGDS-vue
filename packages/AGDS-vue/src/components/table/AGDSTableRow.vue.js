import { computed, inject } from 'vue';
import { TABLE_CONTEXT_KEY } from './tableContext';
const props = withDefaults(defineProps(), {
    clickable: false,
    invalid: false,
    selected: false,
});
const emit = defineEmits();
const tableContext = inject(TABLE_CONTEXT_KEY);
const isFixedTable = computed(() => tableContext?.tableLayout === 'fixed');
const hasBackground = computed(() => Boolean(props.background || props.invalid));
function handleClick(event) {
    if (!props.clickable)
        return;
    // Don't fire row click when the user interacted with an interactive element inside a cell.
    const target = event.target;
    if (target.closest('a, button, input, label, select, textarea'))
        return;
    if (target.closest('tr')) {
        event.stopPropagation();
        emit('click', event);
    }
}
const __VLS_defaults = {
    clickable: false,
    invalid: false,
    selected: false,
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
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-table-row--fixed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ class: "ausgov-table-row" },
    ...{ class: ([
            props.selected && 'ausgov-table-row--selected',
            props.invalid && 'ausgov-table-row--invalid',
            props.clickable && 'ausgov-table-row--clickable',
            props.background && `ausgov-table-row--bg-${props.background}`,
            __VLS_ctx.isFixedTable && 'ausgov-table-row--fixed',
        ]) },
    'aria-rowindex': (props['aria-rowindex']),
    'aria-selected': (props.selected ? true : undefined),
    'data-has-background': (__VLS_ctx.hasBackground ? true : undefined),
});
/** @type {__VLS_StyleScopedClasses['ausgov-table-row']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[handleClick, isFixedTable, hasBackground,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
