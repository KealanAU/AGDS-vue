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
/** @type {__VLS_StyleScopedClasses['agds-table']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
    ...{ class: "agds-table" },
    ...{ class: ([
            props.striped && 'agds-table--striped',
            props.tableLayout === 'fixed' && 'agds-table--layout-fixed',
        ]) },
    tabindex: (props.tabIndex),
    id: (props.id),
});
/** @type {__VLS_StyleScopedClasses['agds-table']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
