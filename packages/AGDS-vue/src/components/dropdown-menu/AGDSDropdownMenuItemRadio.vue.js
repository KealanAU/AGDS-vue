import { computed, ref, watch, getCurrentInstance } from 'vue';
import { useDropdownMenuContext } from './dropdownMenuContext';
const props = defineProps();
const emit = defineEmits();
const { menuId, activeDescendantId, closeMenu } = useDropdownMenuContext();
const uid = getCurrentInstance()?.uid ?? 0;
const itemId = computed(() => props.id ?? `${menuId}-item-${uid}`);
const isActive = computed(() => itemId.value === activeDescendantId.value);
const itemEl = ref(null);
watch(isActive, (active) => {
    if (active && typeof itemEl.value?.scrollIntoView === 'function') {
        itemEl.value.scrollIntoView({ block: 'nearest' });
    }
});
function handleClick() {
    emit('click');
    closeMenu();
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio--active']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio--checked']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio__label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ref: "itemEl",
    id: (__VLS_ctx.itemId),
    role: "menuitemradio",
    tabindex: "-1",
    'aria-checked': (__VLS_ctx.checked),
    ...{ class: ([
            'agds-dm-radio',
            {
                'agds-dm-radio--active': __VLS_ctx.isActive,
                'agds-dm-radio--checked': __VLS_ctx.checked,
            },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio--active']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio--checked']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-dm-radio__stack" },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-radio__stack']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: ([
            'agds-dm-radio__label',
            { 'agds-dm-radio__label--checked': __VLS_ctx.checked },
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-radio__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-radio__label--checked']} */ ;
var __VLS_0 = {};
if (__VLS_ctx.secondaryText) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-dm-radio__secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-dm-radio__secondary']} */ ;
    (__VLS_ctx.secondaryText);
}
if (__VLS_ctx.$slots.endElement) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-dm-radio__end" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-dm-radio__end']} */ ;
    var __VLS_2 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[handleClick, itemId, checked, checked, checked, isActive, secondaryText, secondaryText, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
