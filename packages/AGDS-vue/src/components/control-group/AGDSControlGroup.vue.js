import { computed, getCurrentInstance, provide } from 'vue';
import AGDSFieldContainer from '../field/AGDSFieldContainer.vue';
import AGDSFieldLabel from '../field/AGDSFieldLabel.vue';
import AGDSFieldHint from '../field/AGDSFieldHint.vue';
import AGDSFieldMessage from '../field/AGDSFieldMessage.vue';
import { CONTROL_GROUP_KEY } from './controlGroupContext';
const props = withDefaults(defineProps(), {
    block: false,
    invalid: false,
    required: false,
    hideOptionalLabel: false,
});
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const groupId = computed(() => props.id ?? `control-group-${uid}`);
const hintId = computed(() => `control-group-${uid}-hint`);
const messageId = computed(() => `control-group-${uid}-message`);
// Auto-generate a name so child controls always belong to a named group
const resolvedName = computed(() => props.name ?? `control-group-${uid}-name`);
const describedBy = computed(() => {
    const ids = [];
    if (props.message && props.invalid)
        ids.push(messageId.value);
    if (props.hint)
        ids.push(hintId.value);
    return ids.length ? ids.join(' ') : undefined;
});
provide(CONTROL_GROUP_KEY, {
    get invalid() { return props.invalid; },
    get messageId() { return props.invalid && props.message ? messageId.value : undefined; },
    get name() { return resolvedName.value; },
    get required() { return props.required; },
});
const __VLS_defaults = {
    block: false,
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
    id: (__VLS_ctx.groupId),
    invalid: (props.invalid),
}));
const __VLS_2 = __VLS_1({
    id: (__VLS_ctx.groupId),
    invalid: (props.invalid),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.fieldset, __VLS_intrinsics.fieldset)({
    ...{ class: "agds-control-group" },
    'aria-describedby': (__VLS_ctx.describedBy),
});
/** @type {__VLS_StyleScopedClasses['agds-control-group']} */ ;
if (props.label) {
    const __VLS_7 = AGDSFieldLabel || AGDSFieldLabel;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        as: "legend",
        required: (props.required),
        hideOptionalLabel: (props.hideOptionalLabel),
    }));
    const __VLS_9 = __VLS_8({
        as: "legend",
        required: (props.required),
        hideOptionalLabel: (props.hideOptionalLabel),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    (props.label);
    // @ts-ignore
    [groupId, describedBy,];
    var __VLS_10;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-control-group__meta" },
    ...{ class: ({ 'agds-control-group__meta--has-label': props.label }) },
});
/** @type {__VLS_StyleScopedClasses['agds-control-group__meta']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-control-group__meta--has-label']} */ ;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-control-group__items" },
    ...{ class: ({ 'agds-control-group__items--block': props.block }) },
});
/** @type {__VLS_StyleScopedClasses['agds-control-group__items']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-control-group__items--block']} */ ;
var __VLS_25 = {};
// @ts-ignore
[];
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
