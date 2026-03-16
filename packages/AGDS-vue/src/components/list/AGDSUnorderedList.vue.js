import { computed, inject, provide } from 'vue';
import { LIST_DEPTH_KEY } from './listContext';
const currentDepth = inject(LIST_DEPTH_KEY, 0);
const depth = currentDepth + 1;
provide(LIST_DEPTH_KEY, depth);
const nested = computed(() => depth > 1);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "agds-unordered-list" },
    ...{ class: ({ 'agds-list--nested': __VLS_ctx.nested }) },
});
/** @type {__VLS_StyleScopedClasses['agds-unordered-list']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-list--nested']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[nested,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
