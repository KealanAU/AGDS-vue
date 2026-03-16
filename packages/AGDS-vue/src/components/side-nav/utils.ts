export interface SideNavItem {
  href: string
  label: string
  items?: SideNavItem[]
}

/**
 * Returns the href from `items` that best matches `activePath`.
 * An exact match wins immediately; otherwise the longest prefix match wins.
 */
export function findBestMatch(items: SideNavItem[], activePath?: string): string {
  if (!activePath) return ''
  const allItems = flattenItems(items)
  let bestMatch = ''
  for (const link of allItems) {
    if (link.href === activePath) return link.href
    if (activePath.startsWith(link.href) && link.href.length > bestMatch.length) {
      bestMatch = link.href
    }
  }
  return bestMatch
}

/** Recursively flattens a nested item tree into a flat array. */
export function flattenItems(items: SideNavItem[]): SideNavItem[] {
  const result: SideNavItem[] = []
  for (const item of items) {
    result.push({ href: item.href, label: item.label })
    if (item.items?.length) result.push(...flattenItems(item.items))
  }
  return result
}

/** Returns true if any item in the tree (at any depth) has href === activePath. */
export function hasSubLevelActiveItem(
  items: SideNavItem[] | undefined,
  activePath: string | undefined,
): boolean {
  if (!items?.length || !activePath) return false
  return items.some(
    (item) =>
      item.href === activePath || hasSubLevelActiveItem(item.items, activePath),
  )
}
