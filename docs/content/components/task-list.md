---
title: Task List
description: A structured list of tasks that guides users through a multi-step process. Each item shows a status icon, label, and optional message. Supports both unordered and numbered (ordered) layouts.
category: Navigation
status: stable
---

## Usage

Pass an array of task `items`, each with a `label`, `status`, and either an `href` or click handler.

::doc-preview
<TaskListDemo />
::

```vue
<script setup>
const tasks = [
  { label: 'Personal details', status: 'done', href: '/step-1' },
  { label: 'Employment history', status: 'doing', href: '/step-2' },
  { label: 'References', status: 'todo', href: '/step-3' },
  { label: 'Upload documents', status: 'blocked', href: '/step-4' },
]
</script>

<template>
  <AGDSTaskList :items="tasks" />
</template>
```

## Status

The `status` field on each item controls the icon and label shown alongside the task. Available values:

| Status | Icon | Label |
|--------|------|-------|
| `done` | Filled check circle (green) | Completed |
| `doneRecently` | Filled check circle (green) + tinted row | Completed |
| `doing` | Clock (blue) + left accent bar | In progress |
| `todo` | Empty radio button (blue) | Not started |
| `blocked` | Lock outline (muted) | Cannot start yet |
| `notRequired` | Minus circle outline (muted) | No longer required |

::doc-preview{label="All statuses"}
<TaskListDemo variant="statuses" />
::

## Ordered layout

Use the `ordered` prop to render a numbered `<ol>` with CSS counter prefixes on each item.

::doc-preview{label="Ordered"}
<TaskListDemo variant="ordered" />
::

```vue
<template>
  <AGDSTaskList ordered :items="tasks" />
</template>
```

## Message

Add a `message` to any item to show a secondary description below the label.

```vue
<script setup>
const tasks = [
  {
    label: 'Upload documents',
    status: 'todo',
    href: '/upload',
    message: 'Accepted: PDF, JPG, PNG (max 5 MB each)',
  },
]
</script>
```

## Button items

Omit `href` to render the item trigger as a `<button>` instead of an `<a>`.

```vue
<script setup>
const tasks = [
  { label: 'Personal details', status: 'todo', type: 'button' },
]
</script>

<template>
  <AGDSTaskList :items="tasks" />
</template>
```

## Props — AGDSTaskList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TaskListItem[]` | — | **Required.** Array of task definitions |
| `ordered` | `boolean` | `false` | Renders as `<ol>` with counter prefixes |

### TaskListItem shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Visible task label |
| `status` | `TaskListItemStatus` | Controls icon and status text |
| `href` | `string` | Renders trigger as `<a>` |
| `type` | `'button' \| 'submit' \| 'reset'` | Button type when no `href` |
| `disabled` | `boolean` | Disables the interactive element |
| `message` | `string` | Secondary description below the label |

## Accessibility

- The heading "Complete these tasks" and the progress count ("X of Y tasks completed") are rendered with semantic elements
- Each task is a list item containing a native `<a>` or `<button>` — fully keyboard accessible
- Status icons are `aria-hidden="true"`; status text is visually rendered so screen readers read it naturally
- `disabled` items set both `disabled` (button) and `aria-disabled` (link) depending on the element type

## Changelog

### 0.1.0

- Initial release — all six statuses, `ordered` mode, `message`, `href`/button items
