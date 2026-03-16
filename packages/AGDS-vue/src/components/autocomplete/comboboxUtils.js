/**
 * Case-insensitive substring filter. Matches against both `label` and `value`.
 * When `selectedItems` is provided, already-selected items are excluded from results
 * (used by ComboboxMulti to prevent re-selecting the same option).
 */
export function filterOptions(options, inputValue = '', selectedItems) {
    const q = inputValue.toLowerCase();
    return options.filter((option) => {
        const matches = option.value.toLowerCase().includes(q) ||
            option.label.toLowerCase().includes(q);
        if (!matches)
            return false;
        if (!selectedItems)
            return true;
        return !selectedItems.some((s) => s.value === option.value && s.label === option.label);
    });
}
/**
 * Returns true when running on iOS (Safari + WebKit).
 * Used to apply iOS-specific focus workarounds.
 */
export function useIsIos() {
    if (typeof window === 'undefined' || !window.CSS?.supports)
        return false;
    return (CSS.supports('-webkit-appearance', '-apple-pay-button') &&
        CSS.supports('-webkit-overflow-scrolling', 'auto'));
}
