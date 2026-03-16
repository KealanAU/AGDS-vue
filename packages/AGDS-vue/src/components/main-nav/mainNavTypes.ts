import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as MainNavBackground }

export type MainNavBorderColor = 'brand' | 'border' | 'border-strong'

export interface MainNavLinkItem {
  label: string
  href: string
}

export interface MainNavButtonItem {
  label: string
  onClick?: (event: MouseEvent) => void
}

export interface MainNavDropdownItem {
  label: string
  items: (MainNavLinkItem | MainNavButtonItem)[]
}

export type MainNavItem = MainNavLinkItem | MainNavButtonItem | MainNavDropdownItem

export function isLinkItem(item: MainNavItem): item is MainNavLinkItem {
  return 'href' in item
}

export function isDropdownItem(item: MainNavItem): item is MainNavDropdownItem {
  return 'items' in item
}

/** Returns the href of the item that best matches `activePath` (longest prefix match). */
export function findBestMatch(items: MainNavItem[], activePath?: string): string {
  if (!activePath) return ''
  let best = ''
  let bestLen = 0

  const check = (href: string) => {
    if (activePath.startsWith(href) && href.length > bestLen) {
      best = href
      bestLen = href.length
    }
  }

  for (const item of items) {
    if (isLinkItem(item)) {
      check(item.href)
    } else if (isDropdownItem(item)) {
      for (const sub of item.items) {
        if (isLinkItem(sub)) check(sub.href)
      }
    }
  }

  return best
}
