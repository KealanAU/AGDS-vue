import { ref } from 'vue';
const __VLS_props = withDefaults(defineProps(), {
    focusRingFor: 'keyboard',
});
const __VLS_emit = defineEmits();
const anchorEl = ref(null);
const __VLS_exposed = { focus: () => anchorEl.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    focusRingFor: 'keyboard',
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
/** @type {__VLS_StyleScopedClasses['agds-text-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [$emit,];
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.$emit('focus', $event);
            // @ts-ignore
            [$emit,];
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.$emit('blur', $event);
            // @ts-ignore
            [$emit,];
        } },
    ref: "anchorEl",
    href: (__VLS_ctx.href),
    ...{ class: ([
            'agds-text-link',
            { 'agds-text-link--focus-all': __VLS_ctx.focusRingFor === 'all' },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-text-link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-text-link--focus-all']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[href, focusRingFor,];
const __VLS_base = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
