import type { DefaultComboboxOption, ComboboxMaxWidth } from './comboboxUtils'

export type { DefaultComboboxOption, ComboboxMaxWidth }

export interface AGDSComboboxProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Describes the purpose of the field. */
  label: string
  /** Defines an identifier (ID) which must be unique. Auto-generated when omitted. */
  id?: string
  /** An id placed on the <label> element itself, for use with aria-labelledby. */
  labelId?: string
  /** Provides extra information about the field. */
  hint?: string
  /** If true, the invalid state will be rendered. */
  invalid?: boolean
  /** Message to show when the field is invalid. */
  message?: string
  /** If false, "(optional)" will be appended to the label. */
  required?: boolean
  /** If true, "(optional)" will never be appended to the label. */
  hideOptionalLabel?: boolean
  /** Text to prepend to the default secondary label. */
  secondaryLabel?: string
  /** The list of options to show in the dropdown. */
  options: O[]
  /** Placeholder text for the input. */
  placeholder?: string
  /** Name attribute for form serialisation. */
  name?: string
  /** If true, the field will not be interactive. */
  disabled?: boolean
  /** If true, the field stretches to fill its container. */
  block?: boolean
  /** The maximum width of the field. */
  maxWidth?: ComboboxMaxWidth
  /** If true, a × button is shown when a selection exists. */
  clearable?: boolean
  /** Message shown when no options match the search term. */
  emptyResultsMessage?: string
}

export interface AGDSComboboxMultiProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Describes the purpose of the field. */
  label: string
  /** Defines an identifier (ID) which must be unique. Auto-generated when omitted. */
  id?: string
  /** An id placed on the <label> element itself, for use with aria-labelledby. */
  labelId?: string
  /** Provides extra information about the field. */
  hint?: string
  /** If true, the invalid state will be rendered. */
  invalid?: boolean
  /** Message to show when the field is invalid. */
  message?: string
  /** If false, "(optional)" will be appended to the label. */
  required?: boolean
  /** If true, "(optional)" will never be appended to the label. */
  hideOptionalLabel?: boolean
  /** Text to prepend to the default secondary label. */
  secondaryLabel?: string
  /** The list of options to show in the dropdown. */
  options: O[]
  /** Placeholder text shown when no items are selected. */
  placeholder?: string
  /** Name attribute for form serialisation. */
  name?: string
  /** If true, the field will not be interactive. */
  disabled?: boolean
  /** If true, the field stretches to fill its container. */
  block?: boolean
  /** The maximum width of the field. */
  maxWidth?: ComboboxMaxWidth
  /** Message shown when no options match the search term. */
  emptyResultsMessage?: string
}

export interface AGDSComboboxAsyncProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Async function called on each debounced keystroke to load matching options */
  fetchOptions: (query: string) => Promise<O[]>
  /** Visible label text for the input */
  label: string
  /** HTML id for the input — auto-generated when omitted */
  id?: string
  /** Id placed on the <label> element, for use with aria-labelledby */
  labelId?: string
  /** Hint text shown below the label */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Validation message — only shown when invalid is true */
  message?: string
  /** If false, "(optional)" is appended to the label */
  required?: boolean
  /** Suppresses "(optional)" even when required is false */
  hideOptionalLabel?: boolean
  /** Text prepended to the secondary label */
  secondaryLabel?: string
  /** Placeholder text */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** Disables the input */
  disabled?: boolean
  /** External loading state — adds aria-busy and spinner */
  loading?: boolean
  /** Screen reader text while loading. Default 'Loading' */
  loadingLabel?: string
  /** Message displayed when the fetch returns no results */
  emptyResultsMessage?: string
  /** Show a chevron button that opens/closes the dropdown. Default true */
  showDropdownTrigger?: boolean
  /** Show a × button to clear the current selection. Default false */
  clearable?: boolean
  /** Debounce delay in ms before fetchOptions is called. Default 300 */
  debounce?: number
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** The maximum width of the field */
  maxWidth?: ComboboxMaxWidth
}

export interface AGDSComboboxAsyncMultiProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Async function called on each debounced keystroke to load matching options */
  fetchOptions: (query: string) => Promise<O[]>
  /** Visible label text */
  label: string
  /** HTML id for the input — auto-generated when omitted */
  id?: string
  /** Id placed on the <label> element, for use with aria-labelledby */
  labelId?: string
  /** Hint text shown below the label */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Validation message — only shown when invalid is true */
  message?: string
  /** If false, "(optional)" is appended to the label */
  required?: boolean
  /** Suppresses "(optional)" even when required is false */
  hideOptionalLabel?: boolean
  /** Text prepended to the secondary label */
  secondaryLabel?: string
  /** Input placeholder text — shown only when no items are selected */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** Disables the field */
  disabled?: boolean
  /** External loading state — adds aria-busy and spinner */
  loading?: boolean
  /** Screen reader text while loading. Default 'Loading' */
  loadingLabel?: string
  /** Message shown when fetch returns no results */
  emptyResultsMessage?: string
  /** Debounce delay in ms before fetchOptions is called. Default 300 */
  debounce?: number
  /** If true, the field stretches to fill its container. Default true */
  block?: boolean
  /** Maximum width of the field */
  maxWidth?: ComboboxMaxWidth
}

export interface AGDSAutocompleteProps<O extends DefaultComboboxOption = DefaultComboboxOption> {
  /** Async function called on each debounced keystroke to load matching options */
  fetchOptions: (query: string) => Promise<O[]>
  /** Visible label text for the input */
  label: string
  /** HTML id for the input — auto-generated when omitted */
  id?: string
  /** Id placed on the <label> element, for use with aria-labelledby */
  labelId?: string
  /** Hint text shown below the label */
  hint?: string
  /** If true, the invalid state will be rendered */
  invalid?: boolean
  /** Validation message — only shown when invalid is true */
  message?: string
  /** If false, "(optional)" is appended to the label */
  required?: boolean
  /** Suppresses "(optional)" even when required is false */
  hideOptionalLabel?: boolean
  /** Text prepended to the secondary label */
  secondaryLabel?: string
  /** Placeholder text */
  placeholder?: string
  /** Name attribute for form serialisation */
  name?: string
  /** Disables the input */
  disabled?: boolean
  /** External loading state */
  loading?: boolean
  /** Screen reader text while loading. Default 'Loading' */
  loadingLabel?: string
  /** Message displayed when the fetch returns no results. Default 'No results found' */
  emptyResultsMessage?: string
  /** Debounce delay in ms before fetchOptions is called. Default 300 */
  debounce?: number
  /** If true, the field stretches to fill its container */
  block?: boolean
  /** The maximum width of the field */
  maxWidth?: ComboboxMaxWidth
}
