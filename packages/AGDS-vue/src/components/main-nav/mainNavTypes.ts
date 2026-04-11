import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as MainNavBackground }

/**
 * Colour of the bottom border on the main navigation bar.
 *
 * - `'brand'` — Brand/primary colour; the default for most government services.
 * - `'border'` — Subtle grey; for neutral or light-weight nav treatments.
 * - `'border-strong'` — Darker grey; for high-contrast or monochrome layouts.
 */
export type MainNavBorderColor = 'brand' | 'border' | 'border-strong'

/** A navigation item that renders as an `<a>` anchor. */
export interface MainNavLinkItem {
  label: string
  href: string
}

/** A navigation item that renders as a `<button>` (e.g. triggers a modal or action). */
export interface MainNavButtonItem {
  label: string
  onClick?: (event: MouseEvent) => void
}

/** A navigation item with nested items rendered as a dropdown. */
export interface MainNavDropdownItem {
  label: string
  items: (MainNavLinkItem | MainNavButtonItem)[]
}

/**
 * A single item in the main navigation bar — discriminated by the presence of `href`, `onClick`, or `items`.
 *
 * - `MainNavLinkItem` — has `href`; renders as an anchor.
 * - `MainNavButtonItem` — has `onClick`; renders as a button.
 * - `MainNavDropdownItem` — has `items`; renders as a dropdown trigger.
 */
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
