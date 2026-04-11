import { describe, it, expect } from 'vitest'
import {
  isLinkItem,
  isDropdownItem,
  findBestMatch,
  type MainNavItem,
} from './mainNavTypes'

// ─── isLinkItem ──────────────────────────────────────────────────────────────

describe('isLinkItem', () => {
  it('returns true for an item with href', () => {
    expect(isLinkItem({ label: 'Home', href: '/' })).toBe(true)
  })

  it('returns false for a button item', () => {
    expect(isLinkItem({ label: 'Action' })).toBe(false)
  })

  it('returns false for a dropdown item', () => {
    expect(isLinkItem({ label: 'More', items: [] })).toBe(false)
  })
})

// ─── isDropdownItem ──────────────────────────────────────────────────────────

describe('isDropdownItem', () => {
  it('returns true for an item with nested items', () => {
    expect(isDropdownItem({ label: 'More', items: [] })).toBe(true)
  })

  it('returns false for a link item', () => {
    expect(isDropdownItem({ label: 'Home', href: '/' })).toBe(false)
  })

  it('returns false for a button item', () => {
    expect(isDropdownItem({ label: 'Action' })).toBe(false)
  })
})

// ─── findBestMatch ───────────────────────────────────────────────────────────

describe('findBestMatch', () => {
  const ITEMS: MainNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Action', onClick: () => {} },
    {
      label: 'More',
      items: [
        { label: 'Sub Link', href: '/more/sub' },
        { label: 'Sub Button', onClick: () => {} },
      ],
    },
  ]

  it('returns empty string when activePath is undefined', () => {
    expect(findBestMatch(ITEMS, undefined)).toBe('')
  })

  it('returns empty string when activePath is empty', () => {
    expect(findBestMatch(ITEMS, '')).toBe('')
  })

  it('matches the best (longest) prefix', () => {
    expect(findBestMatch(ITEMS, '/services/health')).toBe('/services')
  })

  it('matches an exact path', () => {
    expect(findBestMatch(ITEMS, '/services')).toBe('/services')
  })

  it('returns empty when no item matches', () => {
    // Use items without a root '/' to avoid the root always matching
    const noRootItems: MainNavItem[] = [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]
    expect(findBestMatch(noRootItems, '/privacy')).toBe('')
  })

  it('matches a link inside a dropdown', () => {
    expect(findBestMatch(ITEMS, '/more/sub/detail')).toBe('/more/sub')
  })

  it('does not match button items (top-level)', () => {
    // Button items have no href, so they can never be matched
    const buttonOnlyItems: MainNavItem[] = [{ label: 'Action', onClick: () => {} }]
    expect(findBestMatch(buttonOnlyItems, '/action')).toBe('')
  })

  it('does not match button items inside a dropdown', () => {
    const items: MainNavItem[] = [
      { label: 'More', items: [{ label: 'Sub Button', onClick: () => {} }] },
    ]
    expect(findBestMatch(items, '/sub')).toBe('')
  })
})
