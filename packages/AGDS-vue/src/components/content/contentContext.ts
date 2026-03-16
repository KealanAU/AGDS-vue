import { type InjectionKey } from 'vue'

export type ContentSpacing = 'none' | 'section' | 'page'

export const CONTENT_SPACING_KEY: InjectionKey<ContentSpacing> = Symbol('AgDSContentSpacing')
