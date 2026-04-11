# Changelog

All notable changes to `agds-vue` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Breaking change convention

A change is **breaking** (requires a major version bump) if it can cause a
consumer's code to fail to compile or behave differently at runtime without
any change on their part. Concretely, the following are always breaking:

| Category | Examples |
|---|---|
| Prop removed or renamed | `label` → `fieldLabel`, removing `variant` |
| Prop type narrowed | `string` → `'primary' \| 'secondary'` |
| Emitted event removed or renamed | `update:modelValue` → `change` |
| Required prop added | adding `id` as required |
| Named export removed or renamed | `AGDSButton` → `AgDSButton` |
| Slot removed or renamed | default slot → `#content` |
| Significant DOM/class restructure | removing a wrapping element, renaming BEM classes |
| Behavior change that breaks ARIA | focus management, role changes |

Deprecations that are later removed also count as breaking — always add a
`### Deprecated` entry one release before removal.

---

## [2.0.0] — 2026-04-11

### Added

- **GlobalAlert**: new `role` and `ariaLive` props — allows dynamically-injected banners to announce themselves to screen readers without requiring focus movement
- **CI**: test coverage now reported on pull requests via `vitest-coverage-report-action@v2`; CI job gains `pull-requests: write` permission
- New test suites: `AGDSDrawer`, `AGDSModal`, `AGDSGlobalAlert`, `AGDSPageAlert`, `AGDSSectionAlert`, `AGDSLoadingBlanket`, `AGDSVisuallyHidden`, `AGDSTextLink`, `AGDSCheckbox`, `AGDSRadio`, `AGDSTabs`, `AGDSTable`, `AGDSSearchBox`, `AGDSFileUpload`, `AGDSAutocomplete`, `AGDSComboboxAsyncMulti`, `AGDSBreadcrumbs`, `AGDSFilterSidebar`, `AGDSAppLayout`
- `--agds-color-accent` design token added (alias of `--agds-color-brand`)
- `@media (prefers-reduced-motion: reduce)` block in `tokens.css` — zeros `--agds-transition-{fast,normal,slow}` tokens so every component that uses them respects the OS motion preference automatically
- **FilterSidebar**: new `#actions` slot — replaces the removed `showClearFilters`/`clearFilters` API with a flexible slot for any action content (e.g. a "Clear filters" button)

### Changed

- **Breaking (token)**: `--agds-color-focus-width` renamed to `--agds-focus-width` — update any custom CSS or component overrides that reference the old name
- **Breaking (FilterSidebar)**: `showClearFilters` prop and `clearFilters` emit removed — use the new `#actions` slot instead (e.g. `<template #actions><AGDSButton variant="text" @click="clear">Clear filters</AGDSButton></template>`)
- `--agds-color-border` darkened from `#d3d3d3` to `#767676` to meet WCAG AA contrast requirements against white backgrounds
- Button size variant styles refactored to use scoped local custom properties (`--_btn-height`, `--_btn-padding-x`, `--_btn-font-size`) instead of direct token references per size class
- CSS auto-imports (`tokens.css`, `base.css`) removed from `index.ts` — consumers must import styles explicitly (e.g. `import 'agds-vue/styles'`)
- JSDoc added to all exported union types across many components for improved IDE tooling and generated documentation
- JSDoc descriptions added to all `defineEmits` event entries and `defineExpose` method entries across 49 components — events now document when they fire and what their payload means; exposed methods document their purpose and when to call them
- **SideNav**: mobile body uses `visibility`/`height` instead of `display:none` — links remain in the accessibility tree so screen readers can navigate to them without triggering the mobile expand interaction

### Fixed

- **Modal**: focus now returns to the trigger element on close, satisfying WCAG 2.4.3 (Focus Order)
- **Button**: `prefers-reduced-motion` — spinner `rotate` animation is now disabled when the OS motion preference is set
- **Button**, **Drawer**, **Modal**, **AppLayoutSidebar**: `forced-colors` (Windows High Contrast Mode) styles added — overlays, panels, and focus rings use system colour keywords so they remain usable in high-contrast themes
- **SideNav**: chevron transition now respects `prefers-reduced-motion: reduce`
- Focus ring `outline` across all affected components updated to reference the renamed `--agds-focus-width` token

---

## [1.0.0] — 2026-04-11

First stable release of `agds-vue`. Implements the Agriculture Design System
(AgDS) component suite as accessible, tree-shakeable Vue 3 components.

### Added

#### Build & distribution
- `unbuild`/`mkdist`-based build producing a single `dist/index.mjs` bundle
  with full TypeScript declaration output (`dist/index.d.ts`)
- Tree-shakeable exports — importing a single component does not pull in the
  full library
- CSS style exports: `agds-vue/styles` (all), `agds-vue/styles/tokens`
  (design tokens only), `agds-vue/styles/base` (base reset)
- Nuxt module at `agds-vue/nuxt` — auto-registers all components and imports
  styles when added to `nuxt.config.ts`
- Vue plugin `AGDSVue` — `app.use(AGDSVue)` globally registers every component

#### Core / theming
- `AGDSCore` — root theming wrapper; applies the gold or custom theme via CSS
  custom properties
- `AGDSCoreProvider` — context-only provider for nested palette overrides
- Design token utilities: `tokens`, `themeVars`, `themeToVars`, `mergeTheme`,
  `goldTheme`, `printTheme`, `packs`, `mapSpacing`, `mapResponsiveProp`,
  `mediaQueryMin`, `fontGrid`, `breakpointNames`, `boxPalette`, `boxPalettes`,
  `useBoxPalette`

#### Layout primitives
- `AGDSBox` — base layout primitive with token-mapped spacing, palette, and
  responsive props
- `AGDSFlex` — flex container with responsive gap/alignment props
- `AGDSColumns` / `AGDSColumn` — CSS grid column system with responsive
  column counts
- `AGDSStack` — vertical stack with token-based gap
- `AGDSFormStack` — vertical stack tuned for form field spacing
- `AGDSContent` / `AGDSSectionContent` / `AGDSPageContent` / `AGDSContentBleed`
  — semantic content containers with max-width and bleed support

#### App layout
- `AGDSAppLayout` — full-page three-zone layout (header / sidebar / main)
- `AGDSAppLayoutHeader` / `AGDSAppLayoutSidebar` / `AGDSAppLayoutSidebarNav`
- `AGDSAppLayoutFooter` / `AGDSAppLayoutFooterDivider`

#### Navigation
- `AGDSMainNav` — primary site navigation with mobile drawer
- `AGDSSideNav` — sidebar navigation tree
- `AGDSCollapsingSideBar` — collapsible sidebar container
- `AGDSFilterSidebar` — sidebar variant for filter panels
- `AGDSSubNav` — secondary tab-style navigation bar
- `AGDSInpageNav` — on-page anchor navigation
- `AGDSBreadcrumbs` / `AGDSBreadcrumbsItem` — breadcrumb trail
- `AGDSLinkList` / `AGDSLinkListItem` — unstyled accessible link list
- `AGDSPagination` / `AGDSPaginationButtons` + `usePagination` composable
- `AGDSProgressIndicator` — multi-step progress bar
- `AGDSTaskList` / `AGDSTaskListItem` — task status list
- `AGDSSkipLinks` — keyboard skip-navigation links

#### Buttons & actions
- `AGDSButton` / `AGDSButtonLink` / `AGDSToggleButton` — primary, secondary,
  tertiary, and destructive variants
- `AGDSCallToActionLink` / `AGDSCallToActionButton`
- `AGDSDirectionLink` / `AGDSDirectionButton` — back/forward navigation links
- `AGDSTextLink` / `AGDSTextLinkExternal`
- `AGDSDropdownMenu` / `AGDSDropdownMenuButton` / `AGDSDropdownMenuPanel` /
  `AGDSDropdownMenuItem` / `AGDSDropdownMenuItemLink` /
  `AGDSDropdownMenuItemRadio` / `AGDSDropdownMenuGroup` /
  `AGDSDropdownMenuDivider` — full Reka UI-based dropdown menu
- `AGDSSearchBox` / `AGDSSearchBoxInput` / `AGDSSearchBoxButton`

#### Forms
- `AGDSField` / `AGDSFieldContainer` / `AGDSFieldLabel` / `AGDSFieldHint` /
  `AGDSFieldMessage` + `useScrollToField` composable
- `AGDSFieldset` / `AGDSGroupedFields`
- `AGDSTextInput` / `AGDSTextarea` / `AGDSPasswordInput` / `AGDSSearchInput` /
  `AGDSSelect`
- `AGDSCheckbox` / `AGDSCheckboxGroup`
- `AGDSRadio` / `AGDSRadioGroup`
- `AGDSControlGroup`
- `AGDSSwitch`
- `AGDSFileInput` / `AGDSFileUpload` + `formatFileSize` utility
- `AGDSDatePicker` — single date and date-range modes via `range` prop; Reka
  UI Popover-based calendar
- `AGDSTimeInput` + `acceptedTimeFormats`, `formatTime`,
  `transformValuePropToInputValue` utilities
- `AGDSTimePicker` + `generateOptions` utility
- `AGDSCombobox` / `AGDSComboboxMulti` / `AGDSComboboxAsync` /
  `AGDSComboboxAsyncMulti` / `AGDSAutocomplete` + `filterOptions` utility
  (all backed by Reka UI Combobox)

#### Feedback & status
- `AGDSGlobalAlert` / `AGDSSectionAlert` / `AGDSPageAlert`
- `AGDSCallout`
- `AGDSStatusBadge`
- `AGDSNotificationBadge`
- `AGDSLoadingBlanket`
- `AGDSModal` — Reka UI Dialog-based accessible modal
- `AGDSDrawer` — slide-in drawer panel

#### Typography
- `AGDSHeading` / `AGDSH1`–`AGDSH6`
- `AGDSText` — body text with size/weight/colour props
- `AGDSProse` — markdown prose styling container

#### Data display
- `AGDSTable` / `AGDSTableBody` / `AGDSTableCaption` / `AGDSTableHead` /
  `AGDSTableHeader` / `AGDSTableHeaderSortable` / `AGDSTableCell` /
  `AGDSTableRow` / `AGDSTableScroller`
- `AGDSSummaryList` / `AGDSSummaryListItem` / `AGDSSummaryListItemTerm` /
  `AGDSSummaryListItemDescription` / `AGDSSummaryListItemAction`
- `AGDSCard` / `AGDSCardHeader` / `AGDSCardFooter` / `AGDSCardInner` /
  `AGDSCardLink`
- `AGDSDetails` — native `<details>`/`<summary>` with AgDS styling
- `AGDSAccordion` / `AGDSAccordionItem` — Reka UI Accordion
- `AGDSTabs` / `AGDSTabList` / `AGDSTab` / `AGDSTabPanel` — Reka UI Tabs
- `AGDSAvatar`
- `AGDSTag` / `AGDSTags`
- `AGDSIcon` — Iconify-backed icon component (`@iconify/vue` optional peer dep)
- `AGDSUnorderedList` / `AGDSOrderedList` / `AGDSListItem`
- `AGDSFeatureLinkList` / `AGDSFeatureLinkListItem`
- `AGDSDivider`
- `AGDSHeader` / `AGDSFooter` / `AGDSFooterDivider`

#### Utilities
- `AGDSVisuallyHidden` / `AGDSExternalLinkCallout` — screen-reader-only
  content helpers
- `componentNames` array + `ComponentName` type — exhaustive list of all
  registered component names

---

[2.0.0]: https://github.com/KealanAU/AGDS-vue/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/KealanAU/AGDS-vue/releases/tag/v1.0.0
