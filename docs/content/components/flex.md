---
title: Flex
description: A flex layout primitive built on top of Box. Renders a flex container with sensible defaults and exposes all Box spacing and sizing props.
category: Layout
status: stable
---

## Usage

`AGDSFlex` renders a `<div>` with `display: flex`. Use it anywhere you need a flex container without setting `display` manually.

::doc-preview
:flex-demo
::

```vue
<template>
  <AGDSFlex gap="3">
    <span>Item one</span>
    <span>Item two</span>
    <span>Item three</span>
  </AGDSFlex>
</template>
```

## Direction

Use `flexDirection` to arrange children in a row or column. Defaults to `row`.

::doc-preview{label="Column direction"}
:flex-demo{variant="column"}
::

```vue
<template>
  <AGDSFlex flexDirection="column" gap="2">
    <span>First</span>
    <span>Second</span>
    <span>Third</span>
  </AGDSFlex>
</template>
```

## Alignment

Use `alignItems` and `justifyContent` to align children on the cross and main axes.

::doc-preview{label="Centred content"}
:flex-demo{variant="centered"}
::

```vue
<template>
  <AGDSFlex alignItems="center" justifyContent="space-between">
    <span>Left</span>
    <span>Right</span>
  </AGDSFlex>
</template>
```

## Inline flex

Set `inline` to render `display: inline-flex` instead of `display: flex`.

::doc-preview{label="Inline flex"}
:flex-demo{variant="inline"}
::

```vue
<template>
  <p>
    Text before
    <AGDSFlex inline gap="1" alignItems="center">
      <span>inline</span>
      <span>flex</span>
    </AGDSFlex>
    text after.
  </p>
</template>
```

## Wrapping

Use `flexWrap` to control whether children wrap when they overflow the container.

```vue
<template>
  <AGDSFlex flexWrap="wrap" gap="3">
    <span v-for="i in 10" :key="i">Tag {{ i }}</span>
  </AGDSFlex>
</template>
```

## Spacing tokens

Numeric values for `gap`, `padding`, and related props map to `var(--agds-space-{n})`. Pass a string for any custom CSS value.

```vue
<template>
  <!-- :gap="4" → var(--agds-space-4) -->
  <AGDSFlex gap="4" paddingX="6">
    <span>Item</span>
  </AGDSFlex>
</template>
```

## Props

`AGDSFlex` extends all props from `AGDSBox`. The `display` prop defaults to `flex` (or `inline-flex` when `inline` is set).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inline` | `boolean` | `false` | Renders `display: inline-flex` instead of `flex` |
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `flexDirection` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | CSS `flex-direction` |
| `flexWrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | — | CSS `flex-wrap` |
| `flexGrow` | `0 \| 1` | — | CSS `flex-grow` |
| `flexShrink` | `0 \| 1` | — | CSS `flex-shrink` |
| `alignItems` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | CSS `align-items` |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | CSS `align-self` |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | CSS `justify-content` |
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
| `default` | Flex children |

## Accessibility

`AGDSFlex` is a transparent layout primitive with no implicit ARIA role. The rendered element and any accessible attributes are entirely under the caller's control.

- Use a semantically appropriate `as` value where the container carries landmark meaning (e.g. `nav`, `header`)
- All non-prop attributes fall through to the root element

## Changelog

### 0.1.0

- Initial release — extends `AGDSBox` with `inline` prop and flex-oriented defaults for `flexDirection`, `alignItems`, and `justifyContent`
