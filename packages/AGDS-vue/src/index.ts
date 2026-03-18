import './styles/tokens.css'
import './styles/base.css'

// Core — theming, tokens, and provider
import { AGDSCore, AGDSCoreProvider } from './core'
import {
  boxPalette, boxPalettes, useBoxPalette, CORE_CONTEXT_KEY,
  goldTheme, printTheme, packs, print, fontGrid, breakpointNames,
  mapResponsiveProp, mediaQueryMin, mergeTheme, themeVars, themeToVars,
  mapSpacing, tokens,
} from './core'
export {
  AGDSCore, AGDSCoreProvider,
  boxPalette, boxPalettes, useBoxPalette, CORE_CONTEXT_KEY,
  goldTheme, printTheme, packs, print, fontGrid, breakpointNames,
  mapResponsiveProp, mediaQueryMin, mergeTheme, themeVars, themeToVars,
  mapSpacing, tokens,
}
export type {
  AGDSCoreProps, AGDSCoreProviderProps,
  BoxPalette, CoreContext, LinkProps, NativeLinkProps, ResponsiveProp, Theme,
  BorderWidth, FieldMaxWidth, Font, FontSize, FontWeight, LineHeight,
  MaxWidth, Shadow, Spacing, ZIndex,
} from './core'

// Components
import { AGDSBox } from './components/box'
export { AGDSBox }
export type * from './components/box'

import { AGDSFlex } from './components/flex'
export { AGDSFlex }
export type * from './components/flex'

import { AGDSColumns, AGDSColumn } from './components/columns'
export { AGDSColumns, AGDSColumn }
export type * from './components/columns'

import { AGDSFormStack } from './components/form-stack'
export { AGDSFormStack }
export type * from './components/form-stack'

import { AGDSStack } from './components/stack'
export { AGDSStack }
export type * from './components/stack'

import { AGDSBreadcrumbs, AGDSBreadcrumbsItem } from './components/breadcrumbs'
export { AGDSBreadcrumbs, AGDSBreadcrumbsItem }
export type * from './components/breadcrumbs'

import { AGDSButton, AGDSButtonLink, AGDSToggleButton } from './components/button'
export { AGDSButton, AGDSButtonLink, AGDSToggleButton }
export type * from './components/button'

import { AGDSAccordion, AGDSAccordionItem } from './components/accordion'
export { AGDSAccordion, AGDSAccordionItem }
export type * from './components/accordion'

import { AGDSAvatar } from './components/avatar'
export { AGDSAvatar }
export type * from './components/avatar'

import { AGDSCallout } from './components/callout'
export { AGDSCallout }
export type * from './components/callout'

import { AGDSGlobalAlert } from './components/global-alert'
export { AGDSGlobalAlert }
export type * from './components/global-alert'

import { AGDSSectionAlert } from './components/section-alert'
export { AGDSSectionAlert }
export type * from './components/section-alert'

import { AGDSStatusBadge } from './components/status-badge'
export { AGDSStatusBadge }
export type * from './components/status-badge'

import {
  AGDSSummaryList, AGDSSummaryListItem, AGDSSummaryListItemTerm,
  AGDSSummaryListItemDescription, AGDSSummaryListItemAction,
} from './components/summary-list'
export {
  AGDSSummaryList, AGDSSummaryListItem, AGDSSummaryListItemTerm,
  AGDSSummaryListItemDescription, AGDSSummaryListItemAction,
}
export type * from './components/summary-list'

import { AGDSPageAlert } from './components/page-alert'
export { AGDSPageAlert }
export type * from './components/page-alert'

import { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink } from './components/card'
export { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink }
export type * from './components/card'

import { AGDSDetails } from './components/details'
export { AGDSDetails }
export type * from './components/details'

import { AGDSTag, AGDSTags } from './components/tags'
export { AGDSTag, AGDSTags }
export type * from './components/tags'

import { AGDSFooter, AGDSFooterDivider } from './components/footer'
export { AGDSFooter, AGDSFooterDivider }
export type * from './components/footer'

import { AGDSHeader } from './components/header'
export { AGDSHeader }
export type * from './components/header'

import {
  AGDSDropdownMenu, AGDSDropdownMenuButton, AGDSDropdownMenuPanel,
  AGDSDropdownMenuItem, AGDSDropdownMenuItemLink, AGDSDropdownMenuItemRadio,
  AGDSDropdownMenuGroup, AGDSDropdownMenuDivider,
} from './components/dropdown-menu'
export {
  AGDSDropdownMenu, AGDSDropdownMenuButton, AGDSDropdownMenuPanel,
  AGDSDropdownMenuItem, AGDSDropdownMenuItemLink, AGDSDropdownMenuItemRadio,
  AGDSDropdownMenuGroup, AGDSDropdownMenuDivider,
}
export type * from './components/dropdown-menu'

import { AGDSDivider } from './components/divider'
export { AGDSDivider }
export type * from './components/divider'

import { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 } from './components/heading'
export { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 }
export type * from './components/heading'

import { AGDSFeatureLinkList, AGDSFeatureLinkListItem } from './components/feature-link-list'
export { AGDSFeatureLinkList, AGDSFeatureLinkListItem }
export type * from './components/feature-link-list'

import { AGDSLinkList, AGDSLinkListItem } from './components/link-list'
export { AGDSLinkList, AGDSLinkListItem }
export type * from './components/link-list'

import { AGDSIcon } from './components/icon'
export { AGDSIcon }
export type * from './components/icon'

import { AGDSUnorderedList, AGDSOrderedList, AGDSListItem } from './components/list'
export { AGDSUnorderedList, AGDSOrderedList, AGDSListItem }
export type * from './components/list'

import { AGDSText } from './components/text'
export { AGDSText }
export type * from './components/text'

import { AGDSPagination, AGDSPaginationButtons, usePagination } from './components/pagination'
export { AGDSPagination, AGDSPaginationButtons, usePagination }
export type * from './components/pagination'

import { AGDSModal } from './components/modal'
export { AGDSModal }
export type * from './components/modal'

import { AGDSDrawer } from './components/drawer'
export { AGDSDrawer }
export type * from './components/drawer'

import { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel } from './components/tabs'
export { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel }
export type * from './components/tabs'

import { AGDSCheckbox, AGDSCheckboxGroup, CHECKBOX_GROUP_KEY } from './components/checkbox'
export { AGDSCheckbox, AGDSCheckboxGroup, CHECKBOX_GROUP_KEY }
export type * from './components/checkbox'

import { AGDSControlGroup, CONTROL_GROUP_KEY } from './components/control-group'
export { AGDSControlGroup, CONTROL_GROUP_KEY }
export type * from './components/control-group'

import { AGDSSwitch } from './components/switch'
export { AGDSSwitch }
export type * from './components/switch'

import { AGDSRadio, AGDSRadioGroup, RADIO_GROUP_KEY } from './components/radio'
export { AGDSRadio, AGDSRadioGroup, RADIO_GROUP_KEY }
export type * from './components/radio'

import { AGDSCallToActionLink, AGDSCallToActionButton } from './components/call-to-action'
export { AGDSCallToActionLink, AGDSCallToActionButton }
export type * from './components/call-to-action'

import { AGDSDirectionLink, AGDSDirectionButton } from './components/direction-link'
export { AGDSDirectionLink, AGDSDirectionButton }
export type * from './components/direction-link'

import { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete, filterOptions } from './components/autocomplete'
export { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete, filterOptions }
export type * from './components/autocomplete'

import { AGDSDatePicker } from './components/date-picker'
export { AGDSDatePicker }
export type * from './components/date-picker'

import { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage, useScrollToField } from './components/field'
export { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage, useScrollToField }
export type * from './components/field'

import { AGDSFieldset } from './components/fieldset'
export { AGDSFieldset }
export type * from './components/fieldset'

import { AGDSGroupedFields, GROUPED_FIELDS_DATA_ATTR } from './components/grouped-fields'
export { AGDSGroupedFields, GROUPED_FIELDS_DATA_ATTR }
export type * from './components/grouped-fields'

import { AGDSFileInput } from './components/file-input'
export { AGDSFileInput }
export type * from './components/file-input'

import { AGDSFileUpload, formatFileSize } from './components/file-upload'
export { AGDSFileUpload, formatFileSize }
export type { AGDSFileUploadProps, FileWithStatus, FileStatus, RejectedFile, ExistingFile, CustomFileMimeType } from './components/file-upload'

import { AGDSTextInput } from './components/text-input'
export { AGDSTextInput }
export type * from './components/text-input'

import { AGDSTimeInput, acceptedTimeFormats, formatTime, transformValuePropToInputValue } from './components/time-input'
export { AGDSTimeInput, acceptedTimeFormats, formatTime, transformValuePropToInputValue }
export type * from './components/time-input'

import { AGDSTimePicker, generateOptions } from './components/time-picker'
export { AGDSTimePicker, generateOptions }
export type * from './components/time-picker'

import { AGDSTextarea } from './components/textarea'
export { AGDSTextarea }
export type * from './components/textarea'

import { AGDSPasswordInput } from './components/password-input'
export { AGDSPasswordInput }
export type * from './components/password-input'

import { AGDSSearchInput } from './components/search-input'
export { AGDSSearchInput }
export type * from './components/search-input'

import { AGDSSelect } from './components/select'
export { AGDSSelect }
export type * from './components/select'

import { AGDSTaskList, AGDSTaskListItem } from './components/task-list'
export { AGDSTaskList, AGDSTaskListItem }
export type * from './components/task-list'

import { AGDSMainNav } from './components/main-nav'
export { AGDSMainNav }
export type * from './components/main-nav'

import { AGDSSideNav } from './components/side-nav'
export { AGDSSideNav }
export type * from './components/side-nav'

import { AGDSCollapsingSideBar } from './components/collapsing-side-bar'
export { AGDSCollapsingSideBar }
export type * from './components/collapsing-side-bar'

import { AGDSFilterSidebar } from './components/filter-sidebar'
export { AGDSFilterSidebar }
export type * from './components/filter-sidebar'

import { AGDSSubNav } from './components/sub-nav'
export { AGDSSubNav }
export type * from './components/sub-nav'

import { AGDSLoadingBlanket } from './components/loading-blanket'
export { AGDSLoadingBlanket }
export type * from './components/loading-blanket'

import { AGDSNotificationBadge } from './components/notification-badge'
export { AGDSNotificationBadge }
export type * from './components/notification-badge'

import { AGDSVisuallyHidden, AGDSExternalLinkCallout } from './components/visually-hidden'
export { AGDSVisuallyHidden, AGDSExternalLinkCallout }
export type * from './components/visually-hidden'

import { AGDSTextLink, AGDSTextLinkExternal } from './components/text-link'
export { AGDSTextLink, AGDSTextLinkExternal }
export type * from './components/text-link'

import { AGDSInpageNav } from './components/inpage-nav'
export { AGDSInpageNav }
export type * from './components/inpage-nav'

import { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed } from './components/content'
export { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed }
export type * from './components/content'

import { AGDSProse } from './components/prose'
export { AGDSProse }
export type * from './components/prose'

import { AGDSSkipLinks } from './components/skip-link'
export { AGDSSkipLinks }
export type * from './components/skip-link'

import { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton } from './components/search-box'
export { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton }
export type * from './components/search-box'

import { AGDSProgressIndicator } from './components/progress-indicator'
export { AGDSProgressIndicator }
export type * from './components/progress-indicator'

import {
  AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar, AGDSAppLayoutSidebarNav,
  AGDSAppLayoutFooter, AGDSAppLayoutFooterDivider,
} from './components/app-layout'
export {
  AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar, AGDSAppLayoutSidebarNav,
  AGDSAppLayoutFooter, AGDSAppLayoutFooterDivider,
}
export type * from './components/app-layout'

import {
  AGDSTable, AGDSTableBody, AGDSTableCaption, AGDSTableHead, AGDSTableHeader,
  AGDSTableHeaderSortable, AGDSTableCell, AGDSTableRow, AGDSTableScroller,
} from './components/table'
export {
  AGDSTable, AGDSTableBody, AGDSTableCaption, AGDSTableHead, AGDSTableHeader,
  AGDSTableHeaderSortable, AGDSTableCell, AGDSTableRow, AGDSTableScroller,
}
export type * from './components/table'

// Plugin — registers all components globally.
// Adding a component to the object below is the only step needed to register it.
import type { App, Component } from 'vue'

const components = {
  AGDSCore, AGDSCoreProvider,
  AGDSBox, AGDSFlex,
  AGDSColumns, AGDSColumn,
  AGDSFormStack, AGDSStack,
  AGDSBreadcrumbs, AGDSBreadcrumbsItem,
  AGDSButton, AGDSButtonLink, AGDSToggleButton,
  AGDSAccordion, AGDSAccordionItem,
  AGDSAvatar,
  AGDSCallout,
  AGDSGlobalAlert, AGDSSectionAlert, AGDSPageAlert, AGDSStatusBadge,
  AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink,
  AGDSDetails,
  AGDSTag, AGDSTags,
  AGDSFooter, AGDSFooterDivider,
  AGDSHeader,
  AGDSDivider,
  AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6,
  AGDSFeatureLinkList, AGDSFeatureLinkListItem,
  AGDSLinkList, AGDSLinkListItem,
  AGDSIcon,
  AGDSUnorderedList, AGDSOrderedList, AGDSListItem,
  AGDSText,
  AGDSPagination, AGDSPaginationButtons,
  AGDSDropdownMenu, AGDSDropdownMenuButton, AGDSDropdownMenuPanel,
  AGDSDropdownMenuItem, AGDSDropdownMenuItemLink, AGDSDropdownMenuItemRadio,
  AGDSDropdownMenuGroup, AGDSDropdownMenuDivider,
  AGDSSideNav, AGDSCollapsingSideBar, AGDSFilterSidebar, AGDSSubNav, AGDSMainNav,
  AGDSModal, AGDSDrawer,
  AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel,
  AGDSCheckbox, AGDSCheckboxGroup, AGDSControlGroup,
  AGDSSwitch,
  AGDSRadio, AGDSRadioGroup,
  AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete,
  AGDSDatePicker,
  AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage,
  AGDSFieldset, AGDSGroupedFields,
  AGDSCallToActionLink, AGDSCallToActionButton,
  AGDSDirectionLink, AGDSDirectionButton,
  AGDSLoadingBlanket, AGDSNotificationBadge,
  AGDSVisuallyHidden, AGDSExternalLinkCallout,
  AGDSTextLink, AGDSTextLinkExternal,
  AGDSInpageNav,
  AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed,
  AGDSProse, AGDSSkipLinks,
  AGDSSummaryList, AGDSSummaryListItem, AGDSSummaryListItemTerm,
  AGDSSummaryListItemDescription, AGDSSummaryListItemAction,
  AGDSProgressIndicator,
  AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton,
  AGDSFileInput, AGDSFileUpload,
  AGDSTextInput, AGDSTextarea, AGDSPasswordInput, AGDSSearchInput, AGDSSelect,
  AGDSTimeInput, AGDSTimePicker,
  AGDSTaskList, AGDSTaskListItem,
  AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar, AGDSAppLayoutSidebarNav,
  AGDSAppLayoutFooter, AGDSAppLayoutFooterDivider,
  AGDSTable, AGDSTableBody, AGDSTableCaption, AGDSTableHead,
  AGDSTableHeader, AGDSTableHeaderSortable, AGDSTableCell, AGDSTableRow, AGDSTableScroller,
} satisfies Record<string, Component>

export { componentNames } from './componentNames'
export type { ComponentName } from './componentNames'

export const AGDSVue = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}

export default AGDSVue
