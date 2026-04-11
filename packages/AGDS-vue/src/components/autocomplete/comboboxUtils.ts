export interface DefaultComboboxOption {
  /** Text shown in the input and each option row */
  label: string
  /** Unique identifier for the option */
  value: string
}

/**
 * Maximum width of a combobox/autocomplete field.
 *
 * - `'md'` — ~30 ch; short option lists such as a state or country selector.
 * - `'lg'` — ~40 ch; default for most combobox fields.
 * - `'xl'` — ~60 ch; wide option lists with long labels.
 */
export type ComboboxMaxWidth = 'md' | 'lg' | 'xl'

/**
 * Case-insensitive substring filter. Matches against both `label` and `value`.
 * When `selectedItems` is provided, already-selected items are excluded from results
 * (used by ComboboxMulti to prevent re-selecting the same option).
 */
export function filterOptions<Option extends DefaultComboboxOption>(
  options: Option[],
  inputValue = '',
  selectedItems?: Option[],
): Option[] {
  const q = inputValue.toLowerCase()
  return options.filter((option) => {
    const matches =
      option.value.toLowerCase().includes(q) ||
      option.label.toLowerCase().includes(q)
    if (!matches) return false
    if (!selectedItems) return true
    return !selectedItems.some((s) => s.value === option.value && s.label === option.label)
  })
}

/**
 * Returns true when running on iOS (Safari + WebKit).
 * Used to apply iOS-specific focus workarounds.
 */
export function useIsIos(): boolean {
  if (typeof window === 'undefined' || !window.CSS?.supports) return false
  return (
    CSS.supports('-webkit-appearance', '-apple-pay-button') &&
    CSS.supports('-webkit-overflow-scrolling', 'auto')
  )
}
