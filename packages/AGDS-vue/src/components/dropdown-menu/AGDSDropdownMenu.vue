<script setup lang="ts">
import { ref, computed, provide, nextTick, getCurrentInstance } from 'vue'
import { DROPDOWN_MENU_KEY } from './dropdownMenuContext'
import type { DropdownMenuPopoverPlacement } from './dropdownMenuContext'

export interface AgDSDropdownMenuProps {
  /** Placement of the dropdown panel relative to the trigger */
  popoverPlacement?: DropdownMenuPopoverPlacement
  /** Maximum height of the panel in pixels */
  popoverMaxHeight?: number
  /** Gap between trigger and panel in pixels */
  popoverOffset?: number
}

const props = withDefaults(defineProps<AgDSDropdownMenuProps>(), {
  popoverPlacement: 'bottom-start',
  popoverOffset: 8,
})

const uid = getCurrentInstance()?.uid ?? 0
const menuId = `agds-dropdown-menu-${uid}`
const buttonId = `${menuId}-button`
const panelId = `${menuId}-panel`

// Raw state
const isMenuOpenRaw = ref(false)
const activeDescendantIndex = ref(-1)
const descendantNodes = ref<NodeListOf<HTMLElement> | undefined>(undefined)
const descendantCount = ref(0)
const descendantSearchTerm = ref('')
const lastKeyPressTime = ref(0)
const pendingOpenKey = ref<string | undefined>(undefined)

const isMenuOpen = computed(() => isMenuOpenRaw.value)
const activeDescendantId = computed(() => descendantNodes.value?.[activeDescendantIndex.value]?.id)

const panelRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)

function openMenu() {
  isMenuOpenRaw.value = true
}

function closeMenu() {
  isMenuOpenRaw.value = false
  activeDescendantIndex.value = -1
  descendantNodes.value = undefined
  descendantCount.value = 0
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
  pendingOpenKey.value = undefined
  nextTick(() => triggerRef.value?.focus())
}

function toggleMenu() {
  isMenuOpenRaw.value ? closeMenu() : openMenu()
}

function openMenuWithKey(key: string) {
  pendingOpenKey.value = key
  openMenu()
}

function getPendingOpenKey() { return pendingOpenKey.value }
function clearPendingOpenKey() { pendingOpenKey.value = undefined }

function setDescendantNodes(nodes: NodeListOf<HTMLElement> | undefined) {
  descendantNodes.value = nodes
  descendantCount.value = nodes?.length ?? 0
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
}

function goToFirstMenuItem() {
  activeDescendantIndex.value = 0
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
}

function goToLastMenuItem() {
  activeDescendantIndex.value = descendantCount.value - 1
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
}

function goToNextMenuItem() {
  const c = activeDescendantIndex.value
  const n = descendantCount.value
  activeDescendantIndex.value = c < n - 1 ? c + 1 : 0
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
}

function goToPreviousMenuItem() {
  const c = activeDescendantIndex.value
  const n = descendantCount.value
  activeDescendantIndex.value = c > 0 ? c - 1 : n - 1
  descendantSearchTerm.value = ''
  lastKeyPressTime.value = 0
}

function clickSelectedItem() {
  if (activeDescendantIndex.value === -1) return
  const node = descendantNodes.value?.[activeDescendantIndex.value]
  node?.click()
  closeMenu()
}

function updateDescendantSearchTerm(key: string) {
  const now = Date.now()
  const quick = now - lastKeyPressTime.value < 350
  const newTerm = quick
    ? descendantSearchTerm.value + key.toLowerCase()
    : key.toLowerCase()

  const currentIndex = activeDescendantIndex.value >= 0 ? activeDescendantIndex.value : -1
  const offset = quick ? 0 : 1

  const items = Array.from(descendantNodes.value ?? []).map((n) =>
    (n.textContent ?? '').toLowerCase().replace(/(\r\n|\n|\r)/gm, '').trim()
  )
  const reOrdered = items.slice(currentIndex + offset).concat(items.slice(0, currentIndex + offset))
  const match = reOrdered.find((i) => i.startsWith(newTerm))
  const matchIndex = match ? items.indexOf(match) : currentIndex

  descendantSearchTerm.value = newTerm
  activeDescendantIndex.value = matchIndex
  lastKeyPressTime.value = now
}

provide(DROPDOWN_MENU_KEY, {
  isMenuOpen,
  menuId,
  buttonId,
  panelId,
  activeDescendantId,
  openMenu,
  closeMenu,
  toggleMenu,
  openMenuWithKey,
  getPendingOpenKey,
  clearPendingOpenKey,
  goToFirstMenuItem,
  goToLastMenuItem,
  goToNextMenuItem,
  goToPreviousMenuItem,
  clickSelectedItem,
  updateDescendantSearchTerm,
  setDescendantNodes,
  panelRef,
  triggerRef,
  popoverPlacement: props.popoverPlacement,
  popoverMaxHeight: props.popoverMaxHeight,
  popoverOffset: props.popoverOffset,
})
</script>

<template>
  <div class="agds-dropdown-menu">
    <slot :is-menu-open="isMenuOpen" />
  </div>
</template>

<style scoped>
.agds-dropdown-menu {
  position: relative;
  display: inline-block;
}
</style>
