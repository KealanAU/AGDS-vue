---
title: Skip link
description: Visually hidden navigation links that appear on keyboard focus, allowing keyboard and screen reader users to skip past repeated navigation to reach the main content directly.
category: Navigation
status: stable
---

## Usage

Place `AgDSSkipLinks` as the very first element inside `<body>` (or the app root), before any navigation. Each link targets an anchor on the page.

::doc-preview
<AgDSSkipLinks :links="[{ label: 'Skip to main content', href: '#main-content' }]" />
::

```vue
<template>
  <!-- Must be the first focusable element on the page -->
  <AgDSSkipLinks :links="[
    { label: 'Skip to main content', href: '#main-content' },
    { label: 'Skip to navigation', href: '#main-nav' },
  ]" />

  <header>…</header>
  <nav id="main-nav">…</nav>
  <main id="main-content">…</main>
</template>
```

## Multiple links

Provide multiple entries to let users skip to different landmarks.

```vue
<template>
  <AgDSSkipLinks :links="[
    { label: 'Skip to main content', href: '#main-content' },
    { label: 'Skip to footer', href: '#footer' },
  ]" />
</template>
```

## Custom nav label

Override the accessible label on the wrapping `<nav>` landmark with `ariaLabel`.

```vue
<template>
  <AgDSSkipLinks
    :links="[{ label: 'Skip to content', href: '#content' }]"
    aria-label="Page navigation shortcuts"
  />
</template>
```

## How it works

Each link is visually hidden until it receives keyboard focus, at which point it appears as a primary-button-styled anchor in the top-left corner of the viewport. Activating the link moves focus to the target element.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `SkipLink[]` | — | **Required.** One or more `{ label, href }` objects |
| `ariaLabel` | `string` | `'Skip links'` | Accessible label for the wrapping `<nav>` landmark |

### SkipLink shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Visible link text when focused |
| `href` | `string` | Target anchor, e.g. `'#main-content'` |

## Accessibility

- Links are visually hidden until focused (`:focus-visible`) — they do not affect the visual layout for pointer users (WCAG 2.4.1)
- The wrapping `<nav aria-label="Skip links">` creates a distinct navigation landmark so screen reader users can find and skip it
- On focus the link renders as a primary button using AGDS button tokens — meets WCAG 2.2 focus appearance

## Changelog

### 0.1.0

- Initial release — multiple links, `ariaLabel` prop
