import { inject } from 'vue';
import { TabsContent } from 'reka-ui';
const props = defineProps();
const contained = inject('tabsContained', true);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-tab-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tab-panel']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.TabsContent | typeof __VLS_components.TabsContent} */
TabsContent;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    value: (props.value),
    ...{ class: ([
            'agds-tab-panel',
            __VLS_ctx.contained ? 'agds-tab-panel--contained' : 'agds-tab-panel--edge',
        ]) },
}));
const __VLS_2 = __VLS_1({
    value: (props.value),
    ...{ class: ([
            'agds-tab-panel',
            __VLS_ctx.contained ? 'agds-tab-panel--contained' : 'agds-tab-panel--edge',
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['agds-tab-panel']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[contained,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
