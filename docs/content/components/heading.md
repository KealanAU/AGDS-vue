---
title: Heading
description: Semantic heading elements with design-token typography. Supports decoupling visual size from DOM level via the `as` prop.
category: Typography
status: stable
---

## Usage

Use `AgDSHeading` to render a heading with the correct font size for its level. The default level is `h2`.

::doc-preview
<AgDSHeading type="h1">Page title</AgDSHeading>
<AgDSHeading type="h2">Section heading</AgDSHeading>
<AgDSHeading type="h3">Subsection heading</AgDSHeading>
::

```vue
<template>
  <AgDSHeading type="h1">Page title</AgDSHeading>
  <AgDSHeading type="h2">Section heading</AgDSHeading>
  <AgDSHeading type="h3">Subsection heading</AgDSHeading>
</template>
```

## Convenience components

Shorthand components are available for each heading level. They are equivalent to `<AgDSHeading type="h1" />` etc.

```vue
<template>
  <AgDSH1>Page title</AgDSH1>
  <AgDSH2>Section heading</AgDSH2>
  <AgDSH3>Subsection</AgDSH3>
  <AgDSH4>Sub-subsection</AgDSH4>
  <AgDSH5>Minor heading</AgDSH5>
  <AgDSH6>Caption-level heading</AgDSH6>
</template>
```

## Decoupling visual size from DOM level

Use the `as` prop to render a different HTML element while keeping the font size of `type`. This is useful when the visual hierarchy differs from the document outline.

```vue
<template>
  <!-- Visually looks like an h2 but renders as h3 in the DOM -->
  <AgDSHeading type="h2" as="h3">
    Visually large, semantically h3
  </AgDSHeading>
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

- Initial release — `type`, `as` props; `AgDSH1`–`AgDSH6` convenience components
