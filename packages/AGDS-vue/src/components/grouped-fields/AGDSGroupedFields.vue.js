import { computed, getCurrentInstance } from 'vue';
import AGDSFieldContainer from '../field/AGDSFieldContainer.vue';
import AGDSFieldLabel from '../field/AGDSFieldLabel.vue';
import AGDSFieldHint from '../field/AGDSFieldHint.vue';
import AGDSFieldMessage from '../field/AGDSFieldMessage.vue';
const props = withDefaults(defineProps(), {
    field1Invalid: false,
    field2Invalid: false,
    hideOptionalLabel: false,
    visuallyHideLegend: false,
});
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const hintId = computed(() => `grouped-fields-${uid}-hint`);
const messageId = computed(() => `grouped-fields-${uid}-message`);
const invalid = computed(() => props.field1Invalid || props.field2Invalid);
function getAriaDescribedBy(fieldInvalid) {
    const ids = [];
    if (fieldInvalid && props.message)
        ids.push(messageId.value);
    if (props.hint)
        ids.push(hintId.value);
    return ids.length > 0 ? ids.join(' ') : undefined;
}
const field1Props = computed(() => ({
    'aria-describedby': getAriaDescribedBy(props.field1Invalid),
    'aria-invalid': props.field1Invalid,
}));
const field2Props = computed(() => ({
    'aria-describedby': getAriaDescribedBy(props.field2Invalid),
    'aria-invalid': props.field2Invalid,
}));
const __VLS_defaults = {
    field1Invalid: false,
    field2Invalid: false,
    hideOptionalLabel: false,
    visuallyHideLegend: false,
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
const __VLS_0 = AGDSFieldContainer || AGDSFieldContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    invalid: (__VLS_ctx.invalid),
}));
const __VLS_2 = __VLS_1({
    invalid: (__VLS_ctx.invalid),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.fieldset, __VLS_intrinsics.fieldset)({
    ...{ class: "agds-grouped-fields" },
});
/** @type {__VLS_StyleScopedClasses['agds-grouped-fields']} */ ;
const __VLS_7 = AGDSFieldLabel || AGDSFieldLabel;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    as: "legend",
    ...{ class: ({ 'agds-grouped-fields__legend--hidden': __VLS_ctx.visuallyHideLegend }) },
    hideOptionalLabel: (__VLS_ctx.hideOptionalLabel),
    required: (false),
}));
const __VLS_9 = __VLS_8({
    as: "legend",
    ...{ class: ({ 'agds-grouped-fields__legend--hidden': __VLS_ctx.visuallyHideLegend }) },
    hideOptionalLabel: (__VLS_ctx.hideOptionalLabel),
    required: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['agds-grouped-fields__legend--hidden']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
(__VLS_ctx.legend);
// @ts-ignore
[invalid, visuallyHideLegend, hideOptionalLabel, legend,];
var __VLS_10;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-grouped-fields__stack" },
    ...{ class: ({ 'agds-grouped-fields__stack--spaced': !__VLS_ctx.visuallyHideLegend }) },
});
/** @type {__VLS_StyleScopedClasses['agds-grouped-fields__stack']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-grouped-fields__stack--spaced']} */ ;
if (__VLS_ctx.hint) {
    const __VLS_13 = AGDSFieldHint || AGDSFieldHint;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        id: (__VLS_ctx.hintId),
    }));
    const __VLS_15 = __VLS_14({
        id: (__VLS_ctx.hintId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    (__VLS_ctx.hint);
    // @ts-ignore
    [visuallyHideLegend, hint, hint, hintId,];
    var __VLS_16;
}
if (__VLS_ctx.message && __VLS_ctx.invalid) {
    const __VLS_19 = AGDSFieldMessage || AGDSFieldMessage;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        id: (__VLS_ctx.messageId),
    }));
    const __VLS_21 = __VLS_20({
        id: (__VLS_ctx.messageId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    (__VLS_ctx.message);
    // @ts-ignore
    [invalid, message, message, messageId,];
    var __VLS_22;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-grouped-fields__row" },
    'data-grouped-fields': true,
});
/** @type {__VLS_StyleScopedClasses['agds-grouped-fields__row']} */ ;
var __VLS_25 = {
    field1Props: (__VLS_ctx.field1Props),
    field2Props: (__VLS_ctx.field2Props),
};
// @ts-ignore
[field1Props, field2Props,];
var __VLS_3;
// @ts-ignore
var __VLS_26 = __VLS_25;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
