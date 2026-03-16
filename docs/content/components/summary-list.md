---
title: Summary list
description: A definition-list based component for displaying key–value pairs. Used on review and confirm-and-submit screens to let users verify their input before final submission.
category: Content
status: stable
---

## Usage

Compose `AgDSSummaryList` with `AgDSSummaryListItem`, `AgDSSummaryListItemTerm`, `AgDSSummaryListItemDescription`, and optionally `AgDSSummaryListItemAction`.

::doc-preview
<AgDSSummaryList>
  <AgDSSummaryListItem>
    <AgDSSummaryListItemTerm>Full name</AgDSSummaryListItemTerm>
    <AgDSSummaryListItemDescription>Jane Smith</AgDSSummaryListItemDescription>
    <AgDSSummaryListItemAction><a href="#">Change</a></AgDSSummaryListItemAction>
  </AgDSSummaryListItem>
  <AgDSSummaryListItem>
    <AgDSSummaryListItemTerm>Date of birth</AgDSSummaryListItemTerm>
    <AgDSSummaryListItemDescription>1 January 1990</AgDSSummaryListItemDescription>
  </AgDSSummaryListItem>
</AgDSSummaryList>
::

```vue
<template>
  <AgDSSummaryList>
    <AgDSSummaryListItem>
      <AgDSSummaryListItemTerm>Full name</AgDSSummaryListItemTerm>
      <AgDSSummaryListItemDescription>Jane Smith</AgDSSummaryListItemDescription>
      <AgDSSummaryListItemAction>
        <AgDSTextLink href="/edit/name">Change</AgDSTextLink>
      </AgDSSummaryListItemAction>
    </AgDSSummaryListItem>

    <AgDSSummaryListItem>
      <AgDSSummaryListItemTerm>Date of birth</AgDSSummaryListItemTerm>
      <AgDSSummaryListItemDescription>1 January 1990</AgDSSummaryListItemDescription>
    </AgDSSummaryListItem>
  </AgDSSummaryList>
</template>
```

## Without actions

Omit `AgDSSummaryListItemAction` for read-only display rows.

```vue
<template>
  <AgDSSummaryList>
    <AgDSSummaryListItem>
      <AgDSSummaryListItemTerm>Reference number</AgDSSummaryListItemTerm>
      <AgDSSummaryListItemDescription>REF-2024-001234</AgDSSummaryListItemDescription>
    </AgDSSummaryListItem>
    <AgDSSummaryListItem>
      <AgDSSummaryListItemTerm>Submitted</AgDSSummaryListItemTerm>
      <AgDSSummaryListItemDescription>12 March 2024</AgDSSummaryListItemDescription>
    </AgDSSummaryListItem>
  </AgDSSummaryList>
</template>
```

## How it works

The component renders a native `<dl>` (description list). Each `AgDSSummaryListItem` is a `<div>` wrapper (valid inside `<dl>` per the HTML spec) containing:

- `AgDSSummaryListItemTerm` → `<dt>` — the label / key
- `AgDSSummaryListItemDescription` → `<dd>` — the value
- `AgDSSummaryListItemAction` → `<dd>` — optional action (a second `<dd>` is valid when one term has multiple associated descriptions)

On narrow viewports the term stacks above the description (column layout). At 768 px and wider they display side-by-side — the term occupies 30 % / minimum 200 px of the width.

## Components

| Component | Description |
|-----------|-------------|
| `AgDSSummaryList` | Root `<dl>` wrapper |
| `AgDSSummaryListItem` | Row `<div>` — one per key–value pair |
| `AgDSSummaryListItemTerm` | `<dt>` — the label |
| `AgDSSummaryListItemDescription` | `<dd>` — the value |
| `AgDSSummaryListItemAction` | `<dd>` — optional trailing action |

None of the components have props beyond a `default` slot.

## Accessibility

- Renders a native `<dl>` so the browser's accessibility tree communicates term/description relationships automatically (WCAG 1.3.1)
- No ARIA roles required — native semantics are sufficient
- Action links inside `AgDSSummaryListItemAction` should have descriptive labels that include the field name (e.g. `"Change full name"`) — use `AgDSVisuallyHidden` to add context if the visible text is just `"Change"`

## Changelog

### 0.1.0

- Initial release — five sub-components, responsive column/row layout
