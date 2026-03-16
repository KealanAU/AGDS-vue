<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useDropdownMenuContext } from './dropdownMenuContext'

const {
  isMenuOpen,
  panelId,
  buttonId,
  activeDescendantId,
  popoverPlacement,
  popoverMaxHeight,
  popoverOffset,
  panelRef,
  triggerRef,
  setDescendantNodes,
  closeMenu,
  goToPreviousMenuItem,
  goToNextMenuItem,
  goToFirstMenuItem,
  goToLastMenuItem,
  clickSelectedItem,
  updateDescendantSearchTerm,
  getPendingOpenKey,
  clearPendingOpenKey,
} = useDropdownMenuContext()

const panelEl = ref<HTMLElement | null>(null)

// Keep context panelRef in sync
watch(panelEl, (el) => { panelRef.value = el })

// On open: query items, focus panel, apply pending key
watch(isMenuOpen, async (open) => {
  if (!open) return
  await nextTick()
  const nodes = panelEl.value?.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemradio"]')
  setDescendantNodes(nodes)
  panelEl.value?.focus({ preventScroll: true })
  const key = getPendingOpenKey()
  clearPendingOpenKey()
  if (key === 'ArrowUp') {
    goToLastMenuItem()
  } else if (key) {
    goToFirstMenuItem()
  }
})

// Click-outside to close
function handleDocumentClick(event: MouseEvent) {
  if (!isMenuOpen.value) return
  const target = event.target as Node
  if (panelEl.value?.contains(target) || triggerRef.value?.contains(target)) return
  closeMenu()
}

onMounted(() => document.addEventListener('click', handleDocumentClick, true))
onUnmounted(() => document.removeEventListener('click', handleDocumentClick, true))

function handleKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case 'ArrowUp':
      event.preventDefault()
      goToPreviousMenuItem()
      break
    case 'ArrowDown':
      event.preventDefault()
      goToNextMenuItem()
      break
    case 'Home':
      event.preventDefault()
      goToFirstMenuItem()
      break
    case 'End':
      event.preventDefault()
      goToLastMenuItem()
      break
    case 'Escape':
      event.preventDefault()
      closeMenu()
      break
    case 'Enter':
    case 'Space':
      event.preventDefault()
      clickSelectedItem()
      break
    case 'Tab':
      closeMenu()
      break
    default:
      if (/^[a-zA-Z]$/.test(event.key) && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        updateDescendantSearchTerm(event.key)
      }
  }
}

const panelStyle = computed(() => ({
  top: `calc(100% + ${popoverOffset}px)`,
  maxHeight: popoverMaxHeight ? `${popoverMaxHeight}px` : undefined,
}))
</script>

<template>
  <!-- Placeholder keeps aria-controls valid when closed -->
  <div
    v-if="!isMenuOpen"
    :id="panelId"
    class="agds-dropdown-menu__placeholder"
  />
  <div
    v-else
    ref="panelEl"
    :id="panelId"
    role="menu"
    tabindex="-1"
    :aria-labelledby="buttonId"
    :aria-activedescendant="activeDescendantId ?? undefined"
    :class="[
      'agds-dropdown-menu__panel',
      `agds-dropdown-menu__panel--${popoverPlacement}`,
    ]"
    :style="panelStyle"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<style scoped>
.agds-dropdown-menu__placeholder {
  position: absolute;
  pointer-events: none;
}

.agds-dropdown-menu__panel {
  position: absolute;
  z-index: var(--agds-z-dropdown);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  box-shadow: var(--agds-shadow-md);
  overflow-y: auto;
  min-width: 18rem;
  padding-block: var(--agds-space-1);
  outline: none;
}

.agds-dropdown-menu__panel:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-dropdown-menu__panel--bottom-start { left: 0; }
.agds-dropdown-menu__panel--bottom-end { right: 0; }
.agds-dropdown-menu__panel--bottom { left: 50%; transform: translateX(-50%); }
</style>
