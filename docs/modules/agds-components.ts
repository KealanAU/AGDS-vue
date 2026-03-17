import { defineNuxtModule, addComponent } from '@nuxt/kit'

// All components exported from agds-vue. Registering them here puts them into
// Nuxt's component registry so Nuxt Content's MDC renderer can resolve them
// (components registered only via app.component() in a plugin are invisible
// to the MDC compiler's component list).
const AGDS_COMPONENTS = [
  'AgDSAccordion',
  'AgDSAccordionItem',
  'AgDSAppLayout',
  'AgDSAppLayoutFooter',
  'AgDSAppLayoutFooterDivider',
  'AgDSAppLayoutHeader',
  'AgDSAppLayoutSidebar',
  'AgDSAppLayoutSidebarNav',
  'AgDSAutocomplete',
  'AgDSAvatar',
  'AgDSBox',
  'AgDSBreadcrumbs',
  'AgDSBreadcrumbsItem',
  'AgDSButton',
  'AgDSButtonLink',
  'AgDSCallout',
  'AgDSCallToActionButton',
  'AgDSCallToActionLink',
  'AgDSCard',
  'AgDSCardFooter',
  'AgDSCardHeader',
  'AgDSCardInner',
  'AgDSCardLink',
  'AgDSCheckbox',
  'AgDSCheckboxGroup',
  'AgDSCollapsingSideBar',
  'AgDSColumn',
  'AgDSColumns',
  'AgDSCombobox',
  'AgDSComboboxAsync',
  'AgDSComboboxAsyncMulti',
  'AgDSComboboxMulti',
  'AgDSContent',
  'AgDSContentBleed',
  'AgDSCore',
  'AgDSCoreProvider',
  'AgDSDatePicker',
  'AgDSDetails',
  'AgDSDirectionButton',
  'AgDSDirectionLink',
  'AgDSDivider',
  'AgDSDrawer',
  'AgDSDropdownMenu',
  'AgDSDropdownMenuButton',
  'AgDSDropdownMenuDivider',
  'AgDSDropdownMenuGroup',
  'AgDSDropdownMenuItem',
  'AgDSDropdownMenuItemLink',
  'AgDSDropdownMenuItemRadio',
  'AgDSDropdownMenuPanel',
  'AgDSExternalLinkCallout',
  'AgDSFeatureLinkList',
  'AgDSFeatureLinkListItem',
  'AgDSField',
  'AgDSFieldContainer',
  'AgDSFieldHint',
  'AgDSFieldLabel',
  'AgDSFieldMessage',
  'AgDSFieldset',
  'AgDSFileUpload',
  'AgDSFilterSidebar',
  'AgDSFlex',
  'AgDSFooter',
  'AgDSFooterDivider',
  'AgDSFormStack',
  'AgDSGlobalAlert',
  'AgDSGroupedFields',
  'AgDSHeader',
  'AgDSHeading',
  'AgDSH1',
  'AgDSH2',
  'AgDSH3',
  'AgDSH4',
  'AgDSH5',
  'AgDSH6',
  'AgDSIcon',
  'AgDSInpageNav',
  'AgDSLinkList',
  'AgDSLinkListItem',
  'AgDSListItem',
  'AgDSLoadingBlanket',
  'AgDSMainNav',
  'AgDSModal',
  'AgDSNotificationBadge',
  'AgDSOrderedList',
  'AgDSPageAlert',
  'AgDSPageContent',
  'AgDSPagination',
  'AgDSPaginationButtons',
  'AgDSProgressIndicator',
  'AgDSProse',
  'AgDSRadio',
  'AgDSRadioGroup',
  'AgDSSearchBox',
  'AgDSSearchBoxButton',
  'AgDSSearchBoxInput',
  'AgDSSearchInput',
  'AgDSSectionAlert',
  'AgDSSectionContent',
  'AgDSSelect',
  'AgDSSideNav',
  'AgDSSkipLinks',
  'AgDSStack',
  'AgDSSubNav',
  'AgDSSummaryList',
  'AgDSSummaryListItem',
  'AgDSSummaryListItemAction',
  'AgDSSummaryListItemDescription',
  'AgDSSummaryListItemTerm',
  'AgDSSwitch',
  'AgDSTab',
  'AgDSTable',
  'AgDSTableBody',
  'AgDSTableCaption',
  'AgDSTableCell',
  'AgDSTableHead',
  'AgDSTableHeader',
  'AgDSTableHeaderSortable',
  'AgDSTableRow',
  'AgDSTableScroller',
  'AgDSTabList',
  'AgDSTabPanel',
  'AgDSTabs',
  'AgDSTag',
  'AgDSTags',
  'AgDSText',
  'AgDSTextarea',
  'AgDSTextInput',
  'AgDSTextLink',
  'AgDSTextLinkExternal',
  'AgDSTimeInput',
  'AgDSTimePicker',
  'AgDSToggleButton',
  'AgDSUnorderedList',
  'AgDSVisuallyHidden',
]

// MDC runs component names through the HTML parser which lowercases all tag
// names, then capitalises only the first character. So <AgDSAccordionItem>
// becomes "agdsaccordionitem" → "Agdsaccordionitem". We must register each
// component under that normalised name as well so the MDC resolver finds it.
function mdcName(name: string): string {
  const lower = name.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

export default defineNuxtModule({
  meta: { name: 'agds-components' },
  setup() {
    for (const name of AGDS_COMPONENTS) {
      // Register under the original PascalCase name (for regular Vue templates)
      addComponent({
        name,
        export: name,
        filePath: 'agds-vue',
        global: true,
      })

      // Register under the MDC-normalised name (for markdown content).
      // The HTML parser lowercases all tag names, so <AgDSAccordionItem>
      // becomes "agdsaccordionitem" and MDC then capitalises the first
      // character → "Agdsaccordionitem". We register under that alias too.
      const mdc = mdcName(name)
      if (mdc !== name) {
        addComponent({
          name: mdc,
          export: name,
          filePath: 'agds-vue',
          global: true,
        })
      }
    }
  },
})
