---
title: Side nav
description: A vertical navigation component for section-level wayfinding. Supports nested links, active path highlighting, and collapses to a toggle on small screens.
category: Navigation
status: stable
---

## Usage

Provide `activePath` (the current page URL), a `title`, and an array of `items`. Each item needs an `href` and `label`; items can nest one or more levels deep via `items`.

::doc-preview
<SideNavDemo />
::

```vue
<template>
  <AgDSSideNav
    active-path="/services/health"
    title="Services"
    :items="[
      { href: '/services', label: 'All services' },
      {
        href: '/services/health',
        label: 'Health',
        items: [
          { href: '/services/health/medicare', label: 'Medicare' },
          { href: '/services/health/aged-care', label: 'Aged care' },
        ],
      },
      { href: '/services/education', label: 'Education' },
    ]"
  />
</template>
```

## Sub-level visibility

By default (`subLevelVisible="whenActive"`) nested items are only revealed when their parent is the active section. Set `subLevelVisible="always"` to keep every level expanded at all times.

::doc-preview{label="Always expanded"}
<SideNavDemo variant="always" />
::

```vue
<template>
  <AgDSSideNav
    active-path="/services"
    title="Services"
    sub-level-visible="always"
    :items="items"
  />
</template>
```

## Title link

Pass `titleLink` to render the section heading as an anchor. If `activePath` matches `titleLink`, the heading receives `aria-current="page"`.

```vue
<template>
  <AgDSSideNav
    active-path="/services"
    title="Services"
    title-link="/services"
    :items="items"
  />
</template>
```

## Background variant

Use `background="bodyAlt"` when the nav is placed on a `--agds-color-bg-subtle` surface.

```vue
<template>
  <AgDSSideNav
    active-path="/foo"
    title="Navigation"
    background="bodyAlt"
    :items="items"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activePath` | `string` | — | **Required.** URL of the current page. Uses longest-prefix matching when no exact item href exists |
| `items` | `SideNavItem[]` | — | **Required.** Navigation tree |
| `title` | `string` | — | **Required.** Heading text shown above the links |
| `titleLink` | `string` | — | Renders the title as an anchor pointing to this URL |
| `subLevelVisible` | `'always' \| 'whenActive'` | `'whenActive'` | When to reveal nested items |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Surface the nav sits on |

### SideNavItem

| Field | Type | Description |
|-------|------|-------------|
| `href` | `string` | **Required.** Navigation URL |
| `label` | `string` | **Required.** Visible link text |
| `items` | `SideNavItem[]` | Optional nested items |

## Accessibility

- Wrapped in a `<nav>` landmark; no extra `aria-label` needed when the page contains only one nav
- Active link receives `aria-current="page"`
- Items with hidden sub-links get an `aria-label` that includes "has sub links" / "has expanded sub links" so screen readers announce the expand state
- Ancestor marks (–/—) used as visual depth cues are `aria-hidden="true"`
- On mobile, the nav collapses behind a `<button aria-expanded>` toggle; focus stays on the button after toggle

## Changelog

### 0.1.0

- Initial release — `activePath`, `items`, `title`, `titleLink`, `subLevelVisible`, `background`; mobile collapse toggle; recursive nested navigation
