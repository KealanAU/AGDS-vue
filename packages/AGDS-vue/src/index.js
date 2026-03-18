import './styles/tokens.css';
import './styles/base.css';
// Core — theming, tokens, and provider
import { AGDSCore, AGDSCoreProvider } from './core';
import { boxPalette, boxPalettes, useBoxPalette, CORE_CONTEXT_KEY, goldTheme, printTheme, packs, print, fontGrid, breakpointNames, mapResponsiveProp, mediaQueryMin, mergeTheme, themeVars, themeToVars, mapSpacing, tokens, } from './core';
export { AGDSCore, AGDSCoreProvider, boxPalette, boxPalettes, useBoxPalette, CORE_CONTEXT_KEY, goldTheme, printTheme, packs, print, fontGrid, breakpointNames, mapResponsiveProp, mediaQueryMin, mergeTheme, themeVars, themeToVars, mapSpacing, tokens, };
// Components
import { AGDSBox } from './components/box';
export { AGDSBox };
import { AGDSFlex } from './components/flex';
export { AGDSFlex };
import { AGDSColumns, AGDSColumn } from './components/columns';
export { AGDSColumns, AGDSColumn };
import { AGDSFormStack } from './components/form-stack';
export { AGDSFormStack };
import { AGDSStack } from './components/stack';
export { AGDSStack };
import { AGDSBreadcrumbs, AGDSBreadcrumbsItem } from './components/breadcrumbs';
export { AGDSBreadcrumbs, AGDSBreadcrumbsItem };
import { AGDSButton, AGDSButtonLink, AGDSToggleButton } from './components/button';
export { AGDSButton, AGDSButtonLink, AGDSToggleButton };
import { AGDSAccordion, AGDSAccordionItem } from './components/accordion';
export { AGDSAccordion, AGDSAccordionItem };
import { AGDSAvatar } from './components/avatar';
export { AGDSAvatar };
import { AGDSCallout } from './components/callout';
export { AGDSCallout };
import { AGDSGlobalAlert } from './components/global-alert';
export { AGDSGlobalAlert };
import { AGDSSectionAlert } from './components/section-alert';
export { AGDSSectionAlert };
import { AGDSStatusBadge } from './components/status-badge';
export { AGDSStatusBadge };
import { AGDSSummaryList, AGDSSummaryListItem, AGDSSummaryListItemTerm, AGDSSummaryListItemDescription, AGDSSummaryListItemAction, } from './components/summary-list';
export { AGDSSummaryList, AGDSSummaryListItem, AGDSSummaryListItemTerm, AGDSSummaryListItemDescription, AGDSSummaryListItemAction, };
import { AGDSPageAlert } from './components/page-alert';
export { AGDSPageAlert };
import { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink } from './components/card';
export { AGDSCard, AGDSCardHeader, AGDSCardFooter, AGDSCardInner, AGDSCardLink };
import { AGDSDetails } from './components/details';
export { AGDSDetails };
import { AGDSTag, AGDSTags } from './components/tags';
export { AGDSTag, AGDSTags };
import { AGDSFooter, AGDSFooterDivider } from './components/footer';
export { AGDSFooter, AGDSFooterDivider };
import { AGDSHeader } from './components/header';
export { AGDSHeader };
import { AGDSDropdownMenu, AGDSDropdownMenuButton, AGDSDropdownMenuPanel, AGDSDropdownMenuItem, AGDSDropdownMenuItemLink, AGDSDropdownMenuItemRadio, AGDSDropdownMenuGroup, AGDSDropdownMenuDivider, } from './components/dropdown-menu';
export { AGDSDropdownMenu, AGDSDropdownMenuButton, AGDSDropdownMenuPanel, AGDSDropdownMenuItem, AGDSDropdownMenuItemLink, AGDSDropdownMenuItemRadio, AGDSDropdownMenuGroup, AGDSDropdownMenuDivider, };
import { AGDSDivider } from './components/divider';
export { AGDSDivider };
import { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 } from './components/heading';
export { AGDSHeading, AGDSH1, AGDSH2, AGDSH3, AGDSH4, AGDSH5, AGDSH6 };
import { AGDSFeatureLinkList, AGDSFeatureLinkListItem } from './components/feature-link-list';
export { AGDSFeatureLinkList, AGDSFeatureLinkListItem };
import { AGDSLinkList, AGDSLinkListItem } from './components/link-list';
export { AGDSLinkList, AGDSLinkListItem };
import { AGDSIcon } from './components/icon';
export { AGDSIcon };
import { AGDSUnorderedList, AGDSOrderedList, AGDSListItem } from './components/list';
export { AGDSUnorderedList, AGDSOrderedList, AGDSListItem };
import { AGDSText } from './components/text';
export { AGDSText };
import { AGDSPagination, AGDSPaginationButtons, usePagination } from './components/pagination';
export { AGDSPagination, AGDSPaginationButtons, usePagination };
import { AGDSModal } from './components/modal';
export { AGDSModal };
import { AGDSDrawer } from './components/drawer';
export { AGDSDrawer };
import { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel } from './components/tabs';
export { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel };
import { AGDSCheckbox, AGDSCheckboxGroup, CHECKBOX_GROUP_KEY } from './components/checkbox';
export { AGDSCheckbox, AGDSCheckboxGroup, CHECKBOX_GROUP_KEY };
import { AGDSControlGroup, CONTROL_GROUP_KEY } from './components/control-group';
export { AGDSControlGroup, CONTROL_GROUP_KEY };
import { AGDSSwitch } from './components/switch';
export { AGDSSwitch };
import { AGDSRadio, AGDSRadioGroup, RADIO_GROUP_KEY } from './components/radio';
export { AGDSRadio, AGDSRadioGroup, RADIO_GROUP_KEY };
import { AGDSCallToActionLink, AGDSCallToActionButton } from './components/call-to-action';
export { AGDSCallToActionLink, AGDSCallToActionButton };
import { AGDSDirectionLink, AGDSDirectionButton } from './components/direction-link';
export { AGDSDirectionLink, AGDSDirectionButton };
import { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete, filterOptions } from './components/autocomplete';
export { AGDSCombobox, AGDSComboboxMulti, AGDSComboboxAsync, AGDSComboboxAsyncMulti, AGDSAutocomplete, filterOptions };
import { AGDSDatePicker } from './components/date-picker';
export { AGDSDatePicker };
import { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage, useScrollToField } from './components/field';
export { AGDSField, AGDSFieldContainer, AGDSFieldLabel, AGDSFieldHint, AGDSFieldMessage, useScrollToField };
import { AGDSFieldset } from './components/fieldset';
export { AGDSFieldset };
import { AGDSGroupedFields, GROUPED_FIELDS_DATA_ATTR } from './components/grouped-fields';
export { AGDSGroupedFields, GROUPED_FIELDS_DATA_ATTR };
import { AGDSFileInput } from './components/file-input';
export { AGDSFileInput };
import { AGDSFileUpload, formatFileSize } from './components/file-upload';
export { AGDSFileUpload, formatFileSize };
import { AGDSTextInput } from './components/text-input';
export { AGDSTextInput };
import { AGDSTimeInput, acceptedTimeFormats, formatTime, transformValuePropToInputValue } from './components/time-input';
export { AGDSTimeInput, acceptedTimeFormats, formatTime, transformValuePropToInputValue };
import { AGDSTimePicker, generateOptions } from './components/time-picker';
export { AGDSTimePicker, generateOptions };
import { AGDSTextarea } from './components/textarea';
export { AGDSTextarea };
import { AGDSPasswordInput } from './components/password-input';
export { AGDSPasswordInput };
import { AGDSSearchInput } from './components/search-input';
export { AGDSSearchInput };
import { AGDSSelect } from './components/select';
export { AGDSSelect };
import { AGDSTaskList, AGDSTaskListItem } from './components/task-list';
export { AGDSTaskList, AGDSTaskListItem };
import { AGDSMainNav } from './components/main-nav';
export { AGDSMainNav };
import { AGDSSideNav } from './components/side-nav';
export { AGDSSideNav };
import { AGDSCollapsingSideBar } from './components/collapsing-side-bar';
export { AGDSCollapsingSideBar };
import { AGDSFilterSidebar } from './components/filter-sidebar';
export { AGDSFilterSidebar };
import { AGDSSubNav } from './components/sub-nav';
export { AGDSSubNav };
import { AGDSLoadingBlanket } from './components/loading-blanket';
export { AGDSLoadingBlanket };
import { AGDSNotificationBadge } from './components/notification-badge';
export { AGDSNotificationBadge };
import { AGDSVisuallyHidden, AGDSExternalLinkCallout } from './components/visually-hidden';
export { AGDSVisuallyHidden, AGDSExternalLinkCallout };
import { AGDSTextLink, AGDSTextLinkExternal } from './components/text-link';
export { AGDSTextLink, AGDSTextLinkExternal };
import { AGDSInpageNav } from './components/inpage-nav';
export { AGDSInpageNav };
import { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed } from './components/content';
export { AGDSContent, AGDSSectionContent, AGDSPageContent, AGDSContentBleed };
import { AGDSProse } from './components/prose';
export { AGDSProse };
import { AGDSSkipLinks } from './components/skip-link';
export { AGDSSkipLinks };
import { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton } from './components/search-box';
export { AGDSSearchBox, AGDSSearchBoxInput, AGDSSearchBoxButton };
import { AGDSProgressIndicator } from './components/progress-indicator';
export { AGDSProgressIndicator };
import { AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar, AGDSAppLayoutSidebarNav, AGDSAppLayoutFooter, AGDSAppLayoutFooterDivider, } from './components/app-layout';
export { AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar, AGDSAppLayoutSidebarNav, AGDSAppLayoutFooter, AGDSAppLayoutFooterDivider, };
import { AGDSTable, AGDSTableBody, AGDSTableCaption, AGDSTableHead, AGDSTableHeader, AGDSTableHeaderSortable, AGDSTableCell, AGDSTableRow, AGDSTableScroller, } from './components/table';
export { AGDSTable, AGDSTableBody, AGDSTableCaption, AGDSTableHead, AGDSTableHeader, AGDSTableHeaderSortable, AGDSTableCell, AGDSTableRow, AGDSTableScroller, };
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
};
export { componentNames } from './componentNames';
export const AGDSVue = {
    install(app) {
        for (const [name, component] of Object.entries(components)) {
            app.component(name, component);
        }
    },
};
export default AGDSVue;
