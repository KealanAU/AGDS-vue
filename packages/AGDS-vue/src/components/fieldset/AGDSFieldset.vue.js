import { computed, getCurrentInstance } from 'vue';
const props = defineProps();
// Note: fieldset is NOT rendered as a flex container — `legend` must be the
// first child of `fieldset`, and setting `fieldset` as a flex/grid container
// behaves inconsistently across browsers. Child spacing uses margins instead.
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const fieldsetId = computed(() => props.id ?? `fieldset-${uid}`);
const hintId = computed(() => `fieldset-${uid}-hint`);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.fieldset, __VLS_intrinsics.fieldset)({
    id: (__VLS_ctx.fieldsetId),
    'aria-describedby': (__VLS_ctx.hint ? __VLS_ctx.hintId : undefined),
    ...{ class: "agds-fieldset" },
});
/** @type {__VLS_StyleScopedClasses['agds-fieldset']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.legend, __VLS_intrinsics.legend)({
    ...{ class: "agds-fieldset__legend" },
});
/** @type {__VLS_StyleScopedClasses['agds-fieldset__legend']} */ ;
(__VLS_ctx.legend);
if (__VLS_ctx.hint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: (__VLS_ctx.hintId),
        ...{ class: "agds-fieldset__hint" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-fieldset__hint']} */ ;
    (__VLS_ctx.hint);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-fieldset__content" },
});
/** @type {__VLS_StyleScopedClasses['agds-fieldset__content']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[fieldsetId, hint, hint, hint, hintId, hintId, legend,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
