const props = withDefaults(defineProps(), {
    as: 'td',
    fontWeight: 'normal',
    textAlign: 'left',
    verticalAlign: 'top',
});
const __VLS_defaults = {
    as: 'td',
    fontWeight: 'normal',
    textAlign: 'left',
    verticalAlign: 'top',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-table-cell']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "agds-table-cell" },
    ...{ class: ([
            `agds-table-cell--align-${props.textAlign}`,
            `agds-table-cell--weight-${props.fontWeight}`,
        ]) },
    colSpan: (props.colSpan),
    rowSpan: (props.rowSpan),
    scope: (props.scope),
    id: (props.id),
    ...{ style: ({ verticalAlign: props.verticalAlign }) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "agds-table-cell" },
    ...{ class: ([
            `agds-table-cell--align-${props.textAlign}`,
            `agds-table-cell--weight-${props.fontWeight}`,
        ]) },
    colSpan: (props.colSpan),
    rowSpan: (props.rowSpan),
    scope: (props.scope),
    id: (props.id),
    ...{ style: ({ verticalAlign: props.verticalAlign }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-table-cell']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
