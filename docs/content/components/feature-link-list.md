---
title: Feature Link List
description: A bordered list of prominent navigational links, each with a label, optional secondary text, and a chevron. Used to highlight key destinations on a page.
category: Navigation
status: stable
---

## Usage

Pass an array of `links` to `AGDSFeatureLinkList`. Each link needs an `href` and a `label`.

::doc-preview
<FeatureLinkListDemo />
::

```vue
<template>
  <AGDSFeatureLinkList
    :links="[
      { href: '/grants/apply', label: 'Apply for a grant' },
      { href: '/eligibility', label: 'Check your eligibility' },
      { href: '/find-service', label: 'Find a service near you' },
    ]"
  />
</template>
```

## Secondary text

Add `secondaryText` to any link to show a description below the label.

::doc-preview{label="With descriptions"}
<FeatureLinkListDemo variant="secondary" />
::

```vue
<template>
  <AGDSFeatureLinkList
    :links="[
      {
        href: '/grants/apply',
        label: 'Apply for a grant',
        secondaryText: 'For individuals and small businesses affected by recent natural disasters',
      },
      {
        href: '/eligibility',
        label: 'Check your eligibility',
        secondaryText: 'Answer a few questions to see what support is available to you',
      },
    ]"
  />
</template>
```

## External links

Set `external: true` on any link to open it in a new tab. A visually hidden ", opens in a new tab" is appended to the link text for screen reader users.

```vue
<template>
  <AGDSFeatureLinkList
    :links="[
      { href: 'https://www.ato.gov.au', label: 'Australian Taxation Office', external: true },
    ]"
  />
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the list sits on an off-white surface to ensure hover states remain visible.

```vue
<template>
  <AGDSFeatureLinkList background="bodyAlt" :links="links" />
</template>
```

## Props — AGDSFeatureLinkList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `FeatureLinkListLink[]` | — | **Required.** Array of link entries |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background context — controls hover shade |

### FeatureLinkListLink

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `href` | `string` | — | **Required.** Navigation URL |
| `label` | `string` | — | **Required.** Visible link label (bold) |
| `secondaryText` | `string` | — | Optional description below the label |
| `external` | `boolean` | `false` | Opens in a new tab; appends accessible offscreen text |

## Accessibility

- Each item is a native `<a>` element — keyboard accessible by default
- External links include `rel="noopener noreferrer"` and a sr-only ", opens in a new tab" suffix
- Chevron SVGs are `aria-hidden="true"` (decorative)
- Focus ring: 3px solid focus colour on `:focus-visible`

## Changelog

### 0.1.0

- Initial release — `links`, `background` props; `secondaryText`, `external` per-link options
