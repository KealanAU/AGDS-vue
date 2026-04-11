import { type InjectionKey } from 'vue'

/**
 * Vertical spacing applied above and below a content band.
 *
 * - `'none'` — No top/bottom padding; used for flush-edge layouts or when spacing is controlled externally.
 * - `'section'` — Standard section padding (`--agds-space-section`); separates related content groups.
 * - `'page'` — Larger page-level padding (`--agds-space-page`); used for top-level page sections.
 */
export type ContentSpacing = 'none' | 'section' | 'page'

export const CONTENT_SPACING_KEY: InjectionKey<ContentSpacing> = Symbol('AGDSContentSpacing')
