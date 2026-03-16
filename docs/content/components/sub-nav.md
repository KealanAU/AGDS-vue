---
title: Sub nav
description: A secondary navigation bar for section-level wayfinding. Renders as a vertical list on mobile and a horizontal tab-strip on desktop, with an active indicator on the current page.
category: Navigation
status: stable
---

## Usage

Pass `links` (each with an `href` and `label`) and `activePath` to highlight the current section.

```vue
<template>
  <AgDSSubNav
    active-path="/about/team"
    :links="[
      { href: '/about', label: 'Overview' },
      { href: '/about/team', label: 'Our team' },
      { href: '/about/contact', label: 'Contact' },
    ]"
  />
</template>
```

## End element

Add `endElement` to any link to append a short badge or count after the label (e.g. a result count).

```vue
<template>
  <AgDSSubNav
    active-path="/results"
    :links="[
      { href: '/all', label: 'All' },
      { href: '/results', label: 'Results', endElement: '42' },
      { href: '/drafts', label: 'Drafts', endElement: '3' },
    ]"
  />
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the sub-nav sits on an off-white surface.

```vue
<template>
  <AgDSSubNav
    background="bodyAlt"
    active-path="/about"
    :links="[
      { href: '/about', label: 'Overview' },
      { href: '/about/team', label: 'Our team' },
    ]"
  />
</template>
```

## Custom aria-label

Override the default `'Content'` label when the page has multiple navigations.

```vue
<template>
  <AgDSSubNav
    aria-label="About section"
    active-path="/about"
    :links="[
      { href: '/about', label: 'Overview' },
      { href: '/about/team', label: 'Our team' },
    ]"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `SubNavLink[]` | — | **Required.** Navigation links |
| `activePath` | `string` | — | Current URL path — the link with the best matching `href` is marked active |
| `ariaLabel` | `string` | `'Content'` | Accessible label for the `<nav>` landmark |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour variant |
| `id` | `string` | — | HTML `id` placed on the `<nav>` element |

### SubNavLink

| Field | Type | Description |
|-------|------|-------------|
| `href` | `string` | **Required.** Navigation URL |
| `label` | `string` | **Required.** Visible link text |
| `endElement` | `string` | Optional text appended after the label (e.g. a count) |

## Accessibility

- Wrapped in a `<nav>` landmark; use `ariaLabel` to distinguish it from other navigations on the page
- Active link receives `aria-current="page"`
- Active matching uses longest-prefix so `/about/team` activates the `/about` link when no exact match exists
- On mobile, the active item has a thick left-border indicator; on desktop, a thick bottom-border indicator — neither relies on colour alone (WCAG 1.3.3)

## Changelog

### 0.1.0

- Initial release — `links`, `activePath`, `ariaLabel`, `background`, `id`, `endElement` per link
