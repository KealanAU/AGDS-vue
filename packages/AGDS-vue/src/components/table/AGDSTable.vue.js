import { provide, reactive } from 'vue';
import { TABLE_CONTEXT_KEY } from './tableContext';
const props = withDefaults(defineProps(), {
    tableLayout: 'auto',
});
provide(TABLE_CONTEXT_KEY, reactive({
    get tableLayout() {
        return props.tableLayout ?? 'auto';
    },
}));
const __VLS_defaults = {
    tableLayout: 'auto',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-table']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
    ...{ class: "ausgov-table" },
    ...{ class: ([
            props.striped && 'ausgov-table--striped',
            props.tableLayout === 'fixed' && 'ausgov-table--layout-fixed',
        ]) },
    tabindex: (props.tabIndex),
    'aria-labelledby': (props['aria-labelledby']),
    'aria-describedby': (props['aria-describedby']),
    'aria-rowcount': (props['aria-rowcount']),
    id: (props.id),
});
/** @type {__VLS_StyleScopedClasses['ausgov-table']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
