---
title: Text
description: A low-level typography primitive for applying design-token colour, size, weight, family, and line height to any inline or block element.
category: Typography
status: stable
---

## Usage

Wrap text in `AgDSText` to apply typographic styles. The default renders a `<span>` with `sm` size and `body` font family.

::doc-preview
<AgDSText>Default text</AgDSText>
::

```vue
<template>
  <AgDSText>Default text</AgDSText>
</template>
```

## Font size

Use `fontSize` to set a size from the type scale.

::doc-preview{label="All sizes"}
<AgDSText as="p" font-size="xs">xs — Extra small</AgDSText>
<AgDSText as="p" font-size="sm">sm — Small (default)</AgDSText>
<AgDSText as="p" font-size="md">md — Medium</AgDSText>
<AgDSText as="p" font-size="lg">lg — Large</AgDSText>
<AgDSText as="p" font-size="xl">xl — Extra large</AgDSText>
::

```vue
<template>
  <AgDSText as="p" font-size="xs">xs — Extra small</AgDSText>
  <AgDSText as="p" font-size="sm">sm — Small (default)</AgDSText>
  <AgDSText as="p" font-size="md">md — Medium</AgDSText>
  <AgDSText as="p" font-size="lg">lg — Large</AgDSText>
  <AgDSText as="p" font-size="xl">xl — Extra large</AgDSText>
</template>
```

## Color

Use `color` to apply a semantic text colour token.

::doc-preview{label="Colors"}
<AgDSText as="p" color="text">text — Primary text</AgDSText>
<AgDSText as="p" color="muted">muted — Secondary / helper text</AgDSText>
<AgDSText as="p" color="disabled">disabled — Disabled state</AgDSText>
::

```vue
<template>
  <AgDSText as="p" color="text">Primary text</AgDSText>
  <AgDSText as="p" color="muted">Secondary / helper text</AgDSText>
  <AgDSText as="p" color="disabled">Disabled state</AgDSText>
</template>
```

## Font weight

```vue
<template>
  <AgDSText font-weight="normal">Normal weight</AgDSText>
  <AgDSText font-weight="medium">Medium weight</AgDSText>
  <AgDSText font-weight="semibold">Semibold weight</AgDSText>
  <AgDSText font-weight="bold">Bold weight</AgDSText>
</template>
```

## Rendered element

Use `as` to change the rendered HTML element. This is useful for semantic paragraphs, labels, or captions.

```vue
<template>
  <AgDSText as="p" font-size="md">A paragraph</AgDSText>
  <AgDSText as="label" font-weight="bold">A bold label</AgDSText>
  <AgDSText as="caption" color="muted" font-size="xs">A caption</AgDSText>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'span'` | HTML element to render |
| `color` | `'text' \| 'muted' \| 'inverse' \| 'disabled'` | `'text'` | Semantic text colour |
| `fontSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'sm'` | Font size from the type scale |
| `fontWeight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | Font weight |
| `fontFamily` | `'body' \| 'heading' \| 'mono'` | `'body'` | Font family token |
| `lineHeight` | `'tight' \| 'snug' \| 'normal' \| 'relaxed'` | `'normal'` | Line height token |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Text content |

## Changelog

### 0.1.0

- Initial release — `as`, `color`, `fontSize`, `fontWeight`, `fontFamily`, `lineHeight` props
