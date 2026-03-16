import type { InjectionKey } from 'vue'

export interface ControlGroupContext {
  /** Whether the group is in an invalid state */
  invalid?: boolean
  /** The id of the error message element (only set when invalid + message exist) */
  messageId?: string
  /** Shared name attribute applied to every control in the group */
  name?: string
  /** Whether every control in the group is required */
  required?: boolean
}

export const CONTROL_GROUP_KEY: InjectionKey<ControlGroupContext> = Symbol('ControlGroup')
