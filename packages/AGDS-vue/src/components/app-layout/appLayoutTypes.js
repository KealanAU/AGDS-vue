export function isNavLinkItem(item) {
    return 'href' in item;
}
export function isNavButtonItem(item) {
    return 'onClick' in item;
}
export function getGroupItems(group) {
    return Array.isArray(group) ? group : group.items;
}
export function getGroupOptions(group) {
    return Array.isArray(group) ? undefined : group.options;
}
/** Longest-prefix match across all nav groups (recursive). */
export function findBestMatch(groups, activePath) {
    if (!activePath)
        return '';
    let best = '';
    function check(href) {
        if (activePath.startsWith(href) && href.length > best.length) {
            best = href;
        }
    }
    function walkItems(items) {
        for (const item of items) {
            if (isNavLinkItem(item)) {
                check(item.href);
                if (item.items)
                    walkItems(item.items);
            }
        }
    }
    for (const group of groups) {
        walkItems(getGroupItems(group));
    }
    return best;
}
/** Returns true if any descendant link item matches activePath. */
export function hasActiveDescendant(items, activePath) {
    return items.some((item) => item.href === activePath ||
        (item.items ? hasActiveDescendant(item.items, activePath) : false));
}
