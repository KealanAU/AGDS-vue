---
title: Text
description: A low-level typography primitive for applying design-token colour, size, weight, family, and line height to any inline or block element.
category: Typography
status: stable
---

## Usage

Wrap text in `AGDSText` to apply typographic styles. The default renders a `<span>` with `sm` size and `body` font family.

::doc-preview
:text-demo
::

```vue
<template>
  <AGDSText>Default text</AGDSText>
</template>
```

## Font size

Use `fontSize` to set a size from the type scale.

::doc-preview{label="All sizes"}
:text-demo{variant="sizes"}
::

```vue
<template>
  <AGDSText as="p" font-size="xs">xs — Extra small</AGDSText>
  <AGDSText as="p" font-size="sm">sm — Small (default)</AGDSText>
  <AGDSText as="p" font-size="md">md — Medium</AGDSText>
  <AGDSText as="p" font-size="lg">lg — Large</AGDSText>
  <AGDSText as="p" font-size="xl">xl — Extra large</AGDSText>
</template>
```

## Color

Use `color` to apply a semantic text colour token.

::doc-preview{label="Colors"}
:text-demo{variant="colors"}
::

```vue
<template>
  <AGDSText as="p" color="text">Primary text</AGDSText>
  <AGDSText as="p" color="muted">Secondary / helper text</AGDSText>
  <AGDSText as="p" color="disabled">Disabled state</AGDSText>
</template>
```

## Font weight

```vue
<template>
  <AGDSText font-weight="normal">Normal weight</AGDSText>
  <AGDSText font-weight="medium">Medium weight</AGDSText>
  <AGDSText font-weight="semibold">Semibold weight</AGDSText>
  <AGDSText font-weight="bold">Bold weight</AGDSText>
</template>
```

## Rendered element

Use `as` to change the rendered HTML element. This is useful for semantic paragraphs, labels, or captions.

```vue
<template>
  <AGDSText as="p" font-size="md">A paragraph</AGDSText>
  <AGDSText as="label" font-weight="bold">A bold label</AGDSText>
  <AGDSText as="caption" color="muted" font-size="xs">A caption</AGDSText>
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
