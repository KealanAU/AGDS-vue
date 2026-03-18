export { default as AGDSCore } from './AusGovCore.vue'
export type { AGDSCoreProps } from './AusGovCore.vue'

export { default as AGDSCoreProvider } from './CoreProvider.vue'
export type { AGDSCoreProviderProps } from './CoreProvider.vue'

export {
  boxPalette,
  boxPalettes,
  useBoxPalette,
  type BoxPalette,
} from './boxPalette'

export { CORE_CONTEXT_KEY } from './coreContext'
export type { CoreContext, LinkProps, NativeLinkProps } from './coreContext'

export { goldTheme } from './goldTheme'
export { printTheme } from './printTheme'
export { packs, print, fontGrid } from './packs'

export {
  breakpointNames,
  mapResponsiveProp,
  mediaQueryMin,
  type ResponsiveProp,
} from './responsive'

export { mergeTheme, themeVars, themeToVars, type Theme } from './theme'

export {
  mapSpacing,
  tokens,
  type BackgroundVariant,
  type BorderWidth,
  type FieldMaxWidth,
  type Font,
  type FontSize,
  type FontWeight,
  type LineHeight,
  type MaxWidth,
  type Shadow,
  type Spacing,
  type ZIndex,
} from './tokens'
