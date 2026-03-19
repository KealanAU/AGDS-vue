---
title: Stack
description: A vertical flex layout primitive. Renders a column flex container — a shorthand for AGDSFlex with flex-direction set to column.
category: Foundations
status: stable
---

## Usage

`AGDSStack` renders a `<div>` as a vertical flex column. Use it to stack children with consistent spacing.

::doc-preview
:stack-demo
::

```vue
<template>
  <AGDSStack gap="3">
    <span>First</span>
    <span>Second</span>
    <span>Third</span>
  </AGDSStack>
</template>
```

## Alignment

Use `alignItems` to align children on the cross axis.

::doc-preview{label="Centred items"}
:stack-demo{variant="alignment"}
::

```vue
<template>
  <AGDSStack gap="2" alignItems="center">
    <span>Short</span>
    <span>A longer item</span>
  </AGDSStack>
</template>
```

## Spacing tokens

Numeric values for `gap` and padding props map to `var(--agds-space-{n})`.

```vue
<template>
  <!-- gap="4" → var(--agds-space-4) -->
  <AGDSStack gap="4" paddingX="6">
    <span>Item</span>
  </AGDSStack>
</template>
```

## Props

`AGDSStack` extends all `AGDSFlex` props except `flexDirection` and `inline`. The direction is always `column`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `alignItems` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | Aligns children on the cross axis |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | Aligns children on the main (vertical) axis |
| `gap` | `number \| string` | — | Gap between children. Numbers map to `var(--agds-space-{n})` |
| `padding` | `number \| string` | — | Shorthand padding |
| `paddingX` | `number \| string` | — | Horizontal padding |
| `paddingY` | `number \| string` | — | Vertical padding |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Stack children |

## Accessibility

`AGDSStack` is a transparent layout primitive with no implicit ARIA role. Use the `as` prop to render a semantically appropriate element where needed.

## Changelog

### 0.1.0

- Initial release — vertical flex column shorthand over `AGDSFlex`
