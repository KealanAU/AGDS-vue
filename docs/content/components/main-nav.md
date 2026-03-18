---
title: Main nav
description: The primary navigation bar for Agriculture Design System (AGDS) sites. Shows top-level links on desktop, collapses to a hamburger + slide-in drawer on mobile, and supports dropdown menus and secondary actions on the right.
category: Navigation
status: stable
---

## Usage

Pass `items` for the primary navigation links. The hamburger button and mobile drawer are rendered automatically when items are provided.

```vue
<template>
  <AGDSMainNav
    :items="[
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
    ]"
    active-path="/about"
  />
</template>
```

## Secondary items

Use `secondaryItems` to add links or actions to the right side of the bar (sign in, search, etc.).

```vue
<template>
  <AGDSMainNav
    :items="[
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ]"
    :secondary-items="[
      { label: 'Sign in', href: '/signin' },
    ]"
    active-path="/"
  />
</template>
```

## Dropdown items

Include a `items` array on a nav item to render a dropdown menu. The dropdown is shown on desktop; the sub-links are expanded inline inside the mobile drawer.

```vue
<template>
  <AGDSMainNav
    :items="[
      { label: 'Home', href: '/' },
      {
        label: 'Resources',
        items: [
          { label: 'Documentation', href: '/docs' },
          { label: 'API reference', href: '/api' },
        ],
      },
    ]"
    active-path="/"
  />
</template>
```

## Button items

Omit `href` on an item to render it as a `<button>` instead of a link. Provide an `onClick` handler for the action.

```vue
<script setup>
function openSearch() { /* … */ }
</script>

<template>
  <AGDSMainNav
    :items="[{ label: 'Home', href: '/' }]"
    :secondary-items="[{ label: 'Search', onClick: openSearch }]"
  />
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the nav sits on an off-white surface.

```vue
<template>
  <AGDSMainNav
    background="bodyAlt"
    :items="[{ label: 'Home', href: '/' }]"
  />
</template>
```

## focusMode

Set `focus-mode` to remove all nav items — useful during checkout or multi-step forms where distractions should be minimised.

```vue
<template>
  <AGDSMainNav focus-mode :items="[{ label: 'Home', href: '/' }]" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activePath` | `string` | — | Current URL path. The nav item whose `href` best matches (longest prefix) is marked active |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour variant |
| `borderColor` | `'brand' \| 'border' \| 'border-strong'` | `'brand'` | Colour of the thick accent border at the bottom of the bar |
| `focusMode` | `boolean` | `false` | Hides all navigation items |
| `id` | `string` | — | HTML `id` placed on the `<header>` element |
| `items` | `MainNavItem[]` | — | Primary navigation items (left side on desktop) |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Maximum width of the inner bar (`75rem` or `90rem`) |
| `secondaryItems` | `MainNavItem[]` | — | Secondary navigation items (right side on desktop) |

### MainNavItem

An item can be a link, a button, or a dropdown group:

| Shape | Required fields | Description |
|-------|----------------|-------------|
| Link | `label`, `href` | Renders as `<a href>` |
| Button | `label`, `onClick?` | Renders as `<button>` |
| Dropdown | `label`, `items` | Renders as a dropdown menu on desktop, expanded inline on mobile |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `Tab` | Move between interactive elements |
| `Enter` / `Space` | Activate a link or button; open a dropdown |
| `Escape` | Close the mobile drawer or an open dropdown |
| `Arrow keys` | Navigate within an open dropdown panel |

## Accessibility

- The `<header>` element provides the `banner` landmark
- Desktop primary nav (`<nav aria-label="Main">`) and secondary nav (`<nav aria-label="Supplementary">`) are separate landmarks
- The hamburger button uses `aria-expanded` to communicate the drawer state
- The mobile drawer uses `role="dialog"` with `aria-modal="true"` and `aria-label="Main menu"`; focus is trapped inside and returns to the hamburger on close
- The desktop bar gets `aria-hidden="true"` while the mobile dialog is open to prevent duplicate landmark violations
- Active item receives `aria-current="page"`; matching uses longest-prefix so `/about/team` activates the `/about` link

## Changelog

### 0.1.0

- Initial release — primary/secondary items, dropdown support, mobile drawer, `activePath`, `background`, `borderColor`, `focusMode`, `maxWidth`
