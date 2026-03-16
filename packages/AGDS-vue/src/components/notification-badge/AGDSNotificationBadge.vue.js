import { computed } from 'vue';
const props = defineProps();
const label = computed(() => props.max === undefined || props.value <= props.max
    ? String(props.value)
    : `${props.max}+`);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-badge" },
    ...{ class: (`agds-badge--${__VLS_ctx.tone}`) },
});
/** @type {__VLS_StyleScopedClasses['agds-badge']} */ ;
(__VLS_ctx.label);
// @ts-ignore
[tone, label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
