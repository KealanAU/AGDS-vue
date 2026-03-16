import { inject, computed } from 'vue';
import { CONTENT_SPACING_KEY } from './contentContext';
const props = withDefaults(defineProps(), {});
const spacing = inject(CONTENT_SPACING_KEY, 'none');
const classes = computed(() => {
    const cls = ['ausgov-content-bleed'];
    if (spacing !== 'none') {
        cls.push(`ausgov-content-bleed--${spacing}`);
    }
    const v = props.visible;
    if (v === false) {
        cls.push('ausgov-content-bleed--no-bleed');
    }
    else if (v !== null && v !== undefined && typeof v === 'object') {
        if (v.xs === false)
            cls.push('ausgov-content-bleed--no-bleed-xs');
        if (v.md === false)
            cls.push('ausgov-content-bleed--no-bleed-md');
    }
    return cls;
});
const __VLS_defaults = {};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-content-bleed--section']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-content-bleed--page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.classes) },
});
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[classes,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
