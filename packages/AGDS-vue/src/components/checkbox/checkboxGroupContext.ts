import type { InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  messageId?: string
}

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroup')
