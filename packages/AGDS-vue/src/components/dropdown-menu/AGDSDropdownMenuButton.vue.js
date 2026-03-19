import { ref, onMounted } from 'vue';
import { useDropdownMenuContext } from './dropdownMenuContext';
const __VLS_props = withDefaults(defineProps(), {
    variant: 'text',
    size: 'md',
    block: false,
    disabled: false,
});
const { isMenuOpen, buttonId, panelId, toggleMenu, openMenuWithKey, triggerRef } = useDropdownMenuContext();
const buttonEl = ref(null);
onMounted(() => {
    triggerRef.value = buttonEl.value;
});
function handleClick() {
    buttonEl.value?.focus();
    toggleMenu();
}
function handleKeydown(event) {
    const supported = ['ArrowDown', 'ArrowUp', 'Space', 'Enter'];
    if (!supported.includes(event.code))
        return;
    event.preventDefault();
    openMenuWithKey(event.code);
}
const __VLS_defaults = {
    variant: 'text',
    size: 'md',
    block: false,
    disabled: false,
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
/** @type {__VLS_StyleScopedClasses['agds-button--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button--tertiary']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button--text']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onKeydown: (__VLS_ctx.handleKeydown) },
    ref: "buttonEl",
    id: (__VLS_ctx.buttonId),
    type: "button",
    disabled: (__VLS_ctx.disabled),
    'aria-haspopup': (true),
    'aria-controls': (__VLS_ctx.panelId),
    'aria-expanded': (__VLS_ctx.isMenuOpen),
    ...{ class: ([
            'agds-button',
            `agds-button--${__VLS_ctx.variant}`,
            `agds-button--${__VLS_ctx.size}`,
            { 'agds-button--block': __VLS_ctx.block },
            'agds-dropdown-menu-btn',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['agds-button']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-button--block']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-button__label agds-dropdown-menu-btn__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-button__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu-btn__label']} */ ;
var __VLS_0 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    'aria-hidden': "true",
    ...{ class: "agds-dropdown-menu-btn__chevron" },
    ...{ class: ({ 'agds-dropdown-menu-btn__chevron--open': __VLS_ctx.isMenuOpen }) },
});
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu-btn__chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu-btn__chevron--open']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'aria-hidden': "true",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
    points: "6 9 12 15 18 9",
});
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[handleClick, handleKeydown, buttonId, disabled, panelId, isMenuOpen, isMenuOpen, variant, size, block,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
