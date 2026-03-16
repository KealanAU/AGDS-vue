import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue';
import { useDropdownMenuContext } from './dropdownMenuContext';
const { isMenuOpen, panelId, buttonId, activeDescendantId, popoverPlacement, popoverMaxHeight, popoverOffset, panelRef, triggerRef, setDescendantNodes, closeMenu, goToPreviousMenuItem, goToNextMenuItem, goToFirstMenuItem, goToLastMenuItem, clickSelectedItem, updateDescendantSearchTerm, getPendingOpenKey, clearPendingOpenKey, } = useDropdownMenuContext();
const panelEl = ref(null);
// Keep context panelRef in sync
watch(panelEl, (el) => { panelRef.value = el; });
// On open: query items, focus panel, apply pending key
watch(isMenuOpen, async (open) => {
    if (!open)
        return;
    await nextTick();
    const nodes = panelEl.value?.querySelectorAll('[role="menuitem"], [role="menuitemradio"]');
    setDescendantNodes(nodes);
    panelEl.value?.focus({ preventScroll: true });
    const key = getPendingOpenKey();
    clearPendingOpenKey();
    if (key === 'ArrowUp') {
        goToLastMenuItem();
    }
    else if (key) {
        goToFirstMenuItem();
    }
});
// Click-outside to close
function handleDocumentClick(event) {
    if (!isMenuOpen.value)
        return;
    const target = event.target;
    if (panelEl.value?.contains(target) || triggerRef.value?.contains(target))
        return;
    closeMenu();
}
onMounted(() => document.addEventListener('click', handleDocumentClick, true));
onUnmounted(() => document.removeEventListener('click', handleDocumentClick, true));
function handleKeydown(event) {
    switch (event.code) {
        case 'ArrowUp':
            event.preventDefault();
            goToPreviousMenuItem();
            break;
        case 'ArrowDown':
            event.preventDefault();
            goToNextMenuItem();
            break;
        case 'Home':
            event.preventDefault();
            goToFirstMenuItem();
            break;
        case 'End':
            event.preventDefault();
            goToLastMenuItem();
            break;
        case 'Escape':
            event.preventDefault();
            closeMenu();
            break;
        case 'Enter':
        case 'Space':
            event.preventDefault();
            clickSelectedItem();
            break;
        case 'Tab':
            closeMenu();
            break;
        default:
            if (/^[a-zA-Z]$/.test(event.key) && !event.metaKey && !event.ctrlKey) {
                event.preventDefault();
                updateDescendantSearchTerm(event.key);
            }
    }
}
const panelStyle = computed(() => ({
    top: `calc(100% + ${popoverOffset}px)`,
    maxHeight: popoverMaxHeight ? `${popoverMaxHeight}px` : undefined,
}));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-dropdown-menu__panel']} */ ;
if (!__VLS_ctx.isMenuOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        id: (__VLS_ctx.panelId),
        ...{ class: "agds-dropdown-menu__placeholder" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-dropdown-menu__placeholder']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onKeydown: (__VLS_ctx.handleKeydown) },
        ref: "panelEl",
        id: (__VLS_ctx.panelId),
        role: "menu",
        tabindex: "-1",
        'aria-labelledby': (__VLS_ctx.buttonId),
        'aria-activedescendant': (__VLS_ctx.activeDescendantId ?? undefined),
        ...{ class: ([
                'agds-dropdown-menu__panel',
                `agds-dropdown-menu__panel--${__VLS_ctx.popoverPlacement}`,
            ]) },
        ...{ style: (__VLS_ctx.panelStyle) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-dropdown-menu__panel']} */ ;
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[isMenuOpen, panelId, panelId, handleKeydown, buttonId, activeDescendantId, popoverPlacement, panelStyle,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
