import { computed } from 'vue';
import AgDSStack from '../stack/AGDSStack.vue';
import AgDSHeading from '../heading/AGDSHeading.vue';
import AgDSText from '../text/AGDSText.vue';
import AGDSTaskListItem from './AGDSTaskListItem.vue';
const props = withDefaults(defineProps(), {
    ordered: false,
});
const DONE_STATUSES = ['done', 'doneRecently'];
const tasksCompleted = computed(() => props.items.filter(({ status }) => DONE_STATUSES.includes(status)).length);
const __VLS_defaults = {
    ordered: false,
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
const __VLS_0 = AgDSStack || AgDSStack;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    gap: (3),
    ...{ class: "agds-task-list" },
}));
const __VLS_2 = __VLS_1({
    gap: (3),
    ...{ class: "agds-task-list" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-task-list']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
const __VLS_7 = AgDSStack || AgDSStack;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    gap: (2),
}));
const __VLS_9 = __VLS_8({
    gap: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
const __VLS_13 = AgDSHeading || AgDSHeading;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    type: "h2",
}));
const __VLS_15 = __VLS_14({
    type: "h2",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
var __VLS_16;
const __VLS_19 = AgDSText || AgDSText;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    as: "p",
    color: "muted",
    fontSize: "sm",
}));
const __VLS_21 = __VLS_20({
    as: "p",
    color: "muted",
    fontSize: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
(__VLS_ctx.tasksCompleted);
(__VLS_ctx.items.length);
// @ts-ignore
[tasksCompleted, items,];
var __VLS_22;
// @ts-ignore
[];
var __VLS_10;
const __VLS_25 = (__VLS_ctx.ordered ? 'ol' : 'ul');
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ class: "agds-task-list__items" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "agds-task-list__items" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['agds-task-list__items']} */ ;
const { default: __VLS_30 } = __VLS_28.slots;
for (const [item, index] of __VLS_vFor((__VLS_ctx.items))) {
    const __VLS_31 = AGDSTaskListItem || AGDSTaskListItem;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        key: (index),
        status: (item.status),
        message: (item.message),
        ordered: (__VLS_ctx.ordered),
        href: (item.href),
        type: (item.type),
        disabled: (item.disabled),
    }));
    const __VLS_33 = __VLS_32({
        key: (index),
        status: (item.status),
        message: (item.message),
        ordered: (__VLS_ctx.ordered),
        href: (item.href),
        type: (item.type),
        disabled: (item.disabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    (item.label);
    // @ts-ignore
    [items, ordered, ordered,];
    var __VLS_34;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_28;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
