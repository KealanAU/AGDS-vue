import { type InjectionKey } from 'vue'

export interface TableContext {
  tableLayout: 'auto' | 'fixed'
}

export const TABLE_CONTEXT_KEY: InjectionKey<TableContext> = Symbol('AGDSTable')
