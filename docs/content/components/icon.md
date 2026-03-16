---
title: Icon
description: A thin wrapper around @iconify/vue that applies design-token sizes and correct accessibility defaults. Decorative by default; becomes meaningful when aria-label is passed.
category: Content
status: stable
---

## Usage

Pass an Iconify icon name to the `name` prop. The icon is decorative by default (`aria-hidden="true"`).

::doc-preview
<AgDSIcon name="heroicons:home" />
::

```vue
<template>
  <AgDSIcon name="heroicons:home" />
</template>
```

## Size

Use the `size` prop with a named token (`sm`, `md`, `lg`, `xl`) or any CSS length value.

::doc-preview{label="Named sizes"}
<AgDSIcon name="heroicons:star" size="sm" />
<AgDSIcon name="heroicons:star" size="md" />
<AgDSIcon name="heroicons:star" size="lg" />
<AgDSIcon name="heroicons:star" size="xl" />
::

```vue
<template>
  <AgDSIcon name="heroicons:star" size="sm" />
  <AgDSIcon name="heroicons:star" size="md" />
  <AgDSIcon name="heroicons:star" size="lg" />
  <AgDSIcon name="heroicons:star" size="xl" />
</template>
```

```vue
<template>
  <!-- Arbitrary CSS length -->
  <AgDSIcon name="heroicons:star" size="2rem" />
  <AgDSIcon name="heroicons:star" :size="32" />
</template>
```

## Color

Use the `color` prop to set a CSS color. Without it the icon inherits `currentColor` from the parent.

::doc-preview{label="Custom color"}
<AgDSIcon name="heroicons:check-circle" color="#00698f" size="lg" />
<AgDSIcon name="heroicons:exclamation-circle" color="#d60000" size="lg" />
::

```vue
<template>
  <AgDSIcon name="heroicons:check-circle" color="#00698f" size="lg" />
  <AgDSIcon name="heroicons:exclamation-circle" color="#d60000" size="lg" />
</template>
```

## Meaningful icon

Pass `aria-label` to make the icon meaningful to screen readers. The `aria-hidden` attribute is removed and `role="img"` is exposed.

```vue
<template>
  <AgDSIcon name="heroicons:magnifying-glass" aria-label="Search" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string \| Component` | — | **Required.** Iconify name (e.g. `"heroicons:home"`) or a Vue component |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` | `'md'` | Named token, CSS length string, or pixel number |
| `color` | `string` | — | CSS color value. Defaults to `currentColor` |

## Accessibility

- Decorative by default: `aria-hidden="true"` is set so the icon does not appear in the accessibility tree
- Meaningful when `aria-label` is provided: `aria-hidden` is removed, `role="img"` and `aria-label` are exposed to assistive technology
- `focusable="false"` is always set to prevent focus in IE/Edge
- The `i-` UnoCSS prefix is stripped automatically — `"i-mdi:home"` and `"mdi:home"` both work

## Changelog

### 0.1.0

- Initial release — `name`, `size`, `color` props; decorative/meaningful accessibility modes
