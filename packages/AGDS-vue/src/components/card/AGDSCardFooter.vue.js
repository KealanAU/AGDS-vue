import { inject } from 'vue';
import { CARD_CONTEXT_KEY } from './cardContext';
const props = defineProps();
const context = inject(CARD_CONTEXT_KEY);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.context?.footerOutside) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([
                'agds-card-footer agds-card-footer--outside',
                props.background && `agds-card-footer--${props.background}`,
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-card-footer']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-card-footer--outside']} */ ;
    var __VLS_0 = {};
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ([
                'agds-card-footer',
                props.background && `agds-card-footer--${props.background}`,
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-card-footer']} */ ;
    var __VLS_2 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[context,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
