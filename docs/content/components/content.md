---
title: Content
description: A family of layout components that create full-width content bands with a centred, max-width inner container. Includes Content, PageContent, SectionContent, and ContentBleed.
category: Layout
status: stable
---

## Usage

`AGDSContent` renders a full-width band with no vertical padding. It centres its content within the standard container max-width.

::doc-preview
<AGDSContent>
  <p>Page content goes here.</p>
</AGDSContent>
::

```vue
<template>
  <AGDSContent>
    <p>Page content goes here.</p>
  </AGDSContent>
</template>
```

## PageContent

Use `AGDSPageContent` for the main readable area of a page. It applies the standard page-level vertical padding.

::doc-preview{label="PageContent"}
<AGDSPageContent>
  <h1>Page heading</h1>
  <p>This content has top and bottom page padding applied.</p>
</AGDSPageContent>
::

```vue
<template>
  <AGDSPageContent>
    <h1>Page heading</h1>
    <p>This content has top and bottom page padding applied.</p>
  </AGDSPageContent>
</template>
```

## SectionContent

Use `AGDSSectionContent` for thematic sections within a page. It renders as a `<section>` by default and applies section-level vertical padding.

::doc-preview{label="SectionContent"}
<AGDSSectionContent>
  <h2>Section heading</h2>
  <p>This content has section vertical padding applied.</p>
</AGDSSectionContent>
::

```vue
<template>
  <AGDSSectionContent>
    <h2>Section heading</h2>
    <p>This content has section vertical padding applied.</p>
  </AGDSSectionContent>
</template>
```

## Background

Use the `background` prop on any content component to set the background colour of the full-width band.

- `body` — sets `--agds-color-bg`
- `bodyAlt` — sets `--agds-color-bg-subtle`

::doc-preview{label="Background variants"}
<AGDSSectionContent background="body">
  <p>Body background</p>
</AGDSSectionContent>
<AGDSSectionContent background="bodyAlt">
  <p>Body alt background</p>
</AGDSSectionContent>
::

```vue
<template>
  <AGDSSectionContent background="body">
    <p>Body background</p>
  </AGDSSectionContent>

  <AGDSSectionContent background="bodyAlt">
    <p>Body alt background</p>
  </AGDSSectionContent>
</template>
```

## Max width

Use the `maxWidth` prop to switch between the standard container width and a larger container.

- `container` — `var(--agds-content-max-width)` (default)
- `containerLg` — `var(--agds-content-max-width-lg)`

```vue
<template>
  <AGDSPageContent maxWidth="containerLg">
    <p>Wider inner container.</p>
  </AGDSPageContent>
</template>
```

## ContentBleed

`AGDSContentBleed` allows a child element to extend to the edges of its parent content band, negating the horizontal padding. Place it as a direct child of any content component.

Use `visible` to control bleed responsively:

- `true` (default) — always bleeds
- `false` — no bleed
- `{ xs: false }` — no bleed on mobile only
- `{ md: false }` — no bleed on desktop only

::doc-preview{label="ContentBleed"}
<AGDSSectionContent>
  <AGDSContentBleed>
    <div style="background: var(--agds-color-bg-subtle); padding: 1rem;">
      This element bleeds to the edges of the section band.
    </div>
  </AGDSContentBleed>
</AGDSSectionContent>
::

```vue
<template>
  <AGDSSectionContent>
    <AGDSContentBleed>
      <img src="/hero.jpg" alt="Hero image" style="width: 100%;" />
    </AGDSContentBleed>
  </AGDSSectionContent>

  <!-- Disable bleed on mobile, keep bleed on desktop -->
  <AGDSSectionContent>
    <AGDSContentBleed :visible="{ xs: false }">
      <img src="/hero.jpg" alt="Hero image" style="width: 100%;" />
    </AGDSContentBleed>
  </AGDSSectionContent>
</template>
```

## Polymorphic element

All content components accept an `as` prop to change the rendered outer element.

```vue
<template>
  <!-- Render SectionContent as an <article> -->
  <AGDSSectionContent as="article">
    <h2>Article heading</h2>
  </AGDSSectionContent>
</template>
```

## Props — AGDSContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AGDSPageContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AGDSSectionContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'section'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AGDSContentBleed

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean \| { xs?: boolean; md?: boolean }` | `true` | Controls whether the element bleeds to the edges of its parent content band. Pass `false` to disable, or a responsive object for breakpoint-level control |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content rendered inside the centred container |

All four components expose a `default` slot.

## Accessibility

- `AGDSSectionContent` renders as `<section>` by default — give sections an accessible name via a heading or `aria-label` so they appear correctly in landmark navigation
- Use the `id` prop to provide anchor targets for skip-links (e.g. `id="main-content"`)
- `AGDSContentBleed` is a purely visual layout wrapper with no ARIA implications

## Changelog

### 0.1.0

- Initial release — `AGDSContent`, `AGDSPageContent`, `AGDSSectionContent` with `background`, `maxWidth`, `as`, `id` props; `AGDSContentBleed` with responsive `visible` prop
