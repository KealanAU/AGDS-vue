import { ref } from 'vue';
import AusGovTag from './AGDSTag.vue';
const __VLS_props = defineProps();
const emit = defineEmits();
const listRef = ref(null);
/**
 * Focus management on remove.
 * Moves focus to the previous remove button (or to the first one when
 * the first tag is removed) before emitting so consumers see the focus
 * change before they mutate the items array.
 */
function onTagRemove(index, event) {
    const buttons = listRef.value?.querySelectorAll('.ausgov-tag__remove');
    if (buttons?.length) {
        const targetIndex = Math.max(0, index - 1);
        buttons[targetIndex]?.focus();
    }
    emit('remove', index, event);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-tags" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-tags']} */ ;
var __VLS_0 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ref: "listRef",
    ...{ class: "ausgov-tags__list" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-tags__list']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.items))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (index),
        ...{ class: "ausgov-tags__item" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-tags__item']} */ ;
    const __VLS_2 = AusGovTag;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
        ...{ 'onRemove': {} },
        label: (item.label),
        href: (item.href),
        removable: (item.removable),
    }));
    const __VLS_4 = __VLS_3({
        ...{ 'onRemove': {} },
        label: (item.label),
        href: (item.href),
        removable: (item.removable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_7;
    const __VLS_8 = ({ remove: {} },
        { onRemove: (...[$event]) => {
                __VLS_ctx.onTagRemove(index, $event);
                // @ts-ignore
                [items, onTagRemove,];
            } });
    var __VLS_5;
    var __VLS_6;
    // @ts-ignore
    [];
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
