---
title: Columns
description: A CSS grid container with configurable column counts and gaps. Use AgDSColumn children to span, start, or end at specific grid lines.
category: Layout
status: stable
---

## Usage

Wrap `AgDSColumn` children inside `AgDSColumns` to create a grid layout. By default the grid has 12 equal columns.

::doc-preview
<AgDSColumns :gap="4">
  <AgDSColumn :span="6">Left half</AgDSColumn>
  <AgDSColumn :span="6">Right half</AgDSColumn>
</AgDSColumns>
::

```vue
<template>
  <AgDSColumns :gap="4">
    <AgDSColumn :span="6">Left half</AgDSColumn>
    <AgDSColumn :span="6">Right half</AgDSColumn>
  </AgDSColumns>
</template>
```

## Column count

Use the `cols` prop to change the total number of columns. The default is `12`.

::doc-preview{label="4-column grid"}
<AgDSColumns :cols="4" :gap="3">
  <AgDSColumn>1</AgDSColumn>
  <AgDSColumn>2</AgDSColumn>
  <AgDSColumn>3</AgDSColumn>
  <AgDSColumn>4</AgDSColumn>
</AgDSColumns>
::

```vue
<template>
  <AgDSColumns :cols="4" :gap="3">
    <AgDSColumn>1</AgDSColumn>
    <AgDSColumn>2</AgDSColumn>
    <AgDSColumn>3</AgDSColumn>
    <AgDSColumn>4</AgDSColumn>
  </AgDSColumns>
</template>
```

## Span, start, and end

Control how each `AgDSColumn` occupies the grid using `span`, `start`, and `end`.

- `span` — how many columns the item spans
- `start` — 1-based grid column start line
- `end` — 1-based grid column end line (exclusive)

::doc-preview{label="Offset column"}
<AgDSColumns :gap="3">
  <AgDSColumn :start="3" :span="8">Centred content</AgDSColumn>
</AgDSColumns>
::

```vue
<template>
  <AgDSColumns :gap="3">
    <!-- Starts at line 3, spans 8 of 12 columns -->
    <AgDSColumn :start="3" :span="8">Centred content</AgDSColumn>
  </AgDSColumns>
</template>
```

## Gap

Use `gap`, `columnGap`, and `rowGap` to set spacing between grid cells. Numbers map to `var(--agds-space-{n})`.

```vue
<template>
  <AgDSColumns :column-gap="4" :row-gap="2">
    <AgDSColumn :span="4">Card</AgDSColumn>
    <AgDSColumn :span="4">Card</AgDSColumn>
    <AgDSColumn :span="4">Card</AgDSColumn>
  </AgDSColumns>
</template>
```

## Align items

Use the `alignItems` prop on `AgDSColumns` to align all grid children on the block axis.

```vue
<template>
  <AgDSColumns :gap="4" alignItems="center">
    <AgDSColumn :span="8"><p>Tall content here</p></AgDSColumn>
    <AgDSColumn :span="4">Vertically centred</AgDSColumn>
  </AgDSColumns>
</template>
```

## Polymorphic element

Both `AgDSColumns` and `AgDSColumn` accept an `as` prop to change the rendered HTML element.

```vue
<template>
  <AgDSColumns as="ul" :gap="3">
    <AgDSColumn as="li" :span="4">Item</AgDSColumn>
    <AgDSColumn as="li" :span="4">Item</AgDSColumn>
    <AgDSColumn as="li" :span="4">Item</AgDSColumn>
  </AgDSColumns>
</template>
```

## Props — AgDSColumns

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |
| `cols` | `1–12` | `12` | Total number of equal grid columns |
| `gap` | `number \| string` | — | Gap between columns and rows. Numbers map to `var(--agds-space-{n})` |
| `columnGap` | `number \| string` | — | Column gap only |
| `rowGap` | `number \| string` | — | Row gap only |
| `alignItems` | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | — | Aligns all grid children on the block axis |

## Props — AgDSColumn

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
| `default` | Grid children — typically one or more `AgDSColumn` components |

Both `AgDSColumns` and `AgDSColumn` expose a `default` slot.

## Accessibility

`AgDSColumns` and `AgDSColumn` are transparent layout primitives. Rendered elements and ARIA attributes are controlled by the caller.

- Use semantically appropriate `as` values (e.g. `ul` / `li` for lists) where the grid items carry list semantics
- All non-prop attributes fall through to the root element via `v-bind="$attrs"`

## Changelog

### 0.1.0

- Initial release — `AgDSColumns` with `cols`, `gap`, `columnGap`, `rowGap`, `alignItems`; `AgDSColumn` with `span`, `start`, `end`, `alignSelf`, `justifySelf`
