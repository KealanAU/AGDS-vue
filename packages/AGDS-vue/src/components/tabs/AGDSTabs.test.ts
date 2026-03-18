import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { nextTick } from 'vue'
import { runAxe } from '../../test/a11y'
import AGDSTabs from './AGDSTabs.vue'
import AGDSTabList from './AGDSTabList.vue'
import AGDSTab from './AGDSTab.vue'
import AGDSTabPanel from './AGDSTabPanel.vue'

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderTabs(
  tabsProps: Record<string, unknown> = {},
  tabProps: Record<string, unknown> = {},
) {
  return render({
    components: { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel },
    template: `
      <AGDSTabs default-value="tab1" v-bind="tabsProps">
        <AGDSTabList aria-label="Test tabs">
          <AGDSTab value="tab1" v-bind="tabProps">Tab one</AGDSTab>
          <AGDSTab value="tab2">Tab two</AGDSTab>
          <AGDSTab value="tab3" disabled>Tab three</AGDSTab>
        </AGDSTabList>
        <AGDSTabPanel value="tab1">Panel one content</AGDSTabPanel>
        <AGDSTabPanel value="tab2">Panel two content</AGDSTabPanel>
        <AGDSTabPanel value="tab3">Panel three content</AGDSTabPanel>
      </AGDSTabs>
    `,
    setup: () => ({ tabsProps, tabProps }),
  })
}

// Activate a tab via mousedown (Reka listens on mousedown, not click)
async function activateTab(tab: HTMLElement) {
  await fireEvent.mouseDown(tab, { button: 0 })
  await nextTick()
}

// ─── Rendering ───────────────────────────────────────────────────────────────

describe('AGDSTabs — rendering', () => {
  it('renders the root element', () => {
    const { container } = renderTabs()
    expect(container.querySelector('.agds-tabs')).toBeTruthy()
  })

  it('renders a tablist with the correct role', () => {
    const { getByRole } = renderTabs()
    expect(getByRole('tablist')).toBeTruthy()
  })

  it('renders three tab buttons with role="tab"', () => {
    const { getAllByRole } = renderTabs()
    expect(getAllByRole('tab')).toHaveLength(3)
  })

  it('renders visible tab labels', () => {
    const { getByText } = renderTabs()
    expect(getByText('Tab one')).toBeTruthy()
    expect(getByText('Tab two')).toBeTruthy()
    expect(getByText('Tab three')).toBeTruthy()
  })

  it('renders the active panel on mount', () => {
    const { getByText } = renderTabs()
    expect(getByText('Panel one content')).toBeTruthy()
  })

  it('tablist has an accessible label', () => {
    const { getByRole } = renderTabs()
    const tablist = getByRole('tablist')
    expect(tablist.getAttribute('aria-label')).toBe('Test tabs')
  })
})

// ─── Active state ─────────────────────────────────────────────────────────────

describe('AGDSTabs — active state', () => {
  it('defaultValue makes the matching tab active on mount', () => {
    const { getAllByRole } = renderTabs()
    const [tab1] = getAllByRole('tab')
    expect(tab1.getAttribute('data-state')).toBe('active')
  })

  it('active tab has aria-selected="true"', () => {
    const { getAllByRole } = renderTabs()
    const [tab1] = getAllByRole('tab')
    expect(tab1.getAttribute('aria-selected')).toBe('true')
  })

  it('inactive tabs have aria-selected="false"', () => {
    const { getAllByRole } = renderTabs()
    const [, tab2] = getAllByRole('tab')
    expect(tab2.getAttribute('aria-selected')).toBe('false')
  })

  it('inactive tabs have data-state="inactive"', () => {
    const { getAllByRole } = renderTabs()
    const [, tab2] = getAllByRole('tab')
    expect(tab2.getAttribute('data-state')).toBe('inactive')
  })

  it('active tab has tabindex="0" after receiving focus', async () => {
    // Reka sets tabindex=0 only once a tab has been focused/mousedown'd.
    // Simulating mousedown sets the currentTabStopId.
    const { getAllByRole } = renderTabs()
    const [tab1] = getAllByRole('tab')
    await activateTab(tab1)
    expect(tab1.getAttribute('tabindex')).toBe('0')
  })

  it('mousedown on a tab makes it active', async () => {
    const { getAllByRole } = renderTabs()
    const [, tab2] = getAllByRole('tab')
    await activateTab(tab2)
    expect(tab2.getAttribute('data-state')).toBe('active')
  })

  it('mousedown on a tab deactivates the previously active tab', async () => {
    const { getAllByRole } = renderTabs()
    const [tab1, tab2] = getAllByRole('tab')
    await activateTab(tab2)
    expect(tab1.getAttribute('data-state')).toBe('inactive')
  })

  it('mousedown on a tab shows the corresponding panel', async () => {
    const { getAllByRole, getByText } = renderTabs()
    const [, tab2] = getAllByRole('tab')
    await activateTab(tab2)
    expect(getByText('Panel two content')).toBeTruthy()
  })

  it('active tab has aria-controls pointing to its panel', async () => {
    // Reka registers panel IDs asynchronously on mount — await a tick first.
    const { getAllByRole } = renderTabs()
    await nextTick()
    const [tab1] = getAllByRole('tab')
    const panelId = tab1.getAttribute('aria-controls')
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toBeTruthy()
  })
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────
//
// Reka's RovingFocusItem handles arrow keys by focusing the next candidate
// (via nextTick → focusFirst). When a tab receives focus, TabsTrigger's onFocus
// handler activates it (automatic activation mode). We need two ticks to flush.

describe('AGDSTabs — keyboard navigation', () => {
  async function pressKey(el: HTMLElement, key: string) {
    await fireEvent.keyDown(el, { key, code: key })
    await nextTick() // RovingFocusItem's nextTick callback fires + focus event fires
    await nextTick() // Vue flushes reactive updates from changeModelValue
  }

  it('ArrowRight on active tab moves to the next tab', async () => {
    const { getAllByRole } = renderTabs()
    const [tab1, tab2] = getAllByRole('tab')
    await activateTab(tab1) // set currentTabStopId
    await pressKey(tab1, 'ArrowRight')
    expect(tab2.getAttribute('data-state')).toBe('active')
  })

  it('ArrowLeft from the first tab wraps to the last focusable tab', async () => {
    const { getAllByRole } = renderTabs()
    const tabs = getAllByRole('tab')
    const [tab1] = tabs
    await activateTab(tab1)
    await pressKey(tab1, 'ArrowLeft')
    // Wraps to last non-disabled tab (tab2 = index 1, since tab3 is disabled)
    const nowActive = getAllByRole('tab').find(
      (t) => t.getAttribute('data-state') === 'active',
    )
    expect(nowActive).toBeTruthy()
    expect(nowActive).not.toBe(tab1)
  })

  it('Home key activates the first tab', async () => {
    const { getAllByRole } = renderTabs()
    const [tab1, tab2] = getAllByRole('tab')
    await activateTab(tab2)
    await pressKey(tab2, 'Home')
    expect(tab1.getAttribute('data-state')).toBe('active')
  })

  it('End key activates the last focusable tab', async () => {
    const { getAllByRole } = renderTabs()
    const [tab1, tab2] = getAllByRole('tab')
    await activateTab(tab1)
    await pressKey(tab1, 'End')
    // Disabled tab3 is skipped — tab2 should become active
    expect(tab2.getAttribute('data-state')).toBe('active')
  })
})

// ─── Disabled tab ─────────────────────────────────────────────────────────────

describe('AGDSTab — disabled prop', () => {
  it('sets data-disabled on the disabled tab', () => {
    const { getAllByRole } = renderTabs()
    const [, , tab3] = getAllByRole('tab')
    expect(tab3.hasAttribute('data-disabled')).toBe(true)
  })

  it('disabled tab cannot be activated by mousedown', async () => {
    const { getAllByRole } = renderTabs()
    const [, , tab3] = getAllByRole('tab')
    await activateTab(tab3)
    expect(tab3.getAttribute('data-state')).toBe('inactive')
  })
})

// ─── Props: contained ─────────────────────────────────────────────────────────

describe('AGDSTabPanel — contained prop', () => {
  it('panel has contained class by default', () => {
    const { container } = renderTabs()
    expect(container.querySelector('.agds-tab-panel--contained')).toBeTruthy()
  })

  it('panel has edge class when contained=false', () => {
    const { container } = renderTabs({ contained: false })
    expect(container.querySelector('.agds-tab-panel--edge')).toBeTruthy()
  })
})

// ─── Props: background ────────────────────────────────────────────────────────

describe('AGDSTabs — background prop', () => {
  it('applies no modifier class for default body background', () => {
    const { container } = renderTabs()
    expect(container.querySelector('.agds-tabs--body-alt')).toBeNull()
  })

  it('applies bodyAlt modifier class when background=bodyAlt', () => {
    const { container } = renderTabs({ background: 'bodyAlt' })
    expect(container.querySelector('.agds-tabs--body-alt')).toBeTruthy()
  })
})

// ─── Slots ────────────────────────────────────────────────────────────────────

describe('AGDSTab — end-element slot', () => {
  it('renders end-element slot content alongside the label', () => {
    const { getByText } = render({
      components: { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel },
      template: `
        <AGDSTabs default-value="tab1">
          <AGDSTabList aria-label="Slotted tabs">
            <AGDSTab value="tab1">
              Tab one
              <template #end-element><span>99</span></template>
            </AGDSTab>
          </AGDSTabList>
          <AGDSTabPanel value="tab1">Content</AGDSTabPanel>
        </AGDSTabs>
      `,
    })
    expect(getByText('99')).toBeTruthy()
  })
})

// ─── Accessibility: axe-core ──────────────────────────────────────────────────

describe('AGDSTabs — axe accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderTabs()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations after switching tabs', async () => {
    const { container, getAllByRole } = renderTabs()
    await activateTab(getAllByRole('tab')[1])
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with a disabled tab', async () => {
    const { container } = renderTabs()
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations with background=bodyAlt', async () => {
    const { container } = renderTabs({ background: 'bodyAlt' })
    await runAxe(container, AXE_OPTS)
  })

  it('has no violations when contained=false', async () => {
    const { container } = renderTabs({ contained: false })
    await runAxe(container, AXE_OPTS)
  })

  it('detects a violation when a tab button has no accessible name', async () => {
    // A tab button with no text content and no aria-label violates
    // WCAG 4.1.2 Name, Role, Value (axe: button-name rule).
    const { container } = render({
      components: { AGDSTabs, AGDSTabList, AGDSTab, AGDSTabPanel },
      template: `
        <AGDSTabs default-value="t1">
          <AGDSTabList aria-label="Violation tabs">
            <AGDSTab value="t1"><!-- intentionally empty --></AGDSTab>
          </AGDSTabList>
          <AGDSTabPanel value="t1">Content</AGDSTabPanel>
        </AGDSTabs>
      `,
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found')
  })
})
