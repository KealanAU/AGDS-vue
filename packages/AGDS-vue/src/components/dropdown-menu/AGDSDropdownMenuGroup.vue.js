import { getCurrentInstance } from 'vue';
import { useDropdownMenuContext } from './dropdownMenuContext';
const __VLS_props = defineProps();
const { menuId } = useDropdownMenuContext();
const uid = getCurrentInstance()?.uid ?? 0;
const groupId = `${menuId}-group-${uid}`;
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    role: "group",
    'aria-labelledby': (__VLS_ctx.groupId),
    ...{ class: "agds-dm-group" },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    id: (__VLS_ctx.groupId),
    ...{ class: "agds-dm-group__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-group__label']} */ ;
(__VLS_ctx.label);
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[groupId, groupId, label,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
