import { ref, computed, provide } from 'vue';
import { APP_LAYOUT_KEY } from './appLayoutContext';
const props = withDefaults(defineProps(), {
    focusMode: false,
});
const isMobileMenuOpen = ref(false);
const focusModeComputed = computed(() => props.focusMode);
function openMobileMenu() {
    isMobileMenuOpen.value = true;
}
function closeMobileMenu() {
    isMobileMenuOpen.value = false;
}
provide(APP_LAYOUT_KEY, {
    focusMode: focusModeComputed,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
});
const __VLS_defaults = {
    focusMode: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout__sidebar-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-app-layout" },
    ...{ class: ({ 'ausgov-app-layout--focus-mode': __VLS_ctx.focusMode }) },
});
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout--focus-mode']} */ ;
var __VLS_0 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-app-layout__body" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-app-layout__sidebar-col" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout__sidebar-col']} */ ;
var __VLS_2 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ausgov-app-layout__main" },
});
/** @type {__VLS_StyleScopedClasses['ausgov-app-layout__main']} */ ;
var __VLS_4 = {};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
// @ts-ignore
[focusMode,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
