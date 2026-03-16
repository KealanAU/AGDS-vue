---
title: Avatar
description: A circular badge that shows a person's initials, derived automatically from a name string. Supports six sizes and two colour tones.
category: Content
status: stable
---

## Usage

Pass a `name` and the component derives initials automatically. Up to two initials are shown — first letter of the first and last words.

::doc-preview
<AgDSAvatar name="Jordan Lee" />
::

```vue
<template>
  <AgDSAvatar name="Jordan Lee" />
</template>
```

## Size

Use the `size` prop to scale the avatar. The default is `md`.

::doc-preview{label="All sizes"}
<AgDSAvatar name="Alex Smith" size="sm" />
<AgDSAvatar name="Alex Smith" size="md" />
<AgDSAvatar name="Alex Smith" size="lg" />
<AgDSAvatar name="Alex Smith" size="xl" />
<AgDSAvatar name="Alex Smith" size="xxl" />
<AgDSAvatar name="Alex Smith" size="xxxl" />
::

```vue
<template>
  <AgDSAvatar name="Alex Smith" size="sm" />
  <AgDSAvatar name="Alex Smith" size="md" />
  <AgDSAvatar name="Alex Smith" size="lg" />
  <AgDSAvatar name="Alex Smith" size="xl" />
  <AgDSAvatar name="Alex Smith" size="xxl" />
  <AgDSAvatar name="Alex Smith" size="xxxl" />
</template>
```

## Tone

Use the `tone` prop to change the colour. `neutral` (default) uses muted text; `action` uses the primary brand colour.

::doc-preview{label="Tones"}
<AgDSAvatar name="Sam Taylor" tone="neutral" />
<AgDSAvatar name="Sam Taylor" tone="action" />
::

```vue
<template>
  <AgDSAvatar name="Sam Taylor" tone="neutral" />
  <AgDSAvatar name="Sam Taylor" tone="action" />
</template>
```

## Decorative use

Pass `aria-hidden="true"` when the avatar is decorative — for example, when the surrounding element already provides the person's name.

```vue
<template>
  <div>
    <AgDSAvatar name="Casey Brown" aria-hidden="true" />
    <span>Casey Brown</span>
  </div>
</template>
```

## Custom label

Override the accessible name with `aria-label` when the initials alone would be confusing.

```vue
<template>
  <!-- Name contains a title — label the role, not the initials -->
  <AgDSAvatar name="Dr Sarah Chen" aria-label="Sarah Chen" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | **Required.** Used to derive initials and as the default accessible label |
| `tone` | `'neutral' \| 'action'` | `'neutral'` | Colour tone |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' \| 'xxxl'` | `'md'` | Controls width, height, and font size |

## Accessibility

- Rendered as a `<span role="img">` with `aria-label` set to `name` by default — announced to screen readers as an image with a meaningful name
- Pass `aria-hidden="true"` to suppress the announcement when the name is already present nearby
- Pass `aria-label` to override the default label with a custom string
- Initials are user-visible text; the `role="img"` + `aria-label` pattern satisfies WCAG 1.1.1 Non-text Content

## Changelog

### 0.1.0

- Initial release — `tone`, `size`, `aria-hidden`, `aria-label` support; initials derived from `name`
