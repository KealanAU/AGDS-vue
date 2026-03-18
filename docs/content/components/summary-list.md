---
title: Summary list
description: A definition-list based component for displaying key–value pairs. Used on review and confirm-and-submit screens to let users verify their input before final submission.
category: Content
status: stable
---

## Usage

Compose `AGDSSummaryList` with `AGDSSummaryListItem`, `AGDSSummaryListItemTerm`, `AGDSSummaryListItemDescription`, and optionally `AGDSSummaryListItemAction`.

::doc-preview
<AGDSSummaryList>
  <AGDSSummaryListItem>
    <AGDSSummaryListItemTerm>Full name</AGDSSummaryListItemTerm>
    <AGDSSummaryListItemDescription>Jane Smith</AGDSSummaryListItemDescription>
    <AGDSSummaryListItemAction><a href="#">Change</a></AGDSSummaryListItemAction>
  </AGDSSummaryListItem>
  <AGDSSummaryListItem>
    <AGDSSummaryListItemTerm>Date of birth</AGDSSummaryListItemTerm>
    <AGDSSummaryListItemDescription>1 January 1990</AGDSSummaryListItemDescription>
  </AGDSSummaryListItem>
</AGDSSummaryList>
::

```vue
<template>
  <AGDSSummaryList>
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Full name</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>Jane Smith</AGDSSummaryListItemDescription>
      <AGDSSummaryListItemAction>
        <AGDSTextLink href="/edit/name">Change</AGDSTextLink>
      </AGDSSummaryListItemAction>
    </AGDSSummaryListItem>

    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Date of birth</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>1 January 1990</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
  </AGDSSummaryList>
</template>
```

## Without actions

Omit `AGDSSummaryListItemAction` for read-only display rows.

```vue
<template>
  <AGDSSummaryList>
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Reference number</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>REF-2024-001234</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
    <AGDSSummaryListItem>
      <AGDSSummaryListItemTerm>Submitted</AGDSSummaryListItemTerm>
      <AGDSSummaryListItemDescription>12 March 2024</AGDSSummaryListItemDescription>
    </AGDSSummaryListItem>
  </AGDSSummaryList>
</template>
```

## How it works

The component renders a native `<dl>` (description list). Each `AGDSSummaryListItem` is a `<div>` wrapper (valid inside `<dl>` per the HTML spec) containing:

- `AGDSSummaryListItemTerm` → `<dt>` — the label / key
- `AGDSSummaryListItemDescription` → `<dd>` — the value
- `AGDSSummaryListItemAction` → `<dd>` — optional action (a second `<dd>` is valid when one term has multiple associated descriptions)

On narrow viewports the term stacks above the description (column layout). At 768 px and wider they display side-by-side — the term occupies 30 % / minimum 200 px of the width.

## Components

| Component | Description |
|-----------|-------------|
| `AGDSSummaryList` | Root `<dl>` wrapper |
| `AGDSSummaryListItem` | Row `<div>` — one per key–value pair |
| `AGDSSummaryListItemTerm` | `<dt>` — the label |
| `AGDSSummaryListItemDescription` | `<dd>` — the value |
| `AGDSSummaryListItemAction` | `<dd>` — optional trailing action |

None of the components have props beyond a `default` slot.

## Accessibility

- Renders a native `<dl>` so the browser's accessibility tree communicates term/description relationships automatically (WCAG 1.3.1)
- No ARIA roles required — native semantics are sufficient
- Action links inside `AGDSSummaryListItemAction` should have descriptive labels that include the field name (e.g. `"Change full name"`) — use `AGDSVisuallyHidden` to add context if the visible text is just `"Change"`

## Changelog

### 0.1.0

- Initial release — five sub-components, responsive column/row layout
