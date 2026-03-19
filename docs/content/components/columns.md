---
title: Columns
description: A CSS grid container with configurable column counts and gaps. Use AGDSColumn children to span, start, or end at specific grid lines.
category: Layout
status: stable
---

## Usage

Wrap `AGDSColumn` children inside `AGDSColumns` to create a grid layout. By default the grid has 12 equal columns.

::doc-preview
:columns-demo
::

```vue
<template>
  <AGDSColumns :gap="4">
    <AGDSColumn :span="6">Left half</AGDSColumn>
    <AGDSColumn :span="6">Right half</AGDSColumn>
  </AGDSColumns>
</template>
```

## Column count

Use the `cols` prop to change the total number of columns. The default is `12`.

::doc-preview{label="4-column grid"}
:columns-demo{variant="col-count"}
::

```vue
<template>
  <AGDSColumns :cols="4" :gap="3">
    <AGDSColumn>1</AGDSColumn>
    <AGDSColumn>2</AGDSColumn>
    <AGDSColumn>3</AGDSColumn>
    <AGDSColumn>4</AGDSColumn>
  </AGDSColumns>
</template>
```

## Span, start, and end

Control how each `AGDSColumn` occupies the grid using `span`, `start`, and `end`.

- `span` — how many columns the item spans
- `start` — 1-based grid column start line
- `end` — 1-based grid column end line (exclusive)

::doc-preview{label="Offset column"}
:columns-demo{variant="offset"}
::

```vue
<template>
  <AGDSColumns :gap="3">
    <!-- Starts at line 3, spans 8 of 12 columns -->
    <AGDSColumn :start="3" :span="8">Centred content</AGDSColumn>
  </AGDSColumns>
</template>
```

## Gap

Use `gap`, `columnGap`, and `rowGap` to set spacing between grid cells. Numbers map to `var(--agds-space-{n})`.

```vue
<template>
  <AGDSColumns :column-gap="4" :row-gap="2">
    <AGDSColumn :span="4">Card</AGDSColumn>
    <AGDSColumn :span="4">Card</AGDSColumn>
    <AGDSColumn :span="4">Card</AGDSColumn>
  </AGDSColumns>
</template>
```

## Align items

Use the `alignItems` prop on `AGDSColumns` to align all grid children on the block axis.

```vue
<template>
  <AGDSColumns :gap="4" alignItems="center">
    <AGDSColumn :span="8"><p>Tall content here</p></AGDSColumn>
    <AGDSColumn :span="4">Vertically centred</AGDSColumn>
  </AGDSColumns>
</template>
```

## Polymorphic element

Both `AGDSColumns` and `AGDSColumn` accept an `as` prop to change the rendered HTML element.

```vue
<template>
  <AGDSColumns as="ul" :gap="3">
    <AGDSColumn as="li" :span="4">Item</AGDSColumn>
    <AGDSColumn as="li" :span="4">Item</AGDSColumn>
    <AGDSColumn as="li" :span="4">Item</AGDSColumn>
  </AGDSColumns>
</template>
```

## Props — AGDSColumns

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `cols` | `1–12` | `12` | Total number of equal grid columns |
| `gap` | `number \| string` | — | Gap between columns and rows. Numbers map to `var(--agds-space-{n})` |
| `columnGap` | `number \| string` | — | Column gap only |
| `rowGap` | `number \| string` | — | Row gap only |
| `alignItems` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | Aligns all grid children on the block axis |

## Props — AGDSColumn

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `span` | `1–12` | — | Number of grid columns this item spans |
| `start` | `1–12` | — | 1-based grid column start line |
| `end` | `1–12` | — | 1-based grid column end line (exclusive) |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | Aligns this item on the block axis within its grid area |
| `justifySelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch'` | — | Aligns this item on the inline axis within its grid area |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Grid children — typically one or more `AGDSColumn` components |

Both `AGDSColumns` and `AGDSColumn` expose a `default` slot.

## Accessibility

`AGDSColumns` and `AGDSColumn` are transparent layout primitives. Rendered elements and ARIA attributes are controlled by the caller.

- Use semantically appropriate `as` values (e.g. `ul` / `li` for lists) where the grid items carry list semantics
- All non-prop attributes fall through to the root element via `v-bind="$attrs"`

## Changelog

### 0.1.0

- Initial release — `AGDSColumns` with `cols`, `gap`, `columnGap`, `rowGap`, `alignItems`; `AGDSColumn` with `span`, `start`, `end`, `alignSelf`, `justifySelf`
