import { inject } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * Where the dropdown panel is positioned relative to its trigger button.
 *
 * - `'bottom'` — Centered below the trigger.
 * - `'bottom-start'` — Left-aligned with the trigger's start edge (default for LTR layouts).
 * - `'bottom-end'` — Right-aligned with the trigger's end edge.
 */
export type DropdownMenuPopoverPlacement = 'bottom' | 'bottom-start' | 'bottom-end'

export interface DropdownMenuContextValue {
  /**
   * Reka UI handles open state internally via DropdownMenuRoot.
   * These placement props are passed through to DropdownMenuContent.
   */
  popoverPlacement: DropdownMenuPopoverPlacement
  popoverMaxHeight?: number
  popoverOffset: number
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContextValue> = Symbol('DropdownMenu')

export function useDropdownMenuContext(): DropdownMenuContextValue {
  const ctx = inject(DROPDOWN_MENU_KEY)
  if (!ctx) throw new Error('useDropdownMenuContext must be called within AGDSDropdownMenu')
  return ctx
}
