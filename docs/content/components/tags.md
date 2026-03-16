---
title: Tags
description: Pill-shaped label chips used to represent metadata, categories, or applied filters. Tags can be plain, linked, or removable.
category: Content
status: stable
---

## Usage

Use `AgDSTag` for a single tag, or `AgDSTags` to render a managed list from an `items` array.

```vue
<template>
  <AgDSTag label="Finance" />
</template>
```

## Linked tag

Provide `href` to make the tag label an anchor.

```vue
<template>
  <AgDSTag label="Finance" href="/topics/finance" />
</template>
```

## Removable tag

Set `removable` to show a remove button. Handle the `remove` event to update your state.

```vue
<script setup>
import { ref } from 'vue'
const tags = ref(['Finance', 'Health', 'Education'])

function removeTag(label) {
  tags.value = tags.value.filter(t => t !== label)
}
</script>

<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <AgDSTag
      v-for="tag in tags"
      :key="tag"
      :label="tag"
      removable
      @remove="removeTag(tag)"
    />
  </div>
</template>
```

## AgDSTags — list

`AgDSTags` renders an `items` array into a `<ul>` list and manages focus when a tag is removed (focus moves to the previous remove button).

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { label: 'Finance', removable: true },
  { label: 'Health', removable: true },
  { label: 'Education', href: '/topics/education' },
])

function onRemove(index) {
  items.value.splice(index, 1)
}
</script>

<template>
  <AgDSTags :items="items" @remove="onRemove">
    <template #heading>
      <h3>Applied filters</h3>
    </template>
  </AgDSTags>
</template>
```

## Props — AgDSTag

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible tag text |
| `href` | `string` | — | When provided, the label renders as `<a href>` |
| `removable` | `boolean` | `false` | Shows a remove button (×) |

## Events — AgDSTag

| Event | Payload | Description |
|-------|---------|-------------|
| `remove` | `MouseEvent` | Fired when the remove button is clicked |

## Props — AgDSTags

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TagItem[]` | — | **Required.** List of tag items |

### TagItem

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Tag display text |
| `href` | `string` | Makes the label a link |
| `removable` | `boolean` | Shows the remove button |

## Events — AgDSTags

| Event | Payload | Description |
|-------|---------|-------------|
| `remove` | `(index: number, event: MouseEvent)` | Fired when a tag's remove button is clicked. `index` is the position in `items` |

## Slots — AgDSTags

| Slot | Description |
|------|-------------|
| `heading` | Optional heading rendered above the tag list |

## Accessibility

- Plain tags are `<span>` elements — not interactive, not in the tab order
- Linked tags are `<a href>` elements with standard link semantics
- Remove buttons are `<button type="button">` with `aria-label="Remove {label}"` so screen readers announce which tag will be removed
- When a tag is removed, focus moves to the previous remove button (or the first one when the first tag is removed) before the `remove` event fires, so focus is never lost
- `AgDSTags` renders an unordered list (`<ul>`) which conveys the group relationship to assistive technologies

## Changelog

### 0.1.0

- Initial release — `AgDSTag` (label, href, removable), `AgDSTags` (items, heading slot, focus management on remove)
