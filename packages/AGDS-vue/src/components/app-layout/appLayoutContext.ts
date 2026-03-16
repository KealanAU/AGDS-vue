import { inject } from 'vue'
import type { InjectionKey, Ref, ComputedRef } from 'vue'

export interface AppLayoutContextValue {
  focusMode: ComputedRef<boolean>
  isMobileMenuOpen: Ref<boolean>
  openMobileMenu: () => void
  closeMobileMenu: () => void
}

export const APP_LAYOUT_KEY: InjectionKey<AppLayoutContextValue> = Symbol('AppLayout')

export function useAppLayoutContext(): AppLayoutContextValue {
  const ctx = inject(APP_LAYOUT_KEY)
  if (!ctx) throw new Error('useAppLayoutContext must be called within AgDSAppLayout')
  return ctx
}
