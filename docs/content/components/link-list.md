---
title: Link List
description: A styled list of navigation links. Supports vertical (default) and horizontal layouts. Automatically handles new-tab links with screen-reader-friendly text.
category: Navigation
status: stable
---

## Usage

Pass an array of `links`, each with a `href` and `label`.

::doc-preview
<AgDSLinkList :links="[
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]" />
::

```vue
<template>
  <AgDSLinkList :links="[
    { label: 'Home', href: '/' },
    { label: 'About us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]" />
</template>
```

## Horizontal layout

Use the `horizontal` prop to lay links out in a row.

::doc-preview{label="Horizontal"}
<AgDSLinkList horizontal :links="[
  { label: 'Privacy', href: '/privacy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap' },
]" />
::

```vue
<template>
  <AgDSLinkList
    horizontal
    :links="[
      { label: 'Privacy', href: '/privacy' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Sitemap', href: '/sitemap' },
    ]"
  />
</template>
```

## New-tab links

Set `target="_blank"` on a link. The component automatically adds `rel="noopener noreferrer"` and a visually-hidden ", opens in a new tab" announcement for screen readers.

```vue
<template>
  <AgDSLinkList :links="[
    { label: 'APS Jobs', href: 'https://www.apsjobs.gov.au', target: '_blank' },
    { label: 'My Gov', href: 'https://my.gov.au', target: '_blank' },
  ]" />
</template>
```

## Props — AgDSLinkList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `LinkListLink[]` | — | **Required.** Array of link objects |
| `horizontal` | `boolean` | `false` | Lay links out horizontally |

### LinkListLink shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Visible link text |
| `href` | `string` | Link destination URL |
| `target` | `string` | e.g. `'_blank'` to open in a new tab |

## Accessibility

- Links use native `<a>` elements — keyboard accessible and announced correctly by screen readers
- `target="_blank"` links automatically get `rel="noopener noreferrer"` (security) and a visually-hidden ", opens in a new tab" span (WCAG 2.4.4)
- `:focus-visible` styling with the AGDS focus ring on all links

## Changelog

### 0.1.0

- Initial release — vertical/horizontal layout, new-tab link handling
