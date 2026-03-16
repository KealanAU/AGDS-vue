import { computed } from 'vue';
import AppLayoutSidebarNavItem from './AppLayoutSidebarNavItem.vue';
import { getGroupItems, getGroupOptions, } from './appLayoutTypes';
const props = withDefaults(defineProps(), {
    subLevelVisible: 'whenActive',
    background: 'bodyAlt',
});
const emit = defineEmits();
// Normalise groups into arrays of items + divider metadata
const groups = computed(() => props.items.map((group) => ({
    items: getGroupItems(group),
    options: getGroupOptions(group),
})));
const __VLS_defaults = {
    subLevelVisible: 'whenActive',
    background: 'bodyAlt',
};
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
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    'aria-label': "Main",
    ...{ class: "ausgov-alsnav" },
    'aria-labelledby': "ausgov-alsnav-label",
});
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    id: "ausgov-alsnav-label",
    ...{ class: "sr-only" },
});
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "ausgov-alsnav__list" },
    role: "list",
});
/** @type {__VLS_StyleScopedClasses['ausgov-alsnav__list']} */ ;
for (const [group, gi] of __VLS_vFor((__VLS_ctx.groups))) {
    (gi);
    if (gi > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ class: "ausgov-alsnav__divider-item" },
            ...{ class: ({
                    'ausgov-alsnav__divider-item--no-top': __VLS_ctx.groups[gi - 1].options?.disableGroupPadding,
                    'ausgov-alsnav__divider-item--no-bottom': group.options?.disableGroupPadding,
                }) },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav__divider-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav__divider-item--no-top']} */ ;
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav__divider-item--no-bottom']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.hr)({
            ...{ class: "ausgov-alsnav__divider" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-alsnav__divider']} */ ;
    }
    for (const [item, ii] of __VLS_vFor((group.items))) {
        const __VLS_0 = AppLayoutSidebarNavItem;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onClose': {} },
            key: (ii),
            item: (item),
            activePath: (__VLS_ctx.activePath),
            level: (1),
            subLevelVisible: (__VLS_ctx.subLevelVisible),
            background: (__VLS_ctx.background),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onClose': {} },
            key: (ii),
            item: (item),
            activePath: (__VLS_ctx.activePath),
            level: (1),
            subLevelVisible: (__VLS_ctx.subLevelVisible),
            background: (__VLS_ctx.background),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = ({ close: {} },
            { onClose: (...[$event]) => {
                    __VLS_ctx.emit('close');
                    // @ts-ignore
                    [groups, groups, activePath, subLevelVisible, background, emit,];
                } });
        var __VLS_3;
        var __VLS_4;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
