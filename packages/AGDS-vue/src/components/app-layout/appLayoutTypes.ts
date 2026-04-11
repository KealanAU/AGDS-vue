import type { Component } from 'vue'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as AppLayoutBackground }

/** Background colour of the app layout footer. Alias of `BackgroundVariant`. */
export type AppLayoutFooterBackground = BackgroundVariant

/**
 * Maximum width preset for the app layout footer's inner content container.
 *
 * - `'container'` — Standard container width (`--agds-max-width`).
 * - `'containerLg'` — Wider container (`--agds-max-width-lg`).
 */
export type AppLayoutFooterMaxWidth = 'container' | 'containerLg'

export interface AGDSAppLayoutFooterProps {
  /** Background colour of the footer surface. */
  background?: BackgroundVariant
  /** Maximum width of the inner content container. */
  maxWidth?: AppLayoutFooterMaxWidth
}

/**
 * Controls when nested (level-2+) navigation items are visible in the app-layout sidebar.
 *
 * - `'always'` — Sub-items are always expanded and visible.
 * - `'whenActive'` — Sub-items are only shown when their parent item is on the active path.
 */
export type AppLayoutSubLevelVisible = 'always' | 'whenActive'

/** A nav item rendered as an `<a>` anchor. May contain nested `items` for multi-level trees. */
export interface AppLayoutNavLinkItem {
  /** Visible link text. */
  label: string
  /** URL the link points to. */
  href: string
  /** Icon component (displayed at level-1 only). */
  icon?: Component
  /** Nested sub-level link items. */
  items?: AppLayoutNavLinkItem[]
}

/** A nav item rendered as a `<button>` — use when the action does not navigate to a URL. */
export interface AppLayoutNavButtonItem {
  /** Visible button text. */
  label: string
  onClick?: (e: MouseEvent) => void
  /** Icon component (displayed at level-1 only). */
  icon?: Component
}

/** A non-interactive nav item rendered as plain text; useful for section headings. */
export interface AppLayoutNavTextItem {
  /** Visible text. */
  label: string
}

/**
 * A single item in the app-layout sidebar navigation. The union is discriminated structurally:
 * presence of `href` → {@link AppLayoutNavLinkItem},
 * presence of `onClick` → {@link AppLayoutNavButtonItem},
 * otherwise → {@link AppLayoutNavTextItem}.
 */
export type AppLayoutNavItem =
  | AppLayoutNavLinkItem
  | AppLayoutNavButtonItem
  | AppLayoutNavTextItem

export interface AppLayoutNavGroupObject {
  items: AppLayoutNavItem[]
  options?: { disableGroupPadding?: boolean }
}

/** A group is either a plain array of items, or an object with items + options. */
export type AppLayoutNavGroup = AppLayoutNavItem[] | AppLayoutNavGroupObject

export function isNavLinkItem(item: AppLayoutNavItem): item is AppLayoutNavLinkItem {
  return 'href' in item
}

export function isNavButtonItem(item: AppLayoutNavItem): item is AppLayoutNavButtonItem {
  return 'onClick' in item
}

export function getGroupItems(group: AppLayoutNavGroup): AppLayoutNavItem[] {
  return Array.isArray(group) ? group : group.items
}

export function getGroupOptions(group: AppLayoutNavGroup): AppLayoutNavGroupObject['options'] {
  return Array.isArray(group) ? undefined : group.options
}

/** Longest-prefix match across all nav groups (recursive). */
export function findBestMatch(groups: AppLayoutNavGroup[], activePath?: string): string {
  if (!activePath) return ''
  let best = ''

  function check(href: string) {
    if (activePath!.startsWith(href) && href.length > best.length) {
      best = href
    }
  }

  function walkItems(items: AppLayoutNavItem[]) {
    for (const item of items) {
      if (isNavLinkItem(item)) {
        check(item.href)
        if (item.items) walkItems(item.items)
      }
    }
  }

  for (const group of groups) {
    walkItems(getGroupItems(group))
  }

  return best
}

/** Returns true if any descendant link item matches activePath. */
export function hasActiveDescendant(
  items: AppLayoutNavLinkItem[],
  activePath: string,
): boolean {
  return items.some(
    (item) =>
      item.href === activePath ||
      (item.items ? hasActiveDescendant(item.items, activePath) : false),
  )
}
