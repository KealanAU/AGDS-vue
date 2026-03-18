---
title: Box
description: A low-level layout primitive that renders any HTML element and exposes CSS layout, spacing, and sizing props as a type-safe API.
category: Layout
status: stable
---

## Usage

`AGDSBox` renders a `<div>` by default. Use its props to apply display, flex, gap, and padding values without writing inline styles.

::doc-preview
<AGDSBox padding="4" display="flex" gap="2">
  <AGDSBox padding="2">Item A</AGDSBox>
  <AGDSBox padding="2">Item B</AGDSBox>
</AGDSBox>
::

```vue
<template>
  <AGDSBox padding="4" display="flex" gap="2">
    <AGDSBox padding="2">Item A</AGDSBox>
    <AGDSBox padding="2">Item B</AGDSBox>
  </AGDSBox>
</template>
```

## Polymorphic element

Use the `as` prop to change the rendered HTML element or pass a Vue component.

```vue
<template>
  <AGDSBox as="section" padding="6">
    <AGDSBox as="h2">Heading</AGDSBox>
    <AGDSBox as="p">Body text.</AGDSBox>
  </AGDSBox>
</template>
```

## Spacing tokens

Numeric values for `gap`, `padding`, and related props map to `var(--agds-space-{n})`. Pass a string to use any valid CSS value verbatim.

::doc-preview{label="Spacing tokens"}
<AGDSBox display="flex" gap="4" padding="4">
  <AGDSBox paddingX="3" paddingY="2">Horizontal + vertical</AGDSBox>
  <AGDSBox padding="2">Shorthand</AGDSBox>
</AGDSBox>
::

```vue
<template>
  <!-- :gap="4" → var(--agds-space-4) -->
  <AGDSBox display="flex" gap="4" padding="4">
    <AGDSBox paddingX="3" paddingY="2">Horizontal + vertical</AGDSBox>
    <AGDSBox padding="2">Shorthand</AGDSBox>
  </AGDSBox>
</template>
```

## Flex layout

Set `display="flex"` and use `flexDirection`, `alignItems`, and `justifyContent` to build flex containers. For a dedicated flex component see `AGDSFlex`.

::doc-preview{label="Flex row"}
<AGDSBox display="flex" flexDirection="row" alignItems="center" gap="3">
  <AGDSBox>Left</AGDSBox>
  <AGDSBox>Centre</AGDSBox>
  <AGDSBox>Right</AGDSBox>
</AGDSBox>
::

```vue
<template>
  <AGDSBox display="flex" flexDirection="row" alignItems="center" gap="3">
    <AGDSBox>Left</AGDSBox>
    <AGDSBox>Centre</AGDSBox>
    <AGDSBox>Right</AGDSBox>
  </AGDSBox>
</template>
```

## Sizing

Control width and height with `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, and `maxHeight`. Values are passed as CSS strings.

```vue
<template>
  <AGDSBox maxWidth="40rem" minHeight="10rem">
    Constrained box
  </AGDSBox>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `display` | `'block' \| 'inline' \| 'inline-block' \| 'flex' \| 'inline-flex' \| 'grid' \| 'inline-grid' \| 'none'` | — | CSS `display` property |
| `flexDirection` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | — | CSS `flex-direction` |
| `flexWrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | — | CSS `flex-wrap` |
| `flexGrow` | `0 \| 1` | — | CSS `flex-grow` |
| `flexShrink` | `0 \| 1` | — | CSS `flex-shrink` |
| `alignItems` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | CSS `align-items` |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | CSS `align-self` |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | — | CSS `justify-content` |
| `justifySelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch'` | — | CSS `justify-self` |
| `gap` | `number \| string` | — | Gap between children. Numbers map to `var(--agds-space-{n})` |
| `columnGap` | `number \| string` | — | Column gap only |
| `rowGap` | `number \| string` | — | Row gap only |
| `padding` | `number \| string` | — | Shorthand padding — overrides all individual sides |
| `paddingTop` | `number \| string` | — | Top padding |
| `paddingRight` | `number \| string` | — | Right padding |
| `paddingBottom` | `number \| string` | — | Bottom padding |
| `paddingLeft` | `number \| string` | — | Left padding |
| `paddingX` | `number \| string` | — | Horizontal padding (left + right) |
| `paddingY` | `number \| string` | — | Vertical padding (top + bottom) |
| `width` | `string` | — | CSS `width` |
| `height` | `string` | — | CSS `height` |
| `minWidth` | `string` | — | CSS `min-width` |
| `maxWidth` | `string` | — | CSS `max-width` |
| `minHeight` | `string` | — | CSS `min-height` |
| `maxHeight` | `string` | — | CSS `max-height` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content rendered inside the box |

## Accessibility

`AGDSBox` is a transparent layout primitive with no implicit ARIA role. The rendered element and any accessible attributes are entirely under the caller's control via the `as` prop and fall-through attributes.

- Use a semantically appropriate `as` value (e.g. `section`, `nav`, `main`) when the box represents a landmark region
- All attributes not listed as props pass through to the root element via `v-bind="$attrs"`

## Changelog

### 0.1.0

- Initial release — display, flex, gap, padding, and sizing props; polymorphic `as` prop
