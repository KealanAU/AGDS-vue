---
title: App layout
description: Full-page shell that composes a header, collapsible sidebar, main content area and footer into a consistent application layout. On mobile the sidebar appears in a slide-in dialog triggered by a hamburger button.
category: Layout
status: stable
---

## Usage

Wrap your entire page with `AgDSAppLayout` and slot in the sub-components. The sidebar column is hidden on mobile (< 80 rem) and revealed on desktop.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  AgDSAppLayout,
  AgDSAppLayoutHeader,
  AgDSAppLayoutSidebar,
  AgDSAppLayoutFooter,
  AgDSAppLayoutFooterDivider,
} from 'AGDS-vue'

const navItems = [
  [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Reports', href: '/reports' },
    { label: 'Settings', href: '/settings' },
  ],
]
</script>

<template>
  <AgDSAppLayout>
    <template #header>
      <AgDSAppLayoutHeader heading="My Service" href="/" />
    </template>

    <template #sidebar>
      <AgDSAppLayoutSidebar :items="navItems" active-path="/dashboard" />
    </template>

    <!-- default slot = main content -->
    <main style="padding: 2rem;">
      <h1>Dashboard</h1>
    </main>
  </AgDSAppLayout>
</template>
```

## Focus mode

Set `focus-mode` on `AgDSAppLayout` to hide the sidebar and suppress the hamburger button. Use during multi-step forms or checkout flows where nav is a distraction.

```vue
<template>
  <AgDSAppLayout focus-mode>
    <template #header>
      <AgDSAppLayoutHeader heading="My Service" />
    </template>
    <main style="padding: 2rem;">Step 1 of 3</main>
  </AgDSAppLayout>
</template>
```

## Header slots

`AgDSAppLayoutHeader` exposes three named slots for logos and account actions.

```vue
<template>
  <AgDSAppLayoutHeader heading="My Service" href="/">
    <template #logo>
      <img src="/logo.svg" alt="" />
    </template>
    <template #account>
      <AgDSButton variant="secondary" size="sm">Sign in</AgDSButton>
    </template>
  </AgDSAppLayoutHeader>
</template>
```

## Sidebar nav structure

`items` is an array of **groups**. Each group is either a plain array of nav items, or an object with `items` and optional `options`. Groups are separated by a horizontal divider.

```vue
<script setup lang="ts">
const navItems = [
  // Group 1 — plain array
  [
    { label: 'Dashboard', href: '/dashboard' },
    {
      label: 'Reports',
      href: '/reports',
      items: [
        { label: 'Monthly', href: '/reports/monthly' },
        { label: 'Annual', href: '/reports/annual' },
      ],
    },
  ],
  // Group 2 — object form with options
  {
    items: [{ label: 'Sign out', onClick: () => signOut() }],
    options: { disableGroupPadding: true },
  },
]
</script>
```

## Sub-level visibility

The `sub-level-visible` prop on `AgDSAppLayoutSidebar` controls when nested items are shown.

| Value | Behaviour |
|-------|-----------|
| `'whenActive'` (default) | Nested items expand only when a parent or child is the active path |
| `'always'` | All nested items are always visible |

```vue
<template>
  <AgDSAppLayoutSidebar :items="navItems" sub-level-visible="always" />
</template>
```

## Footer

`AgDSAppLayoutFooter` wraps footer content in a max-width container with a top border. Use `AgDSAppLayoutFooterDivider` to separate footer sections.

```vue
<template>
  <AgDSAppLayout>
    <!-- … header and sidebar slots … -->
    <main style="padding: 2rem;">Content</main>
    <AgDSAppLayoutFooter>
      <p>© 2025 Department of Agriculture, Fisheries and Forestry</p>
      <AgDSAppLayoutFooterDivider />
      <p>Accessibility · Privacy · Disclaimer</p>
    </AgDSAppLayoutFooter>
  </AgDSAppLayout>
</template>
```

## Props — AgDSAppLayout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focusMode` | `boolean` | `false` | Hides the sidebar column and hamburger button |

## Slots — AgDSAppLayout

| Slot | Description |
|------|-------------|
| `header` | Place `AgDSAppLayoutHeader` here |
| `sidebar` | Place `AgDSAppLayoutSidebar` here |
| `default` | Main page content |

## Props — AgDSAppLayoutHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | **Required.** Site or service name |
| `href` | `string` | `'/'` | Destination for the heading/logo link |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Header background colour |
| `badgeLabel` | `string` | — | Badge text shown next to the heading (e.g. `'Beta'`) |
| `subline` | `string` | — | Supplementary description below the heading |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Vertical height of the header |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner row |
| `dividerPosition` | `'before' \| 'after'` | `'after'` | Where the vertical divider sits when two logos are present |
| `secondHref` | `string` | — | Href for the co-brand logo link |

## Slots — AgDSAppLayoutHeader

| Slot | Description |
|------|-------------|
| `logo` | Primary logo element (img or svg) |
| `secondLogo` | Second logo for co-branding |
| `account` | Account section rendered at the far right of the header |

## Props — AgDSAppLayoutSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AppLayoutNavGroup[]` | — | **Required.** Navigation groups |
| `activePath` | `string` | — | Current URL path for active-item highlighting (longest-prefix match) |
| `background` | `'body' \| 'bodyAlt'` | `'bodyAlt'` | Sidebar background colour |
| `subLevelVisible` | `'always' \| 'whenActive'` | `'whenActive'` | When to show nested nav items |

### AppLayoutNavGroup

A group is either a plain `AppLayoutNavItem[]` or `{ items: AppLayoutNavItem[], options?: { disableGroupPadding?: boolean } }`.

### AppLayoutNavItem

| Shape | Required fields | Optional fields |
|-------|----------------|-----------------|
| Link item | `label`, `href` | `icon`, `items` (nested links) |
| Button item | `label` | `onClick`, `icon` |
| Text item | `label` | — |

## Props — AgDSAppLayoutFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Footer background colour |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |

## Accessibility

- The hamburger button exposes `aria-expanded` and `aria-haspopup="dialog"` so screen readers announce the open/close state and the panel type
- The mobile slide-in panel is a `role="dialog"` with `aria-modal="true"` and an `aria-label` of "Menu"; focus is trapped inside and moved to the Close button on open
- Pressing `Escape` closes the mobile dialog
- The desktop sidebar is an `<aside aria-label="Navigation">` landmark
- In focus mode the sidebar is hidden from both the visual layout and assistive technologies

## Changelog

### 0.1.0

- Initial release — `AgDSAppLayout` (focusMode), `AgDSAppLayoutHeader` (heading, href, logo/secondLogo/account slots), `AgDSAppLayoutSidebar` (items, activePath, subLevelVisible), `AgDSAppLayoutFooter`, `AgDSAppLayoutFooterDivider`
