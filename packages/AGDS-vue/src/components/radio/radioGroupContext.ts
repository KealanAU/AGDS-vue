import type { InjectionKey } from 'vue'

export interface RadioGroupContext {
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  messageId?: string
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('RadioGroup')
