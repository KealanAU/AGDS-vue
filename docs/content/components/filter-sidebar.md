---
title: Filter sidebar
description: A collapsible sidebar for housing filter controls. Wraps CollapsingSideBar and optionally displays an active filter count and a "Clear filters" action.
category: Layout
status: stable
---

## Usage

Place filter controls in the default slot. The sidebar collapses to a toggle on small screens and is always visible on desktop.

::doc-preview
<FilterSidebarDemo />
::

```vue
<template>
  <AGDSFilterSidebar>
    <fieldset>
      <legend>Category</legend>
      <label><input type="checkbox" /> News</label>
      <label><input type="checkbox" /> Grants</label>
    </fieldset>
  </AGDSFilterSidebar>
</template>
```

## Active filter count

Set `activeFiltersCount` to reflect how many filters are currently applied. The count appears in the visible title ("Filters (3)") and the screen reader label ("Filters (3 active)").

::doc-preview{label="3 active filters"}
<FilterSidebarDemo variant="active" />
::

```vue
<template>
  <AGDSFilterSidebar :active-filters-count="3">
    <!-- filter controls -->
  </AGDSFilterSidebar>
</template>
```

## Clear filters

Set `showClearFilters` to render a "Clear filters" button at the bottom of the body. Handle the `@clear-filters` event to reset your filter state.

::doc-preview{label="With clear filters"}
<FilterSidebarDemo variant="clear" />
::

```vue
<script setup lang="ts">
const activeFiltersCount = ref(0)

function onClearFilters() {
  activeFiltersCount.value = 0
  // reset other filter state here
}
</script>

<template>
  <AGDSFilterSidebar
    :active-filters-count="activeFiltersCount"
    show-clear-filters
    @clear-filters="onClearFilters"
  >
    <!-- filter controls -->
  </AGDSFilterSidebar>
</template>
```

## Background variant

Use `background="bodyAlt"` when the sidebar sits on a `--agds-color-bg-subtle` surface.

```vue
<template>
  <AGDSFilterSidebar background="bodyAlt">
    <!-- filter controls -->
  </AGDSFilterSidebar>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeFiltersCount` | `number` | `0` | Number of active filters. When > 0, appended to the visible title and aria-label |
| `showClearFilters` | `boolean` | `false` | Renders a "Clear filters" button at the bottom of the body |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Surface the sidebar sits on |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `clearFilters` | — | Emitted when the user clicks the "Clear filters" button |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Filter controls (checkboxes, selects, date pickers, etc.) |

## Accessibility

- Rendered as a `<section>` landmark with an `aria-label` of "Filters" (or "Filters (N active)" when filters are applied)
- The collapse toggle exposes `aria-expanded` and `aria-controls` so screen readers announce the open/close state
- "Clear filters" is a `<button type="button">` — keyboard operable via `Enter` or `Space`
- Active filter count uses different phrasing in the visible label ("Filters (3)") vs the accessible name ("Filters (3 active)") to give screen reader users more context

## Changelog

### 0.1.0

- Initial release — `activeFiltersCount`, `showClearFilters`, `background`; `clearFilters` emit; mobile collapse toggle
