---
title: Table
description: A suite of composable table components with striped rows, sortable headers, clickable rows, row selection, and an accessible custom scrollbar for overflow.
category: Content
status: stable
---

## Usage

Compose `AGDSTable` with the standard sub-components to build a data table.

::doc-preview
:table-demo
::

```vue
<template>
  <AGDSTable>
    <AGDSTableHead>
      <AGDSTableRow>
        <AGDSTableHeader>Name</AGDSTableHeader>
        <AGDSTableHeader>Department</AGDSTableHeader>
        <AGDSTableHeader>Status</AGDSTableHeader>
      </AGDSTableRow>
    </AGDSTableHead>
    <AGDSTableBody>
      <AGDSTableRow v-for="row in rows" :key="row.id">
        <AGDSTableCell>{{ row.name }}</AGDSTableCell>
        <AGDSTableCell>{{ row.department }}</AGDSTableCell>
        <AGDSTableCell>{{ row.status }}</AGDSTableCell>
      </AGDSTableRow>
    </AGDSTableBody>
  </AGDSTable>
</template>
```

## Caption

Use `AGDSTableCaption` to provide an accessible table title. Place it as the first child of `AGDSTable`.

```vue
<template>
  <AGDSTable>
    <AGDSTableCaption>Active staff members by department</AGDSTableCaption>
    <!-- ... -->
  </AGDSTable>
</template>
```

## Striped rows

Use the `striped` prop to apply alternating row backgrounds.

::doc-preview{label="Striped"}
:table-demo{variant="striped"}
::

```vue
<template>
  <AGDSTable striped>
    <!-- ... -->
  </AGDSTable>
</template>
```

## Sortable headers

Replace `AGDSTableHeader` with `AGDSTableHeaderSortable` to add sort buttons. Pass `sort="ASC"` or `sort="DESC"` for the active column; omit `sort` for unsorted columns.

```vue
<script setup>
import { ref } from 'vue'
const sortCol = ref('name')
const sortDir = ref('ASC')

function toggleSort(col) {
  if (sortCol.value === col) {
    sortDir.value = sortDir.value === 'ASC' ? 'DESC' : 'ASC'
  } else {
    sortCol.value = col
    sortDir.value = 'ASC'
  }
}
</script>

<template>
  <AGDSTable>
    <AGDSTableHead>
      <AGDSTableRow>
        <AGDSTableHeaderSortable
          :sort="sortCol === 'name' ? sortDir : undefined"
          @click="toggleSort('name')"
        >
          Name
        </AGDSTableHeaderSortable>
        <AGDSTableHeaderSortable
          :sort="sortCol === 'date' ? sortDir : undefined"
          @click="toggleSort('date')"
        >
          Date
        </AGDSTableHeaderSortable>
      </AGDSTableRow>
    </AGDSTableHead>
    <!-- ... -->
  </AGDSTable>
</template>
```

## Clickable rows

Add `clickable` to a `AGDSTableRow` and attach a `@click` listener to make the entire row interactive. Clicks on interactive elements inside cells (links, buttons) do not bubble to the row handler.

```vue
<template>
  <AGDSTableRow clickable @click="handleRowClick">
    <AGDSTableCell>Alice Smith</AGDSTableCell>
    <AGDSTableCell>Finance</AGDSTableCell>
  </AGDSTableRow>
</template>
```

## Selected rows

Use `selected` on `AGDSTableRow` to highlight a row as selected. `aria-selected="true"` is set automatically.

```vue
<template>
  <AGDSTableRow :selected="selectedRowId === row.id" @click="selectedRowId = row.id">
    <!-- ... -->
  </AGDSTableRow>
</template>
```

## Invalid rows

Use `invalid` to highlight a row that contains an error.

```vue
<template>
  <AGDSTableRow :invalid="row.hasError">
    <!-- ... -->
  </AGDSTableRow>
</template>
```

## Scrollable tables

Wrap a wide table in `AGDSTableScroller` to add an accessible custom horizontal scrollbar with arrow buttons, a draggable thumb, and left/right shadow indicators.

```vue
<template>
  <AGDSTableScroller>
    <AGDSTable>
      <!-- wide content ... -->
    </AGDSTable>
  </AGDSTableScroller>
</template>
```

## Props — AGDSTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Alternating row background colours |
| `tableLayout` | `'auto' \| 'fixed'` | `'auto'` | CSS `table-layout` algorithm |
| `tabIndex` | `number` | — | Makes the table programmatically focusable (pass `-1`) |
| `aria-labelledby` | `string` | — | ID of an external element that labels the table |
| `aria-describedby` | `string` | — | ID of an external description element |
| `aria-rowcount` | `number` | — | Total row count for paginated/virtual tables |

## Props — AGDSTableHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'th' \| 'td'` | `'th'` | Rendered element |
| `scope` | `'col' \| 'row' \| 'colgroup' \| 'rowgroup'` | `'col'` | Header scope attribute |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment |
| `colSpan` | `number` | — | Column span |
| `rowSpan` | `number` | — | Row span |
| `width` | `string` | — | Fixed column width (e.g. `'10rem'`) |

## Props — AGDSTableHeaderSortable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sort` | `'ASC' \| 'DESC'` | — | Active sort direction. Omit for unsorted |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment |
| `colSpan` | `number` | — | Column span |
| `width` | `string` | — | Fixed column width |

## Props — AGDSTableCell

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'td' \| 'th'` | `'td'` | Rendered element. Use `'th'` with `scope="row"` for row headers |
| `scope` | `'row' \| 'rowgroup'` | — | For row-header cells |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Horizontal alignment |
| `verticalAlign` | `'top' \| 'middle' \| 'bottom'` | `'top'` | Vertical alignment |
| `fontWeight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | Cell font weight |
| `colSpan` | `number` | — | Column span |
| `rowSpan` | `number` | — | Row span |
| `id` | `string` | — | For `aria-labelledby` associations |

## Props — AGDSTableRow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `'body' \| 'bodyAlt'` | — | Explicit row background |
| `striped` | _(inherited from table)_ | — | |
| `clickable` | `boolean` | `false` | Makes the row interactive (cursor, hover outline) |
| `selected` | `boolean` | `false` | Highlights row as selected; sets `aria-selected` |
| `invalid` | `boolean` | `false` | Highlights row as containing an error |
| `aria-rowindex` | `number` | — | Row index in a virtual/paginated table |

## Events — AGDSTableRow

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when a `clickable` row is clicked (excluding interactive child elements) |

## Events — AGDSTableHeaderSortable

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired when the sort button is clicked |

## Accessibility

- Renders native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- `AGDSTableHeader` sets `scope="col"` by default; override for row or spanning headers
- `AGDSTableHeaderSortable` sets `aria-sort="ascending"` or `"descending"` on the `<th>` and uses a button for keyboard activation
- `AGDSTableScroller` wraps the table in a `<section>` with an auto-derived `aria-label` from the table caption — keyboard users can Tab to the scrollable region
- Selected rows set `aria-selected="true"`

## Changelog

### 0.1.0

- Initial release — striped, sortable headers, clickable/selected/invalid rows, caption, scroller
