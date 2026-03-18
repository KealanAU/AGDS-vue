import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { defineComponent, h, nextTick, ref } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSDropdownMenu from './AGDSDropdownMenu.vue'
import AGDSDropdownMenuButton from './AGDSDropdownMenuButton.vue'
import AGDSDropdownMenuPanel from './AGDSDropdownMenuPanel.vue'
import AGDSDropdownMenuItem from './AGDSDropdownMenuItem.vue'
import AGDSDropdownMenuItemLink from './AGDSDropdownMenuItemLink.vue'
import AGDSDropdownMenuItemRadio from './AGDSDropdownMenuItemRadio.vue'
import AGDSDropdownMenuGroup from './AGDSDropdownMenuGroup.vue'
import AGDSDropdownMenuDivider from './AGDSDropdownMenuDivider.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderDropdown(itemIds = ['item-1', 'item-2', 'item-3']) {
  const comp = defineComponent({
    components: {
      AGDSDropdownMenu,
      AGDSDropdownMenuButton,
      AGDSDropdownMenuPanel,
      AGDSDropdownMenuItem,
    },
    setup() {
      return () =>
        h(AGDSDropdownMenu, null, {
          default: () => [
            h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
            h(AGDSDropdownMenuPanel, null, {
              default: () =>
                itemIds.map((id, i) =>
                  h(AGDSDropdownMenuItem, { id }, { default: () => `Item ${i + 1}` }),
                ),
            }),
          ],
        })
    },
  })
  return render(comp)
}

// ─── Button aria attributes ───────────────────────────────────────────────────

describe('AGDSDropdownMenuButton — aria attributes', () => {
  it('has aria-haspopup="true"', () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    expect(btn.getAttribute('aria-haspopup')).toBe('true')
  })

  it('has aria-controls pointing to panel id', () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    const panelId = btn.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toBeTruthy()
  })

  it('has aria-expanded="false" when closed', () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('has aria-expanded="true" after opening', async () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.click(btn)
    await nextTick()
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })
})

// ─── Open/close ──────────────────────────────────────────────────────────────

describe('AGDSDropdownMenu — open/close', () => {
  it('opens panel on button click', async () => {
    const { getByRole, queryByRole } = renderDropdown()
    expect(queryByRole('menu')).toBeNull()
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
  })

  it('closes panel on second button click', async () => {
    const { getByRole, queryByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.click(btn)
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
    await fireEvent.click(btn)
    await nextTick()
    expect(queryByRole('menu')).toBeNull()
  })
})

// ─── Panel attributes ─────────────────────────────────────────────────────────

describe('AGDSDropdownMenuPanel — attributes', () => {
  it('has role="menu"', async () => {
    const { getByRole, queryByRole } = renderDropdown()
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
  })

  it('has aria-labelledby pointing to button id', async () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.click(btn)
    await nextTick()
    const menu = getByRole('menu')
    expect(menu.getAttribute('aria-labelledby')).toBe(btn.id)
  })
})

// ─── Keyboard: ArrowDown opens + first item active ────────────────────────────

describe('AGDSDropdownMenu — keyboard navigation', () => {
  it('ArrowDown on button opens menu with first item active', async () => {
    const { getByRole, queryByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.keyDown(btn, { code: 'ArrowDown' })
    await nextTick()
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
    const menu = getByRole('menu')
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-1')
  })

  it('ArrowUp on button opens menu with last item active', async () => {
    const { getByRole, queryByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.keyDown(btn, { code: 'ArrowUp' })
    await nextTick()
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
    const menu = getByRole('menu')
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-3')
  })

  it('Escape closes the menu', async () => {
    const { getByRole, queryByRole } = renderDropdown()
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    await nextTick()
    const menu = getByRole('menu')
    await fireEvent.keyDown(menu, { code: 'Escape' })
    await nextTick()
    expect(queryByRole('menu')).toBeNull()
  })

  it('ArrowDown in panel navigates to next item', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.keyDown(btn, { code: 'ArrowDown' })
    await nextTick()
    await nextTick()
    const menu = getByRole('menu')
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-1')
    await fireEvent.keyDown(menu, { code: 'ArrowDown' })
    await nextTick()
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-2')
  })

  it('End key moves to last item, Home key moves to first item', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.keyDown(btn, { code: 'ArrowDown' })
    await nextTick()
    await nextTick()
    const menu = getByRole('menu')
    await fireEvent.keyDown(menu, { code: 'End' })
    await nextTick()
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-3')
    await fireEvent.keyDown(menu, { code: 'Home' })
    await nextTick()
    expect(menu.getAttribute('aria-activedescendant')).toBe('item-1')
  })
})

// ─── Click item closes menu ───────────────────────────────────────────────────

describe('AGDSDropdownMenuItem — click', () => {
  it('clicking an item closes the menu', async () => {
    const { getByRole, getByText, queryByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    await nextTick()
    expect(queryByRole('menu')).toBeTruthy()
    await fireEvent.click(getByText('Item 1'))
    await nextTick()
    expect(queryByRole('menu')).toBeNull()
  })

  it('emits click event when item is clicked', async () => {
    const clicks: MouseEvent[] = []
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuItem,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuItem,
                    { id: 'click-item', onClick: (e: MouseEvent) => clicks.push(e) },
                    { default: () => 'Click Me' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, getByText } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    await fireEvent.click(getByText('Click Me'))
    await nextTick()
    expect(clicks).toHaveLength(1)
  })
})

// ─── DropdownMenuItemRadio ────────────────────────────────────────────────────

describe('AGDSDropdownMenuItemRadio', () => {
  it('renders aria-checked="true" when checked=true', async () => {
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuItemRadio,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuItemRadio,
                    { id: 'radio-1', checked: true },
                    { default: () => 'Option A' },
                  ),
                  h(
                    AGDSDropdownMenuItemRadio,
                    { id: 'radio-2', checked: false },
                    { default: () => 'Option B' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, getByText } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    const radioA = getByText('Option A').closest('[role="menuitemradio"]')
    const radioB = getByText('Option B').closest('[role="menuitemradio"]')
    expect(radioA?.getAttribute('aria-checked')).toBe('true')
    expect(radioB?.getAttribute('aria-checked')).toBe('false')
  })
})

// ─── DropdownMenuGroup ────────────────────────────────────────────────────────

describe('AGDSDropdownMenuGroup', () => {
  it('renders role="group" with aria-labelledby', async () => {
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuGroup,
        AGDSDropdownMenuItem,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuGroup,
                    { label: 'Section A' },
                    {
                      default: () => [
                        h(AGDSDropdownMenuItem, { id: 'g-item-1' }, { default: () => 'Item 1' }),
                      ],
                    },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, container } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    const group = container.querySelector('[role="group"]')
    expect(group).toBeTruthy()
    const labelId = group!.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    const labelEl = document.getElementById(labelId!)
    expect(labelEl?.textContent).toBe('Section A')
  })
})

// ─── DropdownMenuDivider ──────────────────────────────────────────────────────

describe('AGDSDropdownMenuDivider', () => {
  it('renders role="separator"', async () => {
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuItem,
        AGDSDropdownMenuDivider,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(AGDSDropdownMenuItem, { id: 'd-item-1' }, { default: () => 'Item 1' }),
                  h(AGDSDropdownMenuDivider),
                  h(AGDSDropdownMenuItem, { id: 'd-item-2' }, { default: () => 'Item 2' }),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, container } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    const separator = container.querySelector('[role="separator"]')
    expect(separator).toBeTruthy()
  })
})

// ─── DropdownMenuItemLink — external ─────────────────────────────────────────

describe('AGDSDropdownMenuItemLink', () => {
  it('external link has rel="noopener noreferrer" and sr-only new tab text', async () => {
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuItemLink,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuItemLink,
                    { id: 'ext-link', href: 'https://example.com', target: '_blank' },
                    { default: () => 'External' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, container } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    const link = container.querySelector('a[role="menuitem"]')
    expect(link).toBeTruthy()
    expect(link!.getAttribute('rel')).toBe('noopener noreferrer')
    expect(link!.textContent).toContain('opens in a new tab')
  })

  it('internal link does not have rel attribute', async () => {
    const comp = defineComponent({
      components: {
        AGDSDropdownMenu,
        AGDSDropdownMenuButton,
        AGDSDropdownMenuPanel,
        AGDSDropdownMenuItemLink,
      },
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuItemLink,
                    { id: 'int-link', href: '/about' },
                    { default: () => 'About' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole, container } = render(comp)
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    const link = container.querySelector('a[role="menuitem"]')
    expect(link!.getAttribute('rel')).toBeNull()
  })
})

// ─── Accessibility (axe) ──────────────────────────────────────────────────────

describe('AGDSDropdownMenu — axe', () => {
  it('passes axe in closed state', async () => {
    const { container } = renderDropdown()
    await runAxe(container, AXE_OPTS)
  })

  it('passes axe in open state', async () => {
    const { container, getByRole } = renderDropdown()
    await fireEvent.click(getByRole('button', { name: 'Options' }))
    await nextTick()
    await nextTick()
    await runAxe(container, AXE_OPTS)
  })

  it('intentional axe violation: button with no accessible name fails axe', async () => {
    const comp = defineComponent({
      setup() {
        return () => h('button', { type: 'button' })
      },
    })
    const { container } = render(comp)
    let threw = false
    try {
      await runAxe(container, AXE_OPTS)
    } catch {
      threw = true
    }
    expect(threw).toBe(true)
  })
})
