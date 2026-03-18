---
title: Pagination
description: Two pagination components — link-based (AGDSPagination) for server-rendered pages and button-based (AGDSPaginationButtons) for client-side state. Both share the same sliding window algorithm.
category: Navigation
status: stable
---

## Link-based pagination

`AGDSPagination` renders `<a>` elements. Provide a `generateHref` function that returns a URL for each page number. This variant suits server-rendered or full-page navigation.

::doc-preview
<PaginationDemo />
::

```vue
<template>
  <AGDSPagination
    :current-page="currentPage"
    :total-pages="totalPages"
    :generate-href="(page) => `/results?page=${page}`"
  />
</template>
```

## Button-based pagination

`AGDSPaginationButtons` renders `<button>` elements and emits a `change` event with the new page number. Use this for client-side pagination where the URL does not change.

::doc-preview{label="Button-based"}
<PaginationDemo variant="buttons" />
::

```vue
<script setup>
import { ref } from 'vue'
const currentPage = ref(1)
</script>

<template>
  <AGDSPaginationButtons
    :current-page="currentPage"
    :total-pages="totalPages"
    @change="(page) => { currentPage = page }"
  />
</template>
```

## Window size

Use `windowLimit` to control how many page buttons appear in the sliding window. The default is `3`.

```vue
<template>
  <AGDSPagination
    :current-page="5"
    :total-pages="20"
    :window-limit="5"
    :generate-href="(p) => `?page=${p}`"
  />
</template>
```

## Secondary controls

Provide `itemRangeText` and/or `itemsPerPage` to show a secondary row with item range text and a per-page selector. On wide screens these appear beside the pagination; on narrow screens they stack below.

```vue
<template>
  <AGDSPagination
    :current-page="2"
    :total-pages="46"
    :generate-href="(p) => `?page=${p}`"
    item-range-text="11 – 20 of 458 items"
    :items-per-page="10"
    :items-per-page-options="[10, 20, 50]"
    @items-per-page-change="handlePerPageChange"
  />
</template>
```

## Props — AGDSPagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | — | **Required.** Active page number |
| `totalPages` | `number` | — | **Required.** Total number of pages |
| `generateHref` | `(page: number) => string` | — | **Required.** Returns a URL for the given page |
| `ariaLabel` | `string` | `'Pagination'` | `aria-label` on the `<nav>` landmark |
| `windowLimit` | `number` | `3` | Number of page buttons in the sliding window |
| `itemRangeText` | `string` | — | Descriptive text e.g. "1 – 10 of 458 items" |
| `itemsPerPage` | `number` | — | Currently selected items per page. Shows the per-page selector when provided |
| `itemsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Options for the per-page selector |

## Props — AGDSPaginationButtons

Same as `AGDSPagination` except `generateHref` is replaced by `change` event.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | — | **Required.** Active page number |
| `totalPages` | `number` | — | **Required.** Total number of pages |
| `ariaLabel` | `string` | `'Pagination'` | `aria-label` on the `<nav>` landmark |
| `windowLimit` | `number` | `3` | Number of page buttons in the sliding window |
| `itemRangeText` | `string` | — | Descriptive text |
| `itemsPerPage` | `number` | — | Shows per-page selector when provided |
| `itemsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Options for the per-page selector |

## Events — AGDSPaginationButtons

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `number` | Emitted when a page button is clicked |
| `itemsPerPageChange` | `number` | Emitted when the items-per-page select changes |

## Events — AGDSPagination

| Event | Payload | Description |
|-------|---------|-------------|
| `itemsPerPageChange` | `number` | Emitted when the items-per-page select changes |

## Accessibility

- Wrapped in a `<nav aria-label="Pagination">` landmark
- The active page link/button receives `aria-current="page"`
- Each page control has an explicit `aria-label` e.g. "Go to page 3"
- Separator ellipsis items are `<li>` elements with an `aria-label` describing the hidden page range (e.g. "Pages 4 to 7")
- On `AGDSPaginationButtons`, when navigating from page 2 to page 1 (Previous disappears), focus is automatically moved to the page-1 button

## Changelog

### 0.1.0

- Initial release — link-based and button-based variants, sliding window, secondary controls
