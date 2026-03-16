import { computed, ref, watch, getCurrentInstance } from 'vue';
import { useDropdownMenuContext } from './dropdownMenuContext';
const props = defineProps();
const emit = defineEmits();
const { menuId, activeDescendantId, closeMenu } = useDropdownMenuContext();
const uid = getCurrentInstance()?.uid ?? 0;
const itemId = computed(() => props.id ?? `${menuId}-item-${uid}`);
const isActive = computed(() => itemId.value === activeDescendantId.value);
const isExternal = computed(() => props.target === '_blank');
const itemEl = ref(null);
watch(isActive, (active) => {
    if (active && typeof itemEl.value?.scrollIntoView === 'function') {
        itemEl.value.scrollIntoView({ block: 'nearest' });
    }
});
function handleClick(event) {
    emit('click', event);
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
/** @type {__VLS_StyleScopedClasses['agds-dm-item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-item--active']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-item__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-item__label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ref: "itemEl",
    id: (__VLS_ctx.itemId),
    href: (__VLS_ctx.href),
    target: (__VLS_ctx.target),
    rel: (__VLS_ctx.isExternal ? 'noopener noreferrer' : undefined),
    role: "menuitem",
    tabindex: "-1",
    ...{ class: (['agds-dm-item', { 'agds-dm-item--active': __VLS_ctx.isActive }]) },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-item']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dm-item--active']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-dm-item__content" },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-item__content']} */ ;
if (__VLS_ctx.icon) {
    const __VLS_0 = (__VLS_ctx.icon);
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ class: "agds-dm-item__icon" },
        'aria-hidden': "true",
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "agds-dm-item__icon" },
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['agds-dm-item__icon']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-dm-item__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-dm-item__label']} */ ;
var __VLS_5 = {};
if (__VLS_ctx.isExternal) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
if (__VLS_ctx.$slots.endElement) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-dm-item__end" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-dm-item__end']} */ ;
    var __VLS_7 = {};
}
// @ts-ignore
var __VLS_6 = __VLS_5, __VLS_8 = __VLS_7;
// @ts-ignore
[handleClick, itemId, href, target, isExternal, isExternal, isActive, icon, icon, $slots,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
