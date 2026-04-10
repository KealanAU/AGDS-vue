---
title: Heading
description: Semantic heading elements with design-token typography. Supports decoupling visual size from DOM level via the `as` prop.
category: Typography
status: stable
---

## Usage

Use `AGDSHeading` to render a heading with the correct font size for its level. The default level is `h2`.

::doc-preview
<AGDSStack :gap="3">
  <AGDSHeading type="h1">Page title</AGDSHeading>
  <AGDSHeading type="h2">Section heading</AGDSHeading>
  <AGDSHeading type="h3">Subsection heading</AGDSHeading>
</AGDSStack>
::

```vue
<template>
  <AGDSHeading type="h1">Page title</AGDSHeading>
  <AGDSHeading type="h2">Section heading</AGDSHeading>
  <AGDSHeading type="h3">Subsection heading</AGDSHeading>
</template>
```

## Convenience components

Shorthand components are available for each heading level. They are equivalent to `<AGDSHeading type="h1" />` etc.

```vue
<template>
  <AGDSH1>Page title</AGDSH1>
  <AGDSH2>Section heading</AGDSH2>
  <AGDSH3>Subsection</AGDSH3>
  <AGDSH4>Sub-subsection</AGDSH4>
  <AGDSH5>Minor heading</AGDSH5>
  <AGDSH6>Caption-level heading</AGDSH6>
</template>
```

## Decoupling visual size from DOM level

Use the `as` prop to render a different HTML element while keeping the font size of `type`. This is useful when the visual hierarchy differs from the document outline.

```vue
<template>
  <!-- Visually looks like an h2 but renders as h3 in the DOM -->
  <AGDSHeading type="h2" as="h3">
    Visually large, semantically h3
  </AGDSHeading>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | Heading level — controls font size and the rendered element (unless `as` is set) |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | — | Override the rendered HTML element while keeping the font size of `type` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Heading text content |

## Accessibility

- Renders a native semantic heading element (`<h1>`–`<h6>`)
- Use `type` to set the correct level for the page document outline
- Use `as` only for visual overrides — ensure the DOM heading level still makes sense in context

## Changelog

### 0.1.0

- Initial release — `type`, `as` props; `AGDSH1`–`AGDSH6` convenience components
