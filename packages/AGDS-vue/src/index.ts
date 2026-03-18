// Styles — tokens and base must come first so components can reference them
import './styles/tokens.css'
import './styles/base.css'

// Core — theming, tokens, and provider
export { AGDSCore, AGDSCoreProvider } from './core'
export type { AGDSCoreProps, AGDSCoreProviderProps } from './core'
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
export { AGDSBox } from './components/box'
export type {
  AGDSBoxProps,
  BoxDisplay,
  BoxFlexDirection,
  BoxFlexWrap,
  BoxAlignItems,
  BoxAlignSelf,
  BoxJustifyContent,
  BoxJustifySelf,
} from './components/box'

export { AGDSFlex } from './components/flex'
export type { AGDSFlexProps } from './components/flex'

export { AGDSColumns, AGDSColumn } from './components/columns'
export type { AGDSColumnsProps, AGDSColumnProps, ColumnRange, ColumnsAlignItems, ColumnAlignSelf, ColumnJustifySelf } from './components/columns'

export { AGDSFormStack } from './components/form-stack'
export type { AGDSFormStackProps } from './components/form-stack'

export { AGDSStack } from './components/stack'
export type { AGDSStackProps } from './components/stack'

export { AGDSBreadcrumbs, AGDSBreadcrumbsItem } from './components/breadcrumbs'
export type { AGDSBreadcrumbsProps, AGDSBreadcrumbsItemProps, BreadcrumbLink } from './components/breadcrumbs'

export { AGDSButton, AGDSButtonLink, AGDSToggleButton } from './components/button'
export type { AGDSButtonProps, AGDSButtonLinkProps, AGDSToggleButtonProps, ButtonVariant, ButtonSize } from './components/button'

export { AGDSAccordion, AGDSAccordionItem } from './components/accordion'
export type { AGDSAccordionProps, AGDSAccordionItemProps, AccordionType, AccordionBackground } from './components/accordion'

export { AGDSAvatar } from './components/avatar'
export type { AGDSAvatarProps, AvatarTone, AvatarSize } from './components/avatar'

export { AGDSCallout } from './components/callout'
export type { AGDSCalloutProps, CalloutTone, CalloutVariant } from './components/callout'

export { AGDSGlobalAlert } from './components/global-alert'
export type { AGDSGlobalAlertProps, GlobalAlertTone } from './components/global-alert'

export { AGDSSectionAlert } from './components/section-alert'
export type { AGDSSectionAlertProps, SectionAlertTone } from './components/section-alert'

export { AGDSStatusBadge } from './components/status-badge'

export {
  AGDSSummaryList,
  AGDSSummaryListItem,
  AGDSSummaryListItemTerm,
  AGDSSummaryListItemDescription,
  AGDSSummaryListItemAction,
} from './components/summary-list'
export type {
  AGDSSummaryListProps,
  AGDSSummaryListItemProps,
  AGDSSummaryListItemTermProps,
  AGDSSummaryListItemDescriptionProps,
  AGDSSummaryListItemActionProps,
} from './components/summary-list'
export type {
  AGDSStatusBadgeProps,
  StatusBadgeTone,
  StatusBadgeTones,
  StatusBadgeAppearance,
  StatusBadgeLegacyTone,
} from './components/status-badge'

export { AGDSPageAlert } from './components/page-alert'
export type { AGDSPageAlertProps, PageAlertTone } from './components/page-alert'

export { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink } from './components/card'
export type { AGDSCardProps, AGDSCardHeaderProps, AGDSCardFooterProps, AGDSCardLinkProps } from './components/card'

export { AGDSDetails } from './components/details'
export type { AGDSDetailsProps } from './components/details'

export { AGDSTag, AGDSTags } from './components/tags'
export type { AGDSTagProps, AGDSTagsProps, TagItem } from './components/tags'

export { AGDSFooter, AGDSFooterDivider } from './components/footer'
export type { AGDSFooterProps, AGDSFooterDividerProps } from './components/footer'

export { AGDSHeader } from './components/header'
export type { AGDSHeaderProps, HeaderBackground, HeaderMaxWidth, HeaderSize, HeaderDividerPosition } from './components/header'

export {
  AGDSDropdownMenu,
  AGDSDropdownMenuButton,
  AGDSDropdownMenuPanel,
  AGDSDropdownMenuItem,
  AGDSDropdownMenuItemLink,
  AGDSDropdownMenuItemRadio,
  AGDSDropdownMenuGroup,
  AGDSDropdownMenuDivider,
} from './components/dropdown-menu'
export type {
  AGDSDropdownMenuProps,
  AGDSDropdownMenuButtonProps,
  AGDSDropdownMenuItemProps,
  AGDSDropdownMenuItemLinkProps,
  AGDSDropdownMenuItemRadioProps,
  AGDSDropdownMenuGroupProps,
} from './components/dropdown-menu'

export { AGDSDivider } from './components/divider'
export type { AGDSDividerProps } from './components/divider'

export { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 } from './components/heading'
export type { AGDSHeadingProps, HeadingType } from './components/heading'

export { AGDSFeatureLinkList, AGDSFeatureLinkListItem } from './components/feature-link-list'
export type { AGDSFeatureLinkListProps, AGDSFeatureLinkListItemProps, FeatureLinkListLink, FeatureLinkListBackground } from './components/feature-link-list'

export { AGDSLinkList, AGDSLinkListItem } from './components/link-list'
export type { AGDSLinkListProps, AGDSLinkListItemProps, LinkListLink } from './components/link-list'

export { AGDSIcon } from './components/icon'
export type { AGDSIconProps, IconSize } from './components/icon'

export { AGDSUnorderedList, AGDSOrderedList, AGDSListItem } from './components/list'
export type { AGDSUnorderedListProps, AGDSOrderedListProps, AGDSListItemProps } from './components/list'

export { AGDSText } from './components/text'
export type { AGDSTextProps, TextColor, TextFamily, TextSize, TextWeight, TextLeading } from './components/text'

export { AGDSPagination, AGDSPaginationButtons, usePagination } from './components/pagination'
export type { AGDSPaginationProps, AGDSPaginationButtonsProps, PaginationItem, UsePaginationOptions } from './components/pagination'

export { AGDSModal } from './components/modal'
export type { AGDSModalProps } from './components/modal'

export { AGDSDrawer } from './components/drawer'
export type { AGDSDrawerProps, DrawerWidth } from './components/drawer'

export { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel } from './components/tabs'
export type { AGDSTabsProps, AGDSTabListProps, AGDSTabProps, AGDSTabPanelProps, TabsBackground } from './components/tabs'

export { AGDSCheckbox, AGDSCheckboxGroup } from './components/checkbox'
export type { AGDSCheckboxProps, AGDSCheckboxGroupProps, CheckboxSize, CheckboxGroupContext } from './components/checkbox'
export { CHECKBOX_GROUP_KEY } from './components/checkbox'

export { AGDSControlGroup } from './components/control-group'
export type { AGDSControlGroupProps, ControlGroupContext } from './components/control-group'
export { CONTROL_GROUP_KEY } from './components/control-group'

export { AGDSSwitch } from './components/switch'
export type { AGDSSwitchProps, SwitchSize } from './components/switch'

export { AGDSRadio, AGDSRadioGroup } from './components/radio'
export type { AGDSRadioProps, AGDSRadioGroupProps, RadioSize, RadioGroupContext } from './components/radio'
export { RADIO_GROUP_KEY } from './components/radio'

export { AGDSCallToActionLink, AGDSCallToActionButton } from './components/call-to-action'
export type { AGDSCallToActionLinkProps, AGDSCallToActionButtonProps } from './components/call-to-action'

export { AGDSDirectionLink, AGDSDirectionButton } from './components/direction-link'
export type { AGDSDirectionLinkProps, AGDSDirectionButtonProps, Direction } from './components/direction-link'

export { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete } from './components/autocomplete'
export type { AGDSComboboxProps, AGDSComboboxMultiProps, AGDSComboboxAsyncProps, AGDSComboboxAsyncMultiProps, AGDSAutocompleteProps, DefaultComboboxOption, ComboboxMaxWidth } from './components/autocomplete'
export { filterOptions } from './components/autocomplete'

export { AGDSDatePicker } from './components/date-picker'
export type { AGDSDatePickerProps, DatePickerSingleValue, DatePickerRangeValue } from './components/date-picker'

export { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage } from './components/field'
export type { AGDSFieldProps, AGDSFieldContainerProps, AGDSFieldLabelProps, AGDSFieldHintProps, AGDSFieldMessageProps } from './components/field'
export { useScrollToField } from './components/field'

export { AGDSFieldset } from './components/fieldset'
export type { AGDSFieldsetProps } from './components/fieldset'

export { AGDSGroupedFields, GROUPED_FIELDS_DATA_ATTR } from './components/grouped-fields'
export type { AGDSGroupedFieldsProps } from './components/grouped-fields'

export { AGDSFileInput } from './components/file-input'
export type { AGDSFileInputProps, AcceptedFileMimeTypes } from './components/file-input'

export { AGDSFileUpload } from './components/file-upload'
export type { AGDSFileUploadProps, FileWithStatus, FileStatus, RejectedFile, ExistingFile, CustomFileMimeType } from './components/file-upload'
export { formatFileSize } from './components/file-upload'

export { AGDSTextInput } from './components/text-input'
export type { AGDSTextInputProps } from './components/text-input'

export { AGDSTimeInput } from './components/time-input'
export type { AGDSTimeInputProps, TimeValue } from './components/time-input'
export type { TimeFormat } from './components/time-input'
export { acceptedTimeFormats, formatTime, transformValuePropToInputValue } from './components/time-input'

export { AGDSTimePicker } from './components/time-picker'
export type { AGDSTimePickerProps } from './components/time-picker'
export { generateOptions } from './components/time-picker'

export { AGDSTextarea } from './components/textarea'
export type { AGDSTextareaProps, TextareaMaxWidth } from './components/textarea'

export { AGDSPasswordInput } from './components/password-input'
export type { AGDSPasswordInputProps } from './components/password-input'

export { AGDSSearchInput } from './components/search-input'
export type { AGDSSearchInputProps, SearchInputMaxWidth } from './components/search-input'

export { AGDSSelect } from './components/select'
export type { AGDSSelectProps, Option, OptionGroup, Options, SelectMaxWidth } from './components/select'

export { AGDSTaskList, AGDSTaskListItem } from './components/task-list'
export type { AGDSTaskListProps, TaskListItem, AGDSTaskListItemProps, TaskListItemStatus } from './components/task-list'

export { AGDSMainNav } from './components/main-nav'
export type {
  AGDSMainNavProps,
  MainNavBackground,
  MainNavBorderColor,
  MainNavItem,
  MainNavLinkItem,
  MainNavButtonItem,
  MainNavDropdownItem,
} from './components/main-nav'

export { AGDSSideNav } from './components/side-nav'
export type { AGDSSideNavProps, SideNavBackground, SideNavSubLevelVisible, SideNavItem } from './components/side-nav'

export { AGDSCollapsingSideBar } from './components/collapsing-side-bar'
export type { AGDSCollapsingSideBarProps, CollapsingSideBarBackground, CollapsingSideBarAs } from './components/collapsing-side-bar'

export { AGDSFilterSidebar } from './components/filter-sidebar'
export type { AGDSFilterSidebarProps } from './components/filter-sidebar'

export { AGDSSubNav } from './components/sub-nav'
export type { AGDSSubNavProps, SubNavBackground, SubNavLink } from './components/sub-nav'

export { AGDSLoadingBlanket } from './components/loading-blanket'
export type { AGDSLoadingBlanketProps } from './components/loading-blanket'

export { AGDSNotificationBadge } from './components/notification-badge'
export type { AGDSNotificationBadgeProps, BadgeTone } from './components/notification-badge'

export { AGDSVisuallyHidden, AGDSExternalLinkCallout } from './components/visually-hidden'
export type { AGDSVisuallyHiddenProps } from './components/visually-hidden'

export { AGDSTextLink, AGDSTextLinkExternal } from './components/text-link'
export type { AGDSTextLinkProps, AGDSTextLinkExternalProps } from './components/text-link'

export { AGDSInpageNav } from './components/inpage-nav'
export type { AGDSInpageNavProps, InpageNavLink } from './components/inpage-nav'

export { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed } from './components/content'
export type { AGDSContentProps, AGDSSectionContentProps, AGDSPageContentProps, AGDSContentBleedProps, ContentSpacing, ContentBleedVisible } from './components/content'

export { AGDSProse } from './components/prose'
export type { AGDSProseProps } from './components/prose'

export { AGDSSkipLinks } from './components/skip-link'
export type { AGDSSkipLinksProps, SkipLink } from './components/skip-link'

export { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton } from './components/search-box'
export type { AGDSSearchBoxProps, AGDSSearchBoxInputProps, AGDSSearchBoxButtonProps } from './components/search-box'

export { AGDSProgressIndicator } from './components/progress-indicator'
export type {
  AGDSProgressIndicatorProps,
  ProgressIndicatorItem,
  ProgressIndicatorItemStatus,
  ProgressIndicatorBackground,
  ProgressIndicatorLevelTwoItem,
} from './components/progress-indicator'

export {
  AGDSAppLayout,
  AGDSAppLayoutHeader,
  AGDSAppLayoutSidebar,
  AGDSAppLayoutSidebarNav,
  AGDSAppLayoutFooter,
  AGDSAppLayoutFooterDivider,
} from './components/app-layout'
export type {
  AGDSAppLayoutProps,
  AGDSAppLayoutHeaderProps,
  AGDSAppLayoutSidebarProps,
  AGDSAppLayoutSidebarNavProps,
  AGDSAppLayoutFooterProps,
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
  AGDSTable,
  AGDSTableBody,
  AGDSTableCaption,
  AGDSTableHead,
  AGDSTableHeader,
  AGDSTableHeaderSortable,
  AGDSTableCell,
  AGDSTableRow,
  AGDSTableScroller,
} from './components/table'
export type {
  AGDSTableProps,
  TableLayout,
  AGDSTableHeaderProps,
  AGDSTableHeaderSortableProps,
  TableSortDirection,
  AGDSTableCellProps,
  AGDSTableRowProps,
  TableRowBackground,
} from './components/table'

// Plugin — registers all components globally
import type { App } from 'vue'
import { AGDSCore, AGDSCoreProvider } from './core'
import { AGDSBox } from './components/box'
import { AGDSFlex } from './components/flex'
import { AGDSColumns, AGDSColumn } from './components/columns'
import { AGDSFormStack } from './components/form-stack'
import { AGDSStack } from './components/stack'
import { AGDSBreadcrumbs, AGDSBreadcrumbsItem } from './components/breadcrumbs'
import { AGDSButton, AGDSButtonLink, AGDSToggleButton } from './components/button'
import { AGDSAccordion, AGDSAccordionItem } from './components/accordion'
import { AGDSAvatar } from './components/avatar'
import { AGDSCallout } from './components/callout'
import { AGDSGlobalAlert } from './components/global-alert'
import { AGDSSectionAlert } from './components/section-alert'
import { AGDSPageAlert } from './components/page-alert'
import { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink } from './components/card'
import { AGDSDetails } from './components/details'
import { AGDSTag, AGDSTags } from './components/tags'
import { AGDSFooter, AGDSFooterDivider } from './components/footer'
import { AGDSHeader } from './components/header'
import { AGDSDivider } from './components/divider'
import { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 } from './components/heading'
import { AGDSFeatureLinkList, AGDSFeatureLinkListItem } from './components/feature-link-list'
import { AGDSLinkList, AGDSLinkListItem } from './components/link-list'
import { AGDSIcon } from './components/icon'
import { AGDSUnorderedList, AGDSOrderedList, AGDSListItem } from './components/list'
import { AGDSText } from './components/text'
import { AGDSPagination, AGDSPaginationButtons } from './components/pagination'
import {
  AGDSDropdownMenu,
  AGDSDropdownMenuButton,
  AGDSDropdownMenuPanel,
  AGDSDropdownMenuItem,
  AGDSDropdownMenuItemLink,
  AGDSDropdownMenuItemRadio,
  AGDSDropdownMenuGroup,
  AGDSDropdownMenuDivider,
} from './components/dropdown-menu'
import { AGDSSideNav } from './components/side-nav'
import { AGDSCollapsingSideBar } from './components/collapsing-side-bar'
import { AGDSFilterSidebar } from './components/filter-sidebar'
import { AGDSSubNav } from './components/sub-nav'
import { AGDSMainNav } from './components/main-nav'
import { AGDSModal } from './components/modal'
import { AGDSDrawer } from './components/drawer'
import { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel } from './components/tabs'
import { AGDSCheckbox, AGDSCheckboxGroup } from './components/checkbox'
import { AGDSSwitch } from './components/switch'
import { AGDSRadio, AGDSRadioGroup } from './components/radio'
import { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete } from './components/autocomplete'
import { AGDSDatePicker } from './components/date-picker'
import { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage } from './components/field'
import { AGDSFieldset } from './components/fieldset'
import { AGDSGroupedFields } from './components/grouped-fields'
import { AGDSCallToActionLink, AGDSCallToActionButton } from './components/call-to-action'
import { AGDSDirectionLink, AGDSDirectionButton } from './components/direction-link'
import { AGDSLoadingBlanket } from './components/loading-blanket'
import { AGDSNotificationBadge } from './components/notification-badge'
import { AGDSVisuallyHidden, AGDSExternalLinkCallout } from './components/visually-hidden'
import { AGDSTextLink, AGDSTextLinkExternal } from './components/text-link'
import { AGDSInpageNav } from './components/inpage-nav'
import { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed } from './components/content'
import { AGDSProse } from './components/prose'
import { AGDSSkipLinks } from './components/skip-link'
import {
  AGDSSummaryList,
  AGDSSummaryListItem,
  AGDSSummaryListItemTerm,
  AGDSSummaryListItemDescription,
  AGDSSummaryListItemAction,
} from './components/summary-list'
import { AGDSProgressIndicator } from './components/progress-indicator'
import { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton } from './components/search-box'
import { AGDSFileUpload } from './components/file-upload'
import { AGDSTextInput } from './components/text-input'
import { AGDSTimeInput } from './components/time-input'
import { AGDSTimePicker } from './components/time-picker'
import { AGDSTextarea } from './components/textarea'
import { AGDSSearchInput } from './components/search-input'
import { AGDSSelect } from './components/select'
import {
  AGDSAppLayout,
  AGDSAppLayoutHeader,
  AGDSAppLayoutSidebar,
  AGDSAppLayoutSidebarNav,
  AGDSAppLayoutFooter,
  AGDSAppLayoutFooterDivider,
} from './components/app-layout'
import {
  AGDSTable,
  AGDSTableBody,
  AGDSTableCaption,
  AGDSTableHead,
  AGDSTableHeader,
  AGDSTableHeaderSortable,
  AGDSTableCell,
  AGDSTableRow,
  AGDSTableScroller,
} from './components/table'

export const AGDSVue = {
  install(app: App) {
    app.component('AGDSCore', AGDSCore)
    app.component('AGDSCoreProvider', AGDSCoreProvider)
    app.component('AGDSBox', AGDSBox)
    app.component('AGDSFlex', AGDSFlex)
    app.component('AGDSColumns', AGDSColumns)
    app.component('AGDSColumn', AGDSColumn)
    app.component('AGDSFormStack', AGDSFormStack)
    app.component('AGDSStack', AGDSStack)
    app.component('AGDSBreadcrumbs', AGDSBreadcrumbs)
    app.component('AGDSBreadcrumbsItem', AGDSBreadcrumbsItem)
    app.component('AGDSButton', AGDSButton)
    app.component('AGDSButtonLink', AGDSButtonLink)
    app.component('AGDSToggleButton', AGDSToggleButton)
    app.component('AGDSAccordion', AGDSAccordion)
    app.component('AGDSAccordionItem', AGDSAccordionItem)
    app.component('AGDSAvatar', AGDSAvatar)
    app.component('AGDSCallout', AGDSCallout)
    app.component('AGDSGlobalAlert', AGDSGlobalAlert)
    app.component('AGDSSectionAlert', AGDSSectionAlert)
    app.component('AGDSPageAlert', AGDSPageAlert)
    app.component('AGDSCard', AGDSCard)
    app.component('AGDSCardHeader', AGDSCardHeader)
    app.component('AGDSCardFooter', AGDSCardFooter)
    app.component('AGDSCardInner', AGDSCardInner)
    app.component('AGDSCardLink', AGDSCardLink)
    app.component('AGDSDetails', AGDSDetails)
    app.component('AGDSTag', AGDSTag)
    app.component('AGDSTags', AGDSTags)
    app.component('AGDSFooter', AGDSFooter)
    app.component('AGDSFooterDivider', AGDSFooterDivider)
    app.component('AGDSHeader', AGDSHeader)
    app.component('AGDSDivider', AGDSDivider)
    app.component('AGDSHeading', AGDSHeading)
    app.component('AGDSH1', AGDSH1)
    app.component('AGDSH2', AGDSH2)
    app.component('AGDSH3', AGDSH3)
    app.component('AGDSH4', AGDSH4)
    app.component('AGDSH5', AGDSH5)
    app.component('AGDSH6', AGDSH6)
    app.component('AGDSFeatureLinkList', AGDSFeatureLinkList)
    app.component('AGDSFeatureLinkListItem', AGDSFeatureLinkListItem)
    app.component('AGDSLinkList', AGDSLinkList)
    app.component('AGDSLinkListItem', AGDSLinkListItem)
    app.component('AGDSIcon', AGDSIcon)
    app.component('AGDSUnorderedList', AGDSUnorderedList)
    app.component('AGDSOrderedList', AGDSOrderedList)
    app.component('AGDSListItem', AGDSListItem)
    app.component('AGDSText', AGDSText)
    app.component('AGDSTable', AGDSTable)
    app.component('AGDSTableBody', AGDSTableBody)
    app.component('AGDSTableCaption', AGDSTableCaption)
    app.component('AGDSTableHead', AGDSTableHead)
    app.component('AGDSTableHeader', AGDSTableHeader)
    app.component('AGDSTableHeaderSortable', AGDSTableHeaderSortable)
    app.component('AGDSTableCell', AGDSTableCell)
    app.component('AGDSTableRow', AGDSTableRow)
    app.component('AGDSTableScroller', AGDSTableScroller)
    app.component('AGDSAppLayout', AGDSAppLayout)
    app.component('AGDSAppLayoutHeader', AGDSAppLayoutHeader)
    app.component('AGDSAppLayoutSidebar', AGDSAppLayoutSidebar)
    app.component('AGDSAppLayoutSidebarNav', AGDSAppLayoutSidebarNav)
    app.component('AGDSAppLayoutFooter', AGDSAppLayoutFooter)
    app.component('AGDSAppLayoutFooterDivider', AGDSAppLayoutFooterDivider)
    app.component('AGDSSideNav', AGDSSideNav)
    app.component('AGDSCollapsingSideBar', AGDSCollapsingSideBar)
    app.component('AGDSFilterSidebar', AGDSFilterSidebar)
    app.component('AGDSSubNav', AGDSSubNav)
    app.component('AGDSMainNav', AGDSMainNav)
    app.component('AGDSModal', AGDSModal)
    app.component('AGDSDrawer', AGDSDrawer)
    app.component('AGDSTabs', AGDSTabs)
    app.component('AGDSTabList', AGDSTabList)
    app.component('AGDSTab', AGDSTab)
    app.component('AGDSTabPanel', AGDSTabPanel)
    app.component('AGDSPagination', AGDSPagination)
    app.component('AGDSPaginationButtons', AGDSPaginationButtons)
    app.component('AGDSCheckbox', AGDSCheckbox)
    app.component('AGDSCheckboxGroup', AGDSCheckboxGroup)
    app.component('AGDSSwitch', AGDSSwitch)
    app.component('AGDSRadio', AGDSRadio)
    app.component('AGDSRadioGroup', AGDSRadioGroup)
    app.component('AGDSCombobox', AGDSCombobox)
    app.component('AGDSComboboxMulti', AGDSComboboxMulti)
    app.component('AGDSComboboxAsync', AGDSComboboxAsync)
    app.component('AGDSComboboxAsyncMulti', AGDSComboboxAsyncMulti)
    app.component('AGDSAutocomplete', AGDSAutocomplete)
    app.component('AGDSDatePicker', AGDSDatePicker)
    app.component('AGDSField', AGDSField)
    app.component('AGDSFieldContainer', AGDSFieldContainer)
    app.component('AGDSFieldLabel', AGDSFieldLabel)
    app.component('AGDSFieldHint', AGDSFieldHint)
    app.component('AGDSFieldMessage', AGDSFieldMessage)
    app.component('AGDSFieldset', AGDSFieldset)
    app.component('AGDSGroupedFields', AGDSGroupedFields)
    app.component('AGDSCallToActionLink', AGDSCallToActionLink)
    app.component('AGDSCallToActionButton', AGDSCallToActionButton)
    app.component('AGDSDirectionLink', AGDSDirectionLink)
    app.component('AGDSDirectionButton', AGDSDirectionButton)
    app.component('AGDSVisuallyHidden', AGDSVisuallyHidden)
    app.component('AGDSExternalLinkCallout', AGDSExternalLinkCallout)
    app.component('AGDSTextLink', AGDSTextLink)
    app.component('AGDSTextLinkExternal', AGDSTextLinkExternal)
    app.component('AGDSInpageNav', AGDSInpageNav)
    app.component('AGDSContent', AGDSContent)
    app.component('AGDSSectionContent', AGDSSectionContent)
    app.component('AGDSPageContent', AGDSPageContent)
    app.component('AGDSContentBleed', AGDSContentBleed)
    app.component('AGDSProse', AGDSProse)
    app.component('AGDSSkipLinks', AGDSSkipLinks)
    app.component('AGDSSummaryList', AGDSSummaryList)
    app.component('AGDSSummaryListItem', AGDSSummaryListItem)
    app.component('AGDSSummaryListItemTerm', AGDSSummaryListItemTerm)
    app.component('AGDSSummaryListItemDescription', AGDSSummaryListItemDescription)
    app.component('AGDSSummaryListItemAction', AGDSSummaryListItemAction)
    app.component('AGDSProgressIndicator', AGDSProgressIndicator)
    app.component('AGDSLoadingBlanket', AGDSLoadingBlanket)
    app.component('AGDSNotificationBadge', AGDSNotificationBadge)
    app.component('AGDSDropdownMenu', AGDSDropdownMenu)
    app.component('AGDSDropdownMenuButton', AGDSDropdownMenuButton)
    app.component('AGDSDropdownMenuPanel', AGDSDropdownMenuPanel)
    app.component('AGDSDropdownMenuItem', AGDSDropdownMenuItem)
    app.component('AGDSDropdownMenuItemLink', AGDSDropdownMenuItemLink)
    app.component('AGDSDropdownMenuItemRadio', AGDSDropdownMenuItemRadio)
    app.component('AGDSDropdownMenuGroup', AGDSDropdownMenuGroup)
    app.component('AGDSDropdownMenuDivider', AGDSDropdownMenuDivider)
    app.component('AGDSSearchBox', AGDSSearchBox)
    app.component('AGDSSearchBoxInput', AGDSSearchBoxInput)
    app.component('AGDSSearchBoxButton', AGDSSearchBoxButton)
    app.component('AGDSFileUpload', AGDSFileUpload)
    app.component('AGDSTextInput', AGDSTextInput)
    app.component('AGDSTextarea', AGDSTextarea)
    app.component('AGDSSearchInput', AGDSSearchInput)
    app.component('AGDSSelect', AGDSSelect)
    app.component('AGDSTimeInput', AGDSTimeInput)
    app.component('AGDSTimePicker', AGDSTimePicker)
  },
}

export default AGDSVue
