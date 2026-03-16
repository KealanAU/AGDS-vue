import { type InjectionKey } from 'vue'

/** Current nesting depth — 0 means "not inside any list" */
export const LIST_DEPTH_KEY: InjectionKey<number> = Symbol('AgDSListDepth')
