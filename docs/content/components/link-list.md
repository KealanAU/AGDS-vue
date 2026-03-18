---
title: Link List
description: A styled list of navigation links. Supports vertical (default) and horizontal layouts. Automatically handles new-tab links with screen-reader-friendly text.
category: Navigation
status: stable
---

## Usage

Compose `AGDSLinkList` with `AGDSLinkListItem` children.

::doc-preview
<AGDSLinkList>
  <AGDSLinkListItem href="/" label="Home" />
  <AGDSLinkListItem href="/about" label="About us" />
  <AGDSLinkListItem href="/contact" label="Contact" />
</AGDSLinkList>
::

```vue
<template>
  <AGDSLinkList>
    <AGDSLinkListItem href="/" label="Home" />
    <AGDSLinkListItem href="/about" label="About us" />
    <AGDSLinkListItem href="/contact" label="Contact" />
  </AGDSLinkList>
</template>
```

## Horizontal layout

Use the `horizontal` prop to lay links out in a row.

::doc-preview{label="Horizontal"}
<AGDSLinkList horizontal>
  <AGDSLinkListItem href="/privacy" label="Privacy" />
  <AGDSLinkListItem href="/accessibility" label="Accessibility" />
  <AGDSLinkListItem href="/sitemap" label="Sitemap" />
</AGDSLinkList>
::

```vue
<template>
  <AGDSLinkList horizontal>
    <AGDSLinkListItem href="/privacy" label="Privacy" />
    <AGDSLinkListItem href="/accessibility" label="Accessibility" />
    <AGDSLinkListItem href="/sitemap" label="Sitemap" />
  </AGDSLinkList>
</template>
```

## New-tab links

Set `target="_blank"` on an item. The component automatically adds `rel="noopener noreferrer"` and a visually-hidden ", opens in a new tab" announcement for screen readers.

::doc-preview{label="New tab"}
<AGDSLinkList>
  <AGDSLinkListItem href="https://www.apsjobs.gov.au" label="APS Jobs" target="_blank" />
  <AGDSLinkListItem href="https://my.gov.au" label="My Gov" target="_blank" />
</AGDSLinkList>
::

```vue
<template>
  <AGDSLinkList>
    <AGDSLinkListItem href="https://www.apsjobs.gov.au" label="APS Jobs" target="_blank" />
    <AGDSLinkListItem href="https://my.gov.au" label="My Gov" target="_blank" />
  </AGDSLinkList>
</template>
```

## Props array shorthand

For purely data-driven usage, pass a `links` array instead of composing items manually.

```vue
<script setup>
const links = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
</script>

<template>
  <AGDSLinkList :links="links" />
</template>
```

## Props — AGDSLinkList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `LinkListLink[]` | — | Array of link objects. Use instead of the default slot for data-driven lists. |
| `horizontal` | `boolean` | `false` | Lay links out horizontally |

### LinkListLink shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Visible link text |
| `href` | `string` | Link destination URL |
| `target` | `string` | e.g. `'_blank'` to open in a new tab |

## Props — AGDSLinkListItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** Link destination URL |
| `label` | `string` | — | **Required.** Visible link text |
| `target` | `string` | — | e.g. `'_blank'` to open in a new tab |

## Accessibility

- Links use native `<a>` elements — keyboard accessible and announced correctly by screen readers
- `target="_blank"` links automatically get `rel="noopener noreferrer"` (security) and a visually-hidden ", opens in a new tab" span (WCAG 2.4.4)
- `:focus-visible` styling with the AGDS focus ring on all links

## Changelog

### 0.1.0

- Initial release — vertical/horizontal layout, new-tab link handling
