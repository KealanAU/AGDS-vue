import { describe, it, expect } from 'vitest'
import {
  isNavLinkItem,
  isNavButtonItem,
  getGroupItems,
  getGroupOptions,
  findBestMatch,
  hasActiveDescendant,
  type AppLayoutNavItem,
  type AppLayoutNavGroup,
} from './appLayoutTypes'

// ─── isNavLinkItem ───────────────────────────────────────────────────────────

describe('isNavLinkItem', () => {
  it('returns true for items with href', () => {
    expect(isNavLinkItem({ label: 'Home', href: '/' })).toBe(true)
  })

  it('returns false for button items', () => {
    expect(isNavLinkItem({ label: 'Action', onClick: () => {} })).toBe(false)
  })

  it('returns false for text items', () => {
    expect(isNavLinkItem({ label: 'Section' })).toBe(false)
  })
})

// ─── isNavButtonItem ─────────────────────────────────────────────────────────

describe('isNavButtonItem', () => {
  it('returns true for items with onClick', () => {
    expect(isNavButtonItem({ label: 'Action', onClick: () => {} })).toBe(true)
  })

  it('returns false for link items', () => {
    expect(isNavButtonItem({ label: 'Home', href: '/' })).toBe(false)
  })

  it('returns false for text items', () => {
    expect(isNavButtonItem({ label: 'Section' })).toBe(false)
  })
})

// ─── getGroupItems ────────────────────────────────────────────────────────────

describe('getGroupItems', () => {
  const ITEMS: AppLayoutNavItem[] = [{ label: 'Home', href: '/' }]

  it('returns the array directly when group is an array', () => {
    expect(getGroupItems(ITEMS)).toBe(ITEMS)
  })

  it('returns group.items when group is an object', () => {
    const group: AppLayoutNavGroup = { items: ITEMS }
    expect(getGroupItems(group)).toBe(ITEMS)
  })
})

// ─── getGroupOptions ──────────────────────────────────────────────────────────

describe('getGroupOptions', () => {
  const ITEMS: AppLayoutNavItem[] = [{ label: 'Home', href: '/' }]

  it('returns undefined when group is an array', () => {
    expect(getGroupOptions(ITEMS)).toBeUndefined()
  })

  it('returns options when group is an object with options', () => {
    const group: AppLayoutNavGroup = { items: ITEMS, options: { disableGroupPadding: true } }
    expect(getGroupOptions(group)).toEqual({ disableGroupPadding: true })
  })

  it('returns undefined options when group object has no options', () => {
    const group: AppLayoutNavGroup = { items: ITEMS }
    expect(getGroupOptions(group)).toBeUndefined()
  })
})

// ─── findBestMatch ────────────────────────────────────────────────────────────

describe('findBestMatch', () => {
  const GROUPS: AppLayoutNavGroup[] = [
    [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services', items: [{ label: 'Health', href: '/services/health' }] },
    ],
  ]

  it('returns empty string when activePath is undefined', () => {
    expect(findBestMatch(GROUPS, undefined)).toBe('')
  })

  it('returns empty string when activePath is empty', () => {
    expect(findBestMatch(GROUPS, '')).toBe('')
  })

  it('matches the root path', () => {
    expect(findBestMatch(GROUPS, '/')).toBe('/')
  })

  it('matches the longest prefix', () => {
    expect(findBestMatch(GROUPS, '/services/health/detail')).toBe('/services/health')
  })

  it('returns empty string when no item matches', () => {
    const noMatchGroups: AppLayoutNavGroup[] = [[{ label: 'About', href: '/about' }]]
    expect(findBestMatch(noMatchGroups, '/contact')).toBe('')
  })

  it('handles object-style groups', () => {
    const groups: AppLayoutNavGroup[] = [{ items: [{ label: 'Home', href: '/home' }] }]
    expect(findBestMatch(groups, '/home/profile')).toBe('/home')
  })

  it('does not match button items', () => {
    const groups: AppLayoutNavGroup[] = [[{ label: 'Action', onClick: () => {} }]]
    expect(findBestMatch(groups, '/action')).toBe('')
  })
})

// ─── hasActiveDescendant ──────────────────────────────────────────────────────

describe('hasActiveDescendant', () => {
  it('returns true when an item matches the active path exactly', () => {
    const items = [{ label: 'Home', href: '/home' }]
    expect(hasActiveDescendant(items, '/home')).toBe(true)
  })

  it('returns false when no item matches', () => {
    const items = [{ label: 'Home', href: '/home' }]
    expect(hasActiveDescendant(items, '/about')).toBe(false)
  })

  it('returns true when a nested item matches', () => {
    const items = [
      { label: 'Services', href: '/services', items: [{ label: 'Health', href: '/services/health' }] },
    ]
    expect(hasActiveDescendant(items, '/services/health')).toBe(true)
  })

  it('returns false for a parent with non-matching nested items', () => {
    const items = [
      { label: 'Services', href: '/services', items: [{ label: 'Health', href: '/services/health' }] },
    ]
    expect(hasActiveDescendant(items, '/services/education')).toBe(false)
  })

  it('handles items with no sub-items (items is undefined)', () => {
    const items = [{ label: 'Home', href: '/home' }]
    expect(hasActiveDescendant(items, '/other')).toBe(false)
  })
})
