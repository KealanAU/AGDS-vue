import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { nextTick } from 'vue'
import { runAxe } from '../../test/a11y'

import AGDSAppLayout from './AGDSAppLayout.vue'
import AGDSAppLayoutHeader from './AGDSAppLayoutHeader.vue'
import AGDSAppLayoutSidebar from './AGDSAppLayoutSidebar.vue'
import AGDSAppLayoutSidebarNav from './AGDSAppLayoutSidebarNav.vue'
import AGDSAppLayoutFooter from './AGDSAppLayoutFooter.vue'
import AGDSAppLayoutFooterDivider from './AGDSAppLayoutFooterDivider.vue'

import type { AppLayoutNavGroup } from './appLayoutTypes'

// ── Fixtures ──────────────────────────────────────────────────────────────────

const navItems: AppLayoutNavGroup[] = [
  [
    { label: 'Dashboard', href: '/' },
    { label: 'Establishments', href: '/establishments' },
    {
      label: 'Compliance',
      href: '/compliance',
      items: [
        { label: 'Audit', href: '/compliance/audit' },
        { label: 'Certificates', href: '/compliance/certificates' },
      ],
    },
  ],
  [
    { label: 'Help', href: '/help' },
  ],
  [
    { label: 'Sign out', onClick: vi.fn() },
  ],
]

const AXE_OPTS = {
  rules: { 'color-contrast': { enabled: false } },
}

afterEach(() => {
  document.body.style.overflow = ''
})

// ── AGDSAppLayout ───────────────────────────────────────────────────────────

describe('AGDSAppLayout', () => {
  it('renders default slot content', () => {
    const { getByText } = render(AGDSAppLayout, {
      slots: { default: '<main>Main content</main>' },
    })
    expect(getByText('Main content')).toBeTruthy()
  })

  it('renders header, sidebar, and footer slots', () => {
    const { getByText } = render(AGDSAppLayout, {
      slots: {
        header: '<div>Header</div>',
        sidebar: '<div>Sidebar</div>',
        default: '<main>Content</main>',
      },
    })
    expect(getByText('Header')).toBeTruthy()
    expect(getByText('Sidebar')).toBeTruthy()
    expect(getByText('Content')).toBeTruthy()
  })

  it('adds focus-mode class when focusMode is true', () => {
    const { container } = render(AGDSAppLayout, {
      props: { focusMode: true },
    })
    expect(container.querySelector('.agds-app-layout--focus-mode')).toBeTruthy()
  })

  it('does not add focus-mode class by default', () => {
    const { container } = render(AGDSAppLayout)
    expect(container.querySelector('.agds-app-layout--focus-mode')).toBeFalsy()
  })

  it('passes axe with default slot', async () => {
    const { container } = render(AGDSAppLayout, {
      slots: { default: '<main aria-label="Content">Body</main>' },
    })
    await runAxe(container, AXE_OPTS)
  })
})

// ── AGDSAppLayoutHeader ─────────────────────────────────────────────────────

describe('AGDSAppLayoutHeader', () => {
  function renderHeader(props = {}, slots = {}) {
    return render(
      {
        components: { AGDSAppLayout, AGDSAppLayoutHeader },
        template: `
          <AGDSAppLayout>
            <template #header>
              <AGDSAppLayoutHeader heading="My Service" href="/" v-bind="headerProps">
                <template v-if="hasLogo" #logo><img src="/logo.svg" alt="Logo" /></template>
                <template v-if="hasAccount" #account><a href="/account">Account</a></template>
              </AGDSAppLayoutHeader>
            </template>
          </AGDSAppLayout>
        `,
        data() {
          return { headerProps: props, hasLogo: !!slots.logo, hasAccount: !!slots.account }
        },
      },
    )
  }

  it('renders heading text', () => {
    const { getByText } = renderHeader()
    expect(getByText('My Service')).toBeTruthy()
  })

  it('renders the hamburger button by default', () => {
    const { getByLabelText } = renderHeader()
    expect(getByLabelText('Open menu')).toBeTruthy()
  })

  it('does not render hamburger in focus mode', () => {
    const { queryByLabelText } = render(
      {
        components: { AGDSAppLayout, AGDSAppLayoutHeader },
        template: `
          <AGDSAppLayout :focus-mode="true">
            <template #header>
              <AGDSAppLayoutHeader heading="My Service" />
            </template>
          </AGDSAppLayout>
        `,
      },
    )
    expect(queryByLabelText('Open menu')).toBeFalsy()
  })

  it('hamburger has aria-expanded="false" by default', () => {
    const { getByLabelText } = renderHeader()
    expect(getByLabelText('Open menu').getAttribute('aria-expanded')).toBe('false')
  })

  it('renders badgeLabel when provided', () => {
    const { getByText } = renderHeader({ badgeLabel: 'Beta' })
    expect(getByText('Beta')).toBeTruthy()
  })

  it('renders subline when provided', () => {
    const { getByText } = renderHeader({ subline: 'A government service' })
    expect(getByText('A government service')).toBeTruthy()
  })

  it('renders account slot', () => {
    const { getByText } = render(
      {
        components: { AGDSAppLayout, AGDSAppLayoutHeader },
        template: `
          <AGDSAppLayout>
            <template #header>
              <AGDSAppLayoutHeader heading="My Service">
                <template #account><a href="/account">Account</a></template>
              </AGDSAppLayoutHeader>
            </template>
          </AGDSAppLayout>
        `,
      },
    )
    expect(getByText('Account')).toBeTruthy()
  })

  it('passes axe', async () => {
    const { container } = render(
      {
        components: { AGDSAppLayout, AGDSAppLayoutHeader },
        template: `
          <AGDSAppLayout>
            <template #header>
              <AGDSAppLayoutHeader heading="My Service" />
            </template>
          </AGDSAppLayout>
        `,
      },
    )
    await runAxe(container, AXE_OPTS)
  })
})

// ── AGDSAppLayoutSidebarNav ─────────────────────────────────────────────────

describe('AGDSAppLayoutSidebarNav', () => {
  function renderNav(activePath = '/') {
    return render(AGDSAppLayoutSidebarNav, {
      props: { items: navItems, activePath },
    })
  }

  it('renders nav landmark', () => {
    renderNav()
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('renders link items', () => {
    const { getByRole } = renderNav()
    expect(getByRole('link', { name: 'Dashboard' })).toBeTruthy()
    expect(getByRole('link', { name: 'Help' })).toBeTruthy()
  })

  it('renders button items', () => {
    const { getByRole } = renderNav()
    expect(getByRole('button', { name: 'Sign out' })).toBeTruthy()
  })

  it('marks current page with aria-current="page"', () => {
    const { getByRole } = renderNav('/')
    expect(getByRole('link', { name: 'Dashboard' }).getAttribute('aria-current')).toBe('page')
  })

  it('does not mark non-current pages', () => {
    const { getByRole } = renderNav('/')
    expect(getByRole('link', { name: 'Help' }).getAttribute('aria-current')).toBeNull()
  })

  it('shows sub-items when parent is current page (whenActive)', () => {
    const { getByRole } = renderNav('/compliance')
    expect(getByRole('link', { name: 'Audit' })).toBeTruthy()
  })

  it('hides sub-items when parent is not active (whenActive)', () => {
    const { queryByRole } = renderNav('/')
    expect(queryByRole('link', { name: 'Audit' })).toBeFalsy()
  })

  it('shows all sub-items when subLevelVisible is "always"', () => {
    const { getByRole } = render(AGDSAppLayoutSidebarNav, {
      props: { items: navItems, activePath: '/', subLevelVisible: 'always' },
    })
    expect(getByRole('link', { name: 'Audit' })).toBeTruthy()
    expect(getByRole('link', { name: 'Certificates' })).toBeTruthy()
  })

  it('passes axe with active path', async () => {
    const { container } = renderNav('/compliance/audit')
    await runAxe(container, AXE_OPTS)
  })
})

// ── AGDSAppLayoutSidebar (mobile dialog) ────────────────────────────────────

describe('AGDSAppLayoutSidebar mobile dialog', () => {
  function renderWithLayout(focusMode = false) {
    return render(
      {
        components: { AGDSAppLayout, AGDSAppLayoutHeader, AGDSAppLayoutSidebar },
        template: `
          <AGDSAppLayout :focus-mode="focusMode">
            <template #header>
              <AGDSAppLayoutHeader heading="My Service" />
            </template>
            <template #sidebar>
              <AGDSAppLayoutSidebar :items="items" active-path="/" />
            </template>
          </AGDSAppLayout>
        `,
        data() {
          return { items: navItems, focusMode }
        },
      },
      { attachTo: document.body },
    )
  }

  it('dialog is closed by default', () => {
    renderWithLayout()
    expect(screen.queryByRole('dialog')).toBeFalsy()
  })

  it('opens dialog when hamburger is clicked', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('dialog has aria-modal="true"', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('dialog shows nav items', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    expect(screen.getAllByRole('link', { name: 'Dashboard' }).length).toBeGreaterThan(0)
  })

  it('closes dialog with close button', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    fireEvent.click(screen.getByLabelText('Close menu'))
    await nextTick()
    expect(screen.queryByRole('dialog')).toBeFalsy()
  })

  it('closes dialog with Escape key', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape' })
    await nextTick()
    expect(screen.queryByRole('dialog')).toBeFalsy()
  })

  it('hamburger aria-expanded updates when dialog opens', async () => {
    renderWithLayout()
    const hamburger = screen.getByLabelText('Open menu')
    expect(hamburger.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(hamburger)
    await nextTick()
    expect(hamburger.getAttribute('aria-expanded')).toBe('true')
  })

  it('locks scroll on open, restores on close', async () => {
    renderWithLayout()
    fireEvent.click(screen.getByLabelText('Open menu'))
    await nextTick()
    await nextTick()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.click(screen.getByLabelText('Close menu'))
    await nextTick()
    await nextTick()
    expect(document.body.style.overflow).toBe('')
  })
})

// ── AGDSAppLayoutFooter ─────────────────────────────────────────────────────

describe('AGDSAppLayoutFooter', () => {
  it('renders slot content', () => {
    const { getByText } = render(AGDSAppLayoutFooter, {
      slots: { default: '<p>Footer content</p>' },
    })
    expect(getByText('Footer content')).toBeTruthy()
  })

  it('applies body background class by default', () => {
    const { container } = render(AGDSAppLayoutFooter)
    expect(container.querySelector('.agds-app-layout-footer--body')).toBeTruthy()
  })

  it('applies bodyAlt background class', () => {
    const { container } = render(AGDSAppLayoutFooter, {
      props: { background: 'bodyAlt' },
    })
    expect(container.querySelector('.agds-app-layout-footer--bodyAlt')).toBeTruthy()
  })

  it('renders as <footer> element', () => {
    const { container } = render(AGDSAppLayoutFooter)
    expect(container.querySelector('footer')).toBeTruthy()
  })

  it('passes axe', async () => {
    const { container } = render(AGDSAppLayoutFooter, {
      slots: { default: '<p>Footer</p>' },
    })
    await runAxe(container, AXE_OPTS)
  })
})

// ── AGDSAppLayoutFooterDivider ──────────────────────────────────────────────

describe('AGDSAppLayoutFooterDivider', () => {
  it('renders an hr element', () => {
    const { container } = render(AGDSAppLayoutFooterDivider)
    expect(container.querySelector('hr')).toBeTruthy()
  })

  it('hr is aria-hidden', () => {
    const { container } = render(AGDSAppLayoutFooterDivider)
    expect(container.querySelector('hr')?.getAttribute('aria-hidden')).toBe('true')
  })
})

// ── Full layout integration ───────────────────────────────────────────────────

describe('AGDSAppLayout full integration', () => {
  it('renders a complete accessible page layout', async () => {
    const { container } = render(
      {
        components: {
          AGDSAppLayout,
          AGDSAppLayoutHeader,
          AGDSAppLayoutSidebar,
          AGDSAppLayoutFooter,
        },
        template: `
          <AGDSAppLayout>
            <template #header>
              <AGDSAppLayoutHeader heading="My Government Service" href="/" />
            </template>
            <template #sidebar>
              <AGDSAppLayoutSidebar :items="items" active-path="/dashboard" />
            </template>
            <main id="main-content" aria-label="Main content">
              <h1>Dashboard</h1>
              <p>Welcome to the service.</p>
            </main>
            <AGDSAppLayoutFooter>
              <p>© Commonwealth of Australia</p>
            </AGDSAppLayoutFooter>
          </AGDSAppLayout>
        `,
        data() {
          return {
            items: [
              [
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Help', href: '/help' },
              ],
            ] as AppLayoutNavGroup[],
          }
        },
      },
    )
    await runAxe(container, AXE_OPTS)
  })
})

// ── Intentional axe violation — verifies the helper catches real failures ────

describe('axe helper catches violations', () => {
  it('detects missing button label', async () => {
    const { container } = render({
      template: '<button></button>',
    })
    await expect(runAxe(container, AXE_OPTS)).rejects.toThrow()
  })
})
