import { defineNuxtModule, addComponent } from '@nuxt/kit'
import { pascalCase } from 'scule'

// All components exported from agds-vue. Registering them here puts them into
// Nuxt's component registry so Nuxt Content's MDC renderer can resolve them
// (components registered only via app.component() in a plugin are invisible
// to the MDC compiler's component list).
const AGDS_COMPONENTS = [
  'AGDSAccordion',
  'AGDSAccordionItem',
  'AGDSAppLayout',
  'AGDSAppLayoutFooter',
  'AGDSAppLayoutFooterDivider',
  'AGDSAppLayoutHeader',
  'AGDSAppLayoutSidebar',
  'AGDSAppLayoutSidebarNav',
  'AGDSAutocomplete',
  'AGDSAvatar',
  'AGDSBox',
  'AGDSBreadcrumbs',
  'AGDSBreadcrumbsItem',
  'AGDSButton',
  'AGDSButtonLink',
  'AGDSCallout',
  'AGDSCallToActionButton',
  'AGDSCallToActionLink',
  'AGDSCard',
  'AGDSCardFooter',
  'AGDSCardHeader',
  'AGDSCardInner',
  'AGDSCardLink',
  'AGDSCheckbox',
  'AGDSCheckboxGroup',
  'AGDSCollapsingSideBar',
  'AGDSColumn',
  'AGDSColumns',
  'AGDSCombobox',
  'AGDSComboboxAsync',
  'AGDSComboboxAsyncMulti',
  'AGDSComboboxMulti',
  'AGDSContent',
  'AGDSContentBleed',
  'AGDSCore',
  'AGDSCoreProvider',
  'AGDSDatePicker',
  'AGDSDetails',
  'AGDSDirectionButton',
  'AGDSDirectionLink',
  'AGDSDivider',
  'AGDSDrawer',
  'AGDSDropdownMenu',
  'AGDSDropdownMenuButton',
  'AGDSDropdownMenuDivider',
  'AGDSDropdownMenuGroup',
  'AGDSDropdownMenuItem',
  'AGDSDropdownMenuItemLink',
  'AGDSDropdownMenuItemRadio',
  'AGDSDropdownMenuPanel',
  'AGDSExternalLinkCallout',
  'AGDSFeatureLinkList',
  'AGDSFeatureLinkListItem',
  'AGDSField',
  'AGDSFieldContainer',
  'AGDSFieldHint',
  'AGDSFieldLabel',
  'AGDSFieldMessage',
  'AGDSFieldset',
  'AGDSFileInput',
  'AGDSFileUpload',
  'AGDSFilterSidebar',
  'AGDSFlex',
  'AGDSFooter',
  'AGDSFooterDivider',
  'AGDSFormStack',
  'AGDSGlobalAlert',
  'AGDSGroupedFields',
  'AGDSHeader',
  'AGDSHeading',
  'AGDSH1',
  'AGDSH2',
  'AGDSH3',
  'AGDSH4',
  'AGDSH5',
  'AGDSH6',
  'AGDSIcon',
  'AGDSInpageNav',
  'AGDSLinkList',
  'AGDSLinkListItem',
  'AGDSListItem',
  'AGDSLoadingBlanket',
  'AGDSMainNav',
  'AGDSModal',
  'AGDSNotificationBadge',
  'AGDSOrderedList',
  'AGDSPageAlert',
  'AGDSPageContent',
  'AGDSPagination',
  'AGDSPaginationButtons',
  'AGDSProgressIndicator',
  'AGDSProse',
  'AGDSRadio',
  'AGDSRadioGroup',
  'AGDSSearchBox',
  'AGDSSearchBoxButton',
  'AGDSSearchBoxInput',
  'AGDSSearchInput',
  'AGDSSectionAlert',
  'AGDSSectionContent',
  'AGDSSelect',
  'AGDSSideNav',
  'AGDSSkipLinks',
  'AGDSStack',
  'AGDSStatusBadge',
  'AGDSSubNav',
  'AGDSSummaryList',
  'AGDSSummaryListItem',
  'AGDSSummaryListItemAction',
  'AGDSSummaryListItemDescription',
  'AGDSSummaryListItemTerm',
  'AGDSSwitch',
  'AGDSTab',
  'AGDSTable',
  'AGDSTableBody',
  'AGDSTableCaption',
  'AGDSTableCell',
  'AGDSTableHead',
  'AGDSTableHeader',
  'AGDSTableHeaderSortable',
  'AGDSTableRow',
  'AGDSTableScroller',
  'AGDSTabList',
  'AGDSTabPanel',
  'AGDSTabs',
  'AGDSTag',
  'AGDSTags',
  'AGDSTaskList',
  'AGDSTaskListItem',
  'AGDSText',
  'AGDSTextarea',
  'AGDSTextInput',
  'AGDSTextLink',
  'AGDSTextLinkExternal',
  'AGDSTimeInput',
  'AGDSTimePicker',
  'AGDSToggleButton',
  'AGDSUnorderedList',
  'AGDSVisuallyHidden',
]

// MDC uses scule's pascalCase() to resolve component tag names. The input
// to pascalCase can arrive in two different states depending on the rendering
// path:
//
//   1. Preserved case (tag stored as-is in the AST JSON):
//      "AGDSCard" → pascalCase → "AgdsCard"
//      (scule treats the AGDS run as one word → Agds)
//
//   2. All-lowercase (HTML parser lowercases the entire tag during SSR):
//      "agdscard" → pascalCase → "Agdscard"
//
// We register both aliases per component so MDC finds it either way.
function mdcAliases(name: string): string[] {
  const aliases: string[] = []

  // Path 1 — use scule directly so the alias exactly matches what MDC will look up.
  const sculeAlias = pascalCase(name)
  if (sculeAlias !== name) aliases.push(sculeAlias)

  // Path 2 — full-lowercase alias: capitalize only the first character.
  const lower = name.toLowerCase()
  const fullLowerAlias = lower.charAt(0).toUpperCase() + lower.slice(1)
  if (fullLowerAlias !== name && fullLowerAlias !== sculeAlias) {
    aliases.push(fullLowerAlias)
  }

  return aliases
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

      // Register under each MDC alias so the MDC renderer can resolve the
      // component regardless of which normalisation path it takes.
      for (const alias of mdcAliases(name)) {
        addComponent({
          name: alias,
          export: name,
          filePath: 'agds-vue',
          global: true,
        })
      }
    }
  },
})
