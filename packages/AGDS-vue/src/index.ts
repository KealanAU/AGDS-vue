// Styles — tokens and base must come first so components can reference them
import './styles/tokens.css'
import './styles/base.css'

// Core — theming, tokens, and provider
export { AgDSCore, AgDSCoreProvider } from './core'
export type { AgDSCoreProps, AgDSCoreProviderProps } from './core'
export {
  boxPalette,
  boxPalettes,
  useBoxPalette,
  CORE_CONTEXT_KEY,
  goldTheme,
  printTheme,
  packs,
  print,
  fontGrid,
  breakpointNames,
  mapResponsiveProp,
  mediaQueryMin,
  mergeTheme,
  themeVars,
  themeToVars,
  mapSpacing,
  tokens,
} from './core'
export type {
  BoxPalette,
  CoreContext,
  LinkProps,
  NativeLinkProps,
  ResponsiveProp,
  Theme,
  BorderWidth,
  FieldMaxWidth,
  Font,
  FontSize,
  FontWeight,
  LineHeight,
  MaxWidth,
  Shadow,
  Spacing,
  ZIndex,
} from './core'

// Components
export { AgDSBox } from './components/box'
export type {
  AgDSBoxProps,
  BoxDisplay,
  BoxFlexDirection,
  BoxFlexWrap,
  BoxAlignItems,
  BoxAlignSelf,
  BoxJustifyContent,
  BoxJustifySelf,
} from './components/box'

export { AgDSFlex } from './components/flex'
export type { AgDSFlexProps } from './components/flex'

export { AgDSColumns, AgDSColumn } from './components/columns'
export type { AgDSColumnsProps, AgDSColumnProps, ColumnRange, ColumnsAlignItems, ColumnAlignSelf, ColumnJustifySelf } from './components/columns'

export { AgDSFormStack } from './components/form-stack'
export type { AgDSFormStackProps } from './components/form-stack'

export { AgDSStack } from './components/stack'
export type { AgDSStackProps } from './components/stack'

export { AgDSBreadcrumbs, AgDSBreadcrumbsItem } from './components/breadcrumbs'
export type { AgDSBreadcrumbsProps, AgDSBreadcrumbsItemProps, BreadcrumbLink } from './components/breadcrumbs'

export { AgDSButton, AgDSButtonLink, AgDSToggleButton } from './components/button'
export type { AgDSButtonProps, AgDSButtonLinkProps, AgDSToggleButtonProps, ButtonVariant, ButtonSize } from './components/button'

export { AgDSAccordion, AgDSAccordionItem } from './components/accordion'
export type { AgDSAccordionProps, AgDSAccordionItemProps, AccordionType, AccordionBackground } from './components/accordion'

export { AgDSAvatar } from './components/avatar'
export type { AgDSAvatarProps, AvatarTone, AvatarSize } from './components/avatar'

export { AgDSCallout } from './components/callout'
export type { AgDSCalloutProps, CalloutTone, CalloutVariant } from './components/callout'

export { AgDSGlobalAlert } from './components/global-alert'
export type { AgDSGlobalAlertProps, GlobalAlertTone } from './components/global-alert'

export { AgDSSectionAlert } from './components/section-alert'
export type { AgDSSectionAlertProps, SectionAlertTone } from './components/section-alert'

export { AgDSStatusBadge } from './components/status-badge'

export {
  AgDSSummaryList,
  AgDSSummaryListItem,
  AgDSSummaryListItemTerm,
  AgDSSummaryListItemDescription,
  AgDSSummaryListItemAction,
} from './components/summary-list'
export type {
  AgDSSummaryListProps,
  AgDSSummaryListItemProps,
  AgDSSummaryListItemTermProps,
  AgDSSummaryListItemDescriptionProps,
  AgDSSummaryListItemActionProps,
} from './components/summary-list'
export type {
  AgDSStatusBadgeProps,
  StatusBadgeTone,
  StatusBadgeTones,
  StatusBadgeAppearance,
  StatusBadgeLegacyTone,
} from './components/status-badge'

export { AgDSPageAlert } from './components/page-alert'
export type { AgDSPageAlertProps, PageAlertTone } from './components/page-alert'

export { AgDSCard, AgDSCardHeader, AgDSCardFooter, AgDSCardInner, AgDSCardLink } from './components/card'
export type { AgDSCardProps, AgDSCardHeaderProps, AgDSCardFooterProps, AgDSCardLinkProps } from './components/card'

export { AgDSDetails } from './components/details'
export type { AgDSDetailsProps } from './components/details'

export { AgDSTag, AgDSTags } from './components/tags'
export type { AgDSTagProps, AgDSTagsProps, TagItem } from './components/tags'

export { AgDSFooter, AgDSFooterDivider } from './components/footer'
export type { AgDSFooterProps, AgDSFooterDividerProps } from './components/footer'

export { AgDSHeader } from './components/header'
export type { AgDSHeaderProps, HeaderBackground, HeaderMaxWidth, HeaderSize, HeaderDividerPosition } from './components/header'

export {
  AgDSDropdownMenu,
  AgDSDropdownMenuButton,
  AgDSDropdownMenuPanel,
  AgDSDropdownMenuItem,
  AgDSDropdownMenuItemLink,
  AgDSDropdownMenuItemRadio,
  AgDSDropdownMenuGroup,
  AgDSDropdownMenuDivider,
} from './components/dropdown-menu'
export type {
  AgDSDropdownMenuProps,
  AgDSDropdownMenuButtonProps,
  AgDSDropdownMenuItemProps,
  AgDSDropdownMenuItemLinkProps,
  AgDSDropdownMenuItemRadioProps,
  AgDSDropdownMenuGroupProps,
} from './components/dropdown-menu'

export { AgDSDivider } from './components/divider'
export type { AgDSDividerProps } from './components/divider'

export { AgDSHeading, AgDSH1, AgDSH2, AgDSH3, AgDSH4, AgDSH5, AgDSH6 } from './components/heading'
export type { AgDSHeadingProps, HeadingType } from './components/heading'

export { AgDSFeatureLinkList, AgDSFeatureLinkListItem } from './components/feature-link-list'
export type { AgDSFeatureLinkListProps, AgDSFeatureLinkListItemProps, FeatureLinkListLink, FeatureLinkListBackground } from './components/feature-link-list'

export { AgDSLinkList, AgDSLinkListItem } from './components/link-list'
export type { AgDSLinkListProps, AgDSLinkListItemProps, LinkListLink } from './components/link-list'

export { AgDSIcon } from './components/icon'
export type { AgDSIconProps, IconSize } from './components/icon'

export { AgDSUnorderedList, AgDSOrderedList, AgDSListItem } from './components/list'
export type { AgDSUnorderedListProps, AgDSOrderedListProps, AgDSListItemProps } from './components/list'

export { AgDSText } from './components/text'
export type { AgDSTextProps, TextColor, TextFamily, TextSize, TextWeight, TextLeading } from './components/text'

export { AgDSPagination, AgDSPaginationButtons, usePagination } from './components/pagination'
export type { AgDSPaginationProps, AgDSPaginationButtonsProps, PaginationItem, UsePaginationOptions } from './components/pagination'

export { AgDSModal } from './components/modal'
export type { AgDSModalProps } from './components/modal'

export { AgDSDrawer } from './components/drawer'
export type { AgDSDrawerProps, DrawerWidth } from './components/drawer'

export { AgDSTabs, AgDSTabList, AgDSTab, AgDSTabPanel } from './components/tabs'
export type { AgDSTabsProps, AgDSTabListProps, AgDSTabProps, AgDSTabPanelProps, TabsBackground } from './components/tabs'

export { AgDSCheckbox, AgDSCheckboxGroup } from './components/checkbox'
export type { AgDSCheckboxProps, AgDSCheckboxGroupProps, CheckboxSize, CheckboxGroupContext } from './components/checkbox'
export { CHECKBOX_GROUP_KEY } from './components/checkbox'

export { AgDSControlGroup } from './components/control-group'
export type { AgDSControlGroupProps, ControlGroupContext } from './components/control-group'
export { CONTROL_GROUP_KEY } from './components/control-group'

export { AgDSSwitch } from './components/switch'
export type { AgDSSwitchProps, SwitchSize } from './components/switch'

export { AgDSRadio, AgDSRadioGroup } from './components/radio'
export type { AgDSRadioProps, AgDSRadioGroupProps, RadioSize, RadioGroupContext } from './components/radio'
export { RADIO_GROUP_KEY } from './components/radio'

export { AgDSCallToActionLink, AgDSCallToActionButton } from './components/call-to-action'
export type { AgDSCallToActionLinkProps, AgDSCallToActionButtonProps } from './components/call-to-action'

export { AgDSDirectionLink, AgDSDirectionButton } from './components/direction-link'
export type { AgDSDirectionLinkProps, AgDSDirectionButtonProps, Direction } from './components/direction-link'

export { AgDSCombobox, AgDSComboboxMulti, AgDSComboboxAsync, AgDSComboboxAsyncMulti, AgDSAutocomplete } from './components/autocomplete'
export type { AgDSComboboxProps, AgDSComboboxMultiProps, AgDSComboboxAsyncProps, AgDSComboboxAsyncMultiProps, AgDSAutocompleteProps, DefaultComboboxOption, ComboboxMaxWidth } from './components/autocomplete'
export { filterOptions } from './components/autocomplete'

export { AgDSDatePicker } from './components/date-picker'
export type { AgDSDatePickerProps, DatePickerSingleValue, DatePickerRangeValue } from './components/date-picker'

export { AgDSField, AgDSFieldContainer, AgDSFieldLabel, AgDSFieldHint, AgDSFieldMessage } from './components/field'
export type { AgDSFieldProps, AgDSFieldContainerProps, AgDSFieldLabelProps, AgDSFieldHintProps, AgDSFieldMessageProps } from './components/field'
export { useScrollToField } from './components/field'

export { AgDSFieldset } from './components/fieldset'
export type { AgDSFieldsetProps } from './components/fieldset'

export { AgDSGroupedFields, GROUPED_FIELDS_DATA_ATTR } from './components/grouped-fields'
export type { AgDSGroupedFieldsProps } from './components/grouped-fields'

export { AgDSFileInput } from './components/file-input'
export type { AgDSFileInputProps, AcceptedFileMimeTypes } from './components/file-input'

export { AgDSFileUpload } from './components/file-upload'
export type { AgDSFileUploadProps, FileWithStatus, FileStatus, RejectedFile, ExistingFile, CustomFileMimeType } from './components/file-upload'
export { formatFileSize } from './components/file-upload'

export { AgDSTextInput } from './components/text-input'
export type { AgDSTextInputProps } from './components/text-input'

export { AgDSTimeInput } from './components/time-input'
export type { AgDSTimeInputProps, TimeValue } from './components/time-input'
export type { TimeFormat } from './components/time-input'
export { acceptedTimeFormats, formatTime, transformValuePropToInputValue } from './components/time-input'

export { AgDSTimePicker } from './components/time-picker'
export type { AgDSTimePickerProps } from './components/time-picker'
export { generateOptions } from './components/time-picker'

export { AgDSTextarea } from './components/textarea'
export type { AgDSTextareaProps, TextareaMaxWidth } from './components/textarea'

export { AgDSPasswordInput } from './components/password-input'
export type { AgDSPasswordInputProps } from './components/password-input'

export { AgDSSearchInput } from './components/search-input'
export type { AgDSSearchInputProps, SearchInputMaxWidth } from './components/search-input'

export { AgDSSelect } from './components/select'
export type { AgDSSelectProps, Option, OptionGroup, Options, SelectMaxWidth } from './components/select'

export { AgDSTaskList, AgDSTaskListItem } from './components/task-list'
export type { AgDSTaskListProps, TaskListItem, AgDSTaskListItemProps, TaskListItemStatus } from './components/task-list'

export { AgDSMainNav } from './components/main-nav'
export type {
  AgDSMainNavProps,
  MainNavBackground,
  MainNavBorderColor,
  MainNavItem,
  MainNavLinkItem,
  MainNavButtonItem,
  MainNavDropdownItem,
} from './components/main-nav'

export { AgDSSideNav } from './components/side-nav'
export type { AgDSSideNavProps, SideNavBackground, SideNavSubLevelVisible, SideNavItem } from './components/side-nav'

export { AgDSCollapsingSideBar } from './components/collapsing-side-bar'
export type { AgDSCollapsingSideBarProps, CollapsingSideBarBackground, CollapsingSideBarAs } from './components/collapsing-side-bar'

export { AgDSFilterSidebar } from './components/filter-sidebar'
export type { AgDSFilterSidebarProps } from './components/filter-sidebar'

export { AgDSSubNav } from './components/sub-nav'
export type { AgDSSubNavProps, SubNavBackground, SubNavLink } from './components/sub-nav'

export { AgDSLoadingBlanket } from './components/loading-blanket'
export type { AgDSLoadingBlanketProps } from './components/loading-blanket'

export { AgDSNotificationBadge } from './components/notification-badge'
export type { AgDSNotificationBadgeProps, BadgeTone } from './components/notification-badge'

export { AgDSVisuallyHidden, AgDSExternalLinkCallout } from './components/visually-hidden'
export type { AgDSVisuallyHiddenProps } from './components/visually-hidden'

export { AgDSTextLink, AgDSTextLinkExternal } from './components/text-link'
export type { AgDSTextLinkProps, AgDSTextLinkExternalProps } from './components/text-link'

export { AgDSInpageNav } from './components/inpage-nav'
export type { AgDSInpageNavProps, InpageNavLink } from './components/inpage-nav'

export { AgDSContent, AgDSSectionContent, AgDSPageContent, AgDSContentBleed } from './components/content'
export type { AgDSContentProps, AgDSSectionContentProps, AgDSPageContentProps, AgDSContentBleedProps, ContentSpacing, ContentBleedVisible } from './components/content'

export { AgDSProse } from './components/prose'
export type { AgDSProseProps } from './components/prose'

export { AgDSSkipLinks } from './components/skip-link'
export type { AgDSSkipLinksProps, SkipLink } from './components/skip-link'

export { AgDSSearchBox, AgDSSearchBoxInput, AgDSSearchBoxButton } from './components/search-box'
export type { AgDSSearchBoxProps, AgDSSearchBoxInputProps, AgDSSearchBoxButtonProps } from './components/search-box'

export { AgDSProgressIndicator } from './components/progress-indicator'
export type {
  AgDSProgressIndicatorProps,
  ProgressIndicatorItem,
  ProgressIndicatorItemStatus,
  ProgressIndicatorBackground,
  ProgressIndicatorLevelTwoItem,
} from './components/progress-indicator'

export {
  AgDSAppLayout,
  AgDSAppLayoutHeader,
  AgDSAppLayoutSidebar,
  AgDSAppLayoutSidebarNav,
  AgDSAppLayoutFooter,
  AgDSAppLayoutFooterDivider,
} from './components/app-layout'
export type {
  AgDSAppLayoutProps,
  AgDSAppLayoutHeaderProps,
  AgDSAppLayoutSidebarProps,
  AgDSAppLayoutSidebarNavProps,
  AgDSAppLayoutFooterProps,
  AppLayoutBackground,
  AppLayoutSubLevelVisible,
  AppLayoutNavLinkItem,
  AppLayoutNavButtonItem,
  AppLayoutNavTextItem,
  AppLayoutNavItem,
  AppLayoutNavGroup,
  AppLayoutNavGroupObject,
} from './components/app-layout'

export {
  AgDSTable,
  AgDSTableBody,
  AgDSTableCaption,
  AgDSTableHead,
  AgDSTableHeader,
  AgDSTableHeaderSortable,
  AgDSTableCell,
  AgDSTableRow,
  AgDSTableScroller,
} from './components/table'
export type {
  AgDSTableProps,
  TableLayout,
  AgDSTableHeaderProps,
  AgDSTableHeaderSortableProps,
  TableSortDirection,
  AgDSTableCellProps,
  AgDSTableRowProps,
  TableRowBackground,
} from './components/table'

// Plugin — registers all components globally
import type { App } from 'vue'
import { AgDSCore, AgDSCoreProvider } from './core'
import { AgDSBox } from './components/box'
import { AgDSFlex } from './components/flex'
import { AgDSColumns, AgDSColumn } from './components/columns'
import { AgDSFormStack } from './components/form-stack'
import { AgDSStack } from './components/stack'
import { AgDSBreadcrumbs, AgDSBreadcrumbsItem } from './components/breadcrumbs'
import { AgDSButton, AgDSButtonLink, AgDSToggleButton } from './components/button'
import { AgDSAccordion, AgDSAccordionItem } from './components/accordion'
import { AgDSAvatar } from './components/avatar'
import { AgDSCallout } from './components/callout'
import { AgDSGlobalAlert } from './components/global-alert'
import { AgDSSectionAlert } from './components/section-alert'
import { AgDSPageAlert } from './components/page-alert'
import { AgDSCard, AgDSCardHeader, AgDSCardFooter, AgDSCardInner, AgDSCardLink } from './components/card'
import { AgDSDetails } from './components/details'
import { AgDSTag, AgDSTags } from './components/tags'
import { AgDSFooter, AgDSFooterDivider } from './components/footer'
import { AgDSHeader } from './components/header'
import { AgDSDivider } from './components/divider'
import { AgDSHeading, AgDSH1, AgDSH2, AgDSH3, AgDSH4, AgDSH5, AgDSH6 } from './components/heading'
import { AgDSFeatureLinkList, AgDSFeatureLinkListItem } from './components/feature-link-list'
import { AgDSLinkList, AgDSLinkListItem } from './components/link-list'
import { AgDSIcon } from './components/icon'
import { AgDSUnorderedList, AgDSOrderedList, AgDSListItem } from './components/list'
import { AgDSText } from './components/text'
import { AgDSPagination, AgDSPaginationButtons } from './components/pagination'
import {
  AgDSDropdownMenu,
  AgDSDropdownMenuButton,
  AgDSDropdownMenuPanel,
  AgDSDropdownMenuItem,
  AgDSDropdownMenuItemLink,
  AgDSDropdownMenuItemRadio,
  AgDSDropdownMenuGroup,
  AgDSDropdownMenuDivider,
} from './components/dropdown-menu'
import { AgDSSideNav } from './components/side-nav'
import { AgDSCollapsingSideBar } from './components/collapsing-side-bar'
import { AgDSFilterSidebar } from './components/filter-sidebar'
import { AgDSSubNav } from './components/sub-nav'
import { AgDSMainNav } from './components/main-nav'
import { AgDSModal } from './components/modal'
import { AgDSDrawer } from './components/drawer'
import { AgDSTabs, AgDSTabList, AgDSTab, AgDSTabPanel } from './components/tabs'
import { AgDSCheckbox, AgDSCheckboxGroup } from './components/checkbox'
import { AgDSSwitch } from './components/switch'
import { AgDSRadio, AgDSRadioGroup } from './components/radio'
import { AgDSCombobox, AgDSComboboxMulti, AgDSComboboxAsync, AgDSComboboxAsyncMulti, AgDSAutocomplete } from './components/autocomplete'
import { AgDSDatePicker } from './components/date-picker'
import { AgDSField, AgDSFieldContainer, AgDSFieldLabel, AgDSFieldHint, AgDSFieldMessage } from './components/field'
import { AgDSFieldset } from './components/fieldset'
import { AgDSGroupedFields } from './components/grouped-fields'
import { AgDSCallToActionLink, AgDSCallToActionButton } from './components/call-to-action'
import { AgDSDirectionLink, AgDSDirectionButton } from './components/direction-link'
import { AgDSLoadingBlanket } from './components/loading-blanket'
import { AgDSNotificationBadge } from './components/notification-badge'
import { AgDSVisuallyHidden, AgDSExternalLinkCallout } from './components/visually-hidden'
import { AgDSTextLink, AgDSTextLinkExternal } from './components/text-link'
import { AgDSInpageNav } from './components/inpage-nav'
import { AgDSContent, AgDSSectionContent, AgDSPageContent, AgDSContentBleed } from './components/content'
import { AgDSProse } from './components/prose'
import { AgDSSkipLinks } from './components/skip-link'
import {
  AgDSSummaryList,
  AgDSSummaryListItem,
  AgDSSummaryListItemTerm,
  AgDSSummaryListItemDescription,
  AgDSSummaryListItemAction,
} from './components/summary-list'
import { AgDSProgressIndicator } from './components/progress-indicator'
import { AgDSSearchBox, AgDSSearchBoxInput, AgDSSearchBoxButton } from './components/search-box'
import { AgDSFileUpload } from './components/file-upload'
import { AgDSTextInput } from './components/text-input'
import { AgDSTimeInput } from './components/time-input'
import { AgDSTimePicker } from './components/time-picker'
import { AgDSTextarea } from './components/textarea'
import { AgDSSearchInput } from './components/search-input'
import { AgDSSelect } from './components/select'
import {
  AgDSAppLayout,
  AgDSAppLayoutHeader,
  AgDSAppLayoutSidebar,
  AgDSAppLayoutSidebarNav,
  AgDSAppLayoutFooter,
  AgDSAppLayoutFooterDivider,
} from './components/app-layout'
import {
  AgDSTable,
  AgDSTableBody,
  AgDSTableCaption,
  AgDSTableHead,
  AgDSTableHeader,
  AgDSTableHeaderSortable,
  AgDSTableCell,
  AgDSTableRow,
  AgDSTableScroller,
} from './components/table'

export const AgDSVue = {
  install(app: App) {
    app.component('AgDSCore', AgDSCore)
    app.component('AgDSCoreProvider', AgDSCoreProvider)
    app.component('AgDSBox', AgDSBox)
    app.component('AgDSFlex', AgDSFlex)
    app.component('AgDSColumns', AgDSColumns)
    app.component('AgDSColumn', AgDSColumn)
    app.component('AgDSFormStack', AgDSFormStack)
    app.component('AgDSStack', AgDSStack)
    app.component('AgDSBreadcrumbs', AgDSBreadcrumbs)
    app.component('AgDSBreadcrumbsItem', AgDSBreadcrumbsItem)
    app.component('AgDSButton', AgDSButton)
    app.component('AgDSButtonLink', AgDSButtonLink)
    app.component('AgDSToggleButton', AgDSToggleButton)
    app.component('AgDSAccordion', AgDSAccordion)
    app.component('AgDSAccordionItem', AgDSAccordionItem)
    app.component('AgDSAvatar', AgDSAvatar)
    app.component('AgDSCallout', AgDSCallout)
    app.component('AgDSGlobalAlert', AgDSGlobalAlert)
    app.component('AgDSSectionAlert', AgDSSectionAlert)
    app.component('AgDSPageAlert', AgDSPageAlert)
    app.component('AgDSCard', AgDSCard)
    app.component('AgDSCardHeader', AgDSCardHeader)
    app.component('AgDSCardFooter', AgDSCardFooter)
    app.component('AgDSCardInner', AgDSCardInner)
    app.component('AgDSCardLink', AgDSCardLink)
    app.component('AgDSDetails', AgDSDetails)
    app.component('AgDSTag', AgDSTag)
    app.component('AgDSTags', AgDSTags)
    app.component('AgDSFooter', AgDSFooter)
    app.component('AgDSFooterDivider', AgDSFooterDivider)
    app.component('AgDSHeader', AgDSHeader)
    app.component('AgDSDivider', AgDSDivider)
    app.component('AgDSHeading', AgDSHeading)
    app.component('AgDSH1', AgDSH1)
    app.component('AgDSH2', AgDSH2)
    app.component('AgDSH3', AgDSH3)
    app.component('AgDSH4', AgDSH4)
    app.component('AgDSH5', AgDSH5)
    app.component('AgDSH6', AgDSH6)
    app.component('AgDSFeatureLinkList', AgDSFeatureLinkList)
    app.component('AgDSFeatureLinkListItem', AgDSFeatureLinkListItem)
    app.component('AgDSLinkList', AgDSLinkList)
    app.component('AgDSLinkListItem', AgDSLinkListItem)
    app.component('AgDSIcon', AgDSIcon)
    app.component('AgDSUnorderedList', AgDSUnorderedList)
    app.component('AgDSOrderedList', AgDSOrderedList)
    app.component('AgDSListItem', AgDSListItem)
    app.component('AgDSText', AgDSText)
    app.component('AgDSTable', AgDSTable)
    app.component('AgDSTableBody', AgDSTableBody)
    app.component('AgDSTableCaption', AgDSTableCaption)
    app.component('AgDSTableHead', AgDSTableHead)
    app.component('AgDSTableHeader', AgDSTableHeader)
    app.component('AgDSTableHeaderSortable', AgDSTableHeaderSortable)
    app.component('AgDSTableCell', AgDSTableCell)
    app.component('AgDSTableRow', AgDSTableRow)
    app.component('AgDSTableScroller', AgDSTableScroller)
    app.component('AgDSAppLayout', AgDSAppLayout)
    app.component('AgDSAppLayoutHeader', AgDSAppLayoutHeader)
    app.component('AgDSAppLayoutSidebar', AgDSAppLayoutSidebar)
    app.component('AgDSAppLayoutSidebarNav', AgDSAppLayoutSidebarNav)
    app.component('AgDSAppLayoutFooter', AgDSAppLayoutFooter)
    app.component('AgDSAppLayoutFooterDivider', AgDSAppLayoutFooterDivider)
    app.component('AgDSSideNav', AgDSSideNav)
    app.component('AgDSCollapsingSideBar', AgDSCollapsingSideBar)
    app.component('AgDSFilterSidebar', AgDSFilterSidebar)
    app.component('AgDSSubNav', AgDSSubNav)
    app.component('AgDSMainNav', AgDSMainNav)
    app.component('AgDSModal', AgDSModal)
    app.component('AgDSDrawer', AgDSDrawer)
    app.component('AgDSTabs', AgDSTabs)
    app.component('AgDSTabList', AgDSTabList)
    app.component('AgDSTab', AgDSTab)
    app.component('AgDSTabPanel', AgDSTabPanel)
    app.component('AgDSPagination', AgDSPagination)
    app.component('AgDSPaginationButtons', AgDSPaginationButtons)
    app.component('AgDSCheckbox', AgDSCheckbox)
    app.component('AgDSCheckboxGroup', AgDSCheckboxGroup)
    app.component('AgDSSwitch', AgDSSwitch)
    app.component('AgDSRadio', AgDSRadio)
    app.component('AgDSRadioGroup', AgDSRadioGroup)
    app.component('AgDSCombobox', AgDSCombobox)
    app.component('AgDSComboboxMulti', AgDSComboboxMulti)
    app.component('AgDSComboboxAsync', AgDSComboboxAsync)
    app.component('AgDSComboboxAsyncMulti', AgDSComboboxAsyncMulti)
    app.component('AgDSAutocomplete', AgDSAutocomplete)
    app.component('AgDSDatePicker', AgDSDatePicker)
    app.component('AgDSField', AgDSField)
    app.component('AgDSFieldContainer', AgDSFieldContainer)
    app.component('AgDSFieldLabel', AgDSFieldLabel)
    app.component('AgDSFieldHint', AgDSFieldHint)
    app.component('AgDSFieldMessage', AgDSFieldMessage)
    app.component('AgDSFieldset', AgDSFieldset)
    app.component('AgDSGroupedFields', AgDSGroupedFields)
    app.component('AgDSCallToActionLink', AgDSCallToActionLink)
    app.component('AgDSCallToActionButton', AgDSCallToActionButton)
    app.component('AgDSDirectionLink', AgDSDirectionLink)
    app.component('AgDSDirectionButton', AgDSDirectionButton)
    app.component('AgDSVisuallyHidden', AgDSVisuallyHidden)
    app.component('AgDSExternalLinkCallout', AgDSExternalLinkCallout)
    app.component('AgDSTextLink', AgDSTextLink)
    app.component('AgDSTextLinkExternal', AgDSTextLinkExternal)
    app.component('AgDSInpageNav', AgDSInpageNav)
    app.component('AgDSContent', AgDSContent)
    app.component('AgDSSectionContent', AgDSSectionContent)
    app.component('AgDSPageContent', AgDSPageContent)
    app.component('AgDSContentBleed', AgDSContentBleed)
    app.component('AgDSProse', AgDSProse)
    app.component('AgDSSkipLinks', AgDSSkipLinks)
    app.component('AgDSSummaryList', AgDSSummaryList)
    app.component('AgDSSummaryListItem', AgDSSummaryListItem)
    app.component('AgDSSummaryListItemTerm', AgDSSummaryListItemTerm)
    app.component('AgDSSummaryListItemDescription', AgDSSummaryListItemDescription)
    app.component('AgDSSummaryListItemAction', AgDSSummaryListItemAction)
    app.component('AgDSProgressIndicator', AgDSProgressIndicator)
    app.component('AgDSLoadingBlanket', AgDSLoadingBlanket)
    app.component('AgDSNotificationBadge', AgDSNotificationBadge)
    app.component('AgDSDropdownMenu', AgDSDropdownMenu)
    app.component('AgDSDropdownMenuButton', AgDSDropdownMenuButton)
    app.component('AgDSDropdownMenuPanel', AgDSDropdownMenuPanel)
    app.component('AgDSDropdownMenuItem', AgDSDropdownMenuItem)
    app.component('AgDSDropdownMenuItemLink', AgDSDropdownMenuItemLink)
    app.component('AgDSDropdownMenuItemRadio', AgDSDropdownMenuItemRadio)
    app.component('AgDSDropdownMenuGroup', AgDSDropdownMenuGroup)
    app.component('AgDSDropdownMenuDivider', AgDSDropdownMenuDivider)
    app.component('AgDSSearchBox', AgDSSearchBox)
    app.component('AgDSSearchBoxInput', AgDSSearchBoxInput)
    app.component('AgDSSearchBoxButton', AgDSSearchBoxButton)
    app.component('AgDSFileUpload', AgDSFileUpload)
    app.component('AgDSTextInput', AgDSTextInput)
    app.component('AgDSTextarea', AgDSTextarea)
    app.component('AgDSSearchInput', AgDSSearchInput)
    app.component('AgDSSelect', AgDSSelect)
    app.component('AgDSTimeInput', AgDSTimeInput)
    app.component('AgDSTimePicker', AgDSTimePicker)
  },
}

export default AgDSVue
