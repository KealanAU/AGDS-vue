---
title: Inpage nav
description: A list of anchor links that lets users jump to sections within the current page. Rendered with a brand-coloured left border to distinguish it from page content.
category: Navigation
status: stable
---

## Usage

Pass `links` — each with a `label` and an anchor `href` pointing to an `id` on the page.

```vue
<template>
  <AgDSInpageNav
    :links="[
      { label: 'Introduction', href: '#introduction' },
      { label: 'Eligibility', href: '#eligibility' },
      { label: 'How to apply', href: '#how-to-apply' },
      { label: 'Contact', href: '#contact' },
    ]"
  />
</template>
```

## With a title

Add `title` to render a heading above the link list.

```vue
<template>
  <AgDSInpageNav
    title="On this page"
    :links="[
      { label: 'Introduction', href: '#introduction' },
      { label: 'Eligibility', href: '#eligibility' },
    ]"
  />
</template>
```

## Custom aria-label

Override the default `'In page'` label when the page has multiple navigations.

```vue
<template>
  <AgDSInpageNav
    aria-label="Page sections"
    :links="[
      { label: 'Introduction', href: '#introduction' },
      { label: 'Eligibility', href: '#eligibility' },
    ]"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `InpageNavLink[]` | — | **Required.** Anchor links to page sections |
| `title` | `string` | — | Optional heading rendered above the link list |
| `ariaLabel` | `string` | `'In page'` | Accessible label for the `<nav>` landmark |

### InpageNavLink

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Visible link text |
| `href` | `string` | **Required.** Anchor URL (e.g. `'#section-id'`) |

## Accessibility

- Wrapped in a `<nav>` landmark; use `ariaLabel` to distinguish it from other navigations on the page
- Each link's visible text is its accessible name (WCAG 2.4.4)
- Focus ring uses `:focus-visible` — shown for keyboard navigation only
- The left-border visual treatment is decorative and does not convey meaning on its own

## Changelog

### 0.1.0

- Initial release — `links`, `title`, `ariaLabel`
