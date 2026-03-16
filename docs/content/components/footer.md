---
title: Footer
description: The site footer container. Provides consistent background, padding, and max-width constraints. Use slots to compose links, logos, and acknowledgement of country text.
category: Layout
status: stable
---

## Usage

`AgDSFooter` is a layout shell — place your own content inside its default slot.

```vue
<template>
  <AgDSFooter>
    <p>
      <a href="/privacy">Privacy</a> ·
      <a href="/accessibility">Accessibility</a> ·
      <a href="/contact">Contact</a>
    </p>
    <p>© Commonwealth of Australia</p>
  </AgDSFooter>
</template>
```

## With a divider

Use `AgDSFooterDivider` to separate footer sections visually.

```vue
<template>
  <AgDSFooter>
    <nav aria-label="Footer">
      <ul>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
      </ul>
    </nav>

    <AgDSFooterDivider />

    <p>© Commonwealth of Australia</p>
  </AgDSFooter>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the footer sits on an off-white surface.

```vue
<template>
  <AgDSFooter background="bodyAlt">
    <p>Footer content</p>
  </AgDSFooter>
</template>
```

## Props — AgDSFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour of the footer surface |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Maximum width of the inner container |

## Props — AgDSFooterDivider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'accent' \| 'muted'` | `'accent'` | Colour of the divider line |

## Slots — AgDSFooter

| Slot | Description |
|------|-------------|
| `default` | Footer content — links, logos, copyright text, etc. |

## Accessibility

- Renders as a `<footer>` element which provides the `contentinfo` landmark
- `AgDSFooterDivider` renders as `<hr aria-hidden="true">` — decorative only
- Place navigation links inside a `<nav aria-label="Footer">` to create a distinct landmark

## Changelog

### 0.1.0

- Initial release — `AgDSFooter` (background, maxWidth), `AgDSFooterDivider` (color)
