import type { Component } from 'vue'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as AppLayoutBackground }

export type AppLayoutFooterBackground = BackgroundVariant
export type AppLayoutFooterMaxWidth = 'container' | 'containerLg'

export interface AGDSAppLayoutFooterProps {
  /** Background colour of the footer surface. */
  background?: BackgroundVariant
  /** Maximum width of the inner content container. */
  maxWidth?: AppLayoutFooterMaxWidth
}

export type AppLayoutSubLevelVisible = 'always' | 'whenActive'

export interface AppLayoutNavLinkItem {
  label: string
  href: string
  /** Icon component (displayed at level-1 only). */
  icon?: Component
  /** Nested sub-level link items. */
  items?: AppLayoutNavLinkItem[]
}

export interface AppLayoutNavButtonItem {
  label: string
  onClick?: (e: MouseEvent) => void
  /** Icon component (displayed at level-1 only). */
  icon?: Component
}

export interface AppLayoutNavTextItem {
  label: string
}

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
