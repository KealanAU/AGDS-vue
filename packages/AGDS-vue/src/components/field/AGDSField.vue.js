import { computed, getCurrentInstance } from 'vue';
import AGDSFieldContainer from './AGDSFieldContainer.vue';
import AGDSFieldLabel from './AGDSFieldLabel.vue';
import AGDSFieldHint from './AGDSFieldHint.vue';
import AGDSFieldMessage from './AGDSFieldMessage.vue';
const MAX_WIDTH_MAP = {
    xs: '10ch',
    sm: '20ch',
    md: '30ch',
    lg: '40ch',
    xl: '60ch',
};
const props = withDefaults(defineProps(), {
    invalid: false,
    required: false,
    hideOptionalLabel: false,
});
// ── IDs ──────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const fieldId = computed(() => props.id ?? `field-${uid}`);
const hintId = computed(() => `field-${uid}-hint`);
const messageId = computed(() => `field-${uid}-message`);
// ── Slot props (mirror React's A11yProps) ─────────────────────────────────────
const describedBy = computed(() => {
    const ids = [];
    if (props.message && props.invalid)
        ids.push(messageId.value);
    if (props.hint)
        ids.push(hintId.value);
    return ids.length ? ids.join(' ') : undefined;
});
const slotProps = computed(() => ({
    id: fieldId.value,
    'aria-required': Boolean(props.required),
    'aria-invalid': Boolean(props.invalid),
    'aria-describedby': describedBy.value,
}));
const resolvedMaxWidth = computed(() => props.maxWidth ? MAX_WIDTH_MAP[props.maxWidth] : undefined);
const __VLS_defaults = {
    invalid: false,
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
const __VLS_0 = AGDSFieldContainer || AGDSFieldContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    invalid: (props.invalid),
}));
const __VLS_2 = __VLS_1({
    invalid: (props.invalid),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
const __VLS_7 = AGDSFieldLabel || AGDSFieldLabel;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    htmlFor: (__VLS_ctx.fieldId),
    id: (props.labelId),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    secondaryLabel: (props.secondaryLabel),
}));
const __VLS_9 = __VLS_8({
    htmlFor: (__VLS_ctx.fieldId),
    id: (props.labelId),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
    secondaryLabel: (props.secondaryLabel),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
(props.label);
// @ts-ignore
[fieldId,];
var __VLS_10;
if (props.hint) {
    const __VLS_13 = AGDSFieldHint || AGDSFieldHint;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        id: (__VLS_ctx.hintId),
    }));
    const __VLS_15 = __VLS_14({
        id: (__VLS_ctx.hintId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    (props.hint);
    // @ts-ignore
    [hintId,];
    var __VLS_16;
}
if (props.message && props.invalid) {
    const __VLS_19 = AGDSFieldMessage || AGDSFieldMessage;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        id: (__VLS_ctx.messageId),
    }));
    const __VLS_21 = __VLS_20({
        id: (__VLS_ctx.messageId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    (props.message);
    // @ts-ignore
    [messageId,];
    var __VLS_22;
}
var __VLS_25 = {
    ...(__VLS_ctx.slotProps),
};
if (__VLS_ctx.resolvedMaxWidth) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        'aria-hidden': "true",
        ...{ class: "agds-field__max-width-spacer" },
        ...{ style: ({ maxWidth: __VLS_ctx.resolvedMaxWidth }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-field__max-width-spacer']} */ ;
}
// @ts-ignore
[slotProps, resolvedMaxWidth, resolvedMaxWidth,];
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
