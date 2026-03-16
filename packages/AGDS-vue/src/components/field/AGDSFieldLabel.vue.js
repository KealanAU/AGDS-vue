const props = withDefaults(defineProps(), {
    as: 'label',
    required: false,
    hideOptionalLabel: false,
});
function secondaryLabelText() {
    if (props.hideOptionalLabel)
        return props.secondaryLabel || undefined;
    if (!props.required) {
        return props.secondaryLabel
            ? `${props.secondaryLabel} (optional)`
            : '(optional)';
    }
    return props.secondaryLabel || undefined;
}
const __VLS_defaults = {
    as: 'label',
    required: false,
    hideOptionalLabel: false,
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
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    for: (props.as === 'label' ? props.htmlFor : undefined),
    id: (props.id),
    ...{ class: "agds-field-label" },
}));
const __VLS_2 = __VLS_1({
    for: (props.as === 'label' ? props.htmlFor : undefined),
    id: (props.id),
    ...{ class: "agds-field-label" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-field-label']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-field-label__primary" },
});
/** @type {__VLS_StyleScopedClasses['agds-field-label__primary']} */ ;
var __VLS_7 = {};
if (__VLS_ctx.secondaryLabelText()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-field-label__secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-field-label__secondary']} */ ;
    (' ' + __VLS_ctx.secondaryLabelText());
}
// @ts-ignore
[secondaryLabelText, secondaryLabelText,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
