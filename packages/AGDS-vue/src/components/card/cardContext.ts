import { type InjectionKey } from 'vue'

export interface CardContext {
  background: 'body' | 'bodyAlt'
  clickable: boolean
  hasFooter: boolean
  footerOutside: boolean
  shadow: boolean
}

export const CARD_CONTEXT_KEY: InjectionKey<CardContext> = Symbol('AGDSCard')
