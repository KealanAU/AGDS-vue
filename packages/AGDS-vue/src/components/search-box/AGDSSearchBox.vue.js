import AGDSFlex from '../flex/AGDSFlex.vue';
const props = withDefaults(defineProps(), {
    ariaLabel: 'Sitewide',
});
const emit = defineEmits();
const __VLS_defaults = {
    ariaLabel: 'Sitewide',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.emit('submit', $event);
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "agds-search-box" },
    role: "search",
    'aria-label': (props.ariaLabel),
});
/** @type {__VLS_StyleScopedClasses['agds-search-box']} */ ;
const __VLS_0 = AGDSFlex || AGDSFlex;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    alignItems: "flex-end",
}));
const __VLS_2 = __VLS_1({
    alignItems: "flex-end",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_6 = {};
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_7 = __VLS_6;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
