import { inject } from 'vue'
import type { InjectionKey, Ref, ComputedRef } from 'vue'

export type DropdownMenuPopoverPlacement = 'bottom' | 'bottom-start' | 'bottom-end'

export interface DropdownMenuContextValue {
  isMenuOpen: ComputedRef<boolean>
  menuId: string
  buttonId: string
  panelId: string
  activeDescendantId: ComputedRef<string | undefined>
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  openMenuWithKey: (key: string) => void
  getPendingOpenKey: () => string | undefined
  clearPendingOpenKey: () => void
  goToFirstMenuItem: () => void
  goToLastMenuItem: () => void
  goToNextMenuItem: () => void
  goToPreviousMenuItem: () => void
  clickSelectedItem: () => void
  updateDescendantSearchTerm: (key: string) => void
  setDescendantNodes: (nodes: NodeListOf<HTMLElement> | undefined) => void
  panelRef: Ref<HTMLElement | null>
  triggerRef: Ref<HTMLButtonElement | null>
  popoverPlacement: DropdownMenuPopoverPlacement
  popoverMaxHeight?: number
  popoverOffset: number
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContextValue> = Symbol('DropdownMenu')

export function useDropdownMenuContext(): DropdownMenuContextValue {
  const ctx = inject(DROPDOWN_MENU_KEY)
  if (!ctx) throw new Error('useDropdownMenuContext must be called within AgDSDropdownMenu')
  return ctx
}
