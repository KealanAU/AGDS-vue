import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, h, nextTick } from 'vue'
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

/**
 * Opens the dropdown by clicking the trigger button.
 * userEvent.setup().click fires the full browser event sequence
 * (pointerdown → mousedown → pointerup → mouseup → click) which satisfies
 * Reka's DismissableLayer and the DropdownMenuTrigger onClick check.
 */
async function openDropdown(btn: HTMLElement) {
  const user = userEvent.setup()
  await user.click(btn)
  await nextTick()
}

// ─── Button aria attributes ───────────────────────────────────────────────────

describe('AGDSDropdownMenuButton — aria attributes', () => {
  it('has aria-haspopup="menu"', () => {
    // Reka sets aria-haspopup="menu" (the correct ARIA value per spec)
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    expect(btn.getAttribute('aria-haspopup')).toBe('menu')
  })

  it('has aria-controls pointing to panel id when open', async () => {
    // Reka sets aria-controls to the content id once the menu is open.
    // We first verify the menu is visible (portal mounted), then check the attribute.
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    // Verify the menu is in the DOM (portal mounted)
    await waitFor(() => expect(screen.queryByRole('menu')).toBeTruthy())
    // aria-controls points to the panel (content id is set when DropdownMenuContent mounts)
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
    await openDropdown(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })
})

// ─── Open/close ──────────────────────────────────────────────────────────────

describe('AGDSDropdownMenu — open/close', () => {
  it('opens panel on button click', async () => {
    const { getByRole } = renderDropdown()
    // Panel is teleported to body — use screen to query across the full document
    expect(screen.queryByRole('menu')).toBeNull()
    await openDropdown(getByRole('button', { name: 'Options' }))
    expect(screen.queryByRole('menu')).toBeTruthy()
  })

  it('closes panel on second button click', async () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    await waitFor(() => expect(screen.queryByRole('menu')).toBeTruthy())
    // Reka applies pointer-events:none to the trigger while the menu is open
    // (its DismissableLayer blocks pointer interactions outside the panel).
    // Use fireEvent to bypass the CSS check for this toggle-closed scenario.
    await fireEvent.click(btn, { button: 0 })
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })
})

// ─── Panel attributes ─────────────────────────────────────────────────────────

describe('AGDSDropdownMenuPanel — attributes', () => {
  it('has role="menu"', async () => {
    const { getByRole } = renderDropdown()
    await openDropdown(getByRole('button', { name: 'Options' }))
    expect(screen.queryByRole('menu')).toBeTruthy()
  })

  it('has aria-labelledby pointing to button id', async () => {
    const { getByRole } = renderDropdown()
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    const menu = screen.getByRole('menu')
    expect(menu.getAttribute('aria-labelledby')).toBe(btn.id)
  })
})

// ─── Keyboard: navigation ────────────────────────────────────────────────────

describe('AGDSDropdownMenu — keyboard navigation', () => {
  it('ArrowDown on button opens menu', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await fireEvent.keyDown(btn, { key: 'ArrowDown', code: 'ArrowDown' })
    await nextTick()
    await nextTick()
    expect(screen.queryByRole('menu')).toBeTruthy()
  })

  it('Escape closes the menu', async () => {
    const { getByRole } = renderDropdown()
    await openDropdown(getByRole('button', { name: 'Options' }))
    const menu = screen.getByRole('menu')
    await fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' })
    await nextTick()
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('ArrowDown in panel navigates focus to next item', async () => {
    // Reka uses roving tabindex: focus moves to items directly (no aria-activedescendant)
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    const items = screen.getAllByRole('menuitem')
    const item1 = items[0]
    const item2 = items[1]
    item1.focus()
    await fireEvent.keyDown(item1, { key: 'ArrowDown', code: 'ArrowDown' })
    await nextTick()
    expect(document.activeElement).toBe(item2)
  })

  it('items have tabindex managed by Reka (roving tabindex)', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    await openDropdown(getByRole('button', { name: 'Options' }))
    const items = screen.getAllByRole('menuitem')
    items.forEach((item) => {
      const tabindex = item.getAttribute('tabindex')
      expect(['-1', '0']).toContain(tabindex)
    })
  })

  it('Enter on button opens menu', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    btn.focus()
    await fireEvent.keyDown(btn, { key: 'Enter', code: 'Enter' })
    await nextTick()
    await nextTick()
    expect(screen.queryByRole('menu')).toBeTruthy()
  })

  it('Space on button opens menu', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    btn.focus()
    await fireEvent.keyDown(btn, { key: ' ', code: 'Space' })
    await nextTick()
    await nextTick()
    expect(screen.queryByRole('menu')).toBeTruthy()
  })

  it('ArrowUp in panel navigates focus to previous item', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    const items = screen.getAllByRole('menuitem')
    const item2 = items[1]
    const item1 = items[0]
    item2.focus()
    await fireEvent.keyDown(item2, { key: 'ArrowUp', code: 'ArrowUp' })
    await nextTick()
    expect(document.activeElement).toBe(item1)
  })

  it('Home in panel moves focus to first item', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    const items = screen.getAllByRole('menuitem')
    const lastItem = items[items.length - 1]
    lastItem.focus()
    await fireEvent.keyDown(lastItem, { key: 'Home', code: 'Home' })
    await nextTick()
    expect(document.activeElement).toBe(items[0])
  })

  it('End in panel moves focus to last item', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    const btn = getByRole('button', { name: 'Options' })
    await openDropdown(btn)
    const items = screen.getAllByRole('menuitem')
    items[0].focus()
    await fireEvent.keyDown(items[0], { key: 'End', code: 'End' })
    await nextTick()
    expect(document.activeElement).toBe(items[items.length - 1])
  })
})

// ─── Click item closes menu ───────────────────────────────────────────────────

describe('AGDSDropdownMenuItem — click', () => {
  it('clicking an item closes the menu', async () => {
    const { getByRole } = renderDropdown(['item-1', 'item-2', 'item-3'])
    await openDropdown(getByRole('button', { name: 'Options' }))
    expect(screen.queryByRole('menu')).toBeTruthy()
    await fireEvent.click(screen.getByText('Item 1'))
    // Reka's Presence component waits a tick before unmounting the content
    await nextTick()
    await nextTick()
    await nextTick()
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('emits click event when item is clicked', async () => {
    const clicks: Event[] = []
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
                    { id: 'click-item', onClick: (e: Event) => clicks.push(e) },
                    { default: () => 'Click Me' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    await fireEvent.click(screen.getByText('Click Me'))
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
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    const radioA = screen.getByText('Option A').closest('[role="menuitemradio"]')
    const radioB = screen.getByText('Option B').closest('[role="menuitemradio"]')
    expect(radioA?.getAttribute('aria-checked')).toBe('true')
    expect(radioB?.getAttribute('aria-checked')).toBe('false')
  })

  it('renders secondaryText when provided', async () => {
    const comp = defineComponent({
      setup() {
        return () =>
          h(AGDSDropdownMenu, null, {
            default: () => [
              h(AGDSDropdownMenuButton, null, { default: () => 'Options' }),
              h(AGDSDropdownMenuPanel, null, {
                default: () => [
                  h(
                    AGDSDropdownMenuItemRadio,
                    { id: 'radio-sec', checked: false, secondaryText: '3 items' },
                    { default: () => 'Category' },
                  ),
                ],
              }),
            ],
          })
      },
    })
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    expect(screen.getByText('3 items')).toBeTruthy()
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
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    const group = document.querySelector('[role="group"]')
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
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    const separator = document.querySelector('[role="separator"]')
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
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    const link = document.querySelector('a[role="menuitem"]')
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
    const { getByRole } = render(comp)
    await openDropdown(getByRole('button', { name: 'Options' }))
    const link = document.querySelector('a[role="menuitem"]')
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
    const { getByRole } = renderDropdown()
    await openDropdown(getByRole('button', { name: 'Options' }))
    // Menu is portalled to body. The `region` rule flags content outside landmarks in
    // the test harness body wrapper — disable it to focus on dropdown-specific a11y.
    await runAxe(document.body, {
      rules: {
        'color-contrast': { enabled: false },
        'region': { enabled: false },
      },
    })
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
