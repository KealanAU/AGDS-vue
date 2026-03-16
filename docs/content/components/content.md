---
title: Content
description: A family of layout components that create full-width content bands with a centred, max-width inner container. Includes Content, PageContent, SectionContent, and ContentBleed.
category: Layout
status: stable
---

## Usage

`AgDSContent` renders a full-width band with no vertical padding. It centres its content within the standard container max-width.

::doc-preview
<AgDSContent>
  <p>Page content goes here.</p>
</AgDSContent>
::

```vue
<template>
  <AgDSContent>
    <p>Page content goes here.</p>
  </AgDSContent>
</template>
```

## PageContent

Use `AgDSPageContent` for the main readable area of a page. It applies the standard page-level vertical padding.

::doc-preview{label="PageContent"}
<AgDSPageContent>
  <h1>Page heading</h1>
  <p>This content has top and bottom page padding applied.</p>
</AgDSPageContent>
::

```vue
<template>
  <AgDSPageContent>
    <h1>Page heading</h1>
    <p>This content has top and bottom page padding applied.</p>
  </AgDSPageContent>
</template>
```

## SectionContent

Use `AgDSSectionContent` for thematic sections within a page. It renders as a `<section>` by default and applies section-level vertical padding.

::doc-preview{label="SectionContent"}
<AgDSSectionContent>
  <h2>Section heading</h2>
  <p>This content has section vertical padding applied.</p>
</AgDSSectionContent>
::

```vue
<template>
  <AgDSSectionContent>
    <h2>Section heading</h2>
    <p>This content has section vertical padding applied.</p>
  </AgDSSectionContent>
</template>
```

## Background

Use the `background` prop on any content component to set the background colour of the full-width band.

- `body` — sets `--agds-color-bg`
- `bodyAlt` — sets `--agds-color-bg-subtle`

::doc-preview{label="Background variants"}
<AgDSSectionContent background="body">
  <p>Body background</p>
</AgDSSectionContent>
<AgDSSectionContent background="bodyAlt">
  <p>Body alt background</p>
</AgDSSectionContent>
::

```vue
<template>
  <AgDSSectionContent background="body">
    <p>Body background</p>
  </AgDSSectionContent>

  <AgDSSectionContent background="bodyAlt">
    <p>Body alt background</p>
  </AgDSSectionContent>
</template>
```

## Max width

Use the `maxWidth` prop to switch between the standard container width and a larger container.

- `container` — `var(--agds-content-max-width)` (default)
- `containerLg` — `var(--agds-content-max-width-lg)`

```vue
<template>
  <AgDSPageContent maxWidth="containerLg">
    <p>Wider inner container.</p>
  </AgDSPageContent>
</template>
```

## ContentBleed

`AgDSContentBleed` allows a child element to extend to the edges of its parent content band, negating the horizontal padding. Place it as a direct child of any content component.

Use `visible` to control bleed responsively:

- `true` (default) — always bleeds
- `false` — no bleed
- `{ xs: false }` — no bleed on mobile only
- `{ md: false }` — no bleed on desktop only

::doc-preview{label="ContentBleed"}
<AgDSSectionContent>
  <AgDSContentBleed>
    <div style="background: var(--agds-color-bg-subtle); padding: 1rem;">
      This element bleeds to the edges of the section band.
    </div>
  </AgDSContentBleed>
</AgDSSectionContent>
::

```vue
<template>
  <AgDSSectionContent>
    <AgDSContentBleed>
      <img src="/hero.jpg" alt="Hero image" style="width: 100%;" />
    </AgDSContentBleed>
  </AgDSSectionContent>

  <!-- Disable bleed on mobile, keep bleed on desktop -->
  <AgDSSectionContent>
    <AgDSContentBleed :visible="{ xs: false }">
      <img src="/hero.jpg" alt="Hero image" style="width: 100%;" />
    </AgDSContentBleed>
  </AgDSSectionContent>
</template>
```

## Polymorphic element

All content components accept an `as` prop to change the rendered outer element.

```vue
<template>
  <!-- Render SectionContent as an <article> -->
  <AgDSSectionContent as="article">
    <h2>Article heading</h2>
  </AgDSSectionContent>
</template>
```

## Props — AgDSContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AgDSPageContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AgDSSectionContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'section'` | HTML element to render as |
| `background` | `'body' \| 'bodyAlt'` | — | Background colour of the full-width band |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Max-width of the inner container |
| `id` | `string` | — | HTML `id` placed on the outer wrapper |

## Props — AgDSContentBleed

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean \| { xs?: boolean; md?: boolean }` | `true` | Controls whether the element bleeds to the edges of its parent content band. Pass `false` to disable, or a responsive object for breakpoint-level control |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content rendered inside the centred container |

All four components expose a `default` slot.

## Accessibility

- `AgDSSectionContent` renders as `<section>` by default — give sections an accessible name via a heading or `aria-label` so they appear correctly in landmark navigation
- Use the `id` prop to provide anchor targets for skip-links (e.g. `id="main-content"`)
- `AgDSContentBleed` is a purely visual layout wrapper with no ARIA implications

## Changelog

### 0.1.0

- Initial release — `AgDSContent`, `AgDSPageContent`, `AgDSSectionContent` with `background`, `maxWidth`, `as`, `id` props; `AgDSContentBleed` with responsive `visible` prop
