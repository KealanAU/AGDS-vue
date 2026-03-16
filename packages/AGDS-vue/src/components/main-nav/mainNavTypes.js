export function isLinkItem(item) {
    return 'href' in item;
}
export function isDropdownItem(item) {
    return 'items' in item;
}
/** Returns the href of the item that best matches `activePath` (longest prefix match). */
export function findBestMatch(items, activePath) {
    if (!activePath)
        return '';
    let best = '';
    let bestLen = 0;
    const check = (href) => {
        if (activePath.startsWith(href) && href.length > bestLen) {
            best = href;
            bestLen = href.length;
        }
    };
    for (const item of items) {
        if (isLinkItem(item)) {
            check(item.href);
        }
        else if (isDropdownItem(item)) {
            for (const sub of item.items) {
                if (isLinkItem(sub))
                    check(sub.href);
            }
        }
    }
    return best;
}
