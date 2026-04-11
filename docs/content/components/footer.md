---
title: Footer
description: The site footer container. Provides consistent background, padding, and max-width constraints. Use slots to compose links, logos, and acknowledgement of country text.
category: Layout
status: stable
---

## Usage

`AGDSFooter` is a layout shell — place your own content inside its default slot.

::doc-preview
:footer-demo
::

```vue
<template>
  <AGDSFooter>
    <p>
      <a href="/privacy">Privacy</a> ·
      <a href="/accessibility">Accessibility</a> ·
      <a href="/contact">Contact</a>
    </p>
    <p>© Commonwealth of Australia</p>
  </AGDSFooter>
</template>
```

## With a divider

Use `AGDSFooterDivider` to separate footer sections visually. The default `color="accent"` renders using the brand colour.

::doc-preview{label="With divider"}
:footer-demo{variant="with-divider"}
::

```vue
<template>
  <AGDSFooter>
    <nav aria-label="Footer">
      <ul>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
      </ul>
    </nav>

    <AGDSFooterDivider />

    <p>© Commonwealth of Australia</p>
  </AGDSFooter>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the footer sits on an off-white surface.

::doc-preview{label="bodyAlt background"}
:footer-demo{variant="body-alt"}
::

```vue
<template>
  <AGDSFooter background="bodyAlt">
    <p>Footer content</p>
  </AGDSFooter>
</template>
```

## Props — AGDSFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour of the footer surface |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Maximum width of the inner container |

## Props — AGDSFooterDivider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'accent' \| 'muted'` | `'accent'` | Colour of the divider line |

## Slots — AGDSFooter

| Slot | Description |
|------|-------------|
| `default` | Footer content — links, logos, copyright text, etc. |

## Accessibility

- Renders as a `<footer>` element which provides the `contentinfo` landmark
- `AGDSFooterDivider` renders as `<hr aria-hidden="true">` — decorative only
- Place navigation links inside a `<nav aria-label="Footer">` to create a distinct landmark

## Changelog

### 0.1.0

- Initial release — `AGDSFooter` (background, maxWidth), `AGDSFooterDivider` (color)
