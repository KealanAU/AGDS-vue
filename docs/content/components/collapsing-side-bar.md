---
title: Collapsing side bar
description: A responsive sidebar shell that collapses behind a toggle button on mobile and is always visible on desktop. Used as the base for FilterSidebar.
category: Layout
status: stable
---

## Usage

Place any content in the default slot. On mobile the body is hidden behind a toggle button; on desktop (≥ 768 px) the heading and body are always visible.

```vue
<template>
  <AGDSCollapsingSideBar title="Filters">
    <fieldset>
      <legend>Category</legend>
      <label><input type="checkbox" /> News</label>
      <label><input type="checkbox" /> Grants</label>
    </fieldset>
  </AGDSCollapsingSideBar>
</template>
```

## Subtitle

Use `subTitle` to add a supplementary line below the heading (visible in both the desktop heading and the mobile toggle button).

```vue
<template>
  <AGDSCollapsingSideBar title="Filters" sub-title="3 active">
    <!-- filter controls -->
  </AGDSCollapsingSideBar>
</template>
```

## Custom heading element

The `title` slot lets you replace the default `<h2>` with any element — useful when the sidebar is nested inside another section that already has an `<h2>`.

```vue
<template>
  <AGDSCollapsingSideBar title="Filters">
    <template #title>
      <h3 class="my-custom-heading">Filters</h3>
    </template>
    <!-- filter controls -->
  </AGDSCollapsingSideBar>
</template>
```

## Landmark element

By default the root renders as a `<section>`. Use `as` to change it to `<aside>` or `<nav>` when the semantic context requires it.

```vue
<template>
  <AGDSCollapsingSideBar title="Related links" as="aside">
    <!-- links -->
  </AGDSCollapsingSideBar>
</template>
```

## Background variant

Use `background="bodyAlt"` when the sidebar sits on a `--agds-color-bg-subtle` surface.

```vue
<template>
  <AGDSCollapsingSideBar title="Filters" background="bodyAlt">
    <!-- filter controls -->
  </AGDSCollapsingSideBar>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Visible heading text. Also used as the mobile toggle button's accessible name |
| `subTitle` | `string` | — | Optional secondary line displayed below the title |
| `as` | `'section' \| 'aside' \| 'nav'` | `'section'` | HTML element rendered as the root landmark |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Surface the sidebar sits on |
| `ariaLabel` | `string` | — | Overrides the accessible name of the landmark. When omitted, the landmark is labelled by the heading via `aria-labelledby` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Sidebar body content |
| `title` | Replaces the default `<h2>` heading with a custom element |

## Accessibility

- The root landmark is labelled by the heading (`aria-labelledby`) unless `ariaLabel` is provided, in which case `aria-label` takes precedence (WCAG 1.3.1)
- The mobile toggle button exposes `aria-expanded` and `aria-controls` so screen readers announce the open/close state (WCAG 4.1.2)
- The toggle button's accessible name comes from the `title` prop (WCAG 2.5.3)
- The chevron icon is `aria-hidden="true"` — the button text conveys the action
- On desktop the heading is always visible and the toggle button is hidden via CSS

## Changelog

### 0.1.0

- Initial release — `title`, `subTitle`, `as`, `background`, `ariaLabel`; `title` slot for custom heading; mobile collapse toggle
