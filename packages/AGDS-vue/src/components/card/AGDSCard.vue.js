import { computed, provide, reactive, useSlots } from 'vue';
import { CARD_CONTEXT_KEY } from './cardContext';
const props = withDefaults(defineProps(), {
    as: 'div',
    background: 'body',
    clickable: false,
    footerOutside: false,
    shadow: false,
});
const slots = useSlots();
const hasFooter = computed(() => !!slots.footer);
// Provide reactive context — children (CardInner, CardFooter, CardLink) consume this.
provide(CARD_CONTEXT_KEY, reactive({
    get background() {
        return props.background;
    },
    get clickable() {
        return props.clickable;
    },
    get hasFooter() {
        return hasFooter.value;
    },
    get footerOutside() {
        return props.footerOutside;
    },
    get shadow() {
        return props.shadow;
    },
}));
// Classes applied to whichever element carries the card's visual treatment
// (root when !footerOutside, inner-wrap div when footerOutside).
const styledClasses = computed(() => [
    `ausgov-card--${props.background}`,
    props.shadow && 'ausgov-card--shadow',
    props.clickable && 'ausgov-card--clickable',
]);
const __VLS_defaults = {
    as: 'div',
    background: 'body',
    clickable: false,
    footerOutside: false,
    shadow: false,
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
/** @type {__VLS_StyleScopedClasses['ausgov-card--body']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card--body-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card--shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card--clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-card--clickable']} */ ;
if (props.footerOutside) {
    const __VLS_0 = (props.as);
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ class: "ausgov-card ausgov-card--footer-outside" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "ausgov-card ausgov-card--footer-outside" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    /** @type {__VLS_StyleScopedClasses['ausgov-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-card--footer-outside']} */ ;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-card__wrap" },
        ...{ class: (__VLS_ctx.styledClasses) },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-card__wrap']} */ ;
    var __VLS_7 = {};
    var __VLS_9 = {};
    var __VLS_11 = {};
    // @ts-ignore
    [styledClasses,];
    var __VLS_3;
}
else {
    const __VLS_13 = (props.as);
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ class: "ausgov-card" },
        ...{ class: (__VLS_ctx.styledClasses) },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "ausgov-card" },
        ...{ class: (__VLS_ctx.styledClasses) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_18 = {};
    /** @type {__VLS_StyleScopedClasses['ausgov-card']} */ ;
    const { default: __VLS_19 } = __VLS_16.slots;
    var __VLS_20 = {};
    var __VLS_22 = {};
    var __VLS_24 = {};
    // @ts-ignore
    [styledClasses,];
    var __VLS_16;
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9, __VLS_12 = __VLS_11, __VLS_21 = __VLS_20, __VLS_23 = __VLS_22, __VLS_25 = __VLS_24;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
