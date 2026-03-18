---
title: Breadcrumbs
description: A navigation landmark that shows the user's location in the site hierarchy. Collapses middle items on small screens with a toggle button.
category: Navigation
status: stable
---

## Usage

Pass an array of `links` to `AGDSBreadcrumbs`. Each link needs a `label` and an optional `href`. The last item is automatically marked as the current page.

::doc-preview
<BreadcrumbsDemo />
::

```vue
<template>
  <AGDSBreadcrumbs
    :links="[
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Services' },
      { label: 'Apply for a permit' },
    ]"
  />
</template>
```

## Collapsed middle items

When there are middle items (more than first + last), they are hidden on small screens behind a "…" toggle button. Clicking it reveals all items and moves focus to the first link.

::doc-preview{label="Many levels"}
<BreadcrumbsDemo variant="collapsed" />
::

```vue
<template>
  <AGDSBreadcrumbs
    :links="[
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Services' },
      { href: '/services/permits', label: 'Permits' },
      { href: '/services/permits/building', label: 'Building' },
      { label: 'Apply for a permit' },
    ]"
  />
</template>
```

## Custom aria-label

The wrapping `<nav>` element defaults to `aria-label="Breadcrumbs"`. Override with `ariaLabel` if the page has multiple navigations.

```vue
<template>
  <AGDSBreadcrumbs
    aria-label="Section navigation"
    :links="links"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `BreadcrumbLink[]` | — | **Required.** The breadcrumb trail. Minimum 2 items |
| `ariaLabel` | `string` | `'Breadcrumbs'` | `aria-label` on the `<nav>` landmark |

### BreadcrumbLink

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Visible text |
| `href` | `string` | Navigation URL. Omit for non-linked items |

## Accessibility

- Wrapped in a `<nav aria-label="Breadcrumbs">` landmark
- Last item receives `aria-current="page"` and a sr-only "(current page)" suffix
- On mobile, middle items collapse and a toggle button (`aria-expanded`) reveals them — focus moves to the first link after expansion
- Dividers are `aria-hidden="true"` and decorative

## Changelog

### 0.1.0

- Initial release — `links` prop, `ariaLabel`, collapsible middle items on mobile
