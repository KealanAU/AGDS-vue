import { computed, inject } from 'vue';
import { CARD_CONTEXT_KEY } from './cardContext';
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps(), {
    as: 'a',
});
const context = inject(CARD_CONTEXT_KEY);
// When the parent Card is clickable, the link's ::after covers the whole card.
// The parent card itself handles the focus ring, so the link suppresses its own.
const isClickable = computed(() => !!context?.clickable);
const __VLS_defaults = {
    as: 'a',
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
/** @type {__VLS_StyleScopedClasses['ausgov-card-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card-link']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card-link--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card-link--clickable']} */ ;
const __VLS_0 = (props.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: ([
            'ausgov-card-link',
            __VLS_ctx.isClickable && 'ausgov-card-link--clickable',
        ]) },
}));
const __VLS_2 = __VLS_1({
    ...{ class: ([
            'ausgov-card-link',
            __VLS_ctx.isClickable && 'ausgov-card-link--clickable',
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
(__VLS_ctx.$attrs);
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-card-link']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[isClickable, $attrs,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
